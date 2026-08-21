"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function ContactHero() {
  const preferReduced = useReducedMotion();

  const scrollToForm = () => {
    const formEl = document.getElementById("contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center bg-black text-white pt-32 pb-20 overflow-hidden">
      {/* Decorative ambient background highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
          {/* Eyebrow */}
          <Reveal>
            <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
              CONTACT THEDCO
            </span>
          </Reveal>

          {/* H1 - Cinematic title revealed line-by-line */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight uppercase leading-[1.05] flex flex-col">
            <TextReveal text="Let&apos;s Talk" delay={0.2} />
            <TextReveal text="Hospitality." className="text-primary" delay={0.4} />
          </h1>

          {/* Small Gold Divider */}
          <LineReveal className="bg-primary w-24" delay={0.5} />

          {/* Description & CTA */}
          <div className="space-y-8 max-w-xl">
            <Reveal delay={0.6}>
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-sans">
                Whether you&apos;re planning a new hospitality project, improving an existing business,
                or looking for support with operations, profitability, branding or growth, we&apos;d like
                to understand what you&apos;re building.
              </p>
            </Reveal>

            <Reveal delay={0.8}>
              <motion.div
                whileHover={preferReduced ? {} : { y: -3 }}
                className="inline-block"
              >
                <button
                  onClick={scrollToForm}
                  className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-10 py-4.5 transition-all duration-300 font-semibold cursor-pointer"
                >
                  Book a Consultation
                </button>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
