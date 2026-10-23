# Functional Requirement — FR-4

> **Status:** DRAFT
> **Aktor:** Mahasiswa
> **Fitur:** Melihat Daftar Materi Pembelajaran
> **Domain:** Materi
> **Prioritas:** High
> **Related FR:** FR-1 — Login, FR-2 — Logout, FR-3 — Melihat Jadwal Kuliah, FR-4 — Daftar Materi Pembelajaran
> **Tujuan File:** Mendokumentasikan Functional Requirement untuk fitur Melihat Daftar Materi Pembelajaran

---

# 1. Deskripsi

### Functional Requirement

**FR-4 — Melihat Daftar Materi Pembelajaran**

**Deskripsi:**

> Mahasiswa dapat melihat daftar materi pembelajaran yang tersedia pada sistem setelah login dan masuk ke halaman Dashboard.

### Tujuan

Fitur ini bertujuan agar mahasiswa dapat melihat materi pembelajaran yang tersedia sesuai dengan kurikulum program studi mahasiswa.

### Contoh

> Mahasiswa login ke sistem, masuk ke Dashboard, kemudian memilih menu Materi Pembelajaran untuk melihat daftar materi yang tersedia.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Mahasiswa membuka halaman Login]
        ↓
[Mahasiswa melakukan Login]
        ↓
[System memvalidasi Login]
        ↓
[System menampilkan Dashboard]
        ↓
[Mahasiswa memilih menu Materi Pembelajaran]
        ↓
[System mengambil daftar materi]
        ↓
[System menampilkan daftar materi]
```

### Detail Flow

| Step | Aktor     | Aktivitas                                     | Hasil                                                   |
| ---- | --------- | --------------------------------------------- | ------------------------------------------------------- |
| 1    | Mahasiswa | Login ke dalam sistem.                        | Sistem memvalidasi akun mahasiswa.                      |
| 2    | System    | Menampilkan Dashboard setelah login berhasil. | Dashboard ditampilkan.                                  |
| 3    | Mahasiswa | Memilih menu Materi Pembelajaran.             | Sistem membuka halaman materi.                          |
| 4    | System    | Mengambil daftar materi yang tersedia.        | Data materi diproses untuk ditampilkan.                 |
| 5    | System    | Menampilkan daftar materi pembelajaran.       | Mahasiswa dapat melihat materi yang tersedia.           |
| 6    | Mahasiswa | Melihat daftar materi.                        | Mahasiswa mengetahui materi pembelajaran yang tersedia. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [x] Mahasiswa sudah login.
* [x] Mahasiswa sudah berada di Dashboard.
* [x] Mahasiswa memiliki akses ke menu Materi Pembelajaran.
* [x] Data materi pembelajaran tersedia.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                |
| --- | ------------------------------------------------------------------------------------- |
| 1   | Mahasiswa harus login terlebih dahulu untuk melihat materi.                           |
| 2   | Mahasiswa hanya dapat melihat materi pada mata kuliah di kurikulum program studinya.  |
| 3   | Daftar materi ditampilkan berdasarkan data yang tersedia pada sistem.                 |
| 4   | Materi yang belum tersedia tidak ditampilkan sebagai materi yang dapat diakses.       |
| 5   | Jika belum terdapat materi, sistem menampilkan informasi bahwa materi belum tersedia. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field          | Tipe | Wajib | Keterangan                                 | Contoh            |
| -------------- | ---- | ----- | ------------------------------------------ | ----------------- |
| Nama Materi    | Text | Ya    | Nama materi pembelajaran.                  | Pengenalan HTML   |
| Mata Kuliah    | Text | Ya    | Mata kuliah dari materi tersebut.          | Pemrograman Web   |
| Deskripsi      | Text | Tidak | Penjelasan singkat mengenai materi.        | Materi dasar HTML |
| Tanggal Ditambahkan | Date | Tidak | Tanggal materi ditambahkan (createdAt). | 25-09-2026        |

## 4.2 Validation

| Field          | Aturan                                                     | Pesan Error                 |
| -------------- | ---------------------------------------------------------- | --------------------------- |
| Nama Materi    | Data harus tersedia.                                       | Nama materi tidak tersedia. |
| Mata Kuliah    | Data harus tersedia.                                       | Mata kuliah tidak tersedia. |
| Deskripsi      | Tidak wajib diisi.                                         | -                           |
| Tanggal Ditambahkan | Jika tersedia harus menggunakan format tanggal yang benar. | Format tanggal tidak valid. |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah mahasiswa memilih menu Materi Pembelajaran.

## 5.1 Jika Berhasil

**System:**

* Menampilkan daftar materi pembelajaran.
* Menampilkan nama materi.
* Menampilkan mata kuliah yang terkait.
* Menampilkan informasi tambahan jika tersedia.

**Success Message:**

> Daftar materi pembelajaran berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

Fitur ini tidak membutuhkan input dari mahasiswa untuk melihat daftar materi.

**System:**

* Menampilkan pesan apabila data materi tidak dapat dimuat.
* Mahasiswa tetap berada pada halaman Materi Pembelajaran.

**Error Message:**

> Data materi tidak dapat ditampilkan. Silakan coba lagi.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* Menampilkan kondisi kosong jika belum ada materi pembelajaran.

**Message:**

> Belum ada materi pembelajaran yang tersedia.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* Menampilkan pesan kesalahan.
* Memberikan pilihan untuk mencoba kembali.

**Message:**

> Terjadi kesalahan saat memuat materi. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

* [ ] Mahasiswa dapat mengakses menu Materi Pembelajaran setelah login.
* [ ] Sistem menampilkan daftar materi pembelajaran.
* [ ] Nama materi ditampilkan dengan jelas.
* [ ] Mata kuliah yang terkait dengan materi ditampilkan.
* [ ] Mahasiswa dapat memilih materi yang tersedia.

### Validation

* [ ] Mahasiswa yang belum login tidak dapat mengakses daftar materi.
* [ ] Materi ditampilkan sesuai dengan kurikulum program studi mahasiswa.
* [ ] Data materi yang tidak tersedia ditangani dengan jelas.

### Error Handling

* [ ] Kondisi belum ada materi memiliki tampilan yang jelas.
* [ ] Kesalahan saat memuat materi memiliki pesan yang jelas.
* [ ] Mahasiswa dapat mencoba kembali memuat daftar materi.

### UI

* [ ] Loading state tersedia.
* [ ] Empty state tersedia jika belum ada materi.
* [ ] Error state tersedia.
* [ ] Success feedback tersedia jika diperlukan.

---

# 7. Related Features

### Functional Requirement Terkait

* **FR-1** — Login
* **FR-2** — Logout
* **FR-3** — Melihat Jadwal Kuliah
* **FR-4** — Melihat Daftar Materi Pembelajaran

### Flow yang Berhubungan

```text
[FR-1 — Login]
       ↓
[Dashboard]
       ↓
[FR-4 — Melihat Daftar Materi Pembelajaran]
       ↓
[Daftar Materi]
       ↓
[FR-2 — Logout]
```

---

# 8. Status Dokumentasi

| Item           | Status      |
| -------------- | ----------- |
| Requirement    | DRAFT       |
| User Flow      | DRAFT       |
| UI             | DRAFT       |
| Validation     | DRAFT       |
| Implementation | NOT STARTED |

**Last Updated:** `2026-09-25`

**Author:** `Dhandy Amir Faisal`
