"use client"

import Image from "next/image"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useTable } from "@tanstack/react-table"
import type { UserListItem } from "@/modules/users/types"
import { Button } from "@/shared/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { userColumns } from "./columns"
import { userTableFeatures } from "./data-table-features"

const numberFormat = new Intl.NumberFormat("id-ID")

export function UsersDataTable({ data }: { data: UserListItem[] }) {
  const table = useTable(
    {
      features: userTableFeatures,
      columns: userColumns,
      data,
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
    },
    (state) => ({ pagination: state.pagination }),
  )

  const rows = table.getRowModel().rows
  const { pageIndex, pageSize } = table.state.pagination
  const total = data.length
  const start = total === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, total)

  return (
    <div className="space-y-3">
      <div className="rounded-md bg-card shadow-sm ring-1 ring-border">
        <Table className="min-w-[560px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <table.FlexRender header={header} />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-64 p-0">
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                    <Image
                      src="/brand/data-not-found.png"
                      alt=""
                      width={96}
                      height={96}
                      className="size-24 object-contain"
                    />
                    <p className="font-medium text-foreground">
                      Pengguna tidak ditemukan
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ubah kata kunci atau filter untuk melihat data lain.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground tabular-nums">
          {total === 0
            ? `Menampilkan 0 dari ${numberFormat.format(total)}`
            : `Menampilkan ${start}–${end} dari ${numberFormat.format(total)}`}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Halaman sebelumnya"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <IconChevronLeft aria-hidden />
            Sebelumnya
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label="Halaman berikutnya"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Berikutnya
            <IconChevronRight aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
