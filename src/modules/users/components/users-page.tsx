"use client";

import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { filterUsers } from "@/modules/users/filter-users";
import { userFiltersParsers } from "@/modules/users/search-params";
import type { UserListItem } from "@/modules/users/types";
import { UsersDataTable } from "./users-data-table/data-table";
import { UsersFilterDrawer } from "./users-data-table/users-filter-drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Search } from "reicon-react";

export function UsersPage({ data }: { data: UserListItem[] }) {
  const [filters, setFilters] = useQueryStates(userFiltersParsers);
  const filteredUsers = useMemo(
    () => filterUsers(data, filters),
    [data, filters],
  );

  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">
            Daftar Pengguna
          </h2>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <InputGroup className="flex-1">
            <InputGroupInput
              aria-label="Cari pengguna"
              placeholder="Cari nama, email, atau identitas"
              value={filters.q}
              onChange={(event) => void setFilters({ q: event.target.value })}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <UsersFilterDrawer
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(null)}
          />
        </div>

        <UsersDataTable data={filteredUsers} />
      </section>
    </div>
  );
}
