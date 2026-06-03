"use client";

import dynamic from "next/dynamic";
import { useRef, Component, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { staggerContainer, fadeUp } from "@/constants/animations";
import ConcentricRings from "./ConcentricRings";
import ParticleCanvas from "./ParticleCanvas";
import FeatureLabels from "./FeatureLabels";
import MagneticButton from "@/components/animations/MagneticButton";

// R3F must be loaded client-side only
const ProductScene3D = dynamic(() => import("./ProductScene3D"), { ssr: false });

class R3FErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const HERO_STATS = [
  { value: "40ms",  label: "Latency" },
  { value: "360°",  label: "Spatial Audio" },
  { value: "48h",   label: "Battery Life" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Framer Motion mouse tracking for subtle parallax on text + rings
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 40, damping: 28 });
  const sY = useSpring(mouseY, { stiffness: 40, damping: 28 });

  const ringsX  = useTransform(sX, (v) => v * 0.018);
  const ringsY  = useTransform(sY, (v) => v * 0.018);
  const textX   = useTransform(sX, (v) => v * -0.008);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width  / 2);
    mouseY.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── 0. Deep-space background ──────────────────────────── */}
      <div className="absolute inset-0 bg-[#020617]">
        {/* Primary radial — centred slightly right where the product lives */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 58% 52%, rgba(37,99,235,0.14) 0%, transparent 68%)",
          }}
        />
        {/* Secondary outer haze */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 58% 50%, rgba(15,40,110,0.18) 0%, transparent 75%)",
          }}
        />
        {/* Top border line */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.35) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* ── 1. Drifting particle stars ───────────────────────── */}
      <ParticleCanvas />

      {/* ── 2. GSAP concentric sound-wave rings ──────────────── */}
      <motion.div
        style={{ x: ringsX, y: ringsY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* rings centred at 58 % / 50 % to align with 3-D product */}
        <ConcentricRings cx={58} cy={50} />
      </motion.div>

      {/* ── 3. R3F 3-D earbuds (full-screen transparent canvas) ─ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <div className="absolute top-0 bottom-0 right-0 w-[55%] lg:w-[58%]">
          <R3FErrorBoundary>
            <ProductScene3D />
          </R3FErrorBoundary>
        </div>
      </div>

      {/* ── 4. Left headline content ─────────────────────────── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24"
        style={{ zIndex: 10 }}
      >
        <motion.div
          style={{ x: textX }}
          variants={staggerContainer}
          initial={false}
          animate="visible"
          className="max-w-[530px]"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              NEXUS Pro — 2025
            </span>
          </motion.div>

          {/* H1 */}
          <motion.div variants={fadeUp} className="mb-5 overflow-hidden">
            <h1
              className="font-display font-bold leading-[0.9] tracking-tight text-white"
              style={{ fontSize: "clamp(3.4rem, 6.8vw, 6.4rem)" }}
            >
              Sound
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #93C5FD 0%, #3B82F6 45%, #2563EB 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Without
              </span>
              <br />
              Boundaries
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-[#94A3B8] text-base sm:text-[17px] leading-relaxed mb-9 max-w-[410px]"
          >
            AI-engineered audio transcendence. Every frequency mapped,
            every nuance preserved.{" "}
            <span className="text-white/60">The future of listening is here.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 flex-wrap mb-14"
          >
            <MagneticButton strength={0.3}>
              <button
                className="btn-primary"
                style={{
                  boxShadow:
                    "0 0 32px rgba(37,99,235,0.55), 0 0 80px rgba(59,130,246,0.15), 0 4px 16px rgba(0,0,0,0.5)",
                }}
              >
                Discover NEXUS
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>

            <button className="btn-secondary">
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Film
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-8 border-t border-white/5 pt-7"
          >
            {HERO_STATS.map((s, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[1.6rem] font-display font-bold leading-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #93C5FD 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── 5. Right-side floating feature labels ────────────── */}
      <FeatureLabels />

      {/* ── 6. Scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] text-[#94A3B8] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="relative w-px h-10 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 h-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #60A5FA, transparent)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* ── 7. Bottom fade-out ───────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-44 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #020617)" }}
      />
    </section>
  );
}
