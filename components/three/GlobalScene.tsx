"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ArchScene = dynamic(() => import("./ArchScene"), { ssr: false });

export default function GlobalScene() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Skip entirely on touch/mobile devices and reduced-motion preference —
    // this is the single biggest performance cost on the page (main-thread
    // work, long tasks, TBT). Desktop pointer devices only.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isNarrow = window.innerWidth < 768;

    setShouldRender(!isTouch && !prefersReducedMotion && !isNarrow);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    // Defer the actual WebGL mount until the browser is idle / after first
    // paint, so it never competes with FCP/LCP. The scene is decorative —
    // it can appear a beat after the real content is visible.
    const win = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setMounted(true));
      return () => {
        if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      };
    }
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldRender]);

  // Only mount the heavy WebGL scene on the homepage — it adds nothing on
  // inner pages (about/services/ventures/contact) and was previously
  // running on every route, which is wasted main-thread work.
  if (pathname !== "/" || !shouldRender || !mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <ArchScene scrollProgress={scrollProgress} />
    </div>
  );
}