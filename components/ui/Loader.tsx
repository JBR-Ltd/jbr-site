"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "jbr_loaded_v2";

// Exact SVG path coordinates mapping the 6 interlocking blocks of the JBR logo
const SHAPES = [
  // Left side: Orange/Amber blocks
  { d: "M 122 68 L 212 113 L 212 139 L 122 94 Z", color: "#F38D1E" }, // Top orange
  { d: "M 82 133 L 172 178 L 172 204 L 82 159 Z", color: "#F38D1E" },  // Middle orange
  { d: "M 122 198 L 212 243 L 212 269 L 122 224 Z", color: "#F38D1E" }, // Bottom orange
  
  // Right side: Dark Gray blocks
  { d: "M 187 133 L 277 178 L 277 204 L 187 159 Z", color: "#5C6064" }, // Top gray
  { d: "M 227 198 L 317 243 L 317 269 L 227 224 Z", color: "#5C6064" }, // Middle gray
  { d: "M 187 263 L 277 308 L 277 334 L 187 289 Z", color: "#5C6064" }, // Bottom gray
];

export default function Loader() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [phase, setPhase] = useState("drawing");

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
    const t1 = setTimeout(() => setPhase("filling"), 1400);
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
            position: "fixed", 
            inset: 0, 
            zIndex: 99999,
            background: "transparent", // Transparent background as requested
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            gap: 20,
            backdropFilter: "blur(4px)", // Optional: adds a slight blur to content behind
          }}
        >
          {/* SVG boot-up sequence */}
          <div style={{ width: 220, height: 220, position: "relative" }}>
            <svg viewBox="0 0 400 400" width="100%" height="100%">
              {SHAPES.map((shape, i) => (
                <motion.path
                  key={i}
                  d={shape.d}
                  stroke={shape.color}
                  strokeWidth="3"
                  strokeLinejoin="round"
                  initial={{ 
                    pathLength: 0, 
                    fill: "rgba(0,0,0,0)",
                    opacity: 0 
                  }}
                  animate={{
                    pathLength: [0, 1, 1],
                    fill: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", shape.color],
                    opacity: [0, 1, 1]
                  }}
                  transition={{
                    duration: 2.2,
                    times: [0, 0.6, 1], // 0-60% time drawing stroke, 60-100% filling color
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  style={{
                    filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.15))",
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Wordmark + status line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "2.5rem",
                letterSpacing: "0.1em",
                color: "#4A4D50", // Matches the gray from the logo text
                fontWeight: 700,
              }}
            >
              JBR
            </motion.span>

            {/* Progress bar */}
            <div style={{ width: 140, height: 2, background: "rgba(243,141,30,0.2)", overflow: "hidden", marginTop: 8, borderRadius: 2 }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: "100%", 
                  background: "#F38D1E",
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
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#888",
                marginTop: 6,
              }}
            >
              {phase === "drawing" && "Mapping structure"}
              {phase === "filling" && "Rendering interface"}
              {phase === "done" && "Ready"}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}