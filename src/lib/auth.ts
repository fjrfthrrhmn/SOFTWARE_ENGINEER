import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtVerify, SignJWT } from "jose"
import { isRole, roleHome, type Session } from "@/modules/auth/types"
import type { UserRole } from "@/modules/users/types"

const SESSION_COOKIE = "studentconnect_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7
const ALG = "HS256"
const ISSUER = "studentconnect"
const AUDIENCE = "studentconnect"

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const

function getSecret() {
  const secret = process.env.AUTH_SECRET

  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET wajib diisi minimal 32 karakter.")
  }

  return new TextEncoder().encode(secret)
}

export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: [ALG],
      issuer: ISSUER,
      audience: AUDIENCE,
    })
    const userId = Number(payload.sub)

    if (!Number.isInteger(userId) || userId <= 0 || !isRole(payload.role)) {
      return null
    }

    return { userId, role: payload.role }
  } catch {
    return null
  }
})

export async function createSession(session: Session) {
  const token = await new SignJWT({ role: session.role })
    .setProtectedHeader({ alg: ALG })
    .setSubject(String(session.userId))
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE,
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "", {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: 0,
  })
}

export async function requireRole(roles: UserRole[]) {
  const session = await getSession()

  if (!session) redirect("/login")
  if (!roles.includes(session.role)) redirect("/unauthorized")

  return session
}

export { roleHome }
