# AGENTS.md — StudentConnect

Panduan kerja untuk agent dan kontributor pada repositori ini.

## Ringkasan Proyek

StudentConnect adalah platform informasi akademik mobile-first (max 640px) untuk mahasiswa, dosen, dan admin. Aplikasi berupa monolith Next.js App Router dengan Neon PostgreSQL.

## Baca Sebelum Menulis Kode

1. `node_modules/next/dist/docs/` — versi Next.js ini memiliki breaking changes.
2. `docs/ARCHITECTURE.md` — layer, route map, konvensi.
3. `docs/MODULES.md` — batas modul dan matriks izin.
4. `docs/DATA_MODEL.md` — schema dan aturan database.
5. `docs/OPEN_QUESTIONS.md` — keputusan yang masih terbuka.

## Perintah

```bash
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # ESLint
npm run start        # jalankan hasil build

npm run db:generate  # generate migrasi dari src/db/schema.ts
npm run db:migrate   # terapkan migrasi ke Neon
npm run db:seed      # data awal

npm run test:e2e     # E2E, APP_URL default http://localhost:3000
```

Jika port 3000 dipakai: `npm run dev -- -p 3001`.

## Struktur

```text
src/app/          routing, layout, page
src/modules/      logika bisnis per domain: auth, users, schedules, materials
src/shared/       komponen, hooks, util lintas modul
src/db/           schema.ts, index.ts, seed.ts
src/lib/          auth, util
docs/             dokumentasi proyek
docs/00-plan/     rencana implementasi
drizzle/          migrasi SQL (jangan diedit manual)
```

## Konvensi Teknis

- Default ke Server Component. Tambahkan `"use client"` hanya bila perlu interaksi.
- Mutasi data lewat server action modul (`src/modules/*/actions.ts`), bukan route handler, kecuali ada alasan jelas.
- Akses database hanya lewat repository modul (`src/modules/*/repository.ts`) dan Drizzle di `src/db`. Jangan menulis SQL di komponen.
- Periksa session dan peran di server pada setiap action. Menyembunyikan tombol bukan otorisasi.
- Validasi input di server sebelum menulis database. Validasi klien hanya pelengkap.
- Aturan jadwal (bentrok ruangan/dosen, `jamSelesai > jamMulai`) berada di service layer modul.
- Hapus jadwal memakai soft delete `status = 'dibatalkan'`.
- Upload materi memakai Vercel Blob (`@vercel/blob`) melalui server action (Q-11, Q-14).
- Jangan menyimpan password plaintext. Auth memakai `bcryptjs` + `jose` (Q-02, Q-16).
- Gunakan komponen shadcn dari `src/shared/components/ui` dan helper `cn` di `src/lib/utils.ts`.
- Form memakai TanStack Form dan schema Zod; validasi server tetap wajib.
- Shell konten dibatasi `max-w-[640px]`; jangan membuat layout desktop lebar.
- Bahasa dokumen Indonesia; identifier kode bahasa Inggris.
- Jangan menambah komentar kecuali menjelaskan keputusan non-obvious.
- Jangan menambah dependency tanpa alasan; cek `package.json` lebih dulu.

## Database

- Ubah `src/db/schema.ts`, lalu `npm run db:generate`; jangan ubah database manual.
- `DATABASE_URL`, `AUTH_SECRET`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, dan `BLOB_READ_WRITE_TOKEN` dibaca dari `.env.local`.
- Jangan commit `.env.local` atau secret apa pun.
- Migrasi berada di `drizzle/` dan wajib ikut commit.

## Verifikasi Sebelum Selesai

```bash
npm run lint
npm run build
```

Untuk perubahan alur pengguna, tambahkan atau jalankan skenario E2E. Jangan menandai tugas selesai tanpa verifikasi.

## Referensi Dokumen

- `docs/README.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `docs/MODULES.md`
- `docs/DATA_MODEL.md`
- `docs/OPEN_QUESTIONS.md`
- `docs/01-functional-requirements/FUNCTIONAL REQUIREMENT.md`
- `docs/02-usecase-diagram/USE CASES.md`
- `docs/06-sequence-diagram/SEQUANCE DIAGRAM.md`
- `docs/00-plan/m0-foundation.md`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
