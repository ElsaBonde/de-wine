import { auth } from "@/auth";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CountBadge from "./CountBadge";
import SignInButton from "./SignInButton";

export default async function Header() {
  const session = await auth();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#f1ddcf",
        padding: "20px 20px",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="/logotype.png" alt="logotype" width={200} height={60} />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        <CountBadge />
        {session?.user ? <h1>hej {session.user.name}</h1> : <SignInButton />}
      </Box>
    </Box>
  );
}
