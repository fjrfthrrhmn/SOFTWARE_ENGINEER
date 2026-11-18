import { z, type RefinementCtx } from "zod"

const passwordBytes = (value: string) => new TextEncoder().encode(value).length

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email wajib diisi.")
  .max(254, "Email terlalu panjang.")
  .email("Format email tidak valid.")

const passwordSchema = z
  .string()
  .min(8, "Kata sandi minimal 8 karakter.")
  .refine(
    (value) => passwordBytes(value) <= 72,
    "Kata sandi maksimal 72 byte.",
  )

const newPasswordSchema = z
  .string()
  .refine(
    (value) =>
      value === "" ||
      (passwordBytes(value) >= 8 && passwordBytes(value) <= 72),
    "Kata sandi baru minimal 8 dan maksimal 72 byte.",
  )

const namaSchema = z.string().trim().min(1, "Nama lengkap wajib diisi.")
const identitasSchema = z
  .string()
  .trim()
  .min(1, "NIM atau kode dosen wajib diisi.")
  .max(100, "NIM atau kode dosen terlalu panjang.")

const roleSchema = z.enum(["mahasiswa", "dosen"], {
  error: "Peran pengguna wajib dipilih.",
})

const angkatanSchema = z
  .number()
  .int("Angkatan harus berupa tahun.")
  .min(1900, "Angkatan tidak valid.")
  .max(2100, "Angkatan tidak valid.")
  .nullable()

const programStudiIdSchema = z.number().int().positive().nullable()

function validateStudyProgramFields(
  value: { role: "mahasiswa" | "dosen"; angkatan: number | null; programStudiId: number | null },
  ctx: RefinementCtx,
) {
  if (value.role !== "mahasiswa") return

  if (value.angkatan === null) {
    ctx.addIssue({
      code: "custom",
      path: ["angkatan"],
      message: "Tahun angkatan wajib diisi untuk mahasiswa.",
    })
  }

  if (value.programStudiId === null) {
    ctx.addIssue({
      code: "custom",
      path: ["programStudiId"],
      message: "Program studi wajib dipilih untuk mahasiswa.",
    })
  }
}

export const createUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    nama: namaSchema,
    identitas: identitasSchema,
    role: roleSchema,
    angkatan: angkatanSchema,
    programStudiId: programStudiIdSchema,
  })
  .superRefine(validateStudyProgramFields)

export const updateUserSchema = z
  .object({
    nama: namaSchema,
    identitas: identitasSchema,
    role: roleSchema,
    angkatan: angkatanSchema,
    programStudiId: programStudiIdSchema,
    newPassword: newPasswordSchema,
  })
  .superRefine(validateStudyProgramFields)

export const deactivateUserSchema = z.object({
  userId: z.number().int().positive(),
})
