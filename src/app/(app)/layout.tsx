import type { ReactNode } from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export const instant = false

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) redirect("/login")
  if (session.role === "admin") redirect("/admin")

  return children
}
