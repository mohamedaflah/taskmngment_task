import type { Metadata } from "next";
import { Barlow as Inter, Questrial } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({
  weight: ["100", "500", "600", "200"],
  // weight: ["100", "400", "200"],
  subsets: ["latin"],
});
const quick = Questrial({
  weight: ["400"],
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
        <Toaster position="top-center" />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
