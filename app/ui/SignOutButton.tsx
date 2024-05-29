"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "100px",
        fontSize: "13px",
        background: "white",
        color: "#1F1724",
        "&:hover": {
          backgroundColor: "#cbc8c8",
        },
      }}
      onClick={() => signOut()}
      
    >
      Sign out
    </Button>
  );
}
