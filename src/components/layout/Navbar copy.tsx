"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrambleText from "@/components/common/ScrambleText";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Audio", href: "#audio" },
  { label: "AI Features", href: "#ai" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6"
      >
        <div
          className={cn(
            "w-full max-w-6xl rounded-full transition-all duration-500 backdrop-blur-md",
            scrolled
              ? "glass-light shadow-glass py-3 px-5"
              : "bg-transparent border border-white/5 py-3 px-5",
          )}
        >
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white fill-white" />
                <div className="absolute inset-0 rounded-lg bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="font-display font-bold text-white tracking-tight text-lg min-w-[60px]">
                <ScrambleText
                  text="NEXUS"
                  trigger="inView"
                  speed={40}
                  framesPerChar={4}
                />
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-1.5 text-sm text-muted-text hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5 cursor-pointer group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-neon-accent group-hover:w-4 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="hidden pointer-cursor md:flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-shadow duration-300 cursor-pointer"
              >
                <span className="relative min-w-[80px]">
                  <ScrambleText
                    text="Order Now"
                    trigger="inView"
                    speed={32}
                    framesPerChar={3}
                  />
                </span>
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-5 shadow-glass"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-muted-text hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5">
                <button className="w-full btn-primary justify-center">
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
