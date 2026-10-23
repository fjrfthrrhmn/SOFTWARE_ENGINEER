# Functional Requirement — FR-17

> **Status:** DRAFT  
> **Aktor:** Admin  
> **Fitur:** Menambahkan Pengguna  
> **Domain:** Pengguna  
> **Prioritas:** High  
> **Related FR:** FR-14, FR-16, FR-18, FR-19

---

# 1. Deskripsi

### Functional Requirement

**FR-17 — Admin Menambahkan Pengguna**

**Deskripsi:**

> Admin dapat menambahkan data pengguna mahasiswa atau dosen ke dalam sistem.

### Tujuan

Memungkinkan Admin mendaftarkan pengguna baru secara resmi ke dalam sistem agar pengguna tersebut dapat melakukan autentikasi login (**FR-1 — Mahasiswa Login** atau **FR-6 — Dosen Login**) dan mengakses layanan sesuai hak aksesnya.

### Contoh

> Admin menambahkan akun dosen baru dengan mengisikan Email, password awal, nama, dan NIM/Kode Dosen melalui panel pengelolaan pengguna.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin mengklik opsi "Tambah Pengguna" dari daftar data pengguna (FR-16)]
                         ↓
[System menampilkan form penambahan data pengguna]
                         ↓
[Admin menginputkan data dan kredensial pengguna baru]
                         ↓
[System memvalidasi data dan menyimpan pengguna baru]
                         ↓
[System mengarahkan kembali ke halaman daftar data pengguna (FR-16)]
```

### Detail Flow

| Step | Aktor  | Aktivitas                                                                                        | Hasil                                                                  |
| ---- | ------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| 1    | Admin  | Memilih tombol `Tambah Pengguna` dari halaman daftar data pengguna (FR-16)                       | Sistem menampilkan form penambahan akun pengguna.                      |
| 2    | Admin  | Mengisi seluruh field input (`Email`, `password`, `nama`, `NIM/Kode`, `role`, serta `angkatan` dan `program_studi` untuk Mahasiswa) | Form input terisi. |
| 3    | Admin  | Mengirimkan/menekan tombol `Simpan`                                                              | Sistem menerima data pengguna baru.                                    |
| 4    | System | Memvalidasi keunikan `Email` dan `NIM/Kode` serta format input                                   | Data dinyatakan valid dan tidak terjadi duplikasi.                     |
| 5    | System | Menyimpan data akun pengguna baru ke database dan mengarahkan kembali ke daftar pengguna (FR-16) | Akun baru terdaftar di sistem dan muncul pada daftar pengguna (FR-16). |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (FR-14).
- [ ] Admin berada pada halaman/fitur melihat daftar data pengguna (FR-16).

## 3.2 Aturan Fitur

| No. | Aturan                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------ |
| 1   | `Email` dan `NIM/Kode` harus unik dan belum pernah terdaftar sebelumnya di dalam sistem.               |
| 2   | Peran (_Role_) pengguna yang ditambahkan harus dipilih antara `Mahasiswa` atau `Dosen`.                |
| 3   | Kata sandi (_password_) akun pengguna baru wajib disimpan di dalam database dengan enkripsi yang aman. |
| 4   | Pengguna yang baru saja ditambahkan secara otomatis diberikan status akun `Aktif`.                     |

---

# 4. Fields & Validation

## 4.1 Fields

| Field           | Tipe   | Wajib | Keterangan                                          | Contoh                 |
| --------------- | ------ | ----- | --------------------------------------------------- | ---------------------- |
| `Email`         | text   | Ya    | Email unik untuk login akun pengguna baru           | `budi_santoso`         |
| `password`      | text   | Ya    | Kata sandi awal rahasia untuk akun baru             | `P@ssword123`          |
| `nama`          | text   | Ya    | Nama lengkap pengguna baru beserta gelar (jika ada) | `Budi Santoso, M.Kom.` |
| `NIM/Kode`      | text   | Ya    | NIM (Mahasiswa) atau Kode Dosen (Dosen)             | `198801012023011001`   |
| `role`          | select | Ya    | Peran akses akun (`Mahasiswa` atau `Dosen`)         | `Dosen`                |
| `angkatan`      | number | Ya*   | Tahun angkatan, wajib untuk role Mahasiswa          | `2023`                 |
| `program_studi` | select | Ya*   | Program studi mahasiswa (relasi ProgramStudi)       | `Teknik Informatika`   |

> `angkatan` dan `program_studi` hanya wajib diisi untuk role Mahasiswa.

## 4.2 Validation

| Field          | Aturan                                | Pesan Error                                                 |
| -------------- | ------------------------------------- | ----------------------------------------------------------- |
| `Email`         | Wajib diisi, minimal 3 karakter, unik | Email wajib diisi, minimal 3 karakter, dan belum digunakan. |
| `password`      | Wajib diisi, minimal 8 karakter       | Password wajib diisi dan minimal 8 karakter.                |
| `nama`          | Wajib diisi                           | Nama lengkap wajib diisi.                                   |
| `NIM/Kode`      | Wajib diisi, unik                     | NIM/Kode wajib diisi dan tidak boleh duplikat.              |
| `role`          | Wajib dipilih                         | Peran pengguna wajib dipilih.                               |
| `angkatan`      | Wajib diisi untuk Mahasiswa           | Tahun angkatan wajib diisi.                                 |
| `program_studi` | Wajib dipilih untuk Mahasiswa         | Program studi wajib dipilih.                                |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Data pengguna baru tersimpan ke dalam sistem.
- Mengarahkan Admin kembali ke daftar data pengguna (FR-16).
- Tampilkan pesan sukses penambahan data.

**Success Message:**

> Data pengguna baru berhasil ditambahkan.

---

## 5.2 Jika Input Tidak Valid

**System:**

- Menolak penyimpanan data.
- Tampilkan pesan kesalahan validasi spesifik.
- Pertahankan isi input pengguna pada form, kecuali field `password`.

**Error Message:**

> Email atau NIM/Kode yang Anda masukkan sudah terdaftar di sistem.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tidak berlaku untuk fitur ini.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Berikan opsi bagi Admin untuk mencoba menyimpan kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal menambahkan pengguna baru.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat mendaftarkan pengguna baru (Mahasiswa atau Dosen) dengan mengisi form data secara lengkap.
- [ ] Data pengguna baru yang berhasil ditambahkan dapat langsung dilihat pada fitur Melihat Daftar Data Pengguna (FR-16).
- [ ] Pengguna baru yang terdaftar dapat melakukan autentikasi/login ke dalam sistem menggunakan `Email` dan `password` yang telah didaftarkan.

### Validation

- [ ] Sistem mencegah pendaftaran akun duplikat berdasarkan `Email` atau `NIM/Kode`.
- [ ] Password pengguna baru berhasil terenkripsi di dalam database.
- [ ] Input yang tidak sesuai aturan validasi ditolak dan menampilkan pesan error yang jelas.

### Error Handling

- [ ] Kegagalan proses akibat masalah koneksi/server ditangani dengan pesan error yang ramah pengguna.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-16 — Admin Melihat Daftar Data Pengguna**
- **FR-18 — Admin Mengubah Data Pengguna**
- **FR-19 — Admin Menonaktifkan Pengguna**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-16: Admin Melihat Daftar Data Pengguna]
          │
          ▼
[FR-17: Admin Menambahkan Pengguna]
          │
          ▼
[Data Terperbarui di FR-16]
```

---

# 8. Status Dokumentasi

| Item           | Status      |
| -------------- | ----------- |
| Requirement    | DRAFT       |
| User Flow      | DRAFT       |
| Validation     | DRAFT       |
| Implementation | NOT STARTED |
