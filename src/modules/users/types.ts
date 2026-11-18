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
  "id" | "email" | "role" | "status" | "createdAt"
> & {
  nama: string
  identitas: string
  keterangan: string
  angkatan: number | null
  idProgramStudi: number | null
}

export type UserFilters = {
  q: string
  role: UserRole | "all"
  status: UserStatus | "all"
  sort: "name-asc" | "name-desc"
}

export type UserSort = UserFilters["sort"]

export type StudyProgramOption = Pick<StudyProgram, "id" | "nama">

export type UserRoleInput = Extract<UserRole, "mahasiswa" | "dosen">

export type CreateUserInput = {
  email: string
  password: string
  nama: string
  identitas: string
  role: UserRoleInput
  angkatan: number | null
  programStudiId: number | null
}

export type UpdateUserInput = {
  nama: string
  identitas: string
  role: UserRoleInput
  angkatan: number | null
  programStudiId: number | null
  newPassword: string
}

export type UserMutationField =
  | "userId"
  | "email"
  | "password"
  | "newPassword"
  | "nama"
  | "identitas"
  | "role"
  | "angkatan"
  | "programStudiId"

export type UserMutationError =
  | "invalid_input"
  | "email_taken"
  | "identity_taken"
  | "user_not_found"
  | "cannot_deactivate_self"
  | "admin_not_editable"
  | "server_error"

export type UserMutationResult =
  | { ok: true }
  | {
      ok: false
      error: UserMutationError
      fieldErrors?: Partial<Record<UserMutationField, string[]>>
    }
