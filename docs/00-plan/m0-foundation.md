# M0 — Foundation

> **Dokumen:** Implementation Plan
> **Fase:** M0 — Foundation
> **Status:** Selesai
> **Tujuan:** Menyiapkan fondasi teknis dan dokumentasi sebelum implementasi fitur FR-1 s.d. FR-23.

---

## 1. Tujuan Fase

M0 menghasilkan:

1. Scaffold Next.js yang terverifikasi dan siap dikembangkan.
2. Dependency inti terpasang dengan alasan yang jelas.
3. Dokumentasi fondasi (6 file) di `docs/`.
4. Fondasi database (schema Drizzle + koneksi Neon) siap dimigrasikan.

M0 **tidak** mengerjakan: halaman login, CRUD, UI fitur, auth, upload file, PWA service worker. Semua itu masuk M1+.

---

## 2. Kondisi Awal (Terverifikasi)

| Item | Nilai |
|---|---|
| Node.js | v24.18.0 |
| npm | 11.16.0 |
| Next.js | 16.4.6 (App Router, Turbopack) |
| React | 19.3.0 |
| TypeScript | strict, alias `@/*` → `./src/*` |
| Tailwind CSS | 4.3.3 via `@tailwindcss/turbopack` |
| ESLint | eslint-config-next 16.4.6 |
| E2E | `e2e` + `@e2e-dev/web`, config `e2e.config.ts` |
| Data layer | Belum ada (Drizzle **diputuskan**) |
| Auth | `bcryptjs` + `jose`, cookie 7 hari (**diputuskan**) |
| File materi | URL + upload Vercel Blob (**diputuskan**) |
| Delete jadwal | Soft delete via `status` (**diputuskan**) |

Catatan: `AGENTS.md` menyatakan versi Next.js ini memiliki breaking changes. Sebelum menulis kode Next.js, baca panduan relevan di `node_modules/next/dist/docs/01-app/`.

---

## 3. Langkah 0 — Baca Dokumentasi Next.js 16

Wajib sebelum coding:

- `node_modules/next/dist/docs/01-app/01-getting-started/` — routing, layouts, server/client components.
- `node_modules/next/dist/docs/01-app/02-guides/` — data fetching, forms, server actions, caching.
- `node_modules/next/dist/docs/01-app/03-api-reference/` — `next.config.ts`, metadata, route handlers.

Konfigurasi saat ini memakai `cacheComponents: true`, `partialPrefetching: true`, dan `experimental.agentFeedback`. Pahami dampaknya sebelum menambah halaman.

---

## 4. Langkah 1 — Verifikasi dan Konfigurasi Scaffold

Scaffold `create-next-app` sudah ada. **Jangan** membuat ulang. Verifikasi lalu sesuaikan:

1. Pastikan `npm run dev` berjalan tanpa error.
2. Update `src/app/layout.tsx`:
   - `lang="id"`.
   - `metadata` → `title: "StudentConnect"`, `description` sesuai `docs/OVERVIEW.md`.
   - `viewport` untuk mobile.
3. Mobile shell:
   - Wrapper konten `max-w-[640px] mx-auto` (spesifikasi `Maximum Width: 640px`, mobile only).
   - Samakan `globals.css`: font, warna dasar, hilangkan sisa template.
4. PWA minimum (tanpa dependency baru):
   - `src/app/manifest.ts` berisi name, short_name, `display: "standalone"`, `start_url: "/"`, theme/background color.
   - Ikon di `public/`.
   - Service worker/offline tidak termasuk scope (Q-09).
5. Environment:
   - Tambah `.env.example` berisi `DATABASE_URL=`, `AUTH_SECRET=`, `SEED_ADMIN_EMAIL=`, `SEED_ADMIN_PASSWORD=`, dan `BLOB_READ_WRITE_TOKEN=`.
   - `.gitignore` saat ini mengabaikan `.env*`; tambahkan pengecualian `!.env.example`.
   - Jangan commit `.env.local`.
6. Jangan hapus `src/app/page.tsx`. Ubah copywriting-nya agar sesuai proyek StudentConnect (judul, deskripsi, CTA ke login) dan tetap dipakai sebagai smoke test.

