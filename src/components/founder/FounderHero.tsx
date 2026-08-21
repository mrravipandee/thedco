"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FounderHero() {
  const preferReduced = useReducedMotion();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const textReveal = {
    hidden: { y: preferReduced ? 0 : "110%", opacity: preferReduced ? 1 : 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const lineReveal = {
    hidden: { scaleX: preferReduced ? 1 : 0 },
    visible: (custom: number) => ({
      scaleX: 1,
      transition: {
        duration: 1.4,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: preferReduced ? 1 : 1.05 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.6,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-[90vh] bg-black text-white pt-36 pb-20 overflow-hidden flex items-center border-b border-white/5">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 bg-radial-gradient from-gold-50/5 via-transparent to-transparent pointer-events-none opacity-40" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Accents */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-xs uppercase tracking-[0.35em] text-primary font-semibold"
              >
                FOUNDER
              </motion.div>

              <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif text-white tracking-tight leading-[1.1] uppercase">
                <span className="block overflow-hidden py-1">
                  <motion.span
                    custom={0.2}
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    className="inline-block"
                  >
                    Meet
                  </motion.span>
                </span>
                <span className="block overflow-hidden py-1">
                  <motion.span
                    custom={0.35}
                    initial="hidden"
                    animate="visible"
                    variants={textReveal}
                    className="inline-block text-primary"
                  >
                    Manav Chandak
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Gold Accent Line */}
            <div className="relative w-full max-w-md h-px">
              <motion.div
                custom={0.5}
                initial="hidden"
                animate="visible"
                variants={lineReveal}
                className="absolute inset-0 bg-primary origin-left"
              />
            </div>

            <motion.p
              custom={0.7}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-lg md:text-xl font-serif italic text-white/80 max-w-xl leading-relaxed"
            >
              Hospitality entrepreneur and advisor, Founder of THEDCO.
            </motion.p>
            
            <motion.div
              custom={0.9}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.25em] text-white/40"
            >
              <span>Est. 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <span>Maharashtra, India</span>
            </motion.div>
          </div>

          {/* Right Column: Visual Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={imageReveal}
              className="w-full max-w-md aspect-[4/5] relative border border-white/10 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent group"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40" />
              
              {/* Inner Decorative Borders */}
              <div className="absolute inset-2 border border-white/5 pointer-events-none" />

              {/* Graphic Logo / Text Overlay */}
              <div className="my-auto text-center space-y-6">
                <span className="block font-serif text-8xl md:text-9xl text-white/5 select-none tracking-widest transition-all duration-700 group-hover:text-primary/10">
                  MC
                </span>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                    THEDCO ADVISORY
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Portrait Placeholder
                  </p>
                </div>
              </div>

              {/* Footer details inside placeholder */}
              <div className="flex justify-between items-end text-[8px] uppercase tracking-widest text-white/20">
                <span>01 // PORTRAIT</span>
                <span>SECURE ARCHIVE</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
