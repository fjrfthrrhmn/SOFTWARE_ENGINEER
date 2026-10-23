# Functional Requirement — FR-6

> **Status:** DRAFT  
> **Aktor:** Dosen  
> **Fitur:** Login  
> **Domain:** Authentication  
> **Prioritas:** High  
> **Related FR:** -  

---

# 1. Deskripsi

### Functional Requirement

**FR-6 — Dosen Login**

**Deskripsi:**

> Dosen dapat masuk ke dalam sistem menggunakan akun yang telah terdaftar dengan memasukkan informasi login yang sesuai.

### Tujuan

Memungkinkan dosen mengakses sistem sesuai dengan akun dan hak akses yang dimiliki.

### Contoh

Dosen memasukkan email dan password pada halaman login. Jika data benar, sistem mengizinkan dosen masuk ke dalam sistem.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Dosen membuka halaman Login]
         ↓
[Dosen memasukkan email dan password]
         ↓
[Dosen menekan tombol Login]
         ↓
[System memeriksa data login]
         ↓
[Data valid?]
      ↙     ↘
    [Ya]   [Tidak]
      ↓       ↓
[Masuk ke  [Menampilkan
 sistem]    pesan error]
```

### Detail Flow

| Step | Aktor  | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Dosen | Membuka halaman Login | Halaman Login ditampilkan |
| 2 | Dosen | Memasukkan email | Email diterima oleh system |
| 3 | Dosen | Memasukkan password | Password diterima oleh system |
| 4 | Dosen | Menekan tombol Login | System memproses data login |
| 5 | System | Memeriksa email dan password | System menentukan valid atau tidak |
| 6 | System | Memverifikasi akun dosen | Akun berhasil diverifikasi |
| 7 | System | Mengarahkan dosen ke halaman utama | Dosen berhasil masuk ke sistem |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Dosen sudah memiliki akun yang terdaftar.
- [ ] Dosen memiliki email dan password.
- [ ] Sistem dapat diakses.
- [ ] Data akun dosen tersedia dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Hanya akun dosen yang terdaftar yang dapat digunakan untuk login. |
| 2 | Email dan password harus sesuai dengan data akun dosen. |
| 3 | Dosen harus mengisi email dan password sebelum melakukan login. |
| 4 | Jika data login benar, dosen dapat masuk ke dalam sistem. |
| 5 | Jika data login salah, dosen tidak dapat masuk ke dalam sistem. |
| 6 | Setelah berhasil login, dosen mendapatkan akses sesuai dengan hak aksesnya. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| Email | Text | Ya | Email akun dosen (Pengguna.email) | `budi.santoso@univ.ac.id` |
| Password | Password | Ya | Password akun dosen | `********` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| Email | Tidak boleh kosong | Email wajib diisi. |
| Password | Tidak boleh kosong | Password wajib diisi. |
| Email & Password | Harus sesuai dengan akun yang terdaftar | Email atau password salah. |
| Akun | Akun harus terdaftar dan dapat digunakan | Akun tidak dapat digunakan untuk login. |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah dosen melakukan action login.

## 5.1 Jika Berhasil

**System:**

- System menerima data login.
- System memverifikasi akun dosen.
- System mengizinkan dosen masuk ke dalam sistem.
- System mengarahkan dosen ke halaman utama.

**Success Message:**

> Login berhasil. Selamat datang.

---

## 5.2 Jika Input Tidak Valid

**System:**

- System menolak proses login.
- System menampilkan informasi mengenai data yang belum sesuai.
- Dosen dapat memperbaiki data login dan mencoba kembali.

**Error Message:**

> Email atau password salah.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- System tidak menemukan akun yang sesuai.
- System tidak mengizinkan dosen masuk ke dalam sistem.

**Message:**

> Akun tidak ditemukan. Silakan periksa kembali email dan password.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- System menampilkan pesan kesalahan.
- Dosen dapat mencoba melakukan login kembali.

**Message:**

> Terjadi kesalahan pada sistem. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila memenuhi kriteria berikut.

### Functional

- [ ] Dosen dapat memasukkan email.
- [ ] Dosen dapat memasukkan password.
- [ ] Dosen dapat melakukan proses login.
- [ ] System dapat memeriksa data login.
- [ ] Dosen dapat masuk ke sistem jika data login benar.
- [ ] Dosen tidak dapat masuk jika data login salah.

### Validation

- [ ] Email wajib diisi.
- [ ] Password wajib diisi.
- [ ] Email dan password harus sesuai dengan akun yang terdaftar.
- [ ] Akun yang tidak ditemukan tidak dapat melakukan login.

### Error Handling

- [ ] System menampilkan pesan ketika email kosong.
- [ ] System menampilkan pesan ketika password kosong.
- [ ] System menampilkan pesan ketika email atau password salah.
- [ ] System menampilkan pesan ketika terjadi kesalahan sistem.

---

# 7. Related Features

### Functional Requirement Terkait

Tidak ada, karena FR-8 merupakan fitur Login untuk Dosen.

### Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
         ↓
[Dosen berhasil masuk ke sistem]
         ↓
[FR berikutnya dapat digunakan]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |
