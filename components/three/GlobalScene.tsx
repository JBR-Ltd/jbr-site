"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ArchScene = dynamic(() => import("./ArchScene"), { ssr: false });

export default function GlobalScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <ArchScene scrollProgress={scrollProgress} />
    </div>
  );
}