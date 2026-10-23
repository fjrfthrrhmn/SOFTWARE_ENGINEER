# Functional Requirement — FR-01

> **Status:** DRAFT
> **Aktor:** Mahasiswa
> **Fitur:** Login
> **Domain:** Pengguna
> **Prioritas:** High
> **Related FR:** FR-1 - Login

# 1. Deskripsi

### Functional Requirement

**FR-01 — Login Mahasiswa**

**Deskripsi:**

> Mahasiswa dapat masuk ke dalam sistem menggunakan **NIM sebagai Email** dan **password** yang telah terdaftar pada sistem.

### Tujuan

Fitur ini digunakan untuk melakukan autentikasi mahasiswa agar dapat mengakses sistem sesuai dengan hak aksesnya.

### Contoh

> Mahasiswa memasukkan NIM dan password pada halaman login. Sistem memeriksa kesesuaian data tersebut dengan akun mahasiswa yang terdaftar. Apabila sesuai, mahasiswa diarahkan ke halaman utama/dashboard.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Mahasiswa membuka halaman login]
        ↓
[System menampilkan form login]
        ↓
[Mahasiswa memasukkan NIM]
        ↓
[Mahasiswa memasukkan Password]
        ↓
[Mahasiswa menekan tombol "Login"]
        ↓
[System memeriksa NIM dan Password]
        ↓
[Data sesuai dengan akun mahasiswa]
        ↓
[System mengizinkan login]
        ↓
