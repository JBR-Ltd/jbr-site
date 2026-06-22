"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const services = [
  {
    id: 0,
    num: "01", title: "Product Engineering",
    desc: "End-to-end design and development of web and mobile products. From concept to deployed, scalable system, we own the full process.",
    details: ["UI/UX Design","Frontend (Next.js, React)","Backend & APIs","Mobile (React Native)","QA & Testing","DevOps & Deployment"],
  },
  {
    id: 1,
    num: "02", title: "Technology Consulting",
    desc: "Strategic guidance for businesses navigating digital transformation, architecture decisions, and technology stack selection.",
    details: ["Architecture Review","Stack Selection","Technical Due Diligence","CTO-as-a-Service","Team Structure Advisory","Roadmap Planning"],
  },
  {
    id: 2,
    num: "03", title: "Venture Building",
    desc: "We ideate, validate, and build market-ready products in-house, partnering with founders who have the domain, while we bring the technology.",
    details: ["Idea Validation","MVP Development","Co-founding Model","Go-to-Market Support","Ongoing Product Iteration","Investor Narrative"],
  },
  {
    id: 3,
    num: "04", title: "Systems & Infrastructure",
    desc: "Robust backend systems, cloud architecture, and DevOps pipelines that underpin reliable digital businesses at any scale.",
    details: ["Cloud Architecture (AWS/GCP)","Database Design","CI/CD Pipelines","Monitoring & Observability","Security Hardening","Performance Optimisation"],
  },
];

export default function ServicesPage() {
  const [open, setOpen] = useState<number|null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Handle environment detection for clean rendering
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeService = open !== null ? services[open] : null;

  return (
    <div style={{ background: "var(--b)", minHeight: "100vh" }}>
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
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, background: "linear-gradient(160deg, var(--b) 0%, var(--su) 50%, var(--b) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 70% 40%, var(--color-glow) 0%, transparent 70%)" }} />
        <motion.div style={{ opacity: heroOpacity, position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 3rem 7rem", width: "100%" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--p)", marginBottom: 28 }}>
            Services
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, color: "var(--text-strong)" }}>
            Technology that
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem,5.5vw,4.8rem)", fontWeight: 500, fontStyle: "italic", color: "var(--p)" }}>
            creates real value.
          </TextReveal>
        </motion.div>
      </section>

      {/* Intro */}
      <section style={{ padding: "7rem 0", background: "var(--b)" }} className="section-pad">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "6rem" }} className="intro-grid">
            <FadeIn>
              <div className="hr-accent" />
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "var(--text-body)", lineHeight: 1.95, maxWidth: 520 }}>
                We offer a focused set of services where we can genuinely be the best in the room. We don't do everything, we do the things we're exceptional at, and we do them with complete ownership.
              </p>
            </FadeIn>
          </div>
        </div>
        <style>{`.intro-grid{@media(max-width:768px){grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* Services Interactivity Section */}
      <section style={{ padding: "0 0 9rem", background: "var(--b)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem" }} className="container-pad">
          
          {!isMobile ? (
            /* ─── DESKTOP ACCORDION LAYOUT ─── */
            <div>
              {services.map((s, i) => (
                <FadeIn key={s.num} delay={i * 0.06}>
                  <div style={{ borderTop: "1px solid var(--border-primary-dim)", cursor: "pointer" }} onClick={() => setOpen(open === i ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 0", gap: 24 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 28, flex: 1 }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: "0.9rem", color: "var(--text-muted)", letterSpacing: "0.2em", minWidth: 28 }}>{s.num}</span>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.4rem,2.8vw,2.2rem)", fontWeight: 500, color: "var(--text-strong)", transition: "color 0.3s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--p)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--text-strong)")}>
                          {s.title}
                        </h2>
                      </div>
                      <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: "1.5rem", color: "var(--p)", flexShrink: 0 }}>+</motion.span>
                    </div>
                    <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", paddingBottom: "2.5rem", paddingLeft: 56 }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-body)", lineHeight: 1.9 }}>{s.desc}</p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                          {s.details.map(d => (
                            <li key={d} style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 12 }}>
                              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--p)", flexShrink: 0 }} />{d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </FadeIn>
              ))}
              <div style={{ borderTop: "1px solid var(--border-primary-dim)" }} />
            </div>
          ) : (
            /* ─── MOBILE 2X2 GRID LAYOUT ─── */
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
              {services.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setOpen(i)}
                  style={{
                    background: "var(--su)",
                    border: "1px solid var(--border-primary-xs)",
                    borderRadius: "12px",
                    padding: "1.5rem 1rem",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "140px",
                    cursor: "pointer"
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", color: "var(--p)", opacity: 0.7, fontWeight: 600 }}>
                    {s.num}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 500, color: "var(--text-strong)", margin: 0, lineHeight: 1.3 }}>
                    {s.title}
                  </h3>
                </button>
              ))}
            </div>
          )}
        </div>
        <style>{`
          @media(max-width:768px){
            .container-pad { padding: 0 1.5rem !important; }
          }
        `}</style>
      </section>

      {/* ─── MOBILE MODAL DRAWER POPUP ─── */}
      <AnimatePresence>
        {isMobile && activeService && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end" }}>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
              style={{ position: "absolute", inset: 0, background: "rgba(10, 8, 7, 0.8)", backdropFilter: "blur(8px)" }}
            />
            
            {/* Popup Content Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "relative",
                width: "100%",
                background: "var(--mu)",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                borderTop: "1px solid var(--border-primary-dim)",
                padding: "2rem 1.5rem 3.5rem",
                maxHeight: "85vh",
                overflowY: "auto"
              }}
            >
              {/* Drag Handle UI Accent */}
              <div style={{ width: "40px", height: "4px", background: "var(--border-primary-dim)", borderRadius: "2px", margin: "0 auto 1.5rem" }} onClick={() => setOpen(null)}/>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", color: "var(--p)", letterSpacing: "0.1em" }}>
                    Service {activeService.num}
                  </span>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500, color: "var(--text-strong)", marginTop: "4px", margin: 0 }}>
                    {activeService.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setOpen(null)}
                  style={{ background: "var(--border-primary-xs)", border: "none", color: "var(--p)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text-body)", lineHeight: 1.7, marginBottom: "2rem" }}>
                {activeService.desc}
              </p>

              <div className="hr-accent" style={{ opacity: 0.3, marginBottom: "1.5rem" }} />

              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--p)", marginBottom: "1rem" }}>
                Capabilities
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, padding: 0, margin: 0 }}>
                {activeService.details.map(d => (
                  <li key={d} style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--p)", flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section style={{ padding: "0 0 9rem", background: "var(--b)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          <TextReveal tag="h2" style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.9rem,3.5vw,2.9rem)", fontWeight: 500, color: "var(--text-strong)" }}>
            Ready to start something?
          </TextReveal>
          <FadeIn delay={0.2}>
            <a href="/contact" style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", padding: "14px 36px", background: "var(--p)", color: "var(--b)", textDecoration: "none", transition: "all 0.35s", fontWeight: 600 }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--text-strong)"; e.currentTarget.style.color = "var(--b)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--p)"; e.currentTarget.style.color = "var(--b)"; }}>
              Talk to Us
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Global CSS Media Queries */}
      <style>{`
        .hero-height { min-height: 100vh; }
        @media (max-width: 768px) {
          .hero-height { min-height: 80vh !important; }
        }
      `}</style>
    </div>
  );
}