"use client"

import { useState, useTransition } from "react"
import { deactivateUser } from "@/modules/users/actions"
import type { StudyProgramOption, UserListItem } from "@/modules/users/types"
import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { toast } from "@/shared/components/ui/toast"
import { mutationCopy, UserFormDrawer } from "./user-form-drawer"

export function UserActions({
  user,
  studyPrograms,
}: {
  user: UserListItem
  studyPrograms: StudyProgramOption[]
}) {
  const [updateOpen, setUpdateOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (user.role === "admin") return null

  function handleDeactivate() {
    startTransition(async () => {
      const result = await deactivateUser({ userId: user.id })

      if (!result.ok) {
        toast.add({
          type: "error",
          title: "Gagal Menonaktifkan",
          description: mutationCopy[result.error],
        })
        return
      }

      toast.add({
        type: "success",
        title: "Pengguna Dinonaktifkan",
        description: `${user.nama} tidak dapat login hingga diaktifkan kembali.`,
      })
      setDialogOpen(false)
    })
  }

  return (
    <>
      <div className="flex flex-wrap gap-1">
        <Button
          type="button"
          size="xs"
          variant="outline"
          onClick={() => setUpdateOpen(true)}
        >
          Ubah
        </Button>
        {user.status === "aktif" ? (
          <Button
            type="button"
            size="xs"
            variant="destructive"
            onClick={() => setDialogOpen(true)}
          >
            Nonaktifkan
          </Button>
        ) : null}
      </div>

      <UserFormDrawer
        mode="update"
        user={user}
        studyPrograms={studyPrograms}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nonaktifkan Pengguna?</DialogTitle>
            <DialogDescription>
              {user.nama} ({user.identitas}) tidak dapat login setelah
              dinonaktifkan. Data dan riwayatnya tetap tersimpan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isPending}>
                  Batal
                </Button>
              }
            />
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleDeactivate}
            >
              {isPending ? "Memproses..." : "Nonaktifkan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
