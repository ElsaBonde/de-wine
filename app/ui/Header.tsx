import { auth } from "@/auth";
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/material";
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
        background: "#1F1724",
        padding: "20px 20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background:
            "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
          zIndex: 1,
        }}
      />
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="/logotype.png" alt="logotype" width={100} height={80} />
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
            <Link href={`/profile/${session.user.id}`}>
              <PersonIcon sx={{ height: "40px",
        width: "40px",
        color: "#B29875",
        cursor: "pointer",
        "&:hover": {
          color: "#6A584B"
        }, }} />
            </Link>
          </>
        ) : (
          <SignInButton />
        )}
      </Box>
    </Box>
  );
}
