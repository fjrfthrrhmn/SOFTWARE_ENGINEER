# Open Questions — StudentConnect

> **Dokumen:** Ledger Keputusan dan Pertanyaan
> **Status:** Aktif
> **Tujuan:** Mencatat setiap pertanyaan, jawaban, dan dampaknya agar tidak ada keputusan yang hilang.

---

## 1. Aturan Pencatatan

1. Setiap tanya-jawab baru ditambahkan ke bagian Pertanyaan dengan ID berurutan.
2. Jika pertanyaan sudah dijawab, isi kolom Jawaban dan ubah status menjadi `Dijawab`.
3. Jangan menghapus entri lama. Jika keputusan berubah, tambahkan entri baru yang merujuk ID lama.
4. Sertakan dampak teknis atau fase yang terpengaruh.
5. Keputusan yang sudah final dipindahkan ke bagian Keputusan dengan ID `D-xx`.
6. Format tanggal: `YYYY-MM-DD`.

---

## 2. Keputusan

| ID | Tanggal | Pertanyaan | Jawaban | Status |
|---|---|---|---|---|
| D-01 | 2026-11-14 | Mulai dari koding atau dokumentasi? | Dokumentasi fondasi dulu | Diputuskan |
| D-02 | 2026-11-14 | Data layer? | Drizzle ORM + `@neondatabase/serverless` | Diputuskan |
| D-03 | 2026-11-14 | Auth? | Ditunda, diputuskan saat M1 (digantikan D-11) | Digantikan |
| D-04 | 2026-11-14 | Bahasa dokumen? | Indonesia | Diputuskan |
| D-05 | 2026-11-14 | Cara menangani pertanyaan terbuka? | Catat tanya-jawab di dokumen ini | Diputuskan |
| D-06 | 2026-11-14 | Lokasi output dokumentasi fondasi? | `docs/` | Diputuskan |
| D-07 | 2026-11-14 | Halaman demo `src/app/page.tsx`? | Dipertahankan, copywriting diubah sesuai proyek | Diputuskan |
| D-08 | 2026-11-14 | UI library? | shadcn/ui style `base-rhea`, icon Tabler | Diputuskan |
| D-09 | 2026-11-14 | E2E? | `e2e` + `@e2e-dev/web` | Diputuskan |
| D-10 | 2026-11-14 | Bahasa untuk function, code, folder, file, dan router? | Inggris. Teks UI dan dokumentasi tetap Indonesia | Diputuskan |
| D-11 | 2026-11-14 | Mekanisme auth (menggantikan D-03, Q-02)? | `bcryptjs` + `jose` + Next.js `cookies()` + middleware/DAL kustom | Diputuskan |
| D-12 | 2026-11-14 | Dosen pada mata kuliah dan jadwal (Q-05)? | Dosen jadwal = dosen pengampu, tanpa pengganti; duplikasi kolom dihapus | Diputuskan |
| D-13 | 2026-11-14 | Kolom `jadwal_kuliah.nama` (Q-06)? | Hapus kolom | Diputuskan |
| D-14 | 2026-11-14 | Atribut kurikulum (Q-07)? | Tambah `tahun_kurikulum` | Diputuskan |
| D-15 | 2026-11-14 | Kredensial admin seed (Q-08)? | Wajib dari environment; seed gagal jika kosong | Diputuskan |
| D-16 | 2026-11-14 | Cakupan PWA dan E2E (Q-09)? | Manifest saja + E2E dasar | Diputuskan |
| D-17 | 2026-11-14 | Identifier login dosen dan admin (Q-10)? | Semua peran melalui kolom `email`; mahasiswa memakai NIM sesuai Q-01 | Diputuskan |
| D-18 | 2026-11-14 | Penyimpanan materi (Q-11)? | Google Drive (digantikan D-21) | Diputuskan |
| D-19 | 2026-11-14 | Periode jadwal (Q-12)? | Jadwal berlaku saat ini, tanpa periode | Diputuskan |
| D-20 | 2026-11-14 | Riwayat absensi (Q-13)? | Dihapus dari scope | Diputuskan |
| D-21 | 2026-11-14 | Penyimpanan materi final (menggantikan D-18, Q-11, Q-14)? | Vercel Blob | Diputuskan |
| D-22 | 2026-11-14 | Format `tahun_kurikulum` (Q-15)? | Teks periode, mis. `2024/2025`; masuk unique gabungan | Diputuskan |
| D-23 | 2026-11-14 | Detail sesi JWT (Q-16)? | 7 hari, tanpa refresh token, cookie `studentconnect_session`, secret `AUTH_SECRET` | Diputuskan |
| D-24 | 2026-11-14 | Cakupan E2E (Q-17)? | Login/logout, jadwal, materi, CRUD utama tiap role; dijalankan di CI | Diputuskan |
| D-25 | 2026-11-14 | Kredensial admin seed (Q-18)? | `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`; email dari environment; seed gagal jika kosong | Diputuskan |
| D-26 | 2026-11-14 | Kapan schema Q-05/Q-06/Q-07/Q-15 diterapkan dan bagaimana migrasinya (Q-19)? | M0: sinkronkan schema lalu regenerasi baseline `0000` karena database belum pernah dimigrasikan | Diputuskan |
| D-27 | 2026-11-14 | Kapan seed beralih dari scrypt ke bcryptjs? | M0, bersamaan dengan sinkronisasi seed; tidak menunggu M1 | Diputuskan |
| D-28 | 2026-11-15 | Perlu dependency `motion` untuk splash dan onboarding? | Ya. Implementasi memakai `motion` v14 (sudah terpasang) untuk entrance, bob, dan progress bar; carousel memakai shadcn `carousel` + `embla-carousel-react`. `prefers-reduced-motion` tetap dihormati via `useReducedMotion` | Diputuskan |

