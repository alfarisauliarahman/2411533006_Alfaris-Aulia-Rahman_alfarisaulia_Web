(() => {
  // active nav (auto)
  const current = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();

  document.querySelectorAll(".navbar .nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href && current === href) a.classList.add("active");
  });

  // ===== Dark mode toggle (tema tersimpan di localStorage) =====
  (() => {
    const root = document.documentElement;
    const navUl = document.querySelector(".navbar-nav");
    if (!navUl) return;
    const li = document.createElement("li");
    li.className = "nav-item d-flex align-items-center ms-lg-2 mt-2 mt-lg-0";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-sm btn-outline-light rounded-circle theme-toggle";
    btn.setAttribute("aria-label", "Ganti tema terang/gelap");
    const paint = () => {
      const dark = root.getAttribute("data-bs-theme") === "dark";
      btn.innerHTML = dark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars"></i>';
    };
    paint();
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-bs-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
    });
    li.appendChild(btn);
    navUl.appendChild(li);
  })();

  // ===== Reveal saat discroll (animasi halus) =====
  (() => {
    const showAll = () =>
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => el.classList.add("in-view"));
    // fallback: kalau IntersectionObserver tak ada, langsung tampilkan semua
    if (!("IntersectionObserver" in window)) { showAll(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    const observe = () =>
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));
    observe();
    // kartu yang dirender async (Supabase) ikut diamati
    document.addEventListener("portfolio:rendered", observe);
    document.addEventListener("gallery:rendered", observe);
    document.addEventListener("skills:rendered", observe);
    // jaring pengaman: jangan sampai ada konten yang stuck tersembunyi
    setTimeout(showAll, 2500);
  })();

  // Filter portofolio ditangani di js/render-projects.js (tombol dibuat
  // otomatis dari kategori project), jadi tidak di sini lagi.

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
          // pakai DOM API + setAttribute supaya nilai src tidak bisa
          // "keluar" jadi HTML (mencegah XSS lewat data gambar).
          const img = document.createElement("img");
          img.className = "modal-portfolio-img";
          img.alt = "Portfolio image " + (i + 1);
          img.loading = "lazy";
          img.decoding = "async";
          img.setAttribute("src", src);
          item.appendChild(img);
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

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      alertSuccess?.classList.add("d-none");
      alertError?.classList.add("d-none");
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        alertError?.classList.remove("d-none");
        return;
      }

      const payload = {
        name: (document.getElementById("name")?.value || "").trim(),
        email: (document.getElementById("email")?.value || "").trim(),
        phone: (document.getElementById("phone")?.value || "").trim(),
        message: (document.getElementById("message")?.value || "").trim(),
      };

      // Simpan ke Supabase kalau dikonfigurasi
      if (typeof supabaseClient !== "undefined" && supabaseClient) {
        if (submitBtn) submitBtn.disabled = true;
        const { error } = await supabaseClient.from("messages").insert(payload);
        if (submitBtn) submitBtn.disabled = false;
        if (error) {
          console.warn("Gagal menyimpan pesan:", error);
          alertError?.classList.remove("d-none");
          return;
        }
      }

      alertSuccess?.classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
      alertWarn?.classList.add("d-none");
    });
  }
  // touch swipe support untuk semua carousel (gallery & portofolio)
  function addSwipeSupport(carouselEl) {
    const inner = carouselEl.querySelector(".carousel-inner");
    if (!inner) return;
    if (carouselEl.dataset.swipeBound) return; // hindari pasang dobel
    carouselEl.dataset.swipeBound = "1";

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
  // gallery bisa dirender async (Supabase) -> pasang swipe ke carousel baru
  document.addEventListener("gallery:rendered", () => {
    document.querySelectorAll(".carousel").forEach(addSwipeSupport);
  });
})();
