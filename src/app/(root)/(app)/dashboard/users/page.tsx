import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requireRole } from "@/lib/auth"
import { DashboardShell } from "@/modules/dashboard/components/dashboard-shell"
import { CreateUserDrawer } from "@/modules/users/components/create-user-drawer"
import { UsersPage } from "@/modules/users/components/users-page"
import {
  getUserProfile,
  listStudyPrograms,
  listUsers,
} from "@/modules/users/repository"

export const metadata: Metadata = {
  title: "StudentConnect | Kelola Pengguna",
}

export default async function PenggunaPage() {
  const session = await requireRole(["admin"])
  const [user, users, studyPrograms] = await Promise.all([
    getUserProfile(session.userId),
    listUsers(),
    listStudyPrograms(),
  ])

  if (!user) redirect("/login")

  return (
    <DashboardShell user={user}>
      <div className="space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Kelola Pengguna
          </h1>
          <p className="text-sm text-muted-foreground">
            Lihat dan saring seluruh akun yang terdaftar di StudentConnect.
          </p>

          <CreateUserDrawer studyPrograms={studyPrograms} />
        </div>
        <UsersPage data={users} studyPrograms={studyPrograms} />
      </div>
    </DashboardShell>
  )
}
