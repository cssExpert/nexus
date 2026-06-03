"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSectionV2 from "@/components/hero/HeroSectionV2";
import ProductShowcase from "@/components/product/ProductShowcase";
import AudioSection from "@/components/audio/AudioSection";
import AIFeatures from "@/components/ai/AIFeatures";
import CinematicScroll from "@/components/cinematic/CinematicScroll";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import CTASection from "@/components/cta/CTASection";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  useLenis();

  return (
    <main className="relative">
      <Navbar />
      <HeroSectionV2 />
      <ProductShowcase />
      <AudioSection />
      <AIFeatures />
      <CinematicScroll />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
