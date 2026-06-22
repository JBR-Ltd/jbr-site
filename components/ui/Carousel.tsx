"use client";
import { useRef, useState, useEffect, ReactNode, Children } from "react";

interface CarouselProps {
  children: ReactNode;
  gap?: number;
  itemWidth?: string; // CSS width value per slide, e.g. "78%"
}

/**
 * Lightweight horizontal scroll-snap carousel.
 * Uses native CSS scroll-snap instead of a JS library — zero added
 * bundle weight, smooth on touch devices, works without JS for scrolling.
 * Dots are purely a visual progress indicator, updated on scroll.
 */
export default function Carousel({ children, gap = 16, itemWidth = "80%" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideWidth = track.scrollWidth / items.length;
      const idx = Math.round(track.scrollLeft / slideWidth);
      setActive(Math.min(idx, items.length - 1));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.scrollWidth / items.length;
    track.scrollTo({ left: slideWidth * idx, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 4,
          // Hide scrollbar visually while keeping native scroll behavior
          scrollbarWidth: "none",
        }}
        className="carousel-track"
      >
        {items.map((child, i) => (
          <div
            key={i}
            style={{
              flex: `0 0 ${itemWidth}`,
              scrollSnapAlign: "center",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: active === i ? 18 : 6,
              height: 6,
              borderRadius: 3,
              border: "none",
              padding: 0,
              background: active === i ? "var(--p)" : "rgba(232,244,255,0.25)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <style>{`
        .carousel-track::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}