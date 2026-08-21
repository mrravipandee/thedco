"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function CTA() {
  const preferReduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black text-white border-b border-white/5">
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.035] blur-[120px]"
      />

      {/* Fine architectural lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
      >
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">

          {/* Eyebrow */}
          <Reveal>
            <span className="mb-6 block text-[10px] font-medium uppercase tracking-[0.35em] text-primary sm:text-xs">
              COLLABORATION
            </span>
          </Reveal>

          {/* Divider */}
          <LineReveal
            className="mx-auto mb-8 h-px w-16 bg-primary/70"
            delay={0.15}
          />

          {/* Main headline */}
          <Reveal delay={0.2}>
            <h2 className="mx-auto max-w-4xl font-serif text-4xl uppercase leading-[0.95] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl">
              Let&apos;s Build a{" "}
              <span className="text-primary">More Profitable</span>{" "}
              Hospitality Business Together
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.4}>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              THEDCO partners with hotel and restaurant owners, and the
              investors backing them, to build businesses that perform —
              financially and operationally.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.55}>
            <div className="mt-10 flex flex-col items-center gap-5">
              <motion.div
                whileHover={preferReduced ? {} : { y: -3 }}
                whileTap={preferReduced ? {} : { scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden border border-white/70 bg-transparent px-9 py-4 text-[10px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-500 hover:border-primary hover:text-black sm:px-11 sm:py-5 sm:text-xs"
                >
                  {/* Hover fill */}
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100" />

                  <span className="relative z-10">
                    Book a Consultation
                  </span>

                  <span className="relative z-10 ml-4 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                Start a conversation
              </span>
            </div>
          </Reveal>

          {/* Bottom metadata */}
          <Reveal delay={0.7}>
            <div className="mt-16 flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.25em] text-white/25">
              <span>Hospitality</span>

              <span className="h-1 w-1 rounded-full bg-primary/60" />

              <span>Strategy</span>

              <span className="h-1 w-1 rounded-full bg-primary/60" />

              <span>Growth</span>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}