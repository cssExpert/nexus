"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useScrollProgress() {
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      raw.set(height > 0 ? scrolled / height : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [raw]);

  return { raw, smooth };
}
