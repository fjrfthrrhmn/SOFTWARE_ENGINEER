import Image from "next/image";
import type { UserRole } from "@/modules/users/types";
import {
  descriptionForRole,
  formatDashboardDate,
  greetingForRole,
} from "../utils";

export function DashboardGreeting({ role }: { role: UserRole }) {
  const now = new Date();

  return (
    <section className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-primary">
          {formatDashboardDate(now)}
        </p>
        <h1 className="mt-1.5 text-[22px] leading-tight font-extrabold tracking-tight text-balance sm:text-2xl">
          {greetingForRole(role, now)}
        </h1>
        <p className="mt-1.5 max-w-[26ch] text-sm leading-6 text-muted-foreground">
          {descriptionForRole(role, now)}
        </p>
      </div>
      <figure className="relative shrink-0" aria-hidden="true">
        <span className="absolute inset-1 rounded-full bg-primary/15 blur-xl" />
        <Image
          src="/brand/greeting.png"
          alt=""
          width={128}
          height={128}
          priority
          className="relative size-28 object-contain sm:size-32"
        />
        <span className="wave absolute bottom-8 left-0 text-2xl leading-none drop-shadow-sm select-none">
          👋🏻
        </span>
      </figure>
    </section>
  );
}
