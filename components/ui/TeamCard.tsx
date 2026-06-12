"use client";
import { useState } from "react";
import Image from "next/image";

interface TeamCardProps {
  name: string;
  role: string;
  specialization: string;
  image: string;
}

export default function TeamCard({ name, role, specialization, image }: TeamCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          background: "#2A1C10",
          marginBottom: 16,
          overflow: "hidden",
        }}
      >
        {/* Member photo — black & white */}
        <Image
          src={image}
          alt={name}
          fill
          style={{
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.05)",
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            transform: hover ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Hover overlay — grows up from bottom to ~25% height */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: hover ? "25%" : "0%",
            background: "rgba(10,8,7,0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1.25rem",
            overflow: "hidden",
            transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
            borderTop: hover ? "1px solid rgba(201,133,62,0.35)" : "1px solid transparent",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.78rem",
              color: "#EDE6D6",
              textAlign: "center",
              lineHeight: 1.6,
              opacity: hover ? 1 : 0,
              transition: "opacity 0.35s ease 0.1s",
              margin: 0,
            }}
          >
            {specialization}
          </p>
        </div>
      </div>

      <h3 style={{ fontFamily: '"Space Grotesk",sans-serif', fontSize: "1.4rem", fontWeight: 400, color: "#EDE6D6", marginBottom: 6 }}>
        {name}
      </h3>
      <p style={{ fontFamily: "Inter,sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9853E" }}>
        {role}
      </p>
    </div>
  );
}