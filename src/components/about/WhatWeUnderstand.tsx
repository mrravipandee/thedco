"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

const CHALLENGES = [
  { num: "01", text: "High operating costs" },
  { num: "02", text: "Delayed openings" },
  { num: "03", text: "Staff turnover" },
  { num: "04", text: "Vendor coordination" },
  { num: "05", text: "Food wastage" },
  { num: "06", text: "Licensing complexity" },
  { num: "07", text: "Inconsistent service" },
  { num: "08", text: "Marketing without measurable results" },
  { num: "09", text: "Low occupancy" },
  { num: "10", text: "Difficulty recovering the initial investment" },
  { num: "11", text: "Weak restaurant sales" },
  { num: "12", text: "Poor cost control" },
];

export function WhatWeUnderstand() {
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
          
          {/* Left Column: Heading and Subtext */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-primary block">
                THE CHALLENGES WE SEE MOST OFTEN
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight uppercase">
                We Understand Hospitality From an Owner&apos;s Point of View
              </h2>
              <p className="text-sm md:text-base text-white/50 leading-relaxed font-sans max-w-md">
                These are the challenges we see most often, and the ones we are built to solve.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Challenges Challenge Wall */}
          <div className="lg:col-span-7 flex flex-col">
            {CHALLENGES.map((item, index) => (
              <motion.div
                key={item.num}
                whileHover="hover"
                className="group flex flex-col pt-6 pb-2 cursor-pointer relative"
              >
                <div className="flex items-start space-x-6 md:space-x-8">
                  {/* Item Number */}
                  <motion.span
                    variants={numberHover}
                    className="text-xs md:text-sm font-sans tracking-widest text-white/40 transition-colors duration-300 mt-1"
                  >
                    {item.num}
                  </motion.span>
                  {/* Challenge Text */}
                  <motion.h3
                    variants={textHover}
                    className="text-base md:text-xl font-serif text-white/80 group-hover:text-white transition-all duration-300 uppercase tracking-wide leading-snug"
                  >
                    {item.text}
                  </motion.h3>
                </div>
                {/* Horizontal Divider */}
                <LineReveal className="mt-6 bg-white/10 group-hover:bg-primary/45" delay={index * 0.05} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
