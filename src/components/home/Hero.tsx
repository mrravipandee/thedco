"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function Hero() {
  const preferReduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-black text-white pt-32 pb-12 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 opacity-40">
        <ImageReveal
          src="/images/hero/hotel-lobby.jpg"
          alt="THE DCO Luxury Hotel Lobby"
          priority={true}
          duration={2.2}
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center">
        <div className="max-w-4xl space-y-8">
          {/* Brand/Eyebrow Section */}
          <div className="space-y-4">
            <Reveal delay={0.2} duration={0.8}>
              <div className="text-sm font-serif tracking-widest text-primary">
                THE DCO
              </div>
            </Reveal>
            
            <LineReveal delay={0.4} className="bg-primary/45 w-full max-w-[200px]" />
            
            <Reveal delay={0.5} duration={0.8}>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                HOSPITALITY ADVISORY
              </div>
            </Reveal>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.15] text-white tracking-tight flex flex-col">
            <TextReveal text="Building Better Hotels." delay={0.6} />
            <TextReveal text="Creating Profitable Restaurants." delay={0.8} />
          </h1>

          {/* Supporting Text */}
          <Reveal delay={1.0} duration={1.0}>
            <p className="text-base md:text-lg text-white/70 max-w-2xl font-sans leading-relaxed">
              THEDCO is a hospitality advisory firm serving hotels, restaurants, cafés, resorts, banquets and food service businesses. We support the full business cycle from concept development and launch to operations, marketing and profitable growth.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={1.2} duration={1.0}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div
                whileHover={preferReduced ? {} : { y: -3 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="inline-block text-xs uppercase tracking-[0.25em] bg-primary text-black font-semibold hover:bg-white hover:text-black px-8 py-4 transition-all duration-300 text-center cursor-pointer"
                >
                  Book a Consultation
                </Link>
              </motion.div>
              <motion.div
                whileHover={preferReduced ? {} : { y: -3 }}
                className="inline-block"
              >
                <Link
                  href="/services"
                  className="inline-block text-xs uppercase tracking-[0.25em] border border-white/20 text-white hover:border-primary hover:text-primary px-8 py-4 transition-all duration-300 text-center cursor-pointer"
                >
                  View Our Services
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer Info / Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-white/50 text-xs">
        <Reveal delay={1.4} duration={0.8}>
          <div className="uppercase tracking-[0.2em] leading-relaxed">
            Based in Maharashtra.
            <br />
            Advising hospitality businesses across India.
          </div>
        </Reveal>
        <Reveal delay={1.5} duration={0.8}>
          <div className="flex items-center space-x-3 uppercase tracking-[0.25em] text-[10px]">
            <span>Scroll Down</span>
            <span className="block w-1.5 h-1.5 bg-primary animate-ping rounded-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
