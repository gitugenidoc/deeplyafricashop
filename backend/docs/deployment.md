# Deployment

## Frontend

Deploy repository-root static files to Vercel static hosting or Cloudflare Pages with:

- Production domain: `shop.deeplyafrica.com`.
- `js/config.js` updated to the production Shopify domain, Storefront token, Storefront API version, and `https://api-shop.deeplyafrica.com`.

## Backend

Import `backend/` as a separate Vercel project. `api/index.js` exports the Express app and `vercel.json` rewrites API traffic into that Vercel Function.

- API domain: `api-shop.deeplyafrica.com`.
- Set all backend environment variables from `.env.example`.
- Connect the Neon integration to the API project and ensure `DATABASE_URL` exists in Vercel production environment variables.
- Keep HTTPS enabled because reveal links and Shopify webhooks carry sensitive order flow data.

## Email

The included service calls an optional `REVEAL_EMAIL_WEBHOOK_URL`. Connect that endpoint to an email provider or replace `services/emailService.js` with the approved provider SDK while keeping reveal URLs generated server-side.
