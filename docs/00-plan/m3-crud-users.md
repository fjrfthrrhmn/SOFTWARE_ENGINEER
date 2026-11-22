# Implementation Plan

**Task:** Implementasi halaman admin `Kelola Pengguna`: data table dengan pola shadcn base data-table, data pengguna dari database, drawer filter role/status/reset via `nuqs`, serta CRUD pengguna — tambah dan ubah lewat drawer form dari `button-create-users` dan kolom `Aksi`, nonaktifkan lewat dialog konfirmasi.
**Status:** `COMPLETE`
**Created:** `2026-11-17`
**Updated:** `2026-11-18`

> Phase 1–4 selesai dari plan sebelumnya (`m3-pengguna-data-table.md`, kini di-rename ke file ini). Phase 5–9 sudah dieksekusi dan terverifikasi. Phase 10 sudah dieksekusi dan terverifikasi.

## 1. Discovery

- [x] `AGENTS.md` dan dokumentasi relevan dibaca.
- [x] Arsitektur dan konvensi proyek diperiksa.
- [x] Codebase dan reusable patterns diperiksa.
- [x] API / data contracts diperiksa jika relevan.

**Findings:**
- Relevant files:
  - `screen/ui-dashboard-pengguna.html`
  - `docs/TEMPLATE.PLAN.md`
  - `docs/ARCHITECTURE.md`
  - `docs/MODULES.md`
  - `docs/01-functional-requirements/admin/FR-16-MELIHAT-PENGGUNA.md`
  - `src/modules/users/types.ts`
  - `src/modules/users/repository.ts`
  - `src/lib/auth.ts`
  - `src/db/schema.ts`
  - `src/db/index.ts`
  - `src/app/layout.tsx`
  - `src/app/(root)/(app)/dashboard/page.tsx`
  - `src/modules/dashboard/components/dashboard-shell.tsx`
  - `src/modules/dashboard/components/bottom-nav-bar.tsx`
  - `components.json`
  - `package.json`
  - Referensi eksternal:
    - `https://ui.shadcn.com/docs/components/base/data-table`
    - `https://nuqs.dev/docs/adapters`
    - `https://nuqs.dev/docs/batching`
  - Dokumen dan pola untuk CRUD:
    - `docs/01-functional-requirements/admin/FR-17-MENAMBAH-PENGGUNA.md`
    - `docs/01-functional-requirements/admin/FR-18-MENGUBAH-PENGGUNA.md`
    - `docs/01-functional-requirements/admin/FR-19-MENONAKTIFKAN-PENGGUNA.md`
    - `docs/MODULES.md`
    - `src/modules/auth/actions.ts`
    - `src/modules/auth/schema.ts`
    - `src/modules/auth/components/login-form.tsx`
    - `src/shared/components/ui/toast.tsx`
    - `src/lib/auth.ts`
    - `src/db/schema.ts`
    - `src/db/seed.ts`
    - `components.json`
- Current behavior:
  - `/dashboard/users` sudah berjalan dengan data database, pencarian `q`, filter role/status/reset via nuqs, empty state, dan pagination klien.
  - `src/app/(root)/(app)/dashboard/users/page.tsx:31`: `Button id="button-create-users"` sudah ada, tetapi pasif dan bukan client component.
  - `columns.tsx` belum memiliki kolom `Aksi`; prototype `screen/ui-dashboard-pengguna.html:562` hanya memuat tautan `Ubah` dan tidak punya tombol nonaktifkan.
  - `src/modules/users/actions.ts`, `service.ts`, dan `schema.ts` belum ada; server action baru ada di modul `auth` dan `onboarding`.
  - Belum ada `dialog.tsx`/`alert-dialog.tsx` di `src/shared/components/ui`; satu-satunya pola overlay adalah `drawer.tsx` (Base UI).
  - Toast memakai manager kustom `toast.add(...)` dari `src/shared/components/ui/toast.tsx`, dipasang lokal di komponen klien (belum ada `<Toaster />` global).
  - Belum ada `listStudyPrograms()`; `UserListItem` juga belum memuat `angkatan` dan `idProgramStudi` yang dibutuhkan form ubah.
  - Hash password saat ini hanya di `src/db/seed.ts` (`hashSync`, cost 10); runtime auth hanya membandingkan hash (`compare`).
  - `bcryptjs`, `@tanstack/react-form`, `zod`, `radix-ui`, dan `@base-ui/react` sudah terpasang; tidak perlu dependency baru untuk CRUD.
- Dependencies:
  - Modul `users`, `auth`, `dashboard`.
  - Drizzle ORM + Neon serverless.
  - `nuqs` untuk state query string.
  - TanStack Table v9 untuk data table sesuai panduan shadcn base.
  - shadcn base style `base-rhea`, alias `@/shared/components/ui`.
  - `radix-ui` dan `@base-ui/react` sudah terpasang.
- Limitations:
  - `UserListItem` belum memuat `angkatan` dan `idProgramStudi`; field ini perlu ditambahkan ke explicit select `listUsers()` agar form ubah bisa terisi dari baris tabel.
  - `findAuthUserByEmail` masih mengambil seluruh kolom termasuk `passwordHash`; query/form baru tidak boleh mengikuti pola ini.
  - `session.userId` dari `requireRole` diperlukan untuk melarang admin menonaktifkan akunnya sendiri.
  - Unik `email`, `nim`, dan `kodeDosen` dijamin schema DB, tetapi pengecekan service tetap diperlukan agar pesan error ramah pengguna.
  - Pola data-table shadcn base memakai TanStack Table v9 dengan `tableFeatures()` dan `useTable()`, berbeda dari API v8 yang lebih lama.

## 2. Task Understanding

- **Problem:** Halaman Kelola Pengguna sudah menampilkan dan menyaring data, tetapi `button-create-users` masih pasif, belum ada kolom `Aksi`, serta belum ada server action, validasi, dan penulisan data sehingga FR-17/FR-18/FR-19 belum terpenuhi.
- **Expected Outcome:**
  - Admin dapat membuka `/dashboard/users`, melihat data, mencari, memfilter, mereset, dan berpaginasi (sudah ada dari phase 1–4).
  - Klik `button-create-users` membuka drawer form tambah pengguna (mahasiswa/dosen): email, password, nama, NIM/Kode, role, serta angkatan dan program studi untuk mahasiswa.
  - Baris tabel memiliki kolom `Aksi` berisi tombol `Ubah` dan `Nonaktifkan`.
  - Tombol `Ubah` membuka drawer form ubah berisi data eksisting; email read-only dan `new_password` opsional.
  - Tombol `Nonaktifkan` membuka dialog konfirmasi; konfirmasi mengubah status menjadi `nonaktif` tanpa menghapus data.
  - Setiap mutasi divalidasi dan diautorisasi di server, ditulis lewat repository, memicu `revalidatePath`, serta memberi toast sukses/gagal.
  - Drawer filter direname menjadi `users-featured-drawer.tsx` dan mendapat opsi sort berdasarkan nama (A–Z/Z–A) lewat query string.
  - Tabel menampilkan kolom `Dibuat` dengan format tanggal dari dependency `date-fns`.
  - Header `Daftar Pengguna` memiliki badge `Total Data` di sisi kanan dengan layout `justify-between`.
