"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: string;
  style?: React.CSSProperties;
  delay?: number;
  tag?: "h1"|"h2"|"h3"|"p"|"span";
}

export default function TextReveal({ children, style={}, delay=0, tag: Tag="h2" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const words = children.split(" ");
  return (
    <Tag ref={ref} style={{ ...style, lineHeight: style.lineHeight || "1.05" }} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }}>
          <motion.span style={{ display: "inline-block" }}
            initial={{ y: "108%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.055 }}>
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}