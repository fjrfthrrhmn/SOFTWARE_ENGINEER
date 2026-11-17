import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getSession, roleHome } from "@/lib/auth"
import { authLogin } from "@/modules/auth/copy"
import { LoginForm } from "@/modules/auth/components/login-form"
import { ScreenShell } from "@/shared/components/screen-shell"

export const metadata: Metadata = {
  title: authLogin.title,
}

export const instant = false

export default async function LoginPage() {
  const session = await getSession()

  if (session) redirect(roleHome(session.role))

  return (
    <ScreenShell>
      <main className="relative flex flex-1 flex-col justify-center px-5 py-10">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <Link href="/" aria-label="StudentConnect" className="inline-flex">
            <span className="flex size-14 items-center justify-center overflow-hidden rounded-md bg-card shadow-sm ring-1 ring-border">
              <Image
                src="/brand/icon.png"
                alt={authLogin.logoAlt}
                width={56}
                height={56}
                priority
                className="size-full scale-120 object-cover"
              />
            </span>
          </Link>

          <header className="space-y-1">
            <p className="text-xs font-bold tracking-wide text-primary uppercase">
              {authLogin.eyebrow}
            </p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {authLogin.heading}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              {authLogin.description}
            </p>
          </header>

          <div className="relative py-2">
            <LoginForm />
          </div>

          <p className="text-center text-xs leading-5 text-muted-foreground">
            {authLogin.help.description}{" "}
            <a
              href="mailto:fajar.ramdhani@satu.ac.id"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {authLogin.help.contactAdmin}
            </a>
            .
          </p>
        </div>
      </main>
    </ScreenShell>
  )
}
