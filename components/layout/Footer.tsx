"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cols = {
  Company: [["About Us","/about"],["Ventures","/ventures"],["Services","/services"],["Careers","#"]],
  Connect:  [["Contact","/contact"],["LinkedIn","#"],["Twitter / X","#"],["Instagram","#"]],
  Legal:    [["Privacy Policy","#"],["Terms of Use","#"]],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref} style={{ position: "relative", background: "#0A0F1E", borderTop: "1px solid rgba(0,212,255,0.12)", overflow: "hidden" }}>
      {/* Ghost text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "16vw", fontWeight: 700, color: "rgba(0,212,255,0.03)", whiteSpace: "nowrap", userSelect: "none" }}>JBR LIMITED</span>
      </div>
      {/* Top glow line */}
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "5rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", marginBottom: "4rem" }} className="footer-grid">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <Image src="/logo.png" alt="JBR Limited" width={32} height={32} style={{ objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(0,212,255,0.4))" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", letterSpacing: "0.15em", color: "#E8F4FF", fontWeight: 600 }}>JBR<span style={{ color: "#00D4FF", marginLeft: 4, fontWeight: 400 }}>LIMITED</span></span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(232,244,255,0.5)", lineHeight: 1.8, maxWidth: 260 }}>Building tomorrow's infrastructure through technology, vision, and deliberate craft. Lagos, Nigeria.</p>
            <div className="hr-accent" style={{ marginTop: 24 }} />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {Object.entries(cols).map(([cat, items], gi) => (
              <motion.div key={cat} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 + gi * 0.07 }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, color: "#00D4FF", marginBottom: 14 }}>{cat}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(([label, href]) => (
                    <li key={label}><Link href={href} style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "rgba(232,244,255,0.55)", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#00D4FF")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,244,255,0.55)")}>{label}</Link></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.4 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid rgba(0,212,255,0.08)", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "rgba(232,244,255,0.3)" }}>© {new Date().getFullYear()} JBR Limited. All rights reserved.</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "rgba(232,244,255,0.3)" }}>Designed & built with intent.</p>
        </motion.div>
      </div>
      <style>{`.footer-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
    </footer>
  );
}