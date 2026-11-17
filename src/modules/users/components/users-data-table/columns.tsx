import { createColumnHelper } from "@tanstack/react-table";
import type { UserListItem } from "@/modules/users/types";
import { Badge } from "@/shared/components/ui/badge";
import { userTableFeatures } from "./data-table-features";

const columnHelper = createColumnHelper<
  typeof userTableFeatures,
  UserListItem
>();

const roleLabels: Record<UserListItem["role"], string> = {
  mahasiswa: "Mahasiswa",
  dosen: "Dosen",
  admin: "Admin",
};

function getInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "?";
}

export const userColumns = columnHelper.columns([
  columnHelper.display({
    id: "index",
    header: "No.",
    cell: ({ row }) => {
      return (
        <div className="font-mono px-2">
          <span>{row.index + 1}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("nama", {
    header: "Pengguna",
    cell: ({ getValue, row }) => (
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {getInitials(getValue())}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-foreground">{getValue()}</p>
          <p className="truncate text-xs text-muted-foreground">
            {row.original.identitas} · {row.original.email}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Peran",
    cell: ({ getValue }) => (
      <Badge variant="secondary" className="rounded-full">
        {roleLabels[getValue()]}
      </Badge>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => (
      <Badge
        variant={getValue() === "aktif" ? "default" : "outline"}
        className="rounded-full capitalize"
      >
        {getValue()}
      </Badge>
    ),
  }),
]);
