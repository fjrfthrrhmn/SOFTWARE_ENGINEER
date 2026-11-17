import { asc, eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { admin, dosen, mahasiswa, pengguna, programStudi } from "@/db/schema"
import type { User, UserListItem, UserWithProfile } from "./types"

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
      studentName: mahasiswa.nama,
      studentNim: mahasiswa.nim,
      studentAngkatan: mahasiswa.angkatan,
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
        nama: row.studentName ?? "Nama tidak tersedia",
        identitas: row.studentNim ?? "-",
        keterangan: row.studyProgram
          ? `${row.studyProgram} · ${row.studentAngkatan ?? "-"}`
          : "Program studi tidak tersedia",
      }
    }

    if (row.role === "dosen") {
      return {
        id: row.id,
        email: row.email,
        role: row.role,
        status: row.status,
        nama: row.lecturerName ?? "Nama tidak tersedia",
        identitas: row.lecturerCode ?? "-",
        keterangan: "Dosen",
      }
    }

    return {
      id: row.id,
      email: row.email,
      role: row.role,
      status: row.status,
      nama: row.adminName ?? "Nama tidak tersedia",
      identitas: "Admin",
      keterangan: "Administrator",
    }
  })
}
