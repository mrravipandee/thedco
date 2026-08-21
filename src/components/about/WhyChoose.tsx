"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

const POINTS = [
  {
    num: "01",
    title: "Practical Over Theoretical",
    desc: "We implement solutions, not just deliver reports.",
  },
  {
    num: "02",
    title: "Single Point of Contact",
    desc: "One team across audit, finance, menu and marketing.",
  },
  {
    num: "03",
    title: "Hospitality Specific Standards",
    desc: "Industry correct terminology, SOPs and benchmarks.",
  },
  {
    num: "04",
    title: "Transparent Monitoring",
    desc: "Regular reviews track progress against agreed KPIs.",
  },
  {
    num: "05",
    title: "Owner Focused Approach",
    desc: "Every plan is built around the owner's goals, not a fixed template.",
  },
  {
    num: "06",
    title: "Strong Focus on Profitability",
    desc: "Every recommendation is judged by its effect on the bottom line.",
  },
  {
    num: "07",
    title: "Experience in Tier 2 and Emerging Markets",
    desc: "We understand hospitality outside the metro cities as well as within them.",
  },
  {
    num: "08",
    title: "Access to Branding and Media Capabilities",
    desc: "Advisory, branding and marketing support under one roof.",
  },
];

export function WhyChoose() {
  const preferReduced = useReducedMotion();

  const textHover = preferReduced
    ? undefined
    : {
        hover: { x: 8, transition: { duration: 0.3, ease: "easeOut" as const } },
      };

  const numberHover = preferReduced
    ? undefined
    : {
        hover: { color: "#C9A24A", transition: { duration: 0.3 } },
      };

  return (
    <section className="bg-black text-white py-32 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-4">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
                CREDIBILITY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-tight">
                Why Choose THEDCO
              </h2>
            </Reveal>
          </div>

          {/* Right Column: Numbered List */}
          <Stagger className="lg:col-span-7 flex flex-col" staggerDelay={0.06}>
            {POINTS.map((item) => (
              <Reveal key={item.num} className="w-full">
                <motion.div
                  whileHover="hover"
                  className="why-item group flex items-start space-x-6 md:space-x-8 py-8 border-b border-white/5 cursor-pointer transition-all duration-300 hover:!opacity-100"
                >
                  {/* Large Number indicator */}
                  <motion.span
                    variants={numberHover}
                    className="text-lg md:text-xl font-serif text-white/40 transition-colors duration-300 mt-1"
                  >
                    {item.num}
                  </motion.span>

                  {/* Content block */}
                  <motion.div variants={textHover} className="space-y-2 flex-grow">
                    <h3 className="text-lg md:text-xl font-serif uppercase tracking-wider text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300 leading-relaxed font-sans max-w-xl">
                      {item.desc}
                    </p>
                  </motion.div>
                </motion.div>
              </Reveal>
            ))}
          </Stagger>

        </div>
      </div>
    </section>
  );
}
