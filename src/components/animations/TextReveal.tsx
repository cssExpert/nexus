"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
  tag: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <Tag className="flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
