import Image from "next/image"
import { ArrowUpRight } from "reicon-react"
import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

const stats = [
  {
    label: "Total mahasiswa",
    value: "1.248",
    image: "/brand/student.png",
    tint: "from-orange-200",
  },
  {
    label: "Total dosen",
    value: "84",
    image: "/brand/lecturer.png",
    tint: "from-blue-200",
  },
  {
    label: "Total admin",
    value: "12",
    image: "/brand/admin.png",
    tint: "from-zinc-200",
  },
] as const

export function AdminOverview() {
  return (
    <section aria-labelledby="overview-heading">
      <div className="flex items-center justify-between gap-3">
        <h2 id="overview-heading" className="text-base font-bold tracking-tight">
          Ringkasan
        </h2>
        <p className="text-xs font-medium text-muted-foreground">
          Informasi statistik akademik
        </p>
      </div>

      <ScrollArea className="-mx-5 py-4 overflow-x-auto px-5">
        <div className="flex w-max gap-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              size="sm"
              className="w-56 shrink-0 gap-2 px-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`rounded-full bg-linear-to-b to-transparent p-2 ${stat.tint}`}
                >
                  <Image
                    src={stat.image}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 object-contain drop-shadow-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Buka tabel data ${stat.label.toLowerCase()}`}
                  className="size-10 rounded-md"
                >
                  <ArrowUpRight size={20} />
                </Button>
              </div>

              <p className="text-2xl font-extrabold tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}
