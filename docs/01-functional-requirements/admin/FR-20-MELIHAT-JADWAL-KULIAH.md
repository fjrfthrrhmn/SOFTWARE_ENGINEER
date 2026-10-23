# Functional Requirement — FR-20

**Status:** DRAFT  
**Aktor:** Admin  
**Fitur:** Melihat Jadwal Perkuliahan  
**Domain:** Jadwal  
**Prioritas:** High  
**Related FR:** FR-14, FR-21, FR-22, FR-23

---

# 1. Deskripsi

### Functional Requirement

**FR-20 — Admin Melihat Jadwal Perkuliahan**

**Deskripsi:**

> Admin dapat melihat data jadwal perkuliahan untuk seluruh mata kuliah, dosen pengampu, waktu, dan ruangan yang terdaftar di dalam sistem.

### Tujuan

Memudahkan Admin dalam memantau, mencari, serta mengevaluasi alokasi jadwal perkuliahan secara menyeluruh dan terstruktur.

### Contoh

> Admin membuka menu Jadwal Perkuliahan, kemudian menyaring daftar jadwal berdasarkan Program Studi atau memasukkan nama mata kuliah untuk memeriksa ketersediaan ruangan dan dosen pengampu.

---

# 2. User Flow

## 2.1 Alur Utama

```text
[Admin mengakses menu Jadwal Perkuliahan]
                    ↓
[System menampilkan daftar jadwal perkuliahan]
                    ↓
[Admin menentukan filter / pencarian / memilih item jadwal]
                    ↓
[System memproses request]
                    ↓
[System menampilkan data terfilter atau detail jadwal perkuliahan]
```

### Detail Flow

| Step | Aktor | Aktivitas | Hasil |
|---|---|---|---|
| 1 | Admin | Mengakses menu `Jadwal Perkuliahan` | Sistem menerima perintah navigasi. |
| 2 | System | Mengambil dan menampilkan daftar jadwal perkuliahan secara terpaginasi | Daftar jadwal perkuliahan ditampilkan. |
| 3 | Admin | Memasukkan kata kunci pencarian atau memilih filter (Prodi/Hari) | Input pencarian/filter terkirim ke sistem. |
| 4 | System | Memfilter data sesuai parameter yang diberikan | Data jadwal yang sesuai kriteria ditampilkan. |
| 5 | Admin | Memilih salah satu jadwal dari daftar | Sistem menampilkan detail informasi jadwal perkuliahan tersebut. |

---

# 3. Kondisi dan Aturan

## 3.1 Kondisi Sebelum Fitur Digunakan

- [ ] Admin telah berhasil login ke dalam sistem (**FR-14**).
- [ ] Admin memiliki hak akses ke modul pengelolaan jadwal perkuliahan.
- [ ] Data jadwal perkuliahan sudah tersedia di dalam sistem.

## 3.2 Aturan Fitur

| No. | Aturan |
|---|---|
| 1 | Sistem menampilkan data jadwal perkuliahan dalam bentuk daftar terpaginasi (*pagination*). |
| 2 | Admin dapat menyaring data berdasarkan Program Studi, Hari, atau Dosen Pengampu. |
| 3 | Pencarian data jadwal dapat dilakukan berdasarkan Kode Mata Kuliah, Nama Mata Kuliah, atau Nama Dosen. |
| 4 | Setiap entitas jadwal yang ditampilkan wajib mencakup informasi Mata Kuliah, Dosen, Hari, Jam Mulai/Selesai, dan Ruangan. |

---

# 4. Fields & Validation

## 4.1 Fields

| Field | Tipe | Wajib | Keterangan | Contoh |
|---|---|---|---|---|
| `keyword` | text | Tidak | Kata kunci pencarian berdasarkan Nama/Kode Matkul atau Nama Dosen | `Rekayasa Perangkat Lunak` |
| `prodi` | select | Tidak | Filter berdasarkan Program Studi | `Teknik Informatika` |
| `hari` | select | Tidak | Filter berdasarkan hari pelaksanaan (`Senin`–`Sabtu`, disimpan sebagai kode hari 1–6) | `Senin` |

## 4.2 Validation

| Field | Aturan | Pesan Error |
|---|---|---|
| `keyword` | Maksimal 100 karakter | Kata kunci pencarian maksimal 100 karakter. |

---

# 5. Response & Kondisi Setelah Action

## 5.1 Jika Berhasil

**System:**

- Menampilkan daftar jadwal perkuliahan sesuai kriteria filter/pencarian.
- Menampilkan detail lengkap informasi jadwal jika suatu item dipilih.
- Menampilkan jumlah total jadwal perkuliahan yang ditemukan.

## 5.2 Jika Input Tidak Valid

**System:**

- Tampilkan pesan error validasi input pencarian.
- Pertahankan parameter pencarian sebelumnya.

**Error Message:**

> Kata kunci pencarian melebihi batas maksimal 100 karakter.

## 5.3 Jika Data Tidak Ditemukan

**System:**

- Tampilkan indikator/pesan bahwa data kosong.
- Sediakan tombol/opsi untuk me-reset pencarian atau filter.

**Message:**

> Data jadwal perkuliahan tidak ditemukan.

## 5.4 Jika Terjadi Kesalahan Sistem

**System:**

- Tampilkan pesan kesalahan sistem.
- Sediakan tombol untuk memuat ulang (*reload*) data.

**Message:**

> Gagal memuat data jadwal perkuliahan. Silakan coba beberapa saat lagi.

---

# 6. Acceptance Criteria

Fitur dianggap selesai apabila:

### Functional

- [ ] Admin dapat melihat daftar seluruh jadwal perkuliahan.
- [ ] Admin dapat menyaring jadwal berdasarkan prodi, hari, dan dosen.
- [ ] Admin dapat melakukan pencarian berdasarkan nama/kode mata kuliah atau nama dosen.
- [ ] Admin dapat melihat detail informasi jadwal yang dipilih.

### Validation

- [ ] Parameter input pencarian yang melebihi batas ditolak dengan pesan error yang sesuai.

### Error Handling

- [ ] Tampilan data kosong dimunculkan dengan jelas jika kriteria pencarian tidak ditemukan.
- [ ] Kesalahan server saat mengambil data ditangani dengan pesan error yang informatif.

---

# 7. Related Features

### Functional Requirement Terkait

- **FR-14 — Admin Login**
- **FR-21 — Admin Menambahkan Jadwal Perkuliahan**
- **FR-22 — Admin Mengubah Jadwal Perkuliahan**
- **FR-23 — Admin Menghapus Jadwal Perkuliahan**

### Flow yang Berhubungan

```text
[FR-14: Admin Login]
          ↓
[FR-20: Admin Melihat Jadwal Perkuliahan]
          │
          ├──► [FR-21: Admin Menambahkan Jadwal Perkuliahan]
          │
          ├──► [FR-22: Admin Mengubah Jadwal Perkuliahan]
          │
          └──► [FR-23: Admin Menghapus Jadwal Perkuliahan]
```

---

# 8. Status Dokumentasi

| Item | Status |
|---|---|
| Requirement | DRAFT |
| User Flow | DRAFT |
| Validation | DRAFT |
| Implementation | NOT STARTED |