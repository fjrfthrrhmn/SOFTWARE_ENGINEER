# Functional Requirement — FR-2

> **Status:** DRAFT
> **Aktor:** Mahasiswa
> **Fitur:** Logout
> **Domain:** Sistem Akademik
> **Prioritas:** High
> **Related FR:** FR-1 — Login
> **Tujuan File:** Mendokumentasikan Functional Requirement untuk fitur Logout

---

# 1. Deskripsi

### Functional Requirement

**FR-2 — Logout**

**Deskripsi:**

> Mahasiswa dapat keluar dari sistem dengan menekan tombol Logout yang tersedia pada halaman Dashboard. Mahasiswa harus login terlebih dahulu agar dapat masuk ke Dashboard dan menggunakan fitur Logout.

### Tujuan

Fitur Logout bertujuan untuk mengakhiri sesi mahasiswa setelah selesai menggunakan sistem.

### Contoh

> Mahasiswa melakukan login, kemudian sistem menampilkan Dashboard. Mahasiswa menekan tombol Logout, lalu sistem mengakhiri sesi dan mengarahkan mahasiswa ke halaman Login.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Mahasiswa membuka halaman Login]
        ↓
[Mahasiswa memasukkan data login]
        ↓
[System memvalidasi login]
        ↓
[Login berhasil]
        ↓
[System menampilkan Dashboard]
        ↓
[Mahasiswa mengklik tombol Logout]
        ↓
[System memproses Logout]
        ↓
[System mengakhiri sesi]
        ↓
[System mengarahkan ke halaman Login]
```

### Detail Flow

| Step | Aktor     | Aktivitas                               | Hasil                              |
| ---- | --------- | --------------------------------------- | ---------------------------------- |
| 1    | Mahasiswa | Membuka halaman Login.                  | Halaman Login ditampilkan.         |
| 2    | Mahasiswa | Memasukkan data login.                  | Data login dikirim ke sistem.      |
| 3    | System    | Memvalidasi data login.                 | Login berhasil jika data benar.    |
| 4    | System    | Mengarahkan mahasiswa ke Dashboard.     | Dashboard ditampilkan.             |
| 5    | Mahasiswa | Mengklik tombol Logout pada Dashboard.  | Sistem menerima permintaan logout. |
| 6    | System    | Mengakhiri sesi mahasiswa.              | Sesi mahasiswa berakhir.           |
| 7    | System    | Mengarahkan mahasiswa ke halaman Login. | Mahasiswa berhasil logout.         |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

* [x] Mahasiswa sudah login.
* [x] Mahasiswa sudah berada di halaman Dashboard.
* [x] Tombol Logout tersedia pada Dashboard.
* [x] Data tambahan tidak diperlukan.

## 3.2 Aturan Fitur

| No. | Aturan                                                                                  |
| --- | --------------------------------------------------------------------------------------- |
| 1   | Mahasiswa wajib login terlebih dahulu.                                                  |
| 2   | Setelah login berhasil, mahasiswa masuk ke halaman Dashboard.                           |
| 3   | Tombol Logout hanya dapat digunakan dari Dashboard.                                     |
| 4   | Mahasiswa harus mengklik tombol Logout untuk mengakhiri sesi.                           |
| 5   | Setelah Logout berhasil, mahasiswa diarahkan ke halaman Login.                          |
| 6   | Mahasiswa tidak dapat mengakses Dashboard setelah logout tanpa melakukan login kembali. |

---

# 4. Fields & Validation

> Fitur Logout tidak membutuhkan form atau input tambahan.

## 4.1 Fields

| Field         | Tipe   | Wajib | Keterangan                               | Contoh |
| ------------- | ------ | ----- | ---------------------------------------- | ------ |
| Status Login  | Status | Ya    | Menentukan apakah mahasiswa sudah login. | Login  |
| Tombol Logout | Button | Ya    | Digunakan untuk keluar dari sistem.      | Logout |

## 4.2 Validation

| Field         | Aturan                         | Pesan Error                    |
| ------------- | ------------------------------ | ------------------------------ |
| Status Login  | Mahasiswa harus sudah login.   | Silakan login terlebih dahulu. |
| Tombol Logout | Hanya tersedia pada Dashboard. | Akses tidak tersedia.          |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah mahasiswa melakukan action Logout.

## 5.1 Jika Berhasil

**System:**

* Mengakhiri sesi mahasiswa.
* Menghapus status login.
* Mengarahkan mahasiswa ke halaman Login.
* Menampilkan pesan berhasil logout.

**Success Message:**

> Berhasil logout. Silakan login kembali untuk mengakses sistem.

---

## 5.2 Jika Input Tidak Valid

**System:**

* Memeriksa status login mahasiswa.
* Jika mahasiswa belum login, mahasiswa tidak dapat menggunakan fitur Logout.
* Sistem mengarahkan mahasiswa ke halaman Login.

**Error Message:**

> Silakan login terlebih dahulu.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* Memeriksa sesi login mahasiswa.
* Jika sesi tidak ditemukan, sistem mengarahkan mahasiswa ke halaman Login.

**Message:**

> Sesi login tidak ditemukan. Silakan login kembali.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* Menampilkan pesan kesalahan.
* Memberikan pilihan untuk mencoba kembali.

**Message:**

> Terjadi kesalahan saat logout. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

* [ ] Mahasiswa wajib login terlebih dahulu.
* [ ] Mahasiswa berhasil masuk ke Dashboard setelah login.
* [ ] Tombol Logout tersedia pada Dashboard.
* [ ] Mahasiswa dapat mengklik tombol Logout.
* [ ] Sistem mengakhiri sesi mahasiswa.
* [ ] Sistem mengarahkan mahasiswa ke halaman Login setelah logout.

### Validation

* [ ] Mahasiswa yang belum login tidak dapat menggunakan fitur Logout.
* [ ] Mahasiswa harus berada di Dashboard untuk melakukan Logout.
* [ ] Sesi yang sudah berakhir ditangani dengan benar.

### Error Handling

* [ ] Kesalahan saat logout menampilkan pesan yang jelas.
* [ ] Mahasiswa dapat mencoba kembali jika terjadi kesalahan.
* [ ] Mahasiswa diarahkan ke Login jika sesi tidak ditemukan.

### UI

* [ ] Loading state tersedia jika diperlukan.
* [ ] Empty state tersedia jika diperlukan.
* [ ] Error state tersedia.
* [ ] Success feedback tersedia.

---

# 7. Related Features

### Functional Requirement Terkait

* **FR-1** — Login
* **FR-2** — Logout

### Flow yang Berhubungan

```text
[FR-1 — Login]
       ↓
[Dashboard]
       ↓
[FR-2 — Logout]
       ↓
[Halaman Login]
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
