import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ScreenShell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex min-h-dvh w-full max-w-[640px] flex-col overflow-hidden bg-card sm:border-x sm:border-border",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="paper-grid absolute inset-0 opacity-70" />
        <div className="absolute -top-32 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      {children}
    </div>
  )
}
