import type {
  admin,
  dosen,
  mahasiswa,
  pengguna,
  programStudi,
} from "@/db/schema"

export type User = typeof pengguna.$inferSelect
export type UserRole = User["role"]
export type UserStatus = User["status"]

export type Student = typeof mahasiswa.$inferSelect
export type StudyProgram = typeof programStudi.$inferSelect
export type Lecturer = typeof dosen.$inferSelect
export type Admin = typeof admin.$inferSelect

export type PublicUser = Omit<User, "passwordHash">

export type UserWithProfile =
  | (PublicUser & {
      role: "mahasiswa"
      profile: Student | null
      studyProgram: StudyProgram | null
    })
  | (PublicUser & { role: "dosen"; profile: Lecturer | null; studyProgram: null })
  | (PublicUser & { role: "admin"; profile: Admin | null; studyProgram: null })

export type UserListItem = Pick<
  User,
  "id" | "email" | "role" | "status"
> & {
  nama: string
  identitas: string
  keterangan: string
}

export type UserFilters = {
  q: string
  role: UserRole | "all"
  status: UserStatus | "all"
}
