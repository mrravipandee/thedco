"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function ContactClosingCTA() {
  const preferReduced = useReducedMotion();

  const scrollToForm = () => {
    const formEl = document.getElementById("contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden flex flex-col justify-center items-center text-center border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
            LET&apos;S WORK
          </span>
        </Reveal>

        {/* Gold Divider */}
        <LineReveal className="bg-primary/60 w-20 mx-auto" delay={0.2} />

        {/* Cinematic Stacked H2 */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto flex flex-col">
          <TextReveal text="Let&apos;s Build a" delay={0.3} />
          <TextReveal text="More Profitable" className="text-primary" delay={0.5} />
          <TextReveal text="Hospitality Business" delay={0.7} />
          <TextReveal text="Together" delay={0.9} />
        </h2>

        {/* Subtext */}
        <Reveal delay={1.0}>
          <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
            THEDCO partners with hotel and restaurant owners, and the investors backing them, to build businesses that perform, financially and operationally.
          </p>
        </Reveal>

        {/* Consultation CTA button */}
        <div className="pt-6 flex flex-col items-center space-y-6">
          <Reveal delay={1.2}>
            <motion.div
              whileHover={preferReduced ? {} : { y: -3 }}
              className="inline-block"
            >
              <button
                onClick={scrollToForm}
                className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-12 py-5 transition-all duration-300 font-semibold cursor-pointer"
              >
                Book a Consultation
              </button>
            </motion.div>
          </Reveal>
          
          {/* Subtle gold accent line underneath CTA button */}
          <LineReveal className="bg-primary/45 w-32" delay={1.3} />
        </div>
      </div>
    </section>
  );
}
