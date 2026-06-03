"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { staggerContainer, fadeUp } from "@/constants/animations";
import ConcentricWaves from "./ConcentricWaves";
import ParticleCanvas from "./ParticleCanvas";
import ProductVisualization from "./ProductVisualization";
import MagneticButton from "@/components/animations/MagneticButton";
import GlowOrb from "@/components/effects/GlowOrb";

const HERO_STATS = [
  { value: "40ms", label: "Latency" },
  { value: "360°", label: "Spatial Audio" },
  { value: "48h", label: "Battery Life" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const productX = useTransform(springX, (v) => v * 0.04);
  const productY = useTransform(springY, (v) => v * 0.04);
  const rotateY = useTransform(springX, [-600, 600], [-8, 8]);
  const rotateX = useTransform(springY, [-400, 400], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Deep space background */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
          }}
        />
      </div>

      {/* Ambient glow orbs */}
      <GlowOrb
        size={800}
        color="rgba(37,99,235,0.25)"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        intensity="low"
      />
      <GlowOrb
        size={400}
        color="rgba(96,165,250,0.2)"
        className="top-1/4 right-1/4"
        intensity="low"
        animate={false}
      />

      {/* Particles */}
      <ParticleCanvas />

      {/* Product + Waves — slightly right of center, parallax responsive */}
      <div className="absolute inset-0 flex items-center justify-center translate-x-[15%] pointer-events-none">
        <motion.div
          style={{ x: productX, y: productY, rotateX, rotateY }}
          className="relative perspective-1000 will-change-transform"
        >
          <ConcentricWaves />
          <div className="relative z-10">
            <ProductVisualization />
          </div>
        </motion.div>
      </div>

      {/* Left-aligned content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[550px]"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <span className="section-label mb-7 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-accent animate-pulse" />
              NEXUS Pro — 2025
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="mb-6 overflow-hidden">
            <h1
              className="font-display font-bold leading-[0.92] tracking-tight text-white"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              Sound
              <br />
              <span className="text-gradient">Without</span>
              <br />
              Boundaries
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-muted-text text-base sm:text-lg leading-relaxed mb-10 max-w-[420px]"
          >
            AI-engineered audio transcendence. Every frequency mapped, every
            detail preserved. The future of listening is here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 flex-wrap mb-16"
          >
            <MagneticButton strength={0.3}>
              <button className="btn-primary">
                Discover NEXUS
                <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
            <button className="btn-secondary">
              <Play className="w-3.5 h-3.5 fill-current" />
              Watch Film
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-8 border-t border-white/5 pt-8"
          >
            {HERO_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-2xl font-display font-bold text-gradient-white">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-text tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] text-muted-text tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div className="relative w-[1px] h-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-scan-line" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #020617)",
        }}
      />
    </section>
  );
}
