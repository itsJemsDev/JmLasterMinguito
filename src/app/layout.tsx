import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/Particles";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export const metadata: Metadata = {
  title: "Jm Laster D. Minguito",
  description:
    "Portfolio of Jm Laster D. Minguito — IT Student & Developer.",
  icons: { icon: "/profile.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] overflow-x-hidden">
        <Particles />
        <Navbar />
        <ScrollRevealProvider>
          <main>{children}</main>
        </ScrollRevealProvider>
        <Footer />
      </body>
    </html>
  );
}
