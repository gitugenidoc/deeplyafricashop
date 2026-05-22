# Deployment

## Frontend

Deploy repository-root static files to Vercel static hosting or Cloudflare Pages with:

- Production domain: `shop.deeplyafrica.com`.
- `js/config.js` updated to the production Shopify domain, Storefront token, Storefront API version, and `https://api-shop.deeplyafrica.com`.

## Backend

Deploy `backend/` to Render, Railway, Vercel-compatible Node hosting, or another Express-capable environment.

- API domain: `api-shop.deeplyafrica.com`.
- Set all backend environment variables from `.env.example`.
- Ensure the storage layer is durable. `data/orders.json` is fine for a sample or single-instance prototype, not a multi-instance serverless deployment.
- Keep HTTPS enabled because reveal links and Shopify webhooks carry sensitive order flow data.

## Email

The included service calls an optional `REVEAL_EMAIL_WEBHOOK_URL`. Connect that endpoint to an email provider or replace `services/emailService.js` with the approved provider SDK while keeping reveal URLs generated server-side.
