import Image from "next/image"
import Link from "next/link"
import { Bell } from "reicon-react"
import { LogoutButton } from "@/modules/auth/components/logout-button"
import type { UserWithProfile } from "@/modules/users/types"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Separator } from "@/shared/components/ui/separator"
import { getInitials } from "../utils"

export function DashboardHeader({ user }: { user: UserWithProfile }) {
  const name = user.profile?.nama ?? "Pengguna"

  return (
    <header className="fixed top-0 left-1/2 z-30 flex w-full max-w-[640px] -translate-x-1/2 items-center justify-between gap-3 bg-background/90 px-5 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] backdrop-blur-md sm:px-6 border-x border-b border-border">
      <Link
        href="/dashboard"
        aria-label="StudentConnect"
        className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
      >
        <Image
          src="/brand/icon.png"
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-lg ring-1 ring-border"
        />
        <span className="text-sm font-extrabold tracking-tight">
          StudentConnect
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="relative size-10 rounded-full"
          aria-label="Notifikasi"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-full"
                aria-label="Buka profil pengguna"
              >
                <Avatar size="lg">
                  <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />

          <PopoverContent
            align="end"
            sideOffset={10}
            className="max-w-52 rounded-xl p-0"
          >
            <PopoverHeader className="space-y-1 p-3">
              <div>
                <PopoverTitle className="truncate text-sm font-semibold">
                  {name}
                </PopoverTitle>
                <PopoverDescription className="truncate text-xs">
                  {user.email}
                </PopoverDescription>
              </div>
              <Separator />
              <div>
                <LogoutButton />
              </div>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
