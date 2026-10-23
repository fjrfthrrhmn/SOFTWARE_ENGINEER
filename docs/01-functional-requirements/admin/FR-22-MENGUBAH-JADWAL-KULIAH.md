# Functional Requirement — FR-22

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Mengubah Jadwal Perkuliahan  
**Domain:** Jadwal  
**Prioritas:** High  
**Related FR:** FR-14, FR-15, FR-20, FR-21, FR-23

---

# 1. Deskripsi

### Functional Requirement

**FR-22 — Admin Mengubah Jadwal Perkuliahan**

**Deskripsi:**

> Admin dapat mengubah data jadwal perkuliahan yang sudah terdaftar di dalam sistem, termasuk penyesuaian mata kuliah, dosen pengampu, ruangan, hari, dan alokasi waktu perkuliahan.

### Tujuan

Memungkinkan Admin menyesuaikan jadwal perkuliahan apabila terjadi perubahan alokasi ruangan, perpindahan dosen pengampu, atau penyesuaian waktu kuliah tanpa menimbulkan bentrok jadwal baru.

### Contoh

> Admin mengubah jadwal perkuliahan mata kuliah "Rekayasa Perangkat Lunak" dari hari Senin pukul 08:00 WIB di Ruang B201 menjadi hari Selasa pukul 10:00 WIB di Ruang B205.

---

# 2. User Flow

## 2.1 Alur Utama

