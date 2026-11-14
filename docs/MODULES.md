# Modules — StudentConnect

> **Dokumen:** Modul Sistem
> **Status:** Aktif
> **Tujuan:** Mendokumentasikan pembagian modul, tanggung jawab, antarmuka layanan, dependency, dan hak akses per peran.

---

## Ringkasan Arsitektur

| Nama Modul    | Lokasi Direktori       | Tanggung Jawab Utama                                                     |
| :------------ | :--------------------- | :----------------------------------------------------------------------- |
| **Auth**      | `src/modules/auth`     | Autentikasi, sesi, logout, dan pemeriksaan peran.                        |
| **Users**     | `src/modules/users`    | Data pengguna, profil mahasiswa/dosen/admin, dan status akun.            |
| **Schedules** | `src/modules/schedules` | Jadwal perkuliahan, pencegahan bentrok, dan pembatalan jadwal.           |
| **Materials** | `src/modules/materials` | Materi pembelajaran, file materi, dan kepemilikan materi oleh dosen.     |

Data referensi akademik (`program_studi`, `mata_kuliah`, `kurikulum`) bukan modul tersendiri karena tidak memiliki FR CRUD. Data ini di-seed dan dibaca oleh modul Schedules dan Materials.

### Struktur Internal Modul

| Berkas              | Peran                                                                 |
| :------------------ | :-------------------------------------------------------------------- |
| `actions.ts`        | Server action: pintu mutasi, cek sesi/peran, validasi input.          |
| `service.ts`        | Aturan bisnis yang tidak bergantung pada UI.                          |
| `repository.ts`     | Query Drizzle ke database. Tidak dipakai Auth; Auth memakai Users.    |
| `schema.ts`         | Schema Zod untuk validasi klien dan server.                           |
| `types.ts`          | Tipe data khusus modul.                                               |
| `components/`       | Komponen UI yang hanya dipakai modul tersebut.                        |

Alur pemanggilan: `page.tsx` → `actions.ts` → `service.ts` → `repository.ts` → `src/db`.

---

## Detail Modul

### 1. Modul Auth (`src/modules/auth`)

* **Deskripsi:** Menangani login, logout, pembacaan sesi, dan penjagaan akses berdasarkan peran. Modul ini tidak menyimpan tabel sendiri; kredensial dibaca dari tabel `pengguna` melalui modul Users.
* **Entity:** `pengguna` (baca), `mahasiswa`, `dosen`, `admin` (untuk menentukan profil aktif).
* **FR terkait:** FR-1, FR-2, FR-6, FR-7, FR-14, FR-15.
* **Antarmuka Publik / Layanan Utama:**
  * `login({ email, password })`: Memvalidasi kredensial, memeriksa status `aktif`, lalu membuat sesi.
  * `logout()`: Menghapus cookie sesi.
  * `getSession()`: Mengembalikan sesi aktif atau `null`.
  * `requireRole(allowedRoles)`: Menolak akses bila sesi tidak ada atau peran tidak diizinkan.
* **Aturan Bisnis:**
  * Semua peran login melalui kolom `email`;(Q-01, Q-10).
  * Akun `nonaktif` tidak dapat login.
  * Password di-hash dengan `bcryptjs` dan tidak pernah disimpan plaintext (Q-02).
  * JWT dibuat/diverifikasi dengan `jose`, berlaku 7 hari tanpa refresh token, dan disimpan pada cookie `studentconnect_session` yang `HttpOnly`, `Secure` di produksi, serta `SameSite=Lax` (Q-16).
  * Secret diambil dari environment `AUTH_SECRET`.
  * Pemeriksaan peran dilakukan di server action, bukan hanya di UI.
* **Ketergantungan (Dependencies):**
  * **Internal:** `Users` (lookup kredensial dan profil), `src/lib/auth.ts` (primitif sesi).
  * **Eksternal:** `bcryptjs`, `jose`, dan environment `AUTH_SECRET`. Seed memakai `bcryptjs`.

### 2. Modul Users (`src/modules/users`)