---

## 3. Pertanyaan

| ID | Tanggal | Pertanyaan | Jawaban | Status | Dampak |
|---|---|---|---|---|---|
| Q-01 | 2026-11-14 | Identifier login mahasiswa: NIM sebagai email atau email terpisah? | NIM | Dijawab | `pengguna.email` diisi NIM untuk mahasiswa |
| Q-02 | 2026-11-14 | Mekanisme session dan hashing password? | `bcryptjs` (hash), `jose` (JWT), Next.js `cookies()` (token), middleware/DAL kustom (role) | Dijawab | M1; dependency, `src/lib/auth.ts`, seed |
| Q-03 | 2026-11-14 | `fileUrl` materi: URL saja, upload, atau keduanya? | URL dan upload file | Dijawab | M3, storage, dependency upload |
| Q-04 | 2026-11-14 | Delete jadwal: hard delete atau soft delete? | Soft delete via `status = dibatalkan` | Dijawab | M4, query read, recovery |
| Q-05 | 2026-11-14 | `idDosen` ganda di `mata_kuliah` dan `jadwal_kuliah`? | Dosen jadwal = dosen pengampu, tanpa pengganti; hapus duplikasi `jadwal_kuliah.id_dosen` | Dijawab | M4; schema, query jadwal dosen lewat `kurikulum → mata_kuliah` |
| Q-06 | 2026-11-14 | Field `jadwal_kuliah.nama` (ada di ERD, tidak di Class Diagram)? | Hapus kolom | Dijawab | Schema, form dan tampilan jadwal |
| Q-07 | 2026-11-14 | Atribut `kurikulum` kosong di Class Diagram? | Tambah `tahun_kurikulum` | Dijawab | Schema `kurikulum`, unique, filter |
| Q-08 | 2026-11-14 | Kredensial admin seed? | Wajib dari environment; seed gagal jika kosong | Dijawab | `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, setup dan deploy |
| Q-09 | 2026-11-14 | Cakupan PWA dan E2E? | Manifest saja + E2E dasar | Dijawab | M5; tanpa service worker/offline |
| Q-10 | 2026-11-14 | Identifier login dosen dan admin: email atau kode? | Semua peran melalui kolom `email`; mahasiswa memakai NIM sesuai Q-01 | Dijawab | M1; form login, seed |
| Q-11 | 2026-11-14 | Provider penyimpanan/upload materi? | Vercel Blob (final, menggantikan Google Drive; D-21) | Dijawab | M3; dependency `@vercel/blob`, env token, `file_url` |
| Q-12 | 2026-11-14 | Jadwal perlu periode/semester? | Jadwal berlaku saat ini, tanpa periode | Dijawab | Schema tidak berubah; filter tampilan |
| Q-13 | 2026-11-14 | Riwayat absensi disebut di FR-23, tetapi tidak ada tabel/FR absensi. Apakah diperlukan? | Hapus aturan verifikasi absensi dari scope | Dijawab | FR-23; tidak ada tabel absensi |
| Q-14 | 2026-11-14 | Detail integrasi penyimpanan materi? | Vercel Blob sebagai provider; upload lewat server action dan URL disimpan di `file_url` | Dijawab | M3; dependency `@vercel/blob`, `BLOB_READ_WRITE_TOKEN` |
| Q-15 | 2026-11-14 | Tipe dan format `tahun_kurikulum`, serta apakah masuk unique `(id_program_studi, id_mata_kuliah, tahun_kurikulum)`? | Teks periode, mis. `2024/2025`; masuk unique gabungan | Dijawab | Schema, validasi, filter |
| Q-16 | 2026-11-14 | Masa berlaku JWT, refresh, nama cookie, dan env secret? | 7 hari; tanpa refresh token; cookie `studentconnect_session`; secret `AUTH_SECRET` | Dijawab | M1, keamanan sesi |
| Q-17 | 2026-11-14 | Skenario minimum E2E per peran dan apakah berjalan di CI? | Login/logout, jadwal, materi, CRUD utama tiap role; dijalankan di CI | Dijawab | M5 |
| Q-18 | 2026-11-14 | Nama env kredensial admin seed dan email admin awal? | `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD`; email dari environment; seed gagal jika kosong | Dijawab | M0/M1, `src/db/seed.ts` |
| Q-19 | 2026-11-14 | Kapan perubahan schema Q-05/Q-06/Q-07/Q-15 diterapkan dan apakah baseline migrasi diregenerasi? | Diterapkan di M0; baseline `drizzle/0000` diregenerasi karena database Neon belum pernah dimigrasikan | Dijawab | M0; `src/db/schema.ts`, `drizzle/`, seed |

---

## 4. Detail Pertanyaan Terbuka

Tidak ada pertanyaan terbuka per 2026-11-14. Semua keputusan sudah dicatat pada bagian Keputusan dan Pertanyaan.
