# Use Case Specification

> **Dokumen:** Use Case Specification (UC)  
> **Status:** Final  
> **Tujuan:** Mendokumentasikan interaksi antara aktor dan sistem berdasarkan domain fitur StudentConnect, termasuk prasyarat, pemicu, alur utama, alur alternatif, kondisi akhir, dan Functional Requirement (FR) terkait.

## Daftar Use Case

| ID Use Case | Nama Use Case | Aktor | FR Terkait |
|---|---|---|---|
| UC-JDW-01 | Melihat Jadwal Kuliah | Mahasiswa | FR-3 |
| UC-JDW-02 | Melihat Jadwal Mengajar | Dosen | FR-8 |
| UC-JDW-03 | Melihat Jadwal Perkuliahan | Admin | FR-20 |
| UC-JDW-04 | Menambahkan Jadwal Perkuliahan | Admin | FR-21 |
| UC-JDW-05 | Mengubah Jadwal Perkuliahan | Admin | FR-22 |
| UC-JDW-06 | Menghapus atau Membatalkan Jadwal Perkuliahan | Admin | FR-23 |

---

## UC-JDW-01 — Melihat Jadwal Kuliah

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-01 — Melihat Jadwal Kuliah |
| Tujuan | Mahasiswa melihat jadwal perkuliahan yang diikuti. |
| Aktor | Mahasiswa |
| Prasyarat | Mahasiswa telah login (include UC-PGN-01). |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | — |
| Pemicu | Mahasiswa membuka halaman jadwal kuliah. |
| Alur utama | 1. Mahasiswa membuka halaman jadwal kuliah. 2. Sistem mengambil jadwal perkuliahan yang diikuti Mahasiswa. 3. Sistem menampilkan jadwal tersebut. |
| Alur alternatif | Jika belum ada jadwal yang tersedia, sistem menampilkan informasi bahwa jadwal belum tersedia. |
| Kondisi akhir | Jadwal kuliah yang diikuti ditampilkan kepada Mahasiswa. |
| FR terkait | FR-3 |

## UC-JDW-02 — Melihat Jadwal Mengajar

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-02 — Melihat Jadwal Mengajar |
| Tujuan | Dosen melihat jadwal dari mata kuliah yang diampu. |
| Aktor | Dosen |
| Prasyarat | Dosen telah login (include UC-PGN-01). |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | — |
| Pemicu | Dosen membuka halaman jadwal mengajar. |
| Alur utama | 1. Dosen membuka halaman jadwal mengajar. 2. Sistem mengambil jadwal mata kuliah yang diampu Dosen. 3. Sistem menampilkan jadwal mengajar. |
| Alur alternatif | Jika belum ada jadwal yang tersedia, sistem menampilkan informasi bahwa jadwal belum tersedia. |
| Kondisi akhir | Jadwal mengajar ditampilkan kepada Dosen. |
| FR terkait | FR-8 |

## UC-JDW-03 — Melihat Jadwal Perkuliahan

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-03 — Melihat Jadwal Perkuliahan |
| Tujuan | Admin melihat data jadwal perkuliahan. |
| Aktor | Admin |
| Prasyarat | Admin telah login (include UC-PGN-01). |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | — (menjadi base untuk UC-JDW-04, UC-JDW-05, UC-JDW-06) |
| Pemicu | Admin membuka halaman pengelolaan jadwal. |
| Alur utama | 1. Admin membuka halaman pengelolaan jadwal. 2. Sistem mengambil data jadwal perkuliahan. 3. Sistem menampilkan daftar jadwal. |
| Alur alternatif | Jika data jadwal belum tersedia, sistem menampilkan daftar kosong atau informasi bahwa data belum tersedia. |
| Kondisi akhir | Daftar jadwal perkuliahan ditampilkan kepada Admin. |
| FR terkait | FR-20 |

## UC-JDW-04 — Menambahkan Jadwal Perkuliahan

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-04 — Menambahkan Jadwal Perkuliahan |
| Tujuan | Admin menambahkan jadwal perkuliahan ke dalam sistem. |
| Aktor | Admin |
| Prasyarat | Admin telah login (include UC-PGN-01). |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | `<<extend>>` UC-JDW-03 — Melihat Jadwal Perkuliahan |
| Pemicu | Admin memilih fungsi tambah jadwal. |
| Alur utama | 1. Admin membuka form tambah jadwal. 2. Admin mengisi data jadwal. 3. Admin mengirimkan form. 4. Sistem memeriksa data yang dikirim. 5. Sistem menyimpan jadwal jika data dapat diterima. |
| Alur alternatif | Jika data tidak lengkap atau tidak dapat diproses, sistem menolak penyimpanan dan meminta Admin memperbaiki data. |
| Kondisi akhir | Jadwal perkuliahan baru tersimpan. |
| FR terkait | FR-21 |

## UC-JDW-05 — Mengubah Jadwal Perkuliahan

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-05 — Mengubah Jadwal Perkuliahan |
| Tujuan | Admin memperbarui data jadwal perkuliahan. |
| Aktor | Admin |
| Prasyarat | Admin telah login (include UC-PGN-01) dan jadwal yang akan diubah tersedia. |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | `<<extend>>` UC-JDW-03 — Melihat Jadwal Perkuliahan |
| Pemicu | Admin memilih jadwal dan fungsi ubah. |
| Alur utama | 1. Admin membuka daftar jadwal. 2. Admin memilih jadwal. 3. Sistem menampilkan data jadwal. 4. Admin mengubah data. 5. Admin menyimpan perubahan. 6. Sistem memperbarui jadwal. |
| Alur alternatif | Jika jadwal tidak ditemukan atau perubahan tidak dapat disimpan, sistem menampilkan informasi kegagalan dan data tidak diperbarui. |
| Kondisi akhir | Data jadwal diperbarui sesuai perubahan yang berhasil disimpan. |
| FR terkait | FR-22 |

## UC-JDW-06 — Menghapus atau Membatalkan Jadwal Perkuliahan

| Field | Isi |
|---|---|
| ID dan nama | UC-JDW-06 — Menghapus atau Membatalkan Jadwal Perkuliahan |
| Tujuan | Admin menghapus atau membatalkan jadwal sesuai aturan sistem. |
| Aktor | Admin |
| Prasyarat | Admin telah login (include UC-PGN-01) dan jadwal yang akan diproses tersedia. |
| Include | `<<include>>` UC-PGN-01 — Login Pengguna |
| Extend | `<<extend>>` UC-JDW-03 — Melihat Jadwal Perkuliahan |
| Pemicu | Admin memilih fungsi hapus atau batal pada jadwal. |
| Alur utama | 1. Admin membuka daftar jadwal. 2. Admin memilih jadwal. 3. Admin menjalankan fungsi hapus atau batal. 4. Sistem memproses permintaan sesuai aturan sistem. 5. Sistem menampilkan hasil proses. |
| Alur alternatif | Jika jadwal tidak ditemukan atau permintaan tidak dapat diproses, sistem menampilkan informasi kegagalan dan jadwal tidak berubah. |
| Kondisi akhir | Jadwal terhapus atau berstatus dibatalkan sesuai hasil proses dan aturan sistem. |
| FR terkait | FR-23 |
