const crypto = require("node:crypto");

function verifyShopifyHmac(rawBody, receivedHmac) {
  if (!process.env.SHOPIFY_WEBHOOK_SECRET || !Buffer.isBuffer(rawBody) || !receivedHmac) {
    return false;
  }
  const digest = crypto
    .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("base64");
  const expected = Buffer.from(digest);
  const received = Buffer.from(receivedHmac);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

module.exports = { verifyShopifyHmac };
