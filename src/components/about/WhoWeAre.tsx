"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { Stagger } from "@/components/motion/Stagger";

export function WhoWeAre() {
  return (
    <section className="bg-black text-white py-32 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase">
                Who We Are
              </h2>
            </Reveal>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="lg:col-span-8 space-y-8 text-white/70 text-sm md:text-base leading-relaxed font-sans max-w-3xl">
            <Reveal delay={0.1}>
              <p>
                THEDCO is a hospitality advisory practice for restaurants and hotels that want more than advice.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We support first time investors building a business from the ground up.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                We also support existing owners who need to audit and turn around their operations, rebuild cost structures, improve their menus and grow revenue.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Real Data Block */}
        <div className="max-w-4xl mx-auto pt-12">
          <Reveal className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              REAL DATA
            </span>
            <LineReveal className="bg-primary/45 w-full max-w-md mx-auto" delay={0.1} />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-8 text-center max-w-3xl mx-auto" staggerDelay={0.15}>
            <Reveal className="space-y-2">
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">01</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Sales Reports</h4>
            </Reveal>
            <Reveal className="space-y-2" delay={0.15}>
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">02</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Expense Tracking</h4>
            </Reveal>
            <Reveal className="space-y-2" delay={0.3}>
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">03</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Direct Observation on Site</h4>
            </Reveal>
          </Stagger>
        </div>

        {/* Final Sentence Block */}
        <div className="max-w-4xl mx-auto text-center pt-8 space-y-8">
          <Reveal>
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Every recommendation we make is based on real data, sales reports, expense tracking and direct observation on site, not on templates.
            </p>
          </Reveal>
          <LineReveal className="bg-primary/45 w-12 mx-auto" delay={0.2} />
          <Reveal delay={0.3}>
            <h3 className="text-2xl md:text-4xl font-serif text-primary tracking-wide uppercase max-w-3xl mx-auto leading-snug">
              The result is a plan the client&apos;s own team can actually follow.
            </h3>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
