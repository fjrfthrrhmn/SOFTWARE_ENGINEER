# Architecture — StudentConnect

> **Dokumen:** Arsitektur Sistem
> **Status:** Aktif
> **Tujuan:** Menjelaskan struktur teknis, batas layer, routing, dan konvensi implementasi.

---

## 1. Konteks Sistem

StudentConnect adalah aplikasi web monolith. Browser mengakses UI Next.js; Next.js menangani rendering, autentikasi, otorisasi, logika bisnis, dan akses database. Tidak ada backend terpisah.

```text
Pengguna (Mobile)
        |
        v
Frontend (Next.js React)
        |
        v
Backend (Next.js)
        |
        v
Akses Data (Drizzle ORM)
        |
        v
Basis Data (Neon PostgreSQL)
```

Alur: pengguna berinteraksi dengan frontend, frontend memanggil backend Next.js, backend mengakses database melalui Drizzle ORM, lalu respons dikembalikan ke pengguna.

---

## 2. Stack

| Komponen       | Teknologi                                   | Keterangan                               |
| -------------- | ------------------------------------------- | ---------------------------------------- |
| Framework      | Next.js 16.4.6 (App Router, Turbopack)      | Rendering, routing, server actions       |
| Bahasa         | TypeScript strict                           | Alias `@/*` ke `src/*`                   |
| UI             | React 19.3.0, Tailwind CSS 4.3.3, shadcn/ui | Style `base-rhea`, icon Tabler           |
| Komponen dasar | `@base-ui/react`                            | Primitive UI dari shadcn                 |
| Form           | TanStack Form (`@tanstack/react-form`)      | State dan validasi form di klien         |
| Validasi       | Zod                                         | Schema validasi dipakai klien dan server |
| Database       | Neon PostgreSQL                             | Serverless Postgres                      |
| ORM            | Drizzle ORM + `@neondatabase/serverless`    | Driver `neon-http`                       |
| Migrasi        | drizzle-kit                                 | Output ke `drizzle/`                     |
| Auth           | `bcryptjs` + `jose`                         | Hash password dan JWT session            |
| Storage        | `@vercel/blob`                              | Upload file materi                       |
| E2E            | `e2e` + `@e2e-dev/web`                      | Konfigurasi `e2e.config.ts`, berjalan di CI |
| Deployment     | Vercel                                      | Target produksi                          |
| PWA            | `app/manifest.ts`                           | Manifest saja; tanpa service worker      |

---

## 3. Layer

```text
src/app/**/page.tsx, layout.tsx     UI dan routing
        |
        v
src/modules/*/actions.ts             Server action: validasi input, cek session/peran
        |
        v
src/modules/*/service.ts             Logika bisnis: aturan jadwal, kepemilikan materi
        |
        v
src/modules/*/repository.ts          Query Drizzle
        |
        v
src/db/schema.ts + src/db/index.ts   Schema dan koneksi Neon
        |
        v
Neon PostgreSQL
```

Aturan layer:

- `page.tsx` dan komponen tidak mengakses database langsung.
- Server action adalah satu-satunya pintu mutasi.
- Pemeriksaan session dan peran dilakukan di server action, bukan hanya di UI.
- Aturan bisnis yang dipakai lebih dari satu action diletakkan di service.
- Query database per domain berada di `repository.ts` modul terkait.
- Query read sederhana boleh berada di server component, tetapi tetap melalui repository atau helper modul.

---

## 4. Struktur Proyek

### 4.1 Struktur Folder

```text
studentconnect/
├── drizzle/                        # Migrasi SQL hasil drizzle-kit
├── public/                         # Aset statis (ikon, gambar, font)
└── src/
    ├── app/                        # Routing dan UI (Next.js App Router)
    ├── modules/                    # Inti monolith: logika bisnis per domain
    │   ├── auth/
    │   │   ├── actions.ts          # Server actions: login, logout
    │   │   ├── service.ts          # Verifikasi kredensial, session
    │   │   ├── types.ts            # Tipe khusus auth
    │   │   └── components/         # Komponen UI khusus auth
    │   ├── users/
    │   │   ├── actions.ts          # create, update, deactivate
    │   │   ├── repository.ts       # Query Drizzle ke database
    │   │   ├── service.ts          # Aturan bisnis dan validasi
    │   │   ├── schema.ts           # Schema Zod
    │   │   └── components/         # Komponen UI khusus pengguna
    │   ├── schedules/
    │   │   ├── actions.ts
    │   │   ├── repository.ts
    │   │   ├── service.ts          # Aturan bentrok ruangan dan dosen
    │   │   ├── schema.ts
    │   │   └── components/
    │   └── materials/
    │       ├── actions.ts
    │       ├── repository.ts
    │       ├── service.ts          # Kepemilikan materi oleh dosen
    │       ├── schema.ts
    │       └── components/
    ├── shared/                     # Kode lintas modul
    │   ├── components/             #
    │   │   ├── ui/                 # Komponen shadcn
    │   │   └── widgets/                 # Komponen generik
    │   ├── hooks/                  # Custom React hooks
    │   └── utils/                  # Helper umum
    ├── lib/                        # Konfigurasi library dan infrastruktur
    │   ├── auth.ts                 # Session dan pemeriksaan peran
    │   └── utils.ts                # cn() untuk shadcn
    ├── db/                         # Infrastruktur database
    │   ├── schema.ts               # Schema Drizzle (sumber migrasi)
    │   ├── index.ts                # Client Drizzle + Neon
    │   └── seed.ts                 # Data awal
    └── proxy.ts                    # Redirect optimistik berbasis session
```

