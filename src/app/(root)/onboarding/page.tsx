import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession, roleHome } from "@/lib/auth"
import { OnboardingCarousel } from "@/modules/onboarding"
import { hasSeenOnboarding } from "@/modules/onboarding/seen"

export const metadata: Metadata = {
  title: "StudentConnect | Onboarding",
}

export const instant = false

export default async function OnboardingPage() {
  const [session, seen] = await Promise.all([getSession(), hasSeenOnboarding()])

  if (seen) redirect(session ? roleHome(session.role) : "/login")

  return <OnboardingCarousel />
}
