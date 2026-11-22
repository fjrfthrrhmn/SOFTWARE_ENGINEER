import { config } from "dotenv"
import { beforeEach, describe, test } from "@e2e-dev/web"
import { expect } from "e2e"

config({ path: ".env.local" })

function makeDosen() {
  const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

  return {
    name: `E2E Dosen ${suffix}`,
    email: `e2e-${suffix}@example.test`,
    code: `DSN-${suffix}`,
    password: "Password123!",
  }
}

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

    await app.open("/dashboard/users")
    await expect(screen.getByRole("heading", "Kelola Pengguna")).toBeVisible()
  })

  test("shows users from the database", async ({ screen }) => {
    await expect(screen.getByRole("table")).toBeVisible()
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
  })

  test("shows the creation date column", async ({ screen }) => {
    await expect(screen.getByRole("columnheader", "Dibuat")).toBeVisible()

    const row = screen.getByRole("row").filter({ hasText: "Budi Santoso, M.Kom." })
    await expect(row).toContainText(/\d{2} \w{3} \d{4}/)
  })

  test("shows the filtered total data count", async ({ screen }) => {
    await screen.getByLabel("Cari pengguna").fill("budi")

    await expect(screen.getByText("Total Data: 1")).toBeVisible()
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

  test("sorts users by name from the drawer", async ({ screen, browser }) => {
    const suffix = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
    const first = {
      name: `AAA Sort ${suffix}`,
      email: `sort-a-${suffix}@example.test`,
      code: `SRT-A-${suffix}`,
      password: "Password123!",
    }
    const second = {
      name: `ZZZ Sort ${suffix}`,
      email: `sort-z-${suffix}@example.test`,
      code: `SRT-Z-${suffix}`,
      password: "Password123!",
    }
    const createUser = async (user: typeof first) => {
      await screen.getByRole("button", "Tambah Pengguna Baru").click()
      const drawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
      await drawer.getByLabel("Email").fill(user.email)
      await drawer.getByLabel("Nama Lengkap").fill(user.name)
      await drawer.getByLabel("NIM / Kode Dosen").fill(user.code)
      await drawer.getByRole("combobox", "Peran").click()
      await screen.getByRole("option", "Dosen").click()
      await drawer.getByLabel("Kata Sandi").fill(user.password)
      await drawer.getByRole("button", "Simpan Pengguna").click()
    }

    await createUser(first)
    await createUser(second)
    await screen.getByLabel("Cari pengguna").fill(`Sort ${suffix}`)

    const rows = screen.getByRole("row").filter({ hasText: "Sort " })
    await expect(rows).toHaveText([
      new RegExp(first.name),
      new RegExp(second.name),
    ])

    await screen.getByRole("button", "Atur Filter").click()
    await screen.getByRole("combobox", "Sort by").click()
    await screen.getByRole("option", "Nama (Z–A)").click()
    await screen.getByRole("button", "Selesai").click()

    await expect(browser).toHaveURL(/sort=name-desc/)
    await expect(rows).toHaveText([
      new RegExp(second.name),
      new RegExp(first.name),
    ])
  })

  test("resets filters", async ({ app, screen, browser }) => {
    await app.open(
      "/dashboard/users?role=dosen&status=aktif&q=budi&sort=name-desc",
    )
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()

    await screen.getByRole("button", "Atur Filter").click()
    await screen.getByRole("button", "Reset filter").click()

    await expect(browser).toHaveURL("/dashboard/users")
    await expect(screen.getByRole("combobox", "Sort by")).toContainText(
      "Nama (A–Z)",
    )
    await expect(screen.getByText("Administrator")).toBeVisible()
    await expect(screen.getByText("Budi Santoso, M.Kom.")).toBeVisible()
  })

  test("shows pagination state", async ({ screen }) => {
    await expect(screen.getByText(/Menampilkan 1–\d+ dari \d+/)).toBeVisible()
    await expect(screen.getByRole("button", "Halaman sebelumnya")).toBeDisabled()
    await expect(screen.getByRole("button", "Halaman berikutnya")).toBeVisible()
  })

  test("hides row actions for admin accounts", async ({ screen }) => {
    await screen.getByLabel("Cari pengguna").fill("Administrator")

    const row = screen.getByRole("row").filter({ hasText: "Administrator" })
    await expect(row).toBeVisible()
    await expect(row.getByRole("button", "Ubah")).toBeHidden()
    await expect(row.getByRole("button", "Nonaktifkan")).toBeHidden()
  })

  test("creates a lecturer from the create drawer", async ({ screen }) => {
    const user = makeDosen()

    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const drawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await expect(screen.getByText("Buat akun mahasiswa atau dosen baru.")).toBeVisible()

    await drawer.getByLabel("Email").fill(user.email)
    await drawer.getByLabel("Nama Lengkap").fill(user.name)
    await drawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await drawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await drawer.getByLabel("Kata Sandi").fill(user.password)
    await drawer.getByRole("button", "Simpan Pengguna").click()

    await expect(screen.getByText("Pengguna Ditambahkan")).toBeVisible()

    await screen.getByLabel("Cari pengguna").fill(user.code)
    await expect(screen.getByText(user.name)).toBeVisible()
  })

  test("updates a lecturer from the action column", async ({ screen }) => {
    const user = makeDosen()
    const updatedName = `${user.name} Updated`

    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const createDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await createDrawer.getByLabel("Email").fill(user.email)
    await createDrawer.getByLabel("Nama Lengkap").fill(user.name)
    await createDrawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await createDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await createDrawer.getByLabel("Kata Sandi").fill(user.password)
    await createDrawer.getByRole("button", "Simpan Pengguna").click()
    await screen.getByLabel("Cari pengguna").fill(user.code)
    await expect(screen.getByText(user.name)).toBeVisible()

    await screen
      .getByRole("row")
      .filter({ hasText: user.name })
      .getByRole("button", "Ubah")
      .click()
    await expect(screen.getByText("Perbarui data akun tanpa mengubah email.")).toBeVisible()

    const updateDrawer = screen.getByRole("dialog", "Ubah Pengguna")
    await updateDrawer.getByLabel("Nama Lengkap").fill(updatedName)
    await updateDrawer.getByRole("button", "Simpan Perubahan").click()

    await expect(screen.getByText("Perubahan Disimpan")).toBeVisible()
    await expect(screen.getByText(updatedName)).toBeVisible()
    await expect(screen.getByText(user.name)).toBeHidden()
  })

  test("cancels then confirms deactivation", async ({ screen }) => {
    const user = makeDosen()

    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const createDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await createDrawer.getByLabel("Email").fill(user.email)
    await createDrawer.getByLabel("Nama Lengkap").fill(user.name)
    await createDrawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await createDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await createDrawer.getByLabel("Kata Sandi").fill(user.password)
    await createDrawer.getByRole("button", "Simpan Pengguna").click()
    await screen.getByLabel("Cari pengguna").fill(user.code)

    const row = screen.getByRole("row").filter({ hasText: user.name })
    await expect(row).toBeVisible()

    await row.getByRole("button", "Nonaktifkan").click()
    await expect(screen.getByText("Nonaktifkan Pengguna?")).toBeVisible()
    const confirmDialog = screen.getByRole("dialog", "Nonaktifkan Pengguna?")
    await confirmDialog.getByRole("button", "Batal").click()
    await expect(row).toContainText("Aktif")

    await row.getByRole("button", "Nonaktifkan").click()
    await screen
      .getByRole("dialog", "Nonaktifkan Pengguna?")
      .getByRole("button", "Nonaktifkan")
      .click()

    await expect(screen.getByText("Pengguna Dinonaktifkan")).toBeVisible()
    await expect(row).toContainText("Nonaktif")
    await expect(row.getByRole("button", "Nonaktifkan")).toBeHidden()
  })

  test("rejects a duplicate email and keeps the form filled", async ({ screen }) => {
    const user = makeDosen()

    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const createDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await createDrawer.getByLabel("Email").fill(user.email)
    await createDrawer.getByLabel("Nama Lengkap").fill(user.name)
    await createDrawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await createDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await createDrawer.getByLabel("Kata Sandi").fill(user.password)
    await createDrawer.getByRole("button", "Simpan Pengguna").click()
    await screen.getByLabel("Cari pengguna").fill(user.code)
    await expect(screen.getByText(user.name)).toBeVisible()

    const duplicate = makeDosen()
    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const duplicateDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await duplicateDrawer.getByLabel("Email").fill(user.email)
    await duplicateDrawer.getByLabel("Nama Lengkap").fill(duplicate.name)
    await duplicateDrawer.getByLabel("NIM / Kode Dosen").fill(duplicate.code)
    await duplicateDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await duplicateDrawer.getByLabel("Kata Sandi").fill(duplicate.password)
    await duplicateDrawer.getByRole("button", "Simpan Pengguna").click()

    await expect(screen.getByText("Email sudah digunakan pengguna lain.")).toBeVisible()
    await expect(duplicateDrawer.getByLabel("Nama Lengkap")).toHaveValue(duplicate.name)
  })

  test("rejects a duplicate identity and keeps the form filled", async ({ screen }) => {
    const user = makeDosen()

    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const createDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await createDrawer.getByLabel("Email").fill(user.email)
    await createDrawer.getByLabel("Nama Lengkap").fill(user.name)
    await createDrawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await createDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await createDrawer.getByLabel("Kata Sandi").fill(user.password)
    await createDrawer.getByRole("button", "Simpan Pengguna").click()
    await screen.getByLabel("Cari pengguna").fill(user.code)
    await expect(screen.getByText(user.name)).toBeVisible()

    const duplicate = makeDosen()
    await screen.getByRole("button", "Tambah Pengguna Baru").click()
    const duplicateDrawer = screen.getByRole("dialog", "Tambah Pengguna Baru")
    await duplicateDrawer.getByLabel("Email").fill(duplicate.email)
    await duplicateDrawer.getByLabel("Nama Lengkap").fill(duplicate.name)
    await duplicateDrawer.getByLabel("NIM / Kode Dosen").fill(user.code)
    await duplicateDrawer.getByRole("combobox", "Peran").click()
    await screen.getByRole("option", "Dosen").click()
    await duplicateDrawer.getByLabel("Kata Sandi").fill(duplicate.password)
    await duplicateDrawer.getByRole("button", "Simpan Pengguna").click()

    await expect(
      screen.getByText("NIM atau kode dosen sudah digunakan."),
    ).toBeVisible()
    await expect(duplicateDrawer.getByLabel("Nama Lengkap")).toHaveValue(duplicate.name)
  })
})

test("non-admin cannot open the users page", async ({ app, screen, browser }) => {
  await app.open("/login")
  await screen.getByLabel("Email").fill("dhandy.amir@studentconnect.local")
  await screen.getByLabel("Kata Sandi").fill("mahasiswa12345")
  await screen.getByRole("button", "Masuk").click()

  await expect(browser).toHaveURL("/onboarding")

  await app.open("/dashboard/users")
  await expect(browser).toHaveURL("/unauthorized")
})
