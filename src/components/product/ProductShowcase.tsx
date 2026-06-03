"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Waves, Brain, Globe, Zap } from "lucide-react";
import {
  staggerContainer,
  fadeUp,
  slideInLeft,
  scaleIn,
} from "@/constants/animations";
import { productFeatures } from "@/data/features";
import GlowOrb from "@/components/effects/GlowOrb";
import ScrambleText from "../common/ScrambleText";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Brain,
  Globe,
  Zap,
};

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof productFeatures)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="relative group cursor-default rounded-2xl p-6 glass border border-white/5 hover:border-blue-500/30 transition-all duration-400 overflow-hidden"
    >
      {/* Corner glow on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 bg-gradient-to-br ${feature.color} bg-opacity-20`}
      >
        {(() => {
          const Icon = ICON_MAP[feature.icon];
          return Icon ? <Icon className="w-5 h-5 text-white" /> : null;
        })()}
      </div>

      {/* Title */}
      <h3 className="text-white font-display font-semibold text-lg mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-muted-text text-sm leading-relaxed mb-4">
        {feature.description}
      </p>

      {/* Stat */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <span className="text-xl font-display font-bold text-gradient">
          {feature.stat}
        </span>
        <span className="text-xs text-muted-text">{feature.statLabel}</span>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <GlowOrb
        size={700}
        color="rgba(37,99,235,0.12)"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        intensity="low"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <motion.div variants={slideInLeft} className="max-w-xl">
            <span className="section-label mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-accent" />
              Product Architecture
            </span>
            <h2
              className="font-display font-bold text-white leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              <ScrambleText
                text="Engineered at the"
                trigger="inView"
                speed={32}
                framesPerChar={3}
                className="text-nowrap"
              />
              <br />
              <span className="text-gradient">
                <ScrambleText
                  text="molecular level"
                  trigger="inView"
                  speed={32}
                  framesPerChar={4}
                  className="text-nowrap"
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-muted-text max-w-sm leading-relaxed text-sm lg:text-base"
          >
            Four years of research distilled into four breakthrough
            technologies. Every component chosen to serve a single purpose:
            absolute sonic truth.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productFeatures.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={scaleIn}
          className="mt-12 rounded-2xl glass border border-white/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-display font-semibold text-xl mb-1">
              Starting at <span className="text-gradient">$349</span>
            </p>
            <p className="text-muted-text text-sm">
              Free 30-day returns · 2-year warranty
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary text-sm px-5 py-2.5">
              Compare Models
            </button>
            <button className="btn-primary text-sm px-5 py-2.5">
              Buy NEXUS Pro
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
