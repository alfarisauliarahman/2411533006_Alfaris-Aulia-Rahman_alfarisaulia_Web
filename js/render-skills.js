// ============================================================
// RENDER SKILLS
// Ambil dari Supabase kalau dikonfigurasi; kalau tidak, pakai lokal.
// ============================================================
(async function () {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  const esc = (v) =>
    String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  async function getSkills() {
    if (typeof supabaseClient !== "undefined" && supabaseClient) {
      const { data, error } = await supabaseClient.from("skills").select("*").order("sort");
      if (!error && data) return data;
      console.warn("Supabase skills gagal, pakai lokal:", error);
    }
    return typeof SKILLS !== "undefined" ? SKILLS : [];
  }

  const skills = await getSkills();
  grid.innerHTML = skills.map((s) => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="card feature-card h-100 text-center">
          <div class="card-body">
            <div class="icon-badge mx-auto mb-3"><i class="bi ${esc(s.icon)} fs-5"></i></div>
            <h6 class="fw-semibold mb-1">${esc(s.title)}</h6>
            <small class="text-secondary">${esc(s.note)}</small>
          </div>
        </div>
      </div>`).join("");
})();
