import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Home, Login, ShieldCheck } from "reicon-react"
import { Button } from "@/shared/components/ui/button"
import { ScreenShell } from "@/shared/components/screen-shell"

type StateViewProps = {
  imageSrc: string
  imageAlt: string
  eyebrow: ReactNode
  title: string
  body: string
  help?: string
  children?: ReactNode
}

type StatePanelProps = StateViewProps & {
  className?: string
}

export const notFoundCopy = {
  title: "StudentConnect | Halaman Tidak Ditemukan",
  eyebrow: "Error 404",
  imageSrc: "/brand/not-found.png",
  imageAlt: "Maskot MOCHI kebingungan saat mencari halaman yang tidak tersedia",
  heading: "Halaman Tidak Ditemukan",
  body: "Halaman yang kamu cari tidak tersedia. Periksa kembali alamat tautan.",
  primaryCta: "Kembali ke Beranda",
  help: "Masih mengalami kendala? Hubungi admin untuk mendapatkan bantuan",
}

export const unauthorizedCopy = {
  title: "StudentConnect | Akses Ditolak",
  eyebrow: "Error 403",
  imageSrc: "/brand/unauthorized.png",
  imageAlt:
    "Maskot MOCHI memberikan informasi bahwa akun pengguna belum memiliki izin akses",
  heading: "Akses Tidak Tersedia",
  body: "Akun yang sedang digunakan belum memiliki izin untuk membuka halaman ini. Silakan masuk menggunakan akun dengan hak akses yang sesuai",
  primaryCta: "Masuk dengan Akun Lain",
  secondaryCta: "Kembali ke Beranda",
  help: "Memerlukan izin akses? Hubungi admin untuk mendapatkan informasi lebih lanjut",
}

export const serverErrorCopy = {
  title: "Halaman belum dapat ditampilkan",
  eyebrow: "Error 401",
  imageSrc: "/brand/server-error.png",
  imageAlt: "Maskot MOCHI menunjukkan kendala pada sistem",
  heading: "Sepertinya ada kendala",
  body: "Silakan coba beberapa saat lagi atau hubungi admin jika kendala masih berlanjut.",
  primaryCta: "Hubungi Admin",
  contactHref: "mailto:fajar.ramdhani@satu.ac.id",
};

export const dataNotFoundCopy = {
  title: "StudentConnect | Data Tidak Ditemukan",
  eyebrow: "Data kosong",
  imageSrc: "/brand/data-not-found.png",
  imageAlt: "Maskot MOCHI kebingungan karena data yang dicari tidak ditemukan",
  heading: "Data Tidak Ditemukan",
  body: "Belum ada data yang dapat ditampilkan saat ini.",
};

export const loadingCopy = {
  title: "StudentConnect | Memuat",
  eyebrow: "Memuat data",
  imageSrc: "/brand/loading.png",
  imageAlt: "Maskot MOCHI sedang menunggu data dimuat",
  heading: "Menyiapkan halaman",
  body: "Mohon tunggu sebentar, data sedang dimuat.",
};
export function StatePanel({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  body,
  help,
  children,
  className,
}: StatePanelProps) {
  return (
    <main
      className={`relative flex flex-1 flex-col justify-between gap-4 px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-6 ${className ?? ""}`}
    >
      <figure className="relative flex min-h-20 flex-1 items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-primary/25 to-transparent"
        />
        <div className="flex h-full items-end justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1024}
            height={1024}
            priority
            className="max-h-full w-auto scale-80 object-contain"
          />
        </div>
      </figure>

      <div className="space-y-10">
        <div className="shrink-0">
          <p className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
            {body}
          </p>
        </div>

        <div className="flex shrink-0 flex-col">
          {children}
          {help ? (
            <p className="mt-4 text-center text-xs text-muted-foreground text-pretty">
              {help}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  )
}

export function StateView(props: StateViewProps) {
  return (
    <ScreenShell>
      <StatePanel {...props} className="my-10" />
    </ScreenShell>
  )
}

export function NotFoundState() {
  const copy = notFoundCopy
  return (
    <StateView
      imageSrc={copy.imageSrc}
      imageAlt={copy.imageAlt}
      eyebrow={copy.eyebrow}
      title={copy.heading}
      body={copy.body}
      help={copy.help}
    >
      <Button
        size="lg"
        className="h-12 w-full text-sm font-bold"
        nativeButton={false}
        render={<Link href="/" />}
      >
        <Home size={18} className="size-[18px]" />
        {copy.primaryCta}
      </Button>
    </StateView>
  )
}

export function UnauthorizedState() {
  const copy = unauthorizedCopy
  return (
    <StateView
      imageSrc={copy.imageSrc}
      imageAlt={copy.imageAlt}
      eyebrow={
        <>
          <ShieldCheck size={14} className="text-destructive" />
          <span className="text-destructive">{copy.eyebrow}</span>
        </>
      }
      title={copy.heading}
      body={copy.body}
      help={copy.help}
    >
      <Button
        size="lg"
        className="h-12 w-full text-sm font-bold"
        nativeButton={false}
        render={<Link href="/login" />}
      >
        <Login size={18} className="size-[18px]" />
        {copy.primaryCta}
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="mt-2 h-11 w-full text-sm font-semibold text-muted-foreground"
        nativeButton={false}
        render={<Link href="/" />}
      >
        <Home size={18} className="size-[18px]" />
        {copy.secondaryCta}
      </Button>
    </StateView>
  )
}

export function ServerErrorPanel({
  className = "my-0",
}: {
  className?: string
}) {
  const copy = serverErrorCopy
  return (
    <StatePanel
      imageSrc={copy.imageSrc}
      imageAlt={copy.imageAlt}
      eyebrow={copy.eyebrow}
      title={copy.heading}
      body={copy.body}
      className={className}
    >
      <Button
        size="lg"
        className="h-12 w-full text-sm font-bold"
        nativeButton={false}
        render={<a href={copy.contactHref} />}
      >
        {copy.primaryCta}
      </Button>
    </StatePanel>
  )
}

export function ServerErrorState() {
  return (
    <ScreenShell>
      <ServerErrorPanel className="my-10" />
    </ScreenShell>
  )
}

export function DataNotFoundState() {
  const copy = dataNotFoundCopy
  return (
    <StateView
      imageSrc={copy.imageSrc}
      imageAlt={copy.imageAlt}
      eyebrow={copy.eyebrow}
      title={copy.heading}
      body={copy.body}
    />
  )
}

export function LoadingState() {
  const copy = loadingCopy
  return (
    <StateView
      imageSrc={copy.imageSrc}
      imageAlt={copy.imageAlt}
      eyebrow={copy.eyebrow}
      title={copy.heading}
      body={copy.body}
    />
  )
}
