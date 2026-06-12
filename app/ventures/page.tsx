"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const features = [
  { title: "Property Discovery", desc: "Curated listings across Nigeria with verified data, high-resolution visuals, and neighbourhood intelligence." },
  { title: "Agent Verification", desc: "Every agent on the platform is identity-verified and performance-rated, no more guessing who to trust." },
  { title: "Secure Transactions", desc: "End-to-end transaction management with escrow-backed payment flows and digital documentation." },
  { title: "Market Analytics", desc: "Live pricing intelligence, neighbourhood trends, and investment metrics to make informed decisions." },
  { title: "Virtual Tours", desc: "Immersive 3D walkthroughs so you can view properties from anywhere in the world." },
  { title: "Developer Tools", desc: "A dedicated portal for property developers to list, market, and sell new developments at scale." },
];

export default function VenturesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const heroY = useTransform(scrollYProgress,[0,1],["0%","28%"]);
  const heroOpacity = useTransform(scrollYProgress,[0,0.6],[1,0]);

  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: gridProgress } = useScroll({ target: gridRef, offset:["start end","end start"] });
  const gridY = useTransform(gridProgress,[0,1],["-4%","4%"]);

  return (
    <div style={{ background:"#0A0807" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <motion.div style={{ y:heroY, position:"absolute", inset:0 }}>
          <div style={{ position:"absolute", inset:0, background:"#0A0807" }} />
          {/* Animated grid of property squares */}
          <div style={{ position:"absolute", inset:0, display:"grid", gridTemplateColumns:"repeat(8,1fr)", gridTemplateRows:"repeat(6,1fr)", gap:2, padding:0, opacity:0.12 }}>
            {Array.from({length:48}).map((_,i) => (
              <motion.div key={i} style={{ background:"#C9853E" }}
                initial={{ opacity:0 }} animate={{ opacity:[0,1,0.4][i%3] }}
                transition={{ delay: i*0.04, duration:2, repeat:Infinity, repeatType:"reverse", ease:"easeInOut" }} />
            ))}
          </div>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, rgba(0,0,0,0.9) 100%)" }} />
        </motion.div>

        <motion.div style={{ opacity:heroOpacity, position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 3rem 7rem", width:"100%" }}>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:0.3,ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:28 }}>
            JBR Ventures
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, color:"#EDE6D6" }}>
            Our products,
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, fontStyle:"italic", color:"#C9853E" }}>
            built to last.
          </TextReveal>
        </motion.div>
      </section>

      {/* Venture card, real estate platform */}
      <section style={{ padding:"9rem 0", background:"#0A0807" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <FadeIn style={{ marginBottom:64 }}>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:16 }}>Venture 01</p>
            <div className="hr-accent" />
          </FadeIn>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start", marginBottom:"6rem" }} className="venture-intro">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <Image src="/rello.jpeg" alt="Rello" width={44} height={44} style={{ objectFit: "contain" }} />
                <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9853E", fontWeight: 600 }}>Rello</span>
              </div>
              <TextReveal tag="h2" style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(1.9rem,3.5vw,3rem)", fontWeight:500, color:"#EDE6D6", marginBottom:24 }}>
                The Real Estate Platform
              </TextReveal>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
                {["Real Estate","PropTech","Nigeria","2026"].map(t => (
                  <span key={t} style={{ fontFamily:"Inter,sans-serif", fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", padding:"5px 12px", border:"1px solid rgba(201,133,62,0.5)", color:"rgba(237,230,214,0.5)" }}>{t}</span>
                ))}
              </div>
            </div>
            <FadeIn delay={0.2} style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.88rem", color:"rgba(237,230,214,0.5)", lineHeight:1.95 }}>
                Africa's real estate market is vast, underserved by technology, and full of trust deficits. Our platform addresses all three, connecting buyers, sellers, agents, and developers in a single, trustworthy digital ecosystem.
              </p>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.88rem", color:"rgba(237,230,214,0.5)", lineHeight:1.95 }}>
                We're not another listings site. We're infrastructure, the trusted layer on top of which the African property market can finally operate at its true potential.
              </p>
              <div style={{ display:"flex", gap:16, marginTop:8, flexWrap:"wrap" }}>
                <a href="#" style={{ fontFamily:"Inter,sans-serif", fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", padding:"12px 28px", background:"#C9853E", color:"#EDE6D6", textDecoration:"none", transition:"all 0.35s" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
                  Visit Platform
                </a>
                <span style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"12px 16px", color:"rgba(201,133,62,0.8)", display:"flex", alignItems:"center" }}>
                  Live · 2025
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Feature grid */}
          <div ref={gridRef} style={{ position:"relative" }}>
            <motion.div style={{ y:gridY }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(201,133,62,0.2)" }} className="feat-grid">
                {features.map((f, i) => (
                  <FadeIn key={f.title} delay={i * 0.07}>
                    <div style={{ padding:"2.4rem", background:"#0A0807", transition:"background 0.4s" }}
                      onMouseEnter={e => (e.currentTarget.style.background="rgba(31,21,12,0.8)")}
                      onMouseLeave={e => (e.currentTarget.style.background="#0A0807")}>
                      <h3 style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"1.4rem", fontWeight:400, color:"#EDE6D6", marginBottom:10 }}>{f.title}</h3>
                      <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.78rem", color:"rgba(237,230,214,0.4)", lineHeight:1.85 }}>{f.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <style>{`.venture-intro{@media(max-width:768px){grid-template-columns:1fr !important;}}.feat-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* Future ventures teaser */}
      <section style={{ padding:"7rem 0 9rem", background:"#2A1C10" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:28 }}>
          <FadeIn><p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E" }}>Coming Next</p></FadeIn>
          <TextReveal tag="h2" style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(1.9rem,3.5vw,2.9rem)", fontWeight:500, color:"#EDE6D6", maxWidth:600 }}>
            More ventures. Already in motion.
          </TextReveal>
          <FadeIn delay={0.2}><p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.82rem", color:"rgba(237,230,214,0.4)", maxWidth:400, lineHeight:1.85 }}>We're building more. We'll announce when the work is ready, not before.</p></FadeIn>
        </div>
      </section>
    </div>
  );
}