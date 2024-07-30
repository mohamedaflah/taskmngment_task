import type { Metadata } from "next";
import { Barlow as Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({
  weight: ["100", "500", "600", "200"],
  // weight: ["100", "400", "200"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo management",
  description: "Trello like todo app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " overflow-hidden"}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
