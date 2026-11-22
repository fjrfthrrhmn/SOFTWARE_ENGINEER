"use server"

import { revalidatePath } from "next/cache"
import { requireRole } from "@/lib/auth"
import {
  createUserSchema,
  deactivateUserSchema,
  updateUserSchema,
} from "./schema"
import {
  createUserService,
  deactivateUserService,
  updateUserService,
} from "./service"
import type {
  CreateUserInput,
  UpdateUserInput,
  UserMutationResult,
} from "./types"

const USERS_PATH = "/dashboard/users"

export async function createUser(input: CreateUserInput): Promise<UserMutationResult> {
  await requireRole(["admin"])

  const parsed = createUserSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      error: "invalid_input",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await createUserService(parsed.data)
  if (result.ok) revalidatePath(USERS_PATH)

  return result
}

export async function updateUser(
  userId: number,
  input: UpdateUserInput,
): Promise<UserMutationResult> {
  await requireRole(["admin"])

  const parsed = updateUserSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      error: "invalid_input",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await updateUserService(userId, parsed.data)
  if (result.ok) revalidatePath(USERS_PATH)

  return result
}

export async function deactivateUser(input: {
  userId: number
}): Promise<UserMutationResult> {
  const session = await requireRole(["admin"])

  const parsed = deactivateUserSchema.safeParse(input)

  if (!parsed.success) {
    return {
      ok: false,
      error: "invalid_input",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const result = await deactivateUserService(
    session.userId,
    parsed.data.userId,
  )

  if (result.ok) revalidatePath(USERS_PATH)

  return result
}
