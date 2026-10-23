# Functional Requirement — FR-16

> **Status:** DRAFT  
> **Aktor:** Admin  
> **Fitur:** Melihat Daftar Data Pengguna  
> **Domain:** Pengguna  
> **Prioritas:** High  
> **Related FR:** FR-14, FR-17, FR-18, FR-19

---

# 1. Deskripsi

### Functional Requirement

**FR-16 — Admin Melihat Daftar Data Pengguna**

**Deskripsi:**

> Admin dapat melihat data pengguna mahasiswa dan dosen yang terdaftar dalam sistem, termasuk melakukan pencarian dan penyaringan data.

### Tujuan

Memudahkan Admin dalam memantau, mencari, dan mengelola akun pengguna (mahasiswa dan dosen) secara terstruktur.

### Contoh

> Admin membuka menu Data Pengguna, lalu menyaring daftar berdasarkan peran "Dosen" atau memasukkan kata kunci nama/NIM/Kode Dosen untuk menemukan pengguna tertentu.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin mengakses menu Data Pengguna]
              ↓
[System menampilkan daftar data pengguna]
              ↓
[Admin menentukan filter / pencarian / memilih data pengguna]
              ↓
[System memproses request]
              ↓
[System menampilkan data terfilter atau detail pengguna]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Mengakses menu `Data Pengguna` | Sistem menerima perintah navigasi. |
| 2 | System | Mengambil dan menampilkan daftar pengguna secara terpaginasi | Daftar data pengguna (Mahasiswa & Dosen) ditampilkan. |
| 3 | Admin | Memasukkan kata kunci pencarian atau memilih filter (Peran/Status) | Input pencarian/filter terkirim ke sistem. |
| 4 | System | Memfilter data sesuai parameter yang diberikan | Data yang sesuai kriteria ditampilkan. |
| 5 | Admin | Memilih salah satu pengguna dari daftar | Sistem menampilkan detail informasi pengguna tersebut. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah berhasil login (FR-14).
- [ ] Admin memiliki akses ke modul pengelolaan pengguna.
- [ ] Data pengguna (mahasiswa/dosen) sudah tersedia di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Sistem menampilkan data pengguna dalam bentuk daftar terpaginasi (*pagination*). |
| 2 | Admin dapat menyaring data berdasarkan Peran (*Role*: Mahasiswa / Dosen) dan Status Akun (Aktif / Non-aktif). |
| 3 | Pencarian data pengguna dapat dilakukan berdasarkan Nama, NIM/Kode Dosen, atau Email. |
| 4 | Informasi sensitif seperti kata sandi (*password*) pengguna **tidak boleh** ditampilkan. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `keyword` | text | Tidak | Kata kunci pencarian berdasarkan Nama, NIM/Kode Dosen, atau Email | `Budi` / `21012345` |
| `role` | select | Tidak | Filter berdasarkan peran pengguna (`Mahasiswa`, `Dosen`, `Semua`) | `Dosen` |
| `status` | select | Tidak | Filter berdasarkan status akun (`Aktif`, `Non-aktif`, `Semua`) | `Aktif` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `keyword` | Maksimal 100 karakter | Kata kunci pencarian maksimal 100 karakter. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Menampilkan daftar pengguna sesuai filter/pencarian.
- Menampilkan detail informasi akun pengguna jika dipilih.
- Menampilkan jumlah total data pengguna yang ditemukan.

---

## 5.2 Jika Input Tidak Valid

**System:**

- Tampilkan pesan error validasi input pencarian.
- Pertahankan parameter pencarian sebelumnya.

**Error Message:**

> Kata kunci pencarian melebihi batas maksimal 100 karakter.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan indikator/pesan bahwa data kosong.
- Sediakan tombol/opsi untuk me-reset pencarian atau filter.

**Message:**

> Data pengguna tidak ditemukan.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Sediakan tombol untuk memuat ulang (*reload*) data.

**Message:**

> Gagal memuat data pengguna. Silakan coba beberapa saat lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat melihat daftar seluruh data pengguna (mahasiswa & dosen).
- [ ] Admin dapat menyaring pengguna berdasarkan peran dan status akun.
- [ ] Admin dapat melakukan pencarian data berdasarkan nama, NIM/Kode Dosen, atau Email.
- [ ] Admin dapat melihat detail data pengguna yang dipilih.

### Validation

- [ ] Informasi kata sandi (*password*) tidak ditampilkan pada daftar maupun detail pengguna.
- [ ] Parameter input pencarian yang melebihi batas ditolak dengan pesan error yang sesuai.

### Error Handling

- [ ] Tampilan data kosong dimunculkan dengan jelas jika kriteria pencarian tidak ditemukan.
- [ ] Kesalahan server saat mengambil data ditangani dengan pesan error yang informatif.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-17 — Admin Menambahkan Pengguna**
- **FR-18 — Admin Mengubah Data Pengguna**
- **FR-19 — Admin Menonaktifkan Pengguna**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-16: Admin Melihat Daftar Data Pengguna]
          │
          ├──► [FR-17: Admin Menambahkan Pengguna]
          │
          ├──► [FR-18: Admin Mengubah Data Pengguna]
          │
          └──► [FR-19: Admin Menonaktifkan Pengguna]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |

**Last Updated:** `2026-09-28`  
**Author:** `Admin`