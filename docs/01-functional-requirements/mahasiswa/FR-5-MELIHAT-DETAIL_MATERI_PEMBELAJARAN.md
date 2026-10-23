# Functional Requirement — FR-5

> **Status:** DRAFT
> **Aktor:** Mahasiswa
> **Fitur:** Melihat Detail Materi Pembelajaran
> **Domain:** Materi
> **Prioritas:** High
> **Related FR:** FR-1 — Login, FR-2 — Logout, FR-3 — Melihat Jadwal Kuliah, FR-4 — Daftar Materi Pembelajaran, FR-5 — Detail Materi Pembelajaran
> **Tujuan File:** Mendokumentasikan Functional Requirement untuk fitur Melihat Detail Materi Pembelajaran
> **OUTPUT:** `docs/functional-requirements/materi/FR-5_DETAIL_MATERI_PEMBELAJARAN.md`

---

# 1. Deskripsi

### Functional Requirement

**FR-5 — Melihat Detail Materi Pembelajaran**

**Deskripsi:**

> Mahasiswa dapat melihat detail materi pembelajaran pada mata kuliah di kurikulum program studi mahasiswa setelah login dan masuk ke halaman Dashboard.

### Tujuan

Fitur ini bertujuan agar mahasiswa dapat melihat informasi dan isi detail materi pembelajaran yang tersedia pada mata kuliah di kurikulum program studi mahasiswa.

### Contoh

> Mahasiswa login ke sistem, masuk ke Dashboard, memilih menu Materi Pembelajaran, kemudian memilih salah satu materi untuk melihat detail materi tersebut.

---

# 2. User Flow

## 2.1 Alur Utama

Tuliskan alur dari awal sampai selesai.

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
[System menampilkan daftar materi]
        ↓
[Mahasiswa memilih materi]
        ↓
[System menampilkan detail materi]
```

### Detail Flow

| Step | Aktor     | Aktivitas                                                | Hasil                                  |
| ---- | --------- | -------------------------------------------------------- | -------------------------------------- |
| 1    | Mahasiswa | Melakukan login ke sistem.                               | Sistem memvalidasi akun mahasiswa.     |
| 2    | System    | Menampilkan Dashboard setelah login berhasil.            | Dashboard ditampilkan.                 |
| 3    | Mahasiswa | Memilih menu Materi Pembelajaran.                        | Daftar materi ditampilkan.             |
| 4    | Mahasiswa | Memilih salah satu materi pada mata kuliah di kurikulum program studi. | Sistem menerima pilihan materi. |
| 5    | System    | Mengambil detail materi yang dipilih.                    | Detail materi diproses.                |
| 6    | System    | Menampilkan detail materi pembelajaran.                  | Mahasiswa dapat membaca detail materi. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [ ] Mahasiswa sudah login.
* [ ] Mahasiswa sudah berada di Dashboard.
* [ ] Mahasiswa memiliki akses ke menu Materi Pembelajaran.
* [ ] Materi tersedia pada mata kuliah di kurikulum program studi.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                 |
| --- | -------------------------------------------------------------------------------------- |
| 1   | Mahasiswa harus login terlebih dahulu untuk melihat detail materi.                     |
| 2   | Mahasiswa hanya dapat melihat detail materi dari mata kuliah di kurikulum program studinya. |
| 3   | Mahasiswa harus memilih materi yang tersedia untuk melihat detailnya.                  |
| 4   | Sistem menampilkan detail sesuai dengan materi yang dipilih.                           |
| 5   | Jika materi tidak tersedia, sistem menampilkan informasi bahwa materi tidak ditemukan. |

---

# 4. Fields & Validation

> Gunakan bagian ini jika fitur memiliki form atau membutuhkan input dari user.

## 4.1 Fields

| Field              | Tipe      | Wajib | Keterangan                              | Contoh              |
| ------------------ | --------- | ----- | --------------------------------------- | ------------------- |
| `Nama Materi`      | Text      | Ya    | Nama materi yang dipilih.               | `Pengenalan HTML`   |
| `Mata Kuliah`      | Text      | Ya    | Mata kuliah yang terkait dengan materi. | `Pemrograman Web`   |
| `Deskripsi Materi` | Text      | Tidak | Penjelasan mengenai materi.             | `Materi dasar HTML` |
| `File/URL Materi`  | text      | Ya    | URL file materi pembelajaran (fileUrl). | `https://univ.ac.id/materi/modul-html.pdf` |
| `Dosen`            | Text      | Tidak | Nama dosen pengampu.                    | `Budi Santoso`      |

