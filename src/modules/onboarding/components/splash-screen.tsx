"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { ScreenShell } from "@/shared/components/screen-shell"
import { splash } from "../copy"
import { fadeUp, sway } from "../motion/variants"

const WAVE_PATH =
  "M0 8 Q5 2 10 8 T20 8 T30 8 T40 8 T50 8 T60 8 T70 8 T80 8 T90 8 T100 8 T110 8 T120 8 T130 8 T140 8 T150 8 T160 8 T170 8 T180 8 T190 8 T200 8 T210 8 T220 8 T230 8 T240 8 T250 8 T260 8 T270 8 T280 8 T290 8 T300 8 T310 8 T320 8"

export function SplashScreen({ destination }: { destination: string }) {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [label, setLabel] = useState(splash.loadingLabels[0])

  useEffect(() => {
    const timeout = setTimeout(
      () => router.replace(destination),
      reduce ? 700 : 2700,
    )

    if (reduce) return () => clearTimeout(timeout)

    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % splash.loadingLabels.length
      setLabel(splash.loadingLabels[i])
    }, 900)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [destination, reduce, router])

  return (
    <ScreenShell>
      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <motion.div variants={sway} initial="rest" animate="sway">
          <div className="size-28 overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border">
            <Image
              src="/brand/icon.png"
              alt={splash.logoAlt}
              width={112}
              height={112}
              priority
              className="size-full scale-110 object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="show"
          transition={{ delay: 0.12 }}
        >
          <p className="text-xl font-bold text-primary">{splash.tagline}</p>
          <p className="mt-4 max-w-xs text-base leading-6 text-muted-foreground text-pretty">
            {splash.description}
          </p>
        </motion.div>
      </main>

      <footer className="relative shrink-0 px-6 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))]">
        <div className="relative h-4 w-full overflow-hidden">
          <svg
            viewBox="0 0 320 16"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d={WAVE_PATH}
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              className="text-muted"
            />
            <motion.path
              d={WAVE_PATH}
              pathLength={100}
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: reduce ? 0 : 4, ease: [0, 0, 0.2, 1] }}
              className="text-primary"
            />
          </svg>
        </div>
        <p className="mt-3 text-center text-sm font-medium text-muted-foreground">
          {label}
        </p>
      </footer>
    </ScreenShell>
  )
}
