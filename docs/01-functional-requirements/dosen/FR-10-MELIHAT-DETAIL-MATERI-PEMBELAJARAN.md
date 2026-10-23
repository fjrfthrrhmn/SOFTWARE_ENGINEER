# Functional Requirement — FR-10

> **Status:** DRAFT
> **Aktor:** Dosen
> **Fitur:** Melihat Detail Materi Pembelajaran
> **Domain:** Materi
> **Prioritas:** High
> **Related FR:** FR-6, FR-7, FR-8, FR-9

---

# 1. Deskripsi

### Functional Requirement

**FR-10 — Dosen Melihat Detail Materi Pembelajaran**

**Deskripsi:**

> Dosen dapat melihat detail materi pembelajaran pada mata kuliah yang diampunya.

### Tujuan

Memudahkan dosen untuk melihat informasi lengkap mengenai materi pembelajaran yang tersedia pada mata kuliah yang diampu.

### Contoh

> Setelah membuka daftar materi pembelajaran, dosen memilih salah satu materi untuk melihat detail seperti judul, deskripsi, dan file/URL materi.

---

# 2. User Flow

## 2.1 Alur Utama

```text id="k7p2mz"
[FR-6 — Dosen Login]
        ↓
[Dosen berhasil masuk ke sistem]
        ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
        ↓
[Dosen memilih salah satu materi]
        ↓
[System mengambil detail materi]
        ↓
[System menampilkan detail materi pembelajaran]
        ↓
[Dosen melihat detail materi]
        ↓
[FR-7 — Dosen Logout]
```

### Detail Flow

| Step | Aktor  | Aktivitas                              | Hasil                             |
| ---- | ------ | -------------------------------------- | --------------------------------- |
| 1    | Dosen  | Login ke dalam sistem                  | Dosen berhasil masuk ke sistem    |
| 2    | Dosen  | Memilih menu Materi Pembelajaran       | System menerima permintaan        |
| 3    | System | Menampilkan daftar materi              | Daftar materi ditampilkan         |
| 4    | Dosen  | Memilih salah satu materi              | System menerima pilihan materi    |
| 5    | System | Mengambil detail materi                | Detail materi diperoleh           |
| 6    | System | Menampilkan detail materi pembelajaran | Detail materi ditampilkan         |
| 7    | Dosen  | Melihat detail materi                  | Dosen mengetahui informasi materi |
| 8    | Dosen  | Melakukan Logout                       | Dosen keluar dari sistem          |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [ ] Dosen sudah berhasil login melalui FR-8.
* [ ] Dosen memiliki akses ke fitur Materi Pembelajaran.
* [ ] Dosen memiliki mata kuliah yang diampu.
* [ ] Data materi pembelajaran tersedia dalam sistem.
* [ ] Dosen sudah melihat daftar materi melalui FR-14.
* [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                 |
| --- | -------------------------------------------------------------------------------------- |
| 1   | Dosen harus login terlebih dahulu untuk melihat detail materi.                         |
| 2   | Dosen hanya dapat melihat detail materi dari mata kuliah yang diampunya.               |
| 3   | Materi yang dipilih harus tersedia dalam sistem.                                       |
| 4   | Detail materi harus sesuai dengan data yang tersimpan dalam sistem.                    |
| 5   | Detail materi dapat berisi judul materi, mata kuliah, deskripsi, dan file/URL materi.  |
| 6   | Dosen tidak dapat mengubah materi melalui fitur ini.                                   |

---

# 4. Fields & Validation

> Fitur ini tidak membutuhkan input data dari dosen selain memilih materi yang ingin dilihat. Detail materi ditampilkan berdasarkan data yang tersedia dalam sistem.

## 4.1 Fields

| Field               | Tipe | Wajib | Keterangan                                    | Contoh                 |
| ------------------- | ---- | ----- | --------------------------------------------- | ---------------------- |
| Mata Kuliah         | Text | -     | Nama mata kuliah yang berkaitan dengan materi | Pemrograman Dasar      |
| Judul Materi        | Text | -     | Nama atau judul materi pembelajaran           | Struktur Data          |
| Deskripsi Materi    | Text | -     | Penjelasan mengenai materi pembelajaran       | Pengenalan Linked List |
| File/URL Materi     | Text | -     | URL file materi pembelajaran                  | https://univ.ac.id/materi/modul.pdf |
| Tanggal Ditambahkan | Date | -     | Tanggal materi ditambahkan (createdAt)        | 25-09-2026             |

## 4.2 Validation

| Field       | Aturan                                                      | Pesan Error                          |
| ----------- | ----------------------------------------------------------- | ------------------------------------ |
| Sesi Login  | Dosen harus sudah login                                     | Silakan login terlebih dahulu.       |
| Materi      | Materi yang dipilih harus tersedia                          | Materi pembelajaran tidak ditemukan. |
| Mata Kuliah | Materi harus berkaitan dengan mata kuliah yang diampu dosen | Materi tidak dapat diakses.          |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

* System mengambil data detail materi.
* System menampilkan informasi lengkap materi pembelajaran.
* Dosen dapat melihat detail materi.

**Success:**

> Detail materi pembelajaran berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

> Fitur ini hanya membutuhkan pemilihan materi. Validasi dilakukan berdasarkan sesi login dan materi yang dipilih.

**System:**

* System memeriksa status login dosen.
* System memeriksa materi yang dipilih.
* System memeriksa mata kuliah yang berkaitan dengan materi.

**Message:**

> Detail materi pembelajaran tidak dapat ditampilkan.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* System tidak menemukan materi yang dipilih.
* System menampilkan informasi bahwa materi tidak tersedia.

**Message:**

> Materi pembelajaran tidak ditemukan.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* System menampilkan pesan kesalahan.
* Dosen dapat mencoba membuka detail materi kembali.

**Message:**

> Terjadi kesalahan saat mengambil detail materi. Silakan coba lagi.

---

# 6. Acceptance Criteria

### Functional

* [ ] Dosen dapat membuka daftar materi pembelajaran setelah login.
* [ ] Dosen dapat memilih salah satu materi.
* [ ] System dapat mengambil detail materi yang dipilih.
* [ ] System dapat menampilkan detail materi pembelajaran.
* [ ] Dosen dapat melihat judul materi.
* [ ] Dosen dapat melihat mata kuliah.
* [ ] Dosen dapat melihat file/URL materi.
* [ ] Dosen dapat melihat deskripsi materi.
* [ ] Dosen hanya dapat melihat materi dari mata kuliah yang diampunya.

### Validation

* [ ] Dosen harus login sebelum mengakses detail materi.
* [ ] Materi yang dipilih harus tersedia dalam sistem.
* [ ] Materi harus berkaitan dengan mata kuliah yang diampu dosen.

### Error Handling

* [ ] System menampilkan pesan ketika dosen belum login.
* [ ] System menampilkan pesan ketika materi tidak ditemukan.
* [ ] System menampilkan pesan ketika materi tidak dapat diakses.
* [ ] System menampilkan pesan ketika terjadi kesalahan saat mengambil detail materi.
* [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

### Functional Requirement Terkait

* [FR-6] — Dosen Login
* [FR-7] — Dosen Logout
* [FR-8] — Dosen Melihat Jadwal Mengajar
* [FR-10] — Dosen Melihat Daftar Materi Pembelajaran

### Flow yang Berhubungan

```text id="q5x8nu"
[FR-6 — Dosen Login]
        ↓
[FR-8 — Melihat Jadwal Mengajar]
        ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
        ↓
[FR-10 — Melihat Detail Materi Pembelajaran]
        ↓
[Dosen melihat detail materi]
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

