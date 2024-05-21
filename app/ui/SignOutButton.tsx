"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="bg-blue-400 text-white rounded-md p-2"
    >
      Sign out
    </Button>
  );
}
