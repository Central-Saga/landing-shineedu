# Cara Mengatasi Cache Lambat di Next.js Development

## Solusi Cepat (Paling Mudah)

### 1. Hard Refresh Browser
- **Windows/Linux**: Tekan `Ctrl + Shift + R` atau `Ctrl + F5`
- **Mac**: Tekan `Cmd + Shift + R`
- **Atau**: Buka DevTools (F12) → Klik kanan tombol refresh → Pilih "Empty Cache and Hard Reload"

### 2. Restart Dev Server
```bash
# Hentikan server (Ctrl+C di terminal)
# Kemudian jalankan lagi:
npm run dev
```

## Solusi Lengkap (Jika Masih Bermasalah)

### 3. Hapus Cache Next.js
```bash
# Windows (PowerShell atau CMD):
rmdir /s /q .next

# Windows (Git Bash):
rm -rf .next

# Mac/Linux:
rm -rf .next
```

Kemudian restart dev server:
```bash
npm run dev
```

### 4. Hapus Semua Cache (Termasuk node_modules cache)
```bash
# Windows (PowerShell atau CMD):
rmdir /s /q .next
rmdir /s /q node_modules\.cache

# Windows (Git Bash):
rm -rf .next
rm -rf node_modules/.cache

# Mac/Linux:
rm -rf .next
rm -rf node_modules/.cache
```

Kemudian restart dev server:
```bash
npm run dev
```

## Catatan Penting

1. **TIDAK perlu `npm run build`** untuk development mode
   - `npm run build` hanya untuk production
   - Development mode (`npm run dev`) sudah otomatis hot-reload

2. **Jika perubahan masih tidak muncul:**
   - Pastikan file sudah tersimpan (Ctrl+S)
   - Cek terminal dev server apakah ada error
   - Coba hard refresh browser (Ctrl+Shift+R)
   - Restart dev server

3. **Untuk Production:**
   - Gunakan `npm run build` untuk build production
   - Kemudian `npm start` untuk menjalankan production server

## Tips

- Next.js development mode biasanya hot-reload otomatis dalam 1-2 detik
- Jika lambat, kemungkinan besar masalah di browser cache, bukan Next.js
- Selalu coba hard refresh browser terlebih dahulu sebelum restart server
