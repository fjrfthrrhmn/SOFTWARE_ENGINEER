# Functional Requirement — FR-23

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Menghapus Jadwal Perkuliahan  
**Domain:** Jadwal  
**Prioritas:** High  
**Related FR:** FR-14, FR-15, FR-20, FR-21, FR-22

---

# 1. Deskripsi

### Functional Requirement

**FR-23 — Admin Menghapus Jadwal Perkuliahan**

**Deskripsi:**

> Admin dapat menghapus data jadwal perkuliahan dari sistem apabila jadwal tersebut batal dilaksanakan atau salah terinput.

### Tujuan

Memastikan integritas dan akurasi data perkuliahan dengan membersihkan alokasi jadwal yang tidak berlaku lagi di dalam sistem.

### Contoh

> Admin menghapus entitas jadwal mata kuliah "Rekayasa Perangkat Lunak" karena perkuliahan dibatalkan secara resmi oleh pihak akademik.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin memilih opsi "Hapus" pada salah satu jadwal di daftar jadwal perkuliahan (FR-20)]
                         ↓
[System menampilkan dialog konfirmasi penghapusan data]
                         ↓
[Admin mengonfirmasi penghapusan jadwal]
                         ↓
[System memverifikasi keterkaitan data dan memproses penghapusan]
                         ↓
[System mengarahkan kembali ke daftar jadwal perkuliahan (FR-20) dengan data terbarui]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Memilih tombol `Hapus` pada baris jadwal perkuliahan tertentu di daftar jadwal (FR-20) | Sistem menampilkan dialog konfirmasi penghapusan data. |
| 2 | Admin | Mengonfirmasi tindakan penghapusan | Sistem menerima perintah penghapusan. |
| 3 | System | Memverifikasi apakah jadwal sudah memiliki data riwayat absensi | Perintah terverifikasi aman untuk diproses. |
| 4 | System | Menghapus atau menandai (*soft delete*) data jadwal perkuliahan dari database | Data jadwal berhasil dihapus. |
| 5 | System | Menampilkan pesan sukses dan memperbarui tampilan daftar jadwal perkuliahan (FR-20) | Perubahan tercermin secara langsung pada daftar jadwal. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (**FR-14**).
- [ ] Admin berada pada halaman/fitur melihat daftar jadwal perkuliahan (**FR-20**).
- [ ] Data jadwal perkuliahan yang akan dihapus terdaftar di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Penghapusan jadwal yang sudah memiliki riwayat absensi berjalan harus dibatasi atau memerlukan peringatan khusus untuk menjaga integritas data akademik. |
| 2 | Sistem menggunakan atribut `status` pada `JadwalKuliah` untuk menandai jadwal yang dibatalkan/dihapus (*soft delete*) agar data dapat dipulihkan (*recovery*) jika terjadi kekeliruan oleh Admin. |
| 3 | Penghapusan data jadwal secara otomatis akan membatalkan tampilan jadwal perkuliahan pada sisi Dosen (**FR-8**) dan Mahasiswa (**FR-3**). |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `jadwal_id` | number/hidden | Ya | Identifier unik jadwal perkuliahan (id) yang akan dihapus | `20261` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `jadwal_id` | Wajib terdaftar dan tidak terikat dengan transaksi aktif yang menghalangi penghapusan | Jadwal perkuliahan tidak ditemukan atau tidak dapat dihapus karena data terkait. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Data jadwal perkuliahan berhasil dihapus dari database.
- Tampilan pada daftar jadwal perkuliahan (**FR-20**) diperbarui.
- Tampilkan pesan berhasil.

**Success Message:**

> Jadwal perkuliahan berhasil dihapus.

## 5.2 Jika Input Tidak Valid

**System:**

- Menolak perintah penghapusan.
- Tampilkan pesan error validasi.

**Error Message:**

> Request penghapusan jadwal tidak valid.

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan pesan bahwa data jadwal tidak ditemukan.

**Message:**

> Data jadwal perkuliahan tidak ditemukan atau telah dihapus sebelumnya.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Berikan opsi bagi Admin untuk mencoba kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal menghapus jadwal perkuliahan.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat menghapus data jadwal perkuliahan yang tidak berlaku.
- [ ] Data jadwal yang dihapus secara otomatis hilang dari daftar jadwal perkuliahan (**FR-20**).
- [ ] Jadwal yang terhapus tidak lagi muncul pada kalender/jadwal mengajar dosen (**FR-8**) maupun mahasiswa (**FR-3**).

### Validation

- [ ] Terdapat dialog konfirmasi sebelum tindakan penghapusan dieksekusi oleh sistem.
- [ ] Sistem mencegah kerusakan atau ketidaksesuaian data riwayat absensi yang terkait dengan jadwal.

### Error Handling

- [ ] Kesalahan server saat memproses penghapusan ditangani dengan pesan error yang jelas.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-20 — Admin Melihat Jadwal Perkuliahan**
- **FR-21 — Admin Menambahkan Jadwal Perkuliahan**
- **FR-22 — Admin Mengubah Jadwal Perkuliahan**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-20: Admin Melihat Jadwal Perkuliahan]
          ↓
[FR-23: Admin Menghapus Jadwal Perkuliahan]
          ↓
[Jadwal Berhasil Dihapus]
          ↓
[Daftar Jadwal Diperbarui di FR-20]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |