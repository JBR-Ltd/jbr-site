"use client";
import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

export interface StackedCardSliderProps {
  children: ReactNode[];
}

export default function StackedCardSlider({ children }: StackedCardSliderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = children.length;
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "end 0.15"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) setActiveIdx(i => Math.min(i + 1, total - 1));
    else if (dx > 40) setActiveIdx(i => Math.max(i - 1, 0));
  };

  if (isMobile) {
    return (
      <div style={{ position: "relative", paddingBottom: 44 }}>
        <div style={{ position: "relative", height: 340 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {children.map((child, i) => {
            const offset = i - activeIdx;
            if (Math.abs(offset) > 2) return null;
            return (
              <motion.div key={i}
                animate={{
                  x: offset * 26, y: Math.abs(offset) * 12,
                  rotate: offset * 3.5, scale: 1 - Math.abs(offset) * 0.06,
                  opacity: 1 - Math.abs(offset) * 0.32,
                  zIndex: total - Math.abs(offset),
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                style={{ position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden", cursor: offset !== 0 ? "pointer" : "default" }}
                onClick={() => offset !== 0 && setActiveIdx(i)}
              >{child}</motion.div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {children.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} aria-label={`Card ${i + 1}`}
              style={{ width: activeIdx === i ? 18 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", transition: "all 0.3s", background: activeIdx === i ? "#00D4FF" : "rgba(0,212,255,0.2)", boxShadow: activeIdx === i ? "0 0 8px rgba(0,212,255,0.5)" : "none" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ position: "relative", height: `${total * 140 + 480}px` }}>
      <div style={{ position: "sticky", top: "50%", transform: "translateY(-50%)", height: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 460, height: 340 }}>
          {children.map((child, i) => (
            <DesktopCard key={i} index={i} total={total} smooth={smooth}>{child}</DesktopCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopCard({ children, index, total, smooth }: {
  children: ReactNode; index: number; total: number; smooth: MotionValue<number>;
}) {
  const seg = 1 / total;
  const inStart = index * seg;
  const inPeak  = inStart + seg * 0.55;
  const outEnd  = inStart + seg;

  // Card slides in from right, settles into stack position
  const x = useTransform(smooth, [inStart, inPeak, outEnd], [500, (total - 1 - index) * -20, -500]);
  const y = useTransform(smooth, [inStart, inPeak, outEnd], [60, (total - 1 - index) * 16, -60]);
  const rotate = useTransform(smooth, [inStart, inPeak, outEnd], [14, (total - 1 - index) * -2.5, -16]);
  const scale = useTransform(smooth, [inStart, inPeak, outEnd], [0.82, 1 - (total - 1 - index) * 0.04, 0.82]);
  const opacity = useTransform(smooth, [inStart, inStart + 0.04, outEnd - 0.04, outEnd], [0, 1, 1, 0]);

  return (
    <motion.div style={{ position: "absolute", inset: 0, x, y, rotate, scale, opacity, zIndex: index, borderRadius: 16, overflow: "hidden" }}>
      {children}
    </motion.div>
  );
}