(() => {
  // active nav (auto)
  const current = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  document.querySelectorAll(".navbar .nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href && current === href) a.classList.add("active");
  });

  // portofolio: filter projek
  const tabs = document.querySelectorAll("#portfolioTabs .nav-link");
  const items = document.querySelectorAll(".portfolio-item");

  if (tabs.length && items.length) {
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = (btn.getAttribute("data-filter") || "all").toLowerCase();
        items.forEach((item) => {
          const cat = (item.getAttribute("data-category") || "").toLowerCase();
          const show = filter === "all" || cat === filter;
          item.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  // portofolio: modal
  const modalEl = document.getElementById("portfolioModal");
  if (modalEl) {
    const modalTitle = document.getElementById("portfolioModalLabel");
    const modalCategory = document.getElementById("modalCategory");
    const modalDesc = document.getElementById("modalDesc");
    const modalTech = document.getElementById("modalTech");
    const modalIndicators = document.getElementById("modalIndicators");
    const modalInner = document.getElementById("modalInner");

    modalEl.addEventListener("show.bs.modal", (event) => {
      const btn = event.relatedTarget;
      if (!btn) return;

      if (modalTitle)
        modalTitle.textContent = btn.getAttribute("data-title") || "Detail";
      if (modalCategory)
        modalCategory.textContent = btn.getAttribute("data-category") || "-";
      if (modalDesc)
        modalDesc.textContent = btn.getAttribute("data-desc") || "-";
      if (modalTech)
        modalTech.textContent = btn.getAttribute("data-tech") || "-";

      const images = (btn.getAttribute("data-images") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (modalIndicators) modalIndicators.innerHTML = "";
      if (modalInner) modalInner.innerHTML = "";

      images.forEach((src, i) => {
        if (modalIndicators) {
          const ind = document.createElement("button");
          ind.type = "button";
          ind.setAttribute("data-bs-target", "#modalCarousel");
          ind.setAttribute("data-bs-slide-to", String(i));
          ind.ariaLabel = "Slide " + (i + 1);
          if (i === 0) ind.classList.add("active");
          modalIndicators.appendChild(ind);
        }

        if (modalInner) {
          const item = document.createElement("div");
          item.className = "carousel-item" + (i === 0 ? " active" : "");
          item.innerHTML = `<img src="${src}" class="modal-portfolio-img" alt="Portfolio image ${i + 1}">`;
          modalInner.appendChild(item);
        }
      });
    });
  }

  // kontak: untuk validasi dan warning
  const form = document.getElementById("contactForm");
  if (form) {
    const submitBtn = document.getElementById("submitBtn");
    const alertSuccess = document.getElementById("alertSuccess");
    const alertError = document.getElementById("alertError");
    const alertWarn = document.getElementById("alertWarn");

    if (submitBtn) submitBtn.disabled = false;

    ["input", "change", "keyup"].forEach((evt) => {
      form.addEventListener(evt, () => {
        const emailEl = document.getElementById("email");
        const emailVal = (emailEl?.value || "").trim();

        if (alertWarn) {
          if (emailVal && !emailVal.includes("@")) {
            alertWarn.classList.remove("d-none");
          } else {
            alertWarn.classList.add("d-none");
          }
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      alertSuccess?.classList.add("d-none");
      alertError?.classList.add("d-none");

      form.classList.add("was-validated");

      if (form.checkValidity()) {
        alertSuccess?.classList.remove("d-none");

        form.reset();
        form.classList.remove("was-validated");
        alertWarn?.classList.add("d-none");

        if (submitBtn) submitBtn.disabled = false;
      } else {
        alertError?.classList.remove("d-none");
      }
    });
  }
  // touch swipe support untuk semua carousel (gallery & portofolio)
  function addSwipeSupport(carouselEl) {
    const inner = carouselEl.querySelector(".carousel-inner");
    if (!inner) return;

    let startX = 0;
    let startY = 0;
    let isHorizontal = null;

    inner.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isHorizontal = null;
    }, { passive: true });

    inner.addEventListener("touchmove", (e) => {
      if (isHorizontal === null) {
        const dx = Math.abs(e.touches[0].clientX - startX);
        const dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > 5 || dy > 5) {
          isHorizontal = dx >= dy;
        }
      }
      if (isHorizontal) {
        e.preventDefault(); // block scroll vertikal saat swipe horizontal
      }
    }, { passive: false });

    inner.addEventListener("touchend", (e) => {
      if (!isHorizontal) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
      if (dx < 0) {
        bsCarousel.next();
      } else {
        bsCarousel.prev();
      }
      isHorizontal = null;
    }, { passive: true });
  }

  // apply ke semua carousel yang ada di halaman
  document.querySelectorAll(".carousel").forEach(addSwipeSupport);
})();
