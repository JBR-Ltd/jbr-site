"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import * as THREE from "three";
import { DoubleSide } from "three";

// ─── SCENE NARRATIVE ───────────────────────────────────────────────────────
// scroll 0.00–0.20  → car drives in from left
// scroll 0.20–0.35  → car slows, parks
// scroll 0.35–0.55  → stick figure climbs out, walks to house
// scroll 0.55–0.70  → figure reaches door, door opens
// scroll 0.70–0.85  → figure goes inside, dot appears above house
// scroll 0.85–1.00  → lights flicker on, warm glow fills windows
// ───────────────────────────────────────────────────────────────────────────

interface Props { progress: number }

// ── Ground ──────────────────────────────────────────────────────────────────
function Ground() {
  return (
    <>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 4]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      {/* Grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -3.5]}>
        <planeGeometry args={[30, 5]} />
        <meshStandardMaterial color="#0f0a04" roughness={1} />
      </mesh>
      {/* Road dashes */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
          <planeGeometry args={[1.2, 0.08]} />
          <meshStandardMaterial color="#c9853e" opacity={0.3} transparent />
        </mesh>
      ))}
    </>
  );
}

// ── House ────────────────────────────────────────────────────────────────────
function House({ lit }: { lit: number }) {
  const windowGlow = new THREE.Color().lerpColors(
    new THREE.Color("#1a0f00"),
    new THREE.Color("#c9853e"),
    Math.max(0, lit)
  );
  const windowIntensity = Math.max(0, lit) * 2.5;

  return (
    <group position={[5, 0, -2.5]}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.8, 1.6]} />
        <meshStandardMaterial color="#2a1c10" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.15, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.4, 0.7, 4]} />
        <meshStandardMaterial color="#1a0f00" roughness={0.9} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.45, 0.81]}>
        <boxGeometry args={[0.5, 0.9, 0.04]} />
        <meshStandardMaterial color="#0a0807" roughness={0.9} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.18, 0.45, 0.84]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#c9853e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left window */}
      <mesh position={[-0.7, 1.1, 0.81]}>
        <planeGeometry args={[0.5, 0.4]} />
        <meshStandardMaterial color={windowGlow} emissive={windowGlow} emissiveIntensity={windowIntensity} />
      </mesh>
      {/* Right window */}
      <mesh position={[0.7, 1.1, 0.81]}>
        <planeGeometry args={[0.5, 0.4]} />
        <meshStandardMaterial color={windowGlow} emissive={windowGlow} emissiveIntensity={windowIntensity} />
      </mesh>
      {/* Window glow light */}
      {lit > 0 && (
        <pointLight position={[0, 1, 2]} intensity={lit * 3} color="#c9853e" distance={5} decay={2} />
      )}
    </group>
  );
}

// ── Car ──────────────────────────────────────────────────────────────────────
function Car({ carX }: { carX: number }) {
  return (
    <group position={[carX, 0.22, 0]}>
      {/* Body */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.4, 0.35, 0.7]} />
        <meshStandardMaterial color="#c9853e" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.05, 0.42, 0]}>
        <boxGeometry args={[0.8, 0.28, 0.62]} />
        <meshStandardMaterial color="#2a1c10" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* Wheels */}
      {[[-0.45, -0.14, 0.36], [0.45, -0.14, 0.36], [-0.45, -0.14, -0.36], [0.45, -0.14, -0.36]].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.1, 12]} />
          <meshStandardMaterial color="#0a0807" roughness={0.9} />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[0.71, 0.18, 0.2]}>
        <boxGeometry args={[0.04, 0.08, 0.12]} />
        <meshStandardMaterial color="#ede6d6" emissive="#c9853e" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.71, 0.18, -0.2]}>
        <boxGeometry args={[0.04, 0.08, 0.12]} />
        <meshStandardMaterial color="#ede6d6" emissive="#c9853e" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// ── Stick Figure ──────────────────────────────────────────────────────────────
