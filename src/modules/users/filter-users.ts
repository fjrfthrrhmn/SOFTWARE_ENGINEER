import type { UserFilters, UserListItem } from "./types"

const MAX_QUERY_LENGTH = 100

export function filterUsers(
  data: UserListItem[],
  filters: UserFilters,
): UserListItem[] {
  const query = filters.q.trim().slice(0, MAX_QUERY_LENGTH).toLocaleLowerCase("id")

  const result = data.filter((user) => {
    if (filters.role !== "all" && user.role !== filters.role) return false
    if (filters.status !== "all" && user.status !== filters.status) return false
    if (!query) return true

    return [
      user.nama,
      user.identitas,
      user.email,
      user.keterangan,
      user.role,
      user.status,
    ].some((value) => value.toLocaleLowerCase("id").includes(query))
  })

  return result.sort((a, b) => {
    const comparison = a.nama.localeCompare(b.nama, "id", {
      sensitivity: "base",
    })

    return filters.sort === "name-desc" ? -comparison : comparison
  })
}
