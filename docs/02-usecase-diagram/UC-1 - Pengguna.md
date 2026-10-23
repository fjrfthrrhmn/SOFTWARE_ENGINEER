# Use Case Specification

> **Dokumen:** Use Case Specification (UC)  
> **Status:** Final  
> **Tujuan:** Mendokumentasikan interaksi antara aktor dan sistem berdasarkan domain fitur StudentConnect, termasuk prasyarat, pemicu, alur utama, alur alternatif, kondisi akhir, dan Functional Requirement (FR) terkait.

## Daftar Use Case

| ID Use Case | Nama Use Case                | Aktor                          | FR Terkait        |
| ----------- | ---------------------------- | ------------------------------ | ----------------- |
| UC-PGN-01   | Login Pengguna               | Pengguna (Mahasiswa/Dosen/Admin) | FR-1, FR-6, FR-14 |
| UC-PGN-02   | Logout Pengguna              | Pengguna (Mahasiswa/Dosen/Admin) | FR-2, FR-7, FR-15 |
| UC-PGN-03   | Melihat Daftar Data Pengguna | Admin                          | FR-16             |
| UC-PGN-04   | Menambahkan Pengguna         | Admin                          | FR-17             |
| UC-PGN-05   | Mengubah Data Pengguna       | Admin                          | FR-18             |
| UC-PGN-06   | Menonaktifkan Pengguna       | Admin                          | FR-19             |

---

## UC-PGN-01 — Login Pengguna

| Field           | Isi                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID dan nama     | UC-PGN-01 — Login Pengguna                                                                                                                                                                      |
| Tujuan          | Pengguna (Mahasiswa, Dosen, Admin) dapat masuk ke StudentConnect.                                                                                                                               |
| Aktor           | Pengguna (Mahasiswa/Dosen/Admin)                                                                                                                                                                |
| Prasyarat       | Pengguna memiliki akun terdaftar yang aktif.                                                                                                                                                     |
| Include         | —                                                                                                                                                                                               |
| Extend          | —                                                                                                                                                                                               |
| Pemicu          | Pengguna membuka halaman login dan mengirimkan kredensial akun.                                                                                                                                  |
| Alur utama      | 1. Pengguna membuka halaman login. 2. Pengguna memasukkan identifier (NIM/email/kode dosen) dan password. 3. Sistem memeriksa kredensial. 4. Sistem mengizinkan akses sesuai peran jika kredensial valid. |
| Alur alternatif | Jika kredensial tidak valid atau akun nonaktif, sistem menolak login dan pengguna tetap berada di luar sistem.                                                                                   |
| Kondisi akhir   | Pengguna berhasil masuk ke sistem dan memperoleh akses sesuai perannya.                                                                                                                         |
| FR terkait      | FR-1, FR-6, FR-14                                                                                                                                                                               |

## UC-PGN-02 — Logout Pengguna

| Field           | Isi                                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-PGN-02 — Logout Pengguna                                                                                                                   |
| Tujuan          | Pengguna mengakhiri sesi penggunaan sistem.                                                                                                   |
| Aktor           | Pengguna (Mahasiswa/Dosen/Admin)                                                                                                              |
| Prasyarat       | Pengguna telah login (include UC-PGN-01).                                                                                                     |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                     |
| Extend          | —                                                                                                                                             |
| Pemicu          | Pengguna memilih fungsi logout.                                                                                                               |
| Alur utama      | 1. Pengguna memilih logout. 2. Sistem mengakhiri sesi pengguna. 3. Sistem mengarahkan pengguna keluar dari area yang memerlukan autentikasi. |
| Alur alternatif | Jika proses logout gagal, sistem memberi tahu bahwa proses belum berhasil dan sesi belum dianggap berakhir.                                   |
| Kondisi akhir   | Sesi Pengguna berakhir.                                                                                                                       |
| FR terkait      | FR-2, FR-7, FR-15                                                                                                                             |

## UC-PGN-03 — Melihat Daftar Data Pengguna

| Field           | Isi                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-PGN-03 — Melihat Daftar Data Pengguna                                                                                                          |
| Tujuan          | Admin melihat data pengguna Mahasiswa dan Dosen.                                                                                                  |
| Aktor           | Admin                                                                                                                                             |
| Prasyarat       | Admin telah login (include UC-PGN-01).                                                                                                            |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                         |
| Extend          | — (menjadi base untuk UC-PGN-04, UC-PGN-05, UC-PGN-06)                                                                                            |
| Pemicu          | Admin membuka halaman pengelolaan pengguna.                                                                                                       |
| Alur utama      | 1. Admin membuka halaman pengelolaan pengguna. 2. Sistem mengambil data pengguna Mahasiswa dan Dosen. 3. Sistem menampilkan daftar data pengguna. |
| Alur alternatif | Jika data tidak tersedia, sistem menampilkan daftar kosong atau informasi bahwa data belum tersedia.                                              |
| Kondisi akhir   | Daftar data pengguna Mahasiswa dan Dosen ditampilkan kepada Admin.                                                                                |
| FR terkait      | FR-16                                                                                                                                             |

