(function () {
  const config = window.DeeplyAfricaConfig || {};
  const storageKey = config.CART_STORAGE_KEY || "deeply-africa-shopify-cart-id";

  function getCartId() {
    return localStorage.getItem(storageKey);
  }

  function setCartId(cartId) {
    localStorage.setItem(storageKey, cartId);
    updateCartBadges();
  }

  function formatMoney(money) {
    if (!money) return "$7.99";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: money.currencyCode || "USD"
    }).format(Number(money.amount));
  }

  function showMessage(target, message, isError) {
    if (!target) return;
    target.textContent = message;
    target.classList.toggle("notice-error", Boolean(isError));
    target.hidden = false;
  }

  async function ensureCart(variantId, quantity) {
    const existingId = getCartId();
    const shopify = window.DeeplyAfricaShopify;
    const cart = existingId
      ? await shopify.addToCart(existingId, variantId, quantity)
      : await shopify.createCart(variantId, quantity);
    if (!cart || cart.totalQuantity < quantity) {
      throw new Error("Shopify did not add the pass. Check product availability and inventory.");
    }
    setCartId(cart.id);
    return cart;
  }

  async function updateCartBadges() {
    const cartId = getCartId();
    const badges = document.querySelectorAll("[data-cart-count]");
    if (!badges.length) return;
    if (!cartId || !window.DeeplyAfricaShopify) {
      badges.forEach((badge) => { badge.textContent = "0"; });
      return;
    }
    try {
      const cart = await window.DeeplyAfricaShopify.getCart(cartId);
      badges.forEach((badge) => { badge.textContent = cart ? String(cart.totalQuantity) : "0"; });
    } catch (error) {
      badges.forEach((badge) => { badge.textContent = "0"; });
    }
  }

  window.DeeplyAfricaStore = {
    ensureCart,
    formatMoney,
    getCartId,
    setCartId,
    showMessage,
    updateCartBadges
  };

  document.addEventListener("DOMContentLoaded", updateCartBadges);
})();
