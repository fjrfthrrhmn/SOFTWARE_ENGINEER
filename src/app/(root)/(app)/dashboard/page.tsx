import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { AdminDashboard } from "@/modules/dashboard/admin/admin-dashboard";
import { LecturerDashboard } from "@/modules/dashboard/lecturer/lecturer-dashboard";
import { StudentDashboard } from "@/modules/dashboard/student/student-dashboard";
import { getUserProfile } from "@/modules/users/repository";

export const metadata: Metadata = {
  title: "StudentConnect | Dashboard",
};

export const instant = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function DashboardPage() {
  const session = await requireRole(["mahasiswa", "dosen", "admin"]);
  const user = await getUserProfile(session.userId);

  await delay(1000);

  if (!user) redirect("/login");
  if (user.role === "admin") return <AdminDashboard user={user} />;
  if (user.role === "dosen") return <LecturerDashboard user={user} />;
  return <StudentDashboard user={user} />;
}
