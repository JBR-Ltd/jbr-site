"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jbr_loaded_v1";

// Approximate node points tracing the JBR diamond/maze logo silhouette.
// Trimmed from 19 to 10 points, still reads as the logo shape forming,
// but roughly halves the number of simultaneously animating SVG elements
// during the most LCP-sensitive window of the page.
const NODES = [
  { x: 200, y: 60 },  { x: 300, y: 200 }, { x: 200, y: 340 }, { x: 100, y: 200 },
  { x: 200, y: 110 }, { x: 240, y: 140 }, { x: 200, y: 170 }, { x: 160, y: 140 },
  { x: 200, y: 230 }, { x: 200, y: 290 },
];

export default function Loader() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"particles" | "form" | "done">("particles");

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen) {
        setVisible(false);
      } else {
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      // sessionStorage unavailable, show loader anyway
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setPhase("form"), 750);
    const t2 = setTimeout(() => setPhase("done"), 1350);
    const t3 = setTimeout(() => setVisible(false), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  if (visible === null || visible === false) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "var(--b)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 28,
          }}
        >
          {/* SVG boot-up sequence */}
          <div style={{ width: 180, height: 180, position: "relative" }}>
            <svg viewBox="0 0 400 400" width="180" height="180">
              {/* Particle phase */}
              {phase === "particles" && NODES.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x} cy={n.y} r={3}
                  fill="var(--p)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.6],
                    scale: [0, 1.4, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}

              {/* Form phase, the actual logo fades/draws in */}
              {(phase === "form" || phase === "done") && (
                <motion.image
                  href="/logo.png"
                  x="40" y="40" width="320" height="320"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    filter: "drop-shadow(0 0 24px var(--glow-primary-sm))",
                  }}
                />
              )}

              {/* Connecting lines during particle phase */}
              {phase === "particles" && NODES.slice(0, -1).map((n, i) => (
                <motion.line
                  key={`l-${i}`}
                  x1={n.x} y1={n.y} x2={NODES[i + 1].x} y2={NODES[i + 1].y}
                  stroke="var(--p)" strokeWidth="0.5" opacity="0.25"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.25 }}
                  transition={{ duration: 0.4, delay: i * 0.035 + 0.1 }}
                />
              ))}
            </svg>
          </div>

          {/* Wordmark + status line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: "0.8rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "var(--text-strong)",
                fontWeight: 500,
              }}
            >
              JBR LIMITED
            </motion.span>

            {/* Progress bar */}
            <div style={{ width: 160, height: 1, background: "var(--border-primary-dim)", overflow: "hidden", marginTop: 6 }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%", background: "var(--p)",
                  transformOrigin: "left",
                }}
              />
            </div>

            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--text-body)",
                marginTop: 4,
              }}
            >
              {phase === "particles" && "Initializing system"}
              {phase === "form" && "Rendering interface"}
              {phase === "done" && "Ready"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}