"use client";
import { useRef, useState, ReactNode, Children } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Horizontal snap carousel with a glowing active-card highlight and 
// slide-in/out animations between cards.
export default function GlowCarousel({ children, label = "item" }: { children: ReactNode; label?: string }) {
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) setActive(i => Math.min(i + 1, items.length - 1));
    else if (dx > 40) setActive(i => Math.max(i - 1, 0));
  };

  const prev = () => setActive(i => Math.max(i - 1, 0));
  const next = () => setActive(i => Math.min(i + 1, items.length - 1));

  return (
    <div>
      {/* Outer track */}
      <div style={{ position: "relative", overflow: "hidden" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <motion.div ref={trackRef}
          animate={{ x: `${-active * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          style={{ display: "flex" }}
        >
          {items.map((item, i) => (
            <div key={i} style={{ flex: "0 0 100%", padding: "0 0.5rem" }}>
              <motion.div
                animate={{ scale: i === active ? 1 : 0.95, opacity: i === active ? 1 : 0.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ boxShadow: i === active ? "0 0 32px rgba(0,212,255,0.15)" : "none", transition: "box-shadow 0.4s" }}
              >
                {item}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, padding: "0 0.5rem" }}>
        <button onClick={prev} aria-label="Previous" disabled={active === 0}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(0,212,255,0.3)", background: "transparent", color: "#00D4FF", cursor: "pointer", opacity: active === 0 ? 0.3 : 1, transition: "all 0.3s", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ←
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`${label} ${i + 1}`}
              style={{ width: active === i ? 20 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", background: active === i ? "#00D4FF" : "rgba(0,212,255,0.2)", transition: "all 0.35s", boxShadow: active === i ? "0 0 8px rgba(0,212,255,0.5)" : "none" }} />
          ))}
        </div>
        <button onClick={next} aria-label="Next" disabled={active === items.length - 1}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(0,212,255,0.3)", background: "transparent", color: "#00D4FF", cursor: "pointer", opacity: active === items.length - 1 ? 0.3 : 1, transition: "all 0.3s", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          →
        </button>
      </div>
    </div>
  );
}