const fs = require("node:fs/promises");
const path = require("node:path");
const { neon } = require("@neondatabase/serverless");

const ordersPath = path.join(__dirname, "..", "data", "orders.json");
let schemaReady;

function useDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function database() {
  return neon(process.env.DATABASE_URL);
}

async function ensureSchema() {
  if (!useDatabase()) return;
  if (!schemaReady) {
    schemaReady = database()`
      CREATE TABLE IF NOT EXISTS reveal_orders (
        shopify_order_id TEXT PRIMARY KEY,
        order_email TEXT NOT NULL DEFAULT '',
        assigned_country TEXT NOT NULL,
        reveal_token TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL
      )
    `;
  }
  await schemaReady;
}

async function readOrders() {
  try {
    return JSON.parse(await fs.readFile(ordersPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeOrders(orders) {
  const tempPath = `${ordersPath}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(orders, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, ordersPath);
}

async function findOrderByToken(revealToken) {
  if (useDatabase()) {
    await ensureSchema();
    const rows = await database()`
      SELECT
        shopify_order_id AS "shopifyOrderId",
        order_email AS "orderEmail",
        assigned_country AS "assignedCountry",
        reveal_token AS "revealToken",
        created_at AS "createdAt"
      FROM reveal_orders
      WHERE reveal_token = ${revealToken}
      LIMIT 1
    `;
    return rows[0];
  }
  const orders = await readOrders();
  return orders.find((order) => order.revealToken === revealToken);
}

async function findOrderByShopifyId(shopifyOrderId) {
  if (useDatabase()) {
    await ensureSchema();
    const rows = await database()`
      SELECT
        shopify_order_id AS "shopifyOrderId",
        order_email AS "orderEmail",
        assigned_country AS "assignedCountry",
        reveal_token AS "revealToken",
        created_at AS "createdAt"
      FROM reveal_orders
      WHERE shopify_order_id = ${shopifyOrderId}
      LIMIT 1
    `;
    return rows[0];
  }
  const orders = await readOrders();
  return orders.find((order) => order.shopifyOrderId === shopifyOrderId);
}

async function saveOrder(order) {
  if (useDatabase()) {
    await ensureSchema();
    await database()`
      INSERT INTO reveal_orders (
        shopify_order_id,
        order_email,
        assigned_country,
        reveal_token,
        created_at
      ) VALUES (
        ${order.shopifyOrderId},
        ${order.orderEmail},
        ${order.assignedCountry},
        ${order.revealToken},
        ${order.createdAt}
      )
    `;
    return order;
  }
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
  return order;
}

module.exports = { ensureSchema, findOrderByShopifyId, findOrderByToken, readOrders, saveOrder };
