# Penggunaan `lib` di Landing & UX Konfirmasi Sukses Lamaran

## 1. Penggunaan folder `lib/`

Folder `lib/` di landing-shineedu berisi kode yang dipakai ulang di banyak halaman: konfigurasi API, konstanta tema, dan utilitas.

### `lib/api.ts`

- **Fungsi:** Satu titik akses ke backend (api-shineedu). Semua panggilan `fetch` ke API sebaiknya lewat fungsi di sini.
- **Isi utama:**
  - **BASE URL:** `NEXT_PUBLIC_API_BASE_URL` atau default `https://api.shineeducationbali.test/api/v2` (hanya di browser).
  - **Public prefix:** Semua endpoint publik pakai `/public/...` (tanpa auth).
- **Yang dipakai untuk Job Applications:**
  - **`submitJobApplication(formData)`**  
    Form lamaran memanggil ini dengan `FormData` (first_name, last_name, email, phone, position_id, experience, education, address, resume, cover_letter).  
    Return: `{ id, tracking_code, status, message }`. Dipakai untuk tampilkan ID Aplikasi setelah sukses.
  - **`trackJobApplication(trackingCode, email)`**  
    Form “Pantau Status” memanggil ini. Return: `{ tracking_code, status, position, created_at, updated_at }`. Dipakai untuk menampilkan status lamaran.
- **Lainnya di `api.ts`:** Catalog (jenjang, program, paket, harga), `submitLandingRegister` untuk daftar program. Semua pakai BASE yang sama.

### `lib/constants.ts`

- **Fungsi:** Nilai tetap untuk tema dan layout (warna, spacing, dll.) supaya konsisten di seluruh landing.
- **Contoh:** `theme.colors.primary.main`, `theme.spacing.section.py`. Bisa dipakai di komponen atau Tailwind.

### `lib/utils.ts`

- **Fungsi:** Helper kecil yang dipakai di banyak komponen.
- **`cn(...inputs)`:** Menggabungkan class Tailwind dengan aman (pakai `clsx` + `tailwind-merge`). Dipakai untuk conditional class, misalnya `cn("base-class", error && "error-class")`.

**Ringkas:** Untuk fitur lamaran kerja, yang paling relevan adalah **`lib/api.ts`** (submit + track). Komponen form hanya memanggil fungsi API ini dan menampilkan hasilnya; tidak memanggil `fetch` langsung.

---

## 2. Diskusi: Konfirmasi sukses — tampil sebentar, hilang, atau tampil terus?

Setelah lamaran berhasil dikirim, konfirmasi (pesan sukses + ID Aplikasi + tombol Salin) bisa diatur dengan beberapa pola:

### Opsi A: Tampil lalu hilang otomatis (mis. 15 detik)

- **Plus:** Layar tidak “penuh” konfirmasi; setelah beberapa detik kembali ke form kosong.
- **Minus:** Kalau user belum sempat mencatat/salin ID, pesan hilang dan ID tidak tampil lagi (kecuali ada email konfirmasi).

### Opsi B: Tampil terus (tanpa tombol tutup)

- **Plus:** User bisa baca dan salin ID kapan saja.
- **Minus:** Tidak ada kontrol; form di bawah tetap terlihat kosong, bisa bingung “apakah harus isi lagi?”.

### Opsi C: Tampil terus + tombol “Tutup” / “Mengerti”

- **Plus:**
  - ID Aplikasi tidak hilang sampai user sengaja menutup.
  - User yang sudah mencatat/salin bisa tutup dan siap kirim lamaran baru atau pindah ke “Pantau Status”.
  - User yang butuh waktu baca tidak terburu-buru.
- **Minus:** Hampir tidak ada; satu klik tutup sudah cukup.

### Rekomendasi: **Opsi C — tampil terus sampai user klik “Tutup”**

Alasan singkat:

1. **ID Aplikasi penting:** Dipakai untuk Pantau Status; kalau hilang sebelum disalin, pengalaman buruk.
2. **Kontrol di tangan user:** Yang sudah selesai baca bisa tutup; yang belum tidak dipaksa waktu 15 detik.
3. **Konsisten dengan pesan “Simpan ID ini”:** Lebih masuk akal jika konfirmasi tidak hilang sendiri sebelum user sempat menyimpan/mencatat.

Implementasi yang disarankan:

- Konfirmasi sukses **tetap tampil** setelah submit berhasil.
- Tambah tombol **“Tutup”** (atau “Mengerti”). Saat diklik, konfirmasi disembunyikan dan state di-reset sehingga form siap untuk pengiriman baru (atau user bisa pindah ke tab Pantau Status).
- **Hapus** auto-hide setelah 15 detik.

Dengan begitu, konfirmasi “bagus” dalam arti: **tampil terus sampai user siap menutup**, tanpa hilang tiba-tiba.

**Catatan:** Perubahan ini (auto-hide dihapus, tombol Tutup) **tidak menyebabkan** error fetch / 502. Alurnya: fetch dipanggil sekali saat user klik “Kirim Lamaran”; hanya setelah respons sukses, konfirmasi dan tracking code ditampilkan. Tombol “Tutup” hanya mereset state tampilan; tidak memicu request ke API. Jika masih muncul “Failed to fetch” atau 502, penyebabnya di sisi backend/jaringan (lihat `docs/job-applications-troubleshooting.md`).
