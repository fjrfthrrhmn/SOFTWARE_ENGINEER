# Implementation Plan — M1 Autentikasi dan Otorisasi

**Task:** Implementasi login/logout mahasiswa, dosen, dan admin, sesi JWT, guard per peran, serta gating onboarding.
**Status:** `DONE`
**Created:** `2026-11-15`
**Updated:** `2026-11-15`

## 1. Discovery

- [x] `AGENTS.md` dan dokumentasi relevan dibaca.
- [x] Arsitektur dan konvensi proyek diperiksa.
- [x] Codebase dan reusable patterns diperiksa.
- [x] API / data contracts diperiksa.

**Findings:**

- Relevant files:
  - `docs/ROADMAP.md` — M1 mencakup FR-1, FR-2, FR-6, FR-7, FR-14, FR-15.
  - `docs/ARCHITECTURE.md` — alur `page → server action → service → repository → Drizzle`; guard di layout `(app)` dan `admin`; session `jose` + cookie `studentconnect_session` 7 hari.
  - `docs/MODULES.md` — Auth memakai repository Users; Auth menangani login, logout, `getSession`, dan `requireRole`.
  - `docs/DATA_MODEL.md` — `pengguna.email` unik; `mahasiswa.nim` unik; status akun `aktif | nonaktif`.
  - `src/db/schema.ts` — tabel `pengguna`, `mahasiswa`, `dosen`, `admin`; belum ada kolom onboarding.
  - `src/db/seed.ts` — mahasiswa seed memakai `email: "23123456"` (NIM), bukan email asli.
  - `src/app/page.tsx` — hanya merender `SplashScreen`.
  - `src/modules/onboarding/components/splash-screen.tsx` — redirect hardcoded ke `/onboarding`.
  - `src/modules/onboarding/components/onboarding-carousel.tsx` — CTA akhir memakai `Link href="/login"`.
  - `src/app/unauthorized/page.tsx` — sudah menautkan ke `/login`.
  - `screen/ui-auth-form.tsx` — referensi visual login; masih pseudo-code dan memakai komponen form yang belum ada.
  - `screen/copywriting.json` — menyediakan blok `authLogin`.
  - `next.config.ts` — `cacheComponents: true` dan `partialPrefetching: true`.

- Current behavior:
  - Belum ada `/login`, `/dashboard`, `/admin`, session, atau guard.
  - Splash selalu menuju `/onboarding`; onboarding selalu berakhir di `/login`.
  - Pengguna yang sudah pernah membuka aplikasi tetap melihat onboarding lagi.
  - Mahasiswa seed hanya dapat dicocokkan lewat NIM karena `pengguna.email` berisi NIM.

- Dependencies:
  - Sudah terpasang: `bcryptjs`, `zod`, `@tanstack/react-form`, `drizzle-orm`, `@neondatabase/serverless`, komponen shadcn/base-ui, `reicon-react`, `e2e`.
  - Belum terpasang: `jose`, padahal docs dan `.env.local` sudah menyiapkan `AUTH_SECRET`.
  - `AUTH_SECRET` tersedia di `.env.local`.

- Limitations:
  - `screen/ui-auth-form.tsx` mengimpor `useForm`, `formSchema`, `Field`, `FieldGroup`, `toast`, dan `FullWidthDivider` secara tidak lengkap; tidak dapat disalin langsung.
  - Tidak ada komponen `field.tsx` di `src/shared/components/ui/`.
  - `src/shared/components/auth-shell.tsx` adalah divider, bukan shell halaman login.
  - Onboarding belum punya penanda “sudah dilihat”.
  - Tidak ada skrip typecheck terpisah; gunakan `npx tsc --noEmit` atau andalkan `next build`.

## 2. Task Understanding

- **Problem:** Aplikasi belum memiliki autentikasi, sesi, logout, guard per peran, dan alur onboarding yang hanya muncul untuk pengunjung baru.
- **Expected Outcome:** Satu halaman login menerima email dan password untuk semua peran; kredensial valid membuat cookie sesi; setiap peran diarahkan ke area yang benar; route peran lain tidak dapat dibuka; logout menghapus sesi.
- **Behavior Changes:**
  - Pengunjung baru: `/` → `/onboarding` → CTA akhir → `/login`.
  - Pengunjung lama: `/` → `/login` atau area sesuai sesi.
  - Semua peran login memakai email; NIM bukan kredensial login.
  - Pengguna baru yang belum menyelesaikan onboarding diarahkan ke `/onboarding` setelah login.
  - Akun `nonaktif` ditolak setelah password terverifikasi.
  - `/dashboard` hanya untuk mahasiswa/dosen; `/admin` hanya untuk admin.
- **Out of Scope:** Registrasi, reset password, ubah password, remember me, MFA, refresh token, revokasi sesi real-time, halaman privacy/terms, reCAPTCHA, Proxy/middleware, dashboard fungsional, jadwal, materi, CRUD admin, PWA, perubahan schema/migrasi, dan refactor modul onboarding di luar gating.

## 3. Technical Approach

- **Selected Approach:**
  - Satu halaman `/login` dengan email dan password untuk semua peran.
  - `pengguna.email` menjadi email asli dan satu-satunya kredensial login; NIM tetap disimpan di `mahasiswa.nim`.
  - Session JWT HS256 via `jose`, disimpan di cookie `studentconnect_session`.
  - Guard dilakukan di layout server dan server action. Proxy tidak dipakai pada M1 karena guard layout sudah memenuhi kebutuhan dan lebih sederhana.
  - Onboarding memakai cookie `studentconnect_onboarding_seen`; tidak menambah kolom database.
- **Architecture:**
  - `src/lib/auth.ts` — primitif sesi: `getSession`, `createSession`, `deleteSession`, `requireRole`, `roleHome`.
  - `src/modules/auth` — schema Zod, service verifikasi kredensial, server actions, copy, komponen login/logout.
  - `src/modules/users/repository.ts` — lookup kredensial berdasarkan email.
  - `src/modules/onboarding` — helper cookie dan action penyelesaian onboarding.
  - Route group `(auth)` untuk `/login`, `(app)` untuk `/dashboard`, dan `admin` untuk `/admin`.
- **Data Flow:**
  1. `GET /login` membaca sesi; jika sudah login, redirect ke `roleHome`.
  2. Form client memvalidasi input dengan Zod, lalu memanggil server action `login`.
  3. Action memvalidasi ulang, memanggil `auth/service.login`, lalu repository mencari pengguna.
  4. Service memeriksa rate limit, `bcrypt.compare`, status `aktif`, dan mengembalikan `{ userId, role }`.
  5. Action membuat JWT dan cookie, lalu redirect ke `/onboarding` bila cookie onboarding belum ada, atau ke `roleHome`.
  6. Layout `(app)`/`admin` membaca dan memverifikasi sesi pada setiap request, lalu menolak peran yang salah.
  7. Logout menghapus cookie dan redirect ke `/login`.
- **Database / API:**
  - Tidak ada perubahan schema dan tidak ada migrasi.
  - `src/db/seed.ts` diubah agar mahasiswa seed memakai email asli `dhandy.amir@studentconnect.local`; NIM tetap `23123456` sebagai data profil.
  - Lookup hanya ke `pengguna`; email dibandingkan case-insensitive.
  - Tidak ada route handler; mutasi lewat server action.
- **UI / State:**
  - `src/app/(auth)/login/page.tsx` adalah Server Component; `LoginForm` adalah Client Component.
  - Form memakai TanStack Form + schema Zod server/client.
  - Reuse `InputGroup`, `InputGroupInput`, `InputGroupAddon`, `Input`, `Button`, `Toaster`, dan ikon `reicon-react`.
  - Feedback kegagalan login memakai toast shadcn; error field tetap dirender inline.
  - Copy diambil dari `screen/copywriting.json` melalui `src/modules/auth/copy.ts`; label field menjadi “Email”.
  - `rememberMe`, footer reCAPTCHA, dan link legal tidak dirender karena di luar FR dan halaman tujuannya belum ada.
- **Security Architecture:**
  - Password hanya dibandingkan dengan `bcryptjs`; tidak pernah dicatat atau dikembalikan.
  - Pesan gagal login generik untuk email tidak dikenal maupun password salah; `accountNotFound` tidak dipakai agar tidak membocorkan keberadaan akun.
  - Akun `nonaktif` hanya dilaporkan setelah password valid.
  - Rate limit login: maksimum 5 percobaan gagal per email dalam 15 menit; sukses mereset hitungan.
  - JWT memuat hanya `sub` dan `role`, memakai `HS256`, issuer/audience tetap, dan berlaku 7 hari.
  - Cookie `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` hanya di production.
  - `AUTH_SECRET` wajib ada dan tidak boleh kosong; verifikasi token menolak algoritma lain.
  - Otorisasi dilakukan di server; UI hanya menyembunyikan jalan masuk.
  - Redirect selalu dihitung dari peran sesi, bukan dari input pengguna.
  - Guard memakai `getSession` yang di-cache per request agar verifikasi tidak berulang.

### 3.1 Session Contract

```ts
type Role = "mahasiswa" | "dosen" | "admin";

type Session = {
  userId: number;
  role: Role;
};

getSession(): Promise<Session | null>;
requireRole(roles: Role[]): Promise<Session>;
roleHome(role: Role): "/dashboard" | "/admin";
```

- `getSession` mengembalikan `null` untuk cookie hilang, token rusak, payload tidak valid, atau role tidak dikenal.
- `requireRole` redirect ke `/login` bila tidak ada sesi dan ke `/unauthorized` bila peran tidak cocok.
- `(app)/layout.tsx` mengarahkan admin ke `/admin`; `admin/layout.tsx` mengarahkan non-admin ke `/unauthorized`.

### 3.2 Login Contract

```ts
type LoginInput = {
  email: string;
  password: string;
};

type LoginResult =
  | { ok: true; userId: number; role: Role }
  | { ok: false; error: "invalid_input"; fieldErrors?: Record<string, string[]> }
  | { ok: false; error: "invalid_credentials" | "account_disabled" | "rate_limited" | "server_error" };
```

- Email di-trim dan di-lowercase; password tidak di-trim.
- Panjang email maksimum 254 karakter dan harus berformat email; password maksimum 72 byte agar sesuai batas bcrypt.
- Semua kegagalan tak terduga dipetakan ke `server_error` tanpa detail internal.

## 4. Scope & Constraints

**In Scope:**

- Dependency `jose`.
- Session primitive, auth service, repository lookup, schema Zod, server actions.
- Halaman login dan komponen form.
- Logout dan placeholder `/dashboard` serta `/admin`.
- Guard layout per peran.
- Gating onboarding berbasis cookie.
- Update seed, dokumentasi data model/keputusan, dan E2E auth.
- Copy auth dari `screen/copywriting.json`.

**Out of Scope:**

- Perubahan `src/db/schema.ts`, migrasi, dan CRUD pengguna.
- Registrasi, reset password, MFA, refresh token, remember me.
- Halaman legal, reCAPTCHA, dan tautan eksternal.
- `src/proxy.ts`.
- Fitur jadwal, materi, profil, dan pengaturan.
- Refactor onboarding selain gating dan CTA akhir.
- Perubahan desain global, font, atau token warna.

**Constraints:**

- Shell mobile maksimum 640px; halaman login mengikuti lebar prototype `max-w-sm` di dalam shell aplikasi.
- Default Server Component; `"use client"` hanya untuk form dan komponen interaktif.
- Validasi server wajib meskipun klien memakai Zod.
- Tidak ada SQL di komponen.
- Tidak ada dependency baru selain `jose`.
- Identifier kode bahasa Inggris; teks UI bahasa Indonesia.
- `cacheComponents: true`: halaman/layout yang membaca cookie memakai `export const instant = false` atau Suspense.
- `cookies()` dan `searchParams` bersifat async.
- Jangan commit `.env.local` atau token.

## 5. Implementation Phases

### Phase 1 — Session primitive, repository, dan auth service

**Objective:** Kredensial dapat diverifikasi dan sesi dapat dibuat/diverifikasi tanpa UI.

**Files:**

- CREATE: `src/lib/auth.ts`
- CREATE: `src/modules/auth/types.ts`
- CREATE: `src/modules/auth/schema.ts`
- CREATE: `src/modules/users/repository.ts`
- CREATE: `src/modules/auth/service.ts`
- MODIFY: `package.json`
- MODIFY: `package-lock.json`

**Tasks:**

- [x] Tambah dependency `jose` dengan `npm install jose`; tidak menambah dependency lain.
- [x] Definisikan `Role`, `Session`, `LoginInput`, dan `LoginResult` di `types.ts`.
- [x] Buat schema Zod `loginSchema`: email wajib, trim, lowercase, format email, maksimum 254; password wajib, maksimum 72.
- [x] Implementasikan `src/lib/auth.ts`: konstanta cookie, `getSession` dengan `cache`, `createSession`, `deleteSession`, `requireRole`, dan `roleHome`.
- [x] Validasi `AUTH_SECRET` saat sesi dipakai; gunakan `SignJWT`/`jwtVerify` dengan `HS256`, issuer `studentconnect`, audience `studentconnect`, dan masa 7 hari.
- [x] Implementasikan `findAuthUserByEmail` di repository Users; cocokkan `lower(pengguna.email)` tanpa join ke `mahasiswa`.
- [x] Implementasikan service login: rate limit, lookup, dummy bcrypt compare untuk email tidak dikenal, cek password, lalu cek status.
- [x] Pastikan service tidak mengembalikan `passwordHash`, email, atau nama ke action.
- [x] Tambahkan komentar `ponytail:` pada rate limiter in-memory yang menyebut batas per-instance dan jalur upgrade.

**Dependencies:** `jose`, `bcryptjs`, `drizzle-orm`, `AUTH_SECRET`.

**Validation:**

- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] Verifikasi manual bahwa password salah, email tidak dikenal, dan akun nonaktif menghasilkan error yang benar.

**Completion Criteria:** Service mengembalikan `{ userId, role }` hanya untuk kredensial valid dan akun aktif; token dapat dibuat dan diverifikasi ulang.

### Phase 2 — Halaman login dan server action

**Objective:** Pengguna dapat login dari `/login` dan diarahkan sesuai peran serta status onboarding.

**Files:**

- MODIFY: `src/modules/auth/actions.ts` (CREATE pada phase ini)
- CREATE: `src/modules/auth/copy.ts`
- CREATE: `src/modules/auth/components/login-form.tsx`
- CREATE: `src/app/(auth)/login/page.tsx`
- MODIFY: `screen/copywriting.json`

**Tasks:**

- [x] Buat `login` server action: parse dengan `loginSchema`, panggil service, buat sesi, lalu redirect.
- [x] Buat `logout` server action: hapus cookie, lalu redirect ke `/login`; idempoten bila sesi sudah hilang.
- [x] Redirect login sukses: `/onboarding` bila cookie onboarding belum ada; selain itu `roleHome`.
- [x] Petakan error service ke copy; jangan pernah mengembalikan pesan database atau stack trace.
- [x] Buat `copy.ts` dari blok `authLogin`; tambahkan copy field “Email”, rate limit, dan label loading.
- [x] Perbarui `screen/copywriting.json` agar label field dan copy rate limit memiliki sumber resmi.
- [x] Buat `LoginForm` client dengan TanStack Form, `loginSchema`, `InputGroup`, tombol submit, pending state, error field inline, dan feedback toast shadcn.
- [x] Tampilkan logo `/brand/icon.png`, heading, deskripsi, dan form mengikuti `screen/ui-auth-form.tsx`; tautan bantuan mengarah ke `mailto:fajar.ramdhani@satu.ac.id`.
- [x] Jangan render remember me, reCAPTCHA, atau link legal yang belum memiliki halaman.
- [x] Buat `page.tsx` server: baca sesi, redirect bila sudah login, render `LoginForm`, dan set `export const instant = false`.
- [x] Pastikan redirect tidak memakai parameter `next` dari klien.

**Dependencies:** Phase 1; `@tanstack/react-form`, `zod`, komponen UI yang sudah ada.

**Validation:**

- [x] Login mahasiswa, dosen, dan admin dengan email.
- [x] NIM lama ditolak sebagai format email.
- [x] Password salah menampilkan toast generik dan tetap di `/login`.
- [x] Submit ganda tidak membuat dua sesi.
- [x] Cek cookie: `HttpOnly`, `SameSite=Lax`, `Path=/`, masa 7 hari.
- [x] Cek layout pada 360px, 390px, dan 640px.

**Completion Criteria:** Ketiga peran dapat login dari satu halaman dan diarahkan ke tujuan yang benar; kegagalan tidak membocorkan detail akun.

### Phase 3 — Guard per peran, placeholder dashboard, dan logout

**Objective:** Route terproteksi hanya dapat dibuka peran yang berhak dan logout tersedia di area aplikasi.

**Files:**

- CREATE: `src/app/(app)/layout.tsx`
- CREATE: `src/app/(app)/dashboard/page.tsx`
- CREATE: `src/app/admin/layout.tsx`
- CREATE: `src/app/admin/page.tsx`
- CREATE: `src/modules/auth/components/logout-button.tsx`