### 4.2 Struktur Route

Struktur folder `src/app/`.

```text
src/app/
├── (root)/
│   ├── (auth)/
│   │   └── login/page.tsx          # /login
│   ├── (app)/
│   │   ├── layout.tsx              # guard session
│   │   ├── dashboard/page.tsx      # /dashboard (semua role)
│   │   ├── schedule/page.tsx       # /schedule
│   │   ├── materials/
│   │   │   ├── page.tsx            # /materials
│   │   │   └── [id]/page.tsx       # /materials/[id]
│   │   ├── profile/page.tsx        # /profile
│   │   └── settings/page.tsx       # /settings
│   ├── onboarding/page.tsx         # /onboarding
│   └── unauthorized/page.tsx       # /unauthorized
├── api/                            # route handler bila diperlukan
├── layout.tsx                      # root layout
├── manifest.ts                     # manifest PWA
├── globals.css                     # Tailwind dan token shadcn
├── page.tsx                        # /
└── not-found.tsx                   # 404
```

---

## 5. Route Map

| No. | Nama Halaman       | Tujuan                                                                                               | Route              |
| --- | ------------------ | ---------------------------------------------------------------------------------------------------- | ------------------ |
| 1   | Splash Screen      | Menampilkan branding dan mempersiapkan aplikasi saat pertama kali dibuka.                            | `/`                |
| 1a  | Onboarding         | Menjelaskan fitur utama sekali per browser sebelum pengguna masuk.                                   | `/onboarding`      |
| 2   | Login              | Autentikasi mahasiswa, dosen, dan admin.                                                             | `/login`           |
| 3   | General Dashboard  | Dashboard bersama mahasiswa dan dosen, menampilkan informasi sesuai role pengguna.                   | `/dashboard`       |
| 4   | Jadwal Perkuliahan | Menampilkan jadwal berdasarkan role: mahasiswa melihat jadwal kuliah, dosen melihat jadwal mengajar. | `/schedule`        |
| 5   | Daftar Materi      | Menampilkan materi pembelajaran berdasarkan mata kuliah dan hak akses pengguna.                      | `/materials`       |
| 6   | Detail Materi      | Menampilkan informasi lengkap dan file materi pembelajaran.                                          | `/materials/[id]`  |
| 7   | Admin Dashboard    | Menampilkan ringkasan data pengguna dan jadwal perkuliahan.                                          | `/admin`           |
| 8   | Manajemen Pengguna | Menampilkan dan mengelola data pengguna mahasiswa dan dosen.                                         | `/admin/users`     |
| 9   | Manajemen Jadwal   | Menampilkan dan mengelola seluruh jadwal perkuliahan.                                                | `/admin/schedules` |
| 10  | Profile            | Menampilkan informasi akun pengguna yang sedang login.                                               | `/profile`         |
| 11  | Settings           | Menyediakan pengaturan aplikasi dan preferensi pengguna.                                             | `/settings`        |
| 12  | Access Denied      | Menampilkan informasi ketika pengguna tidak memiliki izin akses.                                     | `/unauthorized`    |
| 13  | Not Found          | Menampilkan informasi ketika halaman tidak ditemukan.                                                | `404`              |

> Form dan CRUD menggunakan Drawer
> Konfirmasi menggunakan Modal

### Komponen pendukung (tanpa route)

| Komponen            | Kegunaan                                          |
| ------------------- | ------------------------------------------------- |
| App Header          | Identitas aplikasi dan akses profile.             |
| Bottom Navigation   | Navigasi utama aplikasi mobile.                   |
| Drawer Form         | Form tambah dan edit data.                        |
| Confirmation Dialog | Konfirmasi tindakan penting.                      |
| Loading Skeleton    | Indikator pemuatan data.                          |
| Empty State         | Tampilan ketika data kosong.                      |
| Error State         | Tampilan ketika terjadi kesalahan.                |
| Toast Notification  | Notifikasi keberhasilan atau kegagalan.           |
| Protected Route     | Membatasi akses berdasarkan autentikasi dan role. |

