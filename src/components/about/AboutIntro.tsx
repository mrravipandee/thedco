"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function AboutIntro() {
  return (
    <section className="relative bg-black text-white pt-48 pb-32 border-b border-white/5 overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Eyebrow, H2, Subtext, Divider */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                ABOUT THEDCO
              </div>
            </Reveal>

            <h2 className="text-4xl md:text-6xl font-serif leading-[1.15] text-white tracking-tight flex flex-col">
              <TextReveal text="About THEDCO" delay={0.2} />
            </h2>

            {/* Accent Divider */}
            <LineReveal className="bg-primary max-w-[200px]" delay={0.4} />

            <Reveal delay={0.5}>
              <p className="text-lg md:text-xl font-serif italic text-white/80 max-w-xl leading-relaxed">
                A hospitality advisory firm built on real operating experience.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Body paragraphs */}
          <div className="lg:col-span-5 space-y-6 lg:pt-16">
            <Reveal delay={0.7}>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
                THEDCO exists to help hotel and restaurant owners turn ideas into organised, sustainable and profitable businesses.
              </p>
            </Reveal>
            <Reveal delay={0.8}>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
                We combine hands on hospitality experience with business strategy, operations, branding, staffing and financial planning.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
