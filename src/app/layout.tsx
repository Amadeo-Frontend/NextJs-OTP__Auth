import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const inter = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amadeo Bon | Portfolio",
  description: "Portfolio para apresentação de projetos frontend com login em OTP. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
