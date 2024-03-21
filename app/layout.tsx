import "@fontsource/inspiration";
import "@fontsource/josefin-sans";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutProps } from "./types";
import { AdminProvider } from "./ui/AdminContext";
import CartContext from "./ui/CartContext";
import CustomerContext from "./ui/CustomerContext";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import SnackbarProvider from "./ui/Snackbar";

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
                  <Header />
                  {children}

                  <Footer />
                </SnackbarProvider>
              </AppRouterCacheProvider>
            </CustomerContext>
          </CartContext>
        </AdminProvider>
      </body>
    </html>
  );
}
