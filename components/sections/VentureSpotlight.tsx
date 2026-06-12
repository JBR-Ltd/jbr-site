"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function VentureSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const logoRot = useTransform(scrollYProgress, [0, 1], ["-6deg", "6deg"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section ref={ref} style={{ background: "#0A0807", padding: "9rem 0", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
        <FadeIn style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E" }}>Flagship Venture</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "5rem", alignItems: "center" }} className="venture-grid">
          {/* Visual panel — refined to focus on the logo card */}
          <div style={{ position: "relative", aspectRatio: "1/1", maxWidth: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Decorative grid lines layer */}
            <motion.div
              style={{
                y: gridY,
                position: "absolute",
                inset: "-10%",
                opacity: 0.15,
                pointerEvents: "none",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(237,230,214,0.4) 39px, rgba(237,230,214,0.4) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(237,230,214,0.4) 39px, rgba(237,230,214,0.4) 40px)",
              }}
            />

            {/* Border frame */}
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(201,133,62,0.3)", borderRadius: 4, pointerEvents: "none" }} />

            {/* Floating Rello logo card — the focal point */}
            <motion.div
              style={{ rotate: logoRot, width: "100%", padding: "10%" }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                position: "relative",
                aspectRatio: "1280/1024",
                background: "rgba(10,8,7,0.55)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(201,133,62,0.35)",
                borderRadius: 8,
                padding: "15%",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}>
                <Image
                  src="/rello-logo.svg"
                  alt="Rello"
                  fill
                  style={{ objectFit: "contain", padding: "10%" }}
                />
              </div>
            </motion.div>

            {/* Corner accents */}
            {["top-left", "top-right", "bottom-left", "bottom-right"].map(pos => (
              <div key={pos} style={{
                position: "absolute",
                ...(pos.includes("top") ? { top: -1 } : { bottom: -1 }),
                ...(pos.includes("left") ? { left: -1 } : { right: -1 }),
                width: 18, height: 18,
                borderTop: pos.includes("top") ? "2px solid #C9853E" : "none",
                borderBottom: pos.includes("bottom") ? "2px solid #C9853E" : "none",
                borderLeft: pos.includes("left") ? "2px solid #C9853E" : "none",
                borderRight: pos.includes("right") ? "2px solid #C9853E" : "none",
              }} />
            ))}

            {/* Status badge */}
            <div style={{
              position: "absolute", bottom: -18, right: 16,
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px",
              background: "#0A0807",
              border: "1px solid rgba(201,133,62,0.4)",
              borderRadius: 2,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9853E", display: "inline-block" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#EDE6D6" }}>Live 2026</span>
            </div>
          </div>

          {/* Text panel */}
          <motion.div style={{ x: textX }}>
            <TextReveal tag="h2" delay={0.1} style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight: 500, color: "#EDE6D6", marginBottom: 24 }}>
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
                {["Property Search", "Agent Verified", "Secure Transactions", "Market Analytics"].map(f => (
                  <span key={f} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", border: "1px solid rgba(201,133,62,0.5)", color: "rgba(237,230,214,0.6)" }}>{f}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 24, marginTop: 8, flexWrap: "wrap" }}>
                <a href="/ventures" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "12px 28px", background: "#C9853E", color: "#EDE6D6", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#EDE6D6"; e.currentTarget.style.color = "#0A0807"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#C9853E"; e.currentTarget.style.color = "#EDE6D6"; }}>
                  See the Platform
                </a>
                <a href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(237,230,214,0.45)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#EDE6D6")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,230,214,0.45)")}>
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