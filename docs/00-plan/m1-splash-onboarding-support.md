# Implementation Plan — Splash, Onboarding, dan Halaman Pendukung

**Task:** Prototype dan rencana implementasi splash screen, onboarding 3 langkah, not found (404), dan unauthorized (403).
**Status:** `COMPLETE`
**Created:** `2026-11-15`
**Updated:** `2026-11-15` (Phase 4 — implementasi Next.js selesai)

## 1. Discovery

- [x] `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/ROADMAP.md`, `docs/00-plan/m0-foundation.md`, dan `docs/TEMPLATE.PLAN.md` dibaca.
- [x] Struktur `src/`, `public/brand/`, dan konfigurasi Tailwind diperiksa.
- [x] Route map dan konvensi shell mobile diperiksa.
- [ ] API / data contracts tidak relevan untuk prototype ini.

**Findings:**

- Relevant files:
  - `src/app/layout.tsx` — shell `max-w-160` (640px), font Geist + Outfit.
  - `src/app/page.tsx` — halaman `/` saat ini masih placeholder CTA login.
  - `src/app/globals.css` — Tailwind 4.3.3, token shadcn, `tw-animate-css`.
  - `public/brand/DESIGN_BRAND.json` — palet, tipografi, aturan maskot MOCHI.
  - `public/brand/logo.webp` (1254×1254), `onboarding 1.png` (2048×2048), `not-found.png` (1536×1024), `unauthorized.png` (1536×1024), `Mascot Design Sheet.png` (1536×1024).
- Current behavior: splash/onboarding/404/403 belum ada. Route `/unauthorized` dan `not-found.tsx` sudah direncanakan di `ARCHITECTURE.md`, tetapi onboarding belum ada di route map.
- Dependencies: tidak ada dependency motion. Tailwind 4.3.3 sudah terpasang; `@tailwindcss/browser@4.3.3` tersedia di CDN untuk prototype statis.
- Limitations: hanya ada satu ilustrasi onboarding (`onboarding 1.png`); ilustrasi onboarding 2 dan 3 belum tersedia. Aset hanya bisa diverifikasi dari nama, ukuran, dan `DESIGN_BRAND.json` — model tidak dapat melihat isi gambar.

## 2. Task Understanding

- **Problem:** Belum ada alur pembuka aplikasi (splash → onboarding → login) dan halaman kegagalan (404/403) yang sesuai identitas MOCHI.
- **Expected Outcome:** Rencana implementasi yang mengikat plus 6 prototype HTML mandiri di `screen/` yang bisa dibuka langsung di browser, konsisten secara visual, responsive, dan punya interaksi dasar.
- **Behavior Changes:** Pengguna melihat splash beranimasi singkat, lalu 3 langkah onboarding, lalu masuk ke login. Halaman 404/403 memberi jalan keluar yang jelas.
- **Out of Scope:** Perubahan apa pun di `src/`. Halaman login, dashboard, jadwal, materi. Perubahan schema/database. Dependency baru.

## 3. Technical Approach

- **Selected Approach:** Prototype statis HTML + CSS + Tailwind 4.3.3 (browser build, versi dipin) di `screen/`. Satu file per halaman agar bisa dibuka langsung tanpa build step. Implementasi Next.js ditunda ke fase terpisah.
- **Architecture:** Setiap HTML memuat token brand sendiri (standalone), shell mobile `max-w-[640px]`, dan navigasi antar-file. Komponen yang sama (shell, kartu ilustrasi, tombol, progress dots) direplikasi dengan markup identik.
- **Data Flow:** Prototype: klik link antar halaman + `setTimeout` untuk auto-redirect splash. Aplikasi nanti: server component untuk halaman statis, satu client component untuk splash timer dan carousel onboarding.
- **Database / API:** Tidak ada.
- **UI / State:**
  - Splash: auto-redirect ke onboarding 1 setelah ±2,6 detik (600 ms jika `prefers-reduced-motion`).
  - Onboarding: state langkah di prototype direpresentasikan oleh file terpisah; di aplikasi memakai satu route `/onboarding` dengan state 0–2.
  - 404/403: statis, tanpa state.
- **Motion:** **Tidak perlu dependency `motion`.** Kebutuhan hanya entrance splash, progress bar, float chip, dan transisi halaman. Cukup CSS keyframes + `@view-transition` (progressive) + `prefers-reduced-motion`. Tambah library hanya jika nanti butuh gesture/drag carousel yang kompleks.
- **Security:** Halaman 403 tidak membocorkan detail resource atau peran yang diizinkan. Halaman 404 generik. Guard sebenarnya tetap di server (M1), bukan di UI.

### 3.1 Design Direction

Arah visual: **kertas catatan akademik** — latar putih dengan grid kertas halus, kartu ilustrasi Ice Blue, chip "stiker" jadwal/materi yang miring, dan tombol Deep Blue seperti stempel tinta. Ini menghindari default SaaS (gradient wash, glassmorphism, kartu seragam) sambil tetap memakai palet brand yang diwajibkan. Satu elemen yang berani: MOCHI + komposisi chip; sisanya tenang.

**Token warna**

| Token | Nilai | Pemakaian |
|---|---|---|
| `ink` | `#0F172A` | Teks utama |
| `muted` | `#64748B` | Teks sekunder |
| `paper` | `#F1F6FB` | Latar luar shell |
| `surface` | `#FFFFFF` | Shell dan kartu |
| `ice` | `#E0F2FE` | Latar ilustrasi, hover |
| `cyan` | `#0EA5E9` | Aksen kecil, progress |
| `brand` | `#3B82F6` | Aksen, label status |
| `deep` | `#1E40AF` | Tombol primary, border tegas |
| `border` | `rgba(30,64,175,0.12)` | Garis kartu |
| `warning` | `#F59E0B` | Badge akses ditolak |
| `danger` | `#EF4444` | Cadangan error |

**Tipografi:** Plus Jakarta Sans (400/500/600/700/800) sesuai `DESIGN_BRAND.json`. Display 800 dengan tracking negatif; body 15–16px, line-height 1.75; label 12–13px semibold, sentence case. Tidak ada all-caps dekoratif.

**Bentuk:** radius 24–40px untuk kartu, `rounded-2xl` untuk tombol, border 1–2px, shadow biru lembut bertingkat. Tidak ada sudut tajam.

**Layout:** shell `max-w-[640px]`; desktop menampilkan shell sebagai kartu mengambang, mobile full-bleed. Onboarding: header lockup kecil + langkah, kartu ilustrasi 5:4, judul + body rata kiri, progress dots + CTA di bawah. Splash dan error: komposisi tengah.

**Prinsip:** konsisten dengan brand; satu momen motion per halaman; kontras teks minimal AA; target sentuh ≥44px; `prefers-reduced-motion` dihormati.

### 3.2 Copy Deck

| Halaman | Judul | Body | CTA |
|---|---|---|---|
| Splash | StudentConnect | "Your Academic Companion." / "Semua urusan kuliah ngumpul di satu tempat, bikin harimu jauh lebih simpel." | Auto ke Onboarding 1 |
| Onboarding 1 | Anti Salah Jadwal Lagi | "Nggak perlu pusing scroll grup chat cuma buat mastiin hari ini masuk kelas apa dan jam berapa." | Lanjut / Kembali |
| Onboarding 2 | Bahan Belajar Nggak Pake Ribet | "Semua catatan dan kebutuhan belajarmu tersimpan rapi, tinggal buka kapan aja pas lagi butuh." | Lanjut / Kembali |
| Onboarding 3 | Satu Pintu, Kuliah Lebih Chill | "Dari urusan kelas sampai persiapan belajar, semuanya nyambung di satu tempat biar kamu bisa fokus jalanin hari." | Mulai Sekarang / Kembali |
| Not Found | "Halaman ini nggak ketemu." | "Tautannya mungkin salah, atau halamannya sudah dipindahkan. Balik ke beranda buat lanjut." | Kembali ke beranda |
| Unauthorized | "Akunmu belum punya akses." | "Halaman ini khusus untuk peran tertentu. Masuk dengan akun yang sesuai, atau kembali ke beranda." | Masuk dengan akun lain / Kembali ke beranda |

Tidak ada tombol skip. `Mulai Sekarang` mengarah ke `/login` (di prototype: `ui-splash-screen.html` sebagai jalan pulang, dengan target login didokumentasikan).

## 4. Scope & Constraints

**In Scope:**

- Satu file plan di `docs/00-plan/`.
- Enam prototype HTML di `screen/`.
- Token desain, motion, dan interaksi dasar di prototype.
- Rencana implementasi Next.js (fase tertunda).

**Out of Scope:**

- Edit `src/**`, `public/**`, dependency, schema, migrasi.
- Halaman login dan halaman aplikasi lain.
- Aset ilustrasi baru (lihat risiko).

**Constraints:**

- HTML harus bisa dibuka langsung via `file://`.
- Tailwind dipin ke `4.3.3` melalui `@tailwindcss/browser@4.3.3`.
- Shell konten maksimum 640px, mobile-first.
- Bahasa UI Indonesia; identifier kode Inggris.
- Tanpa dependency baru.

## 5. Implementation Phases

### Phase 1 — Fondasi visual dan splash

**Objective:** Token, shell, dan motion dasar terbukti di halaman splash.

**Files:**

- CREATE: `screen/ui-splash-screen.html`

**Tasks:**

- [x] Definisikan token warna/font Tailwind via `@theme` inline.
- [x] Shell 640px, latar grid kertas, aksen blob Ice Blue.
- [x] Logo MOCHI sebagai centerpiece + 3 chip stiker jadwal.
- [x] Entrance bertahap, progress bar, auto-redirect 2,6 detik.
- [x] Fallback `<noscript>` dan reduced motion.

**Dependencies:** `@tailwindcss/browser@4.3.3`, Google Fonts.

**Validation:**

- [ ] Buka di browser pada 360px, 390px, 640px.
- [ ] Redirect ke `ui-onboarding-1.html`.
- [ ] Reduced motion: tanpa animasi, tetap redirect.

**Completion Criteria:** Splash tampil utuh, tidak ada elemen terpotong, redirect bekerja.

### Phase 2 — Onboarding 1–3

**Objective:** Tiga langkah onboarding dengan CTA, progress dots, dan navigasi antar-file.

**Files:**

- CREATE: `screen/ui-onboarding-1.html`
- CREATE: `screen/ui-onboarding-2.html`
- CREATE: `screen/ui-onboarding-3.html`

**Tasks:**

- [x] Header lockup + indikator langkah.
- [x] Kartu ilustrasi dengan chip konteks berbeda per langkah.
- [x] Progress dots sebagai link dengan `aria-current="step"`.
- [x] CTA primary/ghost konsisten; langkah 1 punya Kembali ke splash sesuai alur.
- [x] Transisi masuk halaman dan `@view-transition`.

**Dependencies:** Phase 1.

**Validation:**

- [ ] Alur splash → 1 → 2 → 3 → login/splash berfungsi.
- [ ] Kembali dari 1 ke splash, 2 ke 1, 3 ke 2.
- [ ] Keyboard: semua link fokus terlihat.

**Completion Criteria:** Ketiga langkah konsisten dan dapat dieksplorasi tanpa jalan buntu.

### Phase 3 — Halaman pendukung 404 dan 403

**Objective:** Halaman kegagalan yang ramah, jelas, dan memberi jalan keluar.

**Files:**

- CREATE: `screen/ui-not-found.html`
- CREATE: `screen/ui-unauthorized.html`

**Tasks:**

- [x] Kartu ilustrasi memakai `not-found.png` / `unauthorized.png`.
- [x] Kode/status jelas tanpa jargon.
- [x] CTA kembali ke beranda; 403 menyediakan jalur login.
- [x] Tidak membocorkan detail otorisasi.

**Dependencies:** Phase 1.

**Validation:**

- [ ] Link beranda kembali ke splash.
- [ ] Layout aman pada 360px.

**Completion Criteria:** Kedua halaman selesai secara visual dan informatif.

### Phase 4 — Implementasi Next.js (DEFERRED)

**Objective:** Menerapkan prototype ke aplikasi setelah plan disetujui dan prototype final.

**Files:**

- MODIFY: `src/app/page.tsx` (splash)
- CREATE: `src/app/onboarding/page.tsx`
- CREATE: `src/shared/components/widgets/splash-screen.tsx`
- CREATE: `src/shared/components/widgets/onboarding-carousel.tsx`
- CREATE: `src/shared/components/widgets/status-page.tsx`
- CREATE: `src/app/not-found.tsx`
- CREATE: `src/app/unauthorized/page.tsx`
- MODIFY: `src/app/layout.tsx` (Font tetap Geist, shell)
- MODIFY: `src/app/globals.css` 
- MODIFY: `src/app/manifest.ts`

**Tasks:**

- [ ] Pindahkan token dan style dari prototype.
- [ ] Splash: client timer + session-aware redirect (M1).
- [ ] Onboarding: satu route, state 0–2, tanpa dependency.
- [ ] 404/403 memakai satu komponen status bersama.
- [ ] Hapus token/utility yang tidak terpakai.

**Dependencies:** Phase 1–3, dokumen Next.js 16 di `node_modules/next/dist/docs/`.

**Validation:**

- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Cek visual 360/390/640px
- [ ] E2E alur splash → onboarding → login

**Completion Criteria:** Route `/`, `/onboarding`, `/unauthorized`, dan 404 berjalan di aplikasi.

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `docs/00-plan/m1-splash-onboarding-support.md` | CREATE | Plan ini | — |
| `screen/ui-splash-screen.html` | CREATE | Prototype splash | 1 |
| `screen/ui-onboarding-1.html` | CREATE | Prototype onboarding jadwal | 2 |
| `screen/ui-onboarding-2.html` | CREATE | Prototype onboarding materi | 2 |
| `screen/ui-onboarding-3.html` | CREATE | Prototype onboarding gabungan | 2 |
| `screen/ui-not-found.html` | CREATE | Prototype 404 | 3 |
| `screen/ui-unauthorized.html` | CREATE | Prototype 403 | 3 |

## 7. Risks & Validation

| Risk / Edge Case | Impact | Mitigation |
|---|---|---|
| Ilustrasi onboarding 2 dan 3 belum ada | Visual tidak sesuai brief pose MOCHI | Selesai: `onboarding-{1,2,3}.png` tersedia dan dipakai per langkah. |
| `Kembali` dari onboarding 1 ke splash membuat loop auto-redirect | UX membingungkan | Splash auto-redirect ke `/onboarding`; tombol Kembali di langkah 1 `disabled` sehingga tidak ada loop. |
| Tailwind browser CDN butuh internet | Prototype gagal render offline | Pin `4.3.3`; fallback CSS kustom untuk layout inti; implementasi memakai Tailwind build normal. |
| Duplikasi token di 6 file | Inkonsistensi saat revisi | Blok token identik + komentar sinkronisasi; implementasi memakai satu `globals.css`. |
| Font brand beda dengan layout aplikasi | Visual prototype ≠ aplikasi | Keputusan dev: font tetap Geist + Outfit (deviasi sadar dari Plus Jakarta Sans). |
| Teks putih di `brand` gagal kontras | Aksesibilitas | Tombol primary memakai `primary` (#1c9cf0) dengan `text-foreground` gelap agar ≥4.5:1. |
| Animasi berlebihan | Distraksi / motion sickness | Satu entrance per halaman + `prefers-reduced-motion`. |
| `@view-transition` belum didukung semua browser | Tidak ada transisi | Progressive enhancement; halaman tetap berfungsi. |
| Nama file aset mengandung spasi | URL rusak jika tidak di-encode | Selesai: aset dipindah ke `src/modules/onboarding/assets/onboarding-{1,2,3}.png` (tanpa spasi). |

**Required Checks:**

- [ ] Verifikasi visual di browser pada 360px, 390px, dan 640px — belum dijalankan; agent tidak dapat melihat gambar.
- [x] Tidak ada perubahan di `src/` pada fase prototype; Phase 4 (§12) menambahkan `src/modules/onboarding/**`, `screen-shell.tsx`, dan route.
- [x] Link antar-halaman valid (pemeriksaan statis).
- [ ] Fokus keyboard dan reduced motion — sudah diterapkan di kode, belum diuji manual.
- [x] Typecheck / lint / build — Phase 4: `npm run lint` bersih, `npm run build` hijau.

## 8. Definition of Done

- [x] Plan mengikuti struktur `TEMPLATE.PLAN.md`.
- [x] Enam prototype HTML tersedia di `screen/`.
- [x] Prototype tidak mengubah `src/`; implementasi Phase 4 (§12) menambahkan kode di `src/`.
- [x] Copy dan interaksi sesuai brief.
- [ ] Visual sesuai brief — menunggu review browser.
- [x] Risiko aset dan dependency tercatat.
- [x] Phase 4 dieksekusi (§12); lint + build hijau.

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | COMPLETE | `screen/ui-splash-screen.html` | Link, markup, dan redirect timer diperiksa statis; verifikasi visual pending |
| 2 | COMPLETE | `screen/ui-onboarding-1.html`, `-2`, `-3` | Semua target link valid; verifikasi visual pending |
| 3 | COMPLETE | `screen/ui-not-found.html`, `screen/ui-unauthorized.html` | Link valid; verifikasi visual pending |
| 4 | COMPLETE | `src/modules/onboarding/**`, `src/shared/components/screen-shell.tsx`, `src/app/{page,onboarding/page,not-found,unauthorized/page}.tsx`, `globals.css`, `layout.tsx`, `manifest.ts` | `npm run lint` bersih; `npm run build` hijau (semua route static) |

**Deviations:**

- Prototype onboarding 1 tetap menyediakan `Kembali` ke splash sesuai alur CTA, meski splash auto-redirect. Perilaku final ditangani di Phase 4.
- Ilustrasi onboarding 2 dan 3 memakai ulang `onboarding 1.png` karena aset belum tersedia.
- Link `Masuk dengan akun lain` pada 403 mengarah ke `/login` yang belum dibuat (M1).

## 10. Final Report

- **Summary:** Rencana dan enam prototype untuk splash, onboarding, 404, dan 403 selesai. Design system memakai palet MOCHI, Plus Jakarta Sans, shell 640px, dan CSS motion tanpa dependency baru.
- **Files Changed:** `docs/00-plan/m1-splash-onboarding-support.md`, `screen/ui-*.html` (6 file).
- **Validation:** Pemeriksaan statis — semua `href`/`src` relatif menunjuk file yang ada, struktur `div` seimbang, `src/` tidak berubah. Verifikasi visual browser belum dijalankan karena agent tidak dapat melihat gambar.
- **Limitations:** Aset onboarding 2–3 belum ada; prototype bergantung pada CDN Tailwind dan Google Fonts.
- **Remaining Work:** Phase 4 implementasi Next.js setelah prototype disetujui.
- **Commit:** `docs(ui): plan splash, onboarding, and support screens`

## 11. Revisi — Refactor Prototype

Revisi setelah review dev. Prototype di-rewrite agar konsisten dan sesuai sumber resmi.

- **Warna:** token prototype kini menyalin `src/app/globals.css` apa adanya (background/foreground/card/primary `#1c9cf0`/secondary/muted/accent/destructive/border/ring + skala `--radius: 1rem`). Palet hex lama (`ink`, `paper`, `ice`, `deep`, `brand`, `cyan-brand`) dihapus. Primary dipakai hemat: hanya CTA, aksen kecil, dan progress dots; permukaan memakai `card`/`secondary`/`muted`/`border`.
- **Kontras:** teks CTA memakai `text-foreground` (gelap) di atas `primary` `#1c9cf0`, karena `primary-foreground` (near-white) hanya ±3:1. Tercatat sebagai komentar `ponytail:` di setiap CTA.
- **Copy:** seluruh teks kini diambil dari `screen/copywriting.json` (judul, badge, kartu, heading, body, CTA, help). Copy lama diganti; diverifikasi otomatis bahwa setiap string JSON ada di file terkait.
- **Icon:** `reicon` via `https://unpkg.com/reicon/cdn/reicon.js`; dipakai `calendar-days`, `book-open`, `file-pdf`, `info-circle`, `user`, `home`, `login`, `shield-check`, `arrow-left`, `arrow-right`. Nama diverifikasi ada di bundle.
- **Layout:** satu shell untuk semua halaman — header lockup + indikator langkah (onboarding), `main` flex-column `gap-4` dengan figure `flex-1 min-h-24` (tanpa tinggi hardcode) lalu teks dan aksi di bawah; `h-screen` + `overflow-y-hidden`.
- **Ukuran:** ukuran arbitrary yang tidak perlu dihapus (mis. `h-[clamp(...)]`, `text-[2rem]`, `py-12`) dan diganti skala Tailwind (`text-2xl sm:text-3xl`, `h-12`, `h-11`, `size-9`). Sisa hardcode hanya yang perlu: `max-w-[640px]` (spec shell) dan `min-h-24` (guard figure di layar pendek).
- **Motion:** logo/MOCHI bob + rotate infinite (`.bob` / `.sway`), entrance `.enter`, splash loadbar; semua di bawah `prefers-reduced-motion: no-preference`. Tanpa dependency.
- **Perilaku:** tombol `Kembali` di onboarding 1 di-`disabled`; onboarding 2/3 tetap aktif. Splash tetap auto-redirect + label loading bergilir dari `loadingLabel`.
- **Aset:** `onboarding 2.png` sudah tersedia dan dipakai di onboarding 2 (dengan `-scale-x-100` sesuai edit dev); onboarding 3 memakai `onboarding 1.png`.
- **Verifikasi statis:** copy JSON cocok, nama icon valid, `div`/`main`/`figure` seimbang, semua `href`/`src` relatif resolve, `src/**` tidak diubah. Verifikasi visual tetap tugas reviewer.

### Execution Log (revisi)

| Item | Status | Catatan |
|---|---|---|
| Warna → globals.css | COMPLETE | Token disalin; primary hemat |
| Copy → copywriting.json | COMPLETE | Dicek otomatis |
| Icon Reicon | COMPLETE | Nama valid |
| Layout & 320px | COMPLETE | Shell seragam; figure fleksibel |
| Motion logo/MOCHI | COMPLETE | CSS keyframes, reduced-motion |
| Kembali disabled (onboarding 1) | COMPLETE | `disabled` + gaya muted |

### Follow-up — Onboarding 2 & 3 diseragamkan ke pola onboarding 1 (versi dev)

- `ui-onboarding-2.html` dan `ui-onboarding-3.html` ditulis ulang mengikuti pola terbaru `ui-onboarding-1.html`: `body min-h-screen`, shell `min-h-screen overflow-hidden`, `main mt-10 flex flex-col justify-between min-h-screen gap-10`, figure `min-h-50 max-h-90` dengan gambar mengambang (`bob object-cover scale-90`, tanpa kartu), blok teks `text-center`, dots `gap-0`, CTA `bg-primary text-primary-foreground` + ikon `chevron-right`/`chevron-left` `stroke-2`.
- Header lockup dihapus dari kedua halaman (sesuai keputusan); `stepIndicator` (`"2 / 3"`, `"3 / 3"`) tidak lagi ditampilkan.
- Badge kanan-atas memakai ikon langkah: `book-open` (2) dan `info-circle` (3).
- Onboarding 3 memakai aset baru `public/brand/onboarding 3.png`; onboarding 2 tetap `onboarding 2.png` (flip horizontal dipindah ke wrapper karena animasi `bob` menimpa `transform` pada `img`).
- Verifikasi statis: copy JSON cocok (kecuali 3 string di file lain yang diubah dev — splash description, onb-1 `08.00–10.30 | Database Tecnology`, not-found body), ikon valid, tag seimbang, link resolve.

## 12. Phase 4 — Implementasi Next.js (SELESAI)

Dieksekusi 2026-11-15. Keputusan dev mengubah sebagian item Phase 4 di atas.

- **Modul, bukan `src/shared/components/widgets/`.** Kode splash/onboarding hidup di `src/modules/onboarding/` sesuai batas modul.
  - `copy.ts` — copy dari `screen/copywriting.json` (dengan 3 string versi prototype yang disetujui dev).
  - `motion/variants.ts` — `fadeUp`, `bob`, `sway`.
  - `components/splash-screen.tsx` — client; redirect `router.replace("/onboarding")` setelah 2700 ms (700 ms reduced-motion); label bergilir 900 ms; loadbar `motion.path`; logo `/brand/icon.png`.
  - `components/onboarding-step.tsx` — `OnboardingStepView`; aset PNG diimpor statis; bob via `useReducedMotion`.
  - `components/onboarding-carousel.tsx` — `Carousel` + `embla`, dots `aria-current="step"`, CTA primary (langkah 3 → `/login`) + Kembali `disabled` di langkah 1.
  - `index.ts` — barrel.
  - `assets/onboarding-{1,2,3}.png` — dipindah dari `public/brand/` (spasi di nama file dihapus).
- **`ScreenShell` di `src/shared/components/screen-shell.tsx`** — shell 640px + `.paper-grid` + blob, dipakai splash, onboarding, 404, dan 403.
- **404/403 inline, bukan komponen status bersama.** `src/app/not-found.tsx` dan `src/app/unauthorized/page.tsx` memuat markup-nya sendiri (keputusan dev).
- **Motion v14** (D-28 diubah): carousel memakai shadcn `carousel` + `embla-carousel-react@^8.6.0`; ikon carousel ditukar ke `reicon-react`. shadcn `progress` tidak dipakai agar loadbar tetap SVG kustom.
- **Font tetap Geist + Outfit** (deviasi sadar dari Plus Jakarta Sans di prototype).
- `.paper-grid` ditambahkan ke `src/app/globals.css`; `viewport.themeColor` (`layout.tsx`) dan `theme_color` (`manifest.ts`) → `#1c9cf0`.
- `screen/ui-onboarding-{1,2,3}.html` `src` diperbarui ke `../src/modules/onboarding/assets/onboarding-{1,2,3}.png`.

**Dependency ditambah:** `embla-carousel-react ^8.6.0` (via `npx shadcn add carousel`). `motion ^14.14.0` dan `reicon-react ^1.2.6` sudah terpasang.

**Validasi:** `npm run lint` bersih; `npm run build` hijau — route `/`, `/onboarding`, `/unauthorized`, `/_not-found` semua prerender static (Button/Badge tanpa `"use client"` aman di RSC). Verifikasi visual browser tetap tugas reviewer.
