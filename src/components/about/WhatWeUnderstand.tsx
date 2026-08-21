"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

const CHALLENGES = [
  { num: "01", text: "High Operating Costs" },
  { num: "02", text: "Delayed Openings" },
  { num: "03", text: "Staff Turnover" },
  { num: "04", text: "Vendor Coordination" },
  { num: "05", text: "Food Wastage" },
  { num: "06", text: "Licensing Complexity" },
  { num: "07", text: "Inconsistent Service" },
  { num: "08", text: "Marketing Without Measurable Results" },
  { num: "09", text: "Low Occupancy" },
  { num: "10", text: "Difficulty Recovering Investment" },
  { num: "11", text: "Weak Restaurant Sales" },
  { num: "12", text: "Poor Cost Control" },
];

export function WhatWeUnderstand() {
  const preferReduced = useReducedMotion();

  return (
    <section className="bg-black text-white py-20 md:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Subtext */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
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

          {/* Right Column: Challenges Card Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {CHALLENGES.map((item, index) => (
              <motion.div
                key={item.num}
                whileHover={preferReduced ? {} : { y: -4, borderColor: "rgba(201, 162, 74, 0.45)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                className="group p-6 border border-white/5 bg-white/[0.01] transition-all duration-300 flex flex-col justify-between min-h-[140px] relative cursor-pointer"
              >
                {/* Gold Corner Accent lines */}
                <div className="absolute top-0 left-0 w-3 h-[1px] bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-[1px] h-3 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-primary/60 tracking-wider font-semibold">
                    {item.num}
                  </span>
                  <span className="text-[8px] text-white/20 uppercase tracking-[0.15em] font-sans">
                    / CHALLENGE
                  </span>
                </div>
                
                <h3 className="text-sm md:text-base font-serif text-white/70 group-hover:text-white transition-colors duration-300 uppercase tracking-wider leading-snug pt-6">
                  {item.text}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
