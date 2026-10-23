# Functional Requirement — FR-13

**Status:** DRAFT  
**Aktor:** Dosen  
**Fitur:** Menghapus Materi Pembelajaran  
**Domain:** Materi  
**Prioritas:** High  
**Related FR:** FR-6, FR-7, FR-9, FR-10, FR-11, FR-12

---

# 1. Deskripsi

## 1.1 Functional Requirement

**FR-13 — Dosen Menghapus Materi Pembelajaran**

**Deskripsi:**

Dosen dapat menghapus materi pembelajaran pada mata kuliah yang diampunya.

## 1.2 Tujuan

Memudahkan dosen untuk menghapus materi pembelajaran yang sudah tidak diperlukan atau terdapat kesalahan pada materi yang tersedia.

## 1.3 Contoh

Dosen membuka daftar materi, memilih materi yang ingin dihapus, kemudian mengonfirmasi penghapusan materi tersebut.

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
[Dosen memilih materi yang ingin dihapus]
          ↓
[System menampilkan detail materi]
          ↓
[Dosen memilih Hapus Materi]
          ↓
[System meminta konfirmasi penghapusan]
          ↓
[Dosen mengonfirmasi penghapusan]
          ↓
[System memvalidasi data materi]
          ↓
[System menghapus materi]
          ↓
[System menampilkan daftar materi yang telah diperbarui]
          ↓
[FR-7 — Dosen Logout]
```

## 2.2 Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Dosen | Login ke dalam sistem | Dosen berhasil masuk ke sistem |
| 2 | Dosen | Memilih menu Materi Pembelajaran | System menampilkan daftar materi |
| 3 | Dosen | Memilih materi yang ingin dihapus | Materi dipilih |
| 4 | System | Menampilkan detail materi | Detail materi ditampilkan |
| 5 | Dosen | Memilih Hapus Materi | System meminta konfirmasi |
| 6 | System | Menampilkan konfirmasi penghapusan | Konfirmasi penghapusan ditampilkan |
| 7 | Dosen | Mengonfirmasi penghapusan | System menerima konfirmasi |
| 8 | System | Memvalidasi data materi | Data materi dinyatakan valid |
| 9 | System | Menghapus materi pembelajaran | Materi berhasil dihapus |
| 10 | System | Menampilkan daftar materi terbaru | Materi yang dihapus tidak lagi ditampilkan |
| 11 | Dosen | Melakukan Logout | Dosen keluar dari sistem |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Dosen sudah berhasil login melalui FR-6.
- [ ] Dosen memiliki akses ke fitur Materi Pembelajaran.
- [ ] Dosen memiliki mata kuliah yang diampu.
- [ ] Materi yang akan dihapus tersedia dalam sistem.
- [ ] Materi tersebut berasal dari mata kuliah yang diampu dosen.
- [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Dosen harus login terlebih dahulu untuk menghapus materi pembelajaran. |
| 2 | Dosen hanya dapat menghapus materi pada mata kuliah yang diampunya. |
| 3 | Materi yang akan dihapus harus tersedia dalam sistem. |
| 4 | System harus meminta konfirmasi sebelum materi dihapus. |
| 5 | Materi hanya dihapus setelah dosen memberikan konfirmasi. |
| 6 | Setelah berhasil dihapus, materi tidak lagi ditampilkan pada daftar materi. |

---

# 4. Fields & Validation

Fitur ini tidak membutuhkan input data materi baru. Dosen hanya memilih materi yang ingin dihapus dan memberikan konfirmasi penghapusan.

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| Mata Kuliah | Text | - | Mata kuliah yang berkaitan dengan materi | Pemrograman Dasar |
| Judul Materi | Text | - | Nama atau judul materi yang akan dihapus | Struktur Data |
| Konfirmasi Penghapusan | Boolean | Ya | Konfirmasi dari dosen untuk menghapus materi | Ya |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| Sesi Login | Dosen harus sudah login | Silakan login terlebih dahulu. |
| Materi | Materi yang akan dihapus harus tersedia | Materi pembelajaran tidak ditemukan. |
| Mata Kuliah | Materi harus berkaitan dengan mata kuliah yang diampu dosen | Materi tidak dapat dihapus. |
| Konfirmasi Penghapusan | Dosen harus memberikan konfirmasi sebelum menghapus materi | Silakan konfirmasi penghapusan materi. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**
- System memvalidasi materi yang dipilih.
- System menghapus materi pembelajaran.
- System memperbarui daftar materi.

**Success:**

> Materi pembelajaran berhasil dihapus.

## 5.2 Jika Input Tidak Valid

**System:**
- System memeriksa status login dosen.
- System memeriksa materi yang dipilih.
- System memeriksa mata kuliah yang berkaitan dengan materi.
- System tidak menghapus materi jika data tidak sesuai.

**Message:**

> Materi pembelajaran tidak dapat dihapus. Silakan periksa kembali data yang dipilih.

## 5.3 Jika Data Tidak Ditemukan

**System:**
- System tidak menemukan materi yang akan dihapus.
- System tidak melakukan proses penghapusan.

**Message:**

> Materi pembelajaran tidak ditemukan.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**
- System menampilkan pesan kesalahan.
- Materi tidak dihapus sampai proses berhasil.
- Dosen dapat mencoba melakukan penghapusan kembali.

**Message:**

> Terjadi kesalahan saat menghapus materi pembelajaran. Silakan coba lagi.

---

# 6. Acceptance Criteria

## 6.1 Functional

- [ ] Dosen dapat membuka menu Materi Pembelajaran setelah login.
- [ ] Dosen dapat melihat daftar materi pembelajaran.
- [ ] Dosen dapat memilih materi yang ingin dihapus.
- [ ] System dapat menampilkan detail materi yang dipilih.
- [ ] Dosen dapat memilih opsi Hapus Materi.
- [ ] System meminta konfirmasi sebelum menghapus materi.
- [ ] Dosen dapat mengonfirmasi penghapusan materi.
- [ ] System dapat menghapus materi yang valid.
- [ ] Materi yang berhasil dihapus tidak lagi muncul pada daftar materi.
- [ ] Dosen hanya dapat menghapus materi pada mata kuliah yang diampunya.

## 6.2 Validation

- [ ] Dosen harus login sebelum menghapus materi.
- [ ] Materi yang akan dihapus harus tersedia dalam sistem.
- [ ] Materi harus berkaitan dengan mata kuliah yang diampu dosen.
- [ ] Dosen harus memberikan konfirmasi sebelum materi dihapus.

## 6.3 Error Handling

- [ ] System menampilkan pesan ketika dosen belum login.
- [ ] System menampilkan pesan ketika materi tidak ditemukan.
- [ ] System menampilkan pesan ketika materi tidak dapat dihapus.
- [ ] System menampilkan pesan ketika terjadi kesalahan saat menghapus materi.
- [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

## 7.1 Functional Requirement Terkait

- **[FR-6] — Dosen Login**
- **[FR-7] — Dosen Logout**
- **[FR-9] — Dosen Melihat Daftar Materi Pembelajaran**
- **[FR-10] — Dosen Melihat Detail Materi Pembelajaran**
- **[FR-11] — Dosen Menambahkan Materi Pembelajaran**
- **[FR-12] — Dosen Mengubah Materi Pembelajaran**

## 7.2 Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
          ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
          ↓
[FR-10 — Melihat Detail Materi Pembelajaran]
          ↓
[FR-13 — Menghapus Materi Pembelajaran]
          ↓
[Materi berhasil dihapus]
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

