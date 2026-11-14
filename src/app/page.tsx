import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-12">
      <p className="text-sm font-medium text-zinc-500">
        Platform Informasi Akademik
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
        StudentConnect
      </h1>
      <p className="text-base leading-7 text-zinc-600">
        Akses jadwal perkuliahan dan materi pembelajaran dalam satu tempat.
        Masuk dengan akun mahasiswa, dosen, atau admin Anda.
      </p>
      <Link
        href="/login"
        className="flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Masuk
      </Link>
    </main>
  );
}
