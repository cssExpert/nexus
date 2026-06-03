"use client";

import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ─── Materials ─── */
function useMats() {
  return useMemo(() => {
    const body = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a2a4a"),
      metalness: 0.85,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 0.5,
    });
    const stem = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1e2e4e"),
      metalness: 0.8,
      roughness: 0.15,
      clearcoat: 0.8,
      envMapIntensity: 0.4,
    });
    const inner = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#030912"),
      roughness: 0.4,
      metalness: 0.3,
    });
    const ring = new THREE.MeshBasicMaterial({ color: new THREE.Color("#142c5e") });
    const tip  = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#050d1c"),
      roughness: 0.92,
      metalness: 0,
    });
    const led  = new THREE.MeshBasicMaterial({ color: new THREE.Color("#60A5FA") });
    const glow = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1a3a90"),
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return { body, stem, inner, ring, tip, led, glow };
  }, []);
}

/* ─── Glow Disc ─── */
function GlowDisc({ y, mats }: { y: number; mats: ReturnType<typeof useMats> }) {
  const glowTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0,   "rgba(59,130,246,0.7)");
    g.addColorStop(0.4, "rgba(37,99,235,0.3)");
    g.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[4.5, 4.5]} />
      <meshBasicMaterial
        map={glowTex}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Single Earbud ─── */
function Earbud({
  posX,
  posY,
  rotY,
  rotZ,
  floatSpeed,
  floatRange,
  mats,
}: {
  posX: number;
  posY: number;
  rotY: number;
  rotZ: number;
  floatSpeed: number;
  floatRange: [number, number];
  mats: ReturnType<typeof useMats>;
}) {
  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.06}
      floatIntensity={0.45}
      floatingRange={floatRange}
    >
      <group position={[posX, posY, 0]} rotation={[0, rotY, rotZ]}>
        {/* Pod body — slightly oval */}
        <mesh scale={[1, 1.12, 0.86]} material={mats.body}>
          <sphereGeometry args={[0.46, 64, 64]} />
        </mesh>

        {/* Driver disc */}
        <mesh position={[0, 0, 0.39]} material={mats.inner}>
          <circleGeometry args={[0.26, 64]} />
        </mesh>
        {/* Driver ring accent */}
        <mesh position={[0, 0, 0.395]} material={mats.ring}>
          <ringGeometry args={[0.26, 0.32, 64]} />
        </mesh>

        {/* Stem */}
        <mesh position={[0, -0.92, 0]} material={mats.stem}>
          <capsuleGeometry args={[0.135, 0.88, 8, 32]} />
        </mesh>

        {/* Stem bottom cap */}
        <mesh position={[0, -1.38, 0]} material={mats.stem}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>

        {/* Charging contact strip */}
        <mesh position={[0, -1.53, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.018, 8, 32]} />
          <meshBasicMaterial color="#1a3a6e" />
        </mesh>

        {/* Ear tip cushion */}
        <mesh
          position={[0, -0.3, 0.33]}
          rotation={[0.38, 0, 0]}
          scale={[1.05, 0.62, 1.05]}
          material={mats.tip}
        >
          <sphereGeometry args={[0.21, 24, 24]} />
        </mesh>

        {/* LED indicator */}
        <mesh position={[0.3, 0.24, 0.34]} material={mats.led}>
          <sphereGeometry args={[0.038, 12, 12]} />
        </mesh>

        {/* LED point light */}
        <pointLight
          position={[0.3, 0.24, 0.6]}
          color="#3B82F6"
          intensity={2}
          distance={1.6}
          decay={2}
        />

        {/* Clearcoat edge highlight strip */}
        <mesh position={[0, 0, 0]} scale={[1.01, 1.13, 0.87]}>
          <sphereGeometry args={[0.46, 32, 32]} />
          <meshBasicMaterial
            color="#1a4080"
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── Scene ─── */
function Scene() {
  const groupRef  = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const mats = useMats();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRot.current = {
        x: (e.clientY / window.innerHeight - 0.5) * -0.3,
        y: (e.clientX / window.innerWidth  - 0.5) *  0.45,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, targetRot.current.x, dt * 1.8
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, targetRot.current.y, dt * 1.8
    );
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight color="#1a2a4a" intensity={2.5} />

      {/* Key light — top right front, warm white */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={6}
        color="#d0e8ff"
      />

      {/* Front fill — ensures front face of earbud is always lit */}
      <directionalLight
        position={[0, 0, 8]}
        intensity={2}
        color="#c8e0ff"
      />

      {/* Blue rim — left back */}
      <pointLight
        position={[-5, 2, -3]}
        color="#1a50c0"
        intensity={4}
        distance={14}
        decay={1.5}
      />

      {/* Fill — low front */}
      <pointLight
        position={[0, -2, 3]}
        color="#0d2d6a"
        intensity={2}
        distance={8}
        decay={2}
      />

      {/* Scene group — rotates with mouse */}
      <group ref={groupRef}>
        {/* Left earbud */}
        <Earbud
          posX={-0.85} posY={0.14}
          rotY={0.22}   rotZ={0.1}
          floatSpeed={1.4}
          floatRange={[-0.12, 0.12]}
          mats={mats}
        />

        {/* Right earbud (mirrored) */}
        <group scale={[-1, 1, 1]}>
          <Earbud
            posX={-0.85} posY={-0.12}
            rotY={0.22}   rotZ={-0.08}
            floatSpeed={1.7}
            floatRange={[-0.1, 0.1]}
            mats={mats}
          />
        </group>

        {/* Ground glow disc */}
        <GlowDisc y={-1.65} mats={mats} />

        {/* Soft fill sphere (invisible, just for env reflections) */}
        <mesh visible={false}>
          <sphereGeometry args={[20, 8, 8]} />
          <meshBasicMaterial color="#0a1628" side={THREE.BackSide} />
        </mesh>
      </group>
    </>
  );
}

/* ─── Export ─── */
export default function ProductScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 44 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 1.5]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
