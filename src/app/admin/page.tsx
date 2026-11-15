import type { Metadata } from "next"
import { requireRole } from "@/lib/auth"
import { LogoutButton } from "@/modules/auth/components/logout-button"
import { ScreenShell } from "@/shared/components/screen-shell"

export const metadata: Metadata = {
  title: "StudentConnect | Admin",
}

export const instant = false

export default async function AdminPage() {
  await requireRole(["admin"])

  return (
    <ScreenShell>
      <main className="relative flex flex-1 flex-col justify-center gap-8 px-6 py-10">
        <div>
          <p className="text-xs font-bold tracking-wide text-primary uppercase">
            StudentConnect
          </p>
          <h1 className="mt-1 font-heading text-2xl font-semibold tracking-tight">
            Admin
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Area pengelolaan akademik.
          </p>
        </div>

        <LogoutButton />
      </main>
    </ScreenShell>
  )
}
