import type { Metadata } from "next";
import { getSession, roleHome } from "@/lib/auth";
import { SplashScreen } from "@/modules/onboarding";
import { splash } from "@/modules/onboarding/copy";
import { hasSeenOnboarding } from "@/modules/onboarding/seen";

export const metadata: Metadata = {
  title: splash.title,
};

export const instant = false;

export default async function Home() {
  const [session, seen] = await Promise.all([
    getSession(),
    hasSeenOnboarding(),
  ]);
  const destination = session
    ? roleHome(session.role)
    : seen
      ? "/login"
      : "/onboarding";

  return <SplashScreen destination={destination} />;
}
