"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/constants/animations";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  variants?: typeof fadeUp;
}

export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  once = true,
  variants = fadeUp,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px 0px" });

  const variantsWithDelay = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(typeof variants.visible === "object" && "transition" in variants.visible
          ? variants.visible.transition as object
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variantsWithDelay}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
