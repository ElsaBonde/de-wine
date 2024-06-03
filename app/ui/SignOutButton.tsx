"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <LogoutIcon
      sx={{ cursor: "pointer" }}
      onClick={() => signOut({ callbackUrl: "/" })}
    />
  );
}
