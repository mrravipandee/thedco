"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

const EXPERIENCE_POINTS = [
  "Panchavati Group of Hotels, Motels and Restaurants",
  "Hotel and restaurant operations",
  "Hospitality advisory projects",
  "Restaurant launches",
  "Food service branding and marketing",
  "XLAR Media Service",
  "The Brand Klinik",
];

export function QuickCredibility() {
  const preferReduced = useReducedMotion();

  // Hover animations
  const textHover = preferReduced
    ? undefined
    : {
        hover: { x: 8, transition: { duration: 0.3, ease: "easeOut" as const } },
      };

  const numberHover = preferReduced
    ? undefined
    : {
        hover: { color: "#C9A24A", transition: { duration: 0.3 } },
      };

  return (
    <section className="bg-black text-white py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                QUICK CREDIBILITY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
                Grounded in Real Hospitality Experience
              </h2>
            </div>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-sm text-white/60 leading-relaxed font-sans">
                THEDCO is built on direct hospitality operating experience, not general business theory.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Experience List Block */}
        <div className="space-y-0">
          {EXPERIENCE_POINTS.map((item, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={item}
                whileHover="hover"
                className="group relative py-6 flex items-center justify-between transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Horizontal Divider Reveal */}
                <LineReveal className="absolute top-0 left-0 h-px bg-white/10 w-full" delay={index * 0.05} />

                <div className="flex items-center space-x-8 md:space-x-12">
                  <motion.span
                    variants={numberHover}
                    className="text-xs font-sans tracking-widest text-white/30 transition-colors duration-500"
                  >
                    {formattedIndex}
                  </motion.span>
                  <motion.span
                    variants={textHover}
                    className="text-base md:text-xl font-serif text-white/80 group-hover:text-white transition-all duration-500"
                  >
                    {item}
                  </motion.span>
                </div>

                <div>
                  <span className="w-1.5 h-1.5 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-500 block mr-2" />
                </div>
              </motion.div>
            );
          })}
          <div className="h-px bg-white/10 w-full" />
        </div>
      </div>
    </section>
  );
}
