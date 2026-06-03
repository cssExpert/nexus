"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const RING_CONFIGS = [
  { delay: 0,    dur: 6,   strokeW: 1.8, dash: "",    color: "rgba(59,130,246,0.7)" },
  { delay: 0.9,  dur: 6,   strokeW: 0.8, dash: "5 12",color: "rgba(96,165,250,0.45)" },
  { delay: 1.8,  dur: 6,   strokeW: 1.4, dash: "",    color: "rgba(37,99,235,0.65)" },
  { delay: 2.7,  dur: 6,   strokeW: 0.6, dash: "3 9", color: "rgba(147,197,253,0.35)" },
  { delay: 3.6,  dur: 6,   strokeW: 1.2, dash: "",    color: "rgba(59,130,246,0.55)" },
  { delay: 4.5,  dur: 6,   strokeW: 0.7, dash: "6 14",color: "rgba(96,165,250,0.3)" },
  { delay: 5.4,  dur: 6,   strokeW: 1.0, dash: "",    color: "rgba(37,99,235,0.5)" },
  { delay: 6.3,  dur: 6,   strokeW: 0.5, dash: "2 8", color: "rgba(147,197,253,0.25)" },
];

// Additional slow outer rings for depth
const SLOW_RINGS = [
  { delay: 0,   dur: 10, strokeW: 0.5, color: "rgba(37,99,235,0.25)" },
  { delay: 3.3, dur: 10, strokeW: 0.4, color: "rgba(59,130,246,0.2)"  },
  { delay: 6.6, dur: 10, strokeW: 0.3, color: "rgba(96,165,250,0.15)" },
];

export default function ConcentricRings({ cx = 50, cy = 50 }: { cx?: number; cy?: number }) {
  const ringRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const slowRefs  = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    RING_CONFIGS.forEach((cfg, i) => {
      const el = ringRefs.current[i];
      if (!el) return;
      const t = gsap.fromTo(
        el,
        { attr: { r: 18 }, opacity: 0.9 },
        {
          attr: { r: 420 },
          opacity: 0,
          duration: cfg.dur,
          delay: cfg.delay,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 0,
        }
      );
      tweens.push(t);
    });

    SLOW_RINGS.forEach((cfg, i) => {
      const el = slowRefs.current[i];
      if (!el) return;
      const t = gsap.fromTo(
        el,
        { attr: { r: 30 }, opacity: 0.7 },
        {
          attr: { r: 520 },
          opacity: 0,
          duration: cfg.dur,
          delay: cfg.delay,
          ease: "sine.out",
          repeat: -1,
          repeatDelay: 0,
        }
      );
      tweens.push(t);
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  // Convert percentage cx/cy to SVG units (viewBox 0 0 900 900)
  const vx = (cx / 100) * 900;
  const vy = (cy / 100) * 900;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 900 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="ringSoftGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="ringHardGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static faint guide rings for depth */}
      {[70, 130, 200, 270, 340].map((r, i) => (
        <circle
          key={`guide-${i}`}
          cx={vx} cy={vy} r={r}
          fill="none"
          stroke="rgba(59,130,246,0.04)"
          strokeWidth="1"
        />
      ))}

      {/* Main pulsing rings */}
      {RING_CONFIGS.map((cfg, i) => (
        <circle
          key={`ring-${i}`}
          ref={(el) => { ringRefs.current[i] = el; }}
          cx={vx} cy={vy} r={18}
          fill="none"
          stroke={cfg.color}
          strokeWidth={cfg.strokeW}
          strokeDasharray={cfg.dash}
          filter="url(#ringSoftGlow)"
          opacity={0}
        />
      ))}

      {/* Slow outer depth rings */}
      {SLOW_RINGS.map((cfg, i) => (
        <circle
          key={`slow-${i}`}
          ref={(el) => { slowRefs.current[i] = el; }}
          cx={vx} cy={vy} r={30}
          fill="none"
          stroke={cfg.color}
          strokeWidth={cfg.strokeW}
          opacity={0}
        />
      ))}

      {/* Centre core glow disc */}
      <circle cx={vx} cy={vy} r={60} fill="url(#coreGlow)" filter="url(#ringHardGlow)" />
      {/* Inner bright dot */}
      <circle cx={vx} cy={vy} r={5} fill="rgba(147,197,253,0.9)" filter="url(#ringSoftGlow)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r"       values="4;7;4"     dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
