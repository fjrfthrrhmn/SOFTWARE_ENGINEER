import type { Metadata } from "next"
import { SplashScreen } from "@/modules/onboarding"
import { splash } from "@/modules/onboarding/copy"

export const metadata: Metadata = {
  title: splash.title,
}

export default function Home() {
  return <SplashScreen />
}
