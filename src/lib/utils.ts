export { cn } from "cn"

export function errorMessage(errors: unknown[]) {
  const error = errors[0]

  if (!error) return null
  if (typeof error === "string") return error
  if (typeof error === "object" && "message" in error) {
    return String(error.message)
  }

  return String(error)
}
