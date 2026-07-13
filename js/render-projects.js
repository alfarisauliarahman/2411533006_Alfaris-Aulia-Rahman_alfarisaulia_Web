// ============================================================
// RENDER PROJECT
// Ambil data dari Supabase kalau sudah dikonfigurasi; kalau belum,
// pakai array lokal PROJECTS. Kode render kartunya sama.
// ============================================================
(async function () {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  const esc = (v) =>
    String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  function comingSoonCard(p) {
    return `
      <div class="col-md-6 col-lg-4 portfolio-item" data-category="${esc(p.filter)}">
        <div class="card portfolio-card h-100 text-center">
          <div class="d-flex align-items-center justify-content-center" style="height:190px; background:#f1f3f5;">
            <span class="fw-semibold text-secondary">Coming Soon</span>
          </div>
          <div class="card-body">
            <h5 class="fw-semibold text-muted mb-1">${esc(p.title)}</h5>
            <p class="text-secondary mb-0">${esc(p.short_desc)}</p>
          </div>
        </div>
      </div>`;
  }

  function projectCard(p) {
    return `
      <div class="col-md-6 col-lg-4 portfolio-item" data-category="${esc(p.filter)}">
        <div class="card portfolio-card h-100">
          <img src="${esc(p.image)}" class="portfolio-thumb w-100" alt="${esc(p.title)}" loading="lazy" decoding="async">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <h5 class="fw-semibold mb-1">${esc(p.title)}</h5>
              <span class="badge badge-soft">${esc(p.badge)}</span>
            </div>
            <p class="text-secondary mb-3">${esc(p.short_desc)}</p>
            <button class="btn btn-outline-primary w-100"
              data-bs-toggle="modal" data-bs-target="#portfolioModal"
              data-title="${esc(p.modal_title)}"
              data-category="${esc(p.modal_category)}"
              data-desc="${esc(p.modal_desc)}"
              data-tech="${esc(p.tech)}"
              data-images="${esc(p.images)}">
              Detail
            </button>
          </div>
        </div>
      </div>`;
  }

  async function getProjects() {
    if (typeof supabaseClient !== "undefined" && supabaseClient) {
      const { data, error } = await supabaseClient.from("projects").select("*").order("sort");
      if (!error && data) return data;
      console.warn("Supabase gagal, pakai data lokal:", error);
    }
    return typeof PROJECTS !== "undefined" ? PROJECTS : [];
  }

  const projects = await getProjects();
  grid.innerHTML = projects
    .map((p) => (p.coming_soon ? comingSoonCard(p) : projectCard(p)))
    .join("");

  // Kartu bisa muncul setelah data async; beri tahu filter untuk menyegarkan.
  document.dispatchEvent(new CustomEvent("portfolio:rendered"));
})();
