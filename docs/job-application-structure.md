# Job Applications – Struktur (Landing)

Halaman **Job Applications** di landing-shineedu dan hubungannya dengan app-shineedu.

## Route

- **URL:** `/job-applications`
- **File:** `app/(landing)/job-applications/page.tsx`

## Konten Halaman

1. **JobApplicationsHero** – Hero section
2. **JobApplicationsTabs** – Tab:
   - Form lamaran kerja (JobApplicationForm)
   - Cek status lamaran (TrackApplicationForm)
3. **JobApplicationsFaq** – FAQ

## Komponen

- `components/(landing)/(job)/job-applications/`
  - `JobApplicationsHero.tsx`
  - `JobApplicationsTabs.tsx`
  - `JobApplicationForm.tsx` – Form: nama, email, telepon, posisi, pengalaman, pendidikan, alamat, CV, surat lamaran
  - `TrackApplicationForm.tsx`
  - `JobApplicationsFaq.tsx`
  - `index.ts`

## Data

- **Posisi:** `data/(landing)/(job)/job-applications/job-applications.ts`
  - `AvailablePosition`: id, title, location
  - `availablePositions` – dipakai di dropdown posisi form

## Integrasi ke Depan

- Form mengirim ke API (mis. `POST /api/v2/job-applications`).
- Struktur data selaras dengan entity JobApplication di **app-shineedu** (`modules/job-application/domain/entities.ts`).
- CRUD admin ada di app-shineedu: `/job-applications` (list, detail, edit status).

Detail struktur lengkap (landing + app + API): lihat **app-shineedu/docs/job-application-structure.md**.
