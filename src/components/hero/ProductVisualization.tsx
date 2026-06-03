"use client";

import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline/next";

function EarbudUnit({ flip = false }: { flip?: boolean }) {
  return (
    <motion.div
      className="relative"
      style={{
        transform: flip ? "scaleX(-1) rotate(-15deg)" : "rotate(15deg)",
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(96,165,250,0.3), transparent 70%)",
          filter: "blur(16px)",
          transform: "scale(1.6)",
        }}
      />

      {/* Earbud body */}
      <svg
        width="100"
        height="160"
        viewBox="0 0 100 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`bodyGrad${flip ? "r" : "l"}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="40%" stopColor="#0f1f3d" />
            <stop offset="100%" stopColor="#060d1f" />
          </linearGradient>
          <linearGradient
            id={`shineGrad${flip ? "r" : "l"}`}
            x1="0"
            y1="0"
            x2="0.3"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(147,197,253,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient
            id={`stemGrad${flip ? "r" : "l"}`}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#0e1f3d" />
            <stop offset="50%" stopColor="#162a4f" />
            <stop offset="100%" stopColor="#0a1628" />
          </linearGradient>
          <filter id={`glowFilter${flip ? "r" : "l"}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="ledGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stem */}
        <rect
          x="34"
          y="70"
          width="32"
          height="82"
          rx="16"
          fill={`url(#stemGrad${flip ? "r" : "l"})`}
          stroke="rgba(59,130,246,0.25)"
          strokeWidth="1"
        />

        {/* Stem highlight stripe */}
        <rect
          x="38"
          y="75"
          width="8"
          height="70"
          rx="4"
          fill="rgba(147,197,253,0.07)"
        />

        {/* LED strip on stem */}
        <rect
          x="44"
          y="82"
          width="4"
          height="28"
          rx="2"
          fill="rgba(59,130,246,0.0)"
        >
          <animate
            attributeName="fill"
            values="rgba(59,130,246,0.0);rgba(96,165,250,0.6);rgba(59,130,246,0.0)"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Earbud bowl — main body */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="52"
          fill={`url(#bodyGrad${flip ? "r" : "l"})`}
          stroke="rgba(59,130,246,0.3)"
          strokeWidth="1"
        />

        {/* Shine highlight */}
        <ellipse
          cx="38"
          cy="32"
          rx="22"
          ry="18"
          fill={`url(#shineGrad${flip ? "r" : "l"})`}
        />

        {/* Inner driver ring */}
        <ellipse
          cx="50"
          cy="52"
          rx="28"
          ry="32"
          fill="none"
          stroke="rgba(59,130,246,0.2)"
          strokeWidth="1"
        />
        <ellipse
          cx="50"
          cy="52"
          rx="18"
          ry="21"
          fill="rgba(7,16,38,0.9)"
          stroke="rgba(96,165,250,0.15)"
          strokeWidth="1"
        />

        {/* Center driver mesh pattern */}
        <ellipse cx="50" cy="52" rx="10" ry="11" fill="rgba(30,58,95,0.8)" />
        <circle cx="50" cy="52" r="4" fill="rgba(59,130,246,0.15)" />

        {/* LED indicator dot */}
        <circle cx="71" cy="28" r="4" fill="#3B82F6" filter="url(#ledGlow)">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="71" cy="28" r="2" fill="#93C5FD" />

        {/* Ear tip */}
        <ellipse
          cx="50"
          cy="95"
          rx="16"
          ry="10"
          fill="#0f1c35"
          stroke="rgba(59,130,246,0.2)"
          strokeWidth="1"
        />
        <ellipse cx="50" cy="95" rx="10" ry="6" fill="rgba(2,6,23,0.9)" />

        {/* Bottom cap */}
        <ellipse
          cx="50"
          cy="149"
          rx="14"
          ry="5"
          fill="rgba(59,130,246,0.1)"
          stroke="rgba(59,130,246,0.2)"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}

export default function ProductVisualization() {
  return (
    <Spline scene="https://prod.spline.design/YiNJesbt5AMGTJH8/scene.splinecode" />
  );
}
