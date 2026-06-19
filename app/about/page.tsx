"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";
import TeamCard from "@/components/ui/TeamCard";
import Carousel from "@/components/ui/Carousel";

const values = [
  { title: "Deliberate Craft", desc: "We refuse to ship things we're not proud of. Every product, every pixel, every decision is made with intention." },
  { title: "Long-term Thinking", desc: "We optimise for decades, not quarters. The best businesses are built slowly and correctly." },
  { title: "African Ambition", desc: "We believe Africa is not emerging, it has arrived. We build for it accordingly." },
  { title: "Radical Clarity", desc: "We communicate simply, decide clearly, and avoid complexity for its own sake." },
];

const team = [
  {
    name: "Bisong Best",
    role: "CEO",
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
  const valuesSectionRef = useRef<HTMLDivElement>(null);

  // Hero Scroll Progress
  const { scrollYProgress: heroScrollProgress } = useScroll({ 
    target: heroRef, 
    offset: ["start start", "end start"] 
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0]);

  // Values Stacking Track Progress (400vh container gives comfortable scroll depth)
  const { scrollYProgress: valuesScrollProgress } = useScroll({
    target: valuesSectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <div style={{ background: "#050810" }}>
      {/* ── Hero ── */}
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
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, background: "linear-gradient(135deg, #0A0F1E 0%, #050810 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 30% 60%, rgba(0,212,255,0.3) 0%, transparent 70%)" }} />

        <motion.div style={{ opacity: heroOpacity, position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 3rem 7rem", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 28 }}>
            About JBR Limited
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, color: "#E8F4FF" }}>
            We build what
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, fontStyle: "italic", color: "#00D4FF" }}>
            others only imagine.
          </TextReveal>
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section style={{ padding: "9rem 0", background: "#050810" }} className="section-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start" }} className="story-grid">
            <FadeIn>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 32 }}>Our Story</p>
              <div className="hr-accent" />
            </FadeIn>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 500, color: "#E8F4FF" }}>
                Founded on the belief that Africa deserves world-class technology.
              </TextReveal>
              
              <FadeIn delay={0.1}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.82)", lineHeight: 1.95 }}>
                  JBR Limited was born out of a recurring frustration: the gap between the technology African markets deserve and what they typically receive. Too many solutions are built elsewhere and adapted here, poorly.
                </p>
              </FadeIn>

              {/* Hidden cleanly on mobile viewports using CSS media class hooks */}
              <FadeIn delay={0.2} className="desktop-only-p">
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.82)", lineHeight: 1.95 }}>
                  We started with a different premise. Build from here. Build for here. Build with the rigour of the best studios anywhere in the world, but with an intimate understanding of this market's nuances, rhythms, and opportunities.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.82)", lineHeight: 1.95 }}>
                  Our first product, a real estate platform, is the clearest expression of this philosophy. Property is the most fundamental asset class in any economy. Getting it right matters.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
        <style>{`
          .story-grid {
            @media(max-width:768px){ 
              grid-template-columns:1fr !important; 
            }
          }
          @media(max-width:768px){
            .desktop-only-p { display: none !important; }
          }
        `}</style>
      </section>

      {/* ── Values (Sequential Horizontal Stacking Cards Track) ── */}
      <div ref={valuesSectionRef} style={{ position: "relative", height: "400vh", background: "#0A0F1E" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem", alignItems: "center" }} className="values-layout">
            
            {/* Left Column: Fixed Content Frame */}
            <div style={{ zIndex: 100 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 20 }}>Our Values</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.7rem,3vw,2.5rem)", fontWeight: 500, color: "#E8F4FF", margin: 0, lineHeight: 1.3 }}>
                The principles we refuse to compromise.
              </h2>
            </div>

            {/* Right Column: Cards Window Track */}
            <div style={{ position: "relative", height: "420px", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start" }} className="stack-container">
              {values.map((v, i) => {
                const totalCards = values.length;
                
                // Break up scroll into equal execution slots per card
                const segmentLength = 1 / totalCards;
                const startIncoming = i * segmentLength;
                const endIncoming = (i + 1) * segmentLength;

                // Native coordinate shifting mapping sequence 
                const x = useTransform(
                  valuesScrollProgress,
                  [0, startIncoming, endIncoming, 1],
                  ["120%", "120%", "0%", "0%"]
                );

                // Creates progressive layered dimensions as older layers sit beneath current card
                const scale = useTransform(
                  valuesScrollProgress,
                  [endIncoming, 1],
                  [1, 1 - (totalCards - 1 - i) * 0.035]
                );

                const stackOffset = i * 20;
                const leftMove = useTransform(
                  valuesScrollProgress,
                  [endIncoming, 1],
                  [0, stackOffset]
                );

                return (
                  <motion.div
                    key={v.title}
                    style={{
                      position: "absolute",
                      width: "100%",
                      maxWidth: "460px",
                      height: "360px",
                      x,
                      scale,
                      left: leftMove,
                      zIndex: i + 1,
                      background: "#0F162A",
                      border: "1px solid rgba(0, 212, 255, 0.25)",
                      borderRadius: "20px",
                      padding: "3rem 2.5rem",
                      boxShadow: "-20px 20px 50px rgba(3,5,10,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: "2.5rem", fontWeight: 600, color: "rgba(0,212,255,0.15)", display: "block", marginBottom: 8 }}>
                      0{i + 1}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: "1.75rem", fontWeight: 500, color: "#E8F4FF", marginBottom: 16 }}>
                      {v.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "rgba(232,244,255,0.75)", lineHeight: 1.8, margin: 0 }}>
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
        <style>{`
          @media(max-width:991px){
            .values-layout { grid-template-columns: 1fr !important; gap: 3rem !important; }
            .stack-container { height: 380px !important; }
          }
        `}</style>
      </div>

      {/* ── Team ── */}
      <section style={{ padding: "9rem 0", background: "#050810" }} className="section-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
          <FadeIn style={{ marginBottom: 72 }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#00D4FF", marginBottom: 20 }}>The Team</p>
            <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.7rem,3vw,2.5rem)", fontWeight: 500, color: "#E8F4FF" }}>
              Small by choice. Excellent by necessity.
            </TextReveal>
          </FadeIn>
          
          {/* Desktop/tablet grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }} className="team-grid">
            {team.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <TeamCard name={m.name} role={m.role} specialization={m.specialization} image={m.image} />
              </FadeIn>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="team-carousel">
            <Carousel itemWidth="78%" gap={16}>
              {team.map((m) => (
                <TeamCard key={m.name} name={m.name} role={m.role} specialization={m.specialization} image={m.image} />
              ))}
            </Carousel>
          </div>
        </div>
        <style>{`
          .team-carousel { display: none; }
          .team-grid{
            @media(max-width:1024px){grid-template-columns:repeat(2,1fr) !important;}
          }
          @media(max-width:640px){
            .team-grid { display: none !important; }
            .team-carousel { display: block !important; }
          }
        `}</style>
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