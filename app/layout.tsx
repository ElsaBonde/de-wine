import "@fontsource/inspiration";
import { AdminPanelSettings, ShoppingCart } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LayoutProps } from "./types";
import Glasses from "/assets/glasses.png";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Wine O'clock - Your Destination for Quality Wine Online",
  description:
    "Explore our exclusive selection of quality wines from the world's premier wine regions. Find your favorite products at an unbeatable price.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{ color: red[900] }}
              variant="h1"
              fontFamily="Inspiration"
            >
              Wine O`clock
            </Typography>
            <Image src={Glasses} alt="wineglasses" width={50} height={50} />
          </Link>
          <ShoppingCart />
        </header>
        {children}
        <footer>
          <p>
            <AdminPanelSettings /> Admin
          </p>
          <p>© 2024</p>
        </footer>
      </body>
    </html>
  );
}
