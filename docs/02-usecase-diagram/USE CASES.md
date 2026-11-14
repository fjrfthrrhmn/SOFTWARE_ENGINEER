# Use Cases — StudentConnect

> **Dokumen:** Daftar Use Case
> **Status:** Aktif
> **Sumber:** `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`, `UC-1 - Pengguna.md`, `UC-2 - Jadwal Kuliah.md`, `UC-3 - Materi Pembelajaran.md`
> **Tujuan:** Mendaftar seluruh use case per fitur dengan tautan ke spesifikasi detail.

---

## 1. Daftar Use Case

| No. | ID Use Case | Aktor | Use Case | Domain | Deskripsi | FR | Link Reference |
|---|---|---|---|---|---|---|---|
| 1 | UC-PGN-01 | Pengguna (Mahasiswa/Dosen/Admin) | Login Pengguna | Pengguna | Pengguna masuk menggunakan email (NIM untuk mahasiswa) dan password yang terdaftar. | FR-1, FR-6, FR-14 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 2 | UC-PGN-02 | Pengguna (Mahasiswa/Dosen/Admin) | Logout Pengguna | Pengguna | Pengguna keluar dari sistem dan sesi berakhir. | FR-2, FR-7, FR-15 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 3 | UC-PGN-03 | Admin | Melihat Daftar Data Pengguna | Pengguna | Admin melihat data pengguna mahasiswa dan dosen. | FR-16 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 4 | UC-PGN-04 | Admin | Menambahkan Pengguna | Pengguna | Admin menambahkan akun mahasiswa atau dosen. | FR-17 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 5 | UC-PGN-05 | Admin | Mengubah Data Pengguna | Pengguna | Admin mengubah data pengguna mahasiswa atau dosen. | FR-18 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 6 | UC-PGN-06 | Admin | Menonaktifkan Pengguna | Pengguna | Admin menonaktifkan akun pengguna mahasiswa atau dosen. | FR-19 | [UC-1 - Pengguna](<UC-1 - Pengguna.md>) |
| 7 | UC-JDW-01 | Mahasiswa | Melihat Jadwal Kuliah | Jadwal | Mahasiswa melihat jadwal perkuliahan pada kurikulum program studinya. | FR-3 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 8 | UC-JDW-02 | Dosen | Melihat Jadwal Mengajar | Jadwal | Dosen melihat jadwal perkuliahan dari mata kuliah yang diampu. | FR-8 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 9 | UC-JDW-03 | Admin | Melihat Jadwal Perkuliahan | Jadwal | Admin melihat data jadwal perkuliahan. | FR-20 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 10 | UC-JDW-04 | Admin | Menambahkan Jadwal Perkuliahan | Jadwal | Admin menambahkan jadwal perkuliahan ke dalam sistem. | FR-21 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 11 | UC-JDW-05 | Admin | Mengubah Jadwal Perkuliahan | Jadwal | Admin mengubah data jadwal perkuliahan. | FR-22 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 12 | UC-JDW-06 | Admin | Menghapus atau Membatalkan Jadwal Perkuliahan | Jadwal | Admin menghapus atau membatalkan jadwal sesuai aturan sistem. | FR-23 | [UC-2 - Jadwal Kuliah](<UC-2 - Jadwal Kuliah.md>) |
| 13 | UC-MTR-01 | Mahasiswa | Melihat Daftar Materi Pembelajaran | Materi | Mahasiswa melihat daftar materi pada mata kuliah di kurikulum program studinya. | FR-4 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 14 | UC-MTR-02 | Mahasiswa | Melihat Detail Materi Pembelajaran | Materi | Mahasiswa melihat detail materi pada mata kuliah di kurikulum program studinya. | FR-5 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 15 | UC-MTR-03 | Dosen | Melihat Daftar Materi Pembelajaran | Materi | Dosen melihat daftar materi pada mata kuliah yang diampu. | FR-9 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 16 | UC-MTR-04 | Dosen | Melihat Detail Materi Pembelajaran | Materi | Dosen melihat detail materi pada mata kuliah yang diampu. | FR-10 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 17 | UC-MTR-05 | Dosen | Menambahkan Materi Pembelajaran | Materi | Dosen menambahkan materi pada mata kuliah yang diampu. | FR-11 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 18 | UC-MTR-06 | Dosen | Mengubah Materi Pembelajaran | Materi | Dosen mengubah materi pada mata kuliah yang diampu. | FR-12 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |
| 19 | UC-MTR-07 | Dosen | Menghapus Materi Pembelajaran | Materi | Dosen menghapus materi pada mata kuliah yang diampu. | FR-13 | [UC-3 - Materi Pembelajaran](<UC-3 - Materi Pembelajaran.md>) |

---

## 2. Referensi

- `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
- `docs/02-usecase-diagram/UC-1 - Pengguna.md`
- `docs/02-usecase-diagram/UC-2 - Jadwal Kuliah.md`
- `docs/02-usecase-diagram/UC-3 - Materi Pembelajaran.md`
- `docs/06-sequence-diagram/SEQUANCE DIAGRAM.md`
