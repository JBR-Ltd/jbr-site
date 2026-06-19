"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

export interface ShowcaseCard {
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  accent?: string;
}

const ventureCards: ShowcaseCard[] = [
  { title: "Property Discovery", subtitle: "Find your perfect property", tag: "Feature", description: "Curated listings across Nigeria with verified data, high-resolution visuals, and neighbourhood intelligence." },
  { title: "Agent Verification", subtitle: "Trust every agent", tag: "Feature", description: "Every agent on the platform is identity-verified and performance-rated, no more guessing who to trust." },
  { title: "Secure Transactions", subtitle: "Safe from start to finish", tag: "Feature", description: "End-to-end transaction management with escrow-backed payment flows and digital documentation." },
  { title: "Market Analytics", subtitle: "Data-driven decisions", tag: "Feature", description: "Live pricing intelligence, neighbourhood trends, and investment metrics to make informed decisions." },
  { title: "Virtual Tours", subtitle: "View from anywhere", tag: "Feature", description: "Immersive 3D walkthroughs so you can view properties from anywhere in the world." },
  { title: "Developer Tools", subtitle: "Built for scale", tag: "Feature", description: "A dedicated portal for property developers to list, market, and sell new developments at scale." },
];

export default function VenturesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: "#050810", overflowX: "hidden" }}>
      {/* Hero */}
      <section 
        ref={heroRef} 
        className="hero-height"
        style={{ 
          position: "relative", 
          display: "flex", 
          alignItems: "flex-end", 
          overflow: "hidden" 
        }}
      >
        <motion.div style={{ y: heroY, position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "#050810" }} />
          <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "repeat(8,1fr)", gridTemplateRows: "repeat(6,1fr)", gap: 2, padding: 0, opacity: 0.12 }}>
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="grid-pulse"
                style={{
                  background: "#00D4FF",
                  animationDelay: `${(i % 12) * 0.18}s`,
                }}
              />
            ))}
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, rgba(0,0,0,0.9) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 3rem 7rem", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 28 }}>
            JBR Ventures
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, color: "#E8F4FF" }}>
            Our products,
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, fontStyle: "italic", color: "#00D4FF" }}>
            built to last.
          </TextReveal>
        </motion.div>
      </section>

      {/* Venture card, real estate platform */}
      <section style={{ padding: "9rem 0 4rem", background: "#050810" }} className="section-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
          <FadeIn style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 16 }}>Venture 01</p>
            <div className="hr-accent" />
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start", marginBottom: "2rem" }} className="venture-intro">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#00D4FF", fontWeight: 600 }}>Rello</span>
              </div>
              <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.9rem,3.5vw,3rem)", fontWeight: 500, color: "#E8F4FF", marginBottom: 24 }}>
                The Real Estate Platform
              </TextReveal>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {["Real Estate", "PropTech", "Nigeria", "2025"].map(t => (
                  <span key={t} style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", padding: "5px 12px", border: "1px solid rgba(0,212,255,0.5)", color: "rgba(232,244,255,0.82)" }}>{t}</span>
                ))}
              </div>
            </div>
            <FadeIn delay={0.2} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.82)", lineHeight: 1.95 }}>
                Africa's real estate market is vast, underserved by technology, and full of trust deficits. Our platform addresses all three, connecting buyers, sellers, agents, and developers in a single, trustworthy digital ecosystem.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.82)", lineHeight: 1.95 }}>
                We're not another listings site. We're infrastructure, the trusted layer on top of which the African property market can finally operate at its true potential.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                <a href="https://rello.online" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "12px 28px", background: "#00D4FF", color: "#E8F4FF", textDecoration: "none", transition: "all 0.35s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#E8F4FF"; e.currentTarget.style.color = "#050810"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#00D4FF"; e.currentTarget.style.color = "#E8F4FF"; }}>
                  Visit Platform
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`.venture-intro{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* Showcase Component */}
      <ShowcaseSwiper cards={ventureCards} heading="Core Ecosystem Features" eyebrow="Deep Dive" />

      {/* Future ventures teaser */}
      <section style={{ padding: "7rem 0 9rem", background: "#0A0F1E" }} className="section-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", textAlign: "center", display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
          <FadeIn><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF" }}>Coming Next</p></FadeIn>
          <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.9rem,3.5vw,2.9rem)", fontWeight: 500, color: "#E8F4FF", maxWidth: 600 }}>
            More ventures. Already in motion.
          </TextReveal>
          <FadeIn delay={0.2}><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(232,244,255,0.65)", maxWidth: 400, lineHeight: 1.85 }}>We're building more. We'll announce when the work is ready, not before.</p></FadeIn>
        </div>
      </section>

      {/* Global CSS Responsive Height Utility */}
      <style>{`
        .hero-height { min-height: 100vh; }
        @media (max-width: 768px) {
          .hero-height { min-height: 80vh !important; }
        }
      `}</style>
    </div>
  );
}

// ─── SWIPER SHOWCASE COMPONENT ───
interface ShowcaseSwiperProps {
  cards: ShowcaseCard[];
  heading?: string;
  eyebrow?: string;
}

function ShowcaseSwiper({ cards, heading, eyebrow }: ShowcaseSwiperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  
  const x = useMotionValue(0);

  const calculateBounds = () => {
    if (constraintsRef.current && containerRef.current) {
      const sliderWidth = constraintsRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const remainingDistance = containerWidth - sliderWidth;
      setMaxDrag(Math.min(0, remainingDistance));
    }
  };

  useEffect(() => {
    calculateBounds();
    window.addEventListener("resize", calculateBounds);
    return () => window.removeEventListener("resize", calculateBounds);
  }, [cards]);

  useEffect(() => {
    const currentX = x.get();
    if (currentX < maxDrag) {
      x.set(maxDrag);
    }
  }, [maxDrag, x]);

  const slide = (direction: "left" | "right") => {
    const cardStep = 364; 
    const currentX = x.get();
    const targetX = direction === "left" ? currentX + cardStep : currentX - cardStep;
    
    x.set(Math.max(maxDrag, Math.min(0, targetX)));
  };

  return (
    <section ref={containerRef} style={{ background: "#050810", padding: "6rem 0", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
        <div>
          {eyebrow && (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 14, textShadow: "0 0 10px rgba(0,212,255,0.4)" }}>
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#E8F4FF", margin: 0 }}>
              {heading}
            </h2>
          )}
        </div>

        {/* Navigation Arrows */}
        <div style={{ display: "flex", gap: 12, zIndex: 10 }}>
          <button onClick={() => slide("left")} aria-label="Previous slide" style={{ background: "transparent", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#00D4FF", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#00D4FF"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={() => slide("right")} aria-label="Next slide" style={{ background: "transparent", border: "1px solid rgba(0,212,255,0.2)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#00D4FF", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#00D4FF"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Swiper Track Container */}
      <div style={{ paddingLeft: "max(3rem, calc((100vw - 1280px) / 2 + 3rem))", overflow: "visible", width: "100%" }}>
        <motion.div 
          ref={constraintsRef}
          drag="x"
          dragConstraints={{ right: 0, left: maxDrag }}
          dragElastic={0.15}
          style={{ x, display: "flex", gap: 24, cursor: "grab", width: "max-content", paddingRight: "max(3rem, calc((100vw - 1280px) / 2 + 3rem))" }}
          whileTap={{ cursor: "grabbing" }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
        >
          {cards.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── REUSABLE FEATURE CARD COMPONENT ───
function FeatureCard({ card, index }: { card: ShowcaseCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = card.accent || "#00D4FF";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        width: "clamp(290px, 24vw, 340px)",
        flexShrink: 0,
        userSelect: "none"
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "380px",
          background: hovered ? "rgba(13,21,40,0.95)" : "rgba(13,21,40,0.85)",
          border: `1px solid ${hovered ? accent : "rgba(0,212,255,0.12)"}`,
          borderRadius: 16,
          padding: "2.5rem 2rem",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s, border 0.4s",
          boxShadow: hovered
            ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.08)`
            : `0 8px 32px rgba(0,0,0,0.4)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: hovered ? `linear-gradient(90deg, transparent, ${accent}, transparent)` : "transparent",
            transition: "background 0.4s",
            boxShadow: hovered ? `0 0 12px ${accent}` : "none",
          }}
        />

        <div style={{ fontFamily: "var(--font-display)", fontSize: "2.75rem", fontWeight: 700, color: "rgba(0,212,255,0.06)", lineHeight: 1, marginBottom: 20 }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "4px 10px", border: `1px solid ${accent}30`, borderRadius: 4, width: "fit-content" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}`, display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent }}>{card.tag}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 700, color: "#E8F4FF", marginBottom: 8, lineHeight: 1.25 }}>{card.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#00D4FF", marginBottom: 16, fontWeight: 600 }}>{card.subtitle}</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(232,244,255,0.6)", lineHeight: 1.75, margin: 0 }}>{card.description}</p>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${accent}40, transparent)` : "transparent", transition: "background 0.4s" }} />
      </div>
    </motion.div>
  );
}