require("dotenv").config();

const cors = require("cors");
const express = require("express");
const healthRoutes = require("./routes/health");
const revealRoutes = require("./routes/reveal");
const shopifyWebhookRoutes = require("./routes/shopifyWebhook");

const app = express();
const port = Number(process.env.PORT || 8787);
const allowedOrigin = process.env.STOREFRONT_ORIGIN || "https://shop.deeplyafrica.com";

// Shopify HMAC validation must see the unmodified request body.
app.use("/api/webhooks/shopify", express.raw({ type: "application/json", limit: "1mb" }), shopifyWebhookRoutes);
app.use(cors({ origin: [allowedOrigin, "http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json({ limit: "256kb" }));
app.use("/api/health", healthRoutes);
app.use("/api/reveal", revealRoutes);

app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

if (require.main === module) {
  app.listen(port, () => console.log(`Deeply Africa reveal API listening on ${port}`));
}

module.exports = app;
