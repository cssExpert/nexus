"use client";

import { motion } from "framer-motion";

const RINGS = [
  { r: 90, delay: 0, duration: 4 },
  { r: 140, delay: 0.6, duration: 4 },
  { r: 190, delay: 1.2, duration: 4 },
  { r: 240, delay: 1.8, duration: 4 },
  { r: 290, delay: 2.4, duration: 4 },
  { r: 340, delay: 3.0, duration: 4 },
];

export default function ConcentricWaves() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        className="absolute"
        style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
      >
        <defs>
          <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="ringBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Static background rings */}
        {RINGS.map((ring, i) => (
          <circle
            key={`static-${i}`}
            cx="400"
            cy="400"
            r={ring.r}
            fill="none"
            stroke="rgba(59,130,246,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Animated pulse rings */}
        {RINGS.map((ring, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx="400"
            cy="400"
            r={ring.r}
            fill="none"
            stroke={`rgba(59,130,246,${0.5 - i * 0.07})`}
            strokeWidth={1.5 - i * 0.15}
            filter="url(#ringBlur)"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.7, 1, 1.15],
            }}
            transition={{
              duration: ring.duration,
              delay: ring.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "400px 400px" }}
          />
        ))}

        {/* Center glow dot */}
        <motion.circle
          cx="400"
          cy="400"
          r="4"
          fill="#60A5FA"
          animate={{ opacity: [0.6, 1, 0.6], r: [3, 5, 3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#ringBlur)"
        />

        {/* Inner glow disc */}
        <motion.circle
          cx="400"
          cy="400"
          r="60"
          fill="none"
          stroke="rgba(96,165,250,0.2)"
          strokeWidth="30"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(20px)" }}
        />
      </svg>
    </div>
  );
}