```text id="q6j8km"
[Admin memilih opsi "Ubah" pada salah satu jadwal di daftar jadwal perkuliahan (FR-20)]
                         ↓
[System menampilkan form ubah data jadwal perkuliahan terisi data eksisting]
                         ↓
[Admin memperbarui alokasi jadwal perkuliahan yang diperlukan]
                         ↓
[System memvalidasi kelengkapan data dan mengecek bentrok jadwal]
                         ↓
[System menyimpan perubahan jadwal perkuliahan dan mengarahkan kembali ke daftar jadwal (FR-20)]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Memilih tombol `Ubah` pada salah satu baris jadwal di daftar jadwal perkuliahan (FR-20) | Sistem menampilkan form ubah jadwal terisi data eksisting. |
| 2 | Admin | Memperbarui field input (`mata_kuliah_id`, `dosen_id`, `ruangan`, `hari`, `jam_mulai`, `jam_selesai`) | Form input terisi data pembaruan. |
| 3 | Admin | Mengirimkan/menekan tombol `Simpan Perubahan` | Sistem menerima data pembaruan jadwal. |
| 4 | System | Memvalidasi format input, durasi waktu, serta pengecekan bentrok ruangan dan dosen (mengabaikan entitas jadwal yang sedang diubah) | Data dinyatakan valid dan tidak terjadi bentrok (*conflict-free*). |
| 5 | System | Memperbarui data jadwal perkuliahan di database dan mengarahkan kembali ke daftar jadwal (FR-20) | Data jadwal berhasil diperbarui dan perubahan langsung tercermin di daftar jadwal (FR-20). |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (**FR-14**).
- [ ] Admin berada pada halaman/fitur melihat daftar jadwal perkuliahan (**FR-20**).
- [ ] Data jadwal perkuliahan yang akan diubah sudah terdaftar di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | **Pencegahan Bentrok Ruangan (*Room Conflict*):** Ruangan yang dipilih tidak boleh tumpang tindih (*overlap*) dengan jadwal perkuliahan lain pada hari dan interval jam yang sama. |
| 2 | **Pencegahan Bentrok Dosen (*Lecturer Conflict*):** Dosen pengampu tidak boleh mengajar di ruangan lain pada hari dan interval jam yang tumpang tindih. |
| 3 | Pengecekan bentrok jadwal mengabaikan entitas jadwal (*record ID*) yang sedang disunting/diubah. |
| 4 | `jam_selesai` wajib secara kronologis lebih besar/setelah `jam_mulai`. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `mata_kuliah_id` | select | Ya | Pilihan mata kuliah yang dibuka | `COMP6047 - RPL` |
| `dosen_id` | select | Ya | Dosen pengampu mata kuliah | `Dr. Budi Santoso` |
| `ruangan` | text | Ya | Kode/nomor ruang perkuliahan | `B205` |
| `hari` | select | Ya | Hari pelaksanaan kuliah (`Senin`–`Sabtu`, disimpan sebagai kode hari 1–6) | `Selasa` |
| `jam_mulai` | time | Ya | Waktu mulai perkuliahan (format `HH:mm`) | `10:00` |
| `jam_selesai` | time | Ya | Waktu selesai perkuliahan (format `HH:mm`) | `12:30` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `mata_kuliah_id` | Wajib dipilih | Mata kuliah wajib dipilih. |
| `dosen_id` | Wajib dipilih, tidak bentrok jadwal di waktu sama | Dosen pengampu sudah memiliki jadwal mengajar lain pada waktu yang sama. |
| `ruangan` | Wajib diisi, tidak bentrok penggunaan di waktu sama | Ruangan ini sudah digunakan oleh perkuliahan lain pada waktu yang sama. |
| `hari` | Wajib dipilih | Hari perkuliahan wajib dipilih. |
| `jam_mulai` | Wajib diisi | Jam mulai wajib diisi. |
| `jam_selesai` | Wajib diisi, harus lebih besar dari `jam_mulai` | Jam selesai harus lebih lambat dari jam mulai. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Perubahan data jadwal perkuliahan berhasil disimpan ke database.
- Mengarahkan Admin kembali ke daftar jadwal perkuliahan (**FR-20**).
- Tampilkan pesan sukses pembaruan data.

**Success Message:**

> Jadwal perkuliahan berhasil diperbarui.

## 5.2 Jika Input Tidak Valid / Bentrok

**System:**

- Menolak penyimpanan perubahan jadwal.
- Tampilkan pesan kesalahan spesifik terkait aturan validasi atau bentrok jadwal.
- Pertahankan isi input pembaruan pada form agar Admin dapat memperbaikinya.

**Error Message:**

> Gagal memperbarui jadwal: Terdapat bentrok waktu pada Ruangan / Dosen yang dipilih.

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan pesan kesalahan bahwa data jadwal tidak ditemukan.

**Message:**

> Data jadwal perkuliahan tidak ditemukan atau telah dihapus.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Berikan opsi bagi Admin untuk mencoba menyimpan kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal memperbarui jadwal perkuliahan.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat memperbarui informasi data jadwal perkuliahan eksisting.
- [ ] Perubahan jadwal perkuliahan langsung tercermin pada daftar jadwal perkuliahan (**FR-20**).
- [ ] Pembaruan jadwal otomatis disinkronkan dengan tampilan jadwal dosen (**FR-8**) dan mahasiswa (**FR-3**).

### Validation

- [ ] Sistem secara otomatis mengecek bentrok **Ruangan** atau **Dosen** dengan mengabaikan ID jadwal yang sedang diedit.
- [ ] Sistem menolak input jika `jam_selesai` lebih awal atau sama dengan `jam_mulai`.
- [ ] Seluruh field input wajib diisi dan divalidasi.

### Error Handling

- [ ] Pesan kesalahan akibat bentrok jadwal ditampilkan dengan jelas.
- [ ] Kegagalan koneksi/server ditangani dengan pesan error yang ramah pengguna.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-20 — Admin Melihat Jadwal Perkuliahan**
- **FR-21 — Admin Menambahkan Jadwal Perkuliahan**
- **FR-23 — Admin Menghapus Jadwal Perkuliahan**

### Flow yang Berhubungan

```text id="z2p8fw"
[FR-14: Admin Login]
          ↓
[FR-20: Admin Melihat Jadwal Perkuliahan]
          ↓
[FR-22: Admin Mengubah Jadwal Perkuliahan]
          ↓
[Jadwal Berhasil Diperbarui]
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