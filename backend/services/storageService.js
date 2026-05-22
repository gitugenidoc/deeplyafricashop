const { neon } = require("@neondatabase/serverless");

let schemaReady;

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for reveal order storage.");
  }
  return neon(process.env.DATABASE_URL);
}

async function ensureSchema() {
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

async function findOrderByToken(revealToken) {
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

async function findOrderByShopifyId(shopifyOrderId) {
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

async function saveOrder(order) {
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

module.exports = { ensureSchema, findOrderByShopifyId, findOrderByToken, saveOrder };
