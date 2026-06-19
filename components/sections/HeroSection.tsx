"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], ["0px", "-40px"]);

  return (
    <section ref={ref} style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden", background: "#050810" }}>

      {/* Ambient glow orbs — CSS only, zero JS cost */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "30vw", height: "30vw", maxWidth: 400, maxHeight: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,100,200,0.1) 0%, transparent 65%)", filter: "blur(40px)" }} />
        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
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
            <span style={{ display: "block", width: 24, height: 1, background: "#00D4FF", boxShadow: "0 0 6px rgba(0,212,255,0.6)" }} />
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#00D4FF", textShadow: "0 0 10px rgba(0,212,255,0.5)" }}>
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
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "rgba(232,244,255,0.6)", lineHeight: 1.8, maxWidth: 320 }}>
              JBR Limited builds enduring technology products and delivers transformative solutions across Africa and beyond.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
              <a href="/ventures"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "12px 28px", background: "#00D4FF", color: "#050810", textDecoration: "none", transition: "all 0.3s", boxShadow: "0 0 20px rgba(0,212,255,0.35)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 36px rgba(0,212,255,0.6)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Our Ventures
              </a>
              <a href="/about"
                style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, padding: "12px 28px", border: "1px solid rgba(0,212,255,0.4)", color: "#00D4FF", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; e.currentTarget.style.borderColor = "#00D4FF"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}>
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
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.52rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,212,255,0.4)", writingMode: "vertical-rl" }}>Scroll</span>
        <motion.div animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 44, background: "linear-gradient(to bottom, transparent, #00D4FF)", transformOrigin: "top", boxShadow: "0 0 6px rgba(0,212,255,0.4)" }} />
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
          color: #E8F4FF;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }
        .hero-headline-accent {
          color: #00D4FF;
          text-shadow: 0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2);
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