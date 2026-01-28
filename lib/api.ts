// Base URL API (harus mengarah ke backend, bukan ke domain landing).
// Jika kosong di development, fallback ke api.shineeducationbali.test agar form Produk & Layanan bisa load data.
const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? "https://api.shineeducationbali.test/api/v2"
    : "");

const publicPrefix = "/public";

export interface Jenjang {
  id: number;
  nama: string;
  kode?: string;
}

export interface Program {
  id: number;
  nama: string;
  kode?: string;
  jenjangs?: { id: number; nama: string }[];
}

export interface Paket {
  id: number;
  nama: string;
  kode?: string;
  tipe?: string;
}

export interface PaketHargaItem {
  id: number;
  program_id: number;
  jenjang_id: number;
  paket_id: number;
  min_siswa: number;
  max_siswa: number | null;
  harga: string | number;
  paket?: Paket;
  program?: Program;
  jenjang?: Jenjang;
}

export interface HargaLookupResult {
  id: number;
  harga: string | number;
  paket?: Paket;
  program?: Program;
  jenjang?: Jenjang;
}

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
}

async function handleRes<T>(res: Response): Promise<ApiResponse<T>> {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (json as { message?: string })?.message ?? res.statusText;
    throw new Error(msg);
  }
  return json as ApiResponse<T>;
}

function unwrapData<T>(out: ApiResponse<unknown>): T[] {
  const d = out.data;
  if (Array.isArray(d)) return d as T[];
  if (d && typeof d === "object" && "data" in d && Array.isArray((d as { data: unknown }).data))
    return (d as { data: T[] }).data;
  return [];
}

export async function fetchPublicJenjang(): Promise<Jenjang[]> {
  const res = await fetch(`${BASE}${publicPrefix}/catalog/jenjang?per_page=100`);
  const out = await handleRes<unknown>(res);
  return unwrapData<Jenjang>(out);
}

export async function fetchPublicProgram(): Promise<Program[]> {
  const res = await fetch(`${BASE}${publicPrefix}/catalog/program?per_page=100`);
  const out = await handleRes<unknown>(res);
  return unwrapData<Program>(out);
}

export async function fetchPublicPaketHarga(params: {
  program_id: number;
  jenjang_id: number;
}): Promise<PaketHargaItem[]> {
  const q = new URLSearchParams({
    program_id: String(params.program_id),
    jenjang_id: String(params.jenjang_id),
    per_page: "100",
    status: "Aktif",
  });
  const res = await fetch(`${BASE}${publicPrefix}/catalog/harga?${q}`);
  const out = await handleRes<unknown>(res);
  return unwrapData<PaketHargaItem>(out);
}

export async function fetchPublicHargaLookup(params: {
  program_id: number;
  jenjang_id: number;
  paket_id: number;
  jumlah_siswa: number;
  tanggal?: string;
}): Promise<HargaLookupResult | null> {
  const q = new URLSearchParams({
    program_id: String(params.program_id),
    jenjang_id: String(params.jenjang_id),
    paket_id: String(params.paket_id),
    jumlah_siswa: String(params.jumlah_siswa),
  });
  if (params.tanggal) q.set("tanggal", params.tanggal);
  const res = await fetch(`${BASE}${publicPrefix}/catalog/harga/lookup?${q}`);
  if (res.status === 404) return null;
  const out = await handleRes<HargaLookupResult>(res);
  return out.data ?? null;
}

export interface LandingRegisterPayload {
  murid_baru: {
    nama_lengkap: string;
    no_hp: string;
    email: string;
    jenis_kelamin?: "L" | "P" | null;
    tanggal_lahir?: string | null;
    alamat?: string | null;
    nama_wali?: string | null;
    no_hp_wali?: string | null;
    email_wali?: string | null;
    hubungan_wali?: string | null;
  };
  program_id: number;
  jenjang_id: number;
  paket_id: number;
  jumlah_siswa: number;
  tanggal_mulai?: string | null;
  tanggal_selesai?: string | null;
  catatan?: string | null;
  biaya_pendaftaran_amount?: number;
  biaya_pendaftaran_status?: "UNPAID" | "PAID" | "WAIVED";
  biaya_pendaftaran_due_date?: string | null;
}

export async function submitLandingRegister(
  payload: LandingRegisterPayload
): Promise<unknown> {
  const res = await fetch(`${BASE}${publicPrefix}/landing-register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const out = await handleRes<unknown>(res);
  return out.data;
}