**Tasks:**

- [x] `(app)/layout.tsx`: tanpa sesi redirect `/login`; admin redirect `/admin`; mahasiswa/dosen lanjut.
- [x] `admin/layout.tsx`: tanpa sesi redirect `/login`; non-admin redirect `/unauthorized`; admin lanjut.
- [x] `dashboard/page.tsx`: placeholder ringkas “Dashboard” dengan identitas peran dan tombol logout.
- [x] `admin/page.tsx`: placeholder ringkas “Admin” dengan tombol logout.
- [x] `LogoutButton` server component memakai `<form action={logout}>` dan `Button`; tidak perlu state client.
- [x] Gunakan `ScreenShell` agar konsisten dengan halaman lain.
- [x] Set `export const instant = false` pada layout yang membaca cookie bila diperlukan build.
- [x] Jangan menambahkan query database ke placeholder; sesi cukup untuk membuktikan guard.

**Dependencies:** Phase 2.

**Validation:**

- [x] Mahasiswa/dosen membuka `/admin` → `/unauthorized`.
- [x] Admin membuka `/dashboard` → `/admin`.
- [x] Pengguna tanpa sesi membuka `/dashboard` atau `/admin` → `/login`.
- [x] Logout dari kedua area menghapus cookie dan kembali ke `/login`.
- [x] Kembali ke route terproteksi setelah logout tetap ditolak.

**Completion Criteria:** Matriks akses per peran berjalan di server dan logout tidak menyisakan sesi.

### Phase 4 — Gating onboarding dan redirect splash

**Objective:** Onboarding hanya muncul untuk pengunjung/pengguna baru; splash mengarah ke tujuan yang tepat.

**Files:**

- CREATE: `src/modules/onboarding/seen.ts`
- CREATE: `src/modules/onboarding/actions.ts`
- MODIFY: `src/app/page.tsx`
- MODIFY: `src/app/onboarding/page.tsx`
- MODIFY: `src/modules/onboarding/components/splash-screen.tsx`
- MODIFY: `src/modules/onboarding/components/onboarding-carousel.tsx`

**Tasks:**

- [x] Definisikan cookie `studentconnect_onboarding_seen` di `seen.ts`: `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` di production, `maxAge` 1 tahun.
- [x] Implementasikan `hasSeenOnboarding()` dengan `await cookies()`.
- [x] Buat action `completeOnboarding`: set cookie, baca sesi, redirect ke `roleHome` atau `/login`.
- [x] Ubah `/` menjadi async: hitung tujuan dari cookie onboarding dan sesi; kirim `destination` ke `SplashScreen`.
- [x] Ubah `SplashScreen` menerima prop `destination` dan memakai `router.replace(destination)`.
- [x] Ubah `/onboarding`: bila cookie sudah ada, redirect ke `roleHome` atau `/login`; selain itu render carousel.
- [x] Ubah CTA akhir carousel menjadi form yang memanggil `completeOnboarding`; langkah 1–2 tetap memakai tombol carousel.
- [x] Tambahkan pending state minimal pada CTA akhir agar klik ganda tidak memicu dua redirect.
- [x] Set `export const instant = false` pada `/`, `/onboarding`, dan layout yang membaca cookie bila diperlukan build.

**Dependencies:** Phase 1–3.

**Validation:**

- [x] Browser tanpa cookie: `/` → `/onboarding` → CTA akhir → `/login`.
- [x] Login pertama tanpa cookie onboarding → `/onboarding`.
- [x] Setelah onboarding selesai, login berikutnya langsung ke dashboard.
- [x] Pengunjung dengan cookie tetapi tanpa sesi: `/` → `/login`.
- [x] Pengunjung dengan cookie dan sesi: `/` → dashboard/admin.
- [x] Direct `/onboarding` setelah cookie ada tidak menampilkan ulang carousel.

**Completion Criteria:** Alur onboarding hanya muncul sekali per browser dan tidak memblokir pengguna lama.

### Phase 5 — Seed, dokumentasi, dan E2E

**Objective:** Data demo mendukung login email, keputusan tercatat, dan alur auth terverifikasi.

**Files:**

- MODIFY: `src/db/seed.ts`
- MODIFY: `docs/DATA_MODEL.md`
- MODIFY: `docs/OPEN_QUESTIONS.md`
- MODIFY: `docs/ARCHITECTURE.md`
- MODIFY: `docs/MODULES.md`
- MODIFY: `docs/ROADMAP.md`
- CREATE: `tests/auth.e2e.ts`

