export const authLogin = {
  title: "StudentConnect | Masuk",
  logoAlt: "Logo StudentConnect",
  eyebrow: "Selamat Datang",
  heading: "Masuk ke StudentConnect",
  description: "Akses informasi kuliah melalui akun akademikmu.",
  form: {
    email: {
      label: "Email",
      placeholder: "Masukkan email",
    },
    password: {
      label: "Kata Sandi",
      placeholder: "Masukkan kata sandi",
    },
    submit: {
      label: "Masuk",
      loadingLabel: "Memeriksa akun...",
    },
  },
  feedback: {
    invalidCredentials: {
      title: "Email atau kata sandi tidak sesuai",
      description: "Periksa kembali data yang kamu masukkan.",
    },
    accountDisabled: {
      title: "Akun tidak aktif",
      description:
        "Akun ini belum dapat digunakan. Hubungi admin program studi untuk mendapatkan bantuan.",
    },
    rateLimited: {
      title: "Terlalu banyak percobaan",
      description: "Tunggu 15 menit sebelum mencoba masuk kembali.",
    },
    serverError: {
      title: "Terjadi kendala",
      description: "Permintaan masuk belum dapat diproses. Silakan coba kembali.",
    },
  },
  help: {
    description: "Mengalami kendala saat masuk?",
    contactAdmin: "Hubungi admin",
  },
} as const

export const authErrorCopy = {
  invalid_credentials: authLogin.feedback.invalidCredentials,
  account_disabled: authLogin.feedback.accountDisabled,
  rate_limited: authLogin.feedback.rateLimited,
  server_error: authLogin.feedback.serverError,
} as const
