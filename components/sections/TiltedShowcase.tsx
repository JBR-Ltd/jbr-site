"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface ShowcaseCard {
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  accent?: string;
}

interface Props {
  cards: ShowcaseCard[];
  heading?: string;
  eyebrow?: string;
}

export default function StackingShowcase({ cards, heading, eyebrow }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050810",
        overflow: "hidden",
        position: "relative",
        paddingTop: isMobile ? "4rem" : "6rem",
        paddingBottom: isMobile ? "6rem" : "10rem",
        minHeight: isMobile ? "150vh" : "200vh",
      }}
    >
      {/* Ambient glow behind cards */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "60%",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Section header */}
      {(eyebrow || heading) && (
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 2rem",
            marginBottom: isMobile ? "2rem" : "4rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          {eyebrow && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#00D4FF",
                marginBottom: 14,
                textShadow: "0 0 10px rgba(0,212,255,0.4)",
              }}
            >
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#E8F4FF",
              }}
            >
              {heading}
            </h2>
          )}
        </div>
      )}

      {/* Card Stack Container */}
      {isMobile ? (
        <MobileStack cards={cards} smoothProgress={smoothProgress} />
      ) : (
        <DesktopStack cards={cards} smoothProgress={smoothProgress} />
      )}

      {/* Scroll hint */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? "3rem" : "4rem",
          alignItems: "center",
          gap: 12,
          position: "relative",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,212,255,0.4)",
          }}
        >
          {isMobile ? "Scroll to stack" : "Scroll to expand"}
        </span>
        <motion.div
          animate={isMobile ? { y: [0, 8, 0] } : { x: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {isMobile ? (
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M5 1v14M1 11l4 4 4-4" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5h14M10 1l5 4-5 4" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Desktop: Horizontal Stacking ───
function DesktopStack({ cards, smoothProgress }: { cards: ShowcaseCard[]; smoothProgress: ReturnType<typeof useSpring> }) {
  const cardCount = cards.length;

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 40%",
        position: "relative",
        zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          width: "clamp(280px, 28vw, 380px)",
          height: "clamp(360px, 40vh, 480px)",
          transformStyle: "preserve-3d",
          rotateX: "-8deg",
          rotateZ: "-2deg",
        }}
      >
        {cards.map((card, i) => (
          <DesktopStackCard key={i} card={card} index={i} total={cardCount} smoothProgress={smoothProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function DesktopStackCard({ card, index, total, smoothProgress }: { card: ShowcaseCard; index: number; total: number; smoothProgress: ReturnType<typeof useSpring> }) {
  const [hovered, setHovered] = useState(false);
  const accent = card.accent || "#00D4FF";

  // Memoized ranges to break the re-rendering loops
  const range = useMemo(() => [index / total, (index + 1) / total], [index, total]);
  const opacityRange = useMemo(() => [index / total, (index / total) + 0.05, (index + 1) / total], [index, total]);
  
  const outputX = useMemo(() => ["0%", `-${index * 110}%`], [index]);
  const outputRotateY = useMemo(() => ["0deg", `${-index * 3}deg`], [index]);
  const outputScale = useMemo(() => [1, 1 - index * 0.02], [index]);
  const outputOpacity = useMemo(() => [0.3, 1, 1], []);

  const x = useTransform(smoothProgress, range, outputX);
  const rotateY = useTransform(smoothProgress, range, outputRotateY);
  const scale = useTransform(smoothProgress, range, outputScale);
  const opacity = useTransform(smoothProgress, opacityRange, outputOpacity);

  const zIndex = total - index;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        x,
        rotateY,
        scale,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
        cursor: "default",
      }}
      whileHover={{
        y: -12,
        rotateX: "4deg",
        zIndex: 100,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: hovered ? "rgba(13,21,40,0.95)" : "rgba(13,21,40,0.85)",
          border: `1px solid ${hovered ? accent : "rgba(0,212,255,0.12)"}`,
          borderRadius: 16,
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s, border 0.4s",
          boxShadow: hovered
            ? `0 0 40px rgba(0,212,255,0.15), inset 0 0 60px rgba(0,212,255,0.03)`
            : `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.05)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: hovered ? `linear-gradient(90deg, transparent, ${accent}, transparent)` : "transparent",
            transition: "background 0.4s",
            boxShadow: hovered ? `0 0 12px ${accent}` : "none",
          }}
        />

        <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "rgba(0,212,255,0.08)", lineHeight: 1, marginBottom: 16, userSelect: "none" }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, padding: "4px 10px", border: `1px solid ${accent}40`, borderRadius: 4, width: "fit-content" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}`, display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent }}>{card.tag}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "#E8F4FF", marginBottom: 8, lineHeight: 1.2 }}>{card.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#00D4FF", marginBottom: 12, fontWeight: 600 }}>{card.subtitle}</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "rgba(232,244,255,0.6)", lineHeight: 1.7 }}>{card.description}</p>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${accent}60, transparent)` : "transparent", transition: "background 0.4s" }} />
      </div>
    </motion.div>
  );
}

// ─── Mobile: Vertical Stacking ───
function MobileStack({ cards, smoothProgress }: { cards: ShowcaseCard[]; smoothProgress: ReturnType<typeof useSpring> }) {
  const cardCount = cards.length;

  return (
    <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1.5rem", gap: 0, minHeight: "80vh" }}>
      {cards.map((card, i) => (
        <MobileStackCard key={i} card={card} index={i} total={cardCount} smoothProgress={smoothProgress} />
      ))}
    </div>
  );
}

function MobileStackCard({ card, index, total, smoothProgress }: { card: ShowcaseCard; index: number; total: number; smoothProgress: ReturnType<typeof useSpring> }) {
  const [hovered, setHovered] = useState(false);
  const accent = card.accent || "#00D4FF";

  // Memoized ranges to prevent the mobile re-rendering infinite loops
  const range = useMemo(() => [index / total, (index + 1) / total], [index, total]);
  const opacityRange = useMemo(() => [index / total, (index / total) + 0.05, (index + 1) / total], [index, total]);

  const outputY = useMemo(() => ["120%", `${-index * 12}px`], [index]);
  const outputScale = useMemo(() => [0.9, 1 - index * 0.03], [index]);
  const outputOpacity = useMemo(() => [0, 1, 1], []);

  const y = useTransform(smoothProgress, range, outputY);
  const scale = useTransform(smoothProgress, range, outputScale);
  const opacity = useTransform(smoothProgress, opacityRange, outputOpacity);

  const zIndex = total - index;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        width: "100%",
        maxWidth: "380px",
        y,
        scale,
        opacity,
        zIndex,
        position: "relative",
        marginTop: index === 0 ? 0 : "-60px",
        cursor: "default",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        zIndex: 100,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div
        style={{
          background: hovered ? "rgba(13,21,40,0.95)" : "rgba(13,21,40,0.85)",
          border: `1px solid ${hovered ? accent : "rgba(0,212,255,0.12)"}`,
          borderRadius: 16,
          padding: "1.5rem",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.4s, border 0.4s",
          boxShadow: hovered
            ? `0 0 40px rgba(0,212,255,0.15), inset 0 0 60px rgba(0,212,255,0.03)`
            : `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,212,255,0.05)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: hovered ? `linear-gradient(90deg, transparent, ${accent}, transparent)` : "transparent",
            transition: "background 0.4s",
            boxShadow: hovered ? `0 0 12px ${accent}` : "none",
          }}
        />

        <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, color: "rgba(0,212,255,0.08)", lineHeight: 1, marginBottom: 12, userSelect: "none" }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "4px 10px", border: `1px solid ${accent}40`, borderRadius: 4, width: "fit-content" }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: accent, boxShadow: `0 0 6px ${accent}`, display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent }}>{card.tag}</span>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#E8F4FF", marginBottom: 8, lineHeight: 1.2 }}>{card.title}</h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#00D4FF", marginBottom: 12, fontWeight: 600 }}>{card.subtitle}</p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "rgba(232,244,255,0.6)", lineHeight: 1.7 }}>{card.description}</p>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: hovered ? `linear-gradient(90deg, transparent, ${accent}60, transparent)` : "transparent", transition: "background 0.4s" }} />
      </div>
    </motion.div>
  );
}