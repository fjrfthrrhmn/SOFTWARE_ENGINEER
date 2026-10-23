# Functional Requirement — FR-18

> **Status:** DRAFT  
> **Aktor:** Admin  
> **Fitur:** Mengubah Data Pengguna  
> **Domain:** Pengguna  
> **Prioritas:** High  
> **Related FR:** FR-14, FR-16, FR-17, FR-19

---

# 1. Deskripsi

### Functional Requirement

**FR-18 — Admin Mengubah Data Pengguna**

**Deskripsi:**

> Admin mengubah data pengguna mahasiswa atau dosen.

### Tujuan

Memungkinkan Admin memperbarui informasi pengguna apabila terdapat kesalahan data, perubahan status/gelar, atau permintaan reset kata sandi dari pengguna yang bersangkutan.

### Contoh

> Admin mengedit profil dosen `Budi Santoso, M.Kom.` untuk memperbarui gelar menjadi `Dr. Budi Santoso, M.Kom.` dan NIM/Kode Dosen yang bersangkutan.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin memilih opsi "Ubah" pada salah satu pengguna di daftar data pengguna (FR-16)]
                                  ↓
[System menampilkan form ubah data pengguna terisi data eksisting]
                                  ↓
[Admin memperbarui data yang diperlukan]
                                  ↓
[System memvalidasi dan menyimpan perubahan data]
                                  ↓
[System mengarahkan kembali ke halaman daftar data pengguna (FR-16)]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Memilih opsi `Ubah` pada salah satu baris pengguna di daftar data pengguna (FR-16) | Sistem menampilkan form ubah data yang terisi data pengguna eksisting. |
| 2 | Admin | Memperbarui field yang diinginkan (`nama`, `NIM/Kode`, `role`, `angkatan`, `program_studi`, atau mengisi `new_password` jika reset password) | Form input terisi data pembaruan. |
| 3 | Admin | Mengirimkan/menekan tombol `Simpan Perubahan` | Sistem menerima data pembaruan pengguna. |
| 4 | System | Memvalidasi keunikan `NIM/Kode` (jika diubah) serta aturan format input | Data pembaruan dinyatakan valid dan tidak bentrok dengan akun lain. |
| 5 | System | Memperbarui data akun pengguna di database dan mengarahkan kembali ke daftar pengguna (FR-16) | Data pengguna berhasil diperbarui dan perubahan langsung terlihat di daftar pengguna (FR-16). |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (FR-14).
- [ ] Admin berada pada halaman/fitur melihat daftar data pengguna (FR-16).
- [ ] Data pengguna yang akan diubah sudah terdaftar di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Field `Email` **tidak dapat diubah** (*read-only*) setelah pendaftaran akun untuk menjaga konsistensi identitas dan jejak audit. |
| 2 | Jika `NIM/Kode` diubah, data baru harus tetap unik dan belum digunakan oleh pengguna lain. |
| 3 | Field kata sandi baru (`new_password`) bersifat opsional; hanya diisi apabila Admin hendak melakukan reset password akun pengguna. |
| 4 | Perubahan data pengguna langsung berlaku pada hak akses dan informasi profil pengguna terkait. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `Email` | text | Tidak (Read-only) | Email akun pengguna (tidak dapat diubah) | `budi_santoso` |
| `nama` | text | Ya | Nama lengkap pengguna beserta gelar terbaru | `Dr. Budi Santoso, M.Kom.` |
| `NIM/Kode` | text | Ya | NIM (Mahasiswa) atau Kode Dosen (Dosen) | `198801012023011001` |
| `role` | select | Ya | Peran akses akun (`Mahasiswa` atau `Dosen`) | `Dosen` |
| `angkatan` | number | Ya* | Tahun angkatan, wajib untuk role Mahasiswa | `2023` |
| `program_studi` | select | Ya* | Program studi mahasiswa (relasi ProgramStudi) | `Teknik Informatika` |
| `new_password` | text | Tidak | Kata sandi baru (opsional, diisi jika reset password) | `P@sswordBaru123` |

> `angkatan` dan `program_studi` hanya wajib diisi untuk role Mahasiswa.

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `nama` | Wajib diisi | Nama lengkap wajib diisi. |
| `NIM/Kode` | Wajib diisi, unik (selain milik pengguna ini) | NIM/Kode wajib diisi dan tidak boleh digunakan oleh pengguna lain. |
| `role` | Wajib dipilih | Peran pengguna wajib dipilih. |
| `angkatan` | Wajib diisi untuk Mahasiswa | Tahun angkatan wajib diisi. |
| `program_studi` | Wajib dipilih untuk Mahasiswa | Program studi wajib dipilih. |
| `new_password` | Minimal 8 karakter (jika diisi) | Kata sandi baru minimal 8 karakter. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Perubahan data pengguna berhasil disimpan ke database.
- Mengarahkan Admin kembali ke daftar data pengguna (FR-16).
- Tampilkan pesan sukses pembaruan data.

**Success Message:**

> Data pengguna berhasil diperbarui.

---

## 5.2 Jika Input Tidak Valid

**System:**

- Menolak penyimpanan perubahan data.
- Tampilkan pesan kesalahan validasi spesifik.
- Pertahankan isi perubahan pada form agar Admin dapat memperbaikinya.

**Error Message:**

> NIM/Kode yang Anda masukkan sudah digunakan oleh pengguna lain.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan pesan bahwa data pengguna tidak ditemukan di database.

**Message:**

> Data pengguna tidak ditemukan atau telah dihapus.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Berikan opsi bagi Admin untuk mencoba menyimpan kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal memperbarui data pengguna.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat mengubah informasi data pengguna eksisting (Mahasiswa atau Dosen).
- [ ] Admin dapat melakukan reset kata sandi pengguna dengan mengisi field `new_password`.
- [ ] Perubahan data pengguna langsung tecermin pada fitur Melihat Daftar Data Pengguna (FR-16).

### Validation

- [ ] Field `Email` terkunci (*read-only*) dan tidak dapat diubah oleh Admin.
- [ ] Sistem mencegah duplikasi `NIM/Kode` dengan akun pengguna lain.
- [ ] Kata sandi baru (jika diisi) disimpan secara terenkripsi di dalam database.
- [ ] Input yang tidak memenuhi kriteria validasi ditolak dan menampilkan pesan error yang ramah pengguna.

### Error Handling

- [ ] Kegagalan proses akibat kesalahan server ditangani dengan pesan error yang jelas tanpa memutus sesi login Admin.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-16 — Admin Melihat Daftar Data Pengguna**
- **FR-17 — Admin Menambahkan Pengguna**
- **FR-19 — Admin Menonaktifkan Pengguna**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-16: Admin Melihat Daftar Data Pengguna]
          │
          ▼
[FR-18: Admin Mengubah Data Pengguna]
          │
          ▼
[Data Terperbarui di FR-16]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |