import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        surface: "#071026",
        "surface-2": "#0a1628",
        "primary-glow": "#2563EB",
        "neon-accent": "#3B82F6",
        "secondary-glow": "#60A5FA",
        "blue-mist": "#93C5FD",
        "muted-text": "#94A3B8",
        "border-glow": "rgba(59,130,246,0.2)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        heading: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.3) 0%, transparent 70%)",
        "radial-blue-center": "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 60%)",
        "glow-blue": "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)",
        "hero-gradient": "radial-gradient(ellipse at 60% 50%, rgba(37,99,235,0.12) 0%, transparent 55%)",
        "section-fade": "linear-gradient(to bottom, transparent, #020617 90%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(59,130,246,0.3)",
        "glow-md": "0 0 30px rgba(59,130,246,0.4)",
        "glow-lg": "0 0 60px rgba(59,130,246,0.35)",
        "glow-xl": "0 0 100px rgba(37,99,235,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card": "0 4px 24px rgba(0,0,0,0.5)",
        "neon": "0 0 20px rgba(59,130,246,0.6), 0 0 60px rgba(59,130,246,0.2)",
        "product": "0 40px 100px rgba(37,99,235,0.5), 0 0 40px rgba(59,130,246,0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(0.5deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "wave-expand": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "text-glow-pulse": {
          "0%, 100%": { textShadow: "0 0 20px rgba(96,165,250,0.4)" },
          "50%": { textShadow: "0 0 40px rgba(96,165,250,0.8), 0 0 80px rgba(59,130,246,0.3)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "wave-expand": "wave-expand 4s ease-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        orbit: "orbit 12s linear infinite",
        "text-glow-pulse": "text-glow-pulse 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      blur: {
        "xs": "2px",
        "4xl": "80px",
        "5xl": "120px",
      },
    },
  },
  plugins: [],
};

export default config;
