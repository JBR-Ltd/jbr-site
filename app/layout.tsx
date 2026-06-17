import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import LenisProvider from "@/components/layout/LenisProvider";
import GlobalScene from "@/components/three/GlobalScene";
import Loader from "@/components/ui/Loader";

// next/font self-hosts + preloads these no render-blocking Google Fonts
// request, no CSS @import. Subsets are downloaded at build time.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JBR Limited • Building What Endures",
  description: "JBR Limited is a technology company building enduring products and delivering transformative solutions across Africa and beyond.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {/* Preload so the Loader's logo reveal has no fetch delay without
            this, the <motion.image> inside Loader.tsx only starts
            downloading once its JS phase fires, adding latency right in
            the most LCP-sensitive window. */}
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body className="noise">
        <Loader />

        {/* Fixed 3D scene homepage + desktop only, see GlobalScene.tsx */}
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