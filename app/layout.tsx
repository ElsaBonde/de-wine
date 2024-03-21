import "@fontsource/inspiration";
import "@fontsource/josefin-sans";
import { AdminPanelSettings, ShoppingCart } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import { Box, Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LayoutProps } from "./types";
import { AdminProvider } from "./ui/AdminContext";
import CartContext from "./ui/CartContext";
import CountBadge from "./ui/CountBadge";
import CustomerContext from "./ui/CustomerContext";
import SnackbarProvider from "./ui/Snackbar";
import Logotype from "/public/logotype.png";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Wine O'Clock - Your Destination for Quality Wine Online",
  description:
    "Explore our exclusive selection of quality wines from the world's premier wine regions. Find your favorite products at an unbeatable price.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        className={inter.className}
        style={{
          margin: "0",
          background: "#F9F1EC",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminProvider>
          <CartContext>
            <CustomerContext>
              <AppRouterCacheProvider>
                <SnackbarProvider>
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
                      <Image
                        src={Logotype}
                        alt="logotype"
                        width={200}
                        height={60}
                      />
                    </Link>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <CountBadge />
                      <Link href="/checkout">
                        <ShoppingCart
                          data-cy="cart-link"
                          sx={{ color: "#881C1C" }}
                        />
                      </Link>
                    </Box>
                  </Box>

                  {children}

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
                      <AdminPanelSettings
                        sx={{ "&:hover": { color: "#881c1c" } }}
                      />
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
                        costumerService@wineoclock.com
                      </Link>
                      <Typography sx={{ fontFamily: "Josefin sans" }}>
                        +46 31-487 30 73
                      </Typography>
                      <Typography sx={{ fontFamily: "Josefin sans" }}>
                        © 2024 Wine O`clock
                      </Typography>
                    </Box>
                  </Box>
                </SnackbarProvider>
              </AppRouterCacheProvider>
            </CustomerContext>
          </CartContext>
        </AdminProvider>
      </body>
    </html>
  );
}