function StickFigure({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // figure visible from p=0.35 to p=0.85
  const visible = progress >= 0.35 && progress <= 0.85;

  // walk from beside car (~3.2) to house door (~4.8), normalised
  const walkT = Math.min(1, Math.max(0, (progress - 0.35) / 0.3));
  const figX = THREE.MathUtils.lerp(2.8, 4.55, walkT);

  // leg swing animation based on walk progress
  const legSwing = Math.sin(walkT * Math.PI * 6) * 0.25;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // idle bob when stopped
      if (progress >= 0.65) {
        groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.015;
      }
    }
  });

  if (!visible) return null;

  const matProps = { color: "#ede6d6" as const, roughness: 0.8 };

  return (
    <group ref={groupRef} position={[figX, 0.18, -1.2]}>
      {/* Head */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.35, 6]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Arms */}
      <mesh position={[0, 0.52, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 6]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[0, 0.52, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 6]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      {/* Legs */}
      <mesh position={[0.06, 0.22, 0]} rotation={[0, 0, legSwing]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
      <mesh position={[-0.06, 0.22, 0]} rotation={[0, 0, -legSwing]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
}

// ── Dot / notification ────────────────────────────────────────────────────────
function Dot({ progress }: { progress: number }) {
  const visible = progress >= 0.7;
  const scale = Math.min(1, (progress - 0.7) / 0.1);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (pulseRef.current && visible) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      pulseRef.current.scale.setScalar(s * scale);
    }
  });

  if (!visible) return null;

  return (
    <group position={[5, 2.8, -2.5]}>
      {/* Dot */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#c9853e" emissive="#c9853e" emissiveIntensity={2} />
      </mesh>
      {/* Ping ring */}
      <mesh>
        <ringGeometry args={[0.14, 0.18, 24]} />
        <meshStandardMaterial color="#c9853e" opacity={0.4 * scale} transparent side={DoubleSide} />
      </mesh>
      {/* Line to house */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
        <meshStandardMaterial color="#c9853e" opacity={0.5 * scale} transparent />
      </mesh>
    </group>
  );
}

// ── Camera controller ─────────────────────────────────────────────────────────
function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Slowly pan from left (car arrival) to right (house detail) as story progresses
    const targetX = THREE.MathUtils.lerp(-4, 3, Math.min(1, progress * 1.8));
    const targetY = THREE.MathUtils.lerp(2.5, 1.8, Math.min(1, progress));
    const targetZ = THREE.MathUtils.lerp(7, 5.5, Math.min(1, progress));

    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.lookAt(2, 0.5, -1.5);
  });

  return null;
}

// ── Main scene ────────────────────────────────────────────────────────────────
function Scene({ progress }: Props) {
  // Car: drives from far left to park position
  const carX = THREE.MathUtils.lerp(-14, 2.8, Math.min(1, progress / 0.3));

  // Lit: 0 → off, 1 → fully on (flicker effect included in component)
  const lit = Math.max(0, (progress - 0.75) / 0.25);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#2a1c10" />
      <directionalLight position={[-5, 6, 4]} intensity={0.8} color="#c9853e" castShadow />
      <pointLight position={[0, 4, 2]} intensity={0.3} color="#ede6d6" />

      {/* Stars / particles */}
      <Stars />

      <Ground />
      <House lit={lit} />
      <Car carX={carX} />
      <StickFigure progress={progress} />
      <Dot progress={progress} />
      <CameraRig progress={progress} />
    </>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(180);
    for (let i = 0; i < 60; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 8 + 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ede6d6" transparent opacity={0.6} />
    </points>
  );
}

// ── Wrapper ───────────────────────────────────────────────────────────────────
export default function RelloStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const progressRef = useRef(0);

  useEffect(() => {
    return smooth.on("change", v => { progressRef.current = v; });
  }, [smooth]);

  // We need to pass live progress into the Canvas. Since Canvas lives in its
  // own React subtree, we bridge via a ref we poll inside useFrame.
  const canvasRef = useRef<{ setProgress: (v: number) => void } | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "300vh", background: "var(--b)" }}
    >
      {/* Sticky canvas */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* Narrative label — updates with scroll */}
        <NarrativeLabel scrollProgress={smooth} />

        <Canvas
          camera={{ position: [-4, 2.5, 7], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          style={{ background: "#050810", width: "100%", height: "100%" }}
        >
          <SceneWithProgress smooth={smooth} progressRef={progressRef} />
        </Canvas>
      </div>
    </section>
  );
}

// Bridge: reads the MotionValue inside useFrame (avoids re-renders)
function SceneWithProgress({ smooth, progressRef }: { smooth: MotionValue<number>; progressRef: React.MutableRefObject<number> }) {
  const progressLive = useRef(0);

  useFrame(() => {
    progressLive.current = progressRef.current;
  });

  // We render Scene with a proxy that reads progressLive inside useFrame
  return <SceneLive progressRef={progressLive} />;
}

