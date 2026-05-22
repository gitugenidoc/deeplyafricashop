# Backend setup

## Requirements

- Node.js 20 or newer.
- A Shopify webhook secret for paid-order verification.
- A Neon Postgres database connected with `DATABASE_URL`.

## Environment

Copy `.env.example` to `.env`.

- `PORT`: Express port.
- `DATABASE_URL`: required Neon Postgres connection string.
- `SHOPIFY_WEBHOOK_SECRET`: secret used for `X-Shopify-Hmac-Sha256`.
- `STOREFRONT_ORIGIN`: frontend origin allowed by CORS.
- `REVEAL_BASE_URL`: public reveal page URL before its token query parameter.
- `RESEND_API_KEY`: required Resend API key for reveal email delivery.
- `REVEAL_FROM_EMAIL`: verified Resend sender, for example `Deeply Africa Shop <reveal@shop.deeplyafrica.com>`.

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

Health check:

```text
GET http://localhost:8787/api/health
```

The storage service creates the `reveal_orders` table on first use; `docs/schema.sql` is also available for manual setup in the Neon SQL editor.