## UC-PGN-04 — Menambahkan Pengguna

| Field           | Isi                                                                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-PGN-04 — Menambahkan Pengguna                                                                                                                                                                     |
| Tujuan          | Admin menambahkan data akun Mahasiswa atau Dosen.                                                                                                                                                    |
| Aktor           | Admin                                                                                                                                                                                                |
| Prasyarat       | Admin telah login (include UC-PGN-01).                                                                                                                                                               |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                                             |
| Extend          | `<<extend>>` UC-PGN-03 — Melihat Daftar Data Pengguna                                                                                                                                                |
| Pemicu          | Admin memilih fungsi tambah pengguna.                                                                                                                                                                |
| Alur utama      | 1. Admin membuka form tambah pengguna. 2. Admin mengisi data pengguna. 3. Admin mengirimkan form. 4. Sistem memeriksa data yang dikirim. 5. Sistem menyimpan data pengguna jika data dapat diterima. |
| Alur alternatif | Jika data tidak lengkap atau tidak dapat diproses, sistem menolak penyimpanan dan meminta Admin memperbaiki data.                                                                                    |
| Kondisi akhir   | Data pengguna baru tersimpan dan tersedia dalam sistem.                                                                                                                                              |
| FR terkait      | FR-17                                                                                                                                                                                                |

## UC-PGN-05 — Mengubah Data Pengguna

| Field           | Isi                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-PGN-05 — Mengubah Data Pengguna                                                                                                                                                           |
| Tujuan          | Admin memperbarui data Mahasiswa atau Dosen.                                                                                                                                                 |
| Aktor           | Admin                                                                                                                                                                                        |
| Prasyarat       | Admin telah login (include UC-PGN-01) dan data pengguna yang akan diubah tersedia.                                                                                                           |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                                     |
| Extend          | `<<extend>>` UC-PGN-03 — Melihat Daftar Data Pengguna                                                                                                                                        |
| Pemicu          | Admin memilih pengguna dan fungsi ubah data.                                                                                                                                                 |
| Alur utama      | 1. Admin membuka daftar pengguna. 2. Admin memilih pengguna. 3. Sistem menampilkan data pengguna. 4. Admin mengubah data. 5. Admin menyimpan perubahan. 6. Sistem memperbarui data pengguna. |
| Alur alternatif | Jika data pengguna tidak ditemukan atau perubahan tidak dapat disimpan, sistem menampilkan informasi kegagalan dan data tidak diperbarui.                                                    |
| Kondisi akhir   | Data pengguna diperbarui sesuai perubahan yang berhasil disimpan.                                                                                                                            |
| FR terkait      | FR-18                                                                                                                                                                                        |

## UC-PGN-06 — Menonaktifkan Pengguna

| Field           | Isi                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID dan nama     | UC-PGN-06 — Menonaktifkan Pengguna                                                                                                                                                   |
| Tujuan          | Admin menonaktifkan akun Mahasiswa atau Dosen.                                                                                                                                       |
| Aktor           | Admin                                                                                                                                                                                |
| Prasyarat       | Admin telah login (include UC-PGN-01) dan akun pengguna yang akan dinonaktifkan tersedia.                                                                                            |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                             |
| Extend          | `<<extend>>` UC-PGN-03 — Melihat Daftar Data Pengguna                                                                                                                                |
| Pemicu          | Admin memilih fungsi nonaktifkan pada pengguna.                                                                                                                                      |
| Alur utama      | 1. Admin membuka daftar pengguna. 2. Admin memilih pengguna. 3. Admin menjalankan fungsi nonaktifkan. 4. Sistem memproses perubahan status akun. 5. Sistem menampilkan hasil proses. |
| Alur alternatif | Jika akun tidak ditemukan atau proses tidak berhasil, sistem menampilkan informasi kegagalan dan status akun tidak berubah.                                                          |
| Kondisi akhir   | Akun pengguna berstatus nonaktif.                                                                                                                                                    |
| FR terkait      | FR-19                                                                                                                                                                                |
