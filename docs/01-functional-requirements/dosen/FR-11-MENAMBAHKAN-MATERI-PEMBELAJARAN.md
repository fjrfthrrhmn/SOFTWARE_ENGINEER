# Functional Requirement — FR-11

> **Status:** DRAFT
> **Aktor:** Dosen
> **Fitur:** Menambahkan Materi Pembelajaran
> **Domain:** Materi
> **Prioritas:** High
> **Related FR:** FR-6, FR-7, FR-9, FR-10

---

# 1. Deskripsi

### Functional Requirement

**FR-11 — Dosen Menambahkan Materi Pembelajaran**

**Deskripsi:**

> Dosen dapat menambahkan materi pembelajaran pada mata kuliah yang diampunya.

### Tujuan

Memudahkan dosen untuk menambahkan materi pembelajaran agar dapat tersedia pada mata kuliah yang diampu.

### Contoh

> Setelah login, dosen memilih menu Materi Pembelajaran, memilih mata kuliah, kemudian mengisi informasi materi dan menyimpan materi tersebut.

---

# 2. User Flow

## 2.1 Alur Utama

```text id="v8q3lm"
[FR-6 — Dosen Login]
        ↓
[Dosen berhasil masuk ke sistem]
        ↓
[Dosen memilih menu Materi Pembelajaran]
        ↓
[Dosen memilih mata kuliah yang diampu]
        ↓
[Dosen memilih Tambah Materi]
        ↓
[Dosen mengisi data materi]
        ↓
[System memvalidasi data materi]
        ↓
[System menyimpan materi]
        ↓
[System menampilkan materi yang berhasil ditambahkan]
        ↓
[FR-7 — Dosen Logout]
```

### Detail Flow

| Step | Aktor  | Aktivitas                           | Hasil                              |
| ---- | ------ | ----------------------------------- | ---------------------------------- |
| 1    | Dosen  | Login ke dalam sistem               | Dosen berhasil masuk ke sistem     |
| 2    | Dosen  | Memilih menu Materi Pembelajaran    | System menerima permintaan         |
| 3    | Dosen  | Memilih mata kuliah yang diampu     | Mata kuliah dipilih                |
| 4    | Dosen  | Memilih Tambah Materi               | System menampilkan form materi     |
| 5    | Dosen  | Mengisi data materi                 | Data materi dimasukkan             |
| 6    | Dosen  | Menyimpan materi                    | System menerima data materi        |
| 7    | System | Memvalidasi data materi             | Data materi dinyatakan valid       |
| 8    | System | Menyimpan materi pembelajaran       | Materi berhasil disimpan           |
| 9    | System | Menampilkan materi yang ditambahkan | Materi tersedia pada daftar materi |
| 10   | Dosen  | Melakukan Logout                    | Dosen keluar dari sistem           |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [ ] Dosen sudah berhasil login melalui FR-8.
* [ ] Dosen memiliki akses ke fitur Materi Pembelajaran.
* [ ] Dosen memiliki mata kuliah yang diampu.
* [ ] System dapat diakses.
* [ ] Data materi dapat disimpan dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan                                                                         |
| --- | ------------------------------------------------------------------------------ |
| 1   | Dosen harus login terlebih dahulu untuk menambahkan materi.                    |
| 2   | Dosen hanya dapat menambahkan materi pada mata kuliah yang diampunya.          |
| 3   | Data materi wajib diisi sesuai dengan ketentuan yang berlaku.                  |
| 4   | System harus memvalidasi data sebelum materi disimpan.                         |
| 5   | Materi hanya disimpan jika data yang dimasukkan valid.                         |
| 6   | Materi yang berhasil ditambahkan harus muncul pada daftar materi pembelajaran. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field            | Tipe | Wajib | Keterangan                               | Contoh                 |
| ---------------- | ---- | ----- | ---------------------------------------- | ---------------------- |
| Mata Kuliah      | Text | Ya    | Mata kuliah yang akan ditambahkan materi | Pemrograman Dasar      |
| Judul Materi     | Text | Ya    | Nama atau judul materi pembelajaran      | Struktur Data          |
| Deskripsi Materi | Text | Ya    | Penjelasan mengenai materi pembelajaran  | Pengenalan Linked List |
| File/URL Materi  | Text | Ya    | URL file materi pembelajaran (fileUrl)   | https://univ.ac.id/materi/modul.pdf |

