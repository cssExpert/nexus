"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, staggerContainer } from "@/constants/animations";
import GlowOrb from "@/components/effects/GlowOrb";
import ScrambleText from "../common/ScrambleText";

const CHAPTERS = [
  {
    number: "01",
    title: "Born from\nSilence",
    body: "NEXUS began as an obsession with imperfection — the hiss, the compression artifacts, the sound that wasn't there. Four years of acoustic engineering to eliminate the noise between you and your music.",
    accent: "#2563EB",
    stat: "4 years",
    statLabel: "R&D",
  },
  {
    number: "02",
    title: "AI at the\nCore",
    body: "A custom neural processor runs 12 audio models in real-time. It monitors your ear canal resonance, adjusts the EQ every 50ms, and learns which frequencies move you — physiologically.",
    accent: "#3B82F6",
    stat: "12 models",
    statLabel: "Simultaneous",
  },
  {
    number: "03",
    title: "Zero\nCompromise",
    body: "48 hours of battery. IPX5 waterproofing. Sub-0.4% total harmonic distortion. A charging case that doubles as a personal hotspot. Nothing was traded off. Everything was solved.",
    accent: "#60A5FA",
    stat: "0.4%",
    statLabel: "THD",
  },
];

function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* Text side */}
      <div className={isEven ? "" : "lg:col-start-2"}>
        <motion.span
          variants={fadeUp}
          className="font-mono text-sm tracking-[0.3em] mb-4 block"
          style={{ color: chapter.accent }}
        >
          CHAPTER {chapter.number}
        </motion.span>

        <motion.h3
          variants={fadeUp}
          className="font-display font-bold text-white leading-tight tracking-tight mb-6"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            whiteSpace: "pre-line",
          }}
        >
          {chapter.title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="text-muted-text leading-relaxed mb-8 text-base max-w-md"
        >
          {chapter.body}
        </motion.p>

        <motion.div variants={fadeUp} className="flex items-baseline gap-3">
          <span
            className="font-display font-bold text-4xl"
            style={{ color: chapter.accent }}
          >
            {chapter.stat}
          </span>
          <span className="text-muted-text text-sm uppercase tracking-wider">
            {chapter.statLabel}
          </span>
        </motion.div>
      </div>

      {/* Visual side */}
      <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
        <motion.div
          variants={fadeUp}
          className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${chapter.accent}18, rgba(7,16,38,0.9) 70%)`,
            border: `1px solid ${chapter.accent}25`,
          }}
        >
          {/* Abstract visual element */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Chapter number large */}
            <span
              className="font-heading select-none opacity-[0.04]"
              style={{
                fontSize: "clamp(8rem, 20vw, 16rem)",
                color: chapter.accent,
                letterSpacing: "-0.05em",
              }}
            >
              {chapter.number}
            </span>
          </div>

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[60, 100, 140].map((r, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: r * 2,
                  height: r * 2,
                  borderColor: `${chapter.accent}${30 - i * 8}`,
                }}
                animate={{
                  rotate: i % 2 === 0 ? 360 : -360,
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  rotate: {
                    duration: 20 + i * 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  },
                }}
              />
            ))}
            {/* Center glow */}
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: `radial-gradient(circle, ${chapter.accent}60, transparent)`,
                filter: "blur(8px)",
              }}
            />
            <div
              className="absolute w-5 h-5 rounded-full"
              style={{ background: chapter.accent, filter: "blur(4px)" }}
            />
          </div>

          {/* Scan line effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${chapter.accent}60, transparent)`,
            }}
            animate={{ y: [0, 400, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CinematicScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Dark surface */}
      <div className="absolute inset-0 bg-surface" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.1), transparent)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.15), transparent)",
        }}
      />

      <GlowOrb
        size={500}
        color="rgba(37,99,235,0.15)"
        className="top-0 right-0"
        intensity="low"
        animate={false}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.div variants={fadeUp}>
            <span className="section-label mb-5 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-accent" />
              The Story
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <ScrambleText
              text="Built different."
              trigger="inView"
              speed={32}
              framesPerChar={3}
              className="text-nowrap"
            />
            <br />
            <span className="text-gradient">
              <ScrambleText
                text="Engineered obsessively."
                trigger="inView"
                speed={32}
                framesPerChar={4}
                className="text-nowrap"
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Chapters */}
        <div className="flex flex-col gap-28 lg:gap-36">
          {CHAPTERS.map((chapter, i) => (
            <Chapter key={chapter.number} chapter={chapter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
