"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMouseParallax(strength = 0.05) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 1 });

  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) * strength;
      const y = (e.clientY - h / 2) * strength;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, strength]);

  return { springX, springY, containerRef };
}