## 4.2 Validation

| Field            | Aturan                                                    | Pesan Error                      |
| ---------------- | --------------------------------------------------------- | -------------------------------- |
| Sesi Login       | Dosen harus sudah login                                   | Silakan login terlebih dahulu.   |
| Mata Kuliah      | Mata kuliah harus merupakan mata kuliah yang diampu dosen | Mata kuliah tidak dapat dipilih. |
| Judul Materi     | Judul materi wajib diisi                                  | Judul materi wajib diisi.        |
| File/URL Materi  | File/URL materi wajib diisi                               | File/URL materi wajib diisi.     |
| Deskripsi Materi | Deskripsi materi wajib diisi                              | Deskripsi materi wajib diisi.    |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

* System memvalidasi data materi.
* System menyimpan materi pembelajaran.
* System menampilkan materi pada daftar materi.

**Success:**

> Materi pembelajaran berhasil ditambahkan.

---

## 5.2 Jika Input Tidak Valid

**System:**

* System memeriksa kelengkapan data materi.
* System memeriksa kesesuaian mata kuliah.
* System tidak menyimpan data jika terdapat data yang tidak valid.

**Message:**

> Data materi tidak valid. Silakan periksa kembali data yang dimasukkan.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* System tidak menemukan mata kuliah yang dipilih.
* System tidak dapat menyimpan materi pada mata kuliah tersebut.

**Message:**

> Mata kuliah tidak ditemukan atau tidak dapat diakses.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* System menampilkan pesan kesalahan.
* Data materi tidak disimpan sampai proses berhasil.
* Dosen dapat mencoba menyimpan materi kembali.

**Message:**

> Terjadi kesalahan saat menyimpan materi pembelajaran. Silakan coba lagi.

---

# 6. Acceptance Criteria

### Functional

* [ ] Dosen dapat membuka menu Materi Pembelajaran setelah login.
* [ ] Dosen dapat memilih mata kuliah yang diampunya.
* [ ] Dosen dapat memilih menu Tambah Materi.
* [ ] Dosen dapat mengisi data materi pembelajaran.
* [ ] System dapat memvalidasi data materi.
* [ ] System dapat menyimpan materi yang valid.
* [ ] Materi yang berhasil ditambahkan dapat dilihat pada daftar materi.
* [ ] Dosen hanya dapat menambahkan materi pada mata kuliah yang diampunya.

### Validation

* [ ] Dosen harus login sebelum menambahkan materi.
* [ ] Mata kuliah harus merupakan mata kuliah yang diampu dosen.
* [ ] Judul materi wajib diisi.
* [ ] File/URL materi wajib diisi.
* [ ] Deskripsi materi wajib diisi.
* [ ] Data yang tidak valid tidak dapat disimpan.

### Error Handling

* [ ] System menampilkan pesan ketika dosen belum login.
* [ ] System menampilkan pesan ketika data materi tidak lengkap.
* [ ] System menampilkan pesan ketika mata kuliah tidak ditemukan.
* [ ] System menampilkan pesan ketika terjadi kesalahan saat menyimpan materi.
* [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

### Functional Requirement Terkait

* [FR-6] — Dosen Login
* [FR-7] — Dosen Logout
* [FR-8] — Dosen Melihat Jadwal Mengajar
* [FR-9] — Dosen Melihat Daftar Materi Pembelajaran
* [FR-10] — Dosen Melihat Detail Materi Pembelajaran

### Flow yang Berhubungan

```text id="x2m7pk"
[FR-6 — Dosen Login]
        ↓
[FR-8 — Melihat Jadwal Mengajar]
        ↓
[FR-9 — Melihat Daftar Materi Pembelajaran]
        ↓
[FR-11 — Menambahkan Materi Pembelajaran]
        ↓
[Materi berhasil ditambahkan]
        ↓
[FR-10 — Melihat Detail Materi Pembelajaran]
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

