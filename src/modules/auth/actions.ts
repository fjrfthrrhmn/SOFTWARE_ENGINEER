"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession, roleHome } from "@/lib/auth"
import { hasSeenOnboarding } from "@/modules/onboarding/seen"
import { loginSchema } from "./schema"
import { login as authenticate } from "./service"
import type { LoginInput, LoginResult } from "./types"

export async function login(input: LoginInput): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      error: "invalid_input",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await authenticate(parsed.data)

  if (!result.ok) return result

  await createSession({ userId: result.userId, role: result.role })

  redirect((await hasSeenOnboarding()) ? roleHome(result.role) : "/onboarding")
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}
