// ============================================================
// DATA PROJECT (fallback lokal)
// Nama field sama persis dengan kolom tabel `projects` di Supabase,
// jadi kode render tidak perlu berubah saat sumbernya ganti.
// ============================================================
const PROJECTS = [
  {
    filter: "web",
    image: "images/portofolio_1.1.png",
    title: "Web Profile Bootstrap",
    badge: "Web",
    short_desc: "Membuat web profile berbasis Bootstrap 5",
    modal_title: "Web Profile Bootstrap",
    modal_category: "Web",
    modal_desc: "Web profile berbasis Bootstrap 5 untuk memenuhi tugas Desain Web.",
    tech: "Bootstrap 5, HTML, CSS, JavaScript",
    images: "images/portofolio_1.1.png,images/portofolio_1.2.png,images/portofolio_1.3.png",
    coming_soon: false,
  },
  {
    filter: "design",
    image: "images/portofolio_2.1.png",
    title: "Aplikasi Kontak",
    badge: "Java",
    short_desc: "Aplikasi Kontak berbasis Java GUI.",
    modal_title: "UI Landing Concept",
    modal_category: "Design",
    modal_desc: "Aplikasi Kontak berbasis Java GUI sederhana untuk memenuhi UAP Algoritma dan Pemrograman.",
    tech: "Java",
    images: "images/portofolio_2.1.png,images/portofolio_2.2.png",
    coming_soon: false,
  },
  {
    filter: "music",
    image: "images/portofolio_3.png",
    title: "Theater Sound Designer",
    badge: "Music",
    short_desc: "Penata suara untuk kebutuhan Teater Drama Musikal.",
    modal_title: "Music Project",
    modal_category: "Music",
    modal_desc: "Penata suara untuk kebutuhan Teater Drama Musikal",
    tech: "FL Studio",
    images: "images/portofolio_3.png",
    coming_soon: false,
  },
  { filter: "java", title: "Java Project", short_desc: "Sedang dikembangkan.", coming_soon: true },
  { filter: "web", title: "Web Project", short_desc: "Sedang dikembangkan.", coming_soon: true },
  { filter: "design", title: "Design Project", short_desc: "Sedang dikembangkan.", coming_soon: true },
];
