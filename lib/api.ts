// Base URL API: client (browser) vs server (SSR).
// Di Docker, SSR harus pakai API_SERVER_URL (http://api:8000/...) agar container landing bisa reach container API.
const DEFAULT_API_BASE = "https://api.shineeducationbali.test/api/v2";

function getApiBase(): string {
  const fromEnv =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL
      ? String(process.env.NEXT_PUBLIC_API_BASE_URL).trim()
      : "";
  const clientBase = fromEnv || DEFAULT_API_BASE;
  // Server-side (SSR): pakai API_SERVER_URL jika ada (untuk Docker / internal network)
  if (typeof window === "undefined") {
    const serverUrl =
      typeof process !== "undefined" && process.env.API_SERVER_URL
        ? String(process.env.API_SERVER_URL).trim()
        : "";
    if (serverUrl) return serverUrl;
  }
  return clientBase;
}

const publicPrefix = "/public";

function apiBase(): string {
  return getApiBase();
}

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
  // Laravel ApiResponse::paginated + Resource::collection → data = { data: [...], meta, links }
  if (d && typeof d === "object" && "data" in d) {
    const inner = (d as { data: unknown }).data;
    if (Array.isArray(inner)) return inner as T[];
  }
  return [];
}

/** Item dari API public/gallery (untuk halaman gallery landing). */
export interface PublicGalleryItem {
  id: number;
  title: string;
  alt?: string;
  image_url: string;
  sort_order?: number | null;
  is_active?: boolean;
}

export async function fetchPublicGallery(): Promise<PublicGalleryItem[]> {
  if (!apiBase()) return [];
  try {
    const res = await fetch(`${apiBase()}${publicPrefix}/gallery`);
    const out = await handleRes<unknown>(res);
    const raw = unwrapData<PublicGalleryItem>(out);
    return raw ?? [];
  } catch {
    return [];
  }
}

/** Blog item dari API public/blogs (untuk halaman blog landing). Hanya post dengan status published yang dikembalikan oleh API. */
export interface PublicBlogAuthor {
  id: number;
  name: string;
  email: string;
}

export interface PublicBlogAsset {
  id: number;
  file_url: string;
  title?: string | null;
  description?: string | null;
}

export interface PublicBlogItem {
  id: number;
  title: string;
  content: string;
  excerpt?: string | null;
  status: string;
  category: string;
  featured_image_path?: string | null;
  featured_image_url?: string | null;
  created_at: string;
  updated_at: string;
  author?: PublicBlogAuthor | null;
  assets?: PublicBlogAsset[];
}

/**
 * Daftar blog publik dari API GET /public/blogs.
 * Respons Laravel: { success, message, data: { data: [...], meta }, meta }.
 * Hanya post status "published" yang dikembalikan oleh API.
 * Melempar error jika jaringan gagal agar pemanggil (client) bisa menampilkan pesan.
 */
export async function fetchPublicBlogs(params?: {
  per_page?: number;
  category?: string;
}): Promise<PublicBlogItem[]> {
  const base = apiBase();
  if (!base) {
    throw new Error("URL API belum dikonfigurasi (NEXT_PUBLIC_API_BASE_URL)");
  }
  const qs = params
    ? new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null)
        ) as Record<string, string>
      ).toString()
    : "";
  const url = `${base}${publicPrefix}/blogs${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API blog: ${res.status} ${res.statusText}`);
  }
  const body = (await res.json().catch(() => null)) as {
    success?: boolean;
    data?: unknown;
  } | null;
  if (!body || body.success === false) return [];
  const d = body.data;
  if (Array.isArray(d)) return d as PublicBlogItem[];
  if (d && typeof d === "object" && "data" in d && Array.isArray((d as { data: unknown }).data))
    return (d as { data: PublicBlogItem[] }).data;
  return [];
}

/** Detail blog publik; mengembalikan null jika tidak ditemukan atau status bukan "published". */
export async function fetchPublicBlog(id: number): Promise<PublicBlogItem | null> {
  if (!apiBase()) return null;
  try {
    const res = await fetch(`${apiBase()}${publicPrefix}/blogs/${id}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const out = await handleRes<PublicBlogItem>(res);
    const data = out?.data as PublicBlogItem | undefined;
    return data ?? null;
  } catch {
    return null;
  }
}

/** Strip HTML tags and truncate for excerpt. */
function stripHtml(html: string, maxLen = 160): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "…";
}

/** Map API blog item to BlogPost shape for grid/card. */
export interface BlogPostShape {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

const CATEGORY_LABEL: Record<string, string> = {
  tips: "Tips",
  travel: "Travel",
  trips: "Trips",
};

export function mapPublicBlogToPost(item: PublicBlogItem): BlogPostShape {
  const image =
    item.featured_image_url ?? item.assets?.[0]?.file_url ?? "/pichome/hero-section.JPG";
  const date =
    item.created_at != null
      ? new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";
  const excerptText = item.excerpt?.trim() ?? "";
  const excerpt =
    excerptText !== "" ? excerptText : stripHtml(item.content ?? "");
  return {
    id: item.id,
    title: item.title,
    excerpt,
    image,
    category: CATEGORY_LABEL[item.category] ?? item.category,
    date,
    author: item.author?.name ?? "",
  };
}

export async function fetchPublicJenjang(): Promise<Jenjang[]> {
  const res = await fetch(`${apiBase()}${publicPrefix}/catalog/jenjang?per_page=100`);
  const out = await handleRes<unknown>(res);
  return unwrapData<Jenjang>(out);
}

export async function fetchPublicProgram(): Promise<Program[]> {
  const res = await fetch(`${apiBase()}${publicPrefix}/catalog/program?per_page=100`);
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
  const res = await fetch(`${apiBase()}${publicPrefix}/catalog/harga?${q}`);
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
  const res = await fetch(`${apiBase()}${publicPrefix}/catalog/harga/lookup?${q}`);
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
  const res = await fetch(`${apiBase()}${publicPrefix}/landing-register`, {
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
  const url = `${apiBase()}${publicPrefix}/job-applications`;
  if (!apiBase()) {
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
  if (!apiBase()) {
    throw new Error("URL API belum dikonfigurasi.");
  }
  const res = await fetch(`${apiBase()}${publicPrefix}/job-applications/track`, {
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