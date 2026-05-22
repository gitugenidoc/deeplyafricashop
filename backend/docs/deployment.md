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

The included service uses Resend from the paid-order webhook. Verify the sender domain in Resend, then set `RESEND_API_KEY` and `REVEAL_FROM_EMAIL` on the API Vercel project so reveal links are generated and emailed server-side.
