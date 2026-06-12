"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cols = {
  Company: [["About Us","/about"],["Ventures","/ventures"],["Services","/services"],/*["Careers","#"]*/],
  Connect:  [["Contact","/contact"],["LinkedIn","https://www.linkedin.com/company/rello-jbr/"],["X","https://x.com/rello_online"],["Instagram","https://www.instagram.com/rello.jbr?utm_source=qr"], ["Facebook", "https://www.facebook.com/profile.php?id=61590472272578"]],
  Legal:    [["Privacy Policy","#"],["Terms of Use","#"]],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer ref={ref} style={{ position: "relative", background: "#2A1C10", borderTop: "1px solid rgba(201,133,62,0.15)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
        <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "16vw", fontWeight: 700, color: "rgba(201,133,62,0.05)", whiteSpace: "nowrap", userSelect: "none" }}>JBR LIMITED</span>
      </div>
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "6rem 3rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "4rem", marginBottom: "5rem" }} className="footer-grid">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Image src="/logo.png" alt="JBR Limited" width={36} height={36} style={{ objectFit: "contain" }} />
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "1rem", letterSpacing: "0.15em", color: "#EDE6D6", fontWeight: 600 }}>JBR<span style={{ color: "#C9853E", marginLeft: 4, fontWeight: 400 }}>LIMITED</span></span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(237,230,214,0.5)", lineHeight: 1.8, maxWidth: 260 }}>Building tomorrow&apos;s infrastructure through technology, vision, and deliberate craft. Lagos, Nigeria.</p>
            <div className="hr-accent" style={{ marginTop: 28 }} />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {Object.entries(cols).map(([cat, items], gi) => (
              <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + gi * 0.08 }}>
                <p style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, color: "#C9853E", marginBottom: 16 }}>{cat}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(([label, href]) => (
                    <li key={label}><Link href={href} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "rgba(237,230,214,0.55)", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#EDE6D6")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,230,214,0.55)")}>{label}</Link></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.5 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid rgba(201,133,62,0.1)", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(237,230,214,0.32)" }}>© {new Date().getFullYear()} JBR Limited. All rights reserved.</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "rgba(237,230,214,0.32)" }}>Designed & built with intent.</p>
        </motion.div>
      </div>
      <style>{`.footer-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  );
}