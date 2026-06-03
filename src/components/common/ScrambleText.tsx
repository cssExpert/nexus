"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";

/**
 * Characters used during scramble frames.
 * Mixes symbols + alphanumerics for that classic "decoding" look.
 */
const POOL =
  "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

type Trigger = "inView" | "hover" | "mount";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms per animation frame — lower = faster */
  speed?: number;
  /** How many random frames each character cycles before revealing */
  framesPerChar?: number;
  trigger?: Trigger;
  /** Re-scramble on hover even when trigger is "inView" */
  hoverRepeat?: boolean;
}

export default function ScrambleText({
  text,
  className,
  speed = 38,
  framesPerChar = 4,
  trigger = "inView",
  hoverRepeat = true,
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const spanRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isInView = useInView(spanRef, { once: false, amount: 0.5 });

  const scramble = useCallback(() => {
    clearInterval(timerRef.current!);

    // Count non-space characters to calculate total frames accurately
    const nonSpaces = text.replace(/ /g, "").length;
    const totalFrames = nonSpaces * framesPerChar;
    let frame = 0;

    timerRef.current = setInterval(() => {
      const revealUpTo = Math.floor((frame / totalFrames) * text.length);

      setOutput(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " "; // preserve space width
            if (i < revealUpTo) return ch; // already revealed
            return POOL[Math.floor(Math.random() * POOL.length)];
          })
          .join(""),
      );

      frame++;

      if (frame > totalFrames) {
        clearInterval(timerRef.current!);
        setOutput(text); // snap to final
      }
    }, speed);
  }, [text, speed, framesPerChar]);

  // inView trigger
  useEffect(() => {
    if (trigger === "inView" && isInView) scramble();
  }, [isInView, trigger, scramble]);

  // mount trigger
  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(scramble, 200);
      return () => {
        clearTimeout(t);
        clearInterval(timerRef.current!);
      };
    }
    return () => clearInterval(timerRef.current!);
  }, [trigger, scramble]);

  return (
    <span
      ref={spanRef}
      className={className}
      onMouseEnter={hoverRepeat || trigger === "hover" ? scramble : undefined}
    >
      {output}
    </span>
  );
}
