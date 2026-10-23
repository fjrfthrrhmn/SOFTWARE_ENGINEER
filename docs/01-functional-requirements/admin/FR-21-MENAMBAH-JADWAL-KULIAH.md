# Functional Requirement — FR-21

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Menambahkan Jadwal Perkuliahan  
**Domain:** Jadwal  
**Prioritas:** High  
**Related FR:** FR-14, FR-15, FR-20, FR-22, FR-23

---

# 1. Deskripsi

### Functional Requirement

**FR-21 — Admin Menambahkan Jadwal Perkuliahan**

**Deskripsi:**

> Admin dapat menambahkan data jadwal perkuliahan baru ke dalam sistem, termasuk menentukan mata kuliah, dosen pengampu, ruangan, hari, dan alokasi waktu perkuliahan.

### Tujuan

Memungkinkan Admin mengalokasikan jadwal perkuliahan secara resmi agar dosen dan mahasiswa dapat melihat jadwal mengajar serta jadwal kuliah yang terstruktur (**FR-3 / FR-8**).

### Contoh

> Admin menambahkan jadwal perkuliahan baru untuk mata kuliah "Rekayasa Perangkat Lunak" dengan dosen pengampu "Budi Santoso, M.Kom." di ruangan "B201" pada hari Senin pukul 08:00–10:30 WIB.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin memilih opsi "Tambah Jadwal" dari daftar jadwal perkuliahan (FR-20)]
                         ↓
[System menampilkan form penambahan jadwal perkuliahan]
                         ↓
[Admin menginputkan data alokasi jadwal perkuliahan]
                         ↓
[System memvalidasi kelengkapan data dan mengecek bentrok jadwal]
                         ↓
[System menyimpan jadwal perkuliahan baru dan mengarahkan kembali ke daftar jadwal (FR-20)]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Memilih tombol `Tambah Jadwal` dari halaman daftar jadwal perkuliahan (FR-20) | Sistem menampilkan form entri jadwal perkuliahan. |
| 2 | Admin | Mengisi dan memilih seluruh field input (`mata_kuliah_id`, `dosen_id`, `ruangan`, `hari`, `jam_mulai`, `jam_selesai`) | Form input terisi. |
| 3 | Admin | Mengirimkan/menekan tombol `Simpan Jadwal` | Sistem menerima data alokasi jadwal baru. |
| 4 | System | Memvalidasi format input, durasi waktu, serta pengecekan bentrok ruangan dan dosen | Data dinyatakan valid dan tidak terjadi bentrok (*conflict-free*). |
| 5 | System | Menyimpan data jadwal perkuliahan baru ke database dan mengarahkan kembali ke daftar jadwal (FR-20) | Jadwal baru terdaftar dan langsung muncul pada daftar jadwal perkuliahan (FR-20). |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah login ke dalam sistem (**FR-14**).
- [ ] Admin berada pada halaman/fitur melihat daftar jadwal perkuliahan (**FR-20**).
- [ ] Data Mata Kuliah dan Dosen Pengampu sudah terdaftar di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | **Pencegahan Bentrok Ruangan (*Room Conflict*):** Ruangan yang sama tidak boleh digunakan oleh lebih dari satu perkuliahan pada hari dan interval jam yang tumpang tindih (*overlap*). |
| 2 | **Pencegahan Bentrok Dosen (*Lecturer Conflict*):** Dosen yang sama tidak boleh mengajar di dua ruangan berbeda pada hari dan interval jam yang tumpang tindih. |
| 3 | `jam_selesai` wajib secara kronologis lebih besar/setelah `jam_mulai`. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `mata_kuliah_id` | select | Ya | Pilihan mata kuliah yang dibuka | `COMP6047 - RPL` |
| `dosen_id` | select | Ya | Dosen pengampu mata kuliah | `Dr. Budi Santoso` |
| `ruangan` | text | Ya | Kode/nomor ruang perkuliahan | `B201` |
| `hari` | select | Ya | Hari pelaksanaan kuliah (`Senin`–`Sabtu`, disimpan sebagai kode hari 1–6) | `Senin` |
| `jam_mulai` | time | Ya | Waktu mulai perkuliahan (format `HH:mm`) | `08:00` |
| `jam_selesai` | time | Ya | Waktu selesai perkuliahan (format `HH:mm`) | `10:30` |

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

- Data jadwal perkuliahan baru tersimpan ke dalam database.
- Mengarahkan Admin kembali ke daftar jadwal perkuliahan (**FR-20**).
- Tampilkan pesan sukses penambahan jadwal.

**Success Message:**

> Jadwal perkuliahan berhasil ditambahkan.

## 5.2 Jika Input Tidak Valid / Bentrok

**System:**

- Menolak penyimpanan data jadwal.
- Tampilkan pesan error spesifik terkait input yang tidak memenuhi aturan atau bentrok jadwal yang terjadi.
- Pertahankan isi input pada form agar Admin dapat melakukan penyesuaian waktu/ruangan.

**Error Message:**

> Gagal menyimpan jadwal: Terdapat bentrok waktu pada Ruangan / Dosen yang dipilih.

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tidak berlaku untuk fitur ini.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem yang ramah pengguna.
- Berikan opsi bagi Admin untuk mencoba menyimpan kembali.

**Message:**

> Terjadi kesalahan sistem. Gagal menambahkan jadwal perkuliahan.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat membuat jadwal perkuliahan baru dengan mengisi data mata kuliah, dosen, ruangan, hari, dan alokasi waktu.
- [ ] Data jadwal baru yang berhasil ditambahkan langsung tercermin pada daftar jadwal perkuliahan (**FR-20**).
- [ ] Jadwal yang terbuat secara otomatis dapat diakses oleh dosen pengampu (**FR-8 / FR-9**) dan mahasiswa terkait (**FR-3**).

### Validation

- [ ] Sistem secara otomatis mendeteksi dan menolak jadwal yang mengalami bentrok **Ruangan** atau **Dosen**.
- [ ] Sistem menolak input jika `jam_selesai` lebih awal atau sama dengan `jam_mulai`.
- [ ] Seluruh field input yang bersifat wajib tidak boleh kosong.

### Error Handling

- [ ] Pesan kesalahan akibat bentrok jadwal ditampilkan secara informatif dengan menyebutkan jenis bentroknya.
- [ ] Kegagalan koneksi/server ditangani dengan pesan error yang ramah pengguna.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-15 — Admin Logout**
- **FR-20 — Admin Melihat Jadwal Perkuliahan**
- **FR-22 — Admin Mengubah Jadwal Perkuliahan**
- **FR-23 — Admin Menghapus Jadwal Perkuliahan**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-20: Admin Melihat Jadwal Perkuliahan]
          ↓
[FR-21: Admin Menambahkan Jadwal Perkuliahan]
          ↓
[Jadwal Berhasil Terdaftar]
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