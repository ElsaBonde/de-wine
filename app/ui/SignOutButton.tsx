"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "100px",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#440000",
        },
      }}
      onClick={() => signOut()}
      className="bg-blue-400 text-white rounded-md p-2"
    >
      Sign out
    </Button>
  );
}
