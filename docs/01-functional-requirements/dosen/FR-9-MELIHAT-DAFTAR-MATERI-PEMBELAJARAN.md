# Functional Requirement — FR-9

> **Status:** DRAFT
> **Aktor:** Dosen
> **Fitur:** Melihat Daftar Materi Pembelajaran
> **Domain:** Materi
> **Prioritas:** High
> **Related FR:** FR-6, FR-7, FR-8

---

# 1. Deskripsi

### Functional Requirement

**FR-9 — Dosen Melihat Daftar Materi Pembelajaran**

**Deskripsi:**

> Dosen dapat melihat daftar materi pembelajaran pada mata kuliah yang diampunya.

### Tujuan

Memudahkan dosen untuk melihat dan memantau materi pembelajaran yang tersedia pada mata kuliah yang diampu.

### Contoh

> Setelah login, dosen membuka menu Materi Pembelajaran untuk melihat daftar materi pada mata kuliah yang diampu.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[FR-6 — Dosen Login]
        ↓
[Dosen berhasil masuk ke sistem]
        ↓
[Dosen memilih menu Materi Pembelajaran]
        ↓
[System mengambil daftar materi]
        ↓
[System menampilkan daftar materi pembelajaran]
        ↓
[Dosen melihat daftar materi]
        ↓
[FR-7 — Dosen Logout]
```

### Detail Flow

| Step | Aktor  | Aktivitas                              | Hasil                                 |
| ---- | ------ | -------------------------------------- | ------------------------------------- |
| 1    | Dosen  | Login ke dalam sistem                  | Dosen berhasil masuk ke sistem        |
| 2    | Dosen  | Memilih menu Materi Pembelajaran       | System menerima permintaan            |
| 3    | System | Mengambil daftar materi pembelajaran   | Data materi diperoleh                 |
| 4    | System | Menampilkan daftar materi pembelajaran | Daftar materi ditampilkan             |
| 5    | Dosen  | Melihat daftar materi                  | Dosen mengetahui materi yang tersedia |
| 6    | Dosen  | Melakukan Logout                       | Dosen keluar dari sistem              |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [ ] Dosen sudah berhasil login melalui FR-8.
* [ ] Dosen memiliki akses ke fitur Materi Pembelajaran.
* [ ] Dosen memiliki mata kuliah yang diampu.
* [ ] Data materi pembelajaran tersedia dalam sistem.
* [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                |
| --- | ------------------------------------------------------------------------------------- |
| 1   | Dosen harus login terlebih dahulu untuk melihat materi pembelajaran.                  |
| 2   | Dosen hanya dapat melihat materi dari mata kuliah yang diampunya.                     |
| 3   | Materi yang ditampilkan harus sesuai dengan data yang tersedia dalam sistem.          |
| 4   | Daftar materi dapat berisi judul materi, deskripsi, dan file/URL materi.              |
| 5   | Jika belum terdapat materi, system menampilkan informasi bahwa materi belum tersedia. |
| 6   | Dosen tidak dapat mengubah materi melalui fitur ini.                                  |

---

# 4. Fields & Validation

> Fitur ini tidak membutuhkan input data dari dosen. Daftar materi ditampilkan berdasarkan data yang tersedia dalam sistem.

## 4.1 Fields

| Field               | Tipe | Wajib | Keterangan                             | Contoh                 |
| ------------------- | ---- | ----- | -------------------------------------- | ---------------------- |
| Mata Kuliah         | Text | -     | Nama mata kuliah yang diampu           | Pemrograman Dasar      |
| Judul Materi        | Text | -     | Nama atau judul materi pembelajaran    | Struktur Data          |
| Deskripsi Materi    | Text | -     | Penjelasan singkat mengenai materi     | Pengenalan Linked List |
| File/URL Materi     | Text | -     | URL file materi pembelajaran           | https://univ.ac.id/materi/modul.pdf |
| Tanggal Ditambahkan | Date | -     | Tanggal materi ditambahkan (createdAt) | 25-09-2026             |

## 4.2 Validation

| Field       | Aturan                                                    | Pesan Error                         |
| ----------- | --------------------------------------------------------- | ----------------------------------- |
| Sesi Login  | Dosen harus sudah login                                   | Silakan login terlebih dahulu.      |
| Data Materi | Data materi harus tersedia                                | Materi pembelajaran belum tersedia. |
| Mata Kuliah | Data harus berkaitan dengan mata kuliah yang diampu dosen | Materi pembelajaran tidak tersedia. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

* System mengambil daftar materi pembelajaran.
* System menampilkan daftar materi.
* Dosen dapat melihat materi pembelajaran yang tersedia.

**Success:**

> Daftar materi pembelajaran berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

> Fitur ini tidak menggunakan input dari dosen. Validasi dilakukan berdasarkan sesi login dan data materi yang tersedia.

**System:**

* System memeriksa status login dosen.
* System memeriksa data materi yang tersedia.
* Jika data tidak sesuai, system menampilkan pesan yang sesuai.

**Message:**

> Materi pembelajaran tidak dapat ditampilkan.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* System tidak menemukan materi pembelajaran untuk mata kuliah yang diampu.
* System menampilkan informasi bahwa materi belum tersedia.

**Message:**

> Materi pembelajaran belum tersedia.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* System menampilkan pesan kesalahan.
* Dosen dapat mencoba membuka daftar materi kembali.

**Message:**

> Terjadi kesalahan saat mengambil materi pembelajaran. Silakan coba lagi.

---

# 6. Acceptance Criteria

### Functional

* [ ] Dosen dapat membuka menu Materi Pembelajaran setelah login.
* [ ] System dapat mengambil daftar materi pembelajaran.
* [ ] System dapat menampilkan daftar materi pembelajaran.
* [ ] Dosen dapat melihat mata kuliah yang berkaitan dengan materi.
* [ ] Dosen dapat melihat judul materi.
* [ ] Dosen dapat melihat file/URL materi.
* [ ] Dosen hanya dapat melihat materi dari mata kuliah yang diampunya.

### Validation

* [ ] Dosen harus login sebelum mengakses materi pembelajaran.
* [ ] Materi yang ditampilkan harus berkaitan dengan mata kuliah yang diampu dosen.
* [ ] Jika materi pembelajaran tidak tersedia, system menampilkan informasi yang sesuai.

### Error Handling

* [ ] System menampilkan pesan ketika dosen belum login.
* [ ] System menampilkan pesan ketika materi pembelajaran tidak ditemukan.
* [ ] System menampilkan pesan ketika terjadi kesalahan saat mengambil data materi.
* [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

### Functional Requirement Terkait

* [FR-6] — Dosen Login
* [FR-7] — Dosen Logout
* [FR-8] — Dosen Melihat Jadwal Mengajar

### Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
        ↓
[FR-8 — Melihat Jadwal Mengajar]
        ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
        ↓
[Dosen melihat daftar materi pembelajaran]
        ↓
[FR-7 — Dosen Logout]
```

---

# 8. Status Dokumentasi

| Item           | Status      |
| -------------- | ----------- |
| Requirement    | DRAFT       |
| User Flow      | DRAFT       |
| Validation     | DRAFT       |
| Implementation | NOT STARTED |