* **Deskripsi:** Mengelola data pengguna dan profil per peran. Admin dapat melihat, menambah, mengubah, dan menonaktifkan mahasiswa/dosen. Pengguna lain hanya dapat melihat profilnya sendiri.
* **Entity:** `pengguna`, `mahasiswa`, `dosen`, `admin`, `program_studi` (baca).
* **FR terkait:** FR-16, FR-17, FR-18, FR-19.
* **Antarmuka Publik / Layanan Utama:**
  * `listUsers(filter)`: Daftar mahasiswa/dosen untuk admin.
  * `getUser(id)`: Detail pengguna untuk admin.
  * `getProfile(userId)`: Profil milik pengguna yang sedang login.
  * `createUser(input)`: Menambah mahasiswa atau dosen beserta profilnya.
  * `updateUser(id, input)`: Mengubah data pengguna dan profilnya.
  * `deactivateUser(id)`: Mengubah status menjadi `nonaktif`.
* **Aturan Bisnis:**
  * `email` unik. Untuk mahasiswa, `email` diisi NIM (Q-01).
  * Satu `pengguna` hanya memiliki satu profil sesuai peran.
  * Admin hanya dapat menambah peran mahasiswa atau dosen (FR-17).
  * Menonaktifkan pengguna tidak menghapus data (FR-19).
  * Password baru disimpan sebagai hash; password lama tidak pernah dikembalikan ke UI.
* **Ketergantungan (Dependencies):**
  * **Internal:** `src/lib/auth.ts` (sesi dan guard), data referensi `program_studi`.
  * **Eksternal:** `zod`, Drizzle ORM.

### 3. Modul Schedules (`src/modules/schedules`)

* **Deskripsi:** Menyediakan jadwal sesuai peran dan menangani CRUD jadwal oleh admin, termasuk validasi bentrok ruangan dan dosen serta pembatalan tanpa menghapus baris.
* **Entity:** `jadwal_kuliah`, `kurikulum`, `mata_kuliah`, `dosen` (baca).
* **FR terkait:** FR-3, FR-8, FR-20, FR-21, FR-22, FR-23.
* **Antarmuka Publik / Layanan Utama:**
  * `listSchedules(actor)`: Mahasiswa melihat jadwal prodi, dosen melihat jadwal mengajar, admin melihat semua.
  * `createSchedule(input)`: Menambah jadwal setelah validasi waktu dan bentrok.
  * `updateSchedule(id, input)`: Mengubah jadwal dengan validasi yang sama.
  * `cancelSchedule(id)`: Soft delete dengan `status = 'dibatalkan'`.
  * `findConflicts(input)`: Fungsi internal untuk mendeteksi bentrok ruangan/dosen.
* **Aturan Bisnis:**
  * `jamSelesai` harus lebih besar dari `jamMulai`.
  * Ruangan yang sama tidak boleh bentrok pada hari dan interval waktu yang sama.
  * Dosen yang sama tidak boleh mengajar di dua ruangan pada waktu yang sama.
  * Jadwal `dibatalkan` tidak tampil untuk mahasiswa dan dosen.
  * Mahasiswa melihat jadwal pada kurikulum program studinya.
  * Dosen melihat jadwal mata kuliah yang diampu; dosen jadwal diturunkan dari `kurikulum → mata_kuliah`.
  * Dosen jadwal sama dengan dosen pengampu, tanpa dosen pengganti; `jadwal_kuliah.id_dosen` tidak disimpan (Q-05).
  * `jadwal_kuliah.nama` dihapus (Q-06); jadwal berlaku saat ini tanpa periode/semester (Q-12).
  * Aturan verifikasi riwayat absensi dihapus dari scope (Q-13).
* **Ketergantungan (Dependencies):**
  * **Internal:** `Users` (identitas dosen), data referensi akademik `kurikulum` dan `mata_kuliah`, `src/lib/auth.ts`.
  * **Eksternal:** `zod`, Drizzle ORM.

### 4. Modul Materials (`src/modules/materials`)

