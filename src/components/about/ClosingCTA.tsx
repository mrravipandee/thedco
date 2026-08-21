"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ClosingCTA() {
  const preferReduced = useReducedMotion();

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-8 md:py-28 lg:px-12">

        {/* Eyebrow */}
        <motion.span
          {...fadeUp}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.6, ease: "easeOut" }
          }
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-primary"
        >
          LET&apos;S WORK
        </motion.span>

        {/* Gold divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 80, opacity: 1 }}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.15, ease: "easeOut" }
          }
          className="mt-7 h-px bg-primary/60"
        />

        {/* Main heading */}
        <motion.h2
          initial={preferReduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.3, ease: "easeOut" }
          }
          className="mt-10 max-w-4xl font-serif text-4xl uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">Let&apos;s Build a</span>

          <span className="block text-primary">
            More Profitable
          </span>

          <span className="block">
            Hospitality Business
          </span>

          <span className="block">
            Together
          </span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          initial={preferReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.6, ease: "easeOut" }
          }
          className="mt-9 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
        >
          THEDCO partners with hotel and restaurant owners, and the
          investors backing them, to build businesses that perform,
          financially and operationally.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={preferReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.8, ease: "easeOut" }
          }
          className="mt-10"
        >
          <motion.div
            whileHover={preferReduced ? {} : { y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black sm:px-12 sm:py-5"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 1 }}
          transition={
            preferReduced
              ? { duration: 0 }
              : { duration: 0.7, delay: 1, ease: "easeOut" }
          }
          className="mt-7 h-px bg-primary/40"
        />
      </div>
    </section>
  );
}