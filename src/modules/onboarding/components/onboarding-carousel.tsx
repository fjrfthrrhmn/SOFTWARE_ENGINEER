"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "reicon-react"
import { Button } from "@/shared/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/components/ui/carousel"
import { ScreenShell } from "@/shared/components/screen-shell"
import { cn } from "@/lib/utils"
import { onboardingSteps } from "../copy"
import { OnboardingStepView } from "./onboarding-step"

export function OnboardingCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const last = index === onboardingSteps.length - 1
  const step = onboardingSteps[index]

  return (
    <ScreenShell>
      <main className="relative mt-10 flex flex-1 flex-col justify-between gap-10 px-5 pt-4 pb-[calc(1.25rem_+_env(safe-area-inset-bottom))]">
        <div className="flex flex-1 flex-col gap-10">
          <Carousel setApi={setApi} opts={{ align: "start" }}>
            <CarouselContent className="-ml-0">
              {onboardingSteps.map((item) => (
                <CarouselItem key={item.id} className="pl-0">
                  <OnboardingStepView step={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <nav
            aria-label="Langkah onboarding"
            className="flex shrink-0 items-center justify-center gap-0"
          >
            {onboardingSteps.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Langkah ${i + 1}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => api?.scrollTo(i)}
                className="flex h-9 w-8 items-center justify-center rounded-full focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-border",
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto w-full">
          <Button
            size="lg"
            className="h-12 w-full text-sm font-bold"
            render={last ? <Link href="/login" /> : undefined}
            onClick={last ? undefined : () => api?.scrollNext()}
          >
            {step.primaryCta}
            <ChevronRight size={18} className="size-[18px] stroke-3" stroke="2px" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="mt-2 h-11 w-full text-sm font-semibold text-muted-foreground"
            disabled={index === 0}
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft size={18} className="size-[18px] stroke-3" stroke="2px" />
            {step.secondaryCta}
          </Button>
        </div>
      </main>
    </ScreenShell>
  )
}
