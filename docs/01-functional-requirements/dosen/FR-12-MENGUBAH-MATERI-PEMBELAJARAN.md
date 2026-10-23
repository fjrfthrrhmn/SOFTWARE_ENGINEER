# FUNCTIONAL REQUIREMENT — FR-12

**Dokumen:** Functional Requirement (FR)  
**Status:** DRAFT  
**Aktor:** Dosen  
**Fitur:** Mengubah Materi Pembelajaran  
**Domain:** Materi  
**Prioritas:** High  
**Related FR:** FR-6, FR-7, FR-9, FR-10

---

# 1. Deskripsi

## 1.1 Functional Requirement

**FR-12 — Dosen Mengubah Materi Pembelajaran**

**Deskripsi:**

Dosen dapat mengubah materi pembelajaran pada mata kuliah yang diampunya.

## 1.2 Tujuan

Memudahkan dosen untuk memperbarui informasi materi pembelajaran apabila terdapat kesalahan atau perubahan pada materi yang tersedia.

## 1.3 Contoh

Dosen membuka daftar materi, memilih materi yang ingin diubah, memperbarui judul atau deskripsi materi, kemudian menyimpan perubahan.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[FR-6 — Dosen Login]
          ↓
[Dosen berhasil masuk ke sistem]
          ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
          ↓
[Dosen memilih materi yang ingin diubah]
          ↓
[System menampilkan data materi]
          ↓
[Dosen mengubah data materi]
          ↓
[System memvalidasi perubahan]
          ↓
[System menyimpan perubahan materi]
          ↓
[System menampilkan materi yang telah diperbarui]
          ↓
