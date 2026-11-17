import { parseAsString, parseAsStringLiteral } from "nuqs"

export const userFiltersParsers = {
  q: parseAsString.withDefault(""),
  role: parseAsStringLiteral(["all", "mahasiswa", "dosen", "admin"] as const).withDefault("all"),
  status: parseAsStringLiteral(["all", "aktif", "nonaktif"] as const).withDefault("all"),
}
