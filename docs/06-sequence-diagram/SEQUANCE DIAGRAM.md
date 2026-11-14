# Sequence Diagram — StudentConnect

> **Dokumen:** Daftar Sequence Diagram
> **Status:** Aktif
> **Sumber:** `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`, `docs/06-sequence-diagram/*.plantUML`
> **Tujuan:** Mendaftar sequence diagram per fitur dengan tautan ke sumber `.plantUML`.

Catatan: tautan referensi memakai file `.plantUML` sebagai sumber. File `.png` hanya hasil render dan tidak dijadikan acuan.

---

## 1. Daftar Sequence Diagram

| No. | FR | Aktor | Fitur | Domain | Diagram | Link Reference |
|---|---|---|---|---|---|---|
| 1 | FR-1 | Mahasiswa | Login | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 2 | FR-2 | Mahasiswa | Logout | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 3 | FR-3 | Mahasiswa | Melihat Jadwal Kuliah | Jadwal | SQ-3 Lihat Jadwal | [SQ-3](<SQ-3 - JadwalKuliah - Lihat.plantUML>) |
| 4 | FR-4 | Mahasiswa | Melihat Daftar Materi Pembelajaran | Materi | SQ-6 Lihat Daftar dan Detail | [SQ-6](<SQ-6 - Materi - Lihat Daftar dan Detail.plantUML>) |
| 5 | FR-5 | Mahasiswa | Melihat Detail Materi Pembelajaran | Materi | SQ-6 Lihat Daftar dan Detail | [SQ-6](<SQ-6 - Materi - Lihat Daftar dan Detail.plantUML>) |
| 6 | FR-6 | Dosen | Login | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 7 | FR-7 | Dosen | Logout | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 8 | FR-8 | Dosen | Melihat Jadwal Mengajar | Jadwal | SQ-4 Melihat Jadwal Mengajar | [SQ-4](<SQ-4 - JadwalKuliah - Melihat Jadwal Mengajar.plantUML>) |
| 9 | FR-9 | Dosen | Melihat Daftar Materi Pembelajaran | Materi | SQ-6 Lihat Daftar dan Detail | [SQ-6](<SQ-6 - Materi - Lihat Daftar dan Detail.plantUML>) |
| 10 | FR-10 | Dosen | Melihat Detail Materi Pembelajaran | Materi | SQ-6 Lihat Daftar dan Detail | [SQ-6](<SQ-6 - Materi - Lihat Daftar dan Detail.plantUML>) |
| 11 | FR-11 | Dosen | Menambahkan Materi Pembelajaran | Materi | SQ-7 Mengelola Materi | [SQ-7](<SQ-7 - Materi - Mengelola.plantUML>) |
| 12 | FR-12 | Dosen | Mengubah Materi Pembelajaran | Materi | SQ-7 Mengelola Materi | [SQ-7](<SQ-7 - Materi - Mengelola.plantUML>) |
| 13 | FR-13 | Dosen | Menghapus Materi Pembelajaran | Materi | SQ-7 Mengelola Materi | [SQ-7](<SQ-7 - Materi - Mengelola.plantUML>) |
| 14 | FR-14 | Admin | Login | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 15 | FR-15 | Admin | Logout | Pengguna | SQ-1 Login dan Logout | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| 16 | FR-16 | Admin | Melihat Daftar Data Pengguna | Pengguna | SQ-2 Mengelola Pengguna | [SQ-2](<SQ-2 - Pengguna - Mengelola.plantUML>) |
| 17 | FR-17 | Admin | Menambahkan Pengguna | Pengguna | SQ-2 Mengelola Pengguna | [SQ-2](<SQ-2 - Pengguna - Mengelola.plantUML>) |
| 18 | FR-18 | Admin | Mengubah Data Pengguna | Pengguna | SQ-2 Mengelola Pengguna | [SQ-2](<SQ-2 - Pengguna - Mengelola.plantUML>) |
| 19 | FR-19 | Admin | Menonaktifkan Pengguna | Pengguna | SQ-2 Mengelola Pengguna | [SQ-2](<SQ-2 - Pengguna - Mengelola.plantUML>) |
| 20 | FR-20 | Admin | Melihat Jadwal Perkuliahan | Jadwal | SQ-5 Mengelola Jadwal | [SQ-5](<SQ-5 - JadwalKuliah - Mengelola.plantUML>) |
| 21 | FR-21 | Admin | Menambahkan Jadwal Perkuliahan | Jadwal | SQ-5 Mengelola Jadwal | [SQ-5](<SQ-5 - JadwalKuliah - Mengelola.plantUML>) |
| 22 | FR-22 | Admin | Mengubah Jadwal Perkuliahan | Jadwal | SQ-5 Mengelola Jadwal | [SQ-5](<SQ-5 - JadwalKuliah - Mengelola.plantUML>) |
| 23 | FR-23 | Admin | Menghapus atau Membatalkan Jadwal Perkuliahan | Jadwal | SQ-5 Mengelola Jadwal | [SQ-5](<SQ-5 - JadwalKuliah - Mengelola.plantUML>) |

---

## 2. Ringkasan Diagram

| Diagram | Nama | FR | File |
|---|---|---|---|
| SQ-1 | Pengguna - Login dan Logout | FR-1, FR-2, FR-6, FR-7, FR-14, FR-15 | [SQ-1](<SQ-1 - Pengguna - Login dan Logout.plantUML>) |
| SQ-2 | Pengguna - Mengelola | FR-16, FR-17, FR-18, FR-19 | [SQ-2](<SQ-2 - Pengguna - Mengelola.plantUML>) |
| SQ-3 | JadwalKuliah - Lihat | FR-3 | [SQ-3](<SQ-3 - JadwalKuliah - Lihat.plantUML>) |
| SQ-4 | JadwalKuliah - Melihat Jadwal Mengajar | FR-8 | [SQ-4](<SQ-4 - JadwalKuliah - Melihat Jadwal Mengajar.plantUML>) |
| SQ-5 | JadwalKuliah - Mengelola | FR-20, FR-21, FR-22, FR-23 | [SQ-5](<SQ-5 - JadwalKuliah - Mengelola.plantUML>) |
| SQ-6 | Materi - Lihat Daftar dan Detail | FR-4, FR-5, FR-9, FR-10 | [SQ-6](<SQ-6 - Materi - Lihat Daftar dan Detail.plantUML>) |
| SQ-7 | Materi - Mengelola | FR-11, FR-12, FR-13 | [SQ-7](<SQ-7 - Materi - Mengelola.plantUML>) |

---

## 3. Referensi

- `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
- `docs/02-usecase-diagram/USE CASES.md`
- `docs/06-sequence-diagram/`
