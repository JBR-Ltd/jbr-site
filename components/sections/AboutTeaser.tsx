"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const stats = [
  { value: "01", label: "Flagship Venture", sub: "Real Estate Platform" },
  { value: "∞",  label: "Ambition",         sub: "Limitless by design"   },
  { value: "NG", label: "Origin",            sub: "Lagos, Nigeria"        },
];

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const x1 = useTransform(scrollYProgress, [0,1], ["-4%","4%"]);
  const x2 = useTransform(scrollYProgress, [0,1], ["4%","-4%"]);

  return (
    <section ref={ref} style={{ position: "relative", background: "#0A0807", padding: "9rem 0", overflow: "hidden" }} className="section-pad">
      <motion.div style={{ x: x1, position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,133,62,0.5), transparent)" }} />
      <motion.div style={{ x: x2, position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,133,62,0.25), transparent)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
        <FadeIn><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E", marginBottom: 48 }}>Who We Are</p></FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "6rem" }} className="two-col">
          <TextReveal tag="h2" delay={0.1} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight:500, color: "#EDE6D6" }}>
            A company built to outlast trends.
          </TextReveal>
          <FadeIn direction="left" delay={0.3} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 20 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(237,230,214,0.82)", lineHeight: 1.9 }}>
              JBR Limited was founded on a simple premise: the best technology companies don't just build products, they construct foundations. We operate at the intersection of engineering rigour and commercial clarity.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(237,230,214,0.82)", lineHeight: 1.9 }}>
              Our first venture enters the African real estate market with a platform designed to bring transparency, trust, and efficiency to property transactions.
            </p>
            <div className="hr-accent" />
            <a href="/about" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(237,230,214,0.72)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10, width: "fit-content", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#EDE6D6")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(237,230,214,0.72)")}>
              Full Story <span style={{ display: "inline-block", width: 20, height: 1, background: "currentColor" }} />
            </a>
          </FadeIn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", borderTop: "1px solid rgba(201,133,62,0.2)", paddingTop: 48 }} className="stats-grid">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={0.1 + i * 0.12} direction="up">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight:500, color: "#EDE6D6" }}>{s.value}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9853E" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(237,230,214,0.58)" }}>{s.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        .two-col { @media (max-width:768px){grid-template-columns:1fr !important;} }
        .stats-grid { @media (max-width:640px){grid-template-columns:1fr !important; gap:1.5rem !important;} }
      `}</style>
    </section>
  );
}