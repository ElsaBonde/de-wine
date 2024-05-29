"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: "100px",
        backgroundColor: "white",
        color: "#1F1724",
        "&:hover": {
          backgroundColor: "#cbc8c8",
        },
      }}
      onClick={() => signIn(undefined, { "callbackUrl": "/" })}
    >
      Sign in
    </Button>
  );
}
