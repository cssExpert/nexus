"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LABELS = [
  { stat: "40ms",  text: "Ultra-Low Latency",  top: "22%" },
  { stat: "AI",    text: "Neural Engine Active", top: "46%" },
  { stat: "360°",  text: "Spatial Immersion",   top: "70%" },
];

export default function FeatureLabels() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="hidden lg:flex flex-col justify-center absolute right-[5%] inset-y-0 pointer-events-none z-10"
    >
      {LABELS.map((label, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 1.2 + i * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute flex items-center gap-3"
          style={{ top: label.top }}
        >
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.18 }}
            className="w-8 h-px origin-right"
            style={{ background: "rgba(59,130,246,0.35)" }}
          />

          {/* Label chip */}
          <div className="flex flex-col items-start bg-white/[0.03] border border-blue-500/15 rounded-lg px-3 py-2 backdrop-blur-md">
            <span className="text-blue-400 font-display font-bold text-sm leading-none mb-0.5">
              {label.stat}
            </span>
            <span className="text-slate-500 text-[10px] leading-none tracking-wide whitespace-nowrap">
              {label.text}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
