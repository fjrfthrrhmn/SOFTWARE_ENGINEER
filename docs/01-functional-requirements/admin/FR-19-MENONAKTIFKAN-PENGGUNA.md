# Functional Requirement — FR-19

> **Status:** DRAFT  
> **Aktor:** Admin  
> **Fitur:** Menonaktifkan Pengguna  
> **Domain:** Pengguna  
> **Prioritas:** High  
> **Related FR:** FR-14, FR-16, FR-17, FR-18

---

# 1. Deskripsi

### Functional Requirement

**FR-19 — Admin Menonaktifkan Pengguna**

**Deskripsi:**

> Admin menonaktifkan akun pengguna mahasiswa atau dosen.

### Tujuan

Memastikan akun pengguna yang sudah tidak aktif (seperti mahasiswa lulus/keluar atau dosen purna tugas) tidak dapat lagi mengakses sistem tanpa harus menghapus data histori (*soft disable*).

### Contoh

> Admin mengubah status akun mahasiswa yang telah lulus menjadi "Non-aktif" agar akun tersebut tidak dapat melakukan login kembali, namun riwayat akademisnya tetap tersimpan di dalam sistem.

---

# 2. User Flow

## 2.1 Alur Utama

```text id="f2n8qv"
[Admin memilih opsi "Ubah Status / Nonaktifkan" pada pengguna di daftar pengguna (FR-16)]
                                  ↓
[System menampilkan dialog/konfirmasi perubahan status akun]
                                  ↓
[Admin mengonfirmasi penonaktifan/pengaktifan akun pengguna]
                                  ↓
[System memproses dan memperbarui status akun di database]
                                  ↓
[System mengarahkan kembali ke daftar pengguna (FR-16) dengan status terperbarui]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Memilih opsi `Nonaktifkan` atau `Ubah Status` pada baris pengguna tertentu di daftar pengguna (FR-16) | Sistem menampilkan tindakan konfirmasi perubahan status. |
| 2 | Admin | Mengonfirmasi tindakan penonaktifan akun pengguna | Sistem menerima perintah perubahan status. |
| 3 | System | Memvalidasi bahwa akun yang dinonaktifkan bukan akun Admin yang sedang login (FR-14) | Perintah validasi berhasil. |
| 4 | System | Memperbarui status akun pengguna menjadi `Non-aktif` di database | Status akun berhasil diperbarui. |
| 5 | System | Menampilkan notifikasi sukses dan memperbarui tampilan pada daftar pengguna (FR-16) | Perubahan status pengguna tecermin pada daftar data pengguna (FR-16). |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (FR-14).
- [ ] Admin berada pada halaman/fitur melihat daftar data pengguna (FR-16).
- [ ] Data pengguna yang akan dinonaktifkan sudah terdaftar di dalam sistem (FR-17).

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Akun pengguna yang berstatus `Non-aktif` secara otomatis ditolak oleh sistem saat mencoba melakukan proses autentikasi/login. |
| 2 | Penonaktifan akun bersifat *soft state update* (mengubah status flag), bukan menghapus entitas data dari database, untuk menjaga integritas data riwayat (absensi, materi, jadwal). |
| 3 | Admin tidak diperbolehkan menonaktifkan akun Admin miliknya sendiri yang sedang digunakan dalam sesi aktif. |
| 4 | Status akun yang `Non-aktif` dapat dikembalikan menjadi `Aktif` (*reactivate*) oleh Admin apabila diperlukan di kemudian hari. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `user_id` | number/hidden | Ya | Identifier unik akun pengguna (id) yang akan diubah statusnya | `10293` |
| `status` | select | Ya | Status akun pengguna baru (`Aktif` / `Non-aktif`) | `Non-aktif` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `user_id` | Wajib valid dan bukan akun Admin yang sedang aktif | Anda tidak dapat menonaktifkan akun Anda sendiri yang sedang digunakan. |
| `status` | Wajib berupa salah satu dari nilai: `Aktif` / `Non-aktif` | Pilihan status tidak valid. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Status akun pengguna berhasil diperbarui di database.
- Hak akses login pengguna terkait langsung dicabut.
- Tampilkan pesan berhasil dan perbarui baris data pada daftar pengguna (FR-16).

**Success Message:**

> Status akun pengguna berhasil diubah menjadi Non-aktif.

---

## 5.2 Jika Input Tidak Valid

**System:**

- Menolak perintah perubahan status.
- Tampilkan pesan error validasi.

**Error Message:**

> Anda tidak dapat menonaktifkan akun Admin yang sedang Anda gunakan.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan pesan bahwa data pengguna tidak ditemukan.

**Message:**

> Data pengguna tidak ditemukan di dalam sistem.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Berikan opsi bagi Admin untuk mencoba kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal mengubah status pengguna.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat menonaktifkan atau mengaktifkan kembali akun pengguna (Mahasiswa/Dosen).
- [ ] Pengguna yang statusnya `Non-aktif` tidak dapat melakukan login ke dalam sistem.
- [ ] Perubahan status tecermin secara langsung pada daftar data pengguna (FR-16).

### Validation

- [ ] Sistem mencegah Admin menonaktifkan akun miliknya sendiri yang sedang aktif login (FR-14).
- [ ] Penonaktifan tidak menghapus data historis pengguna dari basis data (*soft update*).

### Error Handling

- [ ] Kegagalan koneksi/server saat mengubah status ditangani dengan pesan error yang jelas.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-16 — Admin Melihat Daftar Data Pengguna**
- **FR-17 — Admin Menambahkan Pengguna**
- **FR-18 — Admin Mengubah Data Pengguna**

### Flow yang Berhubungan

```text id="g3m6wx"
[FR-14: Admin Login]
          ↓
[FR-16: Admin Melihat Daftar Data Pengguna]
          │
          ▼
[FR-19: Admin Menonaktifkan Pengguna]
          │
          ▼
[Status Terperbarui di FR-16]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |