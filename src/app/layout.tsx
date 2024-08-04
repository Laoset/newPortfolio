import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kevin Corman - Web developer",
  description: "Portfolio of Alan Kevin Corman Samanamud - Web developer from Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen min-w-full flex flex-col dark:from-[#030a14] dark:to-[#161b21] bg-gradient-to-b from-[#f8f7fe] to-[#e0e0e0]`}>{children}</body>
    </html>
  );
}
