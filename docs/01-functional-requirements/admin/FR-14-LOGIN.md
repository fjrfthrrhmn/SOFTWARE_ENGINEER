# Functional Requirement — FR-14

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Login  
**Domain:** Pengguna  
**Prioritas:** High  
**Related FR:** FR-15, FR-16

---

# 1. Deskripsi

## 1.1 Functional Requirement

**FR-14 — Admin Login**

**Deskripsi:**

Admin dapat melakukan login ke dalam sistem menggunakan akun yang terdaftar dengan menginputkan Email dan password untuk mendapatkan hak akses pengelolaan sistem.

## 1.2 Tujuan

Memastikan hanya pengguna dengan peran Admin yang terautentikasi yang dapat mengakses fungsi dan halaman administrasi sistem secara aman.

## 1.3 Contoh

Admin memasukkan Email `admin_utama` dan password terdaftar untuk masuk ke panel administrasi sistem.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin membuka fitur login]
          ↓
[System menampilkan form login]
          ↓
[Admin menginputkan Email dan password]
          ↓
[System memverifikasi dan memproses kredensial]
          ↓
[System memberikan akses dan mengarahkan ke halaman Admin]
```

## 2.2 Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Membuka form/fitur login Admin | Sistem menampilkan form autentikasi. |
| 2 | Admin | Memasukkan `Email` dan `password` | Field input terisi. |
| 3 | Admin | Mengirimkan/menekan tombol submit login | Sistem menerima data kredensial. |
| 4 | System | Memvalidasi format input dan mencocokkan kredensial dengan database | Kredensial terverifikasi valid. |
| 5 | System | Membuat sesi login dan mengarahkan Admin ke sistem | Admin berhasil terautentikasi. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Sistem dalam kondisi berjalan (online).
- [ ] Admin memiliki akun terdaftar yang aktif di dalam sistem.
- [ ] Admin belum dalam status login (terautentikasi).

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Login hanya berhasil jika kombinasi `Email` dan `password` cocok serta status akun Admin aktif. |
| 2 | Sistem harus membatasi percobaan login gagal maksimal 5 kali berturut-turut untuk mencegah akses tidak sah. |
| 3 | Sesi autentikasi Admin memiliki batas waktu (*session timeout*) apabila tidak ada aktivitas dalam jangka waktu tertentu. |
| 4 | Kata sandi (*password*) yang disimpan di dalam sistem wajib terenkripsi secara aman. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `Email` | text | Ya | Email akun Admin yang terdaftar di sistem | `admin_utama` |
| `password` | text | Ya | Kata sandi rahasia akun Admin | `P@ssword123` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `Email` | Wajib diisi | Email wajib diisi. |
| `Email` | Minimal 3 karakter | Email minimal terdiri dari 3 karakter. |
| `password` | Wajib diisi | Password wajib diisi. |
| Kredensial | Harus cocok dengan data terdaftar | Email atau password yang Anda masukkan salah. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**
- Sesi login Admin berhasil dibuat.
- Token/sesi autentikasi disimpan.
- Admin diarahkan ke halaman utama/dashboard administrasi.
- Tampilkan pesan berhasil login.

**Success Message:**

> Login berhasil. Selamat datang, Admin!

## 5.2 Jika Input Tidak Valid

**System:**
- Tampilkan pesan error validasi.
- Tunjukkan field yang belum memenuhi aturan.
- Pertahankan isi input `Email` dan kosongkan field `password`.

**Error Message:**

> Email dan password wajib diisi.

## 5.3 Jika Data Tidak Ditemukan / Kredensial Salah

**System:**
- Menolak proses autentikasi.
- Tampilkan pesan kesalahan kredensial.
- Mengosongkan field `password`.

**Message:**

> Email atau password yang Anda masukkan salah.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**
- Tampilkan pesan kesalahan yang mudah dipahami.
- Berikan kesempatan Admin untuk mencoba kembali.

**Message:**

> Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

## 6.1 Functional

- [ ] Admin dapat melakukan login menggunakan Email dan password yang benar.
- [ ] System berhasil memproses autentikasi dan memberikan akses khusus Admin.
- [ ] System menghasilkan sesi login yang valid.

## 6.2 Validation

- [ ] Field `Email` dan `password` wajib diisi dan tidak boleh kosong.
- [ ] Input yang tidak sesuai aturan ditolak oleh sistem.
- [ ] Pesan error ditampilkan secara jelas saat ada kesalahan input.

## 6.3 Error Handling

- [ ] Percobaan login dengan akun tidak aktif atau kredensial salah berhasil ditolak.
- [ ] Kesalahan sistem ditangani dengan pesan yang jelas.
- [ ] Admin dapat mencoba melakukan submit ulang jika terjadi kegagalan.

---

# 7. Related Features

## 7.1 Functional Requirement Terkait

- **FR-15 — Admin Logout**
- **FR-16 — Admin Melihat Daftar Data Pengguna**

## 7.2 Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[Akses Fitur Admin]
          ↓
[FR-15: Admin Logout]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |
