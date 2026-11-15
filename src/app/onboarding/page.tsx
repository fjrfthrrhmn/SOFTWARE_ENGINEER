import type { Metadata } from "next"
import { OnboardingCarousel } from "@/modules/onboarding"

export const metadata: Metadata = {
  title: "StudentConnect | Onboarding",
}

export default function OnboardingPage() {
  return <OnboardingCarousel />
}
