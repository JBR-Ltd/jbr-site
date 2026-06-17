"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const services = [
  {
    num: "01", title: "Product Engineering",
    desc: "End-to-end design and development of web and mobile products. From concept to deployed, scalable system, we own the full process.",
    details: ["UI/UX Design","Frontend (Next.js, React)","Backend & APIs","Mobile (React Native)","QA & Testing","DevOps & Deployment"],
  },
  {
    num: "02", title: "Technology Consulting",
    desc: "Strategic guidance for businesses navigating digital transformation, architecture decisions, and technology stack selection.",
    details: ["Architecture Review","Stack Selection","Technical Due Diligence","CTO-as-a-Service","Team Structure Advisory","Roadmap Planning"],
  },
  {
    num: "03", title: "Venture Building",
    desc: "We ideate, validate, and build market-ready products in-house, partnering with founders who have the domain, while we bring the technology.",
    details: ["Idea Validation","MVP Development","Co-founding Model","Go-to-Market Support","Ongoing Product Iteration","Investor Narrative"],
  },
  {
    num: "04", title: "Systems & Infrastructure",
    desc: "Robust backend systems, cloud architecture, and DevOps pipelines that underpin reliable digital businesses at any scale.",
    details: ["Cloud Architecture (AWS/GCP)","Database Design","CI/CD Pipelines","Monitoring & Observability","Security Hardening","Performance Optimisation"],
  },
];

export default function ServicesPage() {
  const [open, setOpen] = useState<number|null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const heroY = useTransform(scrollYProgress,[0,1],["0%","25%"]);
  const heroOpacity = useTransform(scrollYProgress,[0,0.6],[1,0]);

  return (
    <div style={{ background:"#0A0807" }}>
      {/* Hero */}
      <section ref={heroRef} style={{ position:"relative", minHeight:"80vh", display:"flex", alignItems:"flex-end", overflow:"hidden" }}>
        <motion.div style={{ y:heroY, position:"absolute", inset:0, background:"linear-gradient(160deg, #0A0807 0%, #2A1C10 50%, #0A0807 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 70% 40%, rgba(201,133,62,0.35) 0%, transparent 70%)" }} />
        <motion.div style={{ opacity:heroOpacity, position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 3rem 7rem", width:"100%" }}>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:0.3,ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#C9853E", marginBottom:28 }}>
            Services
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, color:"#EDE6D6" }}>
            Technology that
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, fontStyle:"italic", color:"#C9853E" }}>
            creates real value.
          </TextReveal>
        </motion.div>
      </section>

      {/* Intro */}
      <section style={{ padding:"7rem 0", background:"#0A0807" }} className="section-pad">
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"6rem" }} className="intro-grid">
            <FadeIn>
              <div className="hr-accent" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"1rem", color:"rgba(237,230,214,0.72)", lineHeight:1.95, maxWidth:520 }}>
                We offer a focused set of services where we can genuinely be the best in the room. We don't do everything, we do the things we're exceptional at, and we do them with complete ownership.
              </p>
            </FadeIn>
          </div>
        </div>
        <style>{`.intro-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* Accordion services */}
      <section style={{ padding:"0 0 9rem", background:"#0A0807" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          {services.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.06}>
              <div style={{ borderTop:"1px solid rgba(201,133,62,0.25)", cursor:"none" }} onClick={() => setOpen(open===i ? null : i)}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"2rem 0", gap:24 }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:28, flex:1 }}>
                    <span style={{ fontFamily:'var(--font-display)', fontSize:"0.9rem", color:"rgba(201,133,62,0.55)", letterSpacing:"0.2em", minWidth:28 }}>{s.num}</span>
                    <h2 style={{ fontFamily:'var(--font-display)', fontSize:"clamp(1.4rem,2.8vw,2.2rem)", fontWeight:500, color:"#EDE6D6", transition:"color 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.color="#C9853E")} onMouseLeave={e => (e.currentTarget.style.color="#EDE6D6")}>
                      {s.title}
                    </h2>
                  </div>
                  <motion.span animate={{ rotate: open===i ? 45 : 0 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                    style={{ fontSize:"1.5rem", color:"#C9853E", flexShrink:0 }}>+</motion.span>
                </div>
                <motion.div initial={false} animate={{ height: open===i ? "auto" : 0, opacity: open===i ? 1 : 0 }}
                  transition={{ duration:0.5, ease:[0.16,1,0.3,1] }} style={{ overflow:"hidden" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", paddingBottom:"2.5rem", paddingLeft:56 }} className="acc-grid">
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", color:"rgba(237,230,214,0.82)", lineHeight:1.9 }}>{s.desc}</p>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                      {s.details.map(d => (
                        <li key={d} style={{ fontFamily:"var(--font-sans)", fontSize:"0.78rem", color:"rgba(237,230,214,0.65)", display:"flex", alignItems:"center", gap:12 }}>
                          <span style={{ width:4, height:4, borderRadius:"50%", background:"#C9853E", flexShrink:0 }} />{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          ))}
          <div style={{ borderTop:"1px solid rgba(201,133,62,0.25)" }} />
        </div>
        <style>{`.acc-grid{@media(max-width:768px){grid-template-columns:1fr !important; padding-left:0 !important; gap:1.5rem !important;}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ padding:"0 0 9rem", background:"#0A0807" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:32 }}>
          <TextReveal tag="h2" style={{ fontFamily:'var(--font-display)', fontSize:"clamp(1.9rem,3.5vw,2.9rem)", fontWeight:500, color:"#EDE6D6" }}>
            Ready to start something?
          </TextReveal>
          <FadeIn delay={0.2}>
            <a href="/contact" style={{ fontFamily:"var(--font-sans)", fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", padding:"14px 36px", background:"#C9853E", color:"#EDE6D6", textDecoration:"none", transition:"all 0.35s" }}
              onMouseEnter={e => { e.currentTarget.style.background="#EDE6D6"; e.currentTarget.style.color="#0A0807"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#C9853E"; e.currentTarget.style.color="#EDE6D6"; }}>
              Talk to Us
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}