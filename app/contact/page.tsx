"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";

const inquiries = ["General Inquiry","Technology Services","Venture Partnership","Investment","Press & Media","Careers"];

export default function ContactPage() {
  const [selected, setSelected] = useState("General Inquiry");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end start"] });
  const heroY = useTransform(scrollYProgress,[0,1],["0%","25%"]);
  const heroOpacity = useTransform(scrollYProgress,[0,0.6],[1,0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width:"100%", background:"transparent", border:"none", borderBottom:"1px solid var(--border-primary-dim)",
    padding:"14px 0", fontFamily:"var(--font-sans)", fontSize:"0.88rem", color:"var(--text-strong)",
    outline:"none", transition:"border-color 0.3s",
  };

  return (
    <div style={{ background:"var(--b)" }}>
      {/* Hero */}
      <section 
        ref={heroRef} 
        className="hero-height"
        style={{ 
          position:"relative", 
          display:"flex", 
          alignItems:"flex-end", 
          overflow:"hidden" 
        }}
      >
        <motion.div style={{ y:heroY, position:"absolute", inset:0, background:"linear-gradient(135deg, var(--su) 0%, var(--b) 70%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 70% at 20% 60%, var(--color-glow) 0%, transparent 70%)" }} />
        <motion.div style={{ opacity:heroOpacity, position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 3rem 7rem", width:"100%" }}>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:0.3,ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"var(--p)", marginBottom:28 }}>
            Contact
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, color:"var(--text-strong)" }}>
            Let's start a
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, fontStyle:"italic", color:"var(--p)" }}>
            conversation.
          </TextReveal>
        </motion.div>
      </section>

      {/* Main contact section */}
      <section style={{ padding:"7rem 0 9rem", background:"var(--b)" }} className="section-pad">
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"7rem", alignItems:"start" }} className="contact-grid">
            {/* Left info */}
            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
              <FadeIn>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.88rem", color:"var(--text-body)", lineHeight:1.95 }}>
                  We're selective about the work we take on, which means every conversation matters. Tell us what you're building.
                </p>
              </FadeIn>

              {[
                { label:"Email", value:"hello@jbrlimited.com", href:"mailto:hello@jbrlimited.com" },
                { label:"Location", value:"Lagos, Nigeria", href:null },
              ].map(item => (
                <FadeIn key={item.label} delay={0.1}>
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--p)", marginBottom:8 }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily:'var(--font-display)', fontSize:"1.4rem", fontWeight:500, color:"var(--text-strong)", textDecoration:"none", transition:"color 0.3s" }}
                          onMouseEnter={e => (e.currentTarget.style.color="var(--p)")} onMouseLeave={e => (e.currentTarget.style.color="var(--text-strong)")}>{item.value}</a>
                      : <p style={{ fontFamily:'var(--font-display)', fontSize:"1.4rem", fontWeight:500, color:"var(--text-strong)" }}>{item.value}</p>
                    }
                  </div>
                </FadeIn>
              ))}

              <FadeIn delay={0.2}>
                <div>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--p)", marginBottom:16 }}>Socials</p>
                  <div style={{ display:"flex", gap:20 }}>
                    {["LinkedIn","Twitter","Instagram"].map(s => (
                      <a key={s} href="#" style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:"var(--text-muted)", textDecoration:"none", transition:"color 0.3s" }}
                        onMouseEnter={e => (e.currentTarget.style.color="var(--text-strong)")} onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right form */}
            <FadeIn delay={0.15} direction="left">
              {submitted ? (
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
                  style={{ padding:"4rem", background:"var(--mu)", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:20, border:"1px solid var(--border-primary-xs)", borderRadius:"8px" }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:"4rem", fontWeight:500, color:"var(--p)" }}>✓</span>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:"2rem", fontWeight:500, color:"var(--text-strong)" }}>Message received.</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.82rem", color:"var(--text-body)", lineHeight:1.85 }}>We'll be in touch within two business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:36 }}>
                  {/* Inquiry type */}
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:16 }}>Nature of Inquiry</p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {inquiries.map(q => (
                        <button key={q} type="button" onClick={() => setSelected(q)}
                          style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"7px 14px", border:`1px solid ${selected===q?"var(--p)":"var(--border-primary-dim)"}`, background:selected===q?"var(--p)":"transparent", color:selected===q?"var(--b)":"var(--text-body)", cursor:"none", transition:"all 0.3s" }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  {[
                    { label:"Your Name", type:"text", placeholder:"Full name", required:true },
                    { label:"Email Address", type:"email", placeholder:"you@company.com", required:true },
                    { label:"Company / Organisation", type:"text", placeholder:"Optional", required:false },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:8 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.required} style={inputStyle}
                        onFocus={e => (e.target.style.borderBottomColor="var(--p)")}
                        onBlur={e => (e.target.style.borderBottomColor="var(--border-primary-dim)")} />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--text-muted)", display:"block", marginBottom:8 }}>Your Message</label>
                    <textarea required rows={4} placeholder="Tell us what you're working on..." style={{ ...inputStyle, resize:"none", borderBottom:"1px solid var(--border-primary-dim)" }}
                      onFocus={e => (e.target.style.borderBottomColor="var(--p)")}
                      onBlur={e => (e.target.style.borderBottomColor="var(--border-primary-dim)")} />
                  </div>

                  <button type="submit" style={{ fontFamily:"var(--font-sans)", fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", padding:"16px 36px", background:"var(--p)", color:"var(--b)", border:"none", cursor:"none", transition:"all 0.35s", alignSelf:"flex-start", fontWeight: 600 }}
                    onMouseEnter={e => { e.currentTarget.style.background="var(--text-strong)"; e.currentTarget.style.color="var(--b)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="var(--p)"; e.currentTarget.style.color="var(--b)"; }}>
                    Send Message
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
        <style>{`
          .contact-grid {
            @media(max-width:768px){ 
              grid-template-columns:1fr !important; 
              gap: 4rem !important;
            }
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