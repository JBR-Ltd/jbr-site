"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.55], ["0px", "-50px"]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        // No background, the GlobalScene fixed layer shows through
      }}
    >
      {/* Overlay gradients, hero gets deeper vignette than other sections */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.72) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 55%)",
      }} />

      {/* Hero content */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 3rem 4.5rem",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.63rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "#C9853E",
              marginBottom: 22,
            }}
          >
            Technology · Ventures · Infrastructure
          </motion.p>

          <TextReveal tag="h1" delay={0.5} style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "clamp(2.8rem, 6.5vw, 6.2rem)",
            fontWeight: 500,
            color: "#EDE6D6",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
          }}>
            Building What
          </TextReveal>
          <TextReveal tag="h1" delay={0.62} style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: "clamp(2.8rem, 6.5vw, 6.2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#C9853E",
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            marginBottom: 40,
          }}>
            Endures.
          </TextReveal>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex", flexWrap: "wrap", alignItems: "flex-end",
              gap: "1.5rem 3.5rem", pointerEvents: "all",
            }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "0.82rem",
              color: "rgba(237,230,214,0.55)", maxWidth: 290, lineHeight: 1.85,
            }}>
              JBR Limited is a technology company building enduring products and
              delivering transformative solutions across Africa and beyond.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <a href="/ventures" style={{
                fontFamily: "Inter, sans-serif", fontSize: "0.66rem", letterSpacing: "0.35em",
                textTransform: "uppercase", padding: "12px 28px", background: "#C9853E",
                color: "#EDE6D6", textDecoration: "none", transition: "background 0.3s, color 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
                Our Ventures
              </a>
              <a href="/about" style={{
                fontFamily: "Inter, sans-serif", fontSize: "0.66rem", letterSpacing: "0.35em",
                textTransform: "uppercase", color: "rgba(237,230,214,0.55)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 10, transition: "color 0.3s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color="#EDE6D6")}
                onMouseLeave={e => (e.currentTarget.style.color="rgba(237,230,214,0.55)")}>
                Learn More
                <span style={{ display: "inline-block", width: 28, height: 1, background: "currentColor" }} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute", bottom: 28, right: 44, zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}
      >
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: "0.56rem", letterSpacing: "0.4em",
          textTransform: "uppercase", color: "rgba(237,230,214,0.3)", writingMode: "vertical-rl",
        }}>Scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 52,
            background: "linear-gradient(to bottom, transparent, #C9853E)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}