import { config } from "dotenv"
import { test } from "@e2e-dev/web"
import { expect } from "e2e"

config({ path: ".env.local" })

test("mahasiswa can sign in, sees dashboard, and can sign out", async ({
  app,
  screen,
  browser,
}) => {
  await app.open("/dashboard")
  await expect(browser).toHaveURL("/login")

  await screen.getByLabel("Email").fill("dhandy.amir@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("mahasiswa12345")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/onboarding")

  await app.open("/dashboard")
  await expect(browser).toHaveURL("/dashboard")
  await expect(screen.getByText("Sepertinya ada kendala")).toBeVisible()

  await screen.getByRole("button", "Buka profil pengguna").click()
  await screen.getByRole("button", "Keluar").click()
  await expect(browser).toHaveURL("/login")
})

test("admin can sign in and lands on dashboard", async ({
  app,
  screen,
  browser,
}) => {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD

  if (!email || !password) {
    throw new Error("SEED_ADMIN_EMAIL dan SEED_ADMIN_PASSWORD wajib diisi.")
  }

  await app.open("/login")
  await screen.getByLabel("Email").fill(email)
  await screen.getByLabel("Kata Sandi").fill(password)
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/onboarding")

  await app.open("/dashboard")
  await expect(browser).toHaveURL("/dashboard")
  await expect(screen.getByText(/Selamat .*, Admin/)).toBeVisible()
  await expect(screen.getByText("Ringkasan")).toBeVisible()
  await expect(screen.getByText("Aksi cepat")).toBeVisible()
  await expect(
    screen.getByRole("navigation", "Navigasi utama"),
  ).toBeVisible()
  await expect(screen.getByRole("link", "Pengguna")).toBeVisible()
  await expect(screen.getByRole("link", "Jadwal Kuliah")).toBeVisible()
  await expect(screen.getByRole("button", "Ganti tema")).toBeVisible()
})

test("wrong password stays on login with a generic error", async ({
  app,
  screen,
  browser,
}) => {
  await app.open("/login")
  await screen.getByLabel("Email").fill("dhandy.amir@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("password-salah")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/login")
  await expect(
    screen.getByText("Email atau kata sandi tidak sesuai"),
  ).toBeVisible()
})

test("mahasiswa and dosen can sign in by email", async ({
  app,
  screen,
  browser,
}) => {
  await app.open("/login")
  await screen
    .getByLabel("Email")
    .fill("dhandy.amir@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("mahasiswa12345")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/onboarding")

  await app.open("/dashboard")
  await expect(browser).toHaveURL("/dashboard")
  await screen.getByRole("button", "Buka profil pengguna").click()
  await screen.getByRole("button", "Keluar").click()
  await expect(browser).toHaveURL("/login")

  await screen
    .getByLabel("Email")
    .fill("budi.santoso@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("dosen12345")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/onboarding")

  await app.open("/dashboard")
  await expect(browser).toHaveURL("/dashboard")
})

test("onboarding is shown once and skipped afterwards", async ({
  app,
  screen,
  browser,
}) => {
  await app.open("/")
  await expect(browser).toHaveURL("/onboarding", { timeout: 5000 })

  await screen.getByRole("button", "Lanjut").click()
  await screen.getByRole("button", "Lanjut").click()
  await screen.getByRole("button", "Mulai Sekarang").click()

  await expect(browser).toHaveURL("/login")

  await app.open("/")
  await expect(browser).toHaveURL("/login", { timeout: 5000 })

  await screen.getByLabel("Email").fill("dhandy.amir@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("mahasiswa12345")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/dashboard")

  await app.open("/onboarding")
  await expect(browser).toHaveURL("/dashboard")
})

