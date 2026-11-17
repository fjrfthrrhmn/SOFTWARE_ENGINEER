"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import type { UserWithProfile } from "@/modules/users/types"
import { ScreenShell } from "@/shared/components/screen-shell"
import { BottomNavBar } from "./bottom-nav-bar"
import { DashboardGreeting } from "./dashboard-greeting"
import { DashboardHeader } from "./dashboard-header"
import { Separator } from "@/shared/components/ui/separator"

export function DashboardShell({
  user,
  children,
}: {
  user: UserWithProfile
  children: ReactNode
}) {
  const pathname = usePathname()
  const isRootDashboard = pathname === "/dashboard"

  return (
    <ScreenShell className="bg-background">
      <DashboardHeader user={user} />

      <main className="relative flex flex-1 flex-col gap-7 px-5 pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6">
        {isRootDashboard && (
          <>
            <DashboardGreeting role={user.role} />
            <Separator />
          </>
        )}

        {children}
      </main>

      <BottomNavBar role={user.role} />
    </ScreenShell>
  )
}
