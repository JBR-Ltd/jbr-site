"use client";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const services = [
  { num: "01", title: "Product Engineering", desc: "End-to-end design and development of web and mobile products built to scale from day one." },
  { num: "02", title: "Technology Consulting", desc: "Strategic guidance for businesses navigating digital transformation and architecture decisions." },
  { num: "03", title: "Venture Building", desc: "We ideate, validate, and build market-ready products in-house, Rello is proof of this model." },
  { num: "04", title: "Systems & Infrastructure", desc: "Robust backend systems, cloud architecture, and DevOps pipelines for reliable digital businesses." },
];

export default function ServicesTeaser() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="section-pad" style={{ background: "var(--b)", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)", width: "40vw", height: "40vw", maxWidth: 400, borderRadius: "50%", background: "radial-gradient(circle, var(--glow-primary-xs) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: 16 }}>
          <div>
            <FadeIn><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--p)", marginBottom: 14, textShadow: "0 0 10px var(--glow-primary-sm)" }}>What We Do</p></FadeIn>
            <FadeIn delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "var(--text-strong)" }}>Services that move things forward.</h2></FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <a href="/services" style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px 22px", border: "1px solid var(--border-primary-dim)", color: "var(--p)", textDecoration: "none", transition: "all 0.3s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--glow-primary-xs)"; e.currentTarget.style.borderColor = "var(--p)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border-primary-dim)"; }}>
              All Services
            </a>
          </FadeIn>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "var(--border-primary-xs)" }} className="srv-grid">
          {services.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.08}>
              <div
                onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}
                style={{ padding: "2.5rem 2rem", background: activeIdx === i ? "var(--glow-primary-xs)" : "var(--b)", transition: "background 0.3s", cursor: "default", position: "relative", overflow: "hidden" }}
              >
                {activeIdx === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--border-primary), transparent)", boxShadow: "0 0 8px var(--glow-primary-sm)" }} />}
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "var(--border-primary-dim)", letterSpacing: "0.2em", display: "block", marginBottom: 16 }}>{s.num}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600, color: activeIdx === i ? "var(--p)" : "var(--text-strong)", marginBottom: 10, transition: "color 0.3s", textShadow: activeIdx === i ? "0 0 20px var(--glow-primary-sm)" : "none" }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--text-body)", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`.srv-grid{@media(max-width:640px){grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}