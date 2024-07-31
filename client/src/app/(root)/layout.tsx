import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo management",
  description: "Trello like todo app ",
  applicationName:"Todo"
};

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <main className="h-screen w-full flex bg-[#F7F7F7] ">
      {sidebar}
      {children}
    </main>
  );
}