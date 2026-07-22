// ============================================================
// RENDER REPORTS (versi dinamis — dipakai report.dev.html)
// Ambil daftar laporan dari Supabase (tabel "reports"), bangun kartunya.
// Tidak menimpa report.html lama; ini duplikat untuk uji lokal.
// ============================================================
(async function () {
  const grid = document.getElementById("reportGrid");
  if (!grid) return;

  const esc = (v) =>
    String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  // href tujuan kartu sesuai jenis tautan
  const hrefFor = (r) =>
    r.link_type === "content" ? `view.html?id=${encodeURIComponent(r.id)}` : esc(r.url || "#");

  function reportCard(r) {
    const done = r.status !== "pending";
    const objectives = Array.isArray(r.objectives) ? r.objectives : [];
    const objHtml = objectives.map((o) => `<li>${esc(o)}</li>`).join("");

    if (!done) {
      return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border shadow-sm bg-body-tertiary">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="badge rounded-pill bg-secondary">${esc(r.meeting_no)}</span>
              <span class="badge bg-secondary ms-auto">Belum Ada</span>
            </div>
            <h5 class="card-title fw-semibold text-muted mb-2">${esc(r.title) || "—"}</h5>
            <p class="small text-secondary mb-3">Akan diisi setelah praktikum berlangsung.</p>
            <button class="btn btn-outline-secondary mt-auto" disabled><i class="bi bi-lock me-1"></i>Belum Tersedia</button>
          </div>
        </div>
      </div>`;
    }

    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border shadow-sm report-card">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="badge rounded-pill" style="background:#0d6efd;">${esc(r.meeting_no)}</span>
              <span class="badge bg-success ms-auto">Selesai</span>
            </div>
            <h5 class="card-title fw-semibold mb-2">${esc(r.title)}</h5>
            <p class="text-muted small fw-semibold text-uppercase mb-1" style="letter-spacing:.04em; font-size:.7rem;">Tujuan</p>
            <ul class="small text-secondary ps-3 mb-3">${objHtml}</ul>
            <a href="${hrefFor(r)}" class="btn btn-primary mt-auto">
              Lihat Selengkapnya <i class="bi bi-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>`;
  }

  async function getReports() {
    if (typeof supabaseClient !== "undefined" && supabaseClient) {
      const { data, error } = await supabaseClient.from("reports").select("*").order("sort");
      if (!error && data) return data;
      console.warn("Supabase gagal memuat reports:", error);
    }
    return [];
  }

  const reports = await getReports();

  // Kalau data kosong / Supabase gagal: JANGAN hapus konten yang ada.
  // Di report.html grid diberi data-fallback="keep" -> kartu statis tetap tampil.
  if (!reports.length) {
    if (grid.dataset.fallback === "keep") return;
    grid.innerHTML =
      '<div class="col-12"><div class="alert alert-warning">Belum ada data laporan. Jalankan <code>supabase/reports.sql</code> di Supabase dulu.</div></div>';
    return;
  }

  grid.innerHTML = reports.map(reportCard).join("");

  // strip statistik (opsional): #reportStats
  const stats = document.getElementById("reportStats");
  if (stats) {
    const done = reports.filter((r) => r.status !== "pending").length;
    const pending = reports.length - done;
    stats.innerHTML =
      `<span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2"><i class="bi bi-check-circle me-1"></i>${done} Selesai</span>` +
      (pending
        ? `<span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-3 py-2"><i class="bi bi-clock me-1"></i>${pending} Belum Ada</span>`
        : "") +
      `<span class="text-muted ms-auto" style="font-size:.82rem;">2411533006 · Alfaris Aulia Rahman</span>`;
  }
})();
