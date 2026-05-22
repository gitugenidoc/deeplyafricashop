(function () {
  let cart = null;

  function renderEmpty(target) {
    target.innerHTML = `<div class="bg-black/20 p-8 rounded-2xl border border-white/10">
      <h2 class="font-headline-md text-headline-md text-white mb-3">Your cart is empty.</h2>
      <p class="text-white/70 font-body-md text-body-md mb-6">Add a Mystery Country Pass to continue to secure Shopify checkout.</p>
      <a class="inline-flex bg-white text-[#6a081d] font-bold font-label-caps text-label-caps py-4 px-6 rounded-full" href="product.html">View pass</a>
    </div>`;
  }

  function imageFor(line) {
    const variant = line.merchandise;
    return (variant.image && variant.image.url) ||
      (variant.product.featuredImage && variant.product.featuredImage.url) ||
      "assets/mystery-pass.svg";
  }

  function renderCart(nextCart) {
    cart = nextCart;
    const items = document.querySelector("[data-cart-lines]");
    const count = document.querySelector("[data-cart-label]");
    const subtotal = document.querySelector("[data-cart-subtotal]");
    const total = document.querySelector("[data-cart-total]");
    if (!items) return;
    if (!cart || !cart.lines.nodes.length || cart.totalQuantity < 1) {
      if (count) count.textContent = "No items in your premium selection.";
      renderEmpty(items);
      if (subtotal) subtotal.textContent = "$0.00";
      if (total) total.textContent = "$0.00";
      return;
    }
    if (count) count.textContent = `${cart.totalQuantity} item${cart.totalQuantity === 1 ? "" : "s"} in your premium selection.`;
    items.innerHTML = cart.lines.nodes.map((line) => {
      const variant = line.merchandise;
      return `<article class="flex flex-col sm:flex-row gap-6 bg-black/20 p-4 rounded-2xl border border-white/10 relative">
        <div class="w-full sm:w-32 h-32 bg-white/10 shrink-0 relative overflow-hidden rounded-xl"><img class="w-full h-full object-cover" src="${imageFor(line)}" alt="${variant.product.title}"></div>
        <div class="flex flex-col flex-grow justify-between py-1">
          <div class="flex justify-between items-start gap-4"><div><h3 class="font-body-lg text-body-lg text-white font-bold mb-1">${variant.product.title}</h3><span class="inline-block bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full font-label-caps text-label-caps mb-2">Digital Delivery</span><p class="text-white/70 text-body-md font-body-md mb-2">${variant.title !== "Default Title" ? variant.title : "Secure country reveal link"}</p></div><p class="font-body-lg text-body-lg text-white font-bold whitespace-nowrap">${window.DeeplyAfricaStore.formatMoney(line.cost.totalAmount)}</p></div>
          <div class="flex justify-between items-end mt-4">
            <div class="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden"><button class="px-3 py-1 text-white hover:bg-white/20 transition-colors" data-quantity="${line.quantity - 1}" data-line="${line.id}" aria-label="Decrease quantity">-</button><span class="px-4 py-1 text-white font-body-md text-body-md border-x border-white/20 bg-transparent">${line.quantity}</span><button class="px-3 py-1 text-white hover:bg-white/20 transition-colors" data-quantity="${line.quantity + 1}" data-line="${line.id}" aria-label="Increase quantity">+</button></div>
            <button class="text-white/50 hover:text-white transition-colors text-body-md font-body-md underline underline-offset-4 decoration-white/30 hover:decoration-white" data-remove-line="${line.id}">Remove</button>
          </div>
        </div>
      </article>`;
    }).join("");
    subtotal.textContent = window.DeeplyAfricaStore.formatMoney(cart.cost.subtotalAmount);
    total.textContent = window.DeeplyAfricaStore.formatMoney(cart.cost.totalAmount);
  }

  async function refresh() {
    const message = document.querySelector("[data-cart-message]");
    try {
      renderCart(await window.DeeplyAfricaShopify.getCart(window.DeeplyAfricaStore.getCartId()));
    } catch (error) {
      renderEmpty(document.querySelector("[data-cart-lines]"));
      window.DeeplyAfricaStore.showMessage(message, error.message, true);
    }
  }

  async function mutate(event) {
    const lineId = event.target.dataset.line || event.target.dataset.removeLine;
    if (!lineId || !cart) return;
    event.target.disabled = true;
    try {
      const quantity = Number(event.target.dataset.quantity);
      const nextCart = event.target.dataset.removeLine || quantity < 1
        ? await window.DeeplyAfricaShopify.removeCartLine(cart.id, lineId)
        : await window.DeeplyAfricaShopify.updateCartLine(cart.id, lineId, quantity);
      renderCart(nextCart);
      window.DeeplyAfricaStore.updateCartBadges();
    } catch (error) {
      window.DeeplyAfricaStore.showMessage(document.querySelector("[data-cart-message]"), error.message, true);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector("[data-cart-page]")) return;
    document.querySelector("[data-cart-lines]").addEventListener("click", mutate);
    document.querySelector("[data-checkout]").addEventListener("click", async () => {
      try {
        await window.DeeplyAfricaShopify.redirectToCheckout(window.DeeplyAfricaStore.getCartId());
      } catch (error) {
        window.DeeplyAfricaStore.showMessage(document.querySelector("[data-cart-message]"), error.message, true);
      }
    });
    refresh();
  });
})();
