"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ExperienceItem {
  number: string;
  title: string;
  description: string;
}

const experienceItems: ExperienceItem[] = [
  {
    number: "01",
    title: "12+ Years Hospitality Experience",
    description: "Direct, hands on work across hotel and restaurant operations.",
  },
  {
    number: "02",
    title: "1983 Family Hospitality Heritage",
    description: "Panchavati Group of Hotels, Motels and Restaurants, established in 1983.",
  },
  {
    number: "03",
    title: "SP Jain Global Family Business",
    description: "Master's degree with specialisation in strategy and succession planning.",
  },
  {
    number: "04",
    title: "10+ Years Digital Marketing & Brand Strategy",
    description: "Over ten years building and running his own marketing agency.",
  },
];

export function ExperienceSummary() {
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

  return (
    <section className="bg-black text-white py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase">
            Experience Summary
          </h2>
        </div>

        {/* Editorial 2x2 Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 border border-white/10"
        >
          {experienceItems.map((item, index) => (
            <motion.div
              key={item.number}
              variants={itemVariants}
              className={`p-8 md:p-12 space-y-6 flex flex-col justify-between min-h-[220px] bg-gradient-to-b from-white/[0.01] to-transparent hover:from-white/[0.02] transition-colors duration-500
                ${index === 0 ? "border-b border-white/10 md:border-r" : ""}
                ${index === 1 ? "border-b border-white/10" : ""}
                ${index === 2 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""}
                ${index === 3 ? "" : ""}
              `}
            >
              <div className="space-y-4">
                {/* Number with subtle gold line */}
                <div className="flex items-center space-x-3">
                  <span className="font-serif text-sm text-primary tracking-widest">
                    {item.number}
                  </span>
                  <div className="h-px w-6 bg-primary/30" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-white/60 text-sm leading-relaxed font-sans max-w-sm pt-4 border-t border-white/5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
