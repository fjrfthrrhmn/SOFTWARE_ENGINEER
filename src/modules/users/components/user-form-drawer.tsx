"use client"

import { useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { createUser, updateUser } from "@/modules/users/actions"
import {
  createUserSchema,
  updateUserSchema,
} from "@/modules/users/schema"
import type {
  StudyProgramOption,
  UserListItem,
  UserMutationError,
  UserMutationField,
  UserRoleInput,
} from "@/modules/users/types"
import { Button } from "@/shared/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { toast } from "@/shared/components/ui/toast"
import { errorMessage } from "@/lib/utils"

type FormValues = {
  email?: string
  password?: string
  newPassword?: string
  nama: string
  identitas: string
  role: UserRoleInput
  angkatan: number | null
  programStudiId: number | null
}

type UserFormDrawerProps = {
  mode: "create" | "update"
  user: UserListItem | null
  studyPrograms: StudyProgramOption[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const emptyValues: FormValues = {
  email: "",
  password: "",
  newPassword: "",
  nama: "",
  identitas: "",
  role: "mahasiswa",
  angkatan: null,
  programStudiId: null,
}

export const mutationCopy: Record<UserMutationError, string> = {
  invalid_input: "Periksa kembali data yang diisi.",
  email_taken: "Email sudah digunakan pengguna lain.",
  identity_taken: "NIM atau kode dosen sudah digunakan.",
  user_not_found: "Pengguna tidak ditemukan.",
  cannot_deactivate_self: "Akun sendiri tidak dapat dinonaktifkan.",
  admin_not_editable: "Akun admin tidak dapat diubah.",
  server_error: "Gagal menyimpan data. Coba lagi.",
}

function valuesFromUser(user: UserListItem | null): FormValues {
  if (!user) return { ...emptyValues }

  return {
    ...emptyValues,
    email: user.email,
    nama: user.nama,
    identitas: user.identitas,
    role: user.role === "dosen" ? "dosen" : "mahasiswa",
    angkatan: user.angkatan,
    programStudiId: user.idProgramStudi,
  }
}

function firstFieldError(
  fieldErrors?: Partial<Record<UserMutationField, string[]>>,
) {
  if (!fieldErrors) return null

  for (const messages of Object.values(fieldErrors)) {
    if (messages?.[0]) return messages[0]
  }

  return null
}

export function UserFormDrawer({
  mode,
  user,
  studyPrograms,
  open,
  onOpenChange,
}: UserFormDrawerProps) {
  const schema = mode === "create" ? createUserSchema : updateUserSchema
  const form = useForm({
    defaultValues: valuesFromUser(user),
    validators: {
      onSubmit: schema as never,
    },
    onSubmit: async ({ value }) => {
      const result =
        mode === "create"
          ? await createUser({
              email: value.email ?? "",
              password: value.password ?? "",
              nama: value.nama,
              identitas: value.identitas,
              role: value.role,
              angkatan: value.angkatan,
              programStudiId: value.programStudiId,
            })
          : await updateUser(user?.id ?? 0, {
              nama: value.nama,
              identitas: value.identitas,
              role: value.role,
              angkatan: value.angkatan,
              programStudiId: value.programStudiId,
              newPassword: value.newPassword ?? "",
            })

      if (!result.ok) {
        toast.add({
          type: "error",
          title: "Gagal Menyimpan",
          description:
            firstFieldError(result.fieldErrors) ?? mutationCopy[result.error],
        })
        return
      }

      toast.add({
        type: "success",
        title: mode === "create" ? "Pengguna Ditambahkan" : "Perubahan Disimpan",
        description:
          mode === "create"
            ? "Akun baru berhasil dibuat."
            : "Data pengguna berhasil diperbarui.",
      })

      form.reset({ ...emptyValues })
      onOpenChange(false)
    },
  })

  useEffect(() => {
    if (!open) return
    form.reset(valuesFromUser(user))
  }, [open, user, form])

  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto max-w-[640px] rounded-t-3xl">
        <DrawerHeader className="p-5 pb-3 text-left">
          <DrawerTitle>
            {mode === "create" ? "Tambah Pengguna Baru" : "Ubah Pengguna"}
          </DrawerTitle>
          <DrawerDescription>
            {mode === "create"
              ? "Buat akun mahasiswa atau dosen baru."
              : "Perbarui data akun tanpa mengubah email."}
          </DrawerDescription>
        </DrawerHeader>

        <form
          noValidate
          id={mode === "create" ? "create-user-form" : "update-user-form"}
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div className="space-y-4 overflow-y-auto px-5 py-2">
            {mode === "update" ? (
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" value={user?.email ?? ""} readOnly disabled />
              </div>
            ) : (
              <form.Field name="email">
                {(field) => {
                  const message = errorMessage(field.state.meta.errors)
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Email</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={invalid}
                        aria-describedby={
                          invalid ? `${field.name}-error` : undefined
                        }
                        placeholder="nama@email.ac.id"
                      />
                      {invalid && message ? (
                        <p id={`${field.name}-error`} className="text-xs text-destructive">
                          {message}
                        </p>
                      ) : null}
                    </div>
                  )
                }}
              </form.Field>
            )}

            <form.Field name="nama">
              {(field) => {
                const message = errorMessage(field.state.meta.errors)
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Nama Lengkap</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={invalid}
                      aria-describedby={
                        invalid ? `${field.name}-error` : undefined
                      }
                      placeholder="Nama sesuai identitas"
                    />
                    {invalid && message ? (
                      <p id={`${field.name}-error`} className="text-xs text-destructive">
                        {message}
                      </p>
                    ) : null}
                  </div>
                )
              }}
            </form.Field>

            <form.Field name="identitas">
              {(field) => {
                const message = errorMessage(field.state.meta.errors)
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>NIM / Kode Dosen</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={invalid}
                      aria-describedby={
                        invalid ? `${field.name}-error` : undefined
                      }
                      placeholder="Contoh: 20240001 atau DSN001"
                    />
                    {invalid && message ? (
                      <p id={`${field.name}-error`} className="text-xs text-destructive">
                        {message}
                      </p>
                    ) : null}
                  </div>
                )
              }}
            </form.Field>

            <form.Field name="role">
              {(field) => {
                const message = errorMessage(field.state.meta.errors)
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Peran</Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as UserRoleInput)
                      }
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-label="Peran"
                        aria-invalid={invalid}
                        onBlur={field.handleBlur}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                        <SelectItem value="dosen">Dosen</SelectItem>
                      </SelectContent>
                    </Select>
                    {invalid && message ? (
                      <p id={`${field.name}-error`} className="text-xs text-destructive">
                        {message}
                      </p>
                    ) : null}
                  </div>
                )
              }}
            </form.Field>

            <form.Subscribe selector={(state) => state.values.role}>
              {(role) =>
                role === "mahasiswa" ? (
                  <>
                    <form.Field name="angkatan">
                      {(field) => {
                        const message = errorMessage(field.state.meta.errors)
                        const invalid =
                          field.state.meta.isTouched && !field.state.meta.isValid

                        return (
                          <div className="space-y-2">
                            <Label htmlFor={field.name}>Tahun Angkatan</Label>
                            <Input
                              id={field.name}
                              name={field.name}
                              type="number"
                              min={1900}
                              max={2100}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(event) => {
                                const next = Number(event.target.value)
                                field.handleChange(
                                  event.target.value === "" ||
                                    Number.isNaN(next)
                                    ? null
                                    : next,
                                )
                              }}
                              aria-invalid={invalid}
                              aria-describedby={
                                invalid ? `${field.name}-error` : undefined
                              }
                              placeholder="2024"
                            />
                            {invalid && message ? (
                              <p id={`${field.name}-error`} className="text-xs text-destructive">
                                {message}
                              </p>
                            ) : null}
                          </div>
                        )
                      }}
                    </form.Field>

                    <form.Field name="programStudiId">
                      {(field) => {
                        const message = errorMessage(field.state.meta.errors)
                        const invalid =
                          field.state.meta.isTouched && !field.state.meta.isValid

                        return (
                          <div className="space-y-2">
                            <Label htmlFor={field.name}>Program Studi</Label>
                            <Select
                              value={
                                field.state.value === null
                                  ? ""
                                  : String(field.state.value)
                              }
                              onValueChange={(value) =>
                                field.handleChange(Number(value))
                              }
                            >
                              <SelectTrigger
                                id={field.name}
                                className="w-full"
                                aria-label="Program Studi"
                                aria-invalid={invalid}
                                onBlur={field.handleBlur}
                              >
                                <SelectValue placeholder="Pilih program studi" />
                              </SelectTrigger>
                              <SelectContent>
                                {studyPrograms.map((program) => (
                                  <SelectItem
                                    key={program.id}
                                    value={String(program.id)}
                                  >
                                    {program.nama}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {invalid && message ? (
                              <p id={`${field.name}-error`} className="text-xs text-destructive">
                                {message}
                              </p>
                            ) : null}
                          </div>
                        )
                      }}
                    </form.Field>
                  </>
                ) : null
              }
            </form.Subscribe>

            {mode === "create" ? (
              <form.Field name="password">
                {(field) => {
                  const message = errorMessage(field.state.meta.errors)
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Kata Sandi</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        autoComplete="new-password"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={invalid}
                        aria-describedby={
                          invalid ? `${field.name}-error` : undefined
                        }
                        placeholder="Minimal 8 karakter"
                      />
                      {invalid && message ? (
                        <p id={`${field.name}-error`} className="text-xs text-destructive">
                          {message}
                        </p>
                      ) : null}
                    </div>
                  )
                }}
              </form.Field>
            ) : (
              <form.Field name="newPassword">
                {(field) => {
                  const message = errorMessage(field.state.meta.errors)
                  const invalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>
                        Kata Sandi Baru (opsional)
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        autoComplete="new-password"
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        aria-invalid={invalid}
                        aria-describedby={
                          invalid ? `${field.name}-error` : undefined
                        }
                        placeholder="Kosongkan bila tidak diubah"
                      />
                      {invalid && message ? (
                        <p id={`${field.name}-error`} className="text-xs text-destructive">
                          {message}
                        </p>
                      ) : null}
                    </div>
                  )
                }}
              </form.Field>
            )}
          </div>

          <DrawerFooter className="p-5 pt-4">
            <DrawerClose
              render={
                <Button type="button" variant="outline">
                  Batal
                </Button>
              }
            />
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Menyimpan..."
                    : mode === "create"
                      ? "Simpan Pengguna"
                      : "Simpan Perubahan"}
                </Button>
              )}
            </form.Subscribe>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
