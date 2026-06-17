"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ArchScene = dynamic(() => import("./ArchScene"), { ssr: false });

export default function GlobalScene() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Skip entirely on touch/mobile devices and reduced-motion preference,
    // this is the single biggest performance cost on the page (main-thread
    // work, long tasks, TBT). Desktop pointer devices only.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < 768;

    setShouldRender(!isTouch && !prefersReducedMotion && !isNarrow);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldRender]);

  // Only mount the heavy WebGL scene on the homepage, it adds nothing on
  // inner pages (about/services/ventures/contact) and was previously
  // running on every route, which is wasted main-thread work.
  if (pathname !== "/" || !shouldRender) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <ArchScene scrollProgress={scrollProgress} />
    </div>
  );
}