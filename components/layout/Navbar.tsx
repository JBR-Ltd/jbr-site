"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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

  // Close menu on nav
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(10,8,7,0.7)" : "rgba(10,8,7,0.2)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: scrolled ? "1px solid var(--border-primary)" : "1px solid var(--border-primary-xs)",
          transition: "background 0.5s, border 0.5s",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ position: "relative" }}>
              <Image src="/logo.png" alt="JBR Limited" width={32} height={32} style={{ objectFit: "contain", filter: "drop-shadow(0 0 6px var(--glow-primary-sm))" }} priority />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.15em", color: "var(--text-strong)", fontWeight: 600 }}>
              JBR<span style={{ color: "var(--p)", marginLeft: 4, fontWeight: 400, textShadow: "0 0 12px var(--glow-primary)" }}>LIMITED</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: pathname === l.href ? "var(--p)" : "var(--text-body)", textDecoration: "none", transition: "color 0.3s", textShadow: pathname === l.href ? "0 0 12px var(--glow-primary)" : "none" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--p)"; e.currentTarget.style.textShadow = "0 0 12px var(--glow-primary)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = pathname === l.href ? "var(--p)" : "var(--text-body)"; e.currentTarget.style.textShadow = pathname === l.href ? "0 0 12px var(--glow-primary)" : "none"; }}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact"
              style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, padding: "9px 22px", border: "1px solid var(--border-primary)", color: "var(--p)", textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 12px var(--glow-primary-xs)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--p)"; e.currentTarget.style.color = "var(--b)"; e.currentTarget.style.boxShadow = "0 0 24px var(--glow-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--p)"; e.currentTarget.style.boxShadow = "0 0 12px var(--glow-primary-xs)"; }}>
              Get in Touch
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 8 }} className="show-mobile">
            {[0,1,2].map(i => (
              <motion.span key={i}
                animate={menuOpen ? (i===0?{rotate:45,y:7}:i===1?{opacity:0}:{rotate:-45,y:-7}) : {rotate:0,y:0,opacity:1}}
                style={{ display: "block", width: 22, height: 1, background: "var(--p)", boxShadow: "0 0 6px var(--glow-primary)", transformOrigin: "center" }} />
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
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(10,8,7,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36 }}>
            {/* Glow orb */}
            <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, var(--glow-primary-xs) 0%, transparent 70%)", pointerEvents: "none" }} />
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "var(--text-strong)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s, text-shadow 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--p)"; e.currentTarget.style.textShadow = "0 0 30px var(--glow-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--text-strong)"; e.currentTarget.style.textShadow = "none"; }}>
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