[FR-7 — Dosen Logout]
```

## 2.2 Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Dosen | Login ke dalam sistem | Dosen berhasil masuk ke sistem |
| 2 | Dosen | Memilih menu Materi Pembelajaran | System menampilkan daftar materi |
| 3 | Dosen | Memilih materi yang ingin diubah | Materi dipilih |
| 4 | System | Menampilkan data materi | Data materi ditampilkan |
| 5 | Dosen | Mengubah data materi | Data materi diperbarui |
| 6 | Dosen | Menyimpan perubahan | System menerima perubahan |
| 7 | System | Memvalidasi data materi | Data dinyatakan valid |
| 8 | System | Menyimpan perubahan materi | Perubahan berhasil disimpan |
| 9 | System | Menampilkan materi yang telah diperbarui | Data materi terbaru ditampilkan |
| 10 | Dosen | Melakukan logout | Dosen keluar dari sistem |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Dosen sudah berhasil login melalui FR-6.
- [ ] Dosen memiliki akses ke fitur Materi Pembelajaran.
- [ ] Dosen memiliki mata kuliah yang diampu.
- [ ] Materi yang akan diubah tersedia dalam sistem.
- [ ] Materi tersebut berasal dari mata kuliah yang diampu dosen.
- [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Dosen harus login terlebih dahulu untuk mengubah materi pembelajaran. |
| 2 | Dosen hanya dapat mengubah materi pada mata kuliah yang diampunya. |
| 3 | Materi yang akan diubah harus tersedia dalam sistem. |
| 4 | Data materi wajib diisi sesuai dengan ketentuan yang berlaku. |
| 5 | System harus memvalidasi perubahan sebelum menyimpan data. |
| 6 | Perubahan hanya disimpan jika data yang dimasukkan valid. |
| 7 | Setelah berhasil diubah, data terbaru harus ditampilkan pada daftar materi. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| Mata Kuliah | Text | Ya | Mata kuliah yang berkaitan dengan materi | Pemrograman Dasar |
| Judul Materi | Text | Ya | Nama atau judul materi pembelajaran | Struktur Data |
| File/URL Materi | Text | Ya | URL file materi pembelajaran (fileUrl) | https://univ.ac.id/materi/modul.pdf |
| Deskripsi Materi | Text | Ya | Penjelasan mengenai materi pembelajaran | Pengenalan Linked List |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| Sesi Login | Dosen harus sudah login | Silakan login terlebih dahulu. |
| Materi | Materi yang akan diubah harus tersedia | Materi pembelajaran tidak ditemukan. |
| Mata Kuliah | Materi harus berkaitan dengan mata kuliah yang diampu dosen | Materi tidak dapat diubah. |
| Judul Materi | Judul materi wajib diisi | Judul materi wajib diisi. |
| File/URL Materi | File/URL materi wajib diisi | File/URL materi wajib diisi. |
| Deskripsi Materi | Deskripsi materi wajib diisi | Deskripsi materi wajib diisi. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**
- System memvalidasi perubahan materi.
- System menyimpan data materi terbaru.
- System menampilkan materi yang telah diperbarui.

**Success:**

> Materi pembelajaran berhasil diperbarui.

## 5.2 Jika Input Tidak Valid

**System:**
- System memeriksa kelengkapan data materi.
- System memeriksa kesesuaian mata kuliah.
- System tidak menyimpan perubahan jika terdapat data yang tidak valid.

**Message:**

> Data materi tidak valid. Silakan periksa kembali data yang dimasukkan.

## 5.3 Jika Data Tidak Ditemukan

**System:**
- System tidak menemukan materi yang akan diubah.
- System tidak dapat melakukan perubahan pada materi tersebut.

**Message:**

> Materi pembelajaran tidak ditemukan.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**
- System menampilkan pesan kesalahan.
- Perubahan materi tidak disimpan sampai proses berhasil.
- Dosen dapat mencoba menyimpan perubahan kembali.

**Message:**

> Terjadi kesalahan saat memperbarui materi pembelajaran. Silakan coba lagi.

---

# 6. Acceptance Criteria

## 6.1 Functional

- [ ] Dosen dapat membuka menu Materi Pembelajaran setelah login.
- [ ] Dosen dapat melihat daftar materi pembelajaran.
- [ ] Dosen dapat memilih materi yang ingin diubah.
- [ ] System dapat menampilkan data materi yang dipilih.
- [ ] Dosen dapat mengubah data materi.
- [ ] System dapat memvalidasi perubahan materi.
- [ ] System dapat menyimpan perubahan materi yang valid.
- [ ] Data materi yang telah diperbarui dapat dilihat pada daftar materi.
- [ ] Dosen hanya dapat mengubah materi pada mata kuliah yang diampunya.

## 6.2 Validation

- [ ] Dosen harus login sebelum mengubah materi.
- [ ] Materi yang akan diubah harus tersedia dalam sistem.
- [ ] Materi harus berkaitan dengan mata kuliah yang diampu dosen.
- [ ] Judul materi wajib diisi.
- [ ] File/URL materi wajib diisi.
- [ ] Deskripsi materi wajib diisi.
- [ ] Data yang tidak valid tidak dapat disimpan.

## 6.3 Error Handling

- [ ] System menampilkan pesan ketika dosen belum login.
- [ ] System menampilkan pesan ketika materi tidak ditemukan.
- [ ] System menampilkan pesan ketika data materi tidak lengkap.
- [ ] System menampilkan pesan ketika materi tidak dapat diubah.
- [ ] System menampilkan pesan ketika terjadi kesalahan saat menyimpan perubahan.
- [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

## 7.1 Functional Requirement Terkait

- **[FR-6] — Dosen Login**
- **[FR-7] — Dosen Logout**
- **[FR-9] — Dosen Melihat Daftar Materi Pembelajaran**
- **[FR-10] — Dosen Melihat Detail Materi Pembelajaran**
- **[FR-11] — Dosen Menambahkan Materi Pembelajaran**

## 7.2 Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
          ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
          ↓
[FR-10 — Melihat Detail Materi Pembelajaran]
          ↓
[FR-12 — Mengubah Materi Pembelajaran]
          ↓
[Materi berhasil diperbarui]
          ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
          ↓
[FR-7 — Dosen Logout]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |

