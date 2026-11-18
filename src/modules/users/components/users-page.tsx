"use client";

import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { filterUsers } from "@/modules/users/filter-users";
import { userFiltersParsers } from "@/modules/users/search-params";
import type { StudyProgramOption, UserListItem } from "@/modules/users/types";
import { UsersDataTable } from "./users-data-table/data-table";
import { UsersFeaturedDrawer } from "./users-data-table/users-featured-drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Search } from "reicon-react";
import { Badge } from "@/shared/components/ui/badge";
import { Toaster } from "@/shared/components/ui/toast";

export function UsersPage({
  data,
  studyPrograms,
}: {
  data: UserListItem[];
  studyPrograms: StudyProgramOption[];
}) {
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
          <Badge variant="secondary" className="rounded-full tabular-nums">
            Total Data: {filteredUsers.length}
          </Badge>
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

          <UsersFeaturedDrawer
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(null)}
          />
        </div>

        <UsersDataTable data={filteredUsers} studyPrograms={studyPrograms} />
      </section>
      <Toaster />
    </div>
  );
}
