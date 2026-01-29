# Job Vacancies – Struktur Berdasarkan Point Detail

Halaman **Job Vacancies** (`/job-vacancies`) disusun berdasarkan point-point detail lowongan yang sama di data dan tampilan.

---

## 1. Point-point detail lowongan (data + UI)

| Point | Field data | Tampil di card (list) | Tampil di modal (detail) |
|-------|------------|------------------------|---------------------------|
| Judul | `title` | ✓ Judul utama | ✓ Judul utama |
| Lokasi | `location` | ✓ Di bawah judul | ✓ Di bawah judul |
| Tipe | `type` | ✓ Badge (Full-time / Part-time) | ✓ Badge |
| Tanggal diposting | `postedDate` | ✓ Teks kecil | ✓ Di footer |
| Tanggal ditutup | `endDate` | ✓ Teks kecil | ✓ Di footer |
| Deskripsi | `description` | – | ✓ Section "Deskripsi Pekerjaan" |
| Kualifikasi | `requirements[]` | ✓ 3 pertama + "X lainnya" | ✓ Semua (section "Kualifikasi") |
| Tanggung jawab | `responsibilities[]` | – | ✓ Section "Tanggung Jawab" |
| Benefit | `benefits[]` | – | ✓ Section "Benefit" |

- **Card:** ringkasan (judul, lokasi, tipe, 3 kualifikasi, tanggal) + tombol **Detail**.
- **Modal:** semua point di atas; di akhir ada **Lamar Sekarang** → ke `/job-applications` (bisa dengan `?position={id}` agar posisi terpilih).

---

## 2. Alur halaman

1. **Hero** → **Daftar lowongan** (grid card) → **Why Join Us** → **CTA**.
2. Klik **Detail** pada card → **Modal** berisi semua point detail.
3. Di modal, klik **Lamar Sekarang** → ke halaman **Job Applications** (form lamaran). Opsional: posisi yang diklik bisa jadi nilai default di form (query `position`).

---

## 3. Data & komponen

- **Data:** `data/(landing)/(job)/job-vacancies/job-vacancies.ts`  
  - Interface `JobVacancy`: id, title, location, type, postedDate, endDate, requirements, responsibilities, benefits, description.  
  - Array `vacancyData` untuk list + modal.
- **Komponen:**
  - `JobVacanciesHero` – bagian atas.
  - `JobVacanciesList` – grid card; props `jobs`, `onSelectJob`.
  - `JobVacancyCard` – satu card (ringkasan sesuai point di atas).
  - `JobDetailModal` – detail lengkap (semua point) + link lamar.
  - `WhyJoinUs`, `JobVacanciesCta` – supporting section.

---

## 4. Keterkaitan dengan Job Applications

- Tombol **Lamar Sekarang** di modal mengarah ke `/job-applications`.
- Bisa dipakai query `?position={id}` agar di form lamaran posisi lowongan yang diklik otomatis terpilih (jika ID lowongan di landing sama dengan `position_id` / `job_vacancy_id` di API).
