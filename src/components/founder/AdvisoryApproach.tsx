"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AdvisoryArea {
  id: string;
  title: string;
  description: string;
}

const advisoryAreas: AdvisoryArea[] = [
  {
    id: "01",
    title: "Hospitality Operations",
    description:
      "12+ years inside a family run hotel, motel and restaurant group founded in 1983, covering guest service, operations and financial management learned first hand.",
  },
  {
    id: "02",
    title: "Business Strategy and Family Enterprise",
    description:
      "Master's in Global Family Managed Business from SP Jain, covering strategy, succession planning and scaling family owned hospitality businesses.",
  },
  {
    id: "03",
    title: "Digital Marketing and Brand Growth",
    description:
      "Ten plus years building and running his own marketing agency, covering branding, customer acquisition and revenue growth for hospitality brands.",
  },
];

export function AdvisoryApproach() {
  const preferReduced = useReducedMotion();

  const elementReveal = {
    hidden: { opacity: 0, y: preferReduced ? 0 : 30 },
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

  const lineReveal = {
    hidden: { scaleX: preferReduced ? 1 : 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="bg-black text-white py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-primary/70 font-mono">
            03 // APPROACH
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase">
            What Guides Manav&apos;s Advisory Approach
          </h2>
        </div>

        {/* Big Quote Block */}
        <div className="mb-24 space-y-8">
          <motion.blockquote
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={elementReveal}
            className="text-2xl md:text-4xl font-serif italic text-white/90 leading-relaxed max-w-4xl font-light"
          >
            &ldquo;Exceptional hospitality is created through operational excellence, financial discipline, continuous innovation, and an unwavering commitment to the guest experience.&rdquo;
          </motion.blockquote>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={lineReveal}
            className="h-px bg-primary/45 w-full origin-left"
          />
        </div>

        {/* Editorial Rows */}
        <div className="space-y-0 border-t border-white/10">
          {advisoryAreas.map((area, index) => (
            <motion.div
              key={area.id}
              custom={index * 0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={elementReveal}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline py-10 border-b border-white/10 group hover:bg-white/[0.01] px-4 -mx-4 transition-colors duration-500"
            >
              {/* Row ID & Title */}
              <div className="md:col-span-5 flex items-center space-x-6">
                <span className="font-mono text-xs text-primary/60 tracking-wider font-semibold">
                  {area.id}
                </span>
                <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                  {area.title}
                </h3>
              </div>

              {/* Row Description */}
              <div className="md:col-span-7">
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
