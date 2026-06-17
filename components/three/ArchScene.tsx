"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh, Points, Group } from "three";
import { DoubleSide } from "three";

function ArchColumn({ position, bright = false }: { position: [number, number, number]; bright?: boolean }) {
  const meshRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.06;
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.4 + position[0]) * 0.08;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.06, 3.8, 0.06]} />
      <meshStandardMaterial
        color={bright ? "#C9853E" : "#7A4E22"}
        emissive={bright ? "#5C3A18" : "#2E1B08"}
        emissiveIntensity={0.7}
        metalness={0.65}
        roughness={0.3}
      />
    </mesh>
  );
}

function FloatingPlane({ position, rotation, opacity = 0.55 }: {
  position: [number, number, number];
  rotation: [number, number, number];
  opacity?: number;
}) {
  return (
    <Float speed={1.0} rotationIntensity={0.18} floatIntensity={0.3}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial
          color="#9C6B36"
          emissive="#3D2510"
          emissiveIntensity={0.6}
          metalness={0.55}
          roughness={0.3}
          side={DoubleSide}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const count = 70;
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
      ref.current.rotation.x = scrollProgress * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#EDE6D6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ── Section-specific morphing shapes ──
   These respond to scrollProgress (0 → 1 across the whole page)
   and morph/rotate/translate to create a narrative arc:
   0.0–0.2  hero        → columns + particles, camera close
   0.2–0.45 about        → columns spread apart, form a horizontal line
   0.45–0.7 services     → columns arrange into a grid/cluster, rotate
   0.7–1.0  ventures/cta → columns converge into a single tight tower
*/
function NarrativeGroup({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<Group>(null);
  const innerRefs = useRef<Mesh[]>([]);

  const columns = useMemo(() => {
    const cols: Array<{ basePos: [number,number,number]; bright: boolean }> = [];
    for (let i = -3; i <= 3; i++) {
      for (let j = -3; j <= 3; j++) {
        if (Math.abs(i) + Math.abs(j) > 1) {
          cols.push({ basePos: [i * 1.25, 0, j * 1.25], bright: Math.abs(i) + Math.abs(j) < 4 });
        }
      }
    }
    return cols;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress;

    // Global group rotation increases with scroll for a "walking around" feel
    groupRef.current.rotation.y = t * 0.01 + p * Math.PI * 1.4;
    groupRef.current.position.z = -p * 3;
    groupRef.current.position.y = Math.sin(t * 0.2) * 0.05 - p * 0.6;

    // Per-column morph: spread → grid → converge
    innerRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const col = columns[idx];
      const [bx, by, bz] = col.basePos;

      let targetX = bx, targetY = by, targetZ = bz, targetScale = 1;

      if (p < 0.25) {
        // Hero: original grid
        targetX = bx; targetY = by; targetZ = bz; targetScale = 1;
      } else if (p < 0.5) {
        // About: spread into a wide horizontal line
        const spread = (p - 0.25) / 0.25;
        targetX = bx * (1 + spread * 1.8);
        targetY = by;
        targetZ = bz * (1 - spread * 0.8);
        targetScale = 1 - spread * 0.25;
      } else if (p < 0.75) {
        // Services: cluster into rotating ring
        const ringP = (p - 0.5) / 0.25;
        const angle = (idx / columns.length) * Math.PI * 2 + t * 0.3;
        const radius = 2.2;
        targetX = Math.cos(angle) * radius * ringP + bx * (1 - ringP);
        targetY = Math.sin(idx * 0.5) * 0.8 * ringP + by * (1 - ringP);
        targetZ = Math.sin(angle) * radius * ringP + bz * (1 - ringP);
        targetScale = 1 + ringP * 0.3;
      } else {
        // Ventures/CTA: converge into a tight central tower
        const convP = (p - 0.75) / 0.25;
        targetX = bx * (1 - convP) ;
        targetY = by + idx * 0.05 * convP;
        targetZ = bz * (1 - convP);
        targetScale = 1 - convP * 0.4;
      }

      mesh.position.x += (targetX - mesh.position.x) * 0.06;
      mesh.position.y += (targetY - mesh.position.y) * 0.06;
      mesh.position.z += (targetZ - mesh.position.z) * 0.06;
      mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.06);
      mesh.rotation.y = t * 0.06 + idx * 0.02;
    });
  });

  const planes = [
    { position: [2.2,  0.6, -1.2] as [number,number,number], rotation: [0.2,  0.5,  0]    as [number,number,number], opacity: 0.6 },
    { position: [-2.2,-0.4,  1.2] as [number,number,number], rotation: [-0.1,-0.4,  0.1]  as [number,number,number], opacity: 0.5 },
    { position: [0.2,  1.1, -2.8] as [number,number,number], rotation: [0.3,  0.2, -0.1]  as [number,number,number], opacity: 0.65},
    { position: [1.8, -0.9,  0.6] as [number,number,number], rotation: [-0.2, 0.8,  0]    as [number,number,number], opacity: 0.45},
    { position: [-1.5, 0.8,  2.0] as [number,number,number], rotation: [0.1, -0.6,  0.15] as [number,number,number], opacity: 0.5 },
  ];

  return (
    <group ref={groupRef}>
      {columns.map(({ basePos, bright }, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) innerRefs.current[i] = el; }}
          position={basePos}
        >
          <boxGeometry args={[0.06, 3.8, 0.06]} />
          <meshStandardMaterial
            color={bright ? "#C9853E" : "#7A4E22"}
            emissive={bright ? "#5C3A18" : "#2E1B08"}
            emissiveIntensity={0.7}
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>
      ))}
      {planes.map((p, i) => <FloatingPlane key={i} {...p} />)}
    </group>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress;

    // Idle sway
    const idleX = Math.sin(t * 0.18) * 0.15;
    const idleY = Math.cos(t * 0.12) * 0.08;

    // Scroll-driven fly-through across the whole page
    const targetZ = 5.5 - p * 4.5;
    const targetY = idleY + p * 1.2;
    const targetX = idleX + Math.sin(p * Math.PI * 1.2) * 0.8;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, -p * 0.5, -p * 1.5);
  });
  return null;
}

function SceneSetup() {
  const { gl } = useThree();
  useEffect(() => { gl.setClearColor(0x000000, 0); }, [gl]);
  return null;
}

export default function ArchScene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 58 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <SceneSetup />
      {/* Warm key light from top-right */}
      <directionalLight position={[5, 8, 3]} intensity={2.4} color="#E8B57D" />
      {/* Cool fill from left */}
      <directionalLight position={[-4, 2, 6]} intensity={0.9} color="#EDE6D6" />
      {/* Warm accent from below */}
      <pointLight position={[0, -4, 2]} intensity={1.4} color="#C9853E" />
      {/* Ambient so nothing is pitch black */}
      <ambientLight intensity={0.4} color="#4A2E14" />

      <CameraRig scrollProgress={scrollProgress} />
      <NarrativeGroup scrollProgress={scrollProgress} />
      <ParticleField scrollProgress={scrollProgress} />
    </Canvas>
  );
}