import type { UserWithProfile } from "@/modules/users/types"
import { ServerErrorPanel } from "@/shared/components/state-view"
import { DashboardShell } from "../components/dashboard-shell"

export function LecturerDashboard({
  user,
}: {
  user: UserWithProfile & { role: "dosen" }
}) {
  return (
    <DashboardShell user={user}>
      <section className="-mx-5 flex flex-1 sm:-mx-6">
        <ServerErrorPanel />
      </section>
    </DashboardShell>
  )
}
