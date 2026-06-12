"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function VentureSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const imgY = useTransform(scrollYProgress, [0,1], ["-8%","8%"]);
  const textX = useTransform(scrollYProgress, [0,1], ["-3%","3%"]);

  return (
    <section ref={ref} style={{ background: "#0A0807", padding: "9rem 0", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
        <FadeIn style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E" }}>Flagship Venture</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="venture-grid">
          {/* Visual panel */}
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5", background: "#2A1C10" }}>
            {/* Rello background image with parallax */}
            <motion.div style={{ y: imgY, position: "absolute", inset: "-12%" }}>
              <Image
                src="/rello.jpeg"
                alt="Rello platform"
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>
            {/* Dark gradient overlay for legibility */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,7,0.15) 0%, rgba(10,8,7,0.65) 100%)" }} />
            {/* Rello platform logo badge */}
            <div style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(10,8,7,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(201,133,62,0.4)" }}>
              <Image src="/rello.jpeg" alt="Rello" width={28} height={28} style={{ objectFit: "contain" }} />
              <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.78rem", letterSpacing: "0.1em", fontWeight: 600, color: "#EDE6D6" }}>Rello</span>
            </div>
            {/* Badge */}
            <div style={{ position: "absolute", bottom: 24, left: 24, padding: "10px 18px", background: "rgba(10,8,7,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(201,133,62,0.4)" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#EDE6D6" }}>Live 2026</span>
            </div>
          </div>

          {/* Text panel */}
          <motion.div style={{ x: textX }}>
            <TextReveal tag="h2" delay={0.1} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight:500, color: "#EDE6D6", marginBottom: 24 }}>
              The real estate platform Africa deserves.
            </TextReveal>
            <FadeIn delay={0.3} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(237,230,214,0.5)", lineHeight: 1.9 }}>
                Our flagship venture is a technology-first real estate platform built for the African market, connecting buyers, sellers, and agents through a seamless, trustworthy digital experience.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: "rgba(237,230,214,0.5)", lineHeight: 1.9 }}>
                From property discovery to transaction completion, we're replacing friction with clarity, and opacity with trust.
              </p>

              {/* Feature pills */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {["Property Search","Agent Verified","Secure Transactions","Market Analytics"].map(f => (
                  <span key={f} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", border: "1px solid rgba(201,133,62,0.5)", color: "rgba(237,230,214,0.6)" }}>{f}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 24, marginTop: 8, flexWrap: "wrap" }}>
                <a href="/ventures" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "12px 28px", background: "#C9853E", color: "#EDE6D6", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
                  See the Platform
                </a>
                <a href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(237,230,214,0.45)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#EDE6D6")} onMouseLeave={e => (e.currentTarget.style.color="rgba(237,230,214,0.45)")}>
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