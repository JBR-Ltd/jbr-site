import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import LenisProvider from "@/components/layout/LenisProvider";
import GlobalScene from "@/components/three/GlobalScene";
import Loader from "@/components/ui/Loader";

export const metadata: Metadata = {
  title: "JBR Limited • Building What Endures",
  description: "JBR Limited is a technology company building enduring products and delivering transformative solutions across Africa and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <Loader />

        {/* Fixed 3D scene lives behind everything, persists across all pages */}
        <GlobalScene />

        <Cursor />
        <LenisProvider />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}