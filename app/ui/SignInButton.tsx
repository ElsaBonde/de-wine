"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      onClick={() => signIn()}
      className="bg-blue-400 text-white rounded-md p-2"
    >
      Sign in
    </Button>
  );
}