import "@fontsource/inspiration";
import { AdminPanelSettings, ShoppingCart } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { red } from "@mui/material/colors";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LayoutProps } from "./types";
import AddContext from "./ui/AddContext";
import CountBadge from "./ui/CountBadge";
import Glasses from "/public/glasses.png";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Wine O'Clock - Your Destination for Quality Wine Online",
  description:
    "Explore our exclusive selection of quality wines from the world's premier wine regions. Find your favorite products at an unbeatable price.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AddContext>
          <AppRouterCacheProvider>
            <Box
              component="header"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f1ddcf",
                padding: "0px, 20px",
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
                <Typography
                  sx={{ color: red[900] }}
                  variant="h2"
                  fontFamily="Inspiration"
                >
                  Wine O&apos;Clock
                </Typography>
                <Image src={Glasses} alt="wineglasses" width={70} height={70} />
              </Link>
              <Box>
              <CountBadge />
              <Link href="/checkout">
              <ShoppingCart data-cy="cart-link" />
              </Link>
              </Box>
            </Box>
            {children}

            <Box component="footer" sx={{ display: "flex" }}>
              <p>
                <AdminPanelSettings /> Admin
              </p>
              <p>© 2024</p>
            </Box>
          </AppRouterCacheProvider>
        </AddContext>
      </body>
    </html>
  );
}