function SceneLive({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const carGroupRef = useRef<THREE.Group>(null);
  const figureRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Group>(null);
  const win1Ref = useRef<THREE.Mesh>(null);
  const win2Ref = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(180);
    for (let i = 0; i < 60; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = Math.random() * 8 + 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const p = progressRef.current;
    const t = clock.getElapsedTime();

    // ── Camera ──
    const camX = THREE.MathUtils.lerp(-4, 3, Math.min(1, p * 1.8));
    const camY = THREE.MathUtils.lerp(2.5, 1.8, Math.min(1, p));
    const camZ = THREE.MathUtils.lerp(7, 5.5, Math.min(1, p));
    camera.position.x += (camX - camera.position.x) * 0.06;
    camera.position.y += (camY - camera.position.y) * 0.06;
    camera.position.z += (camZ - camera.position.z) * 0.06;
    camera.lookAt(2, 0.5, -1.5);

    // ── Car ──
    if (carGroupRef.current) {
      const carX = THREE.MathUtils.lerp(-14, 2.8, Math.min(1, p / 0.3));
      carGroupRef.current.position.x = carX;
      // Wheel spin proportional to speed
      const speed = p < 0.3 ? 1 : 0;
      carGroupRef.current.children.forEach((child, i) => {
        if (i >= 2 && i <= 5) (child as THREE.Mesh).rotation.z -= speed * 0.08;
      });
    }

    // ── Figure ──
    if (figureRef.current) {
      const visible = p >= 0.35 && p <= 0.85;
      figureRef.current.visible = visible;
      if (visible) {
        const walkT = Math.min(1, Math.max(0, (p - 0.35) / 0.3));
        figureRef.current.position.x = THREE.MathUtils.lerp(2.8, 4.55, walkT);
        if (p >= 0.65) {
          figureRef.current.position.y = Math.sin(t * 2) * 0.015;
        }
      }
    }

    // ── Dot ──
    if (dotRef.current) {
      const visible = p >= 0.7;
      dotRef.current.visible = visible;
      if (visible) {
        const scale = Math.min(1, (p - 0.7) / 0.1);
        const pulse = 1 + Math.sin(t * 3) * 0.15;
        dotRef.current.scale.setScalar(scale * pulse);
      }
    }

    // ── Window light ──
    const lit = Math.max(0, (p - 0.75) / 0.25);
    // Flicker effect
    const flicker = p > 0.75 && p < 0.88 ? Math.random() * 0.4 : 1;
    const emissiveIntensity = lit * 2.5 * flicker;
    const warmColor = new THREE.Color().lerpColors(
      new THREE.Color("#1a0f00"), new THREE.Color("#c9853e"), lit
    );
    if (win1Ref.current) {
      const mat = (win1Ref.current as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.color = warmColor;
      mat.emissive = warmColor;
      mat.emissiveIntensity = emissiveIntensity;
    }
    if (win2Ref.current) {
      const mat = (win2Ref.current as THREE.Mesh).material as THREE.MeshStandardMaterial;
      mat.color = warmColor;
      mat.emissive = warmColor;
      mat.emissiveIntensity = emissiveIntensity;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#2a1c10" />
      <directionalLight position={[-5, 6, 4]} intensity={0.8} color="#c9853e" castShadow />
      <pointLight position={[0, 4, 2]} intensity={0.3} color="#ede6d6" />

      {/* Stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#ede6d6" transparent opacity={0.6} />
      </points>

      {/* Ground / road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 4]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -3.5]}>
        <planeGeometry args={[40, 5]} />
        <meshStandardMaterial color="#0f0a04" roughness={1} />
      </mesh>
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.005, 0]}>
          <planeGeometry args={[1.2, 0.08]} />
          <meshStandardMaterial color="#c9853e" opacity={0.25} transparent />
        </mesh>
      ))}

      {/* House */}
      <group position={[5, 0, -2.5]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.8, 1.6]} />
          <meshStandardMaterial color="#2a1c10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.15, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.4, 0.7, 4]} />
          <meshStandardMaterial color="#1a0f00" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.45, 0.81]}>
          <boxGeometry args={[0.5, 0.9, 0.04]} />
          <meshStandardMaterial color="#0a0807" roughness={0.9} />
        </mesh>
        <mesh position={[0.18, 0.45, 0.84]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#c9853e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={win1Ref} position={[-0.7, 1.1, 0.81]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial color="#1a0f00" emissive="#1a0f00" emissiveIntensity={0} />
        </mesh>
        <mesh ref={win2Ref} position={[0.7, 1.1, 0.81]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial color="#1a0f00" emissive="#1a0f00" emissiveIntensity={0} />
        </mesh>
      </group>

      {/* Car */}
      <group ref={carGroupRef} position={[-14, 0.22, 0]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.4, 0.35, 0.7]} />
          <meshStandardMaterial color="#c9853e" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[-0.05, 0.42, 0]}>
          <boxGeometry args={[0.8, 0.28, 0.62]} />
          <meshStandardMaterial color="#2a1c10" />
        </mesh>
        {([[-0.45,-0.14,0.36],[0.45,-0.14,0.36],[-0.45,-0.14,-0.36],[0.45,-0.14,-0.36]] as [number,number,number][]).map((pos, i) => (
          <mesh key={i} position={pos} rotation={[Math.PI/2,0,0]}>
            <cylinderGeometry args={[0.14,0.14,0.1,12]} />
            <meshStandardMaterial color="#0a0807" roughness={0.9} />
          </mesh>
        ))}
        <mesh position={[0.71,0.18,0.2]}>
          <boxGeometry args={[0.04,0.08,0.12]} />
          <meshStandardMaterial color="#ede6d6" emissive="#c9853e" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0.71,0.18,-0.2]}>
          <boxGeometry args={[0.04,0.08,0.12]} />
          <meshStandardMaterial color="#ede6d6" emissive="#c9853e" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Stick figure */}
      <group ref={figureRef} position={[2.8, 0.18, -1.2]} visible={false}>
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
        <mesh position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.025,0.025,0.32,6]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
        <mesh position={[0.1, 0.52, 0]} rotation={[0,0,0.5]}>
          <cylinderGeometry args={[0.018,0.018,0.26,6]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
        <mesh position={[-0.1, 0.52, 0]} rotation={[0,0,-0.5]}>
          <cylinderGeometry args={[0.018,0.018,0.26,6]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
        <mesh position={[0.06, 0.22, 0]} rotation={[0,0,0.2]}>
          <cylinderGeometry args={[0.018,0.018,0.28,6]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
        <mesh position={[-0.06, 0.22, 0]} rotation={[0,0,-0.2]}>
          <cylinderGeometry args={[0.018,0.018,0.28,6]} />
          <meshStandardMaterial color="#ede6d6" />
        </mesh>
      </group>

      {/* Dot */}
      <group ref={dotRef} position={[5, 2.8, -2.5]} visible={false}>
        <mesh>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#c9853e" emissive="#c9853e" emissiveIntensity={3} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.14, 0.2, 24]} />
          <meshStandardMaterial color="#c9853e" opacity={0.4} transparent side={DoubleSide} />
        </mesh>
        <mesh position={[0, -0.26, 0]}>
          <cylinderGeometry args={[0.012,0.012,0.42,6]} />
          <meshStandardMaterial color="#c9853e" opacity={0.5} transparent />
        </mesh>
      </group>
    </>
  );
}

// ── Narrative label ───────────────────────────────────────────────────────────
const LABELS = [
  { at: 0,    text: "A family is searching for their home..." },
  { at: 0.2,  text: "They arrive at the neighbourhood..." },
  { at: 0.35, text: "They step out to take a closer look..." },
  { at: 0.55, text: "They walk up to the front door..." },
  { at: 0.7,  text: "They find their perfect home on Rello." },
  { at: 0.85, text: "Lights on. A new chapter begins." },
];

function NarrativeLabel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const labelRef = useRef<HTMLDivElement>(null);
  const currentLabel = useRef(0);

  useEffect(() => {
    return scrollProgress.on("change", v => {
      let idx = 0;
      for (let i = LABELS.length - 1; i >= 0; i--) {
        if (v >= LABELS[i].at) { idx = i; break; }
      }
      if (idx !== currentLabel.current) {
        currentLabel.current = idx;
        if (labelRef.current) {
          labelRef.current.style.opacity = "0";
          setTimeout(() => {
            if (labelRef.current) {
              labelRef.current.textContent = LABELS[idx].text;
              labelRef.current.style.opacity = "1";
            }
          }, 200);
        }
      }
    });
  }, [scrollProgress]);

  return (
    <div style={{
      position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
      zIndex: 10, textAlign: "center", pointerEvents: "none",
    }}>
      <div ref={labelRef}
        style={{
          fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(237,230,214,0.85)",
          letterSpacing: "0.04em", lineHeight: 1.5,
          background: "rgba(10,8,7,0.6)", backdropFilter: "blur(8px)",
          padding: "10px 24px", borderRadius: 24,
          border: "1px solid rgba(201,133,62,0.2)",
          transition: "opacity 0.25s ease",
        }}
      >
        {LABELS[0].text}
      </div>
      <div style={{ marginTop: 8, fontFamily: "var(--font-sans)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,133,62,0.5)" }}>
        Scroll to continue the story
      </div>
    </div>
  );
}