# Roadmap — StudentConnect

> **Dokumen:** Roadmap Implementasi
> **Status:** Aktif
> **Tujuan:** Urutan fase implementasi dari fondasi sampai fitur lengkap.

---

## 1. Legenda Status

| Status | Arti |
|---|---|
| Selesai | Deliverable dan exit criteria terpenuhi |
| Sebagian | Sebagian deliverable selesai, ada blocker |
| Berjalan | Sedang dikerjakan |
| Belum | Belum dimulai |

---

## 2. Ringkasan Fase

| Fase | Fokus | FR | Status |
|---|---|---|---|
| M0 | Foundation: scaffold, dependency, schema, dokumentasi | — | Selesai |
| M1 | Autentikasi dan otorisasi | FR-1, FR-2, FR-6, FR-7, FR-14, FR-15 | Belum |
| M2 | Read views: jadwal dan materi | FR-3, FR-4, FR-5, FR-8, FR-9, FR-10 | Belum |
| M3 | Dosen mengelola materi | FR-11, FR-12, FR-13 | Belum |
| M4 | Admin mengelola pengguna dan jadwal | FR-16 s.d. FR-23 | Belum |
| M5 | PWA, E2E, hardening | NFR-1, NFR-2, NFR-3 | Belum |

---

## 3. M0 — Foundation

**Deliverable**

- Scaffold Next.js 16 terverifikasi.
- Dependency: Drizzle ORM, Neon driver, drizzle-kit, dotenv, tsx.
- shadcn/ui terpasang (style `base-rhea`, icon Tabler).
- Shell mobile `max-w-[640px]`, metadata, manifest PWA.
- Schema Drizzle 9 tabel dan baseline migrasi tergenerate, sudah sinkron dengan Q-05, Q-06, Q-07, dan Q-15.
- Dokumentasi fondasi: README, ROADMAP, ARCHITECTURE, MODULES, DATA_MODEL, OPEN_QUESTIONS.

**Exit criteria**

- [x] `npm run lint` lulus.
- [x] `npm run build` lulus.
- [x] Halaman awal dan manifest dapat diakses.
- [x] Migrasi SQL tergenerate di `drizzle/`.
- [x] Migrasi diterapkan ke Neon.
- [x] Seed data awal berjalan.
- [x] Enam dokumen fondasi tersedia.

**Blocker:** tidak ada. Migrasi dan seed berhasil pada 2026-11-14.

**Berikutnya:** M1 — autentikasi dan otorisasi.

---

## 4. M1 — Autentikasi dan Otorisasi

**FR:** FR-1, FR-2, FR-6, FR-7, FR-14, FR-15.

**Deliverable**

- Halaman login tunggal yang menerima email per peran (NIM untuk mahasiswa).
- Verifikasi password dan status akun aktif.
- Session cookie dan logout.
- Redirect per peran setelah login.
- Guard layout per peran dan validasi di server action.

**Exit criteria**

- Semua peran login melalui kolom `email`; mahasiswa memakai NIM pada kolom tersebut.
- Akun nonaktif ditolak.
- Logout menghapus session.
- Pengguna tidak dapat membuka route peran lain.
- E2E login/logout per peran lulus.

**Auth:** `bcryptjs` + `jose`, cookie `studentconnect_session` 7 hari, `AUTH_SECRET` (Q-02, Q-16).

---

## 5. M2 — Read Views

**FR:** FR-3, FR-4, FR-5, FR-8, FR-9, FR-10.

**Deliverable**

- Mahasiswa: daftar jadwal, daftar materi, detail materi.
- Dosen: daftar jadwal mengajar, daftar materi, detail materi.
- Filter materi berdasarkan program studi/kurikulum atau dosen.
- Empty state dan error state.

**Exit criteria**

- Mahasiswa hanya melihat jadwal dan materi pada kurikulum program studinya.
- Dosen hanya melihat jadwal dan materi pada mata kuliah yang diampu.
- Jadwal berstatus `dibatalkan` tidak tampil.
- Detail materi dapat dibuka dari daftar.

---

## 6. M3 — Dosen Mengelola Materi

**FR:** FR-11, FR-12, FR-13.

**Deliverable**

- Form tambah materi: judul, deskripsi, URL file, upload file.
- Form ubah materi.
- Hapus materi dengan konfirmasi.
- Validasi kepemilikan: dosen hanya mengubah materi pada mata kuliah yang diampu.
- Integrasi penyimpanan file Vercel Blob (Q-11, Q-14).
- Upload dan validasi file melalui server action.

**Exit criteria**

- Dosen dapat menambah, mengubah, dan menghapus materi miliknya.
- Aksi terhadap materi di luar kewenangan ditolak di server.
- File dapat diunduh dari URL hasil upload atau URL eksternal.
- Perubahan langsung terlihat pada daftar materi.

---

## 7. M4 — Admin Mengelola Pengguna dan Jadwal

**FR:** FR-16 s.d. FR-23.

**Deliverable**

- Daftar, tambah, ubah, nonaktifkan pengguna mahasiswa/dosen.
- Daftar, tambah, ubah, batalkan jadwal kuliah.
- Validasi bentrok ruangan dan dosen.
- Soft delete jadwal melalui `status = dibatalkan`.

**Exit criteria**

- Email dan NIM/kode unik.
- Password pengguna baru tersimpan sebagai hash.
- Akun nonaktif tidak dapat login.
- Jadwal bentrok ruangan atau dosen ditolak dengan pesan spesifik.
- `jamSelesai` wajib lebih besar dari `jamMulai`.
- Jadwal dibatalkan hilang dari tampilan mahasiswa dan dosen.

**Prasyarat:** migrasi schema untuk Q-05, Q-06, dan Q-07 sudah diterapkan; kredensial seed mengikuti Q-08 dan Q-18.

---

## 8. M5 — PWA, E2E, Hardening

**NFR:** NFR-1, NFR-2, NFR-3.

**Deliverable**

- Manifest PWA lengkap dengan ikon ukuran standar; tanpa service worker/offline (Q-09).
- Skenario E2E: login/logout, jadwal, materi, dan CRUD utama setiap role (Q-17).
- E2E dijalankan di CI.
- Audit akses: semua server action memeriksa session dan peran.
- Perapian pesan error, loading state, dan aksesibilitas dasar.

**Exit criteria**

- `npm run build` dan `npm run test:e2e` lulus, termasuk di CI.
- Semua FR memiliki minimal satu skenario E2E atau bukti verifikasi.
- Tidak ada route atau action tanpa pemeriksaan otorisasi.
- PWA dapat dipasang pada browser mobile.

---

## 9. Ketergantungan Antar Fase

```text
M0 Foundation
  -> M1 Auth
      -> M2 Read Views
          -> M3 Dosen Materi
          -> M4 Admin Pengguna dan Jadwal
              -> M5 PWA, E2E, Hardening
```

M3 dan M4 dapat berjalan paralel setelah M1 dan M2 selesai.

---

## 10. Referensi

- `docs/OVERVIEW.md`
- `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
- `docs/01-functional-requirements/NON FUNCTIONAL REQUIREMENT.md`
- `docs/OPEN_QUESTIONS.md`
