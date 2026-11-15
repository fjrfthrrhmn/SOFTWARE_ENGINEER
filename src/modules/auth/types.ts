export type Role = "mahasiswa" | "dosen" | "admin"

export type Session = {
  userId: number
  role: Role
}

export type LoginInput = {
  email: string
  password: string
}

export type LoginResult =
  | { ok: true; userId: number; role: Role }
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

export function isRole(value: unknown): value is Role {
  return value === "mahasiswa" || value === "dosen" || value === "admin"
}

export function roleHome(role: Role) {
  return role === "admin" ? "/admin" : "/dashboard"
}
