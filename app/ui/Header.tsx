import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CountBadge from "./CountBadge";
import Logotype from "/public/logotype.png";

export default function Header() {
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
        <Image src={Logotype} alt="logotype" width={200} height={60} />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        <CountBadge />
      </Box>
    </Box>
  );
}
