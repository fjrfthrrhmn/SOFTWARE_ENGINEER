"use client"

import { useState } from "react"
import { IconFilter } from "@tabler/icons-react"
import type { UserFilters } from "@/modules/users/types"
import { Button } from "@/shared/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

type UsersFilterDrawerProps = {
  filters: UserFilters
  onFiltersChange: (filters: Partial<UserFilters>) => void
  onReset: () => void
}

export function UsersFilterDrawer({
  filters,
  onFiltersChange,
  onReset,
}: UsersFilterDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            aria-label="Atur Filter"
          >
            <IconFilter aria-hidden />
          </Button>
        }
      />

      <DrawerContent className="gap-0 rounded-t-3xl max-w-[640px] mx-auto">
        <DrawerHeader className="p-5 pb-3 text-left">
          <DrawerTitle>Filter Pengguna</DrawerTitle>
          <DrawerDescription>
            Pilih peran dan status untuk menyaring daftar pengguna.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 px-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="filter-role">Peran</Label>
            <Select
              value={filters.role}
              onValueChange={(value) =>
                onFiltersChange({ role: value as UserFilters["role"] })
              }
            >
              <SelectTrigger id="filter-role" className="w-full" aria-label="Peran">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua peran</SelectItem>
                <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                <SelectItem value="dosen">Dosen</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-status">Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                onFiltersChange({ status: value as UserFilters["status"] })
              }
            >
              <SelectTrigger
                id="filter-status"
                className="w-full"
                aria-label="Status"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua status</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="nonaktif">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DrawerFooter className="p-5 pt-4">
          <Button type="button" variant="outline" onClick={onReset}>
            Reset filter
          </Button>
          <DrawerClose
            render={
              <Button type="button" className="w-full">
                Selesai
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