* **Deskripsi:** Menampilkan daftar dan detail materi sesuai hak akses, serta menyediakan CRUD materi bagi dosen pengampu. File dapat berupa URL eksternal atau URL Vercel Blob.
* **Entity:** `materi`, `mata_kuliah`, `kurikulum`, `dosen` (baca).
* **FR terkait:** FR-4, FR-5, FR-9, FR-10, FR-11, FR-12, FR-13.
* **Antarmuka Publik / Layanan Utama:**
  * `listMaterials(actor, courseId?)`: Daftar materi sesuai peran dan filter mata kuliah.
  * `getMaterial(actor, id)`: Detail materi setelah pemeriksaan akses.
  * `createMaterial(input)`: Menambah materi pada mata kuliah yang diampu.
  * `updateMaterial(id, input)`: Mengubah materi milik dosen.
  * `deleteMaterial(id)`: Hard delete setelah konfirmasi.
  * `assertMaterialAccess(actor, material)`: Fungsi internal untuk memeriksa kepemilikan dan visibilitas.
* **Aturan Bisnis:**
  * Dosen hanya mengelola materi pada mata kuliah yang diampu.
  * Mahasiswa hanya melihat materi pada mata kuliah di kurikulum program studinya.
  * `fileUrl` mendukung URL eksternal dan URL Vercel Blob (Q-03, Q-11, Q-14).
  * Upload dan validasi file dilakukan di server action.
  * `materi.id_dosen` dan `materi.id_mata_kuliah` harus konsisten dengan dosen pengampu.
  * Hapus materi adalah hard delete; konfirmasi wajib.
  * File di storage tidak otomatis terhapus sampai aturan retensi ditentukan.
* **Ketergantungan (Dependencies):**
  * **Internal:** `Users` (identitas dosen), data referensi akademik `kurikulum` dan `mata_kuliah`, `src/lib/auth.ts`.
  * **Eksternal:** `zod`, Drizzle ORM, `@vercel/blob` dan `BLOB_READ_WRITE_TOKEN`.

---

## Matriks Izin

| Kemampuan                   | Mahasiswa            | Dosen                          | Admin             |
| :-------------------------- | :------------------- | :----------------------------- | :---------------- |
| Login dan logout            | Ya                   | Ya                             | Ya                |
| Lihat profil sendiri        | Ya                   | Ya                             | Ya                |
| Lihat jadwal                | Jadwal prodi sendiri | Jadwal mengajar sendiri        | Semua jadwal      |
| Lihat materi                | Materi prodi sendiri | Materi mata kuliah yang diampu | Tidak termasuk FR |
| Tambah materi               | Tidak                | Ya, mata kuliah yang diampu    | Tidak             |
| Ubah materi                 | Tidak                | Ya, mata kuliah yang diampu    | Tidak             |
| Hapus materi                | Tidak                | Ya, mata kuliah yang diampu    | Tidak             |
| Lihat pengguna              | Tidak                | Tidak                          | Ya                |
| Tambah/ubah pengguna        | Tidak                | Tidak                          | Ya                |
| Nonaktifkan pengguna        | Tidak                | Tidak                          | Ya                |
| Tambah/ubah/batalkan jadwal | Tidak                | Tidak                          | Ya                |

Admin tidak diberi akses materi karena tidak tercantum pada FR.

---

## Batas Modul dan Kepemilikan Data

```text
ProgramStudi 1---* Kurikulum *---1 MataKuliah
                                     |
                                     * Materi
                                     |
Dosen 1---* MataKuliah
Dosen 1---* Materi
Kurikulum 1---* JadwalKuliah
```

Aturan kepemilikan:

* Materi milik dosen pengampu: `materi.id_dosen` harus sama dengan `mata_kuliah.id_dosen` untuk mata kuliah terkait.
* Jadwal tidak menyimpan `id_dosen`; dosen jadwal sama dengan dosen pengampu mata kuliah dan diturunkan melalui `kurikulum` (Q-05).
* Modul tidak mengakses tabel modul lain secara langsung. Akses lintas modul lewat repository atau service modul pemilik data.
* Server action adalah satu-satunya pintu mutasi; halaman hanya membaca lewat repository/service.

---

## Urutan Implementasi Modul

1. Auth dan Users (M1): fondasi identitas, sesi, dan peran.
2. Data referensi akademik dan read view jadwal/materi (M2).
3. Materials CRUD dosen (M3).
4. Users dan Schedules CRUD admin (M4).
5. Hardening, PWA, dan E2E (M5).

Alasan: semua modul lain bergantung pada identitas dan peran.

---

## Referensi

* `docs/ARCHITECTURE.md`
* `docs/DATA_MODEL.md`
* `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
* `docs/OPEN_QUESTIONS.md`
