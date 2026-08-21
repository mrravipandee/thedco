"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";

export function CTA() {
  const preferReduced = useReducedMotion();

  return (
    <section className="bg-black text-white py-36 relative overflow-hidden flex flex-col justify-center items-center text-center">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-primary block">
            SECTION 8 — CLOSING CTA
          </span>
        </Reveal>

        {/* Cinematic Headline Climax */}
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-tight uppercase max-w-4xl mx-auto flex flex-col">
          <TextReveal text="Let&apos;s Build a More" delay={0.1} />
          <TextReveal text="Profitable Hospitality" delay={0.3} />
          <TextReveal text="Business Together" delay={0.5} />
        </h2>

        {/* Divider */}
        <LineReveal className="bg-primary/60 w-24 mx-auto" delay={0.6} />

        {/* Description */}
        <Reveal delay={0.7}>
          <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
            THEDCO partners with hotel and restaurant owners, and the investors backing them, to build businesses that perform, financially and operationally.
          </p>
        </Reveal>

        {/* Consultation CTA button */}
        <Reveal delay={0.9} className="pt-6">
          <motion.div
            whileHover={preferReduced ? {} : { y: -3 }}
            className="inline-block"
          >
            <Link
              href="/contact"
              className="inline-block text-xs uppercase tracking-[0.25em] bg-white text-black font-semibold hover:bg-primary hover:text-black px-12 py-5 transition-all duration-300 border border-transparent shadow-lg hover:shadow-primary/25 cursor-pointer"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
