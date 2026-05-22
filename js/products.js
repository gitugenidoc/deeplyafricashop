(function () {
  async function init() {
    const grid = document.querySelector("[data-products-grid]");
    if (!grid) return;
    try {
      const product = await window.DeeplyAfricaShopify.getProductByHandle(window.DeeplyAfricaConfig.PRODUCT_HANDLE);
      if (!product) throw new Error("Product not found.");
      const variant = product.variants.nodes[0];
      grid.querySelector("[data-product-title]").textContent = product.title;
      grid.querySelector("[data-product-price]").textContent = window.DeeplyAfricaStore.formatMoney(variant.price);
      if (product.featuredImage) {
        const image = grid.querySelector("[data-product-image]");
        image.src = product.featuredImage.url;
        image.alt = product.featuredImage.altText || product.title;
      }
    } catch (error) {
      const message = document.querySelector("[data-products-message]");
      window.DeeplyAfricaStore.showMessage(message, `${error.message} Showing the configured preview pass.`, true);
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();
