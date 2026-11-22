# StudentConnect

Platform informasi akademik untuk mahasiswa, dosen, dan admin.

## Description

StudentConnect adalah aplikasi web monolith berbasis Next.js yang menyatukan informasi perkuliahan dalam satu tempat. Mahasiswa dapat melihat jadwal kuliah serta daftar dan detail materi pembelajaran pada kurikulum program studinya. Dosen dapat melihat jadwal mengajar serta menambah, mengubah, dan menghapus materi pada mata kuliah yang diampu. Admin mengelola data pengguna dan jadwal perkuliahan. Setiap peran hanya dapat mengakses fitur sesuai hak aksesnya.

Aplikasi dirancang mobile-first dengan lebar maksimum konten 640px, menggunakan Next.js App Router, Tailwind CSS, shadcn/ui, Drizzle ORM, dan Neon PostgreSQL. Target deployment adalah Vercel dan aplikasi dapat dipasang sebagai PWA.

## Dokumentasi

| Dokumen                     | Link                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Index Dokumentasi           | [README](README.md)                                                                        |
| Roadmap Pengembangan        | [ROADMAP](ROADMAP.md)                                                                      |
| Arsitektur Sistem           | [ARCHITECTURE](ARCHITECTURE.md)                                                            |
| Modul Sistem                | [MODULES](MODULES.md)                                                                      |
| Data Model                  | [DATA_MODEL](DATA_MODEL.md)                                                                |
| Keputusan dan Pertanyaan    | [OPEN_QUESTIONS](OPEN_QUESTIONS.md)                                                        |
| Functional Requirement      | [FUNCTIONAL REQUIREMENT](01-functional-requirements/FUNCTIONAL%20REQUIREMENT.md)           |
| Non Functional Requirement  | [NON FUNCTIONAL REQUIREMENT](01-functional-requirements/NON%20FUNCTIONAL%20REQUIREMENT.md) |
| Use Case                    | [USE CASES](02-usecase-diagram/USE%20CASES.md)                                             |
| Class Diagram               | [CLASS_DIAGRAM](03-class-diagram/CLASS_DIAGRAM.plantUML)                                   |
| Entity Relationship Diagram | [ERD](04-entity-relationship-diagram/ERD.xml)                                              |
| Activity Diagram            | [Activity Diagram](05-activity-diagram/Activity%20-%20Diagram.webp)                        |
| Sequence Diagram            | [SEQUANCE DIAGRAM](06-sequence-diagram/SEQUANCE%20DIAGRAM.md)                              |
| Rencana                     | [00-plan](00-plan/)                                                                        |
| Pengujian End-to-End        | [E2E](E2E.md)                                                                              |

## Getting Started

### Dependencies

- Node.js 24 atau lebih baru
- npm 11 atau lebih baru
- Database Neon PostgreSQL
- Next.js 16.4.6, React 19.3.0, TypeScript
- Tailwind CSS 4.3.3 dan shadcn/ui (style `base-rhea`, icon Tabler)
- Drizzle ORM dan `@neondatabase/serverless`
- `bcryptjs` dan `jose` untuk autentikasi
- `@vercel/blob` untuk penyimpanan materi
- e2e (`e2e` + `@e2e-dev/web`) untuk pengujian end-to-end

### Installing

1. Unduh atau clone repositori ini.
2. Jalankan `npm install`.
3. Salin `.env.example` menjadi `.env.local`.
4. Isi `DATABASE_URL` dengan connection string Neon:
   `postgresql://user:password@host/database?sslmode=require`.
5. Isi `AUTH_SECRET`, `SEED_ADMIN_EMAIL`, dan `SEED_ADMIN_PASSWORD` (minimal 8 karakter). Seed gagal jika kredensial admin kosong.
6. Isi `BLOB_READ_WRITE_TOKEN` untuk upload materi ke Vercel Blob.
7. Jalankan migrasi dan seed:

```bash
npm run db:migrate
npm run db:seed
```

### Executing program

```bash
npm run dev
```

Buka `http://localhost:3000`.

Perintah lain:

```bash
npm run lint        # ESLint
npm run build       # production build
npm run start       # jalankan hasil build
npm run db:generate # generate migrasi dari schema Drizzle
npm run db:migrate  # terapkan migrasi ke Neon
npm run db:seed     # isi data awal
npm run test:e2e    # jalankan E2E (APP_URL default localhost:3000)
```

## Help

- `DATABASE_URL` tidak terbaca: pastikan file bernama `.env.local` di root proyek, bukan `.env`.
- Port 3000 dipakai proses lain: jalankan `npm run dev -- -p 3001`.
- Migrasi gagal: periksa connection string Neon, SSL, dan hak akses database.
- Seed gagal: pastikan `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD` terisi; seed juga berhenti jika tabel `pengguna` sudah berisi data.
- E2E gagal terhubung: jalankan aplikasi lebih dulu atau set `APP_URL`. E2E dijalankan di CI.

```bash
npm run db:generate
```

## Authors

- Tim StudentConnect
- Dhandy Amir Faisal

## Version History

- 0.1
  - Inisialisasi scaffold Next.js
  - Fondasi dokumentasi
  - Schema Drizzle dan koneksi Neon
  - Shell mobile, manifest PWA, halaman awal

## License

Belum ditentukan. Tambahkan `LICENSE.md` sebelum publikasi.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Neon](https://neon.tech)
- [awesome-readme](https://github.com/matiassingers/awesome-readme)
