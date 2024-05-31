import "@fontsource/inspiration";
import "@fontsource/josefin-sans";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { LayoutProps } from "./types";
import CartContext from "./ui/CartContext";
import CustomerContext from "./ui/CustomerContext";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import SnackbarProvider from "./ui/Snackbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiWine - Exclusive Wine Selections",
  description:
    "DiWine offers a wide selection of exclusive wines from around the world. We have a wine for every occasion. Order online and have your wine delivered to your door.",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        className={inter.className}
        style={{
          margin: "0",
          background: "white",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SessionProvider>
          <CartContext>
            <CustomerContext>
              <AppRouterCacheProvider>
                <SnackbarProvider>
                  <Header />
                  {children}

                  <Footer />
                </SnackbarProvider>
              </AppRouterCacheProvider>
            </CustomerContext>
          </CartContext>
        </SessionProvider>
      </body>
    </html>
  );
}
