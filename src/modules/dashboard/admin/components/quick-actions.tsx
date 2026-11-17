import Image from "next/image"
import { Button } from "@/shared/components/ui/button"

const actions = [
  {
    title: "Tambah Pengguna",
    description: "Buat akun mahasiswa atau dosen baru.",
    image: "/brand/user.png",
  },
  {
    title: "Tambah Jadwal Kuliah",
    description: "Atur kelas, ruang, dan waktu kuliah.",
    image: "/brand/calendar.png",
  },
] as const

export function AdminQuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="text-base font-bold tracking-tight">
        Aksi cepat
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            type="button"
            variant="outline"
            className="h-auto flex-col items-start gap-3 rounded-xl p-4 text-left whitespace-normal shadow-sm dark:bg-card"
          >
            <span className="rounded-full bg-linear-to-b from-zinc-200 to-transparent p-2">
              <Image
                src={action.image}
                alt=""
                width={48}
                height={48}
                className="size-12 object-contain drop-shadow-sm"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{action.title}</span>
              <span className="mt-1 block text-xs leading-5 font-normal text-muted-foreground">
                {action.description}
              </span>
            </span>
          </Button>
        ))}
      </div>
    </section>
  )
}
