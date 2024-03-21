import { AdminPanelSettings } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        background: "#f1ddcf",
        marginTop: "auto",
        padding: "5px 10px",
        fontFamily: "Josefin sans",
        color: "#5A5353",
      }}
    >
      <Link
        href="/admin"
        style={{
          textDecoration: "none",
          color: "#5A5353",
          display: "flex",
          alignItems: "center",
        }}
        data-cy="admin-link"
      >
        <AdminPanelSettings sx={{ "&:hover": { color: "#881c1c" } }} />
        Admin
      </Link>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          marginX: "auto",
          /*  gap: "3px", */
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <InstagramIcon
            sx={{
              color: "#881c1c",
              width: "30px",
              height: "30px",
            }}
          />
          <FacebookIcon
            sx={{
              color: "#881c1c",
              width: "30px",
              height: "30px",
            }}
          />
          <XIcon
            sx={{
              color: "#881c1c",
              width: "30px",
              height: "30px",
            }}
          />
        </Box>
        <Link
          style={{
            textDecoration: "none",
            color: "#5A5353",
            lineHeight: "1.5",
          }}
          href="mailto:costumerservice@wineoclock.com"
        >
          costumerservice@wineoclock.com
        </Link>
        <Typography sx={{ fontFamily: "Josefin sans" }}>
          +46 31-487 30 73
        </Typography>
        <Typography sx={{ fontFamily: "Josefin sans" }}>
          © 2024 Wine O`clock
        </Typography>
      </Box>
    </Box>
  );
}
