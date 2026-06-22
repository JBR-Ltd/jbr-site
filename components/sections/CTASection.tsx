"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.02]);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--b)", padding: "4rem 0 7rem" }}>
      <motion.div style={{ scale, maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ position: "relative", background: "var(--su)", border: "1px solid var(--border-primary-dim)", borderRadius: 16, padding: "clamp(2.5rem,8vw,6rem) clamp(1.5rem,6vw,5rem)", overflow: "hidden", boxShadow: "0 0 60px var(--glow-primary-xs), inset 0 0 60px rgba(201,133,62,0.02)" }}>
          {/* Glow orb */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "100%", background: "radial-gradient(ellipse, var(--glow-primary-xs) 0%, transparent 65%)", pointerEvents: "none" }} />
          {/* Top line */}
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, var(--border-primary), transparent)", boxShadow: "0 0 12px var(--glow-primary-sm)" }} />

          <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <FadeIn><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--p)", textShadow: "0 0 10px var(--glow-primary-sm)" }}>Let's Build Together</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4.5vw,3.5rem)", fontWeight: 700, color: "var(--text-strong)", maxWidth: 600, lineHeight: 1.15 }}>
                Have a project?<br /><span style={{ color: "var(--p)", textShadow: "0 0 30px var(--glow-primary-sm)" }}>We're ready to listen.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-body)", maxWidth: 400, lineHeight: 1.8, textAlign: "center" }}>Whether you're a business seeking a technology partner or an investor wanting to understand our vision, let's start a conversation.</p></FadeIn>
            <FadeIn delay={0.3} style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/contact" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "14px 32px", background: "var(--p)", color: "var(--b)", textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 24px var(--glow-primary-sm)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 40px var(--glow-primary)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 24px var(--glow-primary-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Get in Touch
              </a>
              <a href="/services" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "14px 32px", border: "1px solid var(--border-primary)", color: "var(--p)", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--glow-primary-xs)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                View Services
              </a>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </section>
  );
}