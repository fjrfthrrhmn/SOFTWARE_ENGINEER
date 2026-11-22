
export default function Loading() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center px-5 sm:px-6">
      <div
        role="status"
        aria-label="Memuat data"
        className="size-8 animate-spin rounded-full border-[3px] border-muted border-t-primary motion-reduce:animate-none"
      />
    </main>
  )
}
