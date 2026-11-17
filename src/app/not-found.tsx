import type { Metadata } from "next"
import { NotFoundState, notFoundCopy } from "@/shared/components/state-view"

export const metadata: Metadata = {
  title: notFoundCopy.title,
}

export default function NotFound() {
  return <NotFoundState />
}
