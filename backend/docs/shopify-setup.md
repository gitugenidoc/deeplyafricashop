# Shopify setup

## Product

1. Create the digital Shopify product named `Deeply Africa Mystery Country Pass`.
2. Set its storefront handle to `mystery-country-pass`.
3. Configure the single-pass selling price at `$7.99`.
4. Model the 3-pass and 10-pass offers in Shopify with explicit variants, selling plans, or additional fixed-value products before exposing those offers as checkout buttons.
5. Keep the product description explicit that all passes deliver the same pack type and value.

## Storefront API

Create a Storefront API access token with product and cart read/write storefront permissions required by the cart flow. Put only that public Storefront token in `js/config.js`.

Do not put an Admin API token, webhook secret, or private app secret in frontend files.

## Paid-order webhook

Create an `orders/paid` webhook for:

```text
https://api-shop.deeplyafrica.com/api/webhooks/shopify/orders-paid
```

Set `SHOPIFY_WEBHOOK_SECRET` to the secret used by Shopify for that subscription. The backend keeps the webhook body raw for HMAC verification and ignores paid orders whose line-item title/name does not contain `Mystery Country Pass`.

## Checkout return

Point Shopify's post-purchase messaging or customer email to explain that the reveal email arrives after payment. The included `success.html` is a static explanation page for that handoff.
