"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0px", "-40px"]);

  return (
    <section ref={ref} style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden", background: "var(--b)" }}>

      {/* Ambient glow orbs — CSS only, zero JS cost */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, var(--glow-primary-xs) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,133,62,0.05) 0%, transparent 65%)", filter: "blur(40px)" }} />
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border-primary-xs) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary-xs) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Content — centered on mobile, bottom-left on desktop */}
      <motion.div
        style={{ opacity, y, position: "absolute", inset: 0, display: "flex", flexDirection: "column", zIndex: 2 }}
        className="hero-content-wrap"
      >
        {/* Desktop: bottom-left. Mobile: center */}
        <div className="hero-inner">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
          >
            <span style={{ display: "block", width: 24, height: 1, background: "var(--p)", boxShadow: "0 0 6px var(--glow-primary)" }} />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--p)", textShadow: "0 0 10px var(--glow-primary-sm)" }}>
              Technology · Ventures · Infrastructure
            </p>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline"
            >
              Building What
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="hero-headline hero-headline-accent"
            >
              Endures.
            </motion.h1>
          </div>

          {/* Sub + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-sub"
          >
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.8, maxWidth: 320 }}>
              JBR Limited builds enduring technology products and delivers transformative solutions across Africa and beyond.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
              <a href="/ventures"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "12px 28px", background: "var(--p)", color: "var(--b)", textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 20px var(--glow-primary-sm)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 36px var(--glow-primary)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px var(--glow-primary-sm)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Our Ventures
              </a>
              <a href="/about"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "12px 28px", border: "1px solid var(--border-primary)", color: "var(--p)", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--glow-primary-xs)"; e.currentTarget.style.borderColor = "var(--p)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border-primary)"; }}>
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{ position: "absolute", bottom: 28, right: 28, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.52rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text-dim)", writingMode: "vertical-rl" }}>Scroll</span>
        <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 44, background: "linear-gradient(to bottom, transparent, var(--p))", transformOrigin: "top", boxShadow: "0 0 6px var(--glow-primary-sm)" }} />
      </motion.div>

      <style>{`
        .hero-content-wrap {
          justify-content: flex-end;
          padding: 0 3rem 4rem;
        }
        .hero-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
        }
        .hero-headline {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 700;
          color: var(--text-strong);
          line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .hero-headline-accent {
          color: var(--p);
          font-style: italic;
          margin-bottom: 28px;
        }
        .hero-sub { max-width: 480px; }
        @media (max-width: 768px) {
          .hero-content-wrap {
            justify-content: center !important;
            align-items: center !important;
            padding: 5rem 1.5rem 2rem !important;
            text-align: center;
          }
          .hero-inner { display: flex; flex-direction: column; align-items: center; }
          .hero-headline { font-size: clamp(2.4rem, 10vw, 3.5rem) !important; text-align: center; }
          .hero-sub { max-width: 100%; text-align: center; }
          .hero-sub > div { justify-content: center; }
        }
      `}</style>
    </section>
  );
}