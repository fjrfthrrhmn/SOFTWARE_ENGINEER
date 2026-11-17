import type { UserRole } from "@/modules/users/types"

export type Session = {
  userId: number
  role: UserRole
}

export type LoginInput = {
  email: string
  password: string
}

export type LoginResult =
  | { ok: true; userId: number; role: UserRole }
  | {
      ok: false
      error: "invalid_input"
      fieldErrors?: Partial<Record<"email" | "password", string[]>>
    }
  | {
      ok: false
      error:
        | "invalid_credentials"
        | "account_disabled"
        | "rate_limited"
        | "server_error"
    }

export function isRole(value: unknown): value is UserRole {
  return value === "mahasiswa" || value === "dosen" || value === "admin"
}

export function roleHome(role: UserRole) {
  void role
  return "/dashboard"
}
