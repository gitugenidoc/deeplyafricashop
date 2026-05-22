(function () {
  const config = window.DeeplyAfricaConfig;

  function assertConfigured() {
    if (!config.SHOPIFY_DOMAIN || config.SHOPIFY_DOMAIN.includes("your-store")) {
      throw new Error("Set SHOPIFY_DOMAIN in js/config.js.");
    }
    if (!config.STOREFRONT_ACCESS_TOKEN || config.STOREFRONT_ACCESS_TOKEN.includes("replace")) {
      throw new Error("Set STOREFRONT_ACCESS_TOKEN in js/config.js.");
    }
  }

  async function shopifyFetch(query, variables) {
    assertConfigured();
    const response = await fetch(
      `https://${config.SHOPIFY_DOMAIN}/api/${config.API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": config.STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({ query, variables })
      }
    );
    const payload = await response.json();
    if (!response.ok || payload.errors) {
      const message = payload.errors ? payload.errors.map((error) => error.message).join(" ") : response.statusText;
      throw new Error(message || "Shopify request failed.");
    }
    return payload.data;
  }

  const moneyFragment = "amount currencyCode";
  const cartFragment = `
    id
    checkoutUrl
    totalQuantity
    cost { subtotalAmount { ${moneyFragment} } totalAmount { ${moneyFragment} } }
    lines(first: 25) {
      nodes {
        id
        quantity
        cost { totalAmount { ${moneyFragment} } }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText }
            price { ${moneyFragment} }
            product { title handle featuredImage { url altText } }
          }
        }
      }
    }
  `;

  async function getProductByHandle(handle) {
    const data = await shopifyFetch(
      `query ProductByHandle($handle: String!) {
        product(handle: $handle) {
          id title handle description
          featuredImage { url altText }
          variants(first: 10) { nodes { id title availableForSale price { ${moneyFragment} } } }
        }
      }`,
      { handle }
    );
    return data.product;
  }

  function cartError(payload) {
    const errors = payload.userErrors || [];
    if (errors.length) {
      throw new Error(errors.map((error) => error.message).join(" "));
    }
    return payload.cart;
  }

  async function createCart(variantId, quantity) {
    const data = await shopifyFetch(
      `mutation CartCreate($lines: [CartLineInput!]) {
        cartCreate(input: { lines: $lines }) {
          cart { ${cartFragment} }
          userErrors { field message }
        }
      }`,
      { lines: [{ merchandiseId: variantId, quantity }] }
    );
    return cartError(data.cartCreate);
  }

  async function addToCart(cartId, variantId, quantity) {
    const data = await shopifyFetch(
      `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ${cartFragment} }
          userErrors { field message }
        }
      }`,
      { cartId, lines: [{ merchandiseId: variantId, quantity }] }
    );
    return cartError(data.cartLinesAdd);
  }

  async function getCart(cartId) {
    if (!cartId) return null;
    const data = await shopifyFetch(
      `query Cart($id: ID!) { cart(id: $id) { ${cartFragment} } }`,
      { id: cartId }
    );
    return data.cart;
  }

  async function updateCartLine(cartId, lineId, quantity) {
    const data = await shopifyFetch(
      `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ${cartFragment} }
          userErrors { field message }
        }
      }`,
      { cartId, lines: [{ id: lineId, quantity }] }
    );
    return cartError(data.cartLinesUpdate);
  }

  async function removeCartLine(cartId, lineId) {
    const data = await shopifyFetch(
      `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ${cartFragment} }
          userErrors { field message }
        }
      }`,
      { cartId, lineIds: [lineId] }
    );
    return cartError(data.cartLinesRemove);
  }

  async function redirectToCheckout(cartId) {
    const cart = await getCart(cartId);
    if (!cart || !cart.checkoutUrl) {
      throw new Error("Cart checkout URL is unavailable.");
    }
    window.location.assign(cart.checkoutUrl);
  }

  window.DeeplyAfricaShopify = {
    shopifyFetch,
    getProductByHandle,
    createCart,
    addToCart,
    getCart,
    updateCartLine,
    removeCartLine,
    redirectToCheckout
  };
})();
