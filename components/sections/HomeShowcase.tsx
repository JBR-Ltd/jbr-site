
"use client";
import StackedCardSlider from "@/components/ui/StackedCardSlider";
import FadeIn from "@/components/ui/FadeIn";

const cards = [
  { num: "01", title: "Rello", sub: "Real Estate Platform", tag: "Venture", body: "A technology-first real estate platform built for the African market, connecting buyers, sellers, and agents.", accent: "#00D4FF" },
  { num: "02", title: "Product Engineering", sub: "End-to-end builds", tag: "Service", body: "From concept to deployed, scalable system. We own the full process with no hand-offs.", accent: "#00AADD" },
  { num: "03", title: "Tech Consulting", sub: "Strategy & architecture", tag: "Service", body: "Strategic guidance for digital transformation, architecture decisions, and technology selection.", accent: "#0088BB" },
  { num: "04", title: "Venture Building", sub: "Co-founder model", tag: "Service", body: "We ideate, validate, and build market-ready products, partnering with founders who have the domain.", accent: "#0066AA" },
  { num: "05", title: "Systems & Infra", sub: "Scale with confidence", tag: "Service", body: "Cloud architecture, CI/CD, and observability pipelines that underpin reliable digital businesses.", accent: "#004499" },
];

function Card({ num, title, sub, tag, body, accent }: typeof cards[0]) {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #0A0F1E 0%, #050810 100%)", border: `1px solid ${accent}30`, borderRadius: 16, padding: "2rem", display: "flex", flexDirection: "column", gap: 12, boxShadow: `0 0 40px ${accent}10` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: `${accent}18`, lineHeight: 1 }}>{num}</span>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${accent}40`, color: accent, borderRadius: 4 }}>{tag}</span>
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#E8F4FF", marginBottom: 4, textShadow: `0 0 20px ${accent}30` }}>{title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: accent, fontWeight: 600 }}>{sub}</p>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(232,244,255,0.65)", lineHeight: 1.75, flex: 1 }}>{body}</p>
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}50, transparent)` }} />
    </div>
  );
}

export default function HomeShowcase() {
  return (
    <section className="section-pad" style={{ background: "#050810", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "50%", background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <FadeIn style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 14, textShadow: "0 0 10px rgba(0,212,255,0.4)" }}>What We Build</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: "#E8F4FF" }}>Products and services that define the next era.</h2>
        </FadeIn>
        <StackedCardSlider>
          {cards.map(c => <Card key={c.num} {...c} />)}
        </StackedCardSlider>
      </div>
    </section>
  );
}