"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";

type Dir = "up"|"down"|"left"|"right"|"none";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
  direction?: Dir;
  className?: string;
}

const dirMap: Record<Dir, object> = {
  up:    { y: 36, x: 0 },
  down:  { y: -36, x: 0 },
  left:  { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none:  { x: 0, y: 0 },
};

export default function FadeIn({ children, style={}, delay=0, direction="up", className="" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}>
      {children}
    </motion.div>
  );
}