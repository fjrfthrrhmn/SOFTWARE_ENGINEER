# Functional Requirement — FR-7

> **Status:** DRAFT  
> **Aktor:** Dosen  
> **Fitur:** Logout  
> **Domain:** Authentication  
> **Prioritas:** High  
> **Related FR:** FR-6  

---

# 1. Deskripsi

### Functional Requirement

**FR-7 — Dosen Logout**

**Deskripsi:**

> Dosen dapat keluar dari sistem setelah selesai menggunakan sistem dengan memilih fitur Logout.

### Tujuan

Memungkinkan dosen mengakhiri sesi penggunaan sistem agar akun tidak tetap dalam keadaan login.

### Contoh

Setelah selesai menggunakan sistem, dosen memilih menu Logout. System mengakhiri sesi dosen dan mengarahkan kembali ke halaman Login.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Dosen sudah login ke sistem]
         ↓
[Dosen memilih menu Logout]
         ↓
[System memproses permintaan Logout]
         ↓
[System mengakhiri sesi login]
         ↓
[Dosen diarahkan ke halaman Login]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Dosen | Sudah login ke dalam sistem | Dosen dapat menggunakan sistem |
| 2 | Dosen | Memilih menu Logout | System menerima permintaan Logout |
| 3 | System | Memproses permintaan Logout | Sesi login dosen diakhiri |
| 4 | System | Mengarahkan dosen ke halaman Login | Halaman Login ditampilkan |
| 5 | Dosen | Melihat halaman Login | Dosen sudah keluar dari sistem |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Dosen sudah berhasil login ke dalam sistem melalui FR-8.
- [ ] Dosen masih memiliki sesi login yang aktif.
- [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Hanya dosen yang sudah login yang dapat melakukan Logout. |
| 2 | Logout digunakan untuk mengakhiri sesi login dosen. |
| 3 | Setelah Logout berhasil, dosen diarahkan ke halaman Login. |
| 4 | Dosen harus melakukan login kembali untuk mengakses sistem. |
| 5 | Setelah Logout, halaman sistem tidak dapat diakses menggunakan sesi sebelumnya. |

---

# 4. Fields & Validation

Fitur Logout tidak membutuhkan input data dari dosen.

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| - | - | - | Tidak ada input yang diperlukan | - |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| Sesi Login | Dosen harus memiliki sesi login yang aktif | Sesi login tidak ditemukan. |
| Status Login | Dosen harus dalam keadaan login | Anda sudah keluar dari sistem. |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah dosen melakukan action Logout.

## 5.1 Jika Berhasil

**System:**

- System menerima permintaan Logout.
- System mengakhiri sesi login dosen.
- System mengarahkan dosen ke halaman Login.

**Success Message:**

> Logout berhasil. Anda telah keluar dari sistem.

---

## 5.2 Jika Input Tidak Valid

**System:**

- Fitur Logout tidak membutuhkan input dari dosen.
- Jika sesi login tidak valid, system mengarahkan dosen ke halaman Login.

**Message:**

> Sesi login tidak valid. Silakan login kembali.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- System tidak menemukan sesi login yang aktif.
- System tetap mengarahkan dosen ke halaman Login.

**Message:**

> Sesi login tidak ditemukan. Silakan login kembali.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- System menampilkan pesan kesalahan.
- Dosen dapat mencoba melakukan Logout kembali.

**Message:**

> Terjadi kesalahan saat Logout. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila memenuhi kriteria berikut.

### Functional

- [ ] Dosen dapat memilih fitur Logout setelah login.
- [ ] System dapat memproses permintaan Logout.
- [ ] System dapat mengakhiri sesi login dosen.
- [ ] System mengarahkan dosen ke halaman Login setelah Logout berhasil.
- [ ] Dosen harus login kembali untuk mengakses sistem.

### Validation

- [ ] Logout hanya dapat dilakukan oleh dosen yang memiliki sesi login aktif.
- [ ] Sesi login yang sudah berakhir tidak dapat digunakan kembali.
- [ ] Dosen tanpa sesi login diarahkan ke halaman Login.

### Error Handling

- [ ] System menampilkan pesan ketika sesi login tidak ditemukan.
- [ ] System menampilkan pesan ketika terjadi kesalahan saat Logout.
- [ ] Dosen dapat mencoba kembali apabila terjadi kesalahan sistem.

---

# 7. Related Features

### Functional Requirement Terkait

- [FR-6] — Dosen Login

### Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
         ↓
[Dosen menggunakan sistem]
         ↓
[FR-7 — Dosen Logout]
         ↓
[Dosen kembali ke halaman Login]
```

---

# 7. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |
