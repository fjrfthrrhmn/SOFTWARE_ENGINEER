export const splash = {
  title: "StudentConnect | Informasi Akademik",
  logoAlt: "Logo StudentConnect",
  tagline: "Your Academic Companion",
  description:
    "Akses informasi akademik dalam satu platform untuk mendukung aktivitas akademik mahasiswa",
  loadingLabels: [
    "Memuat informasi akademik...",
    "Menyiapkan jadwal perkuliahan...",
    "Menghubungkan data mahasiswa...",
    "Menyiapkan materi pembelajaran...",
  ],
}

export type OnboardingStepId = "schedule" | "materials" | "summary"

export interface OnboardingStep {
  id: OnboardingStepId
  title: string
  imageAlt: string
  heading: string
  body: string
  primaryCta: string
  secondaryCta: string
  flip?: boolean
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "schedule",
    title: "StudentConnect | Jadwal Perkuliahan",
    imageAlt: "Maskot MOCHI menunjukkan kalender berisi jadwal perkuliahan",
    heading: "Pantau Jadwal Perkuliahan",
    body: "Lihat jadwal mata kuliah dan waktu perkuliahan dalam satu tampilan. Periksa agenda harianmu agar setiap kelas dapat diikuti sesuai jadwal",
    primaryCta: "Lanjut",
    secondaryCta: "Kembali",
  },
  {
    id: "materials",
    title: "StudentConnect | Materi Pembelajaran",
    imageAlt:
      "Maskot MOCHI memperkenalkan fitur materi pembelajaran StudentConnect",
    heading: "Akses Materi Kuliah dengan Mudah",
    body: "Temukan materi pembelajaran yang dibagikan dosen sesuai mata kuliah. Buka dan pelajari kembali dokumen yang kamu butuhkan untuk mendukung kegiatan belajar",
    primaryCta: "Lanjut",
    secondaryCta: "Kembali",
    flip: true,
  },
  {
    id: "summary",
    title: "StudentConnect | Semua Informasi Akademik",
    imageAlt: "Maskot MOCHI menyambut pengguna untuk mulai menggunakan StudentConnect",
    heading: "Informasi Kuliah dalam Satu Tempat",
    body: "Akses informasi perkuliahan sesuai kebutuhanmu. Mulai dari melihat jadwal kelas hingga membuka materi pembelajaran, semuanya tersedia melalui StudentConnect",
    primaryCta: "Mulai Sekarang",
    secondaryCta: "Kembali",
  },
]

export const notFound = {
  title: "StudentConnect | Halaman Tidak Ditemukan",
  statusCode: "404",
  eyebrow: "Error 404",
  imageAlt: "Maskot MOCHI kebingungan saat mencari halaman yang tidak tersedia",
  heading: "Halaman Tidak Ditemukan",
  body: "Halaman yang kamu cari tidak tersedia. Periksa kembali alamat tautan.",
  primaryCta: "Kembali ke Beranda",
  help: "Masih mengalami kendala? Hubungi admin untuk mendapatkan bantuan",
}

export const unauthorized = {
  title: "StudentConnect | Akses Ditolak",
  statusCode: "403",
  eyebrow: "Error 403",
  imageAlt:
    "Maskot MOCHI memberikan informasi bahwa akun pengguna belum memiliki izin akses",
  heading: "Akses Tidak Tersedia",
  body: "Akun yang sedang digunakan belum memiliki izin untuk membuka halaman ini. Silakan masuk menggunakan akun dengan hak akses yang sesuai",
  primaryCta: "Masuk dengan Akun Lain",
  secondaryCta: "Kembali ke Beranda",
  help: "Memerlukan izin akses? Hubungi admin untuk mendapatkan informasi lebih lanjut",
}
