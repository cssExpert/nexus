"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeStage, setActiveStage] = useState(0); // 0: Pure Black, 1: Product Reveal, 2: Left Content, 3: Right Content, 4: Ambient Loop
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationKey, setAnimationKey] = useState(0);
  const [audioInitialized, setAudioInitialized] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientOscRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Deep Violet & Amethyst luxury theme config
  const theme = {
    primary: "#3b82f6",
    primaryGlow: "rgba(59, 130, 246, 0.4)",
    primaryGlowLight: "rgba(59, 130, 246, 0.12)",
    accentText: "text-gradient",
    glassBorder: "text-gradient",
  };

  // Only play SFX if AudioContext already exists (don't create one from a timeout)
  const playSymphonicSfx = (
    frequency: number,
    duration = 0.8,
    type: OscillatorType = "sine",
    volume = 0.12,
  ) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !soundEnabled) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      if (frequency > 200)
        osc.frequency.exponentialRampToValueAtTime(
          100,
          ctx.currentTime + duration,
        );
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Create AudioContext + start infinite drone — only called inside a user gesture
  const initAndPlayDrone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 85;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(); // no .stop() — plays forever

      ambientOscRef.current = osc;
      ambientGainRef.current = gain;
      setAudioInitialized(true);
    } catch (e) {
      console.warn("Drone init failed:", e);
    }
  };

  // Runs ONCE on mount — empty deps so the closure never goes stale
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioCtxRef.current) return; // already running
      initAndPlayDrone();
    };
    window.addEventListener("click", handleFirstInteraction, {
      capture: true,
      once: true,
    });
    window.addEventListener("touchstart", handleFirstInteraction, {
      capture: true,
      once: true,
    });
    return () => {
      window.removeEventListener("click", handleFirstInteraction, {
        capture: true,
      });
      window.removeEventListener("touchstart", handleFirstInteraction, {
        capture: true,
      });
      try {
        ambientOscRef.current?.stop();
      } catch (_) {}
      audioCtxRef.current?.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fade drone volume when user hits the mute button
  useEffect(() => {
    const ctx = audioCtxRef.current;
    const gain = ambientGainRef.current;
    if (!ctx || !gain) return;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(
      soundEnabled ? 0.06 : 0.001,
      ctx.currentTime + 0.6,
    );
  }, [soundEnabled]);

  const startCinematicTimeline = () => {
    // Reset timelines & cancel previous threads
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setActiveStage(0);
    setTimelineProgress(0);

    // Timeline Speeds corresponding exactly to the prompt specification
    const stages = {
      revealStart: 600, // Delayed initial pure black frame (gives cinema feel)
      leftReveal: 1600, // Delay: 1.6s
      rightReveal: 1800, // Delay: 1.8s
      ambientStart: 2500, // Transition into continuous loops (2.5s)
    };

    // Stage 1: Reveal starts (0.6s intro blackout to product emergence)
    const t1 = setTimeout(() => {
      setActiveStage(1);
      setTimelineProgress(25);
      playSymphonicSfx(220, 1.4, "sine", 0.08);
    }, stages.revealStart);

    // Stage 2: Left Content Fade In (1.6s)
    const t2 = setTimeout(() => {
      setActiveStage(2);
      setTimelineProgress(50);
      playSymphonicSfx(380, 1.0, "sine", 0.06);
    }, stages.leftReveal);

    // Stage 3: Right Content Fade In (1.8s)
    const t3 = setTimeout(() => {
      setActiveStage(3);
      setTimelineProgress(75);
      playSymphonicSfx(480, 1.0, "sine", 0.06);
    }, stages.rightReveal);

    // Stage 4: Ambient loops kick in (2.5s)
    const t4 = setTimeout(() => {
      setActiveStage(4);
      setTimelineProgress(100);
      // Soft background low drone
      playSymphonicSfx(90, 2.5, "triangle", 0.03);
    }, stages.ambientStart);

    timeoutsRef.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    startCinematicTimeline();
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [animationKey]);

  // Restart the beautiful story
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationKey((prev) => prev + 1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className="w-screen h-screen bg-[#020617] text-white overflow-hidden relative font-sans flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Keyframe Animations for Luxury Graphics */}
      <style>{`
        /* Continuous gentle glowing pulsars */
        @keyframes customPulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 45px rgba(59, 130, 246, 0.75), 0 0 95px rgba(59, 130, 246, 0.35);
            filter: brightness(1.15);
          }
        }

        /* 3D butterfly drifting vectors */
        @keyframes butterflyFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(4deg); }
          50% { transform: translateY(-10px) translateX(6px) rotate(-4deg); }
        }

        /* Wing flap actions simulating perspective depth */
        @keyframes flapLeft {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(70deg); }
        }
        @keyframes flapRight {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(-70deg); }
        }

        /* Gentle lotus floating sway */
        @keyframes lotusFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.015); }
        }

        /* Twinkle variations for premium stars */
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.25) rotate(180deg); }
        }
      `}</style>

      {/* ========================================================= */}
      {/* CHROMATIC BACKDROP LAYER & VIOLET RADIANCE                */}
      {/* ========================================================= */}
      {}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-[2000ms] ease-out z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primaryGlowLight} 0%, rgba(4,1,10,0) 70%)`,
          opacity: activeStage >= 1 ? 1 : 0,
          transform: `scale(${activeStage >= 1 ? 1 : 0.85})`,
        }}
      />

      {/* TWINKLING STARFIELD */}
      {activeStage >= 1 && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[
            { top: "15%", left: "12%", delay: "0s", size: 10 },
            { top: "22%", left: "26%", delay: "1.4s", size: 16 },
            { top: "78%", left: "14%", delay: "0.6s", size: 14 },
            { top: "18%", left: "85%", delay: "0.9s", size: 18 },
            { top: "68%", left: "82%", delay: "1.8s", size: 12 },
            { top: "82%", left: "68%", delay: "2.2s", size: 9 },
            { top: "38%", left: "78%", delay: "0.4s", size: 24 },
            { top: "12%", left: "49%", delay: "1.2s", size: 11 },
          ].map((spark, idx) => (
            <div
              key={idx}
              className="absolute pointer-events-none"
              style={{
                top: spark.top,
                left: spark.left,
                animation: `sparkleTwinkle 4.5s infinite ease-in-out`,
                animationDelay: spark.delay,
              }}
            >
              <svg
                width={spark.size}
                height={spark.size}
                viewBox="0 0 24 24"
                fill="none"
                className="opacity-60"
                style={{
                  color: theme.primary,
                  filter: `drop-shadow(0 0 6px ${theme.primary})`,
                }}
              >
                <path
                  d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Shadow floor base to anchor product visual depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-10" />

      {/* ========================================================= */}
      {/* CENTRAL LUXURY SKINCARE PRODUCT REVEAL                    */}
      {/* ========================================================= */}
      {}
      <div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 0)`,
        }}
      >
        {/* Master reveal scaling and lighting shifts */}
        <div
          className="relative flex items-center justify-center transition-all ease-out"
          style={{
            transform: `scale(${activeStage >= 1 ? 1.5 : 1.4})`,
            opacity: activeStage >= 1 ? 1 : 0,
            transitionDuration: "1800ms",
            filter: `brightness(${activeStage >= 1 ? 1 : 0.7})`,
          }}
        >
          {/* Ambient Purple backing bloom */}
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-35 mix-blend-screen transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${theme.primary} 0%, transparent 75%)`,
              transform: activeStage >= 4 ? "scale(1.2)" : "scale(1)",
            }}
          />

          {/* Floating Lotus Flower SVG */}
          <div
            className="relative"
            style={{
              animation:
                activeStage >= 4
                  ? "lotusFloat 5s infinite ease-in-out"
                  : "none",
            }}
          >
            {/* Elegant Translucent Vector Lotus Outlines */}
            <svg
              className="w-80 h-80 drop-shadow-3xl"
              viewBox="0 0 400 400"
              fill="none"
            >
              {/* Rear Background Petals */}
              <path
                d="M200 40 C110 130 90 280 200 350 C310 280 290 130 200 40 Z"
                fill="url(#lotusRearGrad)"
                className="opacity-25"
              />
              <path
                d="M200 40 C50 160 120 310 200 350 C280 310 350 160 200 40 Z"
                fill="url(#lotusRearGrad)"
                className="opacity-30"
              />

              {/* Side flanking Petals */}
              <path
                d="M200 180 C80 120 40 260 200 340 C100 280 120 220 200 180 Z"
                fill="url(#petalShineGrad)"
                className="opacity-45"
                style={{
                  transform: "rotate(-16deg)",
                  transformOrigin: "200px 340px",
                }}
              />
              <path
                d="M200 180 C320 120 360 260 200 340 C300 280 280 220 200 180 Z"
                fill="url(#petalShineGrad)"
                className="opacity-45"
                style={{
                  transform: "rotate(16deg)",
                  transformOrigin: "200px 340px",
                }}
              />

              {/* Hugging Foreground Petals holding the cosmetic vessel */}
              <path
                d="M200 240 C150 190 130 270 200 330 C270 270 250 190 200 240 Z"
                fill="url(#lotusCoreGrad)"
                className="opacity-80"
              />

              {/* Core light emitter */}
              <circle
                cx="200"
                cy="300"
                r="28"
                fill="url(#coreEmanation)"
                className="opacity-95 mix-blend-screen animate-pulse"
              />

              {/* High-End Vector Definitions */}
              <defs>
                <radialGradient id="coreEmanation" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor={theme.primary} />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>

                <linearGradient id="lotusRearGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.primary} />
                  <stop offset="65%" stopColor="#1a0834" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                <linearGradient id="petalShineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop
                    offset="35%"
                    stopColor={theme.primary}
                    stopOpacity="0.55"
                  />
                  <stop offset="100%" stopColor="#06010d" />
                </linearGradient>

                <linearGradient id="lotusCoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="45%" stopColor={theme.primary} />
                  <stop offset="100%" stopColor="#0a0016" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glassmorphic Cosmetic Elixir Jar */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
              style={{
                transform: "translateY(-12px)",
                filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.95))",
              }}
            >
              <div
                className="relative w-40 h-44 rounded-[42px] border border-white/5 overflow-hidden backdrop-blur-lg bg-white/[0.02] shadow-inner flex flex-col justify-between items-center py-5 transition-all"
                style={{
                  boxShadow:
                    activeStage >= 4
                      ? `0 0 45px ${theme.primaryGlow}, inset 0 0 25px rgba(255,255,255,0.05)`
                      : "inset 0 0 15px rgba(255,255,255,0.02)",
                  animation:
                    activeStage >= 4
                      ? "customPulseGlow 3s infinite ease-in-out"
                      : "none",
                }}
              >
                {/* Silver Polished Lid */}
                <div className="absolute top-0 inset-x-0 h-11 bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600 border-b border-white/20 flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-[1.5px] bg-white/40" />
                  <div className="w-full h-3 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Micro-groove metallic lines */}
                  <div className="absolute inset-0 flex justify-around opacity-15 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-[1px] h-full bg-white" />
                    ))}
                  </div>
                  {/* Subtle reflecting shimmer flare */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-pulse"
                    style={{ animationDuration: "4.5s" }}
                  />
                </div>

                {/* Internal Cream Glow Serum Container */}
                <div
                  className="absolute bottom-1 w-[92%] h-[72%] rounded-b-[38px] rounded-t-[8px] pointer-events-none overflow-hidden"
                  style={{
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, ${theme.primaryGlow} 45%, rgba(6,1,14,0.95) 100%)`,
                  }}
                >
                  {/* Deep glowing fluid nucleus */}
                  <div
                    className="absolute w-32 h-32 rounded-full blur-xl opacity-90 -bottom-6 left-1/2 -translate-x-1/2 mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle, ${theme.primary} 0%, transparent 65%)`,
                      transform: `translate(-50%, -15%) scale(${activeStage >= 4 ? 1.12 : 0.96})`,
                      transition: "transform 3.5s ease-in-out",
                    }}
                  />
                </div>

                {/* Minimalist Skincare Typography Labels */}
                <div className="z-10 flex flex-col items-center justify-center text-center mt-12 w-full px-4">
                  <span className="text-[10px] tracking-[0.38em] text-white/90 font-medium font-serif leading-none">
                    A U R O R A
                  </span>
                  <span className="text-[6px] tracking-[0.2em] text-white/40 font-sans mt-1.5 uppercase">
                    LUMINOUS CELL ELIXIR
                  </span>

                  {/* Botanical emblem */}
                  <div className="my-2.5 opacity-25">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" />
                    </svg>
                  </div>

                  <div className="w-6 h-[1px] bg-white/15 my-1" />
                  <span className="text-[5px] tracking-[0.12em] text-white/30 font-mono">
                    PARIS • NEW YORK
                  </span>
                </div>

                {/* Glass bottom refraction bezel */}
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-white/8 to-transparent rounded-b-[42px]" />
              </div>

              {/* Fluid floor mirror reflection ripple */}
              <div
                className="absolute -bottom-16 w-32 h-5 rounded-full blur-md opacity-25 mix-blend-screen transition-all duration-1000"
                style={{
                  background: `radial-gradient(ellipse, ${theme.primary} 0%, transparent 75%)`,
                  transform: activeStage >= 4 ? "scale(1.2)" : "scale(1)",
                }}
              />
            </div>

            {/* Glowing Fairy Butterfly Fluttering */}
            <div
              className="absolute -top-7 -right-7 w-16 h-16 pointer-events-none z-30"
              style={{
                animation:
                  activeStage >= 4
                    ? "butterflyFloat 4s infinite ease-in-out"
                    : "none",
                filter: `drop-shadow(0 0 6px ${theme.primary})`,
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left Wing Flap */}
                <div
                  className="absolute left-0 w-8 h-10 origin-right"
                  style={{
                    animation:
                      activeStage >= 4
                        ? "flapLeft 0.28s infinite ease-in-out"
                        : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 100 120"
                    className="w-full h-full text-white"
                    style={{ color: theme.primary }}
                  >
                    <path
                      d="M100 60 C30 10, 0 30, 20 70 C30 90, 80 80, 100 60 Z"
                      fill="currentColor"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M100 60 C40 70, 20 100, 50 115 C70 120, 90 90, 100 60 Z"
                      fill="currentColor"
                      fillOpacity="0.45"
                    />
                    <path
                      d="M100 60 Q50 45 30 50"
                      stroke="#fff"
                      strokeWidth="2.5"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                {/* Right Wing Flap */}
                <div
                  className="absolute right-0 w-8 h-10 origin-left"
                  style={{
                    animation:
                      activeStage >= 4
                        ? "flapRight 0.28s infinite ease-in-out"
                        : "none",
                  }}
                >
                  <svg
                    viewBox="0 0 100 120"
                    className="w-full h-full text-white"
                    style={{ color: theme.primary, transform: "scaleX(-1)" }}
                  >
                    <path
                      d="M100 60 C30 10, 0 30, 20 70 C30 90, 80 80, 100 60 Z"
                      fill="currentColor"
                      fillOpacity="0.8"
                    />
                    <path
                      d="M100 60 C40 70, 20 100, 50 115 C70 120, 90 90, 100 60 Z"
                      fill="currentColor"
                      fillOpacity="0.45"
                    />
                    <path
                      d="M100 60 Q50 45 30 50"
                      stroke="#fff"
                      strokeWidth="2.5"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                {/* Butterfly core center body line */}
                <div className="absolute w-[2px] h-6 bg-white/90 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LEFT COLUMN: BRAND STORY (STAGGERED DELAY: 1.6s)          */}
      {/* ========================================================= */}
      {}
      <div
        className="absolute left-6 md:left-[180px] top-1/4 md:top-1/2 -translate-y-1/2 md:w-80 z-30 pointer-events-none select-none flex flex-col justify-center items-center md:items-start text-center md:text-left"
        style={{
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0) translateY(-50%)`,
        }}
      >
        {/* Item 1: Brand Title */}
        <div
          className="overflow-hidden transition-all duration-[800ms] ease-out"
          style={{
            opacity: activeStage >= 2 ? 1 : 0,
            transform: activeStage >= 2 ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          <h1 className="text-3xl md:text-5xl font-extralight tracking-[0.45em] text-white font-serif leading-none">
            A U R O R A
          </h1>
        </div>

        {/* Item 2: Divider Glow Line (Staggered by extra delay via css transition-delay properties) */}
        <div
          className="my-5 transition-all duration-1000 ease-out"
          style={{
            width: activeStage >= 2 ? "100%" : "0%",
            opacity: activeStage >= 2 ? 1 : 0,
            boxShadow: `0 0 10px ${theme.primaryGlow}`,
            transitionDelay: activeStage >= 2 ? "100ms" : "0ms",
          }}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent md:via-white/70 md:to-transparent" />
        </div>

        {/* Item 3: Subtitle */}
        <div
          className="transition-all duration-[800ms] ease-out"
          style={{
            opacity: activeStage >= 2 ? 0.9 : 0,
            transform: activeStage >= 2 ? "translateY(0)" : "translateY(20px)",
            transitionDelay: activeStage >= 2 ? "200ms" : "0ms",
          }}
        >
          <h3
            className={`text-xs md:text-sm font-medium tracking-[0.3em] font-mono uppercase ${theme.accentText}`}
          >
            NIGHT COSMETICS
          </h3>
          <p className="text-[10px] text-zinc-500 tracking-wider uppercase font-sans mt-3.5 leading-relaxed max-w-xs">
            Cellular Recovery • Over-Night Luminescence
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT COLUMN: BEAUTY DISCOVERY (STAGGERED DELAY: 1.8s)    */}
      {/* ========================================================= */}
      {}
      <div
        className="absolute right-6 md:right-[180px] bottom-1/4 md:top-1/2 -translate-y-1/2 md:w-80 z-30 pointer-events-none select-none flex flex-col justify-center items-center md:items-end text-center md:text-right"
        style={{
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0) translateY(-50%)`,
        }}
      >
        {/* Item 1: Heading */}
        <div
          className="overflow-hidden transition-all duration-[800ms] ease-out"
          style={{
            opacity: activeStage >= 3 ? 1 : 0,
            transform: activeStage >= 3 ? "translateX(0)" : "translateX(40px)",
          }}
        >
          <h2 className="text-xl md:text-3xl font-light tracking-[0.25em] text-white uppercase font-serif leading-snug">
            BLOOMING BEAUTY
          </h2>
        </div>

        {/* Item 2: Divider Glow line */}
        <div
          className="my-5 transition-all duration-1000 ease-out w-full"
          style={{
            width: activeStage >= 3 ? "100%" : "0%",
            opacity: activeStage >= 3 ? 1 : 0,
            boxShadow: `0 0 10px ${theme.primaryGlow}`,
            transitionDelay: activeStage >= 3 ? "100ms" : "0ms",
          }}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent md:from-transparent md:via-white/70" />
        </div>

        {/* Item 3: Description */}
        <div
          className="transition-all duration-[800ms] ease-out"
          style={{
            opacity: activeStage >= 3 ? 0.85 : 0,
            transform: activeStage >= 3 ? "translateY(0)" : "translateY(20px)",
            transitionDelay: activeStage >= 3 ? "200ms" : "0ms",
          }}
        >
          <p className="text-xs text-zinc-300 leading-relaxed font-light tracking-wide font-sans max-w-xs">
            Hydrating Lotus Extract & Midnight Cell Renewal Cream
          </p>

          <div className="mt-5 flex items-center justify-center md:justify-end gap-2.5">
            <span
              className={`text-[9px] tracking-[0.2em] font-mono uppercase ${theme.accentText}`}
            >
              Clinically Proven Repair
            </span>
            <div className="w-1.5 h-1.5 rounded-full animate-ping bg-[#3B82F6]" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* PURE CINEMATIC BLACKOUT ON FIRST MOUNT                     */}
      {/* ========================================================= */}
      {}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-40 transition-opacity ease-out"
        style={{
          opacity: activeStage >= 1 ? 0 : 1,
          transitionDuration: "1800ms",
        }}
      />

      {/* ========================================================= */}
      {/* FLOATING ACTION INTERFACES & CONTROLS                     */}
      {/* ========================================================= */}

      {/* Audio Toggler on bottom right */}
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSoundEnabled(!soundEnabled);
          }}
          className={`w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
            soundEnabled
              ? "bg-purple-950/40 border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(191,90,242,0.25)]"
              : "bg-black/40 border-white/10 text-zinc-500"
          }`}
          title={
            soundEnabled
              ? "Mute Ambient Soundtrack"
              : "Unmute Ambient Soundtrack"
          }
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>
    </div>
  );
}
