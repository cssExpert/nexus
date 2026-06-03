"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  size?: number;
  color?: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  animate?: boolean;
}

export default function GlowOrb({
  size = 600,
  color = "rgba(37,99,235,0.15)",
  className,
  intensity = "medium",
  animate = true,
}: GlowOrbProps) {
  const intensityMap = {
    low: 0.08,
    medium: 0.15,
    high: 0.25,
  };

  const opacity = intensityMap[intensity];

  return (
    <motion.div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${size * 0.15}px)`,
      }}
      animate={
        animate
          ? {
              scale: [1, 1.08, 1],
              opacity: [opacity, opacity * 1.4, opacity],
            }
          : undefined
      }
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
