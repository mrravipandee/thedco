"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FounderCTA() {
  const preferReduced = useReducedMotion();

  const ctaReveal = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="bg-black text-white py-24 md:py-32 relative overflow-hidden flex flex-col justify-center items-center text-center border-b border-white/5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={ctaReveal}
        className="max-w-5xl mx-auto px-6 md:px-12 space-y-12"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
          COLLABORATION
        </span>

        {/* Cinematic Headline Climax */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif tracking-tight leading-tight uppercase max-w-4xl mx-auto">
          Work With Manav and the THEDCO Team
        </h2>

        {/* Divider */}
        <div className="h-px bg-primary/60 w-24 mx-auto" />

        {/* Description */}
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
          Every engagement is led with the same discipline he brought to his own family&apos;s hospitality business.
        </p>

        {/* Consultation CTA button */}
        <div className="pt-6">
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
        </div>
      </motion.div>
    </section>
  );
}
