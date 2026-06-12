"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Ventures", href: "/ventures" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(10,8,7,0.55)" : "rgba(10,8,7,0.25)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          borderBottom: scrolled ? "1px solid rgba(201,133,62,0.18)" : "1px solid rgba(201,133,62,0.08)",
          transition: "background 0.5s, border 0.5s",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <Image src="/logo.png" alt="JBR Limited" width={36} height={36} style={{ objectFit: "contain" }} priority />
            <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "1.05rem", letterSpacing: "0.15em", color: "#EDE6D6", fontWeight: 600 }}>
              JBR<span style={{ color: "#C9853E", marginLeft: 4, fontWeight: 400 }}>LIMITED</span>
            </span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden-mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "rgba(237,230,214,0.78)", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E89B4D")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,230,214,0.78)")}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, padding: "11px 26px", border: "1px solid #C9853E", color: "#EDE6D6", textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C9853E"; e.currentTarget.style.color = "#0A0807"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#EDE6D6"; }}>
              Get in Touch
            </Link>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "none", display: "flex", flexDirection: "column", gap: 6, padding: 8 }} className="show-mobile">
            {[0,1,2].map(i => (
              <motion.span key={i} animate={menuOpen ? (i===0?{rotate:45,y:8}:i===1?{opacity:0}:{rotate:-45,y:-8}) : {rotate:0,y:0,opacity:1}}
                style={{ display: "block", width: 24, height: 1, background: "#EDE6D6", transformOrigin: "center" }} />
            ))}
          </button>
        </div>
      </motion.header>

      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "#2A1C10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "2.4rem", fontWeight: 600, color: "#EDE6D6", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9853E")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#EDE6D6")}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}