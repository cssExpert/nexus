"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { staggerContainer, fadeUp } from "@/constants/animations";
import { testimonials, pressQuotes } from "@/data/testimonials";
import GlowOrb from "@/components/effects/GlowOrb";
import ScrambleText from "../common/ScrambleText";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () =>
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const current = testimonials[active];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <GlowOrb
        size={700}
        color="rgba(37,99,235,0.1)"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
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
              Reviews
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <ScrambleText
              text="Heard by the"
              trigger="inView"
              speed={32}
              framesPerChar={3}
              className="text-nowrap"
            />
            <br />
            <span className="text-gradient">
              <ScrambleText
                text="people who know"
                trigger="inView"
                speed={32}
                framesPerChar={4}
                className="text-nowrap"
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative glass rounded-3xl p-8 sm:p-12 border border-white/5 mb-8 overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(37,99,235,0.08), transparent 60%)",
            }}
          />

          <Quote
            className="w-12 h-12 text-blue-500/20 mb-6"
            style={{ strokeWidth: 1 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <StarRating count={current.rating} />
              <p className="text-white text-xl sm:text-2xl font-display font-medium leading-relaxed mt-5 mb-8 max-w-3xl">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white font-display font-bold text-sm border border-blue-500/30">
                  {current.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {current.name}
                  </p>
                  <p className="text-muted-text text-xs">
                    {current.role} · {current.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute right-8 bottom-8 sm:right-12 sm:bottom-10 flex items-center gap-3">
            {/* Dots */}
            <div className="flex gap-1.5 mr-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? "w-5 bg-blue-500" : "w-1.5 bg-white/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-white hover:border-blue-500/40 transition-all duration-200 cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-white hover:border-blue-500/40 transition-all duration-200 cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Press quotes marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="overflow-hidden"
        >
          <div className="flex animate-marquee gap-8 w-max">
            {[...pressQuotes, ...pressQuotes].map((q, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-3 glass rounded-full border border-white/5 whitespace-nowrap"
              >
                <span className="text-neon-accent font-display font-bold text-sm tracking-wider">
                  {q.outlet}
                </span>
                <span className="w-px h-4 bg-white/10" />
                <span className="text-muted-text text-sm italic">
                  &ldquo;{q.quote}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
