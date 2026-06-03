"use client";

import { motion } from "framer-motion";
import { Zap, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { fadeUp, staggerContainer } from "@/constants/animations";

const FOOTER_LINKS = {
  Product: ["NEXUS Pro", "NEXUS Studio", "Charging Case", "Accessories"],
  Company: ["About", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Warranty", "Repairs", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies", "Patents"],
};

const SOCIALS = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Github, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Top glow divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.4) 40%, rgba(96,165,250,0.5) 50%, rgba(59,130,246,0.4) 60%, transparent)",
        }}
      />
      {/* Glow under divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,235,0.15), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4 group cursor-pointer w-fit">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">NEXUS</span>
            </a>
            <p className="text-muted-text text-sm leading-relaxed max-w-xs mb-6">
              The future of personal audio. AI-powered. Beautifully engineered.
              Uncompromisingly premium.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-muted-text hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-text text-sm hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-muted-text text-xs">
            © 2025 NEXUS Audio Technologies. All rights reserved.
          </p>

          {/* Ambient badge */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted-text font-mono">
              All systems operational
            </span>
          </div>

          <p className="text-muted-text text-xs">
            Designed with precision in San Francisco
          </p>
        </div>
      </div>
    </footer>
  );
}
