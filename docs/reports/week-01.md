# Project Progress Report — Week 01

## 1. Informasi Report

| Informasi | Keterangan |
| --- | --- |
| Minggu | Week 01 |
| Periode | 23 Oktober – 18 November 2026 |
| Fokus Pengerjaan | Fondasi dokumentasi, identitas visual, database, autentikasi, onboarding, dashboard, dan manajemen pengguna. |

## 2. Ringkasan Pengerjaan

Pada periode ini, proyek StudentConnect membangun fondasi dokumentasi dan sistem, menyiapkan identitas visual serta prototype antarmuka, mengimplementasikan database dan autentikasi, lalu menghadirkan dashboard dan fitur kelola pengguna. Hasil pengujian end-to-end juga tersedia untuk memverifikasi alur utama yang telah dibangun.

## 3. Hasil Pengerjaan

1. **Dokumen kebutuhan dan desain sistem.** Tersedia 23 Functional Requirement untuk peran mahasiswa, dosen, dan admin, beserta use case, class diagram, ERD, activity diagram, dan sequence diagram. Referensi: `docs/01-functional-requirements/`, `docs/02-usecase-diagram/`, `docs/03-class-diagram/`, `docs/04-entity-relationship-diagram/`, `docs/05-activity-diagram/`, `docs/06-sequence-diagram/`.

2. **Dokumentasi fondasi proyek.** Indeks dokumentasi, arsitektur sistem, batas modul, model data, keputusan terbuka, dan gambaran proyek tersedia sebagai acuan pengembangan. Referensi: `docs/README.md`, `docs/ARCHITECTURE.md`, `docs/MODULES.md`, `docs/DATA_MODEL.md`, `docs/OPEN_QUESTIONS.md`, `docs/OVERVIEW.md`.

3. **Identitas visual dan prototype antarmuka.** Aset brand MOCHI, salinan antarmuka, serta prototype splash screen, onboarding, halaman login, halaman kesalahan, dashboard per peran, dan halaman pengguna berhasil disiapkan. Referensi: `public/brand/`, `screen/`, `screen/copywriting.json`.

4. **Fondasi aplikasi.** Scaffold Next.js 16 dengan shell mobile-first, metadata, manifest PWA, konfigurasi lingkungan, dan konfigurasi pengujian tersedia. Referensi: `package.json`, `src/app/layout.tsx`, `src/app/manifest.ts`, `.env.example`, `e2e.config.ts`.

5. **Struktur database dan data awal.** Schema Drizzle, migrasi awal, dan data seed untuk admin, dosen, mahasiswa, jadwal, serta materi telah dibuat. Referensi: `src/db/schema.ts`, `src/db/index.ts`, `src/db/seed.ts`, `drizzle/`.

6. **Autentikasi dan otorisasi.** Halaman login email dan kata sandi, session, logout, validasi peran, pengalihan sesuai peran, serta perlindungan route berhasil diimplementasikan. Referensi: `src/modules/auth/`, `src/lib/auth.ts`, `src/app/(root)/(auth)/login/page.tsx`, `src/app/(root)/unauthorized/page.tsx`.

7. **Splash screen dan onboarding.** Splash screen, onboarding tiga langkah, mekanisme tampil sekali, serta halaman Not Found dan Unauthorized tersedia. Referensi: `src/modules/onboarding/`, `src/app/(root)/onboarding/page.tsx`, `src/app/not-found.tsx`.

8. **Dashboard berbasis peran.** Dashboard mahasiswa, dosen, dan admin tersedia pada satu route dengan header, sapaan, navigasi bawah, dan pengaturan tema. Referensi: `src/modules/dashboard/`, `src/app/(root)/(app)/dashboard/page.tsx`.

9. **Halaman kelola pengguna.** Tabel pengguna dengan pencarian, filter peran dan status, pengurutan, paginasi, tanggal dibuat, jumlah data, serta operasi tambah, ubah, dan nonaktif pengguna telah diimplementasikan. Referensi: `src/modules/users/`, `src/app/(root)/(app)/dashboard/users/page.tsx`.

10. **Komponen antarmuka bersama.** Komponen dasar seperti input, formulir, kartu, carousel, toast, drawer, dialog, select, tabel, avatar, dan state view tersedia untuk digunakan kembali. Referensi: `src/shared/components/ui/`, `src/shared/components/`.

11. **Pengujian end-to-end.** Skenario smoke test, autentikasi lintas peran, onboarding, otorisasi, dan kelola pengguna tersedia. Referensi: `tests/example.e2e.ts`, `tests/auth.e2e.ts`, `tests/pengguna.e2e.ts`, `e2e.config.ts`.

12. **Perbaikan koneksi database.** Koneksi Neon pooled digunakan untuk transaksi agar operasi database memiliki dasar koneksi yang sesuai. Referensi: `src/db/index.ts`.

## 4. Kesimpulan

Week 01 menghasilkan fondasi dokumentasi, desain, database, autentikasi, onboarding, dashboard, dan manajemen pengguna yang dapat dipresentasikan. Keseluruhan output menjadi dasar bagi pengembangan fitur berikutnya.
