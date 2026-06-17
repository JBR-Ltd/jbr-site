"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const scale = useTransform(scrollYProgress, [0,0.5,1], [0.92, 1, 1.03]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section ref={ref} style={{ background: "#0A0807", padding: "6rem 0 10rem", overflow: "hidden" }} className="section-pad">
      <motion.div style={{ scale, opacity, maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
        {/* Big cinematic CTA panel */}
        <div style={{ position: "relative", background: "#2A1C10", padding: "clamp(2.25rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", overflow: "hidden" }}>
          {/* Corner details */}
          {["top-left","top-right","bottom-left","bottom-right"].map(pos => (
            <div key={pos} style={{
              position: "absolute",
              ...(pos.includes("top") ? { top: 20 } : { bottom: 20 }),
              ...(pos.includes("left") ? { left: 20 } : { right: 20 }),
              width: 20, height: 20,
              borderTop: pos.includes("top") ? "1px solid rgba(201,133,62,0.6)" : "none",
              borderBottom: pos.includes("bottom") ? "1px solid rgba(201,133,62,0.6)" : "none",
              borderLeft: pos.includes("left") ? "1px solid rgba(201,133,62,0.6)" : "none",
              borderRight: pos.includes("right") ? "1px solid rgba(201,133,62,0.6)" : "none",
            }} />
          ))}

          {/* Radial glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,133,62,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <FadeIn><p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#C9853E" }}>Let's Build Together</p></FadeIn>

            <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2rem,4.5vw,3.6rem)", fontWeight:500, color: "#EDE6D6", maxWidth: 700 }}>
              Have a project? We're ready to listen.
            </TextReveal>

            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "rgba(237,230,214,0.8)", lineHeight: 1.85, maxWidth: 420, textAlign: "center" }}>
                Whether you're a business seeking a technology partner, or an investor looking to understand our vision, let's start a conversation.
              </p>
            </FadeIn>

            <FadeIn delay={0.35} style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/contact" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 36px", background: "#C9853E", color: "#EDE6D6", textDecoration: "none", transition: "all 0.35s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
                Get in Touch
              </a>
              <a href="/services" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 36px", border: "1px solid rgba(201,133,62,0.5)", color: "rgba(237,230,214,0.82)", textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(201,133,62,0.5)"; e.currentTarget.style.color="rgba(237,230,214,0.82)"; }}>
                View Services
              </a>
            </FadeIn>
          </div>
        </div>
      </motion.div>
    </section>
  );
}