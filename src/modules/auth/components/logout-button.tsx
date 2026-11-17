import { Logout } from "reicon-react";
import { Button } from "@/shared/components/ui/button";
import { logout as handleLogout } from "../actions";

export function LogoutButton() {

  return (
    <form action={handleLogout} className="w-full">
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        className="w-full"
        aria-label="Keluar"
      >
        <Logout size={16} />
        <span>Keluar</span>
      </Button>
    </form>
  );
}
