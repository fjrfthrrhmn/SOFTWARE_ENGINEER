# Functional Requirement — FR-3

> **Status:** DRAFT
> **Aktor:** Mahasiswa
> **Fitur:** Melihat Jadwal Kuliah
> **Domain:** Jadwal
> **Prioritas:** High
> **Related FR:** FR-1 — Login, FR-2 — Logout
> **Tujuan File:** Mendokumentasikan Functional Requirement untuk fitur Melihat Jadwal Kuliah

---

# 1. Deskripsi

### Functional Requirement

**FR-3 — Melihat Jadwal Kuliah**

**Deskripsi:**

> Mahasiswa dapat melihat jadwal perkuliahan pada kurikulum program studi mahasiswa melalui sistem setelah berhasil login dan masuk ke halaman Dashboard.

### Tujuan

Fitur ini bertujuan agar mahasiswa dapat mengetahui jadwal perkuliahan pada kurikulum program studinya, seperti mata kuliah, hari, waktu, dan informasi ruang perkuliahan.

### Contoh

> Mahasiswa login ke sistem, masuk ke Dashboard, kemudian memilih menu Jadwal Kuliah untuk melihat daftar jadwal perkuliahan pada kurikulum program studinya.

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
[Mahasiswa memilih menu Jadwal Kuliah]
        ↓
[System mengambil jadwal mahasiswa]
        ↓
[System menampilkan Jadwal Kuliah]
```

### Detail Flow

| Step | Aktor     | Aktivitas                                     | Hasil                                            |
| ---- | --------- | --------------------------------------------- | ------------------------------------------------ |
| 1    | Mahasiswa | Login ke dalam sistem.                        | Sistem memvalidasi akun mahasiswa.               |
| 2    | System    | Menampilkan Dashboard setelah login berhasil. | Dashboard ditampilkan.                           |
| 3    | Mahasiswa | Memilih menu Jadwal Kuliah.                   | Sistem membuka halaman jadwal.                   |
| 4    | System    | Menampilkan jadwal perkuliahan mahasiswa.     | Daftar jadwal ditampilkan.                       |
| 5    | Mahasiswa | Melihat jadwal perkuliahan.                   | Mahasiswa mengetahui jadwal kuliah pada kurikulum program studinya. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [x] Mahasiswa sudah login.
* [x] Mahasiswa sudah berada di Dashboard.
* [x] Data jadwal perkuliahan tersedia.
* [x] Mahasiswa memiliki akses ke menu Jadwal Kuliah.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                |
| --- | ------------------------------------------------------------------------------------- |
| 1   | Mahasiswa harus login terlebih dahulu untuk melihat jadwal.                           |
| 2   | Mahasiswa hanya dapat melihat jadwal perkuliahan pada kurikulum program studinya.      |
| 3   | Jadwal ditampilkan berdasarkan data kurikulum program studi mahasiswa.                 |
| 4   | Informasi jadwal harus dapat dibaca dengan jelas.                                     |
| 5   | Jika tidak terdapat jadwal, sistem menampilkan informasi bahwa jadwal belum tersedia. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field       | Tipe | Wajib | Keterangan                       | Contoh          |
| ----------- | ---- | ----- | -------------------------------- | --------------- |
| Mata Kuliah | Text | Ya    | Nama mata kuliah pada kurikulum. | Pemrograman Web |
| Hari        | Text | Ya    | Hari pelaksanaan kuliah.         | Senin           |
| Waktu       | Time | Ya    | Waktu mulai dan selesai kuliah.  | 08:00 - 10:00   |
| Ruang       | Text | Ya    | Ruang tempat perkuliahan.        | Lab Komputer 1  |
| Dosen       | Text | Ya    | Nama dosen pengampu mata kuliah. | Budi Santoso    |

## 4.2 Validation

| Field       | Aturan                                     | Pesan Error                      |
| ----------- | ------------------------------------------ | -------------------------------- |
| Mata Kuliah | Data harus tersedia.                       | Data mata kuliah tidak tersedia. |
| Hari        | Data harus tersedia.                       | Jadwal hari tidak tersedia.      |
| Waktu       | Data harus tersedia.                       | Waktu kuliah tidak tersedia.     |
| Ruang       | Data harus tersedia jika ruang ditentukan. | Informasi ruang tidak tersedia.  |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah mahasiswa memilih menu Jadwal Kuliah.

## 5.1 Jika Berhasil

**System:**

* Menampilkan daftar jadwal kuliah mahasiswa.
* Menampilkan informasi mata kuliah, hari, waktu, ruang, dan dosen.
* Mahasiswa dapat melihat jadwal perkuliahan pada kurikulum program studinya.

**Success Message:**

> Jadwal kuliah berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

Fitur ini tidak membutuhkan input dari mahasiswa.

**System:**

* Menampilkan pesan jika data jadwal tidak dapat ditampilkan.
* Mahasiswa tetap berada pada halaman Jadwal Kuliah.

**Error Message:**

> Data jadwal tidak dapat ditampilkan. Silakan coba lagi.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* Menampilkan halaman kosong atau informasi bahwa jadwal belum tersedia.

**Message:**

> Belum ada jadwal kuliah yang tersedia.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* Menampilkan pesan kesalahan.
* Memberikan pilihan untuk mencoba kembali.

**Message:**

> Terjadi kesalahan saat memuat jadwal. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

* [ ] Mahasiswa dapat mengakses menu Jadwal Kuliah setelah login.
* [ ] Sistem menampilkan jadwal perkuliahan mahasiswa.
* [ ] Informasi mata kuliah ditampilkan.
* [ ] Hari dan waktu perkuliahan ditampilkan.
* [ ] Informasi ruang dan dosen ditampilkan jika tersedia.

### Validation

* [ ] Mahasiswa yang belum login tidak dapat mengakses jadwal.
* [ ] Data jadwal ditampilkan sesuai dengan kurikulum program studi mahasiswa.
* [ ] Data jadwal yang tidak tersedia ditangani dengan jelas.

### Error Handling

* [ ] Kondisi jadwal kosong memiliki tampilan yang jelas.
* [ ] Kesalahan saat memuat jadwal memiliki pesan yang jelas.
* [ ] Mahasiswa dapat mencoba kembali memuat jadwal.

### UI

* [ ] Loading state tersedia.
* [ ] Empty state tersedia jika jadwal tidak ditemukan.
* [ ] Error state tersedia.
* [ ] Success feedback tersedia jika diperlukan.

---

# 7. Related Features

### Functional Requirement Terkait

* **FR-1** — Login
* **FR-2** — Logout
* **FR-3** — Melihat Jadwal Kuliah

### Flow yang Berhubungan

```text
[FR-1 — Login]
       ↓
[Dashboard]
       ↓
[FR-3 — Melihat Jadwal Kuliah]
       ↓
[Menampilkan Jadwal Kuliah]
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