- **Behavior Changes:**
  - `button-create-users` berubah dari pasif menjadi trigger drawer create.
  - Kolom `Aksi` muncul di tabel; baris dengan role admin tidak menampilkan tombol ubah/nonaktifkan.
  - Tabel diperbarui setelah create/update/deactivate tanpa refresh manual.
  - Sort nama dari drawer mengubah urutan baris dan tersimpan di URL.
  - Kolom `Dibuat` tampil pada tabel dari timestamp `pengguna.created_at`.
  - Badge `Total Data` tampil di sebelah kanan judul `Daftar Pengguna`.
- **Out of Scope:**
  - Reaktivasi akun `nonaktif` menjadi `aktif` lewat UI; FR-19 hanya diimplementasikan untuk penonaktifan.
  - Mengubah atau menonaktifkan akun admin; admin hanya mengelola mahasiswa/dosen.
  - Perubahan schema database atau migrasi baru; constraint unik yang ada sudah mencukupi.
  - Upload/bulk import pengguna, export, sorting, column visibility, row selection, dan bulk action.
  - Reset password lewat email, notifikasi email, dan audit log terpisah.
  - Perubahan alur auth/login, session, atau seed selain memakai helper hash bcrypt yang sudah ada.
  - Perbaikan route map usang di `docs/ARCHITECTURE.md`.
- **Asumsi:** Drawer create/ubah memakai komponen `Drawer` yang sama dengan filter, dengan form TanStack Form + Zod; dialog konfirmasi memakai komponen `Dialog` shadcn base yang dibuat via CLI; seluruh mutasi memakai server action modul `users`, bukan route handler.

## 3. Technical Approach

- **Selected Approach:**
  - Baca: Server Component mengambil seluruh baris pengguna aman dari database sekali per request; `useQueryStates` nuqs menjadi source of truth untuk `q`, `role`, `status`; helper murni memfilter sebelum data masuk ke TanStack Table; reset filter pakai `setFilters(null)`. Tidak memakai `shallow: false` karena filter dan pagination berjalan di klien.
  - Tulis: server action modul `users` mengikuti pola hasil `{ ok, error, fieldErrors }` dari `src/modules/auth/actions.ts`; validasi Zod dua lapis (`validators.onSubmit` di klien dan `safeParse` di server); `requireRole(["admin"])` di setiap action; repository menulis dengan transaksi Drizzle agar `pengguna` dan profil konsisten.
  - Satu `UserFormDrawer` dipakai untuk mode `create` dan `update`; field `angkatan` dan `programStudi` dirender kondisional hanya untuk role mahasiswa.
   - Dialog konfirmasi memakai komponen `Dialog` terkontrol; tombol konfirmasi memanggil action lewat `useTransition` agar bisa disabled saat pending.
   - Sort nama, filter, dan pencarian tetap berada di helper murni `filterUsers()` sebelum data masuk ke tabel; tidak menambah fitur sorting header TanStack Table.
- **Architecture:**
  - Path baca tetap seperti phase 1–3 (`NuqsAdapter`, `search-params.ts`, `filter-users.ts`, `UsersPage`, `UsersDataTable`).
  - `src/modules/users/schema.ts`: `createUserSchema`, `updateUserSchema`, `deactivateUserSchema` (Zod v4; field mahasiswa divalidasi kondisional memakai `superRefine` atau discriminated union).
  - `src/modules/users/types.ts`: `CreateUserInput`, `UpdateUserInput`, `UserMutationResult`, serta perluasan `UserListItem` dengan `angkatan` dan `idProgramStudi`.
  - `src/modules/users/service.ts`: aturan unik email/identitas, hash password `bcryptjs` cost 10, larangan menonaktifkan akun sendiri/admin.
  - `src/modules/users/repository.ts`: `listStudyPrograms()`, perluasan `listUsers()` dengan `angkatan`/`idProgramStudi`, `insertUserWithProfile()`, `updateUserWithProfile()`, `setUserStatus()` dalam `db.transaction`.
  - `src/db/index.ts`: driver diubah dari `drizzle-orm/neon-http` ke `drizzle-orm/neon-serverless` dengan `Pool` agar `db.transaction` didukung; paket `@neondatabase/serverless` sudah terpasang.
  - `src/modules/users/actions.ts`: `createUser`, `updateUser`, `deactivateUser`; `revalidatePath("/dashboard/users")`.
  - `src/modules/users/components/`: `user-form-drawer.tsx`, `create-user-drawer.tsx`, `user-actions.tsx`.
  - `src/modules/users/components/users-data-table/users-filter-drawer.tsx` direname menjadi `users-featured-drawer.tsx`, export `UsersFeaturedDrawer`, dan dipanggil dari `users-page.tsx`.
  - `createdAt` dari `pengguna.created_at` ditambahkan ke `UserListItem`, lalu diformat di kolom tabel memakai `date-fns`.
  - `src/shared/components/ui/dialog.tsx`: komponen dialog shadcn base baru dari CLI.
  - `src/app/(root)/(app)/dashboard/users/page.tsx`: mengganti `Button` statis dengan `<CreateUserDrawer />`, id tombol tetap `button-create-users`.
- **Data Flow:**
  - Create: `button-create-users` → `CreateUserDrawer` → `UserFormDrawer` → `createUser(input)` → service + repository → `revalidatePath` → toast sukses → drawer tutup → baris baru tampil.
  - Ubah: tombol `Ubah` di `user-actions.tsx` → `UserFormDrawer` dengan data dari baris `UserListItem` → `updateUser(id, input)` → cek unik identitas (kecuali diri sendiri) → hash `new_password` bila diisi → revalidate → toast.
  - Nonaktif: tombol `Nonaktifkan` → `Dialog` konfirmasi → `deactivateUser(id)` → guard `session.userId === id`/role admin → `setUserStatus(id, "nonaktif")` → revalidate → toast.
- **Database / API:**
  - Tanpa perubahan schema atau migrasi. `pengguna.email`, `mahasiswa.nim`, `dosen.kodeDosen` unik di DB sebagai guard akhir; service melakukan pre-check untuk pesan error spesifik.
  - `status` memakai enum `aktif | nonaktif`; penonaktifan adalah update flag, bukan delete.
  - `passwordHash` ditulis dari hash `bcryptjs`, tidak pernah dikirim ke klien atau masuk props komponen.
- **UI / State:**
  - State URL tetap `q`, `role`, `status` via nuqs; state lokal baru: `open` drawer create/ubah, `confirmOpen` dialog, user yang sedang diubah/dinonaktifkan, dan pending state.
  - Form memakai `Label`, `Input`/`InputGroup`, `Select`, `Button`, `Toaster`/`toast`; mengikuti `max-w-[640px]`, `DashboardShell`, token warna `globals.css`, dan gaya card `bg-card shadow-sm ring-1 ring-border`.
  - Setiap drawer diisi ulang `defaultValues` saat dibuka agar data user sebelumnya tidak tertinggal; password dikosongkan setelah submit gagal/sukses.
- **Security:**
  - `requireRole(["admin"])` di page **dan** di ketiga action; menyembunyikan tombol bukan otorisasi.
  - Service menolak target admin/akun sendiri; email tidak dapat diubah saat update.
  - Validasi server sebelum write; `password`/`new_password` tidak pernah dikembalikan atau dirender; `passwordHash` tidak di-select oleh query baru.
  - Nilai query dari URL divalidasi oleh `parseAsStringLiteral`; `q` dibatasi maksimal 100 karakter sebelum dipakai filter.
  - Tidak ada SQL di komponen; seluruh write lewat repository modul `users`.

## 4. Scope & Constraints

**In Scope:**
- Pasang `NuqsAdapter` di root layout (sudah done di phase 1).
- Definisikan parser nuqs untuk `q`, `role`, dan `status` (sudah done di phase 1).
- Query daftar pengguna dari database dengan join profil sesuai peran (sudah done di phase 1).
- DataTable shadcn base dengan TanStack Table v9 untuk render dan pagination (sudah done di phase 2).
- Drawer filter shadcn base berisi filter role, filter status, dan reset (sudah done di phase 2).
- Input pencarian teks yang tersinkron dengan `q` di URL (sudah done di phase 2).
- Empty state dan ringkasan hasil setelah filter (sudah done di phase 2).
- Route `/dashboard/users` dan loading state (sudah done di phase 3).
- Skenario E2E untuk melihat, mencari, memfilter, mereset, dan berpaginasi data pengguna (sudah done di phase 4).
- Zod schema, tipe input/hasil, dan query pendukung form (`listStudyPrograms`, detail user untuk ubah).
- Server action `createUser`, `updateUser`, `deactivateUser` beserta service dan repository write dengan transaksi.
- `button-create-users` sebagai trigger drawer form tambah pengguna.
- Kolom `Aksi` dengan tombol `Ubah` dan `Nonaktifkan` pada tabel.
- Drawer form ubah dengan email read-only dan `new_password` opsional.
- Dialog konfirmasi nonaktifkan dengan guard admin/akun sendiri.
- Toast sukses/gagal dan `revalidatePath` setelah mutasi.
- E2E untuk create, ubah, dan nonaktifkan pengguna.
- Rename `UsersFilterDrawer` menjadi `UsersFeaturedDrawer` beserta file dan importnya.
- Opsi sort nama (A–Z/Z–A) di drawer, tersimpan sebagai `sort` di query string.
- Kolom `Dibuat` berisi tanggal pembuatan akun, diformat dengan `date-fns`.
- Badge `Total Data` pada header `Daftar Pengguna`.

**Out of Scope:**
- Data demo array di prototype; semua baris tetap berasal dari database.
- Reaktivasi pengguna dan kontrol status tambahan di UI.
- Mutasi akun admin; peran yang dapat dibuat hanya mahasiswa/dosen.
- Sorting, column visibility, row selection, export, dan bulk action.
- Dependency baru: semua library sudah terpasang; `dialog.tsx` dibuat dari shadcn CLI lokal.
- Perubahan pada modul auth, schema DB, seed, atau migrasi.
- Upload/bulk import pengguna dan notifikasi email.
- Perbaikan route map usang di `docs/ARCHITECTURE.md`.
- Sorting lewat header kolom TanStack Table; sort hanya tersedia di drawer.
- Server-side sorting/pagination dan konfigurasi timezone format tanggal.

**Constraints:**
- Default Server Component; `"use client"` hanya untuk adapter wrapper, halaman interaktif, drawer, dialog, dan tabel.
- Akses DB hanya lewat `src/modules/users/repository.ts` dan `src/db/index.ts`.
- Periksa session dan peran di server pada page **dan** setiap action.
- Filter URL memakai `nuqs`, bukan `useState` lokal untuk `q`/`role`/`status`.
- Mutasi `pengguna` + profil harus berada dalam satu transaksi database.
- `max-w-[640px]` harus dipertahankan.
- Identifier kode bahasa Inggris; dokumen dan copy UI bahasa Indonesia.
- Tanpa komentar kecuali keputusan non-obvious.
- Migrasi di `drizzle/` tidak diubah manual.

## 5. Implementation Phases

### Phase 1 — Data baca, tipe, dan fondasi nuqs

**Objective:** Modul `users` mampu mengambil daftar pengguna aman dari database, dan aplikasi siap memakai hook nuqs di App Router.

**Files:**
- CREATE: `src/modules/users/search-params.ts`
- MODIFY: `src/modules/users/types.ts`
- MODIFY: `src/modules/users/repository.ts`
- MODIFY: `src/app/layout.tsx`

**Tasks:**
- [x] Tambah tipe `UserListItem` dengan field `id`, `nama`, `identitas`, `email`, `role`, `status`, dan `keterangan`; tidak termasuk `passwordHash`.
- [x] Tambah `UserFilters` sebagai tipe hasil parser nuqs: `q: string`, `role: "all" | "mahasiswa" | "dosen" | "admin"`, `status: "all" | "aktif" | "nonaktif"`.
- [x] Buat `src/modules/users/search-params.ts` berisi `userFiltersParsers`: `parseAsString.withDefault("")` untuk `q`, `parseAsStringLiteral([...]).withDefault("all")` untuk `role` dan `status`.
- [x] Tambah `listUsers()` di `repository.ts`: explicit select `pengguna.id, email, role, status`, nama dan identitas dari tabel profil sesuai role, serta `keterangan` dari program studi/angkatan untuk mahasiswa atau unit untuk dosen/admin; gunakan left join yang sama dengan `getUserProfile`.
- [x] Pasang `NuqsAdapter` dari `nuqs/adapters/next/app` di `src/app/layout.tsx` di dalam `ThemeProvider` dan membungkus konten `children`.
- [x] Pastikan `nuqs` tidak diinstal ulang karena sudah ada di `package.json`.

**Dependencies:** none

**Validation:**
- [x] `npm run build` lolos (TypeScript tercakup).
- [x] Tidak ada `passwordHash` di return type atau query `listUsers()`.
- [x] Hook nuqs dapat dipanggil dari komponen di bawah root layout tanpa error adapter.

**Completion Criteria:** `listUsers()`, parser filter, dan `NuqsAdapter` tersedia tanpa perubahan schema database.

### Phase 2 — Tabel data dan drawer filter

**Objective:** Tabel pengguna client-side mengikuti pola shadcn base data-table dan filter role/status/reset berjalan lewat URL state.

**Files:**
- CREATE: `src/shared/components/ui/table.tsx`
- CREATE: `src/shared/components/ui/drawer.tsx`
- CREATE: `src/modules/users/components/users-data-table/data-table-features.ts`
- CREATE: `src/modules/users/components/users-data-table/columns.tsx`
- CREATE: `src/modules/users/components/users-data-table/data-table.tsx`
- CREATE: `src/modules/users/components/users-filter-drawer.tsx`
- CREATE: `src/modules/users/components/users-page.tsx`
- CREATE: `src/modules/users/filter-users.ts`
- MODIFY: `package.json`
- MODIFY: `package-lock.json`

**Tasks:**
- [x] Install `@tanstack/react-table` versi v9 sesuai dokumentasi shadcn base data-table.
- [x] Generate `src/shared/components/ui/table.tsx` dan `src/shared/components/ui/drawer.tsx` via shadcn CLI dengan `components.json` yang ada.
- [x] Buat `data-table-features.ts` hanya dengan fitur pagination: `rowPaginationFeature`, `createPaginatedRowModel()`, dan tipe fitur turunannya.
- [x] Buat `columns.tsx` dengan tiga kolom: Pengguna berisi inisial + nama + identitas/email, Peran badge, Status badge; belum ada kolom Aksi.
- [x] Buat `filter-users.ts` dengan fungsi murni `filterUsers(data, filters)`: potong `q` maksimal 100 karakter, cocokkan nama/identitas/email/keterangan, lalu terapkan `role` dan `status` bukan `all`.
- [x] Buat `UsersDataTable`: `useTable`, state pagination, header/body via `table.FlexRender`, empty state memakai `data-not-found.png`, ringkasan hasil, dan kontrol Previous/Next.
- [x] Buat `UsersFilterDrawer` controlled: role dan status memakai native select, tombol `Reset filter` memanggil `setFilters(null)`, dan penutup drawer memakai komponen Drawer shadcn.
- [x] Buat `UsersPage` client: `useQueryStates(userFiltersParsers)`, input pencarian tersinkron dengan `q`, kartu featured dengan tombol `Atur Filter`, lalu render `UsersDataTable` dengan hasil `filterUsers`.
- [x] Pastikan setiap perubahan filter mengembalikan pagination ke halaman pertama.
- [x] Pertahankan gaya prototype: card ring-border, badge rounded-full, `tabular-nums`, fokus ring, dan lebar tabel minimum untuk scroll horizontal di layar 640px.

**Dependencies:** Phase 1

**Validation:**
- [x] `npm run lint` lolos.
- [x] `npm run build` lolos.
- [x] Tabel merender data seed tanpa error hydration.
- [x] `q`, `role`, dan `status` muncul/berubah di URL saat filter dipakai.
- [x] Reset menghapus key filter dari URL dan mengembalikan seluruh baris.
- [x] Refresh dan back/forward mengembalikan tampilan tabel sesuai URL.

**Completion Criteria:** DataTable, filter drawer, dan URL state berfungsi end-to-end di sisi klien.

### Phase 3 — Route halaman

**Objective:** Halaman `/dashboard/users` tersedia untuk admin dengan data dari database.

**Files:**
- CREATE: `src/app/(root)/(app)/dashboard/users/page.tsx`
- CREATE: `src/app/(root)/(app)/dashboard/users/loading.tsx`

**Tasks:**
- [x] Buat `page.tsx`: `requireRole(["admin"])`, `getUserProfile` untuk header, `listUsers`, lalu render `DashboardShell` dengan heading `Kelola Pengguna` dan `<UsersPage data={users} />`.
- [x] Pastikan non-admin mendapat redirect/unauthorized dari `requireRole`.
- [x] Buat `loading.tsx` skeleton untuk header, kartu featured, toolbar, dan baris tabel.

**Dependencies:** Phase 1, Phase 2

**Validation:**
- [x] `npm run lint` lolos.
- [x] `npm run build` lolos.
- [x] Admin dapat membuka `/dashboard/users`; mahasiswa/dosen tidak dapat mengakses.
- [x] Data yang tampil berasal dari database, bukan array prototype.

**Completion Criteria:** Route admin tersedia dan menampilkan data database lengkap dengan filter URL.

### Phase 4 — Verifikasi, E2E, dan kerapian

**Objective:** Pastikan perubahan memenuhi konvensi proyek dan alur utama teruji.

**Files:**
- CREATE: `tests/pengguna.e2e.ts`
- MODIFY: `docs/00-plan/m3-crud-users.md`

**Tasks:**
- [x] Tambah skenario E2E: login admin dari kredensial environment, buka `/dashboard/users`, verifikasi heading dan tabel, cari pengguna, buka drawer filter, pilih role, pilih status, verifikasi URL, reset filter, verifikasi URL bersih, lalu uji pagination.
- [x] Pastikan test tidak menuliskan kredensial atau password plaintext ke repositori.
- [x] Jalankan `npm run lint`, `npm run build`, dan `npm run test:e2e`.
- [x] Perbarui status plan, execution log, dan final report sesuai hasil aktual.

**Dependencies:** Phase 1, Phase 2, Phase 3

**Validation:**
- [x] Semua perintah verifikasi lolos tanpa error baru.
- [x] Tidak ada file source, dependency, atau docs lain yang berubah di luar file map.
- [x] `git status` hanya memuat file yang direncanakan.

**Completion Criteria:** Plan status `COMPLETE` dan semua temuan verifikasi tercatat.

### Phase 5 — Schema, tipe, dan repository pendukung form

**Objective:** Modul `users` memiliki kontrak input mutasi dan query pendukung form tanpa mengubah schema database.

**Files:**
- CREATE: `src/modules/users/schema.ts`
- MODIFY: `src/modules/users/types.ts`
- MODIFY: `src/modules/users/repository.ts`

**Tasks:**
- [x] Buat `createUserSchema`: `email` trim/lowercase/format email, `password` minimal 8 dan maksimal 72 byte, `nama` minimal 1 karakter, `identitas` minimal 1 karakter, `role` hanya `mahasiswa | dosen`, `angkatan` integer, `programStudiId` integer positif; `superRefine` mewajibkan `angkatan` dan `programStudiId` hanya untuk mahasiswa.
- [x] Buat `updateUserSchema`: field sama tanpa `password` wajib; `new_password` opsional minimal 8 karakter bila diisi; tidak memuat `email` karena email read-only.
- [x] Buat `deactivateUserSchema`: `userId` integer positif.
- [x] Tambah tipe `CreateUserInput`, `UpdateUserInput`, `UserMutationResult`, dan perluas `UserListItem` dengan `angkatan: number | null` serta `idProgramStudi: number | null`.
- [x] Perluas explicit select `listUsers()` dengan `mahasiswa.angkatan` dan `mahasiswa.idProgramStudi`; `passwordHash` tetap tidak dipilih.
- [x] Tambah `listStudyPrograms()` yang memilih `id` dan `nama` dari `programStudi`, diurutkan berdasarkan nama.
- [x] Tambah `insertUserWithProfile()`, `updateUserWithProfile()`, dan `setUserStatus()` di dalam `db.transaction`; menulis `pengguna` + `mahasiswa`/`dosen` sesuai role dan mengisi `updatedAt` secara eksplisit.
- [x] Pastikan update tidak memaksa profil role lama tetap ada saat role berubah.

**Dependencies:** Phase 1

**Validation:**
- [x] `npm run build` lolos (typecheck tercakup).
- [x] Tidak ada `passwordHash` di schema input, tipe baru, atau query baru.
- [x] `listUsers()` tetap mengembalikan data mahasiswa/dosen/admin seperti sebelumnya.

**Completion Criteria:** Schema Zod, tipe, dan repository write/read untuk CRUD tersedia tanpa perubahan schema database.

### Phase 6 — Server action, service, dan otorisasi

**Objective:** Mutasi pengguna berjalan aman di server dengan validasi, otorisasi admin, dan hasil yang konsisten untuk form.

**Files:**
- CREATE: `src/modules/users/service.ts`
- CREATE: `src/modules/users/actions.ts`

**Tasks:**
- [x] Tambah helper service: pengecekan unik email (memakai `findAuthUserByEmail`) dan unik identitas/NIM/kode dosen, serta hash password dengan `hash` dari `bcryptjs` cost 10.
- [x] `createUser(input)`: `requireRole(["admin"])`, `safeParse`, cek unik, hash password, `insertUserWithProfile`, `revalidatePath("/dashboard/users")`, kembalikan `{ ok: true }`.
- [x] `updateUser(id, input)`: `requireRole(["admin"])`, `safeParse`, pastikan user ada, cek unik identitas kecuali id yang sama, hash `new_password` hanya bila diisi, `updateUserWithProfile`, revalidate, kembalikan hasil.
- [x] `deactivateUser(id)`: `requireRole(["admin"])`, `safeParse`, tolak bila `id === session.userId` atau target berrole admin, `setUserStatus(id, "nonaktif")`, revalidate, kembalikan hasil.
- [x] Mapping error konsisten: `invalid_input` + `fieldErrors`, `email_taken`, `identity_taken`, `user_not_found`, `cannot_deactivate_self`, dan `server_error`.
- [x] Tangani pelanggaran unique constraint dari database sebagai conflict field error, bukan exception mentah.
- [x] Pastikan nilai `password`/`new_password` dan `passwordHash` tidak pernah masuk nilai kembalian action.

**Dependencies:** Phase 5

**Validation:**
- [x] `npm run lint` dan `npm run build` lolos.
- [x] Non-admin tidak dapat mengeksekusi ketiga action (dicek lewat guard `requireRole`).
- [x] Tidak ada password plaintext yang tersimpan atau dikembalikan.

**Completion Criteria:** Tiga server action terautorisasi, tervalidasi, dan mengembalikan shape hasil yang dipakai form.

### Phase 7 — Drawer form tambah dan ubah pengguna

**Objective:** `button-create-users` membuka drawer create, dan tombol `Ubah` kelak memakai drawer yang sama dalam mode update.

**Files:**
- CREATE: `src/modules/users/components/user-form-drawer.tsx`
- CREATE: `src/modules/users/components/create-user-drawer.tsx`
- MODIFY: `src/app/(root)/(app)/dashboard/users/page.tsx`

**Tasks:**
- [x] Buat `UserFormDrawer` controlled dengan props `mode`, `user` (`UserListItem | null`), `studyPrograms`, `open`, dan `onOpenChange`.
- [x] Pakai `useForm` dari `@tanstack/react-form` dengan `defaultValues` dari `user` saat mode ubah, serta `validators.onSubmit` memakai `createUserSchema` atau `updateUserSchema`.
- [x] Render field dengan `Label`, `Input`/`InputGroup`, dan `Select`; field `angkatan` serta `programStudi` hanya muncul saat `role === "mahasiswa"`.
- [x] Mode ubah menampilkan email read-only dan field `new_password` opsional; mode create menampilkan `password` wajib.
- [x] Submit memanggil `createUser`/`updateUser`; error ditampilkan via `errorMessage(field.state.meta.errors)` dan `toast.add({ type: "error", ... })`; sukses menampilkan toast sukses lalu menutup drawer.
- [x] Pasang `<Toaster />` di dalam komponen klien, ikuti pola `src/modules/auth/components/login-form.tsx`.
- [x] `form.Subscribe` mengunci tombol submit saat pending; password dikosongkan setelah submit; nilai lain dipertahankan saat gagal.
- [x] Buat `CreateUserDrawer` dengan trigger `render={<Button id="button-create-users" ...>Tambah Pengguna Baru</Button>}` agar id tombol tidak berubah.
- [x] Di `page.tsx`, ambil `listStudyPrograms()` dan ganti `Button` statis dengan `<CreateUserDrawer studyPrograms={...} />`.

**Dependencies:** Phase 5, Phase 6

**Validation:**
- [x] `npm run lint` dan `npm run build` lolos.
- [x] Klik `#button-create-users` membuka drawer create dan dapat ditutup tanpa menulis data.
- [x] Field mahasiswa muncul/hilang sesuai pilihan role; validasi client menampilkan pesan.
- [x] Submit create sukses memunculkan toast dan baris baru muncul setelah revalidate.

**Completion Criteria:** Drawer create berfungsi penuh dan drawer ubah siap dipakai oleh kolom `Aksi`.

### Phase 8 — Kolom Aksi dan dialog konfirmasi nonaktifkan

**Objective:** Setiap baris mahasiswa/dosen memiliki tombol `Ubah` dan `Nonaktifkan` dengan konfirmasi yang aman.

**Files:**
- CREATE: `src/shared/components/ui/dialog.tsx`
- CREATE: `src/modules/users/components/user-actions.tsx`
- MODIFY: `src/modules/users/components/users-data-table/columns.tsx`
- MODIFY: `src/modules/users/components/users-data-table/data-table.tsx`
- MODIFY: `src/modules/users/components/users-page.tsx`

**Tasks:**
- [x] Generate `src/shared/components/ui/dialog.tsx` via shadcn CLI mengikuti `components.json` (`base-rhea`); tanpa dependency baru.
- [x] Ubah `userColumns` menjadi `createUserColumns(studyPrograms)` dan tambah kolom display `Aksi` yang merender `<UserActions user={row.original} studyPrograms={studyPrograms} />`.
- [x] Teruskan `studyPrograms`: `page.tsx` → `UsersPage` → `UsersDataTable` → `createUserColumns`.
- [x] `UserActions` merender dua tombol: `Ubah` membuka `UserFormDrawer` mode ubah dengan data baris, dan `Nonaktifkan` membuka `Dialog` konfirmasi.
- [x] Sembunyikan kedua tombol untuk baris `role === "admin"`; sembunyikan `Nonaktifkan` untuk status `nonaktif`.
- [x] `Dialog` menampilkan nama dan identitas pengguna, tombol `Batal`, serta tombol konfirmasi `Nonaktifkan` yang memanggil `deactivateUser(user.id)` via `useTransition`.
- [x] Toast sukses/gagal ditampilkan; dialog hanya ditutup saat sukses; batal tidak mengubah data.
- [x] Pastikan lebar tabel minimum dan layout `max-w-[640px]` tetap terjaga setelah kolom baru ditambahkan.

**Dependencies:** Phase 6, Phase 7

**Validation:**
- [x] `npm run lint` dan `npm run build` lolos.
- [x] Kolom `Aksi` tampil hanya untuk mahasiswa/dosen; tombol update membuka drawer terisi.
- [x] Dialog konfirmasi muncul saat klik `Nonaktifkan`; batal membatalkan perubahan.
- [x] Konfirmasi mengubah status baris menjadi `nonaktif` tanpa menghapus baris.

**Completion Criteria:** FR-18 dan FR-19 dapat dijalankan dari tabel dengan guard admin yang benar.

### Phase 9 — Verifikasi, E2E, dan kerapian

**Objective:** Pastikan alur CRUD teruji dan dokumentasi plan mencerminkan hasil aktual.

**Files:**
- MODIFY: `tests/pengguna.e2e.ts`
- MODIFY: `docs/00-plan/m3-crud-users.md`

**Tasks:**
- [x] Tambah skenario E2E: login admin, klik `#button-create-users`, isi form dosen, simpan, verifikasi toast dan baris baru.
- [x] Tambah skenario E2E ubah: buka drawer `Ubah` dari baris hasil create, ubah nama, simpan, verifikasi perubahan tampil.
- [x] Tambah skenario E2E nonaktifkan: klik `Nonaktifkan`, verifikasi dialog, pilih `Batal` dan pastikan status tidak berubah, lalu konfirmasi dan verifikasi status `nonaktif`.
- [x] Tambah skenario negatif: duplikat email/identitas ditolak dengan pesan error dan form tetap terisi.
- [x] Gunakan email/identitas unik bersuffix timestamp agar test dapat diulang; password uji memakai nilai dummy, bukan kredensial admin dari environment.
- [x] Jalankan `npm run lint`, `npm run build`, dan `npm run test:e2e`.
- [x] Perbarui status plan, execution log, dan final report sesuai hasil aktual.

**Dependencies:** Phase 5, Phase 6, Phase 7, Phase 8

**Validation:**
- [x] Semua perintah verifikasi lolos tanpa error baru.
- [x] `git status` hanya memuat file yang direncanakan.
- [x] Tidak ada perubahan source, dependency, atau docs di luar file map.

**Completion Criteria:** Plan status `COMPLETE`, FR-17/FR-18/FR-19 terverifikasi, dan temuan tercatat.

### Phase 10 — Sort nama, kolom Dibuat, dan badge Total Data

**Objective:** Menambahkan sort nama di drawer filter yang direname, kolom tanggal dibuat dengan `date-fns`, dan badge total data pada header daftar pengguna.

**Files:**
- MODIFY: `src/modules/users/search-params.ts`
- MODIFY: `src/modules/users/types.ts`
- MODIFY: `src/modules/users/repository.ts`
- MODIFY: `src/modules/users/filter-users.ts`
- RENAME: `src/modules/users/components/users-data-table/users-filter-drawer.tsx` → `src/modules/users/components/users-data-table/users-featured-drawer.tsx`
- MODIFY: `src/modules/users/components/users-page.tsx`
- MODIFY: `src/modules/users/components/users-data-table/columns.tsx`
- MODIFY: `tests/pengguna.e2e.ts`
- MODIFY: `docs/00-plan/m3-crud-users.md`

**Tasks:**
- [x] Pakai fallback `date-fns` yang sudah terpasang dan disetujui; tidak menambah dependency baru.
- [x] Tambah parser `sort` di `userFiltersParsers`: `parseAsStringLiteral(["name-asc", "name-desc"] as const).withDefault("name-asc")`.
- [x] Tambah `sort: "name-asc" | "name-desc"` ke `UserFilters` dan `createdAt: Date` ke `UserListItem`.
- [x] Perluas select `listUsers()` dengan `pengguna.createdAt` dan petakan ke semua cabang role; jangan memilih `passwordHash`.
- [x] Ubah `filterUsers()` untuk mengurutkan hasil setelah filter memakai `nama.localeCompare(..., "id", { sensitivity: "base" })`; arah ditentukan `sort`.
- [x] Rename file dan export menjadi `UsersFeaturedDrawer`; trigger `Atur Filter` dan judul `Filter Pengguna` dipertahankan agar E2E lama tidak rusak.
- [x] Tambah control `Sort by` di drawer dengan opsi `Nama (A–Z)` dan `Nama (Z–A)` yang menulis `sort` lewat `onFiltersChange`; `Reset filter` juga mengembalikan sort default.
- [x] Update import dan props di `users-page.tsx` setelah rename drawer.
- [x] Tambah kolom `Dibuat` di `columns.tsx` yang menampilkan `createdAt` dengan `format(createdAt, "dd MMM yyyy", { locale: id })` dari `date-fns`/`date-fns/locale`.
- [x] Tambah badge `Total Data` di header `Daftar Pengguna` dengan layout `justify-between`; nilai memakai `filteredUsers.length` (jumlah hasil filter aktif).
- [x] Tambah E2E: buka drawer, pilih sort nama, verifikasi URL `sort=name-desc`, verifikasi urutan berubah; verifikasi kolom `Dibuat` dan badge `Total Data` tampil.

**Dependencies:** Phase 1–9

**Validation:**
- [x] `npm run lint`, `npm run build`, dan `npm run test:e2e` lolos.
- [x] URL memuat `sort` dan reset filter menghapusnya kembali ke default.
- [x] Urutan tabel berubah sesuai sort nama untuk semua role.
- [x] Kolom `Dibuat` menampilkan tanggal yang valid dan tidak `Invalid Date`.
- [x] Badge `Total Data` tampil sejajar dengan judul `Daftar Pengguna`.

**Completion Criteria:** Sort nama, kolom `Dibuat`, dan badge `Total Data` berfungsi end-to-end memakai `date-fns` yang sudah terpasang.

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `docs/00-plan/m3-crud-users.md` | RENAME | Living implementation contract (dari `m3-pengguna-data-table.md`) | 0, 9 |
| `src/app/layout.tsx` | MODIFY | Pasang `NuqsAdapter` | 1 |
| `src/modules/users/search-params.ts` | CREATE / MODIFY | Parser nuqs untuk filter dan sort nama | 1, 10 |
| `src/modules/users/types.ts` | MODIFY | Tipe `UserListItem`, `UserFilters`, input/hasil CRUD, `createdAt` | 1, 5, 10 |
| `src/modules/users/repository.ts` | MODIFY | `listUsers()`, query prodi, write transaksi CRUD, `createdAt` | 1, 5, 10 |
| `src/db/index.ts` | MODIFY | Driver `neon-serverless` untuk transaksi Drizzle | 5 |
| `package.json` | MODIFY | Tambah `@tanstack/react-table`; `date-fns` sudah ada sejak awal | 2 |
| `package-lock.json` | MODIFY | Lock dependency baru `@tanstack/react-table` | 2 |
| `src/shared/components/ui/table.tsx` | CREATE | Komponen tabel shadcn base | 2 |
| `src/shared/components/ui/drawer.tsx` | CREATE | Komponen drawer shadcn base | 2 |
| `src/modules/users/filter-users.ts` | CREATE / MODIFY | Helper filter murni berdasarkan URL state dan sort nama | 2, 10 |
| `src/modules/users/components/users-data-table/data-table-features.ts` | CREATE | Konfigurasi fitur pagination TanStack v9 | 2 |
| `src/modules/users/components/users-data-table/columns.tsx` | CREATE / MODIFY | Definisi kolom tabel + `Aksi` + `Dibuat` | 2, 8, 10 |
| `src/modules/users/components/users-data-table/data-table.tsx` | CREATE / MODIFY | Render tabel, empty state, pagination, teruskan prodi | 2, 8 |
| `src/modules/users/components/users-data-table/users-filter-drawer.tsx` | RENAME | Diganti menjadi `users-featured-drawer.tsx` | 2, 10 |
| `src/modules/users/components/users-data-table/users-featured-drawer.tsx` | RENAME / MODIFY | Drawer role/status/sort/reset | 2, 10 |
| `src/modules/users/components/users-page.tsx` | CREATE / MODIFY | Client wrapper, URL state, prodi, badge `Total Data` | 2, 8, 10 |
| `src/app/(root)/(app)/dashboard/users/page.tsx` | CREATE / MODIFY | Route admin, fetch prodi, trigger create | 3, 7 |
| `src/app/(root)/(app)/dashboard/users/loading.tsx` | CREATE | Loading skeleton halaman | 3 |
| `tests/pengguna.e2e.ts` | CREATE / MODIFY | E2E lihat/filter + CRUD + sort/Dibuat/Total Data | 4, 9, 10 |
| `src/modules/users/schema.ts` | CREATE | Zod schema create/update/deactivate | 5 |
| `src/modules/users/service.ts` | CREATE | Unik, hash password, guard admin/self | 6 |
| `src/modules/users/actions.ts` | CREATE | Server action create/update/deactivate | 6 |
| `src/modules/users/components/user-form-drawer.tsx` | CREATE | Form TanStack Form create/ubah | 7 |
| `src/modules/users/components/create-user-drawer.tsx` | CREATE | Trigger `#button-create-users` + drawer create | 7 |
| `src/shared/components/ui/dialog.tsx` | CREATE | Komponen dialog konfirmasi shadcn base | 8 |
| `src/modules/users/components/user-actions.tsx` | CREATE | Tombol `Ubah`/`Nonaktifkan` + dialog | 8 |

## 7. Risks & Validation

| Risk / Edge Case | Impact | Mitigation |
|---|---|---|
| `NuqsAdapter` belum terpasang | Hook nuqs error saat render | Pasang adapter di root layout sebelum komponen apa pun memakai `useQueryStates` |
| API TanStack Table v9 berbeda dari v8 | DataTable tidak kompilasi | Pasang versi v9, ikuti `tableFeatures()` + `useTable()` dari referensi shadcn, verifikasi dengan build |
| Query value tidak valid dari URL | State filter tidak terduga | `parseAsStringLiteral` menolak nilai di luar enum; parser kembali ke default |
| Reset filter tidak menghapus parameter | URL tetap kotor | Pakai `setFilters(null)` dan uji dengan E2E |
| Filter berubah saat halaman pagination aktif | Halaman kosong | Reset pagination ke halaman pertama pada setiap perubahan filter |
| `passwordHash` terbawa ke klien | Kebocoran data sensitif | Explicit select di repository dan tipe `UserListItem` tanpa field tersebut |
| Seluruh data diambil sekali per request | Lambat saat data besar | Terima untuk tahap ini; pindah ke server-side pagination bila waktu muat atau ukuran data menjadi masalah |
| Drawer filter menutup saat pilih role/status | User harus buka ulang untuk filter lain | Biarkan drawer terbuka sampai tombol tutup ditekan; perubahan langsung tercermin di tabel |
| Route diakses non-admin | Pelanggaran izin | `requireRole(["admin"])` di page dan di semua action |
| Email/NIM/kode dosen duplikat saat konkuren | Data bentrok meski sudah dicek service | Constraint unik DB sebagai guard akhir; map conflict menjadi `fieldErrors` |
| `pengguna` tersimpan tanpa profil atau sebaliknya | Data yatim | `insertUserWithProfile`/`updateUserWithProfile` memakai `db.transaction` |
| Password plaintext atau hash ikut ke form | Kebocoran kredensial | Hash `bcryptjs` di service; `passwordHash` tidak di-select dan tidak masuk props/tipe |
| Admin menonaktifkan akunnya sendiri | Admin terkunci dari sistem | Sembunyikan tombol untuk baris admin dan tolak di service dengan `session.userId` |
| Update mengubah email | Identitas login berubah tak sengaja | Email read-only di form dan tidak termasuk `updateUserSchema` |
| Role diubah mahasiswa ↔ dosen | Profil lama tertinggal | Update profil sesuai role baru di dalam transaksi |
| Drawer menyimpan data user sebelumnya | Form ubah menimpa user salah | `defaultValues` diisi ulang setiap drawer dibuka; state target di-reset saat tutup |
| Tabel tidak segar setelah mutasi | Perubahan tidak tampil | `revalidatePath("/dashboard/users")` pada semua action sukses |
| Tidak ada komponen `Dialog` | Tombol nonaktifkan belum bisa konfirmasi | Generate via shadcn CLI sesuai `components.json`, tanpa dependency baru |
| E2E membuat data permanen | Database uji menumpuk | Pakai email/identitas bersuffix timestamp dan bersihkan data uji bila diperlukan |
| `dfs-date` tidak tersedia di registry publik (404) | Paket yang diminta tidak bisa dipasang | Disetujui fallback ke `date-fns` yang sudah terpasang; tidak ada dependency baru |
| Rename drawer tanpa update import | Build gagal atau drawer lama tetap render | Rename file + export + import di `users-page.tsx` dalam satu perubahan |
| Arti `Total Data` ambigu | Badge menampilkan angka yang salah | Disepakati pakai `filteredUsers.length` (hasil filter aktif) |
| Sort nama hanya di helper | Urutan tidak berubah di tabel | Pastikan `filterUsers()` dipakai `UsersPage` dan mengembalikan array tersortir sebelum masuk `UsersDataTable` |

**Required Checks:**
- [x] Typecheck — tercakup dalam `npm run build`.
- [x] Lint — `npm run lint`.
- [x] Tests — `npm run test:e2e`.
- [x] Build — `npm run build`.
- [x] Runtime / UI behavior — cek manual di `http://localhost:3000` atau `http://localhost:3001` bila port 3000 dipakai.
- [x] Security / authorization — cek admin dan non-admin, serta pastikan tidak ada `passwordHash` di response.
- [x] CRUD E2E — create, ubah, batal konfirmasi, nonaktifkan, dan duplikat ditolak.
- [x] Security / mutation — non-admin tidak dapat memanggil action dan admin tidak dapat menonaktifkan dirinya sendiri.
- [x] Fallback tanggal — `date-fns` dipakai tanpa dependency baru.
- [x] Sort E2E — `sort=name-desc` mengubah urutan dan reset kembali ke default.
- [x] Kolom `Dibuat` dan badge `Total Data` terverifikasi di UI.

## 8. Definition of Done

- [x] Phase 1–4 selesai dan terverifikasi.
- [x] Phase 5–9 selesai dan terverifikasi.
- [x] Phase 10 selesai dan terverifikasi.
- [x] FR-17, FR-18, dan FR-19 terpenuhi lewat drawer create/ubah dan dialog konfirmasi.
- [x] Implementasi mengikuti scope yang direncanakan.
- [x] Validasi relevan lolos (`npm run lint`, `npm run build`, `npm run test:e2e`).
- [x] Tidak ada perubahan di luar file map.
- [x] Arsitektur yang ada tetap dipertahankan (phase 1–4).
- [x] Dokumentasi diperbarui (plan di-rename ke `m3-crud-users.md`).

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | COMPLETE | `listUsers()`, `UserListItem`, `UserFilters`, `userFiltersParsers`, `NuqsAdapter` | `npm run build` lolos |
| 2 | COMPLETE | `@tanstack/react-table@9.3.1`, shadcn `table`/`drawer`, `filterUsers`, kolom, tabel, drawer, client page | `npm run lint` lolos; `npm run build` lolos |
| 3 | COMPLETE | Route `/dashboard/users` dan skeleton loading | `npm run build` lolos; route terdaftar |
| 4 | COMPLETE | `tests/pengguna.e2e.ts` dengan 5 skenario | `npm run test:e2e` 11/11 lolos; lint/build lolos |
| 5 | COMPLETE | `schema.ts`, tipe input/hasil, `listStudyPrograms`, query/write repository, driver `neon-serverless` | `npx tsc --noEmit`, `npm run build` lolos |
| 6 | COMPLETE | `service.ts`, `actions.ts`, hash bcrypt, guard admin/self, mapping conflict DB | `npm run lint`, `npm run build` lolos; E2E CRUD lolos |
| 7 | COMPLETE | `user-form-drawer.tsx`, `create-user-drawer.tsx`, fetch prodi di page | `npm run build` lolos; E2E create/update lolos |
| 8 | COMPLETE | `dialog.tsx`, `user-actions.tsx`, kolom `Aksi`, prop `studyPrograms` | `npm run build` lolos; E2E nonaktifkan lolos |
| 9 | COMPLETE | E2E CRUD + guard, update execution log dan final report | `npm run lint`, `npm run build`, `npm run test:e2e` 18/18 lolos |
| 10 | COMPLETE | Rename `users-featured-drawer.tsx`, parser `sort`, sort nama di `filterUsers()`, `createdAt` + kolom `Dibuat`, badge `Total Data`, E2E Phase 10 | `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run test:e2e` 21/21 lolos |

**Deviations:** Ukuran halaman tabel memakai 2 baris agar pagination dapat diuji dengan 3 data seed; drawer memakai arah bawah default shadcn; panduan Next.js lokal tidak tersedia sehingga verifikasi memakai tipe paket terpasang dan build. Cache `.next` dihapus sekali karena build gagal dengan `EPERM` saat `unlink`; tidak ada perubahan source terkait. Rename plan dari `m3-pengguna-data-table.md` ke `m3-crud-users.md` dilakukan tanpa mengubah isi source code. Driver DB diubah ke `neon-serverless` karena `neon-http` tidak mendukung `db.transaction`. `dialog.tsx` ditulis manual dengan `@base-ui/react` mengikuti gaya `components.json`, bukan lewat CLI. `admin_not_editable` ditambahkan ke error union meski tidak ada di daftar awal. E2E memakai identitas unik dan turunannya tetap tersimpan di database uji; assertion pagination dibuat toleran terhadap penambahan baris. Phase 10 selesai; `dfs-date` tidak ditemukan di registry npm publik (404) sehingga dipakai fallback `date-fns` yang sudah terpasang, badge `Total Data` memakai `filteredUsers.length`, dan label trigger sort dirender eksplisit agar tidak menampilkan nilai mentah `name-asc`/`name-desc`. Cache `.next` dihapus sekali lagi saat build Phase 10 mengalami `EPERM` yang sama.

## 10. Final Report

- **Summary:** Phase 1–4 menghasilkan halaman admin `/dashboard/users` dengan data database tanpa `passwordHash`, pencarian `q`, filter role/status, reset, empty state, ringkasan hasil, pagination, dan state URL via `nuqs`. Phase 5–9 menambahkan CRUD pengguna (FR-17/FR-18/FR-19): schema/tipe/repository, server action + service + bcrypt, drawer create/ubah dari `#button-create-users`, kolom `Aksi`, dialog konfirmasi nonaktifkan, serta E2E CRUD dan guard. Phase 10 menambahkan sort nama lewat drawer yang direname menjadi `UsersFeaturedDrawer`, kolom `Dibuat` berformat `date-fns`, dan badge `Total Data` dari hasil filter aktif.
- **Files Changed (phase 1–4):** `docs/00-plan/m3-crud-users.md` (rename), `package.json`, `package-lock.json`, `src/app/layout.tsx`, `src/modules/users/types.ts`, `src/modules/users/repository.ts`, `src/modules/users/search-params.ts`, `src/modules/users/filter-users.ts`, `src/modules/users/components/users-page.tsx`, `src/modules/users/components/users-filter-drawer.tsx`, `src/modules/users/components/users-data-table/data-table-features.ts`, `src/modules/users/components/users-data-table/columns.tsx`, `src/modules/users/components/users-data-table/data-table.tsx`, `src/shared/components/ui/table.tsx`, `src/shared/components/ui/drawer.tsx`, `src/app/(root)/(app)/dashboard/users/page.tsx`, `src/app/(root)/(app)/dashboard/users/loading.tsx`, `tests/pengguna.e2e.ts`.
- **Files Changed (phase 5–9):** `src/db/index.ts`, `src/modules/users/schema.ts`, `src/modules/users/service.ts`, `src/modules/users/actions.ts`, `src/modules/users/components/user-form-drawer.tsx`, `src/modules/users/components/create-user-drawer.tsx`, `src/modules/users/components/user-actions.tsx`, `src/shared/components/ui/dialog.tsx`; modifikasi `src/modules/users/types.ts`, `src/modules/users/repository.ts`, `src/app/(root)/(app)/dashboard/users/page.tsx`, `src/modules/users/components/users-page.tsx`, `src/modules/users/components/users-data-table/columns.tsx`, `src/modules/users/components/users-data-table/data-table.tsx`, `tests/pengguna.e2e.ts`, `docs/00-plan/m3-crud-users.md`.
- **Files Changed (phase 10):** `src/modules/users/search-params.ts`, `src/modules/users/types.ts`, `src/modules/users/repository.ts`, `src/modules/users/filter-users.ts`, `src/modules/users/components/users-data-table/users-filter-drawer.tsx` (renamed), `src/modules/users/components/users-data-table/users-featured-drawer.tsx`, `src/modules/users/components/users-page.tsx`, `src/modules/users/components/users-data-table/columns.tsx`, `tests/pengguna.e2e.ts`, `docs/00-plan/m3-crud-users.md`.
- **Validation:** `npx tsc --noEmit` lolos; `npm run lint` lolos dengan 0 error dan 2 warning lama di `src/app/layout.tsx` (`Geist`, `Roboto`); `npm run build` lolos; `npm run test:e2e` lolos 21/21 (15 skenario `pengguna`, 5 `auth`, 1 `example`).
- **Limitations:** Seluruh data diambil sekali per request; pagination masih client-side. Data E2E bersifat persisten di database uji. Route map di `docs/ARCHITECTURE.md` masih usang dan tidak diubah sesuai plan.
- **Remaining Work:** Perbaikan opsional di luar scope: pindah ke server-side pagination dan membersihkan data uji E2E secara periodik.
- **Commit:** `feat(users): add admin user dashboard with URL filters` (phase 1–4); `feat(users): add admin user CRUD with drawers and confirmation dialog` (phase 5–9).

---

# PLAN Rules

1. **PLAN FIRST:** Complete planning before coding.
2. **READ FIRST:** Inspect documentation and codebase; never invent files.
3. **NO CODE:** PLAN mode must not modify source code or dependencies.
4. **EXPLICIT SCOPE:** Define exactly what can and cannot change.
5. **FILE PRECISION:** Specify actual file paths and actions.
6. **PHASED EXECUTION:** Complete and validate each phase sequentially.
7. **MINIMAL CHANGES:** Reuse existing patterns; avoid unnecessary refactoring.
8. **APPROVAL REQUIRED:** Never execute a DRAFT plan.
9. **STOP ON DEVIATION:** Request approval before expanding scope.
10. **KEEP UPDATED:** Record actual changes and validation during execution.

**The approved PLAN is the source of truth for implementation.**
