# Deeply Africa Shop

Headless storefront and reveal API for the digital **Deeply Africa Mystery Country Pass**.

## Structure

- Static storefront pages live at the repository root and use `css/`, `js/`, and `assets/`.
- `backend/` contains the Node.js + Express webhook and reveal API.
- Shopify owns the product record, price, cart checkout URL, payment, and order lifecycle.

## Local setup

1. Set the public Storefront API values in `js/config.js`.
2. Install backend dependencies with `cd backend` and `npm install`.
3. Copy `backend/.env.example` to `backend/.env` and set the Shopify webhook secret.
4. Start the backend with `npm run dev` from `backend/`.
5. Serve the repository root with any static server so browser requests are not opened from `file://`.

Example static server:

```powershell
npx.cmd serve . -l 3000
```

The frontend preview expects the API at `http://localhost:8787` until `API_BASE_URL` is changed.

## Checkout flow

1. `product.html` loads Shopify product handle `mystery-country-pass`.
2. `js/shopify.js` creates or updates a Storefront API cart.
3. `cart.html` redirects the shopper to Shopify `checkoutUrl`.
4. Shopify sends the paid-order webhook to `POST /api/webhooks/shopify/orders-paid`.
5. The backend verifies HMAC, assigns a country pack, stores the tokenized reveal, and optionally sends the reveal email.
6. `reveal.html?token=...` reads `GET /api/reveal/:token`.

## Product rule

Country assignment is a content theme only. Every pass returns the same pack format and value. The sample assets are original placeholders and the country packs do not use official CAF, FIFA, federation, club logos, or player photos.

See `backend/docs/` for Shopify and deployment notes.
