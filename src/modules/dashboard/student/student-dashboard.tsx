import type { UserWithProfile } from "@/modules/users/types"
import { ServerErrorPanel } from "@/shared/components/state-view"
import { DashboardShell } from "../components/dashboard-shell"

export function StudentDashboard({
  user,
}: {
  user: UserWithProfile & { role: "mahasiswa" }
}) {
  return (
    <DashboardShell user={user}>
      <section className="-mx-5 flex flex-1 sm:-mx-6">
        <ServerErrorPanel />
      </section>
    </DashboardShell>
  )
}
