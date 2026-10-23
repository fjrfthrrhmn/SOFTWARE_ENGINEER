# Functional Requirement — FR-15

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Logout  
**Domain:** Pengguna  
**Prioritas:** High  
**Related FR:** FR-14

---

# 1. Deskripsi

## 1.1 Functional Requirement

**FR-15 — Admin Logout**

**Deskripsi:**

Admin dapat keluar dari sistem untuk mengakhiri sesi autentikasi aktif secara aman.

## 1.2 Tujuan

Mencegah akses yang tidak sah ke dalam fungsi dan data administrasi sistem oleh pihak lain melalui sesi Admin yang ditinggalkan atau masih aktif.

## 1.3 Contoh

Admin menekan tombol logout setelah selesai mengelola data pengguna, sehingga sesi aktif dihentikan dan sistem mengarahkan Admin kembali ke halaman login.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin memilih opsi Logout]
          ↓
[System meminta konfirmasi logout (opsional)]
          ↓
[Admin mengonfirmasi logout]
          ↓
[System menghapus/mengakhiri sesi & token Admin]
          ↓
[System mengarahkan Admin ke halaman Login]
```

## 2.2 Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Menekan tombol/opsi `Logout` | Sistem menampilkan dialog konfirmasi atau langsung memproses pengakhiran sesi. |
| 2 | Admin | Mengonfirmasi tindakan logout | Sistem menerima perintah untuk mengakhiri sesi. |
| 3 | System | Menghapus token autentikasi dan membatalkan sesi Admin | Sesi akun Admin dihentikan secara permanen di server dan client. |
| 4 | System | Mengarahkan Admin kembali ke halaman login | Admin berhasil keluar dan halaman login ditampilkan. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin sedang dalam status login (sesi aktif).
- [ ] Admin memiliki akses ke tombol/opsi Logout pada navigasi sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Sesi autentikasi dan token akses Admin harus dihapus/dibatalkan (*invalidated*) baik di sisi *client* (storage/cookie) maupun di sisi *server*. |
| 2 | Setelah logout berhasil, Admin tidak boleh dapat kembali ke halaman internal/dashboard Admin menggunakan tombol *Back* pada browser tanpa melakukan login ulang. |
| 3 | Seluruh data sementara (*temporary data*) atau *cache* yang berkaitan dengan sesi Admin wajib dibersihkan. |

---

# 4. Fields & Validation

## 4.1 Fields

Fitur ini tidak memerlukan form input dari Admin.

## 4.2 Validation

Fitur ini tidak membutuhkan input validation.

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**
- Sesi autentikasi Admin berhasil dihapus.
- Token disimpan/di-blacklist atau dihapus dari penyimpanan lokal.
- Admin diarahkan kembali ke halaman login.
- Tampilkan pesan berhasil logout.

**Success Message:**

> Anda telah berhasil keluar dari sistem.

## 5.2 Jika Input Tidak Valid

**System:**

- Tidak berlaku untuk fitur ini.

## 5.3 Jika Data Tidak Ditemukan

**System:**
- Sesi tidak ditemukan atau sudah kadaluarsa.
- Langsung arahkan Admin kembali ke halaman login.

**Message:**

> Sesi Anda telah berakhir. Silakan login kembali.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**
- Tampilkan pesan kesalahan yang mudah dipahami.
- Lakukan pembersihan sesi di sisi *client* secara lokal untuk memastikan keamanan.

**Message:**

> Terjadi kesalahan saat memproses logout. Sesi lokal Anda telah diakhiri.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

## 6.1 Functional

- [ ] Admin dapat keluar dari sistem dengan menekan opsi/tombol Logout.
- [ ] System berhasil menghapus sesi login dan token autentikasi Admin.
- [ ] System mengarahkan Admin kembali ke halaman login setelah logout.

## 6.2 Validation

- [ ] Admin tidak dapat mengakses halaman internal Admin kembali via tombol *Back* pada browser setelah mengakhiri sesi.
- [ ] Sesi/token yang telah di-logout tidak dapat digunakan kembali untuk melakukan *request* API internal.

## 6.3 Error Handling

- [ ] Apabila terjadi gangguan koneksi/server saat logout, sistem tetap membersihkan token/sesi lokal di perangkat Admin.

---

# 7. Related Features

## 7.1 Functional Requirement Terkait

- **FR-14 — Admin Login**
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