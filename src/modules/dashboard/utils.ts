import { format, getHours, isWeekend } from "date-fns"
import { id } from "date-fns/locale"
import type { UserRole } from "@/modules/users/types"

const roleLabel: Record<UserRole, string> = {
  mahasiswa: "Mahasiswa",
  dosen: "Dosen",
  admin: "Admin",
}

function jakartaDate(date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
}

export function formatDashboardDate(date = new Date()) {
  return format(jakartaDate(date), "EEEE, d MMMM yyyy", { locale: id })
}

export function greetingForRole(role: UserRole, date = new Date()) {
  const hour = getHours(jakartaDate(date))
  const salutation =
    hour < 11
      ? "Selamat pagi"
      : hour < 15
        ? "Selamat siang"
        : hour < 18
          ? "Selamat sore"
          : "Selamat malam"
  return `${salutation}, ${roleLabel[role]}`
}

export function descriptionForRole(role: UserRole, date = new Date()) {
  const weekend = isWeekend(jakartaDate(date))
  if (role === "mahasiswa") {
    return weekend ? "Tidak ada kelas hari ini." : "Siap untuk kelas hari ini?"
  }
  if (role === "dosen") {
    return weekend
      ? "Tidak ada jadwal mengajar hari ini."
      : "Siap mengajar hari ini?"
  }
  return weekend
    ? "Pantau aktivitas akademik kampus."
    : "Pantau aktivitas akademik hari ini."
}

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}
