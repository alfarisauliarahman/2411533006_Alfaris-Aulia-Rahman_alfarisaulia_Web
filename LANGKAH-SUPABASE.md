# Dari Statis ke Dinamis (pakai Supabase)

## Langkah 0: Pahami dulu konsepnya
Buka file **`demo-dinamis.html`** di browser (klik dua kali).
Kartu project yang muncul itu **tidak ada di HTML** — dibuat oleh JavaScript dari
data (array `PROJECTS`). Itulah "dinamis": HTML kosong, isi datang dari data.

Nanti, satu-satunya yang berubah: **data-nya diambil dari Supabase**, bukan dari
array di file. Kode yang menggambar kartu (`renderProjects`) tetap sama.

## Langkah 1: Buat akun & project Supabase (gratis)
1. Buka https://supabase.com -> Sign in with GitHub.
2. Klik **New Project**. Beri nama (mis. `portofolio`), pilih region terdekat
   (Singapore), buat password database.
3. Tunggu ~1 menit sampai project siap.

## Langkah 2: Buat tabel `projects`
Di dashboard Supabase -> **Table Editor** -> **New table**:
- Nama tabel: `projects`
- Matikan "Enable Row Level Security" dulu (biar gampang saat belajar), atau
  aktifkan lalu buat policy "read for anon".
- Kolom:

| Kolom | Tipe |
|---|---|
| `id` | int8 (primary, auto) |
| `title` | text |
| `category` | text |
| `desc` | text |
| `tech` | text |
| `image` | text (URL gambar) |

Lalu **Insert row** beberapa project (isi manual dulu untuk uji coba).

## Langkah 3: Ambil kunci koneksi
Dashboard -> **Project Settings** -> **API**:
- Salin **Project URL**
- Salin **anon public key**

Kirim dua nilai itu ke sini, nanti aku sambungkan `demo-dinamis.html` ke
Supabase (ganti bagian data lokal jadi ambil dari tabel `projects`).

## Langkah 4 (nanti): Gambar
- Gambar yang sudah ada (foto, dll) tetap sebagai file di folder `images/`.
- Untuk gambar yang mau diupload lewat dashboard nanti: pakai **Supabase
  Storage** (buat bucket publik `covers`), upload, salin URL-nya ke kolom
  `image`.

## Catatan
- Folder ini terpisah dari repo GitHub kamu yang lama. Tidak ada yang berubah di
  GitHub sampai kamu memutuskan push.
- Free tier Supabase: project bisa "pause" kalau tidak diakses ~1 minggu (tinggal
  klik resume di dashboard).
