import { auth } from "@/auth";
import { AdminPanelSettings } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Box } from "@mui/material";
import Link from "next/link";
import CountBadge from "./CountBadge";
import SignInButton from "./SignInButton";
import Image from "next/image";

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
        padding: "10px 20px",
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
      {session?.user.isAdmin && (
        <Link
          href="/admin/products"
          style={{
            textDecoration: "none",
            color: "#c6c6c6",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AdminPanelSettings sx={{ "&:hover": { color: "white" } }} />
          Admin
        </Link>
      )}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="/logotype.png" alt="logotype" width={70} height={65} />
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
              <PersonOutlineIconGold
              />
            </Link>
          </>
        ) : (
          <SignInButton />
        )}
      </Box>
    </Box>
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
    <PersonIcon onClick={props.onClick} sx={{ fill: "url(#linearColors)", width: "33px", height: "33px", cursor: "pointer" }} />
  </>
)