[Mahasiswa diarahkan ke halaman utama/dashboard]
```

### Detail Flow

| Step | Aktor     | Aktivitas                                 | Hasil                                      |
| ---- | --------- | ----------------------------------------- | ------------------------------------------ |
| 1    | Mahasiswa | Membuka halaman login                     | Halaman login ditampilkan                  |
| 2    | System    | Menampilkan field NIM dan Password        | Form login tersedia                        |
| 3    | Mahasiswa | Mengisi NIM                               | NIM mahasiswa terisi                       |
| 4    | Mahasiswa | Mengisi Password                          | Password mahasiswa terisi                  |
| 5    | Mahasiswa | Menekan tombol **Login**                  | Data dikirim untuk diperiksa               |
| 6    | System    | Memeriksa kesesuaian NIM dan Password     | Data dinyatakan valid atau ditolak         |
| 7    | System    | Memproses autentikasi mahasiswa           | Status login ditentukan                    |
| 8    | System    | Mengarahkan mahasiswa jika login berhasil | Mahasiswa masuk ke halaman utama/dashboard |

---

# 3. Kondisi dan Aturan

| No. | Aturan                                                                  |
| --- | ----------------------------------------------------------------------- |
| 1   | Mahasiswa hanya dapat login menggunakan akun yang telah terdaftar.      |
| 2   | NIM digunakan sebagai **Email**.                                     |
| 3   | Password digunakan sebagai **password** akun mahasiswa.                 |
| 4   | NIM wajib diisi.                                                        |
| 5   | Password wajib diisi.                                                   |
| 6   | NIM dan Password harus sesuai dengan data mahasiswa yang terdaftar.     |
| 7   | Apabila data tidak sesuai, mahasiswa tidak dapat masuk ke sistem.       |
| 8   | Apabila login berhasil, mahasiswa diarahkan ke halaman utama/dashboard. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field      | Tipe     | Wajib | Keterangan                                            | Contoh     |
| ---------- | -------- | ----- | ----------------------------------------------------- | ---------- |
| `NIM`      | text     | Ya    | Nomor Induk Mahasiswa yang digunakan sebagai Email | `23123456` |
| `Password` | password | Ya    | Kata sandi akun mahasiswa                             | `********` |

## 4.2 Validation

| Field          | Aturan                             | Pesan Error                       |
| -------------- | ---------------------------------- | --------------------------------- |
| NIM            | Wajib diisi                        | `NIM wajib diisi.`                |
| Password       | Wajib diisi                        | `Password wajib diisi.`           |
| NIM            | Harus terdaftar dalam sistem       | `NIM mahasiswa tidak ditemukan.`  |
| Password       | Harus sesuai dengan akun mahasiswa | `Password yang dimasukkan salah.` |
| NIM + Password | Harus cocok dengan akun mahasiswa  | `NIM atau password salah.`        |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

* Data NIM dan Password berhasil diverifikasi.
* Sistem mengizinkan mahasiswa masuk.
* Sistem mengarahkan mahasiswa ke halaman utama/dashboard.
* Data mahasiswa ditampilkan sesuai akun yang digunakan.

**Success Message:**

> **Login berhasil. Selamat datang di sistem.**

---

## 5.2 Jika Input Tidak Valid

**System:**

* Sistem menampilkan pesan error.
* Field yang belum diisi ditandai.
* Mahasiswa tetap berada pada halaman login.
* Input yang sudah benar tetap dipertahankan apabila memungkinkan.

**Error Message:**

> **NIM dan password wajib diisi.**

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

* Sistem tidak mengizinkan mahasiswa masuk.
* Sistem tetap menampilkan halaman login.
* Sistem memberikan informasi bahwa akun mahasiswa tidak ditemukan.

**Message:**

> **Data mahasiswa tidak ditemukan. Silakan periksa kembali NIM Anda.**

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

* Sistem menampilkan pesan kesalahan yang mudah dipahami.
* Mahasiswa tetap berada pada halaman login.
* Sistem menyediakan tombol untuk mencoba kembali.

**Message:**

> **Terjadi kesalahan pada sistem. Silakan coba lagi.**

---

### Action User

| Action                             | Keterangan                                                       |
| ---------------------------------- | ---------------------------------------------------------------- |
| **Masukkan NIM**                   | Mengisi NIM mahasiswa sebagai Email                           |
| **Masukkan Password**              | Mengisi password akun mahasiswa                                  |
| **Login**                          | Mengirim NIM dan password untuk proses autentikasi               |
| **Tampilkan/Sembunyikan Password** | Mengubah tampilan password agar dapat dilihat atau disembunyikan |

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

*  Mahasiswa dapat mengakses halaman login.
*  Mahasiswa dapat memasukkan NIM.
*  Mahasiswa dapat memasukkan password.
*  Mahasiswa dapat menekan tombol **Login**.
*  Sistem dapat memeriksa kesesuaian NIM dan password.
*  Mahasiswa dapat masuk apabila NIM dan password sesuai.
*  Mahasiswa tidak dapat masuk apabila NIM atau password salah.

### Validation

*  NIM tidak boleh kosong.
*  Password tidak boleh kosong.
*  NIM yang tidak terdaftar ditolak.
*  Password yang tidak sesuai ditolak.
*  Pesan error ditampilkan dengan jelas.

### Error Handling

*  Kesalahan input memiliki pesan yang jelas.
*  Data mahasiswa yang tidak ditemukan memiliki pesan yang jelas.
*  Kesalahan sistem memiliki pesan yang jelas.
*  Mahasiswa dapat mencoba login kembali.

---

# 7. Related Features

### Functional Requirement Terkait

* [FR-02] — Logout Mahasiswa
* [FR-03] — Dashboard Mahasiswa

### Flow yang Berhubungan

```text
[FR-01 — Login Mahasiswa]
        ↓
[FR-03 — Dashboard Mahasiswa]
        ↓
[FR-XX — Fitur Mahasiswa]
        ↓
[FR-02 — Logout Mahasiswa]
```

---

# 8. Status Dokumentasi

| Item           | Status      |
| -------------- | ----------- |
| Requirement    | DRAFT       |
| User Flow      | DRAFT       |
| Validation     | DRAFT       |
| Implementation | NOT STARTED |

**Last Updated:** `2026-09-25`

**Author:** `Dhandy Amir Faisal`
