(function () {
  function showReveal() {
    const loadingState = document.getElementById("loadingState");
    const revealState = document.getElementById("revealState");
    loadingState.style.opacity = "0";
    loadingState.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      loadingState.style.display = "none";
      revealState.classList.remove("hidden");
      revealState.classList.add("flex", "animate-fade-in");
    }, 500);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[character]));
  }

  function legendItems(legends) {
    return legends.slice(0, 5).map((legend) => `<div class="flex flex-col items-center min-w-[80px]">
      <div class="w-16 h-16 rounded-full bg-black/20 border border-white/20 mb-3 shadow-inner"></div>
      <span class="font-body-md text-[12px] text-white/90 text-center font-bold tracking-wide">${escapeHtml(legend)}</span>
    </div>`).join("");
  }

  function momentItems(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function quizItems(items) {
    return items.map((item, index) => `<details class="border-t border-white/10 pt-4">
      <summary class="cursor-pointer font-bold text-white">${index + 1}. ${escapeHtml(item.question)}</summary>
      <ol class="grid gap-2 mt-3 text-white/70 md:grid-cols-2">${item.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}</ol>
      <p class="text-[#ffe088] mt-3">Answer: ${escapeHtml(item.answer)}</p>
    </details>`).join("");
  }

  function colors(country) {
    return country.colors.map((color) => `<span class="inline-block w-12 h-3 rounded-full border border-white/20" style="background:${escapeHtml(color)}"></span>`).join("");
  }

  function render(country) {
    const revealState = document.getElementById("revealState");
    revealState.innerHTML = `<div class="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden relative shadow-2xl">
      <div class="h-1 w-full bg-gradient-to-r from-[#ffe088]/0 via-[#ffe088] to-[#ffe088]/0"></div>
      <div class="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
        <div class="w-48 h-48 md:w-64 md:h-64 rounded-full bg-black/20 border border-white/10 flex items-center justify-center p-4 relative shrink-0 shadow-[0_0_40px_rgba(255,224,136,0.1)]">
          <div class="w-full h-full rounded-full border border-white/20 flex flex-col items-center justify-center text-center bg-black/20">
            <span class="font-headline-md text-headline-md text-[#ffe088]">${escapeHtml(country.code)}</span>
            <span class="font-label-caps text-label-caps text-white/70 px-4">${escapeHtml(country.badgeName)}</span>
          </div>
          <div class="absolute inset-0 rounded-full ring-1 ring-white/30 pointer-events-none"></div>
        </div>
        <div class="flex flex-col flex-grow text-center md:text-left">
          <span class="font-label-caps text-label-caps text-[#ffe088] tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2"><span class="material-symbols-outlined text-[16px]">verified</span>OFFICIAL DESIGNATION</span>
          <h2 class="font-headline-display text-headline-lg-mobile md:text-headline-display text-white uppercase tracking-tight mb-4 drop-shadow-lg">${escapeHtml(country.name)}</h2>
          <p class="font-body-md text-body-md text-white/80 max-w-lg mb-6 leading-relaxed">${escapeHtml(country.shortIntro)}</p>
          <div class="flex justify-center md:justify-start gap-3 mb-8">${colors(country)}</div>
          <div class="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 md:grid-cols-2">
            <div><span class="font-label-caps text-label-caps text-white/60 block mb-1">CAN / AFCON HISTORY</span><p class="text-white/80">${escapeHtml(country.afconHistory)}</p></div>
            <div><span class="font-label-caps text-label-caps text-white/60 block mb-1">WORLD CUP HISTORY</span><p class="text-white/80">${escapeHtml(country.worldCupHistory)}</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
      <div class="md:col-span-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col">
        <h3 class="font-label-caps text-label-caps text-[#ffe088] mb-4 border-b border-white/10 pb-3 flex items-center gap-2"><span class="material-symbols-outlined text-[16px]">stars</span>LEGENDARY ICONS</h3>
        <div class="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">${legendItems(country.legends)}</div>
      </div>
      <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-center gap-4">
        <a class="w-full bg-white text-[#900B22] font-label-caps text-label-caps py-4 rounded-full border border-transparent hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2 tracking-widest" href="${escapeHtml(country.wallpaperUrl || "#")}"><span class="material-symbols-outlined text-[18px]">download</span>WALLPAPER</a>
        <button class="w-full bg-transparent text-white font-label-caps text-label-caps py-4 rounded-full border border-white/30 hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-2 tracking-widest" data-share><span class="material-symbols-outlined text-[18px]">share</span>SHARE RESULT</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
      <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"><h3 class="font-label-caps text-label-caps text-[#ffe088] mb-4">ICONIC MOMENTS</h3><ul class="space-y-3 text-white/80">${momentItems(country.iconicMoments)}</ul></div>
      <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"><h3 class="font-label-caps text-label-caps text-[#ffe088] mb-4">DIGITAL ASSETS</h3><p class="text-white/80">Poster placeholder: <a class="underline" href="${escapeHtml(country.posterUrl || "#")}">${escapeHtml(country.posterUrl || "Coming soon")}</a></p><p class="text-white/80">Future merch code: ${escapeHtml(country.discountCodePlaceholder || "MERCH-CODE-TBA")}</p></div>
    </div>
    <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6"><h3 class="font-label-caps text-label-caps text-[#ffe088] mb-4">5-QUESTION QUIZ</h3><div class="space-y-4">${quizItems(country.quiz)}</div></div>`;
    revealState.querySelector("[data-share]").addEventListener("click", () => share(country.name));
    showReveal();
  }

  async function share(countryName) {
    const text = `I revealed ${countryName} as my African football nation on Deeply Africa.`;
    if (navigator.share) {
      await navigator.share({ title: "Deeply Africa Mystery Country Pass", text });
      return;
    }
    if (navigator.clipboard) await navigator.clipboard.writeText(text);
    window.DeeplyAfricaStore.showMessage(document.querySelector("[data-reveal-message]"), "Share text copied.");
  }

  async function init() {
    if (!document.querySelector("[data-reveal-page]")) return;
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      document.getElementById("loadingState").style.display = "none";
      window.DeeplyAfricaStore.showMessage(document.querySelector("[data-reveal-message]"), "Reveal token is missing.", true);
      return;
    }
    try {
      const response = await fetch(`${window.DeeplyAfricaConfig.API_BASE_URL}/api/reveal/${encodeURIComponent(token)}`);
      if (!response.ok) throw new Error("This reveal link is invalid or expired.");
      render(await response.json());
    } catch (error) {
      document.getElementById("loadingState").style.display = "none";
      window.DeeplyAfricaStore.showMessage(document.querySelector("[data-reveal-message]"), error.message, true);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
