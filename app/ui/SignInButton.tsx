"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-400 text-white rounded-md p-2"
    >
      Sign in
    </button>
  );
}
