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
