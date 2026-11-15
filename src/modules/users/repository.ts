import { eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { pengguna } from "@/db/schema"
import type { Role } from "@/modules/auth/types"

export type AuthUser = {
  id: number
  passwordHash: string
  role: Role
  status: "aktif" | "nonaktif"
}

export async function findAuthUserByEmail(email: string): Promise<AuthUser | null> {
  const value = email.trim().toLowerCase()

  const [user] = await db
    .select({
      id: pengguna.id,
      passwordHash: pengguna.passwordHash,
      role: pengguna.role,
      status: pengguna.status,
    })
    .from(pengguna)
    .where(eq(sql`lower(${pengguna.email})`, value))
    .limit(1)

  return user ?? null
}
