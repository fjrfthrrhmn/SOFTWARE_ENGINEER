"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import {
  BookOpen,
  CalendarDays,
  Folder,
  Home,
  Users,
  type IconComponent,
} from "reicon-react"
import type { UserRole } from "@/modules/users/types"
import { AnimatedThemeToggler } from "@/shared/components/theme-toggler"
import { cn } from "@/lib/utils"

export type NavItem = {
  label: string
  href: string
  icon: IconComponent
}

export const bottomNavItems: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Beranda", href: "/dashboard", icon: Home },
    { label: "Pengguna", href: "/dashboard/pengguna", icon: Users },
    { label: "Jadwal Kuliah", href: "/dashboard/jadwal", icon: CalendarDays },
  ],
  mahasiswa: [
    { label: "Beranda", href: "/dashboard", icon: Home },
    { label: "Jadwal", href: "/dashboard/jadwal", icon: CalendarDays },
    { label: "Mata Kuliah", href: "/dashboard/mata-kuliah", icon: BookOpen },
  ],
  dosen: [
    { label: "Beranda", href: "/dashboard", icon: Home },
    { label: "Jadwal", href: "/dashboard/jadwal", icon: CalendarDays },
    { label: "Materi", href: "/dashboard/materi", icon: Folder },
  ],
}

const MOBILE_LABEL_WIDTH = 70

const MotionLink = motion.create(Link)

type BottomNavBarProps = {
  role: UserRole
  className?: string
  stickyBottom?: boolean
}

export function BottomNavBar({
  role,
  className,
  stickyBottom = true,
}: BottomNavBarProps) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const items = bottomNavItems[role] ?? []

  return (
    <motion.nav
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      aria-label="Navigasi utama"
      className={cn(
        "bg-card border border-border rounded-full flex items-center p-2 shadow-xl space-x-1 max-w-[95vw] h-[52px]",
        stickyBottom &&
          "fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] mx-auto z-30 w-fit",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href)

        return (
          <MotionLink
            key={item.href}
            href={item.href}
            whileTap={{ scale: 0.97 }}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.label}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px]",
              isActive
                ? "bg-primary/10 text-primary gap-2"
                : "bg-transparent text-muted-foreground hover:bg-muted",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/40",
            )}
          >
            <Icon
              size={20}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "4px" : "0px",
              }}
              className="overflow-hidden flex items-center max-w-72"
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
            >
              <span
                className={cn(
                  "font-medium whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] leading-[1.9] text-sm",
                  isActive ? "text-primary" : "opacity-0",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </MotionLink>
        )
      })}

      <span aria-hidden className="mx-1 h-6 w-px bg-border" />

      <AnimatedThemeToggler
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onThemeChange={setTheme}
        aria-label="Ganti tema"
        className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 [&_svg]:size-[22px]"
      />
    </motion.nav>
  )
}
