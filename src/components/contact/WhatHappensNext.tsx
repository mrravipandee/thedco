"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

interface Step {
  number: string;
  title: string;
  description: string;
}

export function WhatHappensNext() {
  const preferReduced = useReducedMotion();

  const steps: Step[] = [
    {
      number: "01",
      title: "SHARE YOUR REQUIREMENTS",
      description: "Tell us about your hospitality business, project or current challenge.",
    },
    {
      number: "02",
      title: "INITIAL DISCUSSION",
      description: "We understand your goals, requirements and current situation.",
    },
    {
      number: "03",
      title: "NEXT STEPS",
      description: "We identify the appropriate area of support and discuss how THEDCO can help.",
    },
  ];

  return (
    <section className="bg-black text-white py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24">
          <Reveal className="space-y-4">
            <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
              THE PROCESS
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight uppercase">
              What Happens Next
            </h2>
          </Reveal>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <motion.div
            initial={{ scaleX: preferReduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="hidden md:block absolute top-[44px] left-[5%] right-[5%] h-[1px] bg-primary/30 origin-left z-0"
          />

          {/* Connecting Line - Mobile */}
          <motion.div
            initial={{ scaleY: preferReduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="block md:hidden absolute left-[27px] top-[44px] bottom-[44px] w-[1px] bg-primary/30 origin-top z-0"
          />

          {/* Steps Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative z-10" staggerDelay={0.25}>
            {steps.map((step, idx) => (
              <Reveal
                key={idx}
                className="step-card flex flex-row md:flex-col items-start space-x-6 md:space-x-0 md:space-y-8"
              >
                {/* Large Editorial Number Indicator */}
                <div className="relative flex-shrink-0">
                  <span className="inline-block text-3xl font-serif tracking-widest text-primary bg-black px-4 py-2 border border-primary/20 md:border-none md:p-0 md:bg-transparent">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 pt-2 md:pt-0">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans max-w-sm">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
