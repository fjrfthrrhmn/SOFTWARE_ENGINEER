CREATE TYPE "public"."role" AS ENUM('mahasiswa', 'dosen', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status_jadwal" AS ENUM('aktif', 'dibatalkan');--> statement-breakpoint
CREATE TYPE "public"."status_pengguna" AS ENUM('aktif', 'nonaktif');--> statement-breakpoint
CREATE TABLE "admin" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"id_pengguna" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_id_pengguna_unique" UNIQUE("id_pengguna")
);
--> statement-breakpoint
CREATE TABLE "dosen" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"kode_dosen" text NOT NULL,
	"nama" text NOT NULL,
	"id_pengguna" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dosen_kode_dosen_unique" UNIQUE("kode_dosen"),
	CONSTRAINT "dosen_id_pengguna_unique" UNIQUE("id_pengguna")
);
--> statement-breakpoint
CREATE TABLE "jadwal_kuliah" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"hari" integer NOT NULL,
	"jam_mulai" time NOT NULL,
	"jam_selesai" time NOT NULL,
	"ruangan" text NOT NULL,
	"status" "status_jadwal" DEFAULT 'aktif' NOT NULL,
	"id_kurikulum" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kurikulum" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"id_program_studi" bigint NOT NULL,
	"id_mata_kuliah" bigint NOT NULL,
	"tahun_kurikulum" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "kurikulum_program_studi_mata_kuliah_tahun_unique" UNIQUE("id_program_studi","id_mata_kuliah","tahun_kurikulum")
);
--> statement-breakpoint
CREATE TABLE "mahasiswa" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"nama" text NOT NULL,
	"angkatan" integer NOT NULL,
	"id_pengguna" bigint NOT NULL,
	"id_program_studi" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mahasiswa_nim_unique" UNIQUE("nim"),
	CONSTRAINT "mahasiswa_id_pengguna_unique" UNIQUE("id_pengguna")
);
--> statement-breakpoint
CREATE TABLE "mata_kuliah" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"kode_mata_kuliah" text NOT NULL,
	"nama_mata_kuliah" text NOT NULL,
	"sks" integer NOT NULL,
	"deskripsi" text,
	"id_dosen" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mata_kuliah_kode_mata_kuliah_unique" UNIQUE("kode_mata_kuliah")
);
--> statement-breakpoint
CREATE TABLE "materi" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"judul" text NOT NULL,
	"deskripsi" text,
	"file_url" text NOT NULL,
	"id_mata_kuliah" bigint NOT NULL,
	"id_dosen" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pengguna" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "role" NOT NULL,
	"status" "status_pengguna" DEFAULT 'aktif' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pengguna_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "program_studi" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"nama" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "program_studi_nama_unique" UNIQUE("nama")
);
--> statement-breakpoint
ALTER TABLE "admin" ADD CONSTRAINT "admin_id_pengguna_pengguna_id_fk" FOREIGN KEY ("id_pengguna") REFERENCES "public"."pengguna"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dosen" ADD CONSTRAINT "dosen_id_pengguna_pengguna_id_fk" FOREIGN KEY ("id_pengguna") REFERENCES "public"."pengguna"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jadwal_kuliah" ADD CONSTRAINT "jadwal_kuliah_id_kurikulum_kurikulum_id_fk" FOREIGN KEY ("id_kurikulum") REFERENCES "public"."kurikulum"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kurikulum" ADD CONSTRAINT "kurikulum_id_program_studi_program_studi_id_fk" FOREIGN KEY ("id_program_studi") REFERENCES "public"."program_studi"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kurikulum" ADD CONSTRAINT "kurikulum_id_mata_kuliah_mata_kuliah_id_fk" FOREIGN KEY ("id_mata_kuliah") REFERENCES "public"."mata_kuliah"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_id_pengguna_pengguna_id_fk" FOREIGN KEY ("id_pengguna") REFERENCES "public"."pengguna"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_id_program_studi_program_studi_id_fk" FOREIGN KEY ("id_program_studi") REFERENCES "public"."program_studi"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mata_kuliah" ADD CONSTRAINT "mata_kuliah_id_dosen_dosen_id_fk" FOREIGN KEY ("id_dosen") REFERENCES "public"."dosen"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materi" ADD CONSTRAINT "materi_id_mata_kuliah_mata_kuliah_id_fk" FOREIGN KEY ("id_mata_kuliah") REFERENCES "public"."mata_kuliah"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "materi" ADD CONSTRAINT "materi_id_dosen_dosen_id_fk" FOREIGN KEY ("id_dosen") REFERENCES "public"."dosen"("id") ON DELETE no action ON UPDATE no action;