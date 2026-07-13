// ============================================================
// KONFIGURASI SUPABASE
// Isi dua nilai di bawah dari: Supabase -> Project Settings -> API
// (Project URL dan anon public key). anon key AMAN dipakai di frontend.
// ============================================================
const SUPABASE_URL = "https://gwlxrgdsqxxhaxobqqza.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_g57pEZFGriMH2vewtDMYuA_hGCcRznC";

// Kalau belum diisi, situs otomatis pakai data lokal (array di *-data.js).
const supabaseClient =
  SUPABASE_URL.startsWith("http") && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
