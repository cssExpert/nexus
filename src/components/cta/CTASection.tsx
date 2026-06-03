"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { staggerContainer, fadeUp } from "@/constants/animations";
import MagneticButton from "@/components/animations/MagneticButton";
import GlowOrb from "@/components/effects/GlowOrb";
import ScrambleText from "@/components/common/ScrambleText";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-36 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-surface" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Top & bottom borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)",
        }}
      />

      <GlowOrb
        size={900}
        color="rgba(37,99,235,0.2)"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        intensity="medium"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <span className="section-label mb-6 inline-flex">
              <Zap className="w-3 h-3 fill-neon-accent text-neon-accent" />
              Limited Release — 2025
            </span>
          </motion.div>

          {/* Massive heading */}
          <motion.div variants={fadeUp} className="mb-6">
            <h2
              className="font-heading text-white leading-none tracking-tight select-none"
              style={{
                fontSize: "clamp(4rem, 14vw, 13rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <ScrambleText
                text="FEEL"
                trigger="inView"
                speed={32}
                framesPerChar={3}
              />
            </h2>
            <h2
              className="font-heading leading-none tracking-tight select-none"
              style={{
                fontSize: "clamp(4rem, 14vw, 13rem)",
                letterSpacing: "-0.03em",
                background:
                  "linear-gradient(135deg, #60A5FA, #3B82F6, #2563EB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <ScrambleText
                text="EVERY"
                trigger="inView"
                speed={32}
                framesPerChar={4}
              />
            </h2>
            <h2
              className="font-heading text-white leading-none tracking-tight select-none"
              style={{
                fontSize: "clamp(4rem, 14vw, 13rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <ScrambleText
                text="NOTE."
                trigger="inView"
                speed={32}
                framesPerChar={5}
              />
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-muted-text text-lg leading-relaxed max-w-md mx-auto mb-12"
          >
            Join 50,000 audiophiles on the waitlist. NEXUS Pro ships Q2 2025.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton strength={0.4}>
              <button
                className="btn-primary text-base px-8 py-4 rounded-2xl"
                style={{
                  boxShadow:
                    "0 0 50px rgba(37,99,235,0.5), 0 0 100px rgba(59,130,246,0.2)",
                }}
              >
                Reserve NEXUS Pro
                <ArrowRight className="w-5 h-5" />
              </button>
            </MagneticButton>
            <button className="btn-secondary text-base px-8 py-4 rounded-2xl">
              View Tech Specs
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-text"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              50,000+ on waitlist
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span>Free shipping worldwide</span>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <span>30-day return guarantee</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
