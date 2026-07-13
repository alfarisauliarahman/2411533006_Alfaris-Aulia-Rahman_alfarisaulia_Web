// ============================================================
// RENDER GALLERY
// Ambil dari Supabase kalau dikonfigurasi; kalau tidak, pakai lokal.
// `slides` di Supabase bertipe jsonb -> otomatis jadi array JS.
// ============================================================
(async function () {
  const grid = document.getElementById("galleryGrid");
  const modals = document.getElementById("galleryModals");
  if (!grid || !modals) return;

  const esc = (v) =>
    String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  // Tolak skema berbahaya pada URL (javascript:, data:, vbscript:).
  // Selain itu (http/https, path relatif) dibiarkan apa adanya.
  const safeUrl = (v) => {
    const s = String(v == null ? "" : v).trim();
    return /^(javascript|data|vbscript):/i.test(s) ? "" : s;
  };

  const IFRAME_ALLOW =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  function galleryCard(a) {
    return `
      <div class="gallery-item" data-bs-toggle="modal" data-bs-target="#galleryModal${esc(a.id)}">
        <div class="gallery-item-inner">
          <img src="${esc(a.thumb)}" alt="${esc(a.title)}" class="gallery-img" loading="lazy" decoding="async">
          <div class="gallery-overlay"></div>
        </div>
        <div class="gallery-caption">
          <h6 class="mb-1">${esc(a.title)}</h6>
          <small class="text-muted">${esc(a.subtitle)}</small>
        </div>
      </div>`;
  }

  function slide(s, i) {
    const active = i === 0 ? " active" : "";
    const capClass = "carousel-caption" + (s.pos ? " caption-" + esc(s.pos) : "");
    const media =
      s.type === "video"
        ? `<div class="ratio ratio-16x9"><iframe src="${esc(safeUrl(s.src))}" title="YouTube video player" frameborder="0" allow="${IFRAME_ALLOW}" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
        : `<div class="gallery-img-wrap"><img src="${esc(safeUrl(s.src))}" alt="${esc(s.h5)}" loading="lazy" decoding="async"></div>`;
    return `
      <div class="carousel-item${active}">
        ${media}
        <div class="${capClass}"><h5>${esc(s.h5)}</h5><p>${esc(s.p)}</p></div>
      </div>`;
  }

  function indicators(a) {
    return a.slides
      .map(
        (_, i) =>
          `<button type="button" data-bs-target="#carousel${esc(a.id)}" data-bs-slide-to="${i}"` +
          (i === 0 ? ' class="active" aria-current="true"' : "") +
          ` aria-label="Slide ${i + 1}"></button>`
      )
      .join("");
  }

  function galleryModal(a) {
    const cid = "carousel" + esc(a.id);
    return `
      <div class="modal fade" id="galleryModal${esc(a.id)}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content bg-dark">
            <div class="modal-header border-0">
              <h5 class="text-white">${esc(a.title)}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div id="${cid}" class="carousel slide" data-bs-ride="false">
                <div class="carousel-inner">${(a.slides || []).map(slide).join("")}</div>
                <div class="carousel-indicators">${indicators(a)}</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${cid}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${cid}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  async function getGalleries() {
    if (typeof supabaseClient !== "undefined" && supabaseClient) {
      const { data, error } = await supabaseClient.from("galleries").select("*").order("sort");
      if (!error && data) return data;
      console.warn("Supabase galleries gagal, pakai lokal:", error);
    }
    return typeof GALLERIES !== "undefined" ? GALLERIES : [];
  }

  const galleries = await getGalleries();
  grid.innerHTML = galleries.map(galleryCard).join("");
  modals.innerHTML = galleries.map(galleryModal).join("");

  // beri tahu main.js supaya swipe dipasang ke carousel yang baru dibuat
  document.dispatchEvent(new CustomEvent("gallery:rendered"));
})();