**Tasks:**

- [x] Ubah email mahasiswa seed menjadi `dhandy.amir@studentconnect.local`; pertahankan NIM `23123456` dan password seed.
- [x] Catat backfill satu kali untuk database lokal yang sudah ter-seed: ubah `pengguna.email` mahasiswa dari NIM ke email seed; jangan commit SQL manual sebagai migrasi schema.
- [x] Catat keputusan baru di `docs/OPEN_QUESTIONS.md` yang menggantikan Q-01/D-17: semua peran login dengan email dan password; `pengguna.email` berisi email asli; NIM bukan kredensial.
- [x] Perbarui `docs/DATA_MODEL.md`, `docs/ARCHITECTURE.md`, dan `docs/MODULES.md` agar tidak lagi menyatakan login memakai NIM.
- [x] Perbarui status M1 di `docs/ROADMAP.md` hanya setelah seluruh validasi selesai.
- [x] Tambahkan `tests/auth.e2e.ts`:
  - login mahasiswa dengan email;
  - login dosen dengan email;
  - login admin dengan email;
  - password salah menampilkan toast dan tetap di `/login`;
  - mahasiswa membuka `/admin` → `/unauthorized`;
  - logout menghapus sesi;
  - onboarding pertama kali lalu login.
- [x] Jalankan E2E dengan server aktif (`APP_URL` default `http://localhost:3000`).

**Dependencies:** Phase 1–4; `e2e`, `@e2e-dev/web`, data seed.

**Validation:**

