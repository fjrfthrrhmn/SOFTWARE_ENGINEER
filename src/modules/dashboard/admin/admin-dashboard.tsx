import type { UserWithProfile } from "@/modules/users/types"
import { DashboardShell } from "../components/dashboard-shell"
import { AdminOverview } from "./components/overview"
import { AdminQuickActions } from "./components/quick-actions"

export function AdminDashboard({
  user,
}: {
  user: UserWithProfile & { role: "admin" }
}) {
  return (
    <DashboardShell user={user}>
      <AdminOverview />
      <AdminQuickActions />
    </DashboardShell>
  )
}
