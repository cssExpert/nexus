"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Mic, SlidersHorizontal, Hand, Moon, Dna } from "lucide-react";
import { staggerContainer, fadeUp } from "@/constants/animations";
import { aiFeatures } from "@/data/features";
import GlowOrb from "@/components/effects/GlowOrb";
import { cn } from "@/lib/utils";
import ScrambleText from "../common/ScrambleText";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Mic,
  SlidersHorizontal,
  Hand,
  Moon,
  Dna,
};

function BentoCard({
  feature,
  index,
}: {
  feature: (typeof aiFeatures)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = ICON_MAP[feature.icon];

  const isLarge = feature.size === "large";
  const isMedium = feature.size === "medium";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative group rounded-2xl p-6 border border-white/5 overflow-hidden cursor-default",
        "glass hover:border-blue-500/30 transition-all duration-400",
        isLarge && "sm:col-span-2 sm:row-span-2",
        isMedium && "sm:col-span-2",
      )}
      style={{
        minHeight: isLarge ? 280 : isMedium ? 160 : 140,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left, ${feature.accent}15, transparent 60%)`,
        }}
      />

      {/* Neon border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${feature.accent}40`,
        }}
      />

      {/* Tag */}
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4"
        style={{
          background: `${feature.accent}18`,
          color: feature.accent,
          border: `1px solid ${feature.accent}30`,
        }}
      >
        {feature.tag}
      </span>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${feature.accent}20` }}
      >
        {Icon && (
          <span style={{ color: feature.accent }}>
            <Icon className="w-5 h-5" />
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-white font-display font-semibold text-lg mb-2 leading-snug">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-muted-text text-sm leading-relaxed">
        {feature.description}
      </p>

      {/* Large card extra visual */}
      {isLarge && (
        <div className="mt-6 relative h-20 overflow-hidden rounded-xl">
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: `linear-gradient(90deg, ${feature.accent}08, ${feature.accent}20, ${feature.accent}08)`,
              border: `1px solid ${feature.accent}20`,
            }}
          />
          {/* Animated brain wave lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px"
              style={{
                top: `${20 + i * 20}%`,
                left: "10%",
                right: "10%",
                background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)`,
              }}
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xs font-mono"
              style={{ color: `${feature.accent}90` }}
            >
              Analyzing environment...
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function AIFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <GlowOrb
        size={800}
        color="rgba(37,99,235,0.1)"
        className="top-1/2 left-0 -translate-y-1/2"
        intensity="low"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-accent" />
              Intelligence
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              <ScrambleText
                text="AI that listens"
                trigger="inView"
                speed={32}
                framesPerChar={2}
                className="text-nowrap"
              />
              <br />
              <span className="text-gradient">
                <ScrambleText
                  text="before you do"
                  trigger="inView"
                  speed={32}
                  framesPerChar={3}
                  className="text-nowrap"
                />
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-text max-w-sm text-sm leading-relaxed"
            >
              Six neural systems operating in parallel. Learning you. Adapting
              to you. Always improving.
            </motion.p>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {aiFeatures.map((feature, i) => (
            <BentoCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
