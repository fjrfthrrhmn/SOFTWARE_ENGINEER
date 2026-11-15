import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Home, Login, ShieldCheck } from "reicon-react"
import { Button } from "@/shared/components/ui/button"
import { ScreenShell } from "@/shared/components/screen-shell"
import { unauthorized as copy } from "@/modules/onboarding/copy"

export const metadata: Metadata = {
  title: copy.title,
}

export default function UnauthorizedPage() {
  return (
    <ScreenShell>
      <main className="my-10 relative flex flex-1 flex-col justify-between gap-4 px-5 pt-4 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))] sm:px-6">
        <figure className="relative flex min-h-20 flex-1 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary/25 to-transparent"
          />
          <div className="flex h-full items-end justify-center">
            <Image
              src="/brand/unauthorized.png"
              alt={copy.imageAlt}
              width={1024}
              height={1024}
              priority
              className="max-h-full w-auto scale-90 object-contain"
            />
          </div>
        </figure>

        <div className="space-y-10">
          <div className="shrink-0">
            <p className="flex items-center gap-1.5 text-xs font-bold text-destructive">
              <ShieldCheck size={14} />
              {copy.eyebrow}
            </p>
            <h1 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
              {copy.heading}
            </h1>
            <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
              {copy.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col">
            <Button
              size="lg"
              className="h-12 w-full text-sm font-bold"
              render={<Link href="/login" />}
            >
              <Login size={18} className="size-[18px]" />
              {copy.primaryCta}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="mt-2 h-11 w-full text-sm font-semibold text-muted-foreground"
              render={<Link href="/" />}
            >
              <Home size={18} className="size-[18px]" />
              {copy.secondaryCta}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground text-pretty">
              {copy.help}
            </p>
          </div>
        </div>
      </main>
    </ScreenShell>
  )
}
