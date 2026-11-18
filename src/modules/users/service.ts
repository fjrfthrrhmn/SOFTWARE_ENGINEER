import { hash } from "bcryptjs"
import {
  findAuthUserByEmail,
  findIdentityOwner,
  findStudyProgramById,
  findUserById,
  insertUserWithProfile,
  setUserStatus,
  updateUserWithProfile,
} from "./repository"
import type {
  CreateUserInput,
  UpdateUserInput,
  UserMutationResult,
} from "./types"

function databaseErrorResult(error: unknown): UserMutationResult {
  const detail = error as { code?: unknown; constraint?: unknown; message?: unknown }

  if (detail.code === "23505") {
    const source = `${String(detail.constraint ?? "")} ${String(detail.message ?? "")}`

    if (source.includes("pengguna_email_unique")) {
      return {
        ok: false,
        error: "email_taken",
        fieldErrors: { email: ["Email sudah digunakan."] },
      }
    }

    if (
      source.includes("mahasiswa_nim_unique") ||
      source.includes("dosen_kode_dosen_unique")
    ) {
      return {
        ok: false,
        error: "identity_taken",
        fieldErrors: { identitas: ["NIM atau kode dosen sudah digunakan."] },
      }
    }
  }

  return { ok: false, error: "server_error" }
}

export async function createUserService(
  input: CreateUserInput,
): Promise<UserMutationResult> {
  try {
    const emailTaken = await findAuthUserByEmail(input.email)
    if (emailTaken) return { ok: false, error: "email_taken" }

    const identityOwner = await findIdentityOwner(input.identitas, input.role)
    if (identityOwner !== null) return { ok: false, error: "identity_taken" }

    const passwordHash = await hash(input.password, 10)

    let record: Parameters<typeof insertUserWithProfile>[0]

    if (input.role === "mahasiswa") {
      if (input.angkatan === null || input.programStudiId === null) {
        return { ok: false, error: "invalid_input" }
      }

      const studyProgramExists = await findStudyProgramById(
        input.programStudiId,
      )

      if (!studyProgramExists) return { ok: false, error: "invalid_input" }

      record = {
        email: input.email,
        passwordHash,
        nama: input.nama,
        role: "mahasiswa",
        identitas: input.identitas,
        angkatan: input.angkatan,
        programStudiId: input.programStudiId,
      }
    } else {
      record = {
        email: input.email,
        passwordHash,
        nama: input.nama,
        role: "dosen",
        identitas: input.identitas,
      }
    }

    await insertUserWithProfile(record)

    return { ok: true }
  } catch (error) {
    return databaseErrorResult(error)
  }
}

export async function updateUserService(
  userId: number,
  input: UpdateUserInput,
): Promise<UserMutationResult> {
  try {
    const user = await findUserById(userId)

    if (!user) return { ok: false, error: "user_not_found" }
    if (user.role === "admin") return { ok: false, error: "admin_not_editable" }

    const identityOwner = await findIdentityOwner(input.identitas, input.role)

    if (identityOwner !== null && identityOwner !== userId) {
      return { ok: false, error: "identity_taken" }
    }

    const passwordHash = input.newPassword
      ? await hash(input.newPassword, 10)
      : undefined

    let record: Parameters<typeof updateUserWithProfile>[0]

    if (input.role === "mahasiswa") {
      if (input.angkatan === null || input.programStudiId === null) {
        return { ok: false, error: "invalid_input" }
      }

      const studyProgramExists = await findStudyProgramById(
        input.programStudiId,
      )

      if (!studyProgramExists) return { ok: false, error: "invalid_input" }

      record = {
        id: userId,
        passwordHash,
        nama: input.nama,
        role: "mahasiswa",
        identitas: input.identitas,
        angkatan: input.angkatan,
        programStudiId: input.programStudiId,
      }
    } else {
      record = {
        id: userId,
        passwordHash,
        nama: input.nama,
        role: "dosen",
        identitas: input.identitas,
      }
    }

    await updateUserWithProfile(record)

    return { ok: true }
  } catch (error) {
    return databaseErrorResult(error)
  }
}

export async function deactivateUserService(
  actorUserId: number,
  targetUserId: number,
): Promise<UserMutationResult> {
  try {
    const target = await findUserById(targetUserId)

    if (!target) return { ok: false, error: "user_not_found" }
    if (target.role === "admin") return { ok: false, error: "admin_not_editable" }
    if (targetUserId === actorUserId) {
      return { ok: false, error: "cannot_deactivate_self" }
    }

    await setUserStatus(targetUserId, "nonaktif")
    return { ok: true }
  } catch (error) {
    return databaseErrorResult(error)
  }
}
