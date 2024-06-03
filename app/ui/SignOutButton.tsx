"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

export default function SignOutButton() {
  const LogoutOutlineIconGold = (props: { onClick?: MouseEventHandler }) => (

    <>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={0}>
          <stop offset={0} stopColor="#AE8625" />
          <stop offset={1} stopColor="#F7EF8A" />
        </linearGradient>
      </svg>
      <LogoutIcon
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

  return (

    <LogoutOutlineIconGold onClick={() => signOut({ callbackUrl: "/" })} />

  );
}
