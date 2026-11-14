import {
  bigint,
  bigserial,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["mahasiswa", "dosen", "admin"]);
export const statusPenggunaEnum = pgEnum("status_pengguna", [
  "aktif",
  "nonaktif",
]);
export const statusJadwalEnum = pgEnum("status_jadwal", [
  "aktif",
  "dibatalkan",
]);

const timestamps = () => ({
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const pengguna = pgTable("pengguna", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull(),
  status: statusPenggunaEnum("status").default("aktif").notNull(),
  ...timestamps(),
});

export const programStudi = pgTable("program_studi", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  nama: text("nama").notNull().unique(),
  ...timestamps(),
});

export const mahasiswa = pgTable("mahasiswa", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  nim: text("nim").notNull().unique(),
  nama: text("nama").notNull(),
  angkatan: integer("angkatan").notNull(),
  idPengguna: bigint("id_pengguna", { mode: "number" })
    .notNull()
    .unique()
    .references(() => pengguna.id),
  idProgramStudi: bigint("id_program_studi", { mode: "number" })
    .notNull()
    .references(() => programStudi.id),
  ...timestamps(),
});

export const dosen = pgTable("dosen", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  kodeDosen: text("kode_dosen").notNull().unique(),
  nama: text("nama").notNull(),
  idPengguna: bigint("id_pengguna", { mode: "number" })
    .notNull()
    .unique()
    .references(() => pengguna.id),
  ...timestamps(),
});

export const admin = pgTable("admin", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  nama: text("nama").notNull(),
  idPengguna: bigint("id_pengguna", { mode: "number" })
    .notNull()
    .unique()
    .references(() => pengguna.id),
  ...timestamps(),
});

export const mataKuliah = pgTable("mata_kuliah", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  kodeMataKuliah: text("kode_mata_kuliah").notNull().unique(),
  namaMataKuliah: text("nama_mata_kuliah").notNull(),
  sks: integer("sks").notNull(),
  deskripsi: text("deskripsi"),
  idDosen: bigint("id_dosen", { mode: "number" })
    .notNull()
    .references(() => dosen.id),
  ...timestamps(),
});

export const kurikulum = pgTable(
  "kurikulum",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    idProgramStudi: bigint("id_program_studi", { mode: "number" })
      .notNull()
      .references(() => programStudi.id),
    idMataKuliah: bigint("id_mata_kuliah", { mode: "number" })
      .notNull()
      .references(() => mataKuliah.id),
    tahunKurikulum: text("tahun_kurikulum").notNull(),
    ...timestamps(),
  },
  (table) => [
    unique("kurikulum_program_studi_mata_kuliah_tahun_unique").on(
      table.idProgramStudi,
      table.idMataKuliah,
      table.tahunKurikulum,
    ),
  ],
);

export const jadwalKuliah = pgTable("jadwal_kuliah", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  hari: integer("hari").notNull(),
  jamMulai: time("jam_mulai").notNull(),
  jamSelesai: time("jam_selesai").notNull(),
  ruangan: text("ruangan").notNull(),
  status: statusJadwalEnum("status").default("aktif").notNull(),
  idKurikulum: bigint("id_kurikulum", { mode: "number" })
    .notNull()
    .references(() => kurikulum.id),
  ...timestamps(),
});

export const materi = pgTable("materi", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  judul: text("judul").notNull(),
  deskripsi: text("deskripsi"),
  fileUrl: text("file_url").notNull(),
  idMataKuliah: bigint("id_mata_kuliah", { mode: "number" })
    .notNull()
    .references(() => mataKuliah.id),
  idDosen: bigint("id_dosen", { mode: "number" })
    .notNull()
    .references(() => dosen.id),
  ...timestamps(),
});
