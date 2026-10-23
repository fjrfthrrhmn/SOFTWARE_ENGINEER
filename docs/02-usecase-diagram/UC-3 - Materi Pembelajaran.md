# Use Case Specification

> **Dokumen:** Use Case Specification (UC)  
> **Status:** Final  
> **Tujuan:** Mendokumentasikan interaksi antara aktor dan sistem berdasarkan domain fitur StudentConnect, termasuk prasyarat, pemicu, alur utama, alur alternatif, kondisi akhir, dan Functional Requirement (FR) terkait.

## Daftar Use Case

| ID Use Case | Nama Use Case                                     | Aktor     | FR Terkait |
| ----------- | ------------------------------------------------- | --------- | ---------- |
| UC-MTR-01   | Melihat Daftar Materi Pembelajaran oleh Mahasiswa | Mahasiswa | FR-4       |
| UC-MTR-02   | Melihat Detail Materi Pembelajaran oleh Mahasiswa | Mahasiswa | FR-5       |
| UC-MTR-03   | Melihat Daftar Materi Pembelajaran oleh Dosen     | Dosen     | FR-9       |
| UC-MTR-04   | Melihat Detail Materi Pembelajaran oleh Dosen     | Dosen     | FR-10      |
| UC-MTR-05   | Menambahkan Materi Pembelajaran                   | Dosen     | FR-11      |
| UC-MTR-06   | Mengubah Materi Pembelajaran                      | Dosen     | FR-12      |
| UC-MTR-07   | Menghapus Materi Pembelajaran                     | Dosen     | FR-13      |

---

## UC-MTR-01 — Melihat Daftar Materi Pembelajaran oleh Mahasiswa

| Field           | Isi                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-01 — Melihat Daftar Materi Pembelajaran oleh Mahasiswa                                                                                           |
| Tujuan          | Mahasiswa melihat daftar materi pada mata kuliah yang diikuti.                                                                                          |
| Aktor           | Mahasiswa                                                                                                                                               |
| Prasyarat       | Mahasiswa telah login (include UC-PGN-01).                                                                                                              |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                |
| Extend          | — (menjadi base untuk UC-MTR-02)                                                                                                                        |
| Pemicu          | Mahasiswa membuka bagian materi pembelajaran pada mata kuliah.                                                                                          |
| Alur utama      | 1. Mahasiswa membuka bagian materi pembelajaran. 2. Sistem mengambil daftar materi untuk mata kuliah yang diikuti. 3. Sistem menampilkan daftar materi. |
| Alur alternatif | Jika belum ada materi yang tersedia, sistem menampilkan informasi bahwa materi belum tersedia.                                                          |
| Kondisi akhir   | Daftar materi pembelajaran ditampilkan kepada Mahasiswa.                                                                                                |
| FR terkait      | FR-4                                                                                                                                                    |

## UC-MTR-02 — Melihat Detail Materi Pembelajaran oleh Mahasiswa

| Field           | Isi                                                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-02 — Melihat Detail Materi Pembelajaran oleh Mahasiswa                                                                            |
| Tujuan          | Mahasiswa melihat detail materi pada mata kuliah yang diikuti.                                                                           |
| Aktor           | Mahasiswa                                                                                                                                |
| Prasyarat       | Mahasiswa telah login (include UC-PGN-01) dan materi yang dipilih tersedia untuk diakses.                                                |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                 |
| Extend          | `<<extend>>` UC-MTR-01 — Melihat Daftar Materi Pembelajaran oleh Mahasiswa                                                               |
| Pemicu          | Mahasiswa memilih salah satu materi dari daftar.                                                                                         |
| Alur utama      | 1. Mahasiswa membuka daftar materi. 2. Mahasiswa memilih materi. 3. Sistem mengambil detail materi. 4. Sistem menampilkan detail materi. |
| Alur alternatif | Jika materi tidak ditemukan atau tidak dapat diakses, sistem menampilkan informasi bahwa materi tidak tersedia.                          |
| Kondisi akhir   | Detail materi pembelajaran ditampilkan kepada Mahasiswa.                                                                                 |
| FR terkait      | FR-5                                                                                                                                     |

## UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen

| Field           | Isi                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen                                                                                         |
| Tujuan          | Dosen melihat daftar materi pada mata kuliah yang diampu.                                                                                         |
| Aktor           | Dosen                                                                                                                                             |
| Prasyarat       | Dosen telah login (include UC-PGN-01).                                                                                                            |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                          |
| Extend          | — (menjadi base untuk UC-MTR-04, UC-MTR-05, UC-MTR-06, UC-MTR-07)                                                                                  |
| Pemicu          | Dosen membuka bagian materi pembelajaran pada mata kuliah yang diampu.                                                                            |
| Alur utama      | 1. Dosen membuka bagian materi pembelajaran. 2. Sistem mengambil daftar materi pada mata kuliah yang diampu. 3. Sistem menampilkan daftar materi. |
| Alur alternatif | Jika belum ada materi yang tersedia, sistem menampilkan informasi bahwa materi belum tersedia.                                                    |
| Kondisi akhir   | Daftar materi pembelajaran ditampilkan kepada Dosen.                                                                                              |
| FR terkait      | FR-9                                                                                                                                              |

