"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function VentureSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const logoRot  = useTransform(scrollYProgress, [0,1], ["-6deg","6deg"]);
  const textX    = useTransform(scrollYProgress, [0,1], ["-3%","3%"]);

  return (
    <section ref={ref} style={{ background: "#0A0807", padding: "9rem 0", overflow: "hidden", position: "relative" }} className="section-pad">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
        <FadeIn style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E" }}>Flagship Venture</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "5rem", alignItems: "center" }} className="venture-grid">
          {/* Visual panel, card drives its own height, no outer wrapper */}
          <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
            <motion.div
              style={{ rotate: logoRot, display: "flex", alignItems: "center", justifyContent: "center" }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1280/1024",
                background: "rgba(10,8,7,0.55)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                padding: "8%",
                
              }}>
                <Image
                  src="/rello-logo.svg"
                  alt="Rello"
                  fill
                  style={{ objectFit: "contain", padding: "10%" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Text panel */}
          <motion.div style={{ x: textX }}>
            <TextReveal tag="h2" delay={0.1} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight:500, color: "#EDE6D6", marginBottom: 24 }}>
              The real estate platform Africa deserves.
            </TextReveal>
            <FadeIn delay={0.3} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(237,230,214,0.82)", lineHeight: 1.9 }}>
                Our flagship venture is a technology-first real estate platform built for the African market, connecting buyers, sellers, and agents through a seamless, trustworthy digital experience.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(237,230,214,0.82)", lineHeight: 1.9 }}>
                From property discovery to transaction completion, we're replacing friction with clarity, and opacity with trust.
              </p>

              {/* Feature pills */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {["Property Search","Agent Verified","Secure Transactions","Market Analytics"].map(f => (
                  <span key={f} style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", border: "1px solid rgba(201,133,62,0.5)", color: "rgba(237,230,214,0.75)" }}>{f}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 24, marginTop: 8, flexWrap: "wrap" }}>
                <a href="/ventures" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "12px 28px", background: "#C9853E", color: "#EDE6D6", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
                  See the Platform
                </a>
                <a href="#" aria-label="Visit the Rello platform website" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(237,230,214,0.8)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#EDE6D6")} onMouseLeave={e => (e.currentTarget.style.color="rgba(237,230,214,0.8)")}>
                  Visit Site <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
                </a>
              </div>
            </FadeIn>
          </motion.div>
        </div>
      </div>
      <style>{`.venture-grid{@media(max-width:768px){grid-template-columns:1fr !important;gap:3rem !important;}}`}</style>
    </section>
  );
}