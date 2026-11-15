"use server"

import { redirect } from "next/navigation"
import { getSession, roleHome } from "@/lib/auth"
import { setOnboardingSeen } from "./seen"

export async function completeOnboarding() {
  await setOnboardingSeen()

  const session = await getSession()

  redirect(session ? roleHome(session.role) : "/login")
}