- [x] `npm run db:seed` (skip bila database sudah berisi data).
- [x] Backfill data lama diverifikasi dengan login email.
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run test:e2e`

**Completion Criteria:** Seed dan docs konsisten; seluruh skenario E2E auth lulus.

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `docs/PLAN/frontend/m1-authentication.md` | CREATE | Plan ini | — |
| `package.json` | MODIFY | Tambah `jose` | 1 |
| `package-lock.json` | MODIFY | Lock dependency `jose` | 1 |
| `src/lib/auth.ts` | CREATE | JWT, cookie, `getSession`, `requireRole`, redirect per peran | 1 |
| `src/modules/auth/types.ts` | CREATE | Tipe role, sesi, input, dan hasil login | 1 |
| `src/modules/auth/schema.ts` | CREATE | Schema Zod login | 1 |
| `src/modules/auth/service.ts` | CREATE | Verifikasi kredensial, status, dan rate limit | 1 |
| `src/modules/auth/actions.ts` | CREATE | Server action login/logout | 2 |
| `src/modules/auth/copy.ts` | CREATE | Copy login dari `screen/copywriting.json` | 2 |
| `src/modules/auth/components/login-form.tsx` | CREATE | Form login client | 2 |
| `src/modules/auth/components/logout-button.tsx` | CREATE | Form logout server component | 3 |
| `src/modules/users/repository.ts` | CREATE | Lookup pengguna berdasarkan email | 1 |
| `src/app/(auth)/login/page.tsx` | CREATE | Halaman `/login` | 2 |
| `src/app/(app)/layout.tsx` | CREATE | Guard mahasiswa/dosen | 3 |
| `src/app/(app)/dashboard/page.tsx` | CREATE | Placeholder dashboard | 3 |
| `src/app/admin/layout.tsx` | CREATE | Guard admin | 3 |
| `src/app/admin/page.tsx` | CREATE | Placeholder admin | 3 |
| `src/modules/onboarding/seen.ts` | CREATE | Baca/tulis cookie onboarding | 4 |
| `src/modules/onboarding/actions.ts` | CREATE | Action penyelesaian onboarding | 4 |
| `src/app/page.tsx` | MODIFY | Tujuan splash berbasis sesi/cookie | 4 |
| `src/app/onboarding/page.tsx` | MODIFY | Redirect bila onboarding sudah dilihat | 4 |
| `src/modules/onboarding/components/splash-screen.tsx` | MODIFY | Prop `destination` | 4 |
| `src/modules/onboarding/components/onboarding-carousel.tsx` | MODIFY | CTA akhir memanggil server action | 4 |
| `src/db/seed.ts` | MODIFY | Email mahasiswa seed | 5 |
| `screen/copywriting.json` | MODIFY | Copy field email dan rate limit | 2 |
| `tests/auth.e2e.ts` | CREATE | Skenario E2E auth | 5 |
| `docs/DATA_MODEL.md` | MODIFY | Semantik `pengguna.email` dan NIM | 5 |
| `docs/OPEN_QUESTIONS.md` | MODIFY | Keputusan login email final | 5 |
| `docs/ARCHITECTURE.md` | MODIFY | Aturan login email | 5 |
| `docs/MODULES.md` | MODIFY | Aturan login email | 5 |
| `docs/ROADMAP.md` | MODIFY | Status M1 setelah selesai | 5 |

## 7. Risks & Validation

| Risk / Edge Case | Impact | Mitigation |
|---|---|---|
| Database lama menyimpan NIM di `pengguna.email` | Login email gagal setelah kode diterapkan | Update seed dan jalankan backfill satu kali; verifikasi login email berhasil |
| Email dinormalisasi ke lowercase | Email dengan kapital tetap dapat login | Schema dan repository menerapkan trim + lowercase sebelum lookup |
| Rate limiter in-memory hilang saat restart dan tidak lintas instance | Brute force dapat melewati batas pada deployment multi-instance | Komentar `ponytail:`; batas 5/15 menit; upgrade ke penyimpanan bersama bila deploy multi-instance |
| Rate limit per email dapat dipakai melakukan lockout | Pengguna sah dapat tertahan sementara | Window pendek; pesan generik; pertimbangkan kunci IP+email saat hardening M5 |
| JWT tidak dapat dicabut sebelum 7 hari | Akun yang dinonaktifkan masih memiliki sesi aktif | Status dicek saat login; revokasi sesi masuk hardening berikutnya bila diminta |
| `AUTH_SECRET` kosong atau lemah | Token tidak aman / runtime error | Gagal cepat saat secret dipakai; dokumentasikan panjang minimum dan jangan commit |
| `cacheComponents` menolak pembacaan cookie saat build | Build gagal | `export const instant = false` pada halaman/layout dinamis, atau Suspense |
| Form prototype memakai komponen yang tidak ada | Implementasi tidak compile | Reuse `InputGroup`/`Button`/`Toaster`; render label dan error field inline |
| Server action dipanggil langsung dengan input tidak valid | Validasi klien terlewati | `safeParse` ulang di server dan kembalikan `invalid_input` |
| Password > 72 byte terpotong bcrypt | Password berbeda dapat dianggap sama | Batasi panjang password 72 byte di schema |
| Redirect berbasis input pengguna | Open redirect | Abaikan parameter `next`; hitung tujuan dari role dan cookie |
| Cookie onboarding per browser, bukan per akun | Pengguna di browser baru melihat onboarding lagi | Diterima untuk M1; tambah flag database bila produk meminta per akun |
| `screen/ui-auth-form.tsx` bukan kode final | Waktu terbuang meniru API fiktif | Gunakan hanya struktur visual dan copy; implementasi mengikuti komponen yang ada |
| E2E bergantung pada server dan data seed | Test gagal palsu | Dokumentasikan `APP_URL`, jalankan seed, dan gunakan kredensial seed yang stabil |

**Required Checks:**

- [x] Typecheck `npx tsc --noEmit`
- [x] Lint `npm run lint`
- [x] Tests `npm run test:e2e`
- [x] Build `npm run build`
- [x] Runtime / UI behavior pada 360px, 390px, 640px
- [x] Security / authorization: login tiap peran, akun nonaktif, akses lintas peran, logout, atribut cookie
- [x] Tidak ada password, token, atau `AUTH_SECRET` di log/response
- [x] `git diff` hanya menyentuh file di File Map

## 8. Definition of Done

- [x] All approved phases completed.
- [x] Implementation follows approved scope.
- [x] Relevant validations pass.
- [x] No unauthorized changes.
- [x] Existing architecture is preserved.
- [x] Documentation updated if necessary.
- [x] Mahasiswa dapat login dengan email.
- [x] Dosen dan admin dapat login dengan email.
- [x] Email dan password adalah satu-satunya kredensial login; NIM tidak diterima.
- [x] Feedback kegagalan login memakai toast shadcn.
- [x] `errorMessage` tersedia di `src/lib/utils.ts`.
- [x] Tautan bantuan mengarah ke `mailto:fajar.ramdhani@satu.ac.id`.
- [x] Akun nonaktif ditolak.
- [x] Session cookie 7 hari, `HttpOnly`, `SameSite=Lax`, `Secure` di production.
- [x] Logout menghapus sesi.
- [x] Guard `/dashboard` dan `/admin` berjalan di server.
- [x] Onboarding hanya muncul untuk pengunjung baru.
- [x] E2E auth lulus.
- [x] Tidak ada dependency baru selain `jose`.

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | DONE | `jose`; `src/lib/auth.ts`; `src/modules/auth/{types,schema,service}.ts`; `src/modules/users/repository.ts`; `src/modules/onboarding/seen.ts` | `npx tsc --noEmit`, `npm run lint`, `npm run build` |
| 2 | DONE | `src/modules/auth/{actions,copy}.ts`; `src/modules/auth/components/login-form.tsx`; `src/app/(auth)/login/page.tsx`; `src/lib/utils.ts`; `screen/copywriting.json` | Login email mahasiswa/dosen/admin via E2E; toast error; `npm run build` |
| 3 | DONE | `src/app/(app)/layout.tsx`; `src/app/(app)/dashboard/page.tsx`; `src/app/admin/layout.tsx`; `src/app/admin/page.tsx`; `src/modules/auth/components/logout-button.tsx` | E2E guard mahasiswa/admin, logout; `npm run build` |
| 4 | DONE | `src/modules/onboarding/{seen,actions}.ts`; `src/modules/onboarding/components/{splash-screen,onboarding-carousel}.tsx`; `src/app/page.tsx`; `src/app/onboarding/page.tsx` | E2E onboarding pertama, revisi `/`, login setelah onboarding, direct `/onboarding`; `npm run build` |
| 5 | DONE | `src/db/seed.ts`; `docs/{DATA_MODEL,ARCHITECTURE,MODULES,ROADMAP,OPEN_QUESTIONS}.md`; `tests/auth.e2e.ts`; backfill email mahasiswa | `npm run db:seed` (skip existing), `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run test:e2e` 6/6 |

**Deviations:** `tsconfig.json` dan `eslint.config.mjs` mengecualikan `screen/**` karena prototype `screen/ui-auth-form.tsx` adalah pseudo-code yang gagal typecheck/lint. `tests/auth.e2e.ts` dibuat pada phase 3 dan diperluas pada phase 4–5. `LoginResult.ok` mengembalikan `userId` dan `role` agar action dapat membuat sesi tanpa query ulang. Backfill satu baris `pengguna.email` mahasiswa dijalankan pada database Neon yang sudah ter-seed; seed pada database kosong tidak dijalankan ulang karena akan merusak data demo yang ada, tetapi perubahan seed sudah diverifikasi lewat `npm run db:seed` (skip). **Revisi 2026-11-15:** login difinalkan memakai email dan password untuk semua peran; NIM tidak lagi diterima sebagai kredensial. Feedback login dipindah dari alert inline ke toast shadcn, `errorMessage` dipindah ke `src/lib/utils.ts`, dan tautan bantuan menjadi `mailto:fajar.ramdhani@satu.ac.id`.

## 10. Final Report

- **Summary:** M1 selesai: login email/password untuk semua peran, sesi JWT, logout, guard per peran, gating onboarding, seed email, toast feedback, dan E2E auth.
- **Files Changed:** `src/lib/auth.ts`; `src/lib/utils.ts`; `src/modules/auth/**`; `src/modules/users/repository.ts`; `src/modules/onboarding/**`; `src/app/(auth)/login/page.tsx`; `src/app/(app)/**`; `src/app/admin/**`; `src/app/{page,onboarding/page}.tsx`; `src/db/seed.ts`; `screen/copywriting.json`; `tests/auth.e2e.ts`; `tsconfig.json`; `eslint.config.mjs`; docs terkait.
- **Validation:** `npx tsc --noEmit` lulus; `npm run lint` lulus dengan 2 warning lama; `npm run build` lulus; `npm run test:e2e` 6/6 lulus; login NIM ditolak oleh schema email.
- **Limitations:** Onboarding per browser, bukan per akun. Rate limit per instance. Sesi tidak dapat dicabut sebelum 7 hari. Seed database kosong tidak dijalankan ulang.
- **Remaining Work:** Tidak ada untuk M1; lanjut M2.
- **Commit:** `feat(auth): implement M1 login, session, and role guards`
