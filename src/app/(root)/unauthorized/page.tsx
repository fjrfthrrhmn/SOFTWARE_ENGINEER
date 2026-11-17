import type { Metadata } from "next"
import {
  UnauthorizedState,
  unauthorizedCopy,
} from "@/shared/components/state-view"

export const metadata: Metadata = {
  title: unauthorizedCopy.title,
}

export default function UnauthorizedPage() {
  return <UnauthorizedState />
}
