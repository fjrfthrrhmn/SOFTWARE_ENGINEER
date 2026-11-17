# Implementation Plan

**Task:** Implementasi halaman admin `Dashboard Pengguna` berdasarkan `screen/ui-dashboard-pengguna.html`: data table dengan pola shadcn base data-table, data pengguna dari database, serta drawer filter role/status/reset yang tersimpan di URL memakai `nuqs`. Create/ubah pengguna direncanakan di plan berikutnya.
**Status:** `COMPLETE`
**Created:** `2026-11-17`
**Updated:** `2026-11-17`

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
- Current behavior:
  - `screen/ui-dashboard-pengguna.html` baru berupa prototype statis dengan data demo di array JavaScript, filter, pagination sisi klien, dan tombol featured `Tambah Pengguna`.
  - Navigasi admin `Pengguna` di `src/modules/dashboard/components/bottom-nav-bar.tsx` sudah mengarah ke `/dashboard/pengguna`, tetapi route tersebut belum ada.
  - Modul `users` baru memiliki `types.ts` dan `repository.ts`. Belum ada query daftar pengguna.
  - `nuqs` sudah terpasang sebagai `^2.10.3` di `package.json`, tetapi belum dipakai dan belum ada `NuqsAdapter`.
  - Belum ada komponen `table`, `drawer`, `sheet`, atau `dialog` di `src/shared/components/ui`.
  - Belum ada `@tanstack/react-table` di `package.json`.
- Dependencies:
  - Modul `users`, `auth`, `dashboard`.
  - Drizzle ORM + Neon serverless.
  - `nuqs` untuk state query string.
  - TanStack Table v9 untuk data table sesuai panduan shadcn base.
  - shadcn base style `base-rhea`, alias `@/shared/components/ui`.
  - `radix-ui` dan `@base-ui/react` sudah terpasang.
- Limitations:
  - `repository.ts` hanya menyediakan `findAuthUserByEmail` dan `getUserProfile`.
  - `findAuthUserByEmail` mengambil seluruh kolom termasuk `passwordHash`; query daftar tidak boleh mengikuti pola ini.
  - Tidak ada adapter nuqs di root layout, sehingga hook nuqs belum bisa dipakai.
  - Pola data-table shadcn base memakai TanStack Table v9 dengan `tableFeatures()` dan `useTable()`, berbeda dari API v8 yang lebih lama.

## 2. Task Understanding

- **Problem:** Prototype halaman Kelola Pengguna belum terhubung ke data nyata, belum punya route, belum punya data table sesuai pola shadcn base, dan filter belum memakai `nuqs` serta drawer.
- **Expected Outcome:**
  - Admin dapat membuka `/dashboard/pengguna` dari bottom navigation.
  - Tabel menampilkan data pengguna dari database tanpa `passwordHash`.
  - Pencarian teks, filter peran, filter status, dan reset filter berfungsi.
  - Nilai filter tersimpan di URL via `nuqs`, termasuk saat refresh, back/forward, dan berbagi tautan.
  - Tombol featured pada kartu data membuka drawer berisi kontrol filter peran, status, dan reset.
  - Pagination tabel tetap berfungsi setelah filter diterapkan.
- **Behavior Changes:**
  - Route `/dashboard/pengguna` tidak lagi 404 untuk admin.
  - Data prototype diganti seluruhnya oleh data database.
  - Tombol featured berubah dari `Tambah Pengguna` menjadi kontrol pembuka drawer filter.
  - Kolom `Aksi` tidak dirender dulu sampai plan create/ubah.
- **Out of Scope:**
  - Create, ubah, nonaktifkan, dan reaktivasi pengguna, termasuk FR-17, FR-18, FR-19.
  - Server action, form drawer, Zod input mutation, bcrypt, transaction write, dan toast mutasi.
  - `listStudyPrograms`, field program studi, dan data master lain yang hanya dipakai form.
  - Row selection, column visibility, sorting, export, dan bulk action.
  - Perubahan schema database atau migrasi baru.
  - Perbaikan route map usang di `docs/ARCHITECTURE.md`.
- **Asumsi:** Drawer yang dimaksud adalah drawer filter untuk `role`, `status`, dan `reset`, dengan tombol featured sebagai trigger. Create/ubah pengguna dikerjakan di next plan.

## 3. Technical Approach

- **Selected Approach:**
  - Server Component mengambil seluruh baris pengguna aman dari database sekali per request.
  - `useQueryStates` dari `nuqs` menjadi source of truth untuk `q`, `role`, dan `status`.
  - Filtrasi dilakukan oleh helper murni sebelum data masuk ke TanStack Table; TanStack Table dipakai untuk struktur tabel dan pagination sesuai referensi shadcn base.
  - Drawer shadcn base hanya berisi kontrol filter dan reset; reset memanggil `setFilters(null)` sehingga key nuqs yang dikelola hilang dari URL dan parser kembali ke default.
  - Tidak memakai `shallow: false` karena Server Component tidak perlu re-run saat filter berubah; filter dan pagination berjalan di klien.
- **Architecture:**
  - `src/app/layout.tsx`: pasang `NuqsAdapter` dari `nuqs/adapters/next/app`.
  - `src/modules/users/search-params.ts`: definition parser nuqs untuk `q`, `role`, `status`.
  - `src/modules/users/types.ts`: tipe `UserListItem` dan tipe filter hasil parsing nuqs.
  - `src/modules/users/repository.ts`: query read-only `listUsers()`.
  - `src/modules/users/components/`: komponen halaman, filter drawer, dan data table.
  - `src/app/(root)/(app)/dashboard/pengguna/page.tsx`: route server; auth, fetch data, render shell.
- **Data Flow:**
  - `/dashboard/pengguna` → `requireRole(["admin"])` → `getUserProfile()` untuk header → `listUsers()` → `<UsersPage>` client.
  - `<UsersPage>` → `useQueryStates(userFiltersParsers)` → `filterUsers(data, filters)` → `<UsersDataTable data={filteredUsers} />`.
  - Tombol featured → `UsersFilterDrawer` → ubah `role`/`status` atau `setFilters(null)` → URL berubah → nuqs mengembalikan state baru → tabel difilter ulang → pagination direset ke halaman pertama.
- **Database / API:**
  - Tidak ada perubahan schema atau migrasi.
  - Query daftar memakai explicit select dari `pengguna` + join `mahasiswa`/`dosen`/`admin` + `programStudi`.
  - Kolom `passwordHash` tidak pernah masuk ke tipe `UserListItem` atau props komponen.
- **UI / State:**
  - State URL: `q`, `role`, `status` via nuqs.
  - State lokal: `open` untuk drawer filter dan `pagination` milik TanStack Table.
  - Tidak memakai state global.
  - Layout mengikuti `max-w-[640px]`, `DashboardShell`, typography Plus Jakarta Sans, token warna `globals.css`, dan gaya card `bg-card shadow-sm ring-1 ring-border`.
  - Blue tetap sebagai aksen pada fokus dan tombol featured, bukan dominasi halaman.
- **Security:**
  - `requireRole(["admin"])` di page.
  - Tidak ada mutasi pada plan ini, sehingga tidak ada server action yang perlu diautorisasi.
  - `passwordHash` tidak di-select, tidak dikirim, dan tidak dirender.
  - Nilai query dari URL divalidasi oleh `parseAsStringLiteral`; `q` dibatasi maksimal 100 karakter sebelum dipakai filter.
  - Tidak ada SQL di komponen.

## 4. Scope & Constraints

**In Scope:**
- Pasang `NuqsAdapter` di root layout.
- Definisikan parser nuqs untuk `q`, `role`, dan `status`.
- Query daftar pengguna dari database dengan join profil sesuai peran.
- DataTable shadcn base dengan TanStack Table v9 untuk render dan pagination.
- Drawer filter shadcn base berisi filter role, filter status, dan reset.
- Input pencarian teks yang tersinkron dengan `q` di URL.
- Empty state dan ringkasan hasil setelah filter.
- Route `/dashboard/pengguna` dan loading state.
- Skenario E2E untuk melihat, mencari, memfilter, mereset, dan berpaginasi data pengguna.

**Out of Scope:**
- Data demo array di prototype; semua baris harus berasal dari database.
- Drawer form create/ubah dan server action terkait; dikerjakan di next plan.
- Nonaktifkan/reaktivasi dan confirmation dialog FR-19.
- Sorting, column visibility, row selection, export, dan bulk action.
- `listStudyPrograms`, program studi sebagai filter, dan field khusus mahasiswa.
- Dependency baru selain `@tanstack/react-table`; `nuqs` dan shadcn CLI sudah tersedia.
- Perubahan pada modul auth, schema DB, seed, atau migrasi.

**Constraints:**
- Default Server Component; `"use client"` hanya untuk adapter wrapper, halaman interaktif, drawer, dan tabel.
- Akses DB hanya lewat `src/modules/users/repository.ts` dan `src/db/index.ts`.
- Periksa session dan peran di server pada page.
- Filter URL memakai `nuqs`, bukan `useState` lokal untuk `q`/`role`/`status`.
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

**Objective:** Halaman `/dashboard/pengguna` tersedia untuk admin dengan data dari database.

**Files:**
- CREATE: `src/app/(root)/(app)/dashboard/pengguna/page.tsx`
- CREATE: `src/app/(root)/(app)/dashboard/pengguna/loading.tsx`

**Tasks:**
- [x] Buat `page.tsx`: `requireRole(["admin"])`, `getUserProfile` untuk header, `listUsers`, lalu render `DashboardShell` dengan heading `Kelola Pengguna` dan `<UsersPage data={users} />`.
- [x] Pastikan non-admin mendapat redirect/unauthorized dari `requireRole`.
- [x] Buat `loading.tsx` skeleton untuk header, kartu featured, toolbar, dan baris tabel.

**Dependencies:** Phase 1, Phase 2

**Validation:**
- [x] `npm run lint` lolos.
- [x] `npm run build` lolos.
- [x] Admin dapat membuka `/dashboard/pengguna`; mahasiswa/dosen tidak dapat mengakses.
- [x] Data yang tampil berasal dari database, bukan array prototype.

**Completion Criteria:** Route admin tersedia dan menampilkan data database lengkap dengan filter URL.

### Phase 4 — Verifikasi, E2E, dan kerapian

**Objective:** Pastikan perubahan memenuhi konvensi proyek dan alur utama teruji.

**Files:**
- CREATE: `tests/pengguna.e2e.ts`
- MODIFY: `docs/00-plan/m3-pengguna-data-table.md`

**Tasks:**
- [x] Tambah skenario E2E: login admin dari kredensial environment, buka `/dashboard/pengguna`, verifikasi heading dan tabel, cari pengguna, buka drawer filter, pilih role, pilih status, verifikasi URL, reset filter, verifikasi URL bersih, lalu uji pagination.
- [x] Pastikan test tidak menuliskan kredensial atau password plaintext ke repositori.
- [x] Jalankan `npm run lint`, `npm run build`, dan `npm run test:e2e`.
- [x] Perbarui status plan, execution log, dan final report sesuai hasil aktual.

**Dependencies:** Phase 1, Phase 2, Phase 3

**Validation:**
- [x] Semua perintah verifikasi lolos tanpa error baru.
- [x] Tidak ada file source, dependency, atau docs lain yang berubah di luar file map.
- [x] `git status` hanya memuat file yang direncanakan.

**Completion Criteria:** Plan status `COMPLETE` dan semua temuan verifikasi tercatat.

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `docs/00-plan/m3-pengguna-data-table.md` | CREATE | Living implementation contract | 0 |
| `src/app/layout.tsx` | MODIFY | Pasang `NuqsAdapter` | 1 |
| `src/modules/users/search-params.ts` | CREATE | Parser nuqs untuk filter | 1 |
| `src/modules/users/types.ts` | MODIFY | Tipe `UserListItem` dan `UserFilters` | 1 |
| `src/modules/users/repository.ts` | MODIFY | Query read-only `listUsers()` | 1 |
| `package.json` | MODIFY | Tambah `@tanstack/react-table` | 2 |
| `package-lock.json` | MODIFY | Lock dependency baru | 2 |
| `src/shared/components/ui/table.tsx` | CREATE | Komponen tabel shadcn base | 2 |
| `src/shared/components/ui/drawer.tsx` | CREATE | Komponen drawer shadcn base | 2 |
| `src/modules/users/filter-users.ts` | CREATE | Helper filter murni berdasarkan URL state | 2 |
| `src/modules/users/components/users-data-table/data-table-features.ts` | CREATE | Konfigurasi fitur pagination TanStack v9 | 2 |
| `src/modules/users/components/users-data-table/columns.tsx` | CREATE | Definisi kolom tabel pengguna | 2 |
| `src/modules/users/components/users-data-table/data-table.tsx` | CREATE | Render tabel, empty state, pagination | 2 |
| `src/modules/users/components/users-filter-drawer.tsx` | CREATE | Drawer role/status/reset | 2 |
| `src/modules/users/components/users-page.tsx` | CREATE | Client wrapper, URL state, featured card | 2 |
| `src/app/(root)/(app)/dashboard/pengguna/page.tsx` | CREATE | Route admin fetch data | 3 |
| `src/app/(root)/(app)/dashboard/pengguna/loading.tsx` | CREATE | Loading skeleton halaman | 3 |
| `tests/pengguna.e2e.ts` | CREATE | E2E alur lihat/filter/reset/pagination | 4 |

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
| Route diakses non-admin | Pelanggaran izin | `requireRole(["admin"])` di page |

**Required Checks:**
- [x] Typecheck — tercakup dalam `npm run build`.
- [x] Lint — `npm run lint`.
- [x] Tests — `npm run test:e2e`.
- [x] Build — `npm run build`.
- [x] Runtime / UI behavior — cek manual di `http://localhost:3000` atau `http://localhost:3001` bila port 3000 dipakai.
- [x] Security / authorization — cek admin dan non-admin, serta pastikan tidak ada `passwordHash` di response.

## 8. Definition of Done

- [x] All approved phases completed.
- [x] Implementation follows approved scope.
- [x] Relevant validations pass.
- [x] No unauthorized changes.
- [x] Existing architecture is preserved.
- [x] Documentation updated if necessary.

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | COMPLETE | `listUsers()`, `UserListItem`, `UserFilters`, `userFiltersParsers`, `NuqsAdapter` | `npm run build` lolos |
| 2 | COMPLETE | `@tanstack/react-table@9.3.1`, shadcn `table`/`drawer`, `filterUsers`, kolom, tabel, drawer, client page | `npm run lint` lolos; `npm run build` lolos |
| 3 | COMPLETE | Route `/dashboard/pengguna` dan skeleton loading | `npm run build` lolos; route terdaftar |
| 4 | COMPLETE | `tests/pengguna.e2e.ts` dengan 5 skenario | `npm run test:e2e` 11/11 lolos; lint/build lolos |

**Deviations:** Ukuran halaman tabel memakai 2 baris agar pagination dapat diuji dengan 3 data seed; drawer memakai arah bawah default shadcn; panduan Next.js lokal tidak tersedia sehingga verifikasi memakai tipe paket terpasang dan build. Cache `.next` dihapus sekali karena build gagal dengan `EPERM` saat `unlink`; tidak ada perubahan source terkait.

## 10. Final Report

- **Summary:** Halaman admin `/dashboard/pengguna` menampilkan data pengguna dari database tanpa `passwordHash`, dengan pencarian `q`, filter role/status, reset, empty state, ringkasan hasil, dan pagination. State filter tersimpan di URL via `nuqs` dan tetap benar setelah refresh/back/forward.
- **Files Changed:** `docs/00-plan/m3-pengguna-data-table.md`, `package.json`, `package-lock.json`, `src/app/layout.tsx`, `src/modules/users/types.ts`, `src/modules/users/repository.ts`, `src/modules/users/search-params.ts`, `src/modules/users/filter-users.ts`, `src/modules/users/components/users-page.tsx`, `src/modules/users/components/users-filter-drawer.tsx`, `src/modules/users/components/users-data-table/data-table-features.ts`, `src/modules/users/components/users-data-table/columns.tsx`, `src/modules/users/components/users-data-table/data-table.tsx`, `src/shared/components/ui/table.tsx`, `src/shared/components/ui/drawer.tsx`, `src/app/(root)/(app)/dashboard/pengguna/page.tsx`, `src/app/(root)/(app)/dashboard/pengguna/loading.tsx`, `tests/pengguna.e2e.ts`.
- **Validation:** `npm run lint` lolos dengan 0 error dan 2 warning lama di `src/app/layout.tsx` (`Geist`, `Roboto`); `npm run build` lolos; `npm run test:e2e` lolos 11/11 (5 test baru).
- **Limitations:** Seluruh data diambil sekali per request; pagination masih client-side. Kolom `Aksi` dan mutasi pengguna belum ada. Route map di `docs/ARCHITECTURE.md` masih usang dan tidak diubah sesuai plan.
- **Remaining Work:** Plan terpisah untuk FR-17/FR-18/FR-19 (create, ubah, nonaktifkan/reaktivasi), termasuk server action, form drawer, Zod, bcrypt, toast, dan kolom aksi.
- **Commit:** `feat(users): add admin user dashboard with URL filters`

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
