# Pengujian End-to-End (E2E)

## 1. Tujuan File

Menjelaskan fungsi dokumen sebagai referensi pengujian E2E, pemetaan Functional Requirement (FR), inventaris dan detail skenario pengujian, serta kebutuhan data seed.

## 2. Cara Menjalankan Pengujian

### 2.1 Prasyarat

- `npm install`
- Konfigurasi `.env.local` (`DATABASE_URL`, `AUTH_SECRET`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`)
- `npm run db:migrate`
- `npm run db:seed`
- `npm run dev`

### 2.2 Perintah Pengujian

- `npm run test:e2e`
- `APP_URL=http://localhost:3001 npm run test:e2e`
- `npm run test:e2e -- tests/auth.e2e.ts`
- `npx e2e run --last-failed`
- `npx e2e list`
- `npx e2e doctor`

### 2.3 Hasil Pengujian

- `.e2e/report.json`
- `.e2e/summary.md`
- `.e2e/results/<test>/trace.md`

## 3. Pemetaan Functional Requirement (FR)

| ID FR | Modul | Functional Requirement | File Test | Status Pengujian |
| --- | --- | --- | --- | --- |
| FR-1 | Pengguna | Mahasiswa login | tests/auth.e2e.ts | Tested |
| FR-2 | Pengguna | Mahasiswa logout | tests/auth.e2e.ts | Tested |
| FR-6 | Pengguna | Dosen login | tests/auth.e2e.ts | Tested |
| FR-14 | Pengguna | Admin login | tests/auth.e2e.ts, tests/pengguna.e2e.ts | Tested |
| FR-16 | Pengguna | Admin melihat daftar data pengguna | tests/pengguna.e2e.ts | Tested |
| FR-17 | Pengguna | Admin menambahkan pengguna | tests/pengguna.e2e.ts | Tested |
| FR-18 | Pengguna | Admin mengubah data pengguna | tests/pengguna.e2e.ts | Tested |
| FR-19 | Pengguna | Admin menonaktifkan pengguna | tests/pengguna.e2e.ts | Tested |

Onboarding, pencarian, filter, sort, paginasi, dan penolakan akses non-admin belum memiliki FR eksplisit di `FUNCTIONAL REQUIREMENT.md`.

## 4. Inventaris File Pengujian

| File Test | Jumlah Test | Cakupan |
| --- | --- | --- |
| tests/example.e2e.ts | 1 | Smoke test halaman awal |
| tests/auth.e2e.ts | 5 | Login, logout, onboarding, otorisasi redirect |
| tests/pengguna.e2e.ts | 15 | Daftar pengguna, pencarian, filter, sort, paginasi, CRUD, duplikat, akses non-admin |

## 5. Detail Skenario Pengujian

### 5.1 tests/example.e2e.ts

| No. | Judul Test | FR Terkait | Skenario Pengujian | Hasil yang Diharapkan |
| --- | --- | --- | --- | --- |
| 1 | app opens | - | Membuka halaman utama | Halaman berhasil ditampilkan |

### 5.2 tests/auth.e2e.ts

| No. | Judul Test | FR Terkait | Skenario Pengujian | Hasil yang Diharapkan |
| --- | --- | --- | --- | --- |
| 1 | mahasiswa can sign in, sees dashboard, and can sign out | FR-1, FR-2 | Mahasiswa membuka `/dashboard`, login, membuka dashboard, lalu logout | Masuk ke dashboard dan kembali ke halaman login |
| 2 | admin can sign in and lands on dashboard | FR-14 | Admin login dengan kredensial dari `.env.local` | Dashboard admin menampilkan sapaan Admin, Ringkasan, dan Aksi cepat |
| 3 | wrong password stays on login with a generic error | FR-1 | Mahasiswa login dengan password salah | Tetap di `/login` dengan pesan "Email atau kata sandi tidak sesuai" |
| 4 | mahasiswa and dosen can sign in by email | FR-1, FR-2, FR-6 | Mahasiswa login lalu logout, kemudian dosen login | Kedua peran berhasil masuk ke dashboard |
| 5 | onboarding is shown once and skipped afterwards | - | Membuka aplikasi pertama kali, menyelesaikan onboarding, lalu mengunjunginya kembali | Onboarding hanya muncul sekali; kunjungan berikutnya menuju `/login` atau `/dashboard` |

### 5.3 tests/pengguna.e2e.ts

Semua test dalam `describe("dashboard pengguna")` diawali login admin dan membuka `/dashboard/users`.

| No. | Judul Test | FR Terkait | Skenario Pengujian | Hasil yang Diharapkan |
| --- | --- | --- | --- | --- |
| 1 | shows users from the database | FR-16 | Admin membuka halaman pengguna | Tabel dan data pengguna dari seed ditampilkan |
| 2 | shows the creation date column | FR-16 | Admin melihat kolom tanggal dibuat | Kolom "Dibuat" dan tanggal dengan format `dd MMM yyyy` ditampilkan |
| 3 | shows the filtered total data count | FR-16 | Admin mencari "budi" | Total Data menjadi 1 |
| 4 | searches users by query | FR-16 | Admin mencari pengguna lewat kolom pencarian | URL memuat `q=budi`; hanya hasil yang cocok ditampilkan |
| 5 | filters users by role and status | FR-16 | Admin memilih peran Dosen dan status Aktif | URL memuat `role=dosen&status=aktif`; data sesuai filter ditampilkan |
| 6 | sorts users by name from the drawer | FR-16, FR-17 | Admin membuat dua dosen lalu mengurutkan nama Z–A | URL memuat `sort=name-desc`; urutan baris berubah |
| 7 | resets filters | FR-16 | Admin menekan Reset filter | Filter bersih, sort kembali A–Z, dan data lengkap ditampilkan |
| 8 | shows pagination state | FR-16 | Admin melihat kontrol halaman | Informasi rentang data, tombol halaman sebelumnya dinonaktifkan, tombol berikutnya tampil |
| 9 | hides row actions for admin accounts | FR-16 | Admin mencari akun Administrator | Tombol Ubah dan Nonaktifkan tidak tersedia pada baris tersebut |
| 10 | creates a lecturer from the create drawer | FR-17 | Admin menambahkan dosen lewat drawer | Toast "Pengguna Ditambahkan" tampil dan data dosen muncul saat dicari |
| 11 | updates a lecturer from the action column | FR-18 | Admin mengubah nama dosen lewat tombol Ubah | Toast "Perubahan Disimpan" tampil; nama baru muncul dan nama lama hilang |
| 12 | cancels then confirms deactivation | FR-19 | Admin membatalkan konfirmasi, lalu mengonfirmasi nonaktif | Status tetap Aktif, kemudian berubah menjadi Nonaktif dan tombol aksi hilang |
| 13 | rejects a duplicate email and keeps the form filled | FR-17 | Admin menambahkan dosen dengan email yang sudah dipakai | Pesan "Email sudah digunakan pengguna lain." tampil dan form tetap terisi |
| 14 | rejects a duplicate identity and keeps the form filled | FR-17 | Admin menambahkan dosen dengan NIM/kode dosen yang sudah dipakai | Pesan "NIM atau kode dosen sudah digunakan." tampil dan form tetap terisi |
| 15 | non-admin cannot open the users page | - | Mahasiswa membuka `/dashboard/users` | Mahasiswa diarahkan ke `/unauthorized` |

## 6. Data Seed

| Entitas | Data Seed | Kegunaan |
| --- | --- | --- |
| Admin | `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Pengujian autentikasi dan manajemen pengguna |
| Dosen | `budi.santoso@studentconnect.local` / `dosen12345` (`D001`) | Pengujian dosen |
| Mahasiswa | `dhandy.amir@studentconnect.local` / `mahasiswa12345` (NIM `23123456`) | Pengujian mahasiswa |
| Program Studi | Teknik Informatika | Data pendukung mahasiswa |
| Mata Kuliah | `COMP6047` | Data pendukung kurikulum |
| Kurikulum | `2024/2025` | Data pendukung jadwal |
| Jadwal Kuliah | `08:00–10:30`, `B201` | Data pendukung jadwal kuliah |
| Materi | Pengantar Rekayasa Perangkat Lunak | Data pendukung materi |

## 7. Catatan Pengujian

- Seed hanya berjalan jika tabel `pengguna` kosong.
- Gunakan `npm run db:reset -- --confirm` untuk mengembalikan data awal.
- Setiap FR sebaiknya memiliki minimal satu skenario pengujian.
- Test auth "mahasiswa can sign in, sees dashboard, and can sign out" saat ini juga mengassert teks "Sepertinya ada kendala"; perlu dipastikan apakah masih relevan.
