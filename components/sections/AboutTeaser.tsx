"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const stats = [
  { value: "01", label: "Flagship Venture", sub: "Rello, Real Estate" },
  { value: "∞",  label: "Ambition",         sub: "Limitless by design" },
  { value: "NG", label: "Origin",            sub: "Lagos, Nigeria"      },
];

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--b)", position: "relative", overflow: "hidden" }}>
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-primary-xs) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary-xs) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      <motion.div style={{ x: lineX, position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--border-primary-dim), transparent)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--p)", marginBottom: 40, textShadow: "0 0 10px var(--glow-primary-sm)" }}>Who We Are</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "4rem" }} className="two-col">
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "var(--text-strong)", lineHeight: 1.1 }}>
              A company built to<br /><span style={{ color: "var(--p)", textShadow: "0 0 30px var(--glow-primary-sm)" }}>outlast trends.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.85 }}>JBR Limited was founded on a simple premise: the best technology companies don't just build products, they construct foundations. We operate at the intersection of engineering rigour and commercial clarity.</p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.85 }}>Our first venture enters the African real estate market with a platform designed to bring transparency, trust, and efficiency to property transactions.</p>
            <a href="/about" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--p)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginTop: 8, width: "fit-content", transition: "gap 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.gap = "14px")} onMouseLeave={e => (e.currentTarget.style.gap = "8px")}>
              Full Story <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            </a>
          </FadeIn>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "var(--border-primary-xs)" }} className="stats-grid">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div style={{ padding: "2rem 1.5rem", background: "var(--b)", borderTop: "1px solid var(--border-primary-dim)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "var(--p)", display: "block", textShadow: "0 0 20px var(--glow-primary-sm)" }}>{s.value}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-strong)", display: "block", marginTop: 4 }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: 4 }}>{s.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        .two-col { @media(max-width:768px){grid-template-columns:1fr !important;gap:2rem !important;} }
        .stats-grid { @media(max-width:640px){grid-template-columns:1fr !important;} }
      `}</style>
    </section>
  );
}