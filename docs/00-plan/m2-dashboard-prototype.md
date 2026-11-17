# Implementation Plan

**Task:** Prototype dashboard satu route + komponen state bersama  
**Status:** `APPROVED`  
**Created:** `2026-05-18`  
**Updated:** `2026-11-17`

## 1. Discovery

- [x] `AGENTS.md` dan dokumentasi relevan dibaca.
- [x] Arsitektur dan konvensi proyek diperiksa.
- [x] Codebase dan reusable patterns diperiksa.
- [x] API / data contracts diperiksa — tidak relevan, belum ada modul data.

**Findings:**
- Relevant files:
  - `src/app/(root)/(app)/dashboard/page.tsx`
  - `src/app/(root)/(app)/layout.tsx`
  - `src/app/(root)/admin/page.tsx`
  - `src/app/(root)/admin/layout.tsx`
  - `src/modules/auth/types.ts`
  - `src/modules/auth/components/logout-button.tsx`
  - `src/app/not-found.tsx`
  - `src/app/(root)/unauthorized/page.tsx`
  - `src/modules/onboarding/copy.ts`
  - `src/shared/components/screen-shell.tsx`
  - `src/modules/auth/copy.ts`
  - `tests/auth.e2e.ts`
  - `docs/ARCHITECTURE.md`
- Current behavior:
  - `/dashboard` hanya untuk `mahasiswa` dan `dosen`.
  - `(app)/layout.tsx` me-redirect admin ke `/admin`.
  - `roleHome()` me-redirect admin ke `/admin`.
  - `/admin` masih placeholder terpisah.
  - Not Found dan Unauthorized punya markup duplikat.
  - Belum ada state Server Error.
- Dependencies:
  - `getSession`, `requireRole`, `roleHome`
  - `ScreenShell`
  - `Button`, `Card`, `reicon-react`
  - copy onboarding untuk Not Found/Unauthorized
- Limitations:
  - Belum ada modul data, notifikasi, atau profil.
  - `/admin` dan test E2E lama bertentangan dengan requirement satu route.
  - Tidak ada script `typecheck`; gunakan `npx tsc --noEmit`.

## 2. Task Understanding

- **Problem:** Dashboard harus satu route untuk tiga role; `/admin` tidak perlu; body dashboard sementara memakai Server Error state.
- **Expected Outcome:** Semua role masuk `/dashboard`, melihat header dan greeting sesuai role, lalu body Server Error dengan CTA `Hubungi Admin`.
- **Behavior Changes:** Admin tidak lagi diarahkan ke `/admin`; route `/admin` dihapus; logout tetap tersedia; Not Found/Unauthorized memakai komponen state bersama.
- **Out of Scope:** Modul data nyata, database/API, notifikasi fungsional, profil/avatar, admin CRUD, jadwal, materi, theme switch, dependency baru, redesign di luar prototype.

## 3. Technical Approach

- **Selected Approach:** Server Component `/dashboard` membaca session, lalu memilih `StudentDashboard`, `LecturerDashboard`, atau `AdminDashboard`. Semua memakai satu `DashboardView` agar markup tidak duplikat.
- **Architecture:**
  - `src/modules/dashboard/copy.ts` untuk copy role, hari, dan sapaan.
  - `src/modules/dashboard/components/dashboard-header.tsx` untuk header.
  - `src/modules/dashboard/components/dashboards.tsx` untuk tiga role dashboard + shared view.
  - `src/shared/components/state-view.tsx` untuk `StateView`, `NotFoundState`, `UnauthorizedState`, `ServerErrorState`.
- **Data Flow:** Request → layout cek session → dashboard page cek role → pilih komponen role → render header + greeting + `ServerErrorState`. Tidak ada query database.
- **Database / API:** Tidak ada perubahan.
- **UI / State:** Server Component saja. Tanggal dan sapaan dihitung di server memakai `Intl.DateTimeFormat("id-ID")`. Tidak ada client state.
- **Security:** `requireRole(["mahasiswa", "dosen", "admin"])` di server. `/admin` dihapus. Guard tidak boleh hanya di client.

**Keputusan minimal:**
- Header memakai brand + tombol `Keluar` compact.
- Bell dan avatar prototype di-skip karena belum ada data/aksi. Tambah saat modul notifikasi/profil ada.
- `shadcn empty`/`alert` tidak diinstal karena `Button` + layout yang ada sudah cukup.
- Server Error copy disimpan di komponen state sampai ada modul copy shared.

## 4. Scope & Constraints

**In Scope:**
- Satu route `/dashboard` untuk tiga role.
- Header + greeting dinamis per role dan hari.
- Body `ServerErrorState`.
- Komponen state Not Found, Server Error, Unauthorized.
- Hapus route `/admin`.
- Update auth redirect, test E2E, dan route map dokumentasi.

**Out of Scope:**
- Modul data, database, API, notifikasi, profil, avatar, admin CRUD.
- Perubahan dependency.
- Perubahan template plan.
- Redesign komponen UI di luar kebutuhan dashboard/state.

**Constraints:**
- Server Component default.
- Shell tetap `max-w-[640px]`.
- Bahasa UI Indonesia; identifier kode Inggris.
- Tanpa komentar kecuali keputusan non-obvious.
- Ikuti `docs/TEMPLATE.PLAN.md`; jangan ubah template.

## 5. Implementation Phases

### Phase 1 — Komponen State Bersama

**Objective:** Not Found, Server Error, dan Unauthorized memakai satu pola komponen.

**Files:**
- CREATE: `src/shared/components/state-view.tsx`
- MODIFY: `src/app/not-found.tsx`
- MODIFY: `src/app/(root)/unauthorized/page.tsx`
- MODIFY: `src/modules/onboarding/copy.ts`

**Tasks:**
- [ ] Pindahkan copy `notFound` dan `unauthorized` ke `state-view.tsx`.
- [ ] Tambah copy `serverError`: title, description, CTA `Hubungi Admin`.
- [ ] Buat `StateView` presentasional: gambar, eyebrow, title, description, actions, help.
- [ ] Export `NotFoundState`, `UnauthorizedState`, `ServerErrorState`.
- [ ] Ganti markup duplikat di `not-found.tsx` dan `unauthorized/page.tsx`.
- [ ] CTA Server Error memakai `mailto:fajar.ramdhani@satu.ac.id`.
- [ ] Hapus copy state lama dari `src/modules/onboarding/copy.ts`.

**Dependencies:** None.

**Validation:**
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] Cek visual 320/390/640.
- [ ] Cek alt text, heading, focus ring, kontras.

**Completion Criteria:** Tiga state dirender oleh komponen bersama; tidak ada markup state duplikat.

### Phase 2 — Dashboard Satu Route

**Objective:** `/dashboard` menampilkan dashboard sesuai role.

**Files:**
- CREATE: `src/modules/dashboard/copy.ts`
- CREATE: `src/modules/dashboard/components/dashboard-header.tsx`
- CREATE: `src/modules/dashboard/components/dashboards.tsx`
- MODIFY: `src/modules/auth/components/logout-button.tsx`
- MODIFY: `src/app/(root)/(app)/dashboard/page.tsx`

**Tasks:**
- [ ] `dashboard/page.tsx`: `requireRole(["mahasiswa", "dosen", "admin"])`.
- [ ] Branch role ke `StudentDashboard`, `LecturerDashboard`, `AdminDashboard`.
- [ ] `DashboardView`: `ScreenShell`, header, greeting, `ServerErrorState`.
- [ ] Header: logo StudentConnect + tombol `Keluar` compact.
- [ ] `LogoutButton`: tambah mode compact, tetap label `Keluar`.
- [ ] Greeting: `Selamat pagi/siang/sore/malam, {label role}`.
- [ ] Tanggal: `Intl.DateTimeFormat("id-ID")`.
- [ ] Copy hari:
  - Mahasiswa kerja: `Siap untuk kelas hari ini?`
  - Dosen kerja: `Siap mengajar hari ini?`
  - Admin kerja: `Pantau aktivitas akademik hari ini.`
  - Akhir pekan: copy istirahat/peninjauan sesuai role.
- [ ] Body: `ServerErrorState` dengan title, description, CTA `Hubungi Admin`.
- [ ] Hapus placeholder dashboard lama.

