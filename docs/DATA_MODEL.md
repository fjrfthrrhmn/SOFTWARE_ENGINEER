# Data Model — StudentConnect

> **Dokumen:** Data Model
> **Status:** Aktif
> **Sumber:** `docs/04-entity-relationship-diagram/ERD.xml`, `docs/03-class-diagram/CLASS_DIAGRAM.plantUML`
> **Implementasi:** `src/db/schema.ts`
> **Migrasi:** `drizzle/0000_tense_rocket_raccoon.sql`

---

## 1. Enum

| Nama | Nilai | Dipakai di |
|---|---|---|
| `role` | `mahasiswa`, `dosen`, `admin` | `pengguna.role` |
| `status_pengguna` | `aktif`, `nonaktif` | `pengguna.status` |
| `status_jadwal` | `aktif`, `dibatalkan` | `jadwal_kuliah.status` |

Nilai enum disimpan sebagai tipe enum PostgreSQL.

---

## 2. Tabel

Semua tabel memakai primary key `bigserial` dan kolom `created_at`, `updated_at` bertipe `timestamptz`, `not null`, default `now()`.

### 2.1 `pengguna`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `email` | text | not null, unique |
| `password_hash` | text | not null |
| `role` | `role` | not null |
| `status` | `status_pengguna` | not null, default `aktif` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

`email` menyimpan identifier login. Untuk mahasiswa berisi NIM (Q-01); dosen dan admin memakai email (Q-10).

### 2.2 `program_studi`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `nama` | text | not null, unique |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

### 2.3 `mahasiswa`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `nim` | text | not null, unique |
| `nama` | text | not null |
| `angkatan` | integer | not null |
| `id_pengguna` | bigint | not null, unique, FK `pengguna.id` |
| `id_program_studi` | bigint | not null, FK `program_studi.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

Relasi 1-1 dengan `pengguna`.

### 2.4 `dosen`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `kode_dosen` | text | not null, unique |
| `nama` | text | not null |
| `id_pengguna` | bigint | not null, unique, FK `pengguna.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

Relasi 1-1 dengan `pengguna`.

### 2.5 `admin`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `nama` | text | not null |
| `id_pengguna` | bigint | not null, unique, FK `pengguna.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

Relasi 1-1 dengan `pengguna`.

### 2.6 `mata_kuliah`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `kode_mata_kuliah` | text | not null, unique |
| `nama_mata_kuliah` | text | not null |
| `sks` | integer | not null |
| `deskripsi` | text | nullable |
| `id_dosen` | bigint | not null, FK `dosen.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

`id_dosen` adalah dosen pengampu utama.

### 2.7 `kurikulum`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `tahun_kurikulum` | text | not null |
| `id_program_studi` | bigint | not null, FK `program_studi.id` |
| `id_mata_kuliah` | bigint | not null, FK `mata_kuliah.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

Unique gabungan: `(id_program_studi, id_mata_kuliah, tahun_kurikulum)`.

Tabel ini adalah join table antara program studi dan mata kuliah. `tahun_kurikulum` memakai teks periode, mis. `2024/2025` (Q-07, Q-15).

### 2.8 `jadwal_kuliah`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `hari` | integer | not null, kode 1-6 |
| `jam_mulai` | time | not null |
| `jam_selesai` | time | not null |
| `ruangan` | text | not null |
| `status` | `status_jadwal` | not null, default `aktif` |
| `id_kurikulum` | bigint | not null, FK `kurikulum.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

`jadwal_kuliah` tidak menyimpan `nama` (Q-06) dan `id_dosen` (Q-05). Dosen jadwal sama dengan dosen pengampu dan diturunkan melalui `kurikulum → mata_kuliah`.

### 2.9 `materi`

| Kolom | Tipe | Constraint |
|---|---|---|
| `id` | bigserial | PK |
| `judul` | text | not null |
| `deskripsi` | text | nullable |
| `file_url` | text | not null |
| `id_mata_kuliah` | bigint | not null, FK `mata_kuliah.id` |
| `id_dosen` | bigint | not null, FK `dosen.id` |
| `created_at` | timestamptz | not null, default now |
| `updated_at` | timestamptz | not null, default now |

`file_url` menampung URL eksternal atau URL hasil upload Vercel Blob (Q-03, Q-11, Q-14).

---

## 3. Relasi

| Dari | Ke | Kardinalitas |
|---|---|---|
| `pengguna` | `mahasiswa` | 1-1 |
| `pengguna` | `dosen` | 1-1 |
| `pengguna` | `admin` | 1-1 |
| `program_studi` | `mahasiswa` | 1-N |
| `program_studi` | `kurikulum` | 1-N |
| `mata_kuliah` | `kurikulum` | 1-N |
| `dosen` | `mata_kuliah` | 1-N |
| `kurikulum` | `jadwal_kuliah` | 1-N |
| `dosen` | `materi` | 1-N |
| `mata_kuliah` | `materi` | 1-N |

