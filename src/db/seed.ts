import { hashSync } from "bcryptjs";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import {
  admin,
  dosen,
  jadwalKuliah,
  kurikulum,
  mahasiswa,
  mataKuliah,
  materi,
  pengguna,
  programStudi,
} from "./schema";

config({ path: ".env.local" });

function hashPassword(password: string) {
  return hashSync(password, 10);
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL wajib diisi di .env.local.");
  }

  if (!adminEmail || !adminPassword || adminPassword.length < 8) {
    throw new Error(
      "SEED_ADMIN_EMAIL dan SEED_ADMIN_PASSWORD wajib diisi (password min. 8 karakter).",
    );
  }

  const db = drizzle(databaseUrl);

  const [existing] = await db
    .select({ id: pengguna.id })
    .from(pengguna)
    .limit(1);

  if (existing) {
    console.log("Seed dilewati: data pengguna sudah ada.");
    return;
  }

  const [adminUser] = await db
    .insert(pengguna)
    .values({
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      role: "admin",
    })
    .returning({ id: pengguna.id });

  await db.insert(admin).values({
    nama: "Administrator",
    idPengguna: adminUser.id,
  });

  const [prodi] = await db
    .insert(programStudi)
    .values({ nama: "Teknik Informatika" })
    .returning({ id: programStudi.id });

  const [dosenUser] = await db
    .insert(pengguna)
    .values({
      email: "budi.santoso@studentconnect.local",
      passwordHash: hashPassword("dosen12345"),
      role: "dosen",
    })
    .returning({ id: pengguna.id });

  const [dosenRow] = await db
    .insert(dosen)
    .values({
      kodeDosen: "D001",
      nama: "Budi Santoso, M.Kom.",
      idPengguna: dosenUser.id,
    })
    .returning({ id: dosen.id });

  const [mahasiswaUser] = await db
    .insert(pengguna)
    .values({
      email: "dhandy.amir@studentconnect.local",
      passwordHash: hashPassword("mahasiswa12345"),
      role: "mahasiswa",
    })
    .returning({ id: pengguna.id });

  await db.insert(mahasiswa).values({
    nim: "23123456",
    nama: "Dhandy Amir Faisal",
    angkatan: 2023,
    idPengguna: mahasiswaUser.id,
    idProgramStudi: prodi.id,
  });

  const [mataKuliahRow] = await db
    .insert(mataKuliah)
    .values({
      kodeMataKuliah: "COMP6047",
      namaMataKuliah: "Rekayasa Perangkat Lunak",
      sks: 3,
      deskripsi: "Rekayasa kebutuhan, perancangan, dan implementasi perangkat lunak.",
      idDosen: dosenRow.id,
    })
    .returning({ id: mataKuliah.id });

  const [kurikulumRow] = await db
    .insert(kurikulum)
    .values({
      idProgramStudi: prodi.id,
      idMataKuliah: mataKuliahRow.id,
      tahunKurikulum: "2024/2025",
    })
    .returning({ id: kurikulum.id });

  await db.insert(jadwalKuliah).values({
    hari: 1,
    jamMulai: "08:00:00",
    jamSelesai: "10:30:00",
    ruangan: "B201",
    idKurikulum: kurikulumRow.id,
  });

  await db.insert(materi).values({
    judul: "Pengantar Rekayasa Perangkat Lunak",
    deskripsi: "Materi pertemuan pertama.",
    fileUrl: "https://example.com/materi/rpl-01.pdf",
    idMataKuliah: mataKuliahRow.id,
    idDosen: dosenRow.id,
  });

  console.log("Seed selesai.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
