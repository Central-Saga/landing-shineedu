# Job Applications – Troubleshooting

## Error "undefined" atau "tidak ada lamaran"

### 1. Form lamaran berhasil tapi app-shineedu tetap kosong

- **Penyebab:** Data tidak sampai ke API (form dulu pakai mock).
- **Sekarang:** Form mengirim ke `POST /api/v2/public/job-applications`. Pastikan:
  - **NEXT_PUBLIC_API_BASE_URL** di landing mengarah ke API (mis. `https://api.shineeducationbali.test/api/v2`). Copy dari `.env.example` ke `.env.local`.
  - API (api-shineedu) sudah jalan dan migration `job_applications` / `job_vacancies` sudah dijalankan.
  - CORS di API mengizinkan domain landing (mis. `https://landing.shineeducationbali.test`).

### 2. Error saat submit lamaran

- **"URL API belum dikonfigurasi"** → Set `NEXT_PUBLIC_API_BASE_URL` di `.env.local` (landing).
- **"Koneksi gagal" / network error** → Cek URL API, CORS, dan koneksi ke server.
- **422 / validation error** → Pesan dari backend (mis. email invalid, resume wajib). Perbaiki input sesuai pesan.
- **502 Bad Gateway / "Failed to fetch"** → Sering karena backend (Laravel/PHP) crash atau tidak merespons sebelum Caddy timeout. Cek:
  - Container/service API (api:8000) benar-benar jalan.
  - Di api-shineedu: `php artisan migrate` dan `job_vacancies` punya baris (position_id dari form harus ada di tabel).
  - PHP `post_max_size` / `upload_max_filesize` cukup untuk file CV (min 5MB).
  - Setelah perbaikan kode (service hanya kirim data fillable ke Model::create; controller pakai try-catch), error akan jadi 500 JSON dengan pesan jelas, bukan 502 kosong.

### 3. Pantau status: "Lamaran tidak ditemukan"

- Pastikan **ID Aplikasi** dan **email** sama persis dengan saat melamar (setelah submit sukses, ID tampil di halaman; simpan/copy).
- ID Aplikasi format: `JA-XXXXXXXX` (dari backend).

### 4. App-shineedu: "Tidak ada lamaran kerja ditemukan"

- Pastikan user login punya permission **job_application.view**.
- Di api-shineedu jalankan: `php artisan db:seed --class=RoleAndPermissionSeeder` (supaya permission `job_application.*` ada), lalu assign ke role.
- Pastikan migration job_applications sudah jalan: `php artisan migrate`.
