"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jbr_loaded_v1";

// Approximate node points tracing the JBR diamond/maze logo silhouette
const NODES = [
  // Outer diamond
  { x: 200, y: 60 },  { x: 280, y: 110 }, { x: 330, y: 160 }, { x: 300, y: 200 },
  { x: 340, y: 200 }, { x: 200, y: 340 }, { x: 60, y: 200 },  { x: 100, y: 200 },
  { x: 130, y: 160 }, { x: 80, y: 110 },
  // Inner maze fragments
  { x: 200, y: 110 }, { x: 240, y: 140 }, { x: 200, y: 170 }, { x: 160, y: 140 },
  { x: 180, y: 200 }, { x: 220, y: 200 }, { x: 200, y: 230 }, { x: 160, y: 260 },
  { x: 240, y: 260 }, { x: 200, y: 290 },
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
    const t1 = setTimeout(() => setPhase("form"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    const t3 = setTimeout(() => setVisible(false), 3200);
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
            background: "#0A0807",
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
                  fill="#C9853E"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0.6],
                    scale: [0, 1.4, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.045,
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
                    filter: "drop-shadow(0 0 24px rgba(201,133,62,0.35))",
                  }}
                />
              )}

              {/* Connecting lines during particle phase */}
              {phase === "particles" && NODES.slice(0, -1).map((n, i) => (
                <motion.line
                  key={`l-${i}`}
                  x1={n.x} y1={n.y} x2={NODES[i + 1].x} y2={NODES[i + 1].y}
                  stroke="#C9853E" strokeWidth="0.5" opacity="0.25"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.045 + 0.2 }}
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
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "0.8rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "#EDE6D6",
                fontWeight: 500,
              }}
            >
              JBR LIMITED
            </motion.span>

            {/* Progress bar */}
            <div style={{ width: 160, height: 1, background: "rgba(201,133,62,0.15)", overflow: "hidden", marginTop: 6 }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%", background: "#C9853E",
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
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "0.62rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(237,230,214,0.35)",
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