---

## 5. Langkah 2 — Dependency

### 5.1 Pasang

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit dotenv tsx
```

| Paket | Jenis | Alasan |
|---|---|---|
| `drizzle-orm` | production | Query builder + schema typed (keputusan tim). |
| `@neondatabase/serverless` | production | Driver Neon; cocok untuk Vercel. |
| `drizzle-kit` | dev | Generate + migrate schema. |
| `dotenv` | dev | `drizzle.config.ts` dan seed membaca `.env.local`. |
| `tsx` | dev | Menjalankan seed TypeScript + alias `@/`. |

### 5.2 Ditunda (jangan pasang dulu)

| Kebutuhan | Kandidat | Ditunggu sampai |
|---|---|---|
| Auth session | `bcryptjs` + `jose` | `bcryptjs` dipasang di M0 untuk seed (D-27); `jose` di M1 (Q-02, Q-16) |
| Validasi form | `zod` | Pola validasi dipilih di M1 |
| Upload materi | `@vercel/blob` | M3 (Q-11, Q-14) |
| PWA offline | Tidak dipakai | Di luar scope (Q-09) |
| Unit test | — | Hanya jika dibutuhkan; E2E sudah ada |

### 5.3 Script `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test:e2e": "e2e run",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:seed": "tsx src/db/seed.ts"
  }
}
```

---

## 6. Langkah 3 — Fondasi Database

Buat file berikut:

| File | Isi |
|---|---|
| `drizzle.config.ts` | `dialect: "postgresql"`, `schema: "./src/db/schema.ts"`, `out: "./drizzle"`, URL dari `.env.local` via `dotenv`. |
| `src/db/schema.ts` | Semua tabel + enum + relasi dari `docs/04-entity-relationship-diagram/ERD.xml`. |
| `src/db/index.ts` | Koneksi `drizzle-orm/neon-http` + export `db`. |
| `src/db/seed.ts` | Data awal: 1 admin, contoh prodi, dosen, mahasiswa, mata kuliah, kurikulum, jadwal, materi. |
| `drizzle/` | Hasil generate migrasi (dibuat oleh `drizzle-kit`). |

Tabel minimum M0: `Pengguna`, `Mahasiswa`, `Dosen`, `Admin`, `ProgramStudi`, `MataKuliah`, `Kurikulum`, `JadwalKuliah`, `Materi`.

Enum usulan (final di `DATA_MODEL.md`):

- `role`: `mahasiswa | dosen | admin`
- `status` pengguna: `aktif | nonaktif`
- `status` jadwal: `aktif | dibatalkan` (soft delete, **diputuskan**)

Perintah:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Aturan turunan jadwal (bentrok ruangan/dosen, `jamSelesai > jamMulai`) **tidak** ditegakkan di CHECK constraint M0; diimplementasikan di service layer M4. Catat di `DATA_MODEL.md`.

---

## 7. Langkah 4 — Dokumentasi Fondasi (File 1–6)

Output berada di `docs/` (bukan `docs/00-plan/`), bahasa Indonesia. `m0-foundation.md` tetap di `docs/00-plan/`.

| No. | File | Isi | Bergantung pada |
|---|---|---|---|
| 1 | `docs/README.md` | Index dokumen, urutan baca, source of truth, status. **Gunakan template pada 7.1.** | — |
| 2 | `docs/ROADMAP.md` | Fase M0–M5, mapping FR-1…FR-23, deliverable, exit criteria. | FR, NFR |
| 3 | `docs/ARCHITECTURE.md` | Monolith Next.js 16, layer `page → server action → service → Drizzle → Neon`, struktur folder, route map per role, mobile shell 640px, PWA, batas auth/otorisasi, konvensi error/validasi. | OVERVIEW, NFR |
| 4 | `docs/MODULES.md` | Modul Auth/Pengguna, Akademik, Jadwal, Materi; tanggung jawab, entity, dependency, permission matrix. | FR, ERD |
| 5 | `docs/DATA_MODEL.md` | Spesifikasi tabel (kolom, PK/FK, enum), relasi, aturan turunan, rekonsiliasi ERD vs Class Diagram. | ERD, Class Diagram |
| 6 | `docs/OPEN_QUESTIONS.md` | Ledger Q&A: ID, pertanyaan, jawaban/keputusan, tanggal, dampak, status. Setiap tanya-jawab dicatat di sini. | Semua |

### 7.1 Template `README.md`

```markdown
# Project Title

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
```

Isi nyata disesuaikan dengan StudentConnect (judul, deskripsi, dependency Node/Neon, cara install, cara menjalankan, authors tim, versi 0.1).

### 7.2 Isi Awal `OPEN_QUESTIONS.md`

Ledger berisi dua bagian: keputusan yang sudah diambil (D) dan pertanyaan (Q). Setiap tanya-jawab baru ditambahkan ke tabel Q dengan status `Dijawab`. Tabel berikut adalah snapshot isi awal M0; status terkini ada di `docs/OPEN_QUESTIONS.md`.

**Keputusan sesi:**

| ID | Pertanyaan | Jawaban | Status |
|---|---|---|---|
| D-01 | Mulai dari koding atau dokumentasi? | Dokumentasi fondasi dulu | Diputuskan |
| D-02 | Data layer? | Drizzle | Diputuskan |
| D-03 | Auth? | Ditunda, diputuskan saat M1 | Ditunda |
| D-04 | Bahasa dokumen? | Indonesia | Diputuskan |
| D-05 | Cara menangani pertanyaan terbuka? | Catat tanya-jawab di `OPEN_QUESTIONS.md` | Diputuskan |
| D-06 | Lokasi output dokumentasi fondasi? | `docs/` | Diputuskan |
| D-07 | Halaman demo `src/app/page.tsx`? | Dipertahankan, copywriting diubah sesuai proyek | Diputuskan |

**Pertanyaan:**

| ID | Pertanyaan | Jawaban | Status |
|---|---|---|---|
| Q-01 | Identifier login mahasiswa: NIM sebagai email atau email terpisah? | NIM | Dijawab (A1) |
| Q-02 | Mekanisme session dan hashing password? | `bcryptjs` + `jose`, cookie 7 hari | Dijawab (A2) |
| Q-03 | `fileUrl` materi: URL saja, upload, atau keduanya? | URL dan upload file | Dijawab (A3) |
| Q-04 | Delete jadwal: hard delete atau soft delete via `status`? | Soft delete | Dijawab (A4) |
| Q-05 | `idDosen` ganda di `MataKuliah` dan `JadwalKuliah`? | Dosen jadwal = dosen pengampu; duplikasi kolom dihapus | Dijawab (A5) |
| Q-06 | Field `JadwalKuliah.nama` (ada di ERD, tidak ada di Class Diagram)? | Hapus kolom | Dijawab (A6) |
| Q-07 | Atribut `Kurikulum` (kosong di Class Diagram)? | Tambah `tahun_kurikulum` | Dijawab (A7) |
| Q-08 | Kredensial admin seed? | Wajib dari environment; seed gagal jika kosong | Dijawab (A8) |
| Q-09 | Cakupan PWA dan E2E? | Manifest saja + E2E dasar | Dijawab (A9) |

---

## 8. Struktur Folder Target M0

```text
studentconnect/
├── docs/
│   ├── README.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── DATA_MODEL.md
│   ├── OPEN_QUESTIONS.md
│   └── 00-plan/
│       └── m0-foundation.md
├── drizzle/                  # hasil drizzle-kit
├── public/                   # ikon PWA
├── src/
│   ├── app/
│   │   ├── manifest.ts
│   │   ├── page.tsx        
│   │   ├── layout.tsx        # shell max-w-640
│   │   └── globals.css
│   └── db/
│       ├── schema.ts
│       ├── index.ts
│       └── seed.ts
├── drizzle.config.ts
├── .env.example
├── .env.local                # tidak di-commit
└── package.json
```

---

## 9. Urutan Eksekusi

1. Baca dokumentasi Next.js 16 (`node_modules/next/dist/docs/`).
2. Verifikasi `npm run dev` dan `npm run build` pada scaffold.
3. Pasang dependency (bagian 5.1).
4. Konfigurasi `layout.tsx`, `globals.css`, `manifest.ts`, `.env.example`, `.gitignore`.
5. Buat `drizzle.config.ts`, `src/db/schema.ts`, `src/db/index.ts`.
6. Generate + jalankan migrasi ke Neon.
7. Buat `src/db/seed.ts`, jalankan seed.
8. Tulis enam dokumen di `docs/`.
9. Jalankan verifikasi (bagian 10).
10. Tandai status M0 selesai di `ROADMAP.md`.

---

## 10. Exit Criteria

- [x] `npm run lint` lulus.
- [x] `npm run build` lulus.
- [x] `npm run dev` menampilkan shell mobile max 640px.
- [x] `.env.example` ada; `.env.local` tidak di-commit.
- [x] Migrasi Drizzle berhasil di Neon; 9 tabel + enum terbentuk.
- [x] Seed berjalan dan data contoh dapat dibaca.
- [x] 6 dokumen (`docs/README.md`, `ROADMAP.md`, `ARCHITECTURE.md`, `MODULES.md`, `DATA_MODEL.md`, `OPEN_QUESTIONS.md`) ada dan saling tertaut.
- [x] `OPEN_QUESTIONS.md` memuat keputusan sesi; tidak ada pertanyaan terbuka.
- [x] `ROADMAP.md` menandai M0 selesai, M1 berikutnya.

---

## 11. Status Task

**Task utama**

- [x] Langkah 0 — Baca dokumentasi Next.js 16.
- [x] Langkah 1 — Verifikasi scaffold dan konfigurasi layout, globals, manifest, page, env.
- [x] Langkah 2 — Pasang dependency dan script database.
- [x] Langkah 3 — Buat `drizzle.config.ts`, `schema.ts`, `index.ts`, `seed.ts`.
- [x] Langkah 3 — Sinkronkan schema dengan Q-05, Q-06, Q-07, dan Q-15; seed memakai `bcryptjs` dan kredensial admin dari env (D-26, D-27).
- [x] Langkah 3 — Regenerasi baseline migrasi (`drizzle/0000_tense_rocket_raccoon.sql`).
- [x] Langkah 3 — Terapkan migrasi ke Neon.
- [x] Langkah 3 — Jalankan seed.
- [x] Langkah 4 — Tulis enam dokumen fondasi di `docs/`.
- [x] Verifikasi `npm run lint` dan `npm run build`.
- [x] Tandai M0 selesai di `ROADMAP.md` setelah migrasi dan seed berhasil.

**Task baru**

- [x] Buat `docs/02-usecase-diagram/USE CASES.md`: daftar use case mengikuti pola tabel Functional Requirement, dengan kolom link reference per fitur.
- [x] Buat `docs/06-sequence-diagram/SEQUANCE DIAGRAM.md`: daftar sequence mengikuti pola tabel Functional Requirement, dengan link reference ke file `.plantUML` (bukan gambar).
- [x] Buat `AGENTS.md`: panduan agent untuk stack, perintah, struktur, konvensi, dan tautan dokumen.

Task baru selesai pada 2026-11-14.

---

## 12. Risiko dan Keputusan Tertunda

| Risiko | Mitigasi |
|---|---|
| Breaking changes Next.js 16 | Baca `node_modules/next/dist/docs/` sebelum coding. |
| Beda ERD vs Class Diagram | Rekonsiliasi eksplisit di `DATA_MODEL.md`; jangan asumsi diam-diam. |
| Auth sudah diputuskan (`bcryptjs` + `jose`) | Implementasi sesi/auth masuk M1 (Q-02, Q-16). |
| Neon belum tersedia | `.env.example` disiapkan; migrasi ditunda sampai `DATABASE_URL` ada. |
| Seed kredensial admin | Wajib dari `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD`; seed gagal jika kosong (Q-08, Q-18). |

---

## 13. Referensi

- `docs/OVERVIEW.md`
- `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
- `docs/01-functional-requirements/NON FUNCTIONAL REQUIREMENT.md`
- `docs/03-class-diagram/CLASS_DIAGRAM.plantUML`
- `docs/04-entity-relationship-diagram/ERD.xml`
- `node_modules/next/dist/docs/`
