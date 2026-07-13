// ============================================================
// DATA GALLERY (sumber lokal)
// Tiap album punya: thumbnail, judul, subjudul, dan daftar slide.
// Slide bisa bertipe "video" (YouTube embed) atau "image".
// Nanti diganti jadi ambil dari database (Supabase).
// ============================================================
const GALLERIES = [
  {
    id: "1",
    title: "Teater Musikal Kontemporer",
    subtitle: "1 video + 6 foto",
    thumb: "images/theather_1.jpg",
    slides: [
      { type: "video", src: "https://www.youtube.com/embed/KMWPxp8oL8U?si=RdOrDQdMsfPCHMYm", h5: "Teater Musikal Kontemporer", p: "'INI AKU'", pos: "center" },
      { type: "image", src: "images/theather_1.jpg", h5: "Photo 1", p: "class photogroup!", pos: "left" },
      { type: "image", src: "images/theather_2.jpg", h5: "Photo 2", p: "dancer!", pos: "center" },
      { type: "image", src: "images/theather_3.jpg", h5: "Photo 3", p: "idk what's this", pos: "right" },
      { type: "image", src: "images/theather_4.jpg", h5: "Photo 4", p: "inti!", pos: "left" },
      { type: "image", src: "images/theather_6.jpg", h5: "Photo 5", p: "again!", pos: "center" },
      { type: "image", src: "images/theather_7.jpg", h5: "Photo 6", p: "menunjuk", pos: "right" },
    ],
  },
  {
    id: "2",
    title: "Senandung Anak Menara",
    subtitle: "1 video + 1 foto",
    thumb: "https://img.youtube.com/vi/2iJZNwUmFws/maxresdefault.jpg",
    slides: [
      { type: "video", src: "https://www.youtube.com/embed/2iJZNwUmFws?si=rTJbm5tPIf-n0__p", h5: "Senandung Anak Menara", p: "Anak Indonesia", pos: "" },
      { type: "image", src: "images/aai_1.jpg", h5: "Photo 1", p: "tim produksi😆", pos: "left" },
    ],
  },
];
