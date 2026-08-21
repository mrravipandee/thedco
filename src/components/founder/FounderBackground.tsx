"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FounderBackground() {
  const preferReduced = useReducedMotion();

  const sectionReveal = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const paragraphReveal = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="relative bg-black text-white py-32 border-b border-white/5 overflow-hidden">
      {/* Large subtle background typography for "1983" (establishment of Panchavati Group) */}
      <div className="absolute right-[-5%] bottom-[-5%] select-none pointer-events-none font-serif text-[18vw] leading-none text-white/[0.015] z-0 font-bold">
        1983
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Number */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionReveal}
              className="space-y-4"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-primary/70 font-mono">
                01 // BACKGROUND
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-[1.15]">
                A Foundation Built on Real Experience
              </h2>
            </motion.div>
            
            {/* Subtle editorial line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-px bg-primary/20 w-32 origin-left"
            />
          </div>

          {/* Right Column: Founder story body paragraphs */}
          <div className="lg:col-span-7 space-y-8 text-white/70 text-sm md:text-base leading-relaxed font-sans max-w-3xl lg:pt-8">
            <motion.p
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={paragraphReveal}
            >
              Manav Chandak is a third generation hospitality entrepreneur, carrying forward the Panchavati Group of Hotels, Motels and Restaurants, a family business established in 1983.
            </motion.p>
            
            <motion.p
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={paragraphReveal}
            >
              Growing up inside a working hotel and restaurant business gave him early, hands on exposure to guest service, daily operations, financial management and long term strategy, well before it became his profession.
            </motion.p>

            <motion.p
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={paragraphReveal}
            >
              He holds a Master&apos;s degree in Global Family Managed Business from SP Jain School of Global Management, with specialisation in business strategy, entrepreneurship, leadership, succession planning and scaling family owned enterprises.
            </motion.p>

            <motion.p
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={paragraphReveal}
              className="text-white font-medium italic font-serif"
            >
              He pairs this academic grounding with over a decade of real operating experience.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
