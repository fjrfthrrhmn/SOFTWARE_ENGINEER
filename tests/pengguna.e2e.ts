import { config } from "dotenv"
import { beforeEach, describe, test } from "@e2e-dev/web"
import { expect } from "e2e"

config({ path: ".env.local" })

describe("dashboard pengguna", () => {
  beforeEach(async ({ app, screen, browser }) => {
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

    await app.open("/dashboard/pengguna")
    await expect(screen.getByRole("heading", "Kelola Pengguna")).toBeVisible()
  })

  test("shows users from the database", async ({ screen }) => {
    await expect(screen.getByRole("table")).toBeVisible()
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
  })

  test("searches users by query", async ({ screen, browser }) => {
    await screen.getByLabel("Cari pengguna").fill("budi")

    await expect(browser).toHaveURL(/q=budi/)
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
    await expect(screen.getByText("Dhandy Amir Faisal")).toBeHidden()
  })

  test("filters users by role and status", async ({ screen, browser }) => {
    await screen.getByRole("button", "Atur Filter").click()
    await expect(screen.getByText("Filter Pengguna")).toBeVisible()

    await screen.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await screen.getByRole("combobox", "Status").click()
    await screen.getByRole("option", "Aktif").click()

    await expect(browser).toHaveURL(/role=dosen/)
    await expect(browser).toHaveURL(/status=aktif/)
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
    await expect(screen.getByText("Dhandy Amir Faisal")).toBeHidden()
  })

  test("resets filters", async ({ app, screen, browser }) => {
    await app.open("/dashboard/pengguna?role=dosen&status=aktif&q=budi")
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()

    await screen.getByRole("button", "Atur Filter").click()
    await screen.getByRole("button", "Reset filter").click()

    await expect(browser).toHaveURL("/dashboard/pengguna")
    await expect(screen.getByText("Administrator")).toBeVisible()
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
  })

  test("shows pagination state with seed data", async ({ screen }) => {
    await expect(screen.getByText("Menampilkan 1–3 dari 3")).toBeVisible()
    await expect(screen.getByRole("button", "Halaman sebelumnya")).toBeDisabled()
    await expect(screen.getByRole("button", "Halaman berikutnya")).toBeDisabled()
  })
})
