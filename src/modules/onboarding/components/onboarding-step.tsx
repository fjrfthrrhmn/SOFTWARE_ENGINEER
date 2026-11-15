import Image, { type StaticImageData } from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { BookOpen, CalendarDays, FilePdf, InfoCircle } from "reicon-react"
import { Badge } from "@/shared/components/ui/badge"
import { Card } from "@/shared/components/ui/card"
import { cn } from "@/lib/utils"
import type { OnboardingStep, OnboardingStepId } from "../copy"
import { fadeUp, bob } from "../motion/variants"
import art1 from "../assets/onboarding-1.png"
import art2 from "../assets/onboarding-2.png"
import art3 from "../assets/onboarding-3.png"

const art: Record<OnboardingStepId, StaticImageData> = {
  schedule: art1,
  materials: art2,
  summary: art3,
}

const chipClass =
  "absolute h-auto gap-1.5 bg-card/95 px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-sm"

function Overlay({ step }: { step: OnboardingStep }) {
  if (step.id === "schedule") {
    return (
      <>
        <Badge variant="outline" className={cn(chipClass, "top-10 right-3")}>
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Jadwal hari ini
        </Badge>
        <Card
          size="sm"
          className="absolute bottom-12 left-0 w-fit flex-row items-center gap-2 rounded-lg px-3.5 py-1.5 shadow-md"
        >
          <CalendarDays size={18} className="shrink-0 text-primary" />
          <div className="flex flex-col">
            <p className="text-xs font-bold text-muted-foreground">
              Jadwal berikutnya
            </p>
            <p className="mt-0.5 text-xs font-bold tracking-tight">
              08.00–10.30 | Database Tecnology
            </p>
          </div>
        </Card>
      </>
    )
  }

  if (step.id === "materials") {
    return (
      <>
        <Badge variant="outline" className={cn(chipClass, "top-10 right-3")}>
          <BookOpen size={14} className="text-primary" />
          Materi pembelajaran
        </Badge>
        <Card
          size="sm"
          className="absolute bottom-12 left-0 w-fit flex-row items-center gap-2 rounded-lg px-3.5 py-1.5 shadow-md"
        >
          <span className="flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-[9px] font-extrabold text-destructive">
            <FilePdf size={11} />
            PDF
          </span>
          <p className="text-xs font-bold tracking-tight">Modul 4 · Basis Data</p>
        </Card>
      </>
    )
  }

  return (
    <Badge variant="outline" className={cn(chipClass, "bottom-10 right-3")}>
      <InfoCircle size={14} className="text-primary" />
      Informasi akademik
    </Badge>
  )
}

export function OnboardingStepView({ step }: { step: OnboardingStep }) {
  const reduce = useReducedMotion()

  return (
    <>
      <motion.figure
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative flex min-h-50 max-h-90 flex-1 items-center justify-center"
      >
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary/25 to-transparent"
        />
        <div
          className={cn(
            "flex h-full items-end justify-center",
            step.flip && "-scale-x-100",
          )}
        >
          <motion.div variants={bob} initial="rest" animate={reduce ? "rest" : "bob"}>
            <Image
              src={art[step.id]}
              alt={step.imageAlt}
              priority
              className="max-h-full w-auto scale-90 object-contain"
            />
          </motion.div>
        </div>
        <Overlay step={step} />
      </motion.figure>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.08 }}
        className="shrink-0 text-center"
      >
        <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
          {step.heading}
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
          {step.body}
        </p>
      </motion.div>
    </>
  )
}
