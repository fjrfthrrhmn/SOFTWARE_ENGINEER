# Functional Requirement — FR-8

> **Status:** DRAFT  
> **Aktor:** Dosen  
> **Fitur:** Melihat Jadwal Mengajar  
> **Domain:** Jadwal  
> **Prioritas:** High  
> **Related FR:** FR-6, FR-7  

---

# 1. Deskripsi

### Functional Requirement

**FR-8 — Dosen Melihat Jadwal Mengajar**

**Deskripsi:**

> Dosen dapat melihat jadwal mengajar yang berisi informasi mata kuliah, hari, waktu, dan ruang perkuliahan yang menjadi tanggung jawabnya.

### Tujuan

Memudahkan dosen mengetahui jadwal perkuliahan dari mata kuliah yang diampu.

### Contoh

Setelah login, dosen membuka menu Jadwal Mengajar untuk melihat daftar mata kuliah beserta hari, waktu, dan ruang perkuliahan.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[FR-6 — Dosen Login]
         ↓
[Dosen berhasil masuk ke sistem]
         ↓
[Dosen memilih menu Jadwal Mengajar]
         ↓
[System mengambil data jadwal mengajar]
         ↓
[System menampilkan jadwal mengajar]
         ↓
[Dosen melihat jadwal]
         ↓
[FR-7 — Dosen Logout]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Dosen | Login ke dalam sistem | Dosen berhasil masuk ke sistem |
| 2 | Dosen | Memilih menu Jadwal Mengajar | System menerima permintaan |
| 3 | System | Mengambil data jadwal mengajar dosen | Data jadwal diperoleh |
| 4 | System | Menampilkan jadwal mengajar | Jadwal ditampilkan kepada dosen |
| 5 | Dosen | Melihat jadwal mengajar | Dosen mengetahui jadwal perkuliahannya |
| 6 | Dosen | Melakukan Logout | Dosen keluar dari sistem |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Dosen sudah berhasil login melalui FR-8.
- [ ] Dosen memiliki akses ke fitur Jadwal Mengajar.
- [ ] Data jadwal mengajar tersedia dalam sistem.
- [ ] System dapat diakses.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Dosen harus login terlebih dahulu untuk melihat jadwal mengajar. |
| 2 | Dosen hanya dapat melihat jadwal mengajar yang berkaitan dengan dirinya. |
| 3 | Jadwal yang ditampilkan harus sesuai dengan data yang tersedia dalam sistem. |
| 4 | Informasi jadwal dapat berupa mata kuliah, hari, waktu, dan ruang. |
| 5 | Jika belum terdapat jadwal, system menampilkan informasi bahwa jadwal belum tersedia. |
| 6 | Dosen tidak dapat mengubah data jadwal melalui fitur ini. |

---

# 4. Fields & Validation

Fitur ini tidak membutuhkan input dari dosen. Data jadwal ditampilkan berdasarkan data yang tersedia dalam sistem.

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| Mata Kuliah | Text | - | Nama mata kuliah yang diampu | Pemrograman Dasar |
| Hari | Text | - | Hari pelaksanaan perkuliahan | Senin |
| Waktu | Time | - | Waktu pelaksanaan perkuliahan | 08:00 - 10:00 |
| Ruang | Text | - | Ruangan perkuliahan | Lab 301 |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| Sesi Login | Dosen harus sudah login | Silakan login terlebih dahulu. |
| Data Jadwal | Jadwal harus tersedia | Jadwal mengajar belum tersedia. |
| Mata Kuliah | Jadwal harus berkaitan dengan mata kuliah yang diampu dosen | Data jadwal tidak tersedia. |

---

# 5. Response & Kondisi Setelah Action

Jelaskan apa yang terjadi setelah dosen membuka fitur Jadwal Mengajar.

## 5.1 Jika Berhasil

**System:**

- System mengambil data jadwal mengajar dosen.
- System menampilkan daftar jadwal mengajar.
- Dosen dapat melihat informasi mata kuliah, hari, waktu, dan ruang.

**Success Message:**

> Jadwal mengajar berhasil ditampilkan.

---

## 5.2 Jika Input Tidak Valid

Fitur ini tidak menggunakan input dari dosen. Validasi dilakukan berdasarkan sesi login dan data jadwal yang tersedia.

**System:**

- System memeriksa status login dosen.
- System memeriksa ketersediaan data jadwal.
- Jika data tidak sesuai, system menampilkan pesan yang sesuai.

**Message:**

> Data jadwal tidak dapat ditampilkan.

---

## 5.3 Jika Data Tidak Ditemukan

**System:**

- System tidak menemukan jadwal mengajar untuk dosen.
- System menampilkan informasi bahwa jadwal belum tersedia.

**Message:**

> Jadwal mengajar belum tersedia.

---

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- System menampilkan pesan kesalahan.
- Dosen dapat mencoba membuka jadwal kembali.

**Message:**

> Terjadi kesalahan saat mengambil data jadwal. Silakan coba lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila memenuhi kriteria berikut.

### Functional

- [ ] Dosen dapat membuka menu Jadwal Mengajar setelah login.
- [ ] System dapat mengambil data jadwal mengajar dosen.
- [ ] System dapat menampilkan jadwal mengajar.
- [ ] Dosen dapat melihat mata kuliah yang diampu.
- [ ] Dosen dapat melihat hari perkuliahan.
- [ ] Dosen dapat melihat waktu perkuliahan.
- [ ] Dosen dapat melihat ruang perkuliahan.

### Validation

- [ ] Dosen harus login sebelum mengakses jadwal mengajar.
- [ ] Jadwal yang ditampilkan hanya berkaitan dengan dosen yang sedang login.
- [ ] Jika data jadwal tidak tersedia, system menampilkan informasi yang sesuai.

### Error Handling

- [ ] System menampilkan pesan ketika dosen belum login.
- [ ] System menampilkan pesan ketika jadwal tidak ditemukan.
- [ ] System menampilkan pesan ketika terjadi kesalahan saat mengambil data jadwal.
- [ ] Dosen dapat mencoba kembali setelah terjadi kesalahan.

---

# 7. Related Features

### Functional Requirement Terkait

- [FR-6] — Dosen Login
- [FR-7] — Dosen Logout

### Flow yang Berhubungan

```text
[FR-6 — Dosen Login]
         ↓
[FR-8 — Melihat Jadwal Mengajar]
         ↓
[Dosen melihat jadwal mengajar]
         ↓
[FR-7 — Dosen Logout]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |
