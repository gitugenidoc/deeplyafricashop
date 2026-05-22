const fs = require("node:fs/promises");
const path = require("node:path");

const ordersPath = path.join(__dirname, "..", "data", "orders.json");

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
  const orders = await readOrders();
  return orders.find((order) => order.revealToken === revealToken);
}

async function findOrderByShopifyId(shopifyOrderId) {
  const orders = await readOrders();
  return orders.find((order) => order.shopifyOrderId === shopifyOrderId);
}

async function saveOrder(order) {
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
  return order;
}

module.exports = { findOrderByShopifyId, findOrderByToken, readOrders, saveOrder };