## UC-MTR-04 — Melihat Detail Materi Pembelajaran oleh Dosen

| Field           | Isi                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-04 — Melihat Detail Materi Pembelajaran oleh Dosen                                                                        |
| Tujuan          | Dosen melihat detail materi pada mata kuliah yang diampu.                                                                        |
| Aktor           | Dosen                                                                                                                            |
| Prasyarat       | Dosen telah login (include UC-PGN-01) dan materi yang dipilih tersedia.                                                          |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                         |
| Extend          | `<<extend>>` UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen                                                           |
| Pemicu          | Dosen memilih salah satu materi dari daftar.                                                                                     |
| Alur utama      | 1. Dosen membuka daftar materi. 2. Dosen memilih materi. 3. Sistem mengambil detail materi. 4. Sistem menampilkan detail materi. |
| Alur alternatif | Jika materi tidak ditemukan, sistem menampilkan informasi bahwa materi tidak tersedia.                                           |
| Kondisi akhir   | Detail materi pembelajaran ditampilkan kepada Dosen.                                                                             |
| FR terkait      | FR-10                                                                                                                            |

## UC-MTR-05 — Menambahkan Materi Pembelajaran

| Field           | Isi                                                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-05 — Menambahkan Materi Pembelajaran                                                                                                                                                    |
| Tujuan          | Dosen menambahkan materi pada mata kuliah yang diampu.                                                                                                                                         |
| Aktor           | Dosen                                                                                                                                                                                          |
| Prasyarat       | Dosen telah login (include UC-PGN-01) dan memiliki akses ke mata kuliah yang diampu.                                                                                                          |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                                       |
| Extend          | `<<extend>>` UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen                                                                                                                         |
| Pemicu          | Dosen memilih fungsi tambah materi.                                                                                                                                                            |
| Alur utama      | 1. Dosen membuka form tambah materi. 2. Dosen mengisi informasi materi. 3. Dosen mengirimkan form. 4. Sistem memeriksa data yang dikirim. 5. Sistem menyimpan materi jika data dapat diterima. |
| Alur alternatif | Jika data tidak lengkap atau tidak dapat diproses, sistem menolak penyimpanan dan meminta Dosen memperbaiki data.                                                                              |
| Kondisi akhir   | Materi pembelajaran baru tersimpan pada mata kuliah terkait.                                                                                                                                   |
| FR terkait      | FR-11                                                                                                                                                                                          |

## UC-MTR-06 — Mengubah Materi Pembelajaran

| Field           | Isi                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-06 — Mengubah Materi Pembelajaran                                                                                                                                                    |
| Tujuan          | Dosen memperbarui materi pada mata kuliah yang diampu.                                                                                                                                      |
| Aktor           | Dosen                                                                                                                                                                                       |
| Prasyarat       | Dosen telah login (include UC-PGN-01) dan materi yang akan diubah tersedia pada mata kuliah yang diampu.                                                                                    |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                                    |
| Extend          | `<<extend>>` UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen                                                                                                                      |
| Pemicu          | Dosen memilih materi dan fungsi ubah.                                                                                                                                                       |
| Alur utama      | 1. Dosen membuka daftar materi. 2. Dosen memilih materi. 3. Sistem menampilkan data materi. 4. Dosen mengubah informasi materi. 5. Dosen menyimpan perubahan. 6. Sistem memperbarui materi. |
| Alur alternatif | Jika materi tidak ditemukan atau perubahan tidak dapat disimpan, sistem menampilkan informasi kegagalan dan data tidak diperbarui.                                                          |
| Kondisi akhir   | Data materi diperbarui sesuai perubahan yang berhasil disimpan.                                                                                                                             |
| FR terkait      | FR-12                                                                                                                                                                                       |

## UC-MTR-07 — Menghapus Materi Pembelajaran

| Field           | Isi                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID dan nama     | UC-MTR-07 — Menghapus Materi Pembelajaran                                                                                                                                   |
| Tujuan          | Dosen menghapus materi pada mata kuliah yang diampu.                                                                                                                        |
| Aktor           | Dosen                                                                                                                                                                       |
| Prasyarat       | Dosen telah login (include UC-PGN-01) dan materi yang akan dihapus tersedia pada mata kuliah yang diampu.                                                                   |
| Include         | `<<include>>` UC-PGN-01 — Login Pengguna                                                                                                                                    |
| Extend          | `<<extend>>` UC-MTR-03 — Melihat Daftar Materi Pembelajaran oleh Dosen                                                                                                      |
| Pemicu          | Dosen memilih materi dan fungsi hapus.                                                                                                                                      |
| Alur utama      | 1. Dosen membuka daftar materi. 2. Dosen memilih materi. 3. Dosen menjalankan fungsi hapus. 4. Sistem memproses permintaan penghapusan. 5. Sistem menampilkan hasil proses. |
| Alur alternatif | Jika materi tidak ditemukan atau penghapusan tidak dapat diproses, sistem menampilkan informasi kegagalan dan materi tidak berubah.                                         |
| Kondisi akhir   | Materi pembelajaran terhapus jika proses berhasil.                                                                                                                          |
| FR terkait      | FR-13                                                                                                                                                                       |
