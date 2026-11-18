"use client"

import { useState } from "react"
import { Plus } from "reicon-react"
import type { StudyProgramOption } from "@/modules/users/types"
import { Button } from "@/shared/components/ui/button"
import { UserFormDrawer } from "./user-form-drawer"

export function CreateUserDrawer({
  studyPrograms,
}: {
  studyPrograms: StudyProgramOption[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        id="button-create-users"
        type="button"
        className="mt-2 w-full"
        onClick={() => setOpen(true)}
      >
        <Plus size={20} />
        Tambah Pengguna Baru
      </Button>

      <UserFormDrawer
        mode="create"
        user={null}
        studyPrograms={studyPrograms}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
