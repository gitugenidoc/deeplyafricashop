const { assignCountryForOrder } = require("../services/countryAssignmentService");
const { sendRevealEmail } = require("../services/emailService");
const { findOrderByShopifyId, saveOrder } = require("../services/storageService");
const { generateToken } = require("../utils/generateToken");
const { verifyShopifyHmac } = require("../utils/verifyShopifyHmac");

function orderHasMysteryPass(order) {
  return (order.line_items || []).some((item) => {
    const label = `${item.title || ""} ${item.name || ""}`.toLowerCase();
    return label.includes("mystery country pass");
  });
}

function revealUrl(token) {
  const baseUrl = process.env.REVEAL_BASE_URL || "https://shop.deeplyafrica.com/reveal.html";
  return `${baseUrl}?token=${encodeURIComponent(token)}`;
}

async function ordersPaidWebhook(request, response) {
  if (!verifyShopifyHmac(request.body, request.get("X-Shopify-Hmac-Sha256"))) {
    response.status(401).send("Invalid Shopify HMAC.");
    return;
  }

  let order;
  try {
    order = JSON.parse(request.body.toString("utf8"));
  } catch (error) {
    response.status(400).send("Invalid Shopify webhook JSON.");
    return;
  }

  // Acknowledge irrelevant orders so Shopify does not retry them.
  if (!orderHasMysteryPass(order)) {
    response.status(200).send("Ignored.");
    return;
  }

  const shopifyOrderId = String(order.admin_graphql_api_id || order.id);
  const existing = await findOrderByShopifyId(shopifyOrderId);
  if (existing) {
    response.status(200).send("Already assigned.");
    return;
  }

  const assignment = {
    shopifyOrderId,
    orderEmail: order.email || order.contact_email || "",
    assignedCountry: assignCountryForOrder().code,
    revealToken: generateToken(),
    createdAt: new Date().toISOString()
  };

  await saveOrder(assignment);
  response.status(200).send("Assigned.");

  sendRevealEmail({
    to: assignment.orderEmail,
    orderId: assignment.shopifyOrderId,
    revealUrl: revealUrl(assignment.revealToken)
  }).catch((error) => console.error("Reveal email delivery failed.", error));
}

module.exports = { ordersPaidWebhook };
