# Weekly Project Progress Report — Panduan

Direktori ini menyimpan laporan progres mingguan StudentConnect. Setiap laporan hanya mencatat output aktual yang sudah dihasilkan sebagai bahan presentasi kepada dosen dan stakeholder.

## 1. Prinsip Utama

1. Dokumentasikan hasil, bukan rencana, backlog, atau pekerjaan yang belum selesai.
2. Gunakan bahasa Indonesia yang formal, ringkas, dan mudah dipresentasikan.
3. Sertakan referensi ke artefak asli jika tersedia.
4. Jangan mengarang progres, tanggal, referensi, atau output.
5. Jangan menduplikasi isi dokumen sumber; cukup jelaskan hasil dan berikan referensinya.
6. Hindari penjelasan teknis yang terlalu mendalam.
7. Jangan mengubah dokumentasi sumber atau kode proyek saat membuat laporan.
8. Pertahankan laporan minggu sebelumnya tanpa perubahan.

## 2. Lokasi dan Penamaan

- Panduan ini: `docs/reports/README.md`
- Format file: `docs/reports/week-XX.md`
- Contoh: `docs/reports/week-01.md`, `docs/reports/week-02.md`

Nomor minggu menggunakan dua digit. Setiap file hanya untuk minggu yang diminta.

## 3. Alur Pembuatan

1. Lakukan preflight: baca `AGENTS.md`, periksa struktur direktori, dokumentasi, dan artefak yang tersedia.
2. Tentukan minggu dan periode dari permintaan pengguna atau data repositori yang dapat diverifikasi. Jika keduanya tidak tersedia, tanyakan terlebih dahulu.
3. Identifikasi output aktual pada periode tersebut. Sumber yang dapat diperiksa meliputi dokumen, FR, use case, diagram, prototype, halaman aplikasi, fitur, implementasi, pengujian, hasil pengujian, dan artefak lain yang benar-benar ada.
4. Buat hanya file laporan untuk minggu yang diminta.
5. Jika file laporan sudah ada, periksa isinya dan minta konfirmasi sebelum mengganti atau memperbaruinya.
6. Lakukan pembaruan hanya ketika pengguna secara eksplisit meminta.

Laporan dibuat secara on-demand. Jangan menggunakan cron, scheduler, scheduled task, atau pembuatan otomatis. Jangan membuat laporan minggu lain secara otomatis.

## 4. Struktur Report

Gunakan struktur berikut untuk setiap laporan:

```markdown
# Project Progress Report — Week XX

## 1. Informasi Report

| Informasi | Keterangan |
| --- | --- |
| Minggu | Week XX |
| Periode | Tanggal awal – tanggal akhir |
| Fokus Pengerjaan | Fokus aktual minggu tersebut |

## 2. Ringkasan Pengerjaan

Ringkasan singkat mengenai hasil pengerjaan selama minggu tersebut.

## 3. Hasil Pengerjaan

Daftar seluruh output aktual yang dihasilkan pada minggu tersebut. Sertakan deskripsi singkat dan referensi ke file, folder, halaman, atau URL jika tersedia.

## 4. Kesimpulan

Kesimpulan singkat mengenai hasil yang berhasil dicapai selama minggu tersebut.
```

Bagian "Hasil Pengerjaan" tidak memiliki kategori, subkategori, tabel, atau format daftar wajib. Gunakan daftar bernomor, bullet, atau pengelompokan hanya jika memang membantu pembaca. Contoh penulisan yang tidak wajib:

```markdown
- <Nama output> — <deskripsi singkat hasil>. Referensi: `<path/url>`.
```

## 5. Checklist Sebelum Menyimpan

- [ ] Minggu dan periode sesuai permintaan atau data yang diverifikasi.
- [ ] Semua item adalah output aktual, bukan rencana atau backlog.
- [ ] Setiap output memiliki deskripsi singkat dan referensi jika tersedia.
- [ ] Tidak ada duplikasi isi dokumen sumber.
- [ ] Tidak ada rencana minggu berikutnya, pekerjaan belum selesai, atau detail teknis berlebihan.
- [ ] Hanya file laporan yang diminta yang dibuat atau diperbarui.