## 4.2 Validation

| Field         | Aturan                                     | Pesan Error                   |
| ------------- | ------------------------------------------ | ----------------------------- |
| `Nama Materi` | Materi harus tersedia.                     | `Materi tidak ditemukan.`     |
| `Mata Kuliah` | Harus sesuai dengan mata kuliah mahasiswa. | `Materi tidak dapat diakses.` |
| `File/URL Materi` | Materi harus tersedia.                 | `File materi belum tersedia.` |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah user melakukan action.

## 5.1 Jika Berhasil

**System:**

* Menampilkan nama materi.
* Menampilkan mata kuliah yang terkait.
* Menampilkan deskripsi materi jika tersedia.
* Menampilkan file/URL materi pembelajaran.
* Mahasiswa dapat membaca detail materi.

**Success Message:**

> Detail materi berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

Fitur ini tidak membutuhkan input berupa form dari mahasiswa.

**System:**

* Memeriksa materi yang dipilih.
* Jika materi tidak sesuai dengan mata kuliah pada kurikulum program studi mahasiswa, sistem menolak akses.

**Error Message:**

> Materi tidak dapat diakses.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* Menampilkan informasi bahwa materi yang dipilih tidak tersedia.

**Message:**

> Materi pembelajaran tidak ditemukan.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* Menampilkan pesan kesalahan.
* Memberikan pilihan untuk mencoba kembali.

**Message:**

> Terjadi kesalahan saat memuat detail materi. Silakan coba lagi.

---

# 7. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

* [ ] Mahasiswa harus login terlebih dahulu.
* [ ] Mahasiswa dapat membuka menu Materi Pembelajaran.
* [ ] Mahasiswa dapat memilih materi yang tersedia.
* [ ] Sistem menampilkan detail materi yang dipilih.
* [ ] Detail materi sesuai dengan mata kuliah pada kurikulum program studi mahasiswa.

### Validation

* [ ] Mahasiswa yang belum login tidak dapat melihat detail materi.
* [ ] Mahasiswa tidak dapat mengakses materi dari mata kuliah di luar kurikulum program studinya.
* [ ] Materi yang tidak tersedia ditangani dengan jelas.

### Error Handling

* [ ] Materi yang tidak ditemukan memiliki pesan yang jelas.
* [ ] Kesalahan saat memuat detail materi memiliki pesan yang jelas.
* [ ] Mahasiswa dapat mencoba kembali memuat materi.

### UI

* [ ] Halaman Detail Materi tersedia.
* [ ] Informasi materi ditampilkan dengan jelas.
* [ ] Loading state tersedia.
* [ ] Empty state tersedia jika diperlukan.
* [ ] Error state tersedia.

---

# 8. Related Features

### Functional Requirement Terkait

* FR-1 — Login
* FR-2 — Logout
* FR-3 — Melihat Jadwal Kuliah
* FR-4 — Melihat Detail Materi Pembelajaran

### Flow yang Berhubungan

```text
[FR-1 — Login]
       ↓
[Dashboard]
       ↓
[Daftar Materi Pembelajaran]
       ↓
[FR-5 — Melihat Detail Materi Pembelajaran]
       ↓
[Detail Materi]
       ↓
[FR-2 — Logout]
```

---

# 9. Status Dokumentasi

| Item           | Status      |
| -------------- | ----------- |
| Requirement    | DRAFT       |
| User Flow      | DRAFT       |
| UI             | DRAFT       |
| Validation     | DRAFT       |
| Implementation | NOT STARTED |

**Last Updated:** `2026-09-25`

**Author:** `Dhandy Amir Faisal`
