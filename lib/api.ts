// Base URL API (harus mengarah ke backend, bukan ke domain landing).
const DEFAULT_API_BASE = "https://api.shineeducationbali.test/api/v2";
const envUrl = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL : undefined;
const BASE =
  (typeof envUrl === "string" && envUrl.trim() ? envUrl.trim() : undefined) ??
  (typeof window !== "undefined" ? DEFAULT_API_BASE : "");

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

// --- Job Applications (Lamaran Kerja) ---

export interface JobApplicationSubmitResponse {
  id?: number;
  tracking_code?: string;
  status?: string;
  message?: string;
}

function getApiErrorMessage(json: unknown, fallback: string): string {
  if (json && typeof json === "object") {
    const obj = json as { message?: string; errors?: Record<string, string[] | string> };
    if (typeof obj.message === "string" && obj.message.trim()) return obj.message;
    if (obj.errors && typeof obj.errors === "object") {
      const parts: string[] = [];
      for (const v of Object.values(obj.errors)) {
        if (Array.isArray(v)) parts.push(...v);
        else if (typeof v === "string") parts.push(v);
      }
      if (parts.length) return parts.join(". ");
    }
  }
  return fallback;
}

export async function submitJobApplication(
  formData: FormData
): Promise<JobApplicationSubmitResponse> {
  const url = `${BASE}${publicPrefix}/job-applications`;
  if (!BASE) {
    throw new Error("URL API belum dikonfigurasi. Set NEXT_PUBLIC_API_BASE_URL (mis. https://api.shineeducationbali.test/api/v2)");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const fallback =
      res.status === 0
        ? "Koneksi gagal. Cek jaringan atau CORS."
        : res.status === 502
          ? "Server API sibuk atau bermasalah (502). Coba lagi beberapa saat atau hubungi admin."
          : res.statusText || "Gagal mengirim lamaran.";
    const msg = getApiErrorMessage(json, fallback);
    throw new Error(msg);
  }
  const data = (json as { data?: JobApplicationSubmitResponse })?.data ?? (json as Record<string, unknown>);
  const tracking = data && typeof data === "object" && "tracking_code" in data ? String((data as { tracking_code?: string }).tracking_code ?? "") : "";
  return {
    id: data && typeof data === "object" && "id" in data ? Number((data as { id?: number }).id) : undefined,
    tracking_code: tracking,
    status: data && typeof data === "object" && "status" in data ? String((data as { status?: string }).status ?? "pending") : "pending",
    message: (json as { message?: string })?.message,
  };
}

export interface JobApplicationTrackResponse {
  tracking_code: string;
  status: string;
  position?: { title: string; location?: string } | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function trackJobApplication(
  trackingCode: string,
  email: string
): Promise<JobApplicationTrackResponse> {
  if (!BASE) {
    throw new Error("URL API belum dikonfigurasi.");
  }
  const res = await fetch(`${BASE}${publicPrefix}/job-applications/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ tracking_code: trackingCode.trim(), email: email.trim() }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = getApiErrorMessage(json, res.status === 404 ? "Lamaran tidak ditemukan. Pastikan ID Aplikasi dan email benar." : res.statusText || "Data aplikasi tidak ditemukan.");
    throw new Error(msg);
  }
  const data = (json as { data?: JobApplicationTrackResponse })?.data;
  if (!data || typeof data !== "object") {
    throw new Error("Data aplikasi tidak ditemukan");
  }
  return {
    tracking_code: String(data.tracking_code ?? trackingCode),
    status: String(data.status ?? "pending"),
    position: data.position ?? null,
    created_at: data.created_at ?? null,
    updated_at: data.updated_at ?? null,
  };
}
