import { execSync } from "node:child_process";
import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL wajib diisi di .env.local.");
  }

  if (process.argv[2] !== "--confirm") {
    throw new Error(
      "Reset database akan menghapus semua data. Jalankan: npm run db:reset -- --confirm",
    );
  }

  const db = drizzle(databaseUrl);

  await db.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE`);
  await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
  await db.execute(sql`CREATE SCHEMA public`);

  console.log("Skema database dihapus. Menjalankan migrasi dan seed...");

  execSync("npm run db:migrate", { stdio: "inherit" });
  execSync("npm run db:seed", { stdio: "inherit" });

  console.log("Reset database selesai.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
