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
    width:"100%", background:"transparent", border:"none", borderBottom:"1px solid rgba(0,212,255,0.25)",
    padding:"14px 0", fontFamily:"var(--font-sans)", fontSize:"0.88rem", color:"#E8F4FF",
    outline:"none", transition:"border-color 0.3s",
  };

  return (
    <div style={{ background:"#050810" }}>
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
        <motion.div style={{ y:heroY, position:"absolute", inset:0, background:"linear-gradient(135deg, #0A0F1E 0%, #050810 70%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 50% 70% at 20% 60%, rgba(0,212,255,0.3) 0%, transparent 70%)" }} />
        <motion.div style={{ opacity:heroOpacity, position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 3rem 7rem", width:"100%" }}>
          <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:1,delay:0.3,ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#00D4FF", marginBottom:28 }}>
            Contact
          </motion.p>
          <TextReveal tag="h1" delay={0.5} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, color:"#E8F4FF" }}>
            Let's start a
          </TextReveal>
          <TextReveal tag="h1" delay={0.65} style={{ fontFamily:'var(--font-display)', fontSize:"clamp(2.4rem,5.5vw,4.8rem)", fontWeight:500, fontStyle:"italic", color:"#00D4FF" }}>
            conversation.
          </TextReveal>
        </motion.div>
      </section>

      {/* Main contact section */}
      <section style={{ padding:"7rem 0 9rem", background:"#050810" }} className="section-pad">
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"7rem", alignItems:"start" }} className="contact-grid">
            {/* Left info */}
            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
              <FadeIn>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.88rem", color:"rgba(232,244,255,0.82)", lineHeight:1.95 }}>
                  We're selective about the work we take on, which means every conversation matters. Tell us what you're building.
                </p>
              </FadeIn>

              {[
                { label:"Email", value:"hello@jbrlimited.com", href:"mailto:hello@jbrlimited.com" },
                { label:"Location", value:"Lagos, Nigeria", href:null },
              ].map(item => (
                <FadeIn key={item.label} delay={0.1}>
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"#00D4FF", marginBottom:8 }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily:'var(--font-display)', fontSize:"1.4rem", fontWeight:500, color:"#E8F4FF", textDecoration:"none", transition:"color 0.3s" }}
                          onMouseEnter={e => (e.currentTarget.style.color="#00D4FF")} onMouseLeave={e => (e.currentTarget.style.color="#E8F4FF")}>{item.value}</a>
                      : <p style={{ fontFamily:'var(--font-display)', fontSize:"1.4rem", fontWeight:500, color:"#E8F4FF" }}>{item.value}</p>
                    }
                  </div>
                </FadeIn>
              ))}

              <FadeIn delay={0.2}>
                <div>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"#00D4FF", marginBottom:16 }}>Socials</p>
                  <div style={{ display:"flex", gap:20 }}>
                    {["LinkedIn","Twitter","Instagram"].map(s => (
                      <a key={s} href="#" style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:"rgba(232,244,255,0.65)", textDecoration:"none", transition:"color 0.3s" }}
                        onMouseEnter={e => (e.currentTarget.style.color="#E8F4FF")} onMouseLeave={e => (e.currentTarget.style.color="rgba(232,244,255,0.65)")}>
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
                  style={{ padding:"4rem", background:"#0A0F1E", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:"4rem", fontWeight:500, color:"#00D4FF" }}>✓</span>
                  <h3 style={{ fontFamily:'var(--font-display)', fontSize:"2rem", fontWeight:500, color:"#E8F4FF" }}>Message received.</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.82rem", color:"rgba(232,244,255,0.8)", lineHeight:1.85 }}>We'll be in touch within two business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:36 }}>
                  {/* Inquiry type */}
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(232,244,255,0.76)", marginBottom:16 }}>Nature of Inquiry</p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {inquiries.map(q => (
                        <button key={q} type="button" onClick={() => setSelected(q)}
                          style={{ fontFamily:"var(--font-sans)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"7px 14px", border:`1px solid ${selected===q?"#00D4FF":"rgba(0,212,255,0.35)"}`, background:selected===q?"#00D4FF":"transparent", color:selected===q?"#E8F4FF":"rgba(232,244,255,0.8)", cursor:"none", transition:"all 0.3s" }}>
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
                      <label style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(232,244,255,0.76)", display:"block", marginBottom:8 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.required} style={inputStyle}
                        onFocus={e => (e.target.style.borderBottomColor="#00D4FF")}
                        onBlur={e => (e.target.style.borderBottomColor="rgba(0,212,255,0.25)")} />
                    </div>
                  ))}

                  <div>
                    <label style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(232,244,255,0.76)", display:"block", marginBottom:8 }}>Your Message</label>
                    <textarea required rows={4} placeholder="Tell us what you're working on..." style={{ ...inputStyle, resize:"none", borderBottom:"1px solid rgba(0,212,255,0.25)" }}
                      onFocus={e => (e.target.style.borderBottomColor="#00D4FF")}
                      onBlur={e => (e.target.style.borderBottomColor="rgba(0,212,255,0.25)")} />
                  </div>

                  <button type="submit" style={{ fontFamily:"var(--font-sans)", fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", padding:"16px 36px", background:"#00D4FF", color:"#E8F4FF", border:"none", cursor:"none", transition:"all 0.35s", alignSelf:"flex-start" }}
                    onMouseEnter={e => { e.currentTarget.style.background="#E8F4FF"; e.currentTarget.style.color="#050810"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="#00D4FF"; e.currentTarget.style.color="#E8F4FF"; }}>
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