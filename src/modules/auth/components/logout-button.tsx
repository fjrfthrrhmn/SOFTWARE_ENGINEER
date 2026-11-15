import { Logout } from "reicon-react"
import { Button } from "@/shared/components/ui/button"
import { logout } from "../actions"

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline" size="lg" className="w-full">
        <Logout size={16} />
        Keluar
      </Button>
    </form>
  )
}
