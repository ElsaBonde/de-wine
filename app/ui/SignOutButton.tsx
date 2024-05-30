"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "200px",
        color: "#d2d0d0",
        backgroundColor: "#1F1724",
        "&:hover": {
          backgroundColor: "#36283E",
        },
      }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
}
