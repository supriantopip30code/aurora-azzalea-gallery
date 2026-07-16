# Aurora & Azzalea Gallery 🎀

Galeri foto PWA untuk putri kembar **Aurora Hayumi Suprianto** & **Azzalea Hayumi Suprianto** yang lahir pada **6 Juli 2026**.

## Fitur
- 📸 Unggah foto dari galeri/kamera (otomatis dikompres agar hemat penyimpanan).
- 🗑️ Hapus foto yang tidak diinginkan.
- 📅 Setiap foto menampilkan waktu unggahan.
- 💾 Semua foto tersimpan di `localStorage` browser (tetap ada meskipun halaman di-refresh).
- 📱 Dapat diinstall sebagai aplikasi di ponsel (PWA).

## Cara Menjalankan
1. **Lokal (tanpa server)** – cukup buka file `index.html` di browser.
2. **Menggunakan server statis** (disarankan untuk PWA):
   - Jalankan dengan `npx serve .` atau `python -m http.server`
   - Akses `http://localhost:3000` atau `http://localhost:8000`
3. **Upload ke hosting** (Netlify, Vercel, dll.) – upload seluruh folder.

## Cara Mengunggah Foto
- Klik area bertuliskan **"Pilih foto dari galeri / kamera"** atau tombol **"📤 Unggah"**.
- Pilih satu atau beberapa gambar dari perangkat.
- Tunggu hingga proses kompresi selesai, foto akan muncul di galeri.

## Tips
- Jika gagal menyimpan, mungkin total ukuran foto terlalu besar untuk `localStorage`. Hapus beberapa foto lama atau gunakan foto dengan resolusi lebih kecil.
- Untuk pengalaman terbaik, gunakan browser berbasis Chromium (Chrome, Edge, atau browser Android).

## Catatan Ikon PWA
Ikon pada `manifest.json` menggunakan placeholder eksternal. Untuk penggunaan offline, ganti dengan file PNG sendiri dan sesuaikan path-nya.

---

Dibuat dengan ❤️ untuk Aurora & Azzalea.
