import { auth } from "@/auth";
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone';
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CountBadge from "./CountBadge";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

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
        {session?.user ? (
          <>
            <Typography>Tjena {session.user.name}</Typography> <SignOutButton />
            <Link href={`/profile/${session.user.id}`}>
              <PersonPinTwoToneIcon fontSize="large"
                sx={{ color: "#881C1C", }} />
            </Link>
            </>
            ) : (
          <SignInButton />
        )}
      </Box>
    </Box>
  );
}