---

## 6. Alur Data

Contoh tambah materi:

1. Dosen membuka `/materials` dan memilih aksi tambah materi.
2. Drawer form memakai TanStack Form dan schema Zod di klien.
3. Form memanggil server action `createMaterial` di `src/modules/materials/actions.ts`.
4. Action memeriksa session, peran `dosen`, dan kepemilikan mata kuliah.
5. Action memvalidasi input dengan schema Zod yang sama.
6. Action memanggil `src/modules/materials/service.ts`.
7. Service memanggil `src/modules/materials/repository.ts`; query Drizzle menulis ke Neon.
8. Action memanggil `revalidatePath("/materials")` dan menutup drawer.
9. Halaman daftar menampilkan data terbaru.

---

## 7. Autentikasi dan Otorisasi

Mekanisme session (Q-02, Q-16):

- Password di-hash dengan `bcryptjs`.
- JWT dibuat dan diverifikasi dengan `jose`, berlaku 7 hari, tanpa refresh token.
- Token disimpan pada cookie `studentconnect_session` dengan `HttpOnly`, `Secure` di produksi, dan `SameSite=Lax`.
- Secret diambil dari environment `AUTH_SECRET`.
- Otorisasi role memakai middleware/DAL kustom dan pemeriksaan di setiap server action.

Batasan yang tidak berubah:

- Password tidak pernah disimpan plaintext.
- `pengguna.email` menyimpan email asli semua peran dan menjadi satu-satunya kredensial login; NIM hanya data profil (`mahasiswa.nim`) (D-29).
- Setiap server action memeriksa session dan peran; UI bukan batas keamanan.
- Guard per peran ditempatkan pada layout `(app)` dan `admin`.
- Redirect optimistik boleh memakai `proxy.ts` (pengganti middleware di Next.js 16), tetapi bukan pengganti pemeriksaan server.

Matriks izin ada di `docs/MODULES.md`.

---

## 8. PWA

- `src/app/manifest.ts` menyediakan name, short_name, start_url, display standalone, warna, dan ikon.
- Ikon saat ini memakai `favicon.ico`. Ikon 192/512 ditambahkan di M5.
- Ruang lingkup PWA adalah manifest saja; service worker dan mode offline tidak termasuk scope (Q-09).
- Aplikasi harus tetap berfungsi tanpa service worker; PWA adalah lapisan tambahan, bukan ketergantungan.

---

## 9. Konvensi Validasi dan Error

- Validasi dilakukan di server sebelum menulis database.
- Form memakai TanStack Form; schema Zod dipakai di klien dan server.
- Validasi klien hanya untuk kenyamanan; server tetap memeriksa ulang.
- Pesan error mengikuti teks di dokumen FR.
- Input yang gagal validasi dikembalikan ke form; password tidak pernah dipertahankan.
- Kesalahan tak terduga tidak membocorkan detail internal; tampilkan pesan ramah dan log di server.
- Operasi hapus jadwal memakai soft delete (`status = dibatalkan`), bukan `DELETE`.

---

## 10. Keamanan

| NFR                        | Implementasi                                                                    |
| -------------------------- | ------------------------------------------------------------------------------- |
| NFR-2 Keamanan data        | `bcryptjs` untuk hash password, `jose` untuk JWT, cookie HttpOnly, otorisasi server-side, secret (`AUTH_SECRET`, `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`) di env |
| NFR-2 Hak akses            | Guard layout + pemeriksaan peran di setiap action                               |
| NFR-3 Kemudahan penggunaan | Shell mobile, komponen shadcn, pesan error jelas                                |

Larangan:

- Jangan expose `DATABASE_URL` ke klien.
- Jangan menaruh secret di `NEXT_PUBLIC_*`.
- Jangan mengandalkan penyembunyian tombol sebagai otorisasi.

---

## 11. Pengujian

- E2E: `e2e.config.ts`, target `http://localhost:3000` atau `APP_URL`.
- Cakupan minimum: login/logout, jadwal, materi, dan CRUD utama setiap role (Q-17).
- E2E dijalankan di CI.
- Setiap fase menambah skenario untuk FR yang dikerjakan.
- Unit test hanya dibuat jika logika bisnis cukup rumit; bukan default.
- Build dan lint wajib lulus sebelum menandai fase selesai.

---

## 12. Keputusan Terkait

Lihat `docs/OPEN_QUESTIONS.md`:

- Q-02 dan Q-16: `bcryptjs`, `jose`, cookie `studentconnect_session` 7 hari, `AUTH_SECRET`.
- Q-09 dan Q-17: manifest saja; E2E dasar di CI.
- Q-11 dan Q-14: penyimpanan materi memakai Vercel Blob.
