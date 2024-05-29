"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function SignInButton() {
  return (
    <>
    <PersonOutlineIcon 
      
      sx={{
        height: "40px",
        width: "40px",
        color: "#B29875",
        cursor: "pointer",
        "&:hover": {
          color: "#6A584B"
        },
      }}
      onClick={() => signIn(undefined, { "callbackUrl": "/" })}
    />
    </>
    
  );
}
