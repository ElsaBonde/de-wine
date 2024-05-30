"use client";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { IconProps } from "@mui/material";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function SignInButton() {
  const pathname = usePathname();

  return (
    <PersonOutlineIconGold
      onClick={() => signIn(undefined, { callbackUrl: pathname })}
    />
  );
}

const PersonOutlineIconGold = (props: IconProps) => (
  <>
    <svg width={0} height={0}>
      <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={0}>
        <stop offset={0} stopColor="#AE8625" />
        <stop offset={1} stopColor="#F7EF8A" />
      </linearGradient>
    </svg>
    <PersonOutlineIcon
      onClick={props.onClick}
      sx={{
        fill: "url(#linearColors)",
        width: "33px",
        height: "33px",
        cursor: "pointer",
      }}
    />
  </>
);
