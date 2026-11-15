import { z } from "zod"

const passwordBytes = (value: string) => new TextEncoder().encode(value).length

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email wajib diisi.")
    .max(254, "Email terlalu panjang.")
    .email("Format email tidak valid."),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi.")
    .refine(
      (value) => passwordBytes(value) <= 72,
      "Kata sandi maksimal 72 byte.",
    ),
})
