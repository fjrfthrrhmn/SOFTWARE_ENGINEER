import { cookies } from "next/headers"

export const ONBOARDING_COOKIE = "studentconnect_onboarding_seen"

const ONBOARDING_MAX_AGE = 60 * 60 * 24 * 365

export async function hasSeenOnboarding() {
  return (await cookies()).get(ONBOARDING_COOKIE)?.value === "1"
}

export async function setOnboardingSeen() {
  const cookieStore = await cookies()

  cookieStore.set(ONBOARDING_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONBOARDING_MAX_AGE,
  })
}
