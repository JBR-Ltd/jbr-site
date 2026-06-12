"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const services = [
  { num: "01", title: "Product Engineering", desc: "End-to-end design and development of web and mobile products built to scale from day one." },
  { num: "02", title: "Technology Consulting", desc: "Strategic guidance for businesses navigating digital transformation, architecture decisions, and tech stack selection." },
  { num: "03", title: "Venture Building", desc: "We ideate, validate, and build market-ready products in-house, our real estate platform is proof of this." },
  { num: "04", title: "Systems & Infrastructure", desc: "Robust backend systems, cloud architecture, and DevOps pipelines that underpin reliable digital businesses." },
];

export default function ServicesTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["0%","12%"]);

  return (
    <section ref={ref} style={{ position: "relative", background: "#2A1C10", padding: "9rem 0", overflow: "hidden" }}>
      {/* Parallax texture bg */}
      <motion.div style={{ y: bgY, position: "absolute", inset: -80, background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(201,133,62,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
          <div>
            <FadeIn><p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E", marginBottom: 20 }}>What We Do</p></FadeIn>
            <TextReveal tag="h2" style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight:500, color: "#EDE6D6" }}>
              Services that move things forward.
            </TextReveal>
          </div>
          <FadeIn direction="left">
            <a href="/services" style={{ fontFamily: "Inter, sans-serif", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "12px 28px", border: "1px solid rgba(201,133,62,0.6)", color: "#EDE6D6", textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C9853E"; e.currentTarget.style.borderColor = "#C9853E"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,133,62,0.6)"; }}>
              All Services
            </a>
          </FadeIn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(201,133,62,0.2)" }} className="services-grid">
          {services.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.09} direction="up">
              <div style={{ background: "#2A1C10", padding: "2.5rem", transition: "background 0.4s" }} className="service-card"
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,133,62,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2A1C10")}>
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.9rem", color: "rgba(201,133,62,0.6)", letterSpacing: "0.2em", display: "block", marginBottom: 20 }}>{s.num}</span>
                <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "1.7rem", fontWeight: 400, color: "#EDE6D6", marginBottom: 14 }}>{s.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "rgba(237,230,214,0.45)", lineHeight: 1.85 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`.services-grid { @media(max-width:768px){grid-template-columns:1fr !important;} }`}</style>
    </section>
  );
}