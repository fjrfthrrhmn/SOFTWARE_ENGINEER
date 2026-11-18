import { asc, eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { admin, dosen, mahasiswa, pengguna, programStudi } from "@/db/schema"
import type {
  StudyProgramOption,
  User,
  UserListItem,
  UserRoleInput,
  UserStatus,
  UserWithProfile,
} from "./types"

export async function findAuthUserByEmail(email: string): Promise<User | null> {
  const value = email.trim().toLowerCase()

  const [user] = await db
    .select()
    .from(pengguna)
    .where(eq(sql`lower(${pengguna.email})`, value))
    .limit(1)

  return user ?? null
}

export async function getUserProfile(
  userId: number,
): Promise<UserWithProfile | null> {
  const [row] = await db
    .select({
      user: {
        id: pengguna.id,
        email: pengguna.email,
        role: pengguna.role,
        status: pengguna.status,
        createdAt: pengguna.createdAt,
        updatedAt: pengguna.updatedAt,
      },
      student: mahasiswa,
      studyProgram: programStudi,
      lecturer: dosen,
      adminProfile: admin,
    })
    .from(pengguna)
    .leftJoin(mahasiswa, eq(mahasiswa.idPengguna, pengguna.id))
    .leftJoin(programStudi, eq(programStudi.id, mahasiswa.idProgramStudi))
    .leftJoin(dosen, eq(dosen.idPengguna, pengguna.id))
    .leftJoin(admin, eq(admin.idPengguna, pengguna.id))
    .where(eq(pengguna.id, userId))
    .limit(1)

  if (!row) return null

  if (row.user.role === "mahasiswa") {
    return {
      ...row.user,
      role: "mahasiswa",
      profile: row.student,
      studyProgram: row.studyProgram,
    }
  }

  if (row.user.role === "dosen") {
    return {
      ...row.user,
      role: "dosen",
      profile: row.lecturer,
      studyProgram: null,
    }
  }

  return {
    ...row.user,
    role: "admin",
    profile: row.adminProfile,
    studyProgram: null,
  }
}

export async function listUsers(): Promise<UserListItem[]> {
  const rows = await db
    .select({
      id: pengguna.id,
      email: pengguna.email,
      role: pengguna.role,
      status: pengguna.status,
      createdAt: pengguna.createdAt,
      studentName: mahasiswa.nama,
      studentNim: mahasiswa.nim,
      studentAngkatan: mahasiswa.angkatan,
      studentIdProgramStudi: mahasiswa.idProgramStudi,
      studyProgram: programStudi.nama,
      lecturerName: dosen.nama,
      lecturerCode: dosen.kodeDosen,
      adminName: admin.nama,
    })
    .from(pengguna)
    .leftJoin(mahasiswa, eq(mahasiswa.idPengguna, pengguna.id))
    .leftJoin(programStudi, eq(programStudi.id, mahasiswa.idProgramStudi))
    .leftJoin(dosen, eq(dosen.idPengguna, pengguna.id))
    .leftJoin(admin, eq(admin.idPengguna, pengguna.id))
    .orderBy(asc(pengguna.id))

  return rows.map((row) => {
    if (row.role === "mahasiswa") {
      return {
        id: row.id,
        email: row.email,
        role: row.role,
        status: row.status,
        createdAt: row.createdAt,
        nama: row.studentName ?? "Nama tidak tersedia",
        identitas: row.studentNim ?? "-",
        keterangan: row.studyProgram
          ? `${row.studyProgram} · ${row.studentAngkatan ?? "-"}`
          : "Program studi tidak tersedia",
        angkatan: row.studentAngkatan,
        idProgramStudi: row.studentIdProgramStudi,
      }
    }

    if (row.role === "dosen") {
      return {
        id: row.id,
        email: row.email,
        role: row.role,
        status: row.status,
        createdAt: row.createdAt,
        nama: row.lecturerName ?? "Nama tidak tersedia",
        identitas: row.lecturerCode ?? "-",
        keterangan: "Dosen",
        angkatan: null,
        idProgramStudi: null,
      }
    }

    return {
      id: row.id,
      email: row.email,
      role: row.role,
      status: row.status,
      createdAt: row.createdAt,
      nama: row.adminName ?? "Nama tidak tersedia",
      identitas: "Admin",
      keterangan: "Administrator",
      angkatan: null,
      idProgramStudi: null,
    }
  })
}

type CreateUserRecord =
  | {
      email: string
      passwordHash: string
      nama: string
      role: "mahasiswa"
      identitas: string
      angkatan: number
      programStudiId: number
    }
  | {
      email: string
      passwordHash: string
      nama: string
      role: "dosen"
      identitas: string
    }

type UpdateUserRecord =
  | {
      id: number
      passwordHash?: string
      nama: string
      role: "mahasiswa"
      identitas: string
      angkatan: number
      programStudiId: number
    }
  | {
      id: number
      passwordHash?: string
      nama: string
      role: "dosen"
      identitas: string
    }

export async function listStudyPrograms(): Promise<StudyProgramOption[]> {
  return db
    .select({ id: programStudi.id, nama: programStudi.nama })
    .from(programStudi)
    .orderBy(asc(programStudi.nama))
}

export async function findUserById(id: number) {
  const [row] = await db
    .select({
      id: pengguna.id,
      email: pengguna.email,
      role: pengguna.role,
      status: pengguna.status,
    })
    .from(pengguna)
    .where(eq(pengguna.id, id))
    .limit(1)

  return row ?? null
}

export async function findIdentityOwner(
  identity: string,
  role: UserRoleInput,
): Promise<number | null> {
  const value = identity.trim()

  if (role === "mahasiswa") {
    const [row] = await db
      .select({ userId: mahasiswa.idPengguna })
      .from(mahasiswa)
      .where(eq(mahasiswa.nim, value))
      .limit(1)

    return row?.userId ?? null
  }

  const [row] = await db
    .select({ userId: dosen.idPengguna })
    .from(dosen)
    .where(eq(dosen.kodeDosen, value))
    .limit(1)

  return row?.userId ?? null
}

export async function findStudyProgramById(id: number): Promise<boolean> {
  const [row] = await db
    .select({ id: programStudi.id })
    .from(programStudi)
    .where(eq(programStudi.id, id))
    .limit(1)

  return Boolean(row)
}

export async function insertUserWithProfile(
  record: CreateUserRecord,
): Promise<number> {
  return db.transaction(async (tx) => {
    const [user] = await tx
      .insert(pengguna)
      .values({
        email: record.email,
        passwordHash: record.passwordHash,
        role: record.role,
        status: "aktif",
      })
      .returning({ id: pengguna.id })

    if (record.role === "mahasiswa") {
      await tx.insert(mahasiswa).values({
        nim: record.identitas,
        nama: record.nama,
        angkatan: record.angkatan,
        idPengguna: user.id,
        idProgramStudi: record.programStudiId,
      })
    } else {
      await tx.insert(dosen).values({
        kodeDosen: record.identitas,
        nama: record.nama,
        idPengguna: user.id,
      })
    }

    return user.id
  })
}

export async function updateUserWithProfile(record: UpdateUserRecord): Promise<void> {
  await db.transaction(async (tx) => {
    const values: {
      role: UserRoleInput
      updatedAt: Date
      passwordHash?: string
    } = { role: record.role, updatedAt: new Date() }

    if (record.passwordHash) values.passwordHash = record.passwordHash

    await tx.update(pengguna).set(values).where(eq(pengguna.id, record.id))

    const [student] = await tx
      .select({ id: mahasiswa.id })
      .from(mahasiswa)
      .where(eq(mahasiswa.idPengguna, record.id))
      .limit(1)

    const [lecturer] = await tx
      .select({ id: dosen.id })
      .from(dosen)
      .where(eq(dosen.idPengguna, record.id))
      .limit(1)

    if (record.role === "mahasiswa") {
      const profile = {
        nim: record.identitas,
        nama: record.nama,
        angkatan: record.angkatan,
        idProgramStudi: record.programStudiId,
        updatedAt: new Date(),
      }

      if (student) {
        await tx
          .update(mahasiswa)
          .set(profile)
          .where(eq(mahasiswa.id, student.id))
      } else {
        await tx.insert(mahasiswa).values({
          ...profile,
          idPengguna: record.id,
        })
      }

      if (lecturer) {
        await tx.delete(dosen).where(eq(dosen.id, lecturer.id))
      }
    } else {
      const profile = {
        kodeDosen: record.identitas,
        nama: record.nama,
        updatedAt: new Date(),
      }

      if (lecturer) {
        await tx.update(dosen).set(profile).where(eq(dosen.id, lecturer.id))
      } else {
        await tx.insert(dosen).values({ ...profile, idPengguna: record.id })
      }

      if (student) {
        await tx.delete(mahasiswa).where(eq(mahasiswa.id, student.id))
      }
    }
  })
}

export async function setUserStatus(
  id: number,
  status: UserStatus,
): Promise<void> {
  await db
    .update(pengguna)
    .set({ status, updatedAt: new Date() })
    .where(eq(pengguna.id, id))
}
