import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { LayoutProps } from "./types";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Wine O`clock",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Link href="/">
            <h1>Wine O`clock</h1>
          </Link>
        </header>
        {children}
        <footer>
          <p>© 2024</p>
        </footer>
      </body>
    </html>
  );
}
