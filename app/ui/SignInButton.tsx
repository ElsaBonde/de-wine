"use client";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function SignInButton() {
  const pathname = usePathname();
  return (
    <>
      <PersonOutlineIcon
        sx={{
          height: "40px",
          width: "40px",
          color: "#B29875",
          cursor: "pointer",
          "&:hover": {
            color: "#6A584B",
          },
        }}
        onClick={() => signIn(undefined, { callbackUrl: pathname })}
      />
    </>
  );
}