**Dependencies:** Phase 1 `ServerErrorState`.

**Validation:**
- [ ] Login mahasiswa/dosen → `/dashboard`.
- [ ] Logout tetap berfungsi dari header.
- [ ] Greeting berubah sesuai role dan waktu.
- [ ] Body menampilkan Server Error.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build`.

**Completion Criteria:** Tiga role memakai satu route dan komponen role masing-masing.

### Phase 3 — Auth dan Route Cleanup

**Objective:** Tidak ada redirect atau route admin terpisah.

**Files:**
- MODIFY: `src/modules/auth/types.ts`
- MODIFY: `src/app/(root)/(app)/layout.tsx`
- DELETE: `src/app/(root)/admin/page.tsx`
- DELETE: `src/app/(root)/admin/layout.tsx`

**Tasks:**
- [ ] `roleHome()` selalu return `/dashboard`; pertahankan signature agar caller tidak berubah.
- [ ] Hapus redirect admin di `(app)/layout.tsx`.
- [ ] Hapus route `/admin`.
- [ ] Pastikan tidak ada import tersisa ke route admin.

**Dependencies:** Phase 2.

**Validation:**
- [ ] Admin login → `/dashboard`.
- [ ] `/admin` → Not Found.
- [ ] Tanpa session → `/login`.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build`.

**Completion Criteria:** Hanya `/dashboard` sebagai home semua role.

### Phase 4 — Test dan Dokumentasi

**Objective:** Test dan docs sesuai route baru.

**Files:**
- MODIFY: `tests/auth.e2e.ts`
- MODIFY: `docs/ARCHITECTURE.md`

**Tasks:**
- [ ] Hapus asumsi mahasiswa diarahkan ke `/unauthorized` saat buka `/admin`.
- [ ] Test admin: login → onboarding → `/dashboard` → label/heading Admin terlihat.
- [ ] Pertahankan test logout.
- [ ] Update route map: dashboard untuk semua role; `/admin` page dihapus.
- [ ] Catat bahwa admin management routes tetap future work.

**Dependencies:** Phase 3.

**Validation:**
- [ ] `npm run test:e2e` dengan app dan env aktif.
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Manual cek tiga role di 320/390/640.

**Completion Criteria:** Test tidak lagi bergantung pada `/admin`; docs sesuai implementasi.

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `src/shared/components/state-view.tsx` | CREATE | State View + Not Found/Server Error/Unauthorized | 1 |
| `src/app/not-found.tsx` | MODIFY | Pakai `NotFoundState` | 1 |
| `src/app/(root)/unauthorized/page.tsx` | MODIFY | Pakai `UnauthorizedState` | 1 |
| `src/modules/onboarding/copy.ts` | MODIFY | Hapus copy state yang dipindah | 1 |
| `src/modules/dashboard/copy.ts` | CREATE | Copy role, hari, greeting | 2 |
| `src/modules/dashboard/components/dashboard-header.tsx` | CREATE | Header dashboard | 2 |
| `src/modules/dashboard/components/dashboards.tsx` | CREATE | Tiga role dashboard + shared view | 2 |
| `src/modules/auth/components/logout-button.tsx` | MODIFY | Mode compact untuk header | 2 |
| `src/app/(root)/(app)/dashboard/page.tsx` | MODIFY | Single route role switch | 2 |
| `src/modules/auth/types.ts` | MODIFY | `roleHome` → `/dashboard` | 3 |
| `src/app/(root)/(app)/layout.tsx` | MODIFY | Hapus redirect admin | 3 |
| `src/app/(root)/admin/page.tsx` | DELETE | Route admin tidak dipakai | 3 |
| `src/app/(root)/admin/layout.tsx` | DELETE | Layout admin tidak dipakai | 3 |
| `tests/auth.e2e.ts` | MODIFY | Test route baru | 4 |
| `docs/ARCHITECTURE.md` | MODIFY | Update route map | 4 |

## 7. Risks & Validation

| Risk / Edge Case | Impact | Mitigation |
|---|---|---|
| `/admin` dihapus, link lama 404 | Bookmark lama rusak | Update `roleHome`, test, docs; tidak ada link internal tersisa |
| Admin belum bisa `/dashboard` sebelum cleanup | Admin terlempar ke `/admin` | Selesaikan Phase 3 sebelum validasi admin |
| Logout hilang dari dashboard | FR logout dan E2E gagal | Pertahankan `LogoutButton` compact di header |
| Greeting jam berbeda server/client | Hydration mismatch | Hitung di Server Component saja |
| State Server Error terlihat seperti error nyata | User bingung | Copy jelas: dashboard belum dapat dimuat; CTA admin |
| Komponen state shared mengimpor modul onboarding | Layer tidak rapi | Pindahkan copy state ke `state-view.tsx` |
| shadcn `empty` tidak ada | Implementasi terhambat | Pakai `Button` + layout existing; tidak perlu install |

**Required Checks:**
- [ ] Typecheck: `npx tsc --noEmit`
- [ ] Lint: `npm run lint`
- [ ] Tests: `npm run test:e2e`
- [ ] Build: `npm run build`
- [ ] Runtime/UI: 320/390/640, tiga role
- [ ] Security/authorization: `/dashboard` server guard, `/admin` hilang

## 8. Definition of Done

- [ ] Semua phase selesai.
- [ ] Implementasi sesuai scope.
- [ ] Validasi relevan lulus.
- [ ] Tidak ada perubahan di luar scope.
- [ ] Arsitektur existing tetap dipakai.
- [ ] Dokumentasi route diperbarui.

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | DONE | `src/shared/components/state-view.tsx`; refactor `src/app/not-found.tsx`, `src/app/(root)/unauthorized/page.tsx`; hapus copy state dari `src/modules/onboarding/copy.ts` | `npm run lint` (2 warning lama `layout.tsx`), `npm run build` |
| 2 | DONE | `src/modules/dashboard/{copy.ts,components/dashboard-header.tsx,components/dashboards.tsx}`; `logout-button.tsx` compact; `dashboard/page.tsx` branch 3 role + `ServerErrorPanel` | `npx tsc --noEmit` setelah bersihkan `.next` stale, `npm run build` |
| 3 | DONE | `roleHome` → `/dashboard`; hapus redirect admin di `(app)/layout.tsx`; hapus `src/app/(root)/admin/{page,layout}.tsx` | `Select-String` src: tidak ada `/admin`, build route tanpa `/admin` |
| 4 | DONE | `tests/auth.e2e.ts`, `docs/ARCHITECTURE.md` route map/tree | `npm run lint`, `npm run build`; E2E tidak dijalankan |

**Deviations:** Bell/avatar prototype dilewati (belum ada data/aksi). `roleHome` pakai `void role` agar lint bersih tanpa ubah signature/caller. `ServerErrorPanel` dipakai di dashboard agar tidak nested `ScreenShell`. `.next` dibersihkan karena validator lama masih referensi route admin terhapus.

## 10. Final Report

- **Summary:** `/dashboard` jadi satu route untuk mahasiswa/dosen/admin dengan header, greeting dinamis, dan body `ServerErrorState`; route `/admin` dihapus; state Not Found/Unauthorized/Server Error dipusatkan.
- **Files Changed:** `docs/00-plan/m2-dashboard-prototype.md`; `src/shared/components/state-view.tsx`; `src/app/not-found.tsx`; `src/app/(root)/unauthorized/page.tsx`; `src/modules/onboarding/copy.ts`; `src/modules/dashboard/copy.ts`; `src/modules/dashboard/components/dashboard-header.tsx`; `src/modules/dashboard/components/dashboards.tsx`; `src/modules/auth/components/logout-button.tsx`; `src/app/(root)/(app)/dashboard/page.tsx`; `src/modules/auth/types.ts`; `src/app/(root)/(app)/layout.tsx`; `tests/auth.e2e.ts`; `docs/ARCHITECTURE.md`; deleted `src/app/(root)/admin/page.tsx`, `src/app/(root)/admin/layout.tsx`.
- **Validation:** `npm run lint` pass (0 error, 2 warning pre-existing `src/app/layout.tsx` unused Geist/Roboto). `npm run build` pass; route output: `/`, `/dashboard`, `/login`, `/onboarding`, `/unauthorized`, `/_not-found`, dll tanpa `/admin`.
- **Limitations:** E2E (`npm run test:e2e`) belum dijalankan di sesi ini (butuh app+DB+seed aktif). Belum cek visual manual 320/390/640 di browser.
- **Remaining Work:** Jalankan E2E/manual UI check tiga role; sambungkan data dashboard nyata saat modul data siap.
- **Commit:** `feat(dashboard): unify role dashboard and shared states`

## 11. Lanjutan — Dashboard Admin, Bottom Nav, dan Tema

**Tanggal:** `2026-11-17`  
**Status:** `DONE`  
**Referensi desain:** `screen/ui-dashboard-admin.html`, `screen/ui-nav-floating.tsx`

### 11.1 Discovery

- [x] Prototype admin memuat Ringkasan, Aksi cepat, dan Aktivitas; lanjutan ini fokus ke Ringkasan dan Aksi cepat.
- [x] `DashboardView` lama hanya membungkus `ServerErrorPanel` untuk tiga role.
- [x] `AnimatedThemeToggler` sudah ada; `next-themes` sudah terpasang tetapi `ThemeProvider` belum dipasang.
- [x] Primitive siap pakai: `Card`, `Button`, `ScrollArea`, `Separator`; ikon dari `reicon-react`.
- [x] Route `/dashboard/pengguna`, `/dashboard/jadwal`, `/dashboard/mata-kuliah`, `/dashboard/materi` belum ada.

### 11.2 Task Understanding

- **Masalah:** Dashboard admin belum punya konten dan tiga role masih berbagi satu `DashboardView`. Belum ada navigasi bawah dan switch tema yang persisten.
- **Hasil yang diharapkan:**
  - Dashboard dipisah per role di `admin/`, `student/`, `lecturer/`; `DashboardView` dihapus.
  - Admin menampilkan Overview (statistik hardcoded) dan Quick Actions (hardcoded) memakai komponen shadcn.
  - `BottomNavBar` bersama di `components/bottom-nav-bar.tsx`; perbedaan role hanya pada `navItems`.
  - Admin: Beranda, Pengguna, Jadwal Kuliah, tombol tema.
  - Mahasiswa: Beranda, Jadwal, Mata Kuliah, tombol tema.
  - Dosen: Beranda, Jadwal, Materi, tombol tema.
  - Tema dikelola `next-themes` (`attribute="class"`), bukan inline script.
- **Di luar scope:** isi halaman Pengguna/Jadwal/Mata Kuliah/Materi, data akademik nyata, tab aktivitas, notifikasi fungsional.

### 11.3 Technical Approach

- **Selected Approach:**
  - `dashboard/page.tsx` tetap memilih dashboard berdasarkan role.
  - `AdminDashboard` menyusun `DashboardShell` + `AdminOverview` + `AdminQuickActions`.
  - `DashboardShell` merender header, greeting, konten, dan `BottomNavBar`.
  - `BottomNavBar` client component mengikuti pola `screen/ui-nav-floating.tsx`: `motion.nav` masuk dengan spring, `whileTap` pada item, label aktif dianimasikan lebar/opacity, aktif ditentukan `usePathname`.
  - `ThemeProvider` (client) membungkus aplikasi di root layout; `AnimatedThemeToggler` dipakai controlled dengan `resolvedTheme` + `setTheme`.
- **Architecture:**
  - `src/modules/dashboard/components/bottom-nav-bar.tsx` menyimpan `bottomNavItems` per role.
  - `src/shared/components/theme-provider.tsx` membungkus `next-themes`.
- **Data Flow:** Request → `requireRole` → `getUserProfile` → dashboard role → shell merender `BottomNavBar role={user.role}` → client me-resolve `bottomNavItems[role]`.
- **Security:** Guard role tetap di server; nav hanya presentasional.

**Keputusan minimal:**
- Statistik dan aksi admin hardcoded sampai modul data siap.
- Tidak menambah dependency; animasi memakai `motion` yang sudah ada, tema memakai `next-themes` yang sudah ada.
- Route tujuan nav dibiarkan 404 sampai halamannya dibuat.
- Shell menambah padding bawah `6rem` agar konten tidak tertutup nav.

**Perbaikan penting (RSC):**
- Nilai non-komponen (`bottomNavItems`) tidak boleh diimpor dari modul `"use client"` ke Server Component karena menjadi client-reference proxy dan menghasilkan `undefined`. Solusinya: server hanya mengirim `role`, client me-resolve nav items.

### 11.4 Scope & Constraints

**In Scope:**
- Pemisahan dashboard per role.
- Overview + Quick Actions admin (hardcoded).
- Bottom nav per role dengan tema.
- Persistensi tema via `next-themes`.
- Update E2E dan plan.

**Out of Scope:**
- Halaman tujuan nav, data nyata, tab aktivitas, notifikasi.
- Perubahan layout desktop di luar shell 640px.

**Constraints:**
- Server Component default; `"use client"` hanya untuk nav dan provider.
- Komponen shadcn yang sudah ada; tanpa dependency baru.
- Bahasa UI Indonesia; identifier kode Inggris.

### 11.5 Implementation Phases

#### Phase 5 — Dashboard per Role + Konten Admin

**Files:**
- CREATE: `src/modules/dashboard/admin/admin-dashboard.tsx`
- CREATE: `src/modules/dashboard/admin/components/overview.tsx`
- CREATE: `src/modules/dashboard/admin/components/quick-actions.tsx`
- CREATE: `src/modules/dashboard/student/student-dashboard.tsx`
- CREATE: `src/modules/dashboard/lecturer/lecturer-dashboard.tsx`
- DELETE: `src/modules/dashboard/components/dashboards.tsx`
- MODIFY: `src/app/(root)/(app)/dashboard/page.tsx`

**Tasks:**
- [x] Hapus `DashboardView`; pindahkan tiga dashboard ke folder role.
- [x] Admin: Ringkasan 3 kartu statistik hardcoded + tombol tabel.
- [x] Admin: Aksi cepat 2 kartu hardcoded.
- [x] Student/lecturer tetap memakai placeholder sampai dashboard-nya diimplementasi.
- [x] Update import di `dashboard/page.tsx`.

**Validation:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.

#### Phase 6 — BottomNavBar per Role

**Files:**
- CREATE: `src/modules/dashboard/components/bottom-nav-bar.tsx`
- MODIFY: `src/modules/dashboard/components/dashboard-shell.tsx`

**Tasks:**
- [x] Nav map `bottomNavItems` untuk admin/mahasiswa/dosen.
- [x] Floating pill nav mengikuti pola `ui-nav-floating.tsx`.
- [x] Item memakai `Link`, `aria-current`, label aktif.
- [x] Shell merender nav dan menambah padding bawah.
- [x] Perbaiki RSC boundary: kirim `role`, resolve `items` di client.

**Validation:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.

#### Phase 7 — Tema via `next-themes`

**Files:**
- CREATE: `src/shared/components/theme-provider.tsx`
- MODIFY: `src/app/layout.tsx`
- MODIFY: `src/modules/dashboard/components/bottom-nav-bar.tsx`

**Tasks:**
- [x] `ThemeProvider` dengan `attribute="class"` dan `defaultTheme="system"`.
- [x] `suppressHydrationWarning` pada `<html>`.
- [x] `AnimatedThemeToggler` controlled: `theme={resolvedTheme === "dark" ? "dark" : "light"}` + `onThemeChange={setTheme}`.
- [x] Hapus rencana inline script; anti-flash ditangani `next-themes`.

**Validation:** `npx tsc --noEmit`, `npm run lint`, `npm run build`.

#### Phase 8 — Testing dan Dokumentasi

**Files:**
- MODIFY: `tests/auth.e2e.ts`
- MODIFY: `src/shared/components/state-view.tsx`
- MODIFY: `docs/00-plan/m2-dashboard-prototype.md`

**Tasks:**
- [x] Test mahasiswa: teks placeholder `Sepertinya ada kendala`; logout lewat popover profil.
- [x] Test admin: `Ringkasan`, `Aksi cepat`, nav `Navigasi utama`, link Pengguna/Jadwal Kuliah, tombol `Ganti tema`.
- [x] Tambah `nativeButton={false}` pada `Button` yang merender `Link`/`a` agar tidak memicu console error Base UI.
- [x] Perbarui plan, execution log, dan final report.

**Validation:** `npm run test:e2e` (6/6 lulus).

### 11.6 File Map

| File | Action | Purpose |
|---|---|---|
| `src/modules/dashboard/admin/admin-dashboard.tsx` | CREATE | Komposisi dashboard admin |
| `src/modules/dashboard/admin/components/overview.tsx` | CREATE | Ringkasan statistik hardcoded |
| `src/modules/dashboard/admin/components/quick-actions.tsx` | CREATE | Aksi cepat hardcoded |
| `src/modules/dashboard/student/student-dashboard.tsx` | CREATE | Dashboard mahasiswa (placeholder) |
| `src/modules/dashboard/lecturer/lecturer-dashboard.tsx` | CREATE | Dashboard dosen (placeholder) |
| `src/modules/dashboard/components/bottom-nav-bar.tsx` | CREATE | Nav bawah + navItems per role + tema |
| `src/modules/dashboard/components/dashboard-shell.tsx` | MODIFY | Render nav + padding |
| `src/modules/dashboard/components/dashboards.tsx` | DELETE | `DashboardView` tidak dipakai |
| `src/shared/components/theme-provider.tsx` | CREATE | Provider `next-themes` |
| `src/shared/components/theme-toggler.tsx` | EXISTING | Toggler controlled |
| `src/app/layout.tsx` | MODIFY | Provider + `suppressHydrationWarning` |
| `src/shared/components/state-view.tsx` | MODIFY | `nativeButton={false}` |
| `src/app/(root)/(app)/dashboard/page.tsx` | MODIFY | Import dashboard per role |
| `tests/auth.e2e.ts` | MODIFY | Assertion admin/nav + logout popover |

### 11.7 Risks & Validation

| Risk / Edge Case | Mitigation |
|---|---|
| Nilai dari modul `"use client"` menjadi undefined di server | Kirim `role`; resolve `navItems` di client |
| Flash tema saat reload | `next-themes` menyuntik script anti-flash |
| Navigasi menutup konten | Padding bawah shell `6rem` + safe-area |
| Route nav 404 | Diterima; halaman menyusul |
| Console error Base UI pada `Button` + `Link` | `nativeButton={false}` |
| Logout tidak terlihat | Test membuka popover profil lebih dulu |

**Required Checks:**
- [x] Typecheck: `npx tsc --noEmit`
- [x] Lint: `npm run lint`
- [x] Build: `npm run build`
- [x] E2E: `npm run test:e2e`

### 11.8 Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 5 | DONE | Dashboard per role, admin Overview + Quick Actions, `DashboardView` dihapus | `tsc`, `lint`, `build` |
| 6 | DONE | `bottom-nav-bar.tsx`, shell render nav + padding, RSC fix (`role` prop) | `tsc`, `lint`, `build` |
| 7 | DONE | `theme-provider.tsx`, root layout provider + `suppressHydrationWarning`, toggler controlled | `tsc`, `lint`, `build` |
| 8 | DONE | `tests/auth.e2e.ts`, `nativeButton={false}` di `state-view.tsx`, plan diperbarui | `npm run test:e2e` 6/6 lulus |

### 11.9 Final Report

- **Summary:** Dashboard dipisah per role; admin punya Overview + Quick Actions hardcoded; bottom nav tampil untuk tiga role dengan navItems berbeda dan tombol tema; tema persisten via `next-themes`.
- **Testing:** `tsc` pass; `lint` pass (2 warning lama `layout.tsx`); `build` pass; `test:e2e` 6/6 lulus (admin nav/tema, login/logout, onboarding).
- **Limitations:** Halaman tujuan nav masih 404; data dashboard hardcoded; cek visual manual 320/390/640 belum dilakukan.
- **Remaining Work:** Implementasi halaman Pengguna/Jadwal/Mata Kuliah/Materi dan ganti data hardcoded dengan modul data.

