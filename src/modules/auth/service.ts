import { compare } from "bcryptjs"
import { findAuthUserByEmail } from "@/modules/users/repository"
import type { LoginInput, LoginResult } from "./types"

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000
const DUMMY_HASH =
  "$2b$10$PPzjdfOHBGQsFR9zZp4Tp.G5NahhraSnG2nEmnF7y1qo8FhVty2/W"

// ponytail: per-instance memory limit; move to shared storage if auth runs multi-instance.
const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string) {
  const entry = attempts.get(key)

  if (!entry || entry.resetAt <= Date.now()) {
    if (entry) attempts.delete(key)
    return false
  }

  return entry.count >= MAX_ATTEMPTS
}

function recordFailure(key: string) {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return
  }

  entry.count += 1
}

export async function login({
  email,
  password,
}: LoginInput): Promise<LoginResult> {
  const key = email.trim().toLowerCase()

  if (isRateLimited(key)) {
    return { ok: false, error: "rate_limited" }
  }

  try {
    const user = await findAuthUserByEmail(email)
    const passwordValid = await compare(password, user?.passwordHash ?? DUMMY_HASH)

    if (!user || !passwordValid) {
      recordFailure(key)
      return { ok: false, error: "invalid_credentials" }
    }

    if (user.status !== "aktif") {
      attempts.delete(key)
      return { ok: false, error: "account_disabled" }
    }

    attempts.delete(key)
    return { ok: true, userId: user.id, role: user.role }
  } catch {
    return { ok: false, error: "server_error" }
  }
}
