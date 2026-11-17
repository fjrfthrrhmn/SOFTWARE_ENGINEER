import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requireRole } from "@/lib/auth"
import { DashboardShell } from "@/modules/dashboard/components/dashboard-shell"
import { UsersPage } from "@/modules/users/components/users-page"
import { getUserProfile, listUsers } from "@/modules/users/repository"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "reicon-react"

export const metadata: Metadata = {
  title: "StudentConnect | Kelola Pengguna",
}

export default async function PenggunaPage() {
  const session = await requireRole(["admin"])
  const [user, users] = await Promise.all([getUserProfile(session.userId), listUsers()])

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

          <Button className="w-full mt-2">
            <Plus size={20} />
            Tambah Pengguna Baru
          </Button>
        </div>
        <UsersPage data={users} />
      </div>
    </DashboardShell>
  )
}
