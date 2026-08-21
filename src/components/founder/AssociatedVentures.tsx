"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VentureItem {
  id: string;
  title: string;
}

const ventures: VentureItem[] = [
  {
    id: "01",
    title: "Panchavati Group of Hotels, Motels and Restaurants",
  },
  {
    id: "02",
    title: "Founder of XLAR Media",
  },
  {
    id: "03",
    title: "Service Co-founder or partner at The Brand Klinik",
  },
];

export function AssociatedVentures() {
  const preferReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: preferReduced ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Sub-variants for hover states (disabled if reduced motion is preferred)
  const numberHover = {
    hover: {
      x: preferReduced ? 0 : 6,
      color: preferReduced ? "rgba(255, 255, 255, 0.4)" : "#C9A24A",
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  const lineHover = {
    initial: { scaleX: 0.15, originX: 0 },
    hover: {
      scaleX: preferReduced ? 0.15 : 1,
      backgroundColor: preferReduced ? "rgba(201, 162, 74, 0.4)" : "#C9A24A",
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const textHover = {
    hover: {
      x: preferReduced ? 0 : 10,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-black text-white py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-primary/70 font-mono">
            04 // PARTNERSHIPS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase">
            Associated Ventures
          </h2>
        </div>

        {/* Premium Ventures Index */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-0 max-w-4xl"
        >
          {ventures.map((venture) => (
            <motion.div
              key={venture.id}
              variants={itemVariants}
              whileHover="hover"
              className="py-10 border-b border-white/10 flex flex-col space-y-4 cursor-pointer group"
            >
              {/* Number */}
              <motion.span
                variants={numberHover}
                className="font-mono text-xs text-white/40 tracking-widest font-medium"
              >
                {venture.id}
              </motion.span>

              {/* Gold Accent Line */}
              <div className="relative w-full h-px bg-white/10">
                <motion.div
                  variants={lineHover}
                  initial="initial"
                  className="absolute inset-0 bg-primary/40 h-px w-full"
                />
              </div>

              {/* Title */}
              <motion.h3
                variants={textHover}
                className="text-xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-300 pr-4 leading-snug"
              >
                {venture.title}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
