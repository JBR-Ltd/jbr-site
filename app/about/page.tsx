"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";
import TeamCard from "@/components/ui/TeamCard";

const values = [
  { title: "Deliberate Craft", desc: "We refuse to ship things we're not proud of. Every product, every pixel, every decision is made with intention." },
  { title: "Long-term Thinking", desc: "We optimise for decades, not quarters. The best businesses are built slowly and correctly." },
  { title: "African Ambition", desc: "We believe Africa is not emerging, it has arrived. We build for it accordingly." },
  { title: "Radical Clarity", desc: "We communicate simply, decide clearly, and avoid complexity for its own sake." },
];

const team = [
  {
    name: "Bisong Best",
    role: "Founder & CEO",
    specialization: "Specialises in business strategy, venture building, and product vision.",
    image: "/team/best.jpeg",
  },
  {
    name: "Bahago Jason",
    role: "CTO",
    specialization: "Specialises in systems architecture, backend infrastructure, and cloud engineering.",
    image: "/team/jason.jpeg",
  },
  {
    name: "Richard Chibuike",
    role: "COO",
    specialization: "Specialises in product strategy, roadmap planning, and user research.",
    image: "/team/richard.jpeg",
  },
  {
    name: "Ayo-Ajayi Oluwatokiloba",
    role: "Project Manager",
    specialization: "Specialises in delivery management, agile workflows, and cross-team coordination.",
    image: "/team/toki.jpeg",
  },
  {
    name: "Obuzor Amarachi",
    role: "UI/UX Designer",
    specialization: "Specialises in interface design, user experience research, and design systems.",
    image: "/team/amarachi.jpeg",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start","end start"] });
  const heroY = useTransform(scrollYProgress, [0,1], ["0%","30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.6], [1,0]);

  return (
    <div style={{ background: "#0A0807" }}>
      {/* ── Hero ── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, background: "linear-gradient(135deg, #2A1C10 0%, #0A0807 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 60%, rgba(201,133,62,0.3) 0%, transparent 70%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 3rem 7rem", width: "100%" }}>
          <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.3, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:28 }}>
            About JBR Limited
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, color:"#EDE6D6" }}>
            We build what
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, fontStyle:"italic", color:"#C9853E" }}>
            others only imagine.
          </TextReveal>
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section style={{ padding:"9rem 0", background:"#0A0807" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"6rem", alignItems:"start" }} className="story-grid">
            <FadeIn>
              <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:32 }}>Our Story</p>
              <div className="hr-accent" />
            </FadeIn>
            <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
              <TextReveal tag="h2" style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:500, color:"#EDE6D6" }}>
                Founded on the belief that Africa deserves world-class technology.
              </TextReveal>
              {["JBR Limited was born out of a recurring frustration: the gap between the technology African markets deserve and what they typically receive. Too many solutions are built elsewhere and adapted here, poorly.",
                "We started with a different premise. Build from here. Build for here. Build with the rigour of the best studios anywhere in the world, but with an intimate understanding of this market's nuances, rhythms, and opportunities.",
                "Our first product, a real estate platform, is the clearest expression of this philosophy. Property is the most fundamental asset class in any economy. Getting it right matters."
              ].map((p, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.1}>
                  <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.88rem", color:"rgba(237,230,214,0.5)", lineHeight:1.95 }}>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
        <style>{`.story-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ── Values ── */}
      <section style={{ padding:"7rem 0", background:"#2A1C10" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <FadeIn style={{ marginBottom:64 }}>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:20 }}>Our Values</p>
            <TextReveal tag="h2" style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(1.7rem,3vw,2.5rem)", fontWeight:500, color:"#EDE6D6" }}>
              The principles we refuse to compromise.
            </TextReveal>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1px", background:"rgba(201,133,62,0.2)" }} className="values-grid">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.09}>
                <div style={{ padding:"2.8rem", background:"#2A1C10", borderBottom:"1px solid rgba(201,133,62,0.15)", transition:"background 0.4s" }}
                  onMouseEnter={e => (e.currentTarget.style.background="rgba(201,133,62,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.background="#2A1C10")}>
                  <span style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"2.2rem", fontWeight:500, color:"rgba(201,133,62,0.5)", display:"block", marginBottom:16 }}>0{i+1}</span>
                  <h3 style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"1.6rem", fontWeight:400, color:"#EDE6D6", marginBottom:12 }}>{v.title}</h3>
                  <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.8rem", color:"rgba(237,230,214,0.45)", lineHeight:1.85 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`.values-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ── Team ── */}
      <section style={{ padding:"9rem 0", background:"#0A0807" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <FadeIn style={{ marginBottom:72 }}>
            <p style={{ fontFamily:"Inter,sans-serif", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:20 }}>The Team</p>
            <TextReveal tag="h2" style={{ fontFamily:'"Space Grotesk",sans-serif', fontSize:"clamp(1.7rem,3vw,2.5rem)", fontWeight:500, color:"#EDE6D6" }}>
              Small by choice. Excellent by necessity.
            </TextReveal>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2rem" }} className="team-grid">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <TeamCard name={m.name} role={m.role} specialization={m.specialization} image={m.image} />
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`
          .team-grid{
            @media(max-width:1024px){grid-template-columns:repeat(2,1fr) !important;}
            @media(max-width:640px){grid-template-columns:1fr !important;}
          }
        `}</style>
      </section>
    </div>
  );
}