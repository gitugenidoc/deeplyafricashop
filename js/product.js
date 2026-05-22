(function () {
  let selectedVariant = null;

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach((target) => {
      target.textContent = value;
    });
  }

  function setImage(selector, image) {
    const target = document.querySelector(selector);
    if (!target || !image) return;
    if (target.tagName !== "IMG") {
      target.style.backgroundImage = `url("${image.url}")`;
      return;
    }
    target.src = image.url;
    target.alt = image.altText || "Deeply Africa Mystery Country Pass";
  }

  async function addProduct(redirect) {
    const message = document.querySelector("[data-product-message]");
    if (!selectedVariant) {
      window.DeeplyAfricaStore.showMessage(message, "The Shopify pass variant is not available yet.", true);
      return;
    }
    try {
      await window.DeeplyAfricaStore.ensureCart(selectedVariant.id, 1);
      if (redirect) {
        window.location.assign("cart.html");
        return;
      }
      window.DeeplyAfricaStore.showMessage(message, "Pass added to your cart.");
    } catch (error) {
      window.DeeplyAfricaStore.showMessage(message, error.message, true);
    }
  }

  async function init() {
    const message = document.querySelector("[data-product-message]");
    if (!document.querySelector("[data-product-page]")) return;
    document.querySelectorAll("[data-add-product]").forEach((button) => button.addEventListener("click", () => addProduct(false)));
    document.querySelectorAll("[data-buy-product]").forEach((button) => button.addEventListener("click", () => addProduct(true)));
    try {
      const product = await window.DeeplyAfricaShopify.getProductByHandle(window.DeeplyAfricaConfig.PRODUCT_HANDLE);
      if (!product) throw new Error("Shopify product handle was not found.");
      selectedVariant = product.variants.nodes.find((variant) => variant.availableForSale);
      if (!selectedVariant) {
        throw new Error("The Shopify pass variant is not available for sale yet.");
      }
      setText("[data-product-title]", product.title);
      setText("[data-product-description]", product.description);
      setText("[data-product-price]", selectedVariant && window.DeeplyAfricaStore.formatMoney(selectedVariant.price));
      setImage("[data-product-image]", product.featuredImage);
    } catch (error) {
      window.DeeplyAfricaStore.showMessage(message, `${error.message} Using preview content until Shopify is configured.`, true);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
