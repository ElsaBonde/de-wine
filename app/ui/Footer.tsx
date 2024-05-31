import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default async function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          display: "flex",
          background: "#1F1724",
          marginTop: "auto",
          padding: "10px",
          fontFamily: "Josefin sans",
          color: "#c6c6c6",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background:
              "linear-gradient(to right, #AE8625, #F7EF8A, #D2AC47, #EDC967)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            marginX: "auto",
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
                color: "#c6c6c6",
                width: "30px",
                height: "30px",
              }}
            />
            <FacebookIcon
              sx={{
                color: "#c6c6c6",
                width: "30px",
                height: "30px",
              }}
            />
            <XIcon
              sx={{
                color: "#c6c6c6",
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
          <Link
            style={{
              textDecoration: "none",
              color: "#c6c6c6",
              lineHeight: "1.5",
            }}
            href="mailto:costumerservice@diwine.com"
          >
            costumerservice@diwine.com
          </Link>
          <Typography sx={{ fontFamily: "Josefin sans" }}>
            +46 31-487 30 73
          </Typography>
          <Typography sx={{ fontFamily: "Josefin sans" }}>
            © 2024 Diwine
          </Typography>
        </Box>
      </Box>
    </>
  );
}
