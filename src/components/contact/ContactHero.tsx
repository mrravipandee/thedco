"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function ContactHero() {

  return (
    <section className="relative bg-black text-white pt-40 pb-12 overflow-hidden">
      {/* Decorative ambient background highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center space-y-8">
          {/* Eyebrow */}
          <Reveal>
            <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
              CONTACT THEDCO
            </span>
          </Reveal>

          {/* H1 - Cinematic title revealed line-by-line */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight uppercase leading-[1.1] flex flex-col">
            <TextReveal text="Let&apos;s Talk About Your" delay={0.2} />
            <TextReveal text="Hospitality Business" className="text-primary" delay={0.4} />
          </h1>

          {/* Small Gold Divider */}
          <LineReveal className="bg-primary w-24" delay={0.5} />

          {/* Description */}
          <div className="space-y-6 max-w-xl">
            <Reveal delay={0.6}>
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-sans">
                Whether you&apos;re planning a new hospitality project, improving an existing business,
                or looking for support with operations, profitability, branding or growth, we&apos;d like
                to understand what you&apos;re building.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