Dosen pada jadwal diakses melalui `kurikulum → mata_kuliah`; tidak ada FK langsung dari `jadwal_kuliah` ke `dosen` (Q-05).

---

## 4. Aturan yang Tidak Ditegakkan di Database

Aturan berikut berada di service layer karena melibatkan beberapa baris atau logika waktu:

| Aturan | Lokasi | Alasan |
|---|---|---|
| `jam_selesai > jam_mulai` | Service jadwal | Mudah berubah, pesan error spesifik |
| Bentrok ruangan pada hari dan interval waktu | Service jadwal | Butuh query overlap |
| Bentrok dosen pada hari dan interval waktu | Service jadwal | Butuh query overlap; dosen diambil dari `mata_kuliah` |
| Dosen jadwal = dosen pengampu | Service jadwal | Diturunkan melalui `kurikulum → mata_kuliah` (Q-05) |
| Kepemilikan materi oleh dosen pengampu | Service materi | Butuh join `materi` dan `mata_kuliah` |
| Status akun aktif saat login | Auth | Butuh cek `pengguna.status` |
| Jadwal dibatalkan tidak tampil | Query read | Filter `status = 'aktif'` |

Soft delete jadwal memakai `status = 'dibatalkan'`, bukan `DELETE` (Q-04).

---

## 5. Rekonsiliasi ERD dan Class Diagram

| Isu | ERD | Class Diagram | Implementasi |
|---|---|---|---|
| Dosen pada mata kuliah dan jadwal | `mata_kuliah.id_dosen` dan `jadwal_kuliah.id_dosen` | `MataKuliah 1--1 Dosen`, `Dosen 1--* JadwalKuliah` | Hanya `mata_kuliah.id_dosen`. `jadwal_kuliah.id_dosen` dihapus; dosen jadwal diturunkan lewat `kurikulum`. Status: Q-05 dijawab |
| `jadwal_kuliah.nama` | Ada | Tidak ada | Dihapus. Status: Q-06 dijawab |
| Atribut `kurikulum` | Hanya FK program studi dan mata kuliah | Class kosong | Tambah `tahun_kurikulum` text; unique gabungan termasuk tahun. Status: Q-07 dan Q-15 dijawab |
| Relasi prodi ke mata kuliah | Lewat `kurikulum` | Lewat `kurikulum` | Sesuai |
| Login mahasiswa | `pengguna.email` | `Pengguna.email` | Diisi NIM untuk mahasiswa. Status: Q-01 dijawab |

Perbedaan sudah diputuskan di `docs/OPEN_QUESTIONS.md` dan wajib diikuti implementasinya.

---

## 6. Data Seed

`src/db/seed.ts` membuat:

- 1 admin: email dari `SEED_ADMIN_EMAIL`.
- 1 program studi: Teknik Informatika.
- 1 dosen: Budi Santoso, M.Kom.
- 1 mahasiswa: NIM `23123456`, angkatan 2023.
- 1 mata kuliah: COMP6047 Rekayasa Perangkat Lunak.
- 1 kurikulum, 1 jadwal Senin 08:00-10:30 di B201, 1 materi.

`SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD` wajib diisi. Seed gagal jika salah satu kosong; tidak ada password default (Q-08, Q-18).

Seed bersifat idempoten secara kasar: jika tabel `pengguna` sudah berisi data, seed dilewati.

Implementasi `src/db/seed.ts` memakai `bcryptjs` (`hashSync`, cost 10) agar hash seed dapat diverifikasi auth M1 (D-11). Email admin diambil dari `SEED_ADMIN_EMAIL`; seed gagal sebelum menulis database jika email/password kosong atau password kurang dari 8 karakter.

---

## 7. Migrasi

```bash
npm run db:generate   # menghasilkan SQL dari schema
npm run db:migrate    # menerapkan ke Neon
npm run db:seed       # data awal
```

File migrasi awal: `drizzle/0000_tense_rocket_raccoon.sql`.

Baseline migrasi diregenerasi pada M0 setelah schema disinkronkan dengan Q-05, Q-06, Q-07, dan Q-15 (`jadwal_kuliah.id_dosen` dan `nama` dihapus, `kurikulum.tahun_kurikulum` ditambah). Regenerasi aman karena database Neon belum pernah dimigrasikan (D-26). Perubahan schema berikutnya wajib lewat `db:generate`; jangan mengubah database manual tanpa migrasi.

---

## 8. Referensi

- `docs/04-entity-relationship-diagram/ERD.xml`
- `docs/03-class-diagram/CLASS_DIAGRAM.plantUML`
- `src/db/schema.ts`
- `docs/OPEN_QUESTIONS.md`
