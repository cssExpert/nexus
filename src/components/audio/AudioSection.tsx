"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideInLeft } from "@/constants/animations";
import { audioStats } from "@/data/features";
import GlowOrb from "@/components/effects/GlowOrb";
import ScrambleText from "../common/ScrambleText";

function WaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const BAR_COUNT = 80;
    const amplitudes = Array.from(
      { length: BAR_COUNT },
      (_, i) => 0.3 + 0.7 * Math.sin((i / BAR_COUNT) * Math.PI),
    );

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const barWidth = w / BAR_COUNT;
      const centerY = h / 2;

      for (let i = 0; i < BAR_COUNT; i++) {
        const t = frame * 0.025 + i * 0.18;
        const wave1 = Math.sin(t) * 0.5;
        const wave2 = Math.sin(t * 1.7 + 1) * 0.3;
        const wave3 = Math.sin(t * 0.5 + 2) * 0.2;
        const combinedWave = wave1 + wave2 + wave3;

        const baseAmp = amplitudes[i];
        const barHeight = baseAmp * (0.6 + 0.4 * combinedWave) * (h * 0.45);
        const finalHeight = Math.max(4, Math.abs(barHeight));

        const x = i * barWidth + barWidth * 0.15;
        const bw = barWidth * 0.6;

        const progress = i / BAR_COUNT;
        const alpha = 0.4 + 0.6 * Math.sin(progress * Math.PI);

        const grad = ctx.createLinearGradient(
          x,
          centerY - finalHeight,
          x,
          centerY + finalHeight,
        );
        grad.addColorStop(0, `rgba(96,165,250,${alpha * 0.3})`);
        grad.addColorStop(0.4, `rgba(59,130,246,${alpha})`);
        grad.addColorStop(0.5, `rgba(37,99,235,${alpha * 1.1})`);
        grad.addColorStop(0.6, `rgba(59,130,246,${alpha})`);
        grad.addColorStop(1, `rgba(96,165,250,${alpha * 0.3})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, centerY - finalHeight, bw, finalHeight * 2, 2);
        ctx.fill();
      }

      frame++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={160}
      className="w-full h-auto"
      style={{ maxHeight: 160 }}
    />
  );
}

export default function AudioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="audio"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-surface" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(37,99,235,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.4) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 50%, transparent 100%)",
          }}
        />
      </div>

      <GlowOrb
        size={600}
        color="rgba(59,130,246,0.2)"
        className="bottom-0 left-1/2 -translate-x-1/2"
        intensity="low"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-accent" />
              Audio Engine
            </span>
          </motion.div>

          <motion.h2
            variants={slideInLeft}
            className="font-display font-bold text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <ScrambleText
              text="Hear what was"
              trigger="inView"
              speed={32}
              framesPerChar={3}
              className="text-nowrap"
            />
            <br />
            <span className="text-gradient">
              <ScrambleText
                text="always there"
                trigger="inView"
                speed={32}
                framesPerChar={4}
                className="text-nowrap"
              />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-muted-text max-w-md mx-auto text-base leading-relaxed"
          >
            24-bit lossless audio captures the full emotional spectrum of music.
            Every breath, every string vibration, every room resonance.
          </motion.p>
        </motion.div>

        {/* Waveform visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative glass rounded-2xl p-6 mb-10 border border-blue-500/10 overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.05), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-red-500" : i === 1 ? "bg-yellow-500" : "bg-green-500"} opacity-60`}
                  />
                ))}
              </div>
              <span className="text-muted-text text-xs font-mono tracking-wider">
                nexus_audio_engine.wav — 24-bit / 192kHz
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 text-xs font-mono">LIVE</span>
              </div>
            </div>
            <WaveVisualizer />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {audioStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
              className="glass rounded-xl p-5 border border-white/5 hover:border-blue-500/20 transition-all duration-300 group"
            >
              <p className="text-2xl font-display font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-white text-sm font-medium mb-0.5">
                {stat.label}
              </p>
              <p className="text-muted-text text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
