"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(infoRef.current, { opacity: 1, y: 0 });
        gsap.set(".challenge-row", { opacity: 1, y: 0 });
        gsap.set(".challenge-divider", { scaleX: 1 });
        return;
      }

      // Fade in left-side header content
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger rows reveal
      const rows = listRef.current?.querySelectorAll(".challenge-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Expand dividers
      const dividers = listRef.current?.querySelectorAll(".challenge-divider");
      if (dividers) {
        gsap.fromTo(
          dividers,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section
      ref={containerRef}
      className="bg-black text-white py-32 border-b border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading and Subtext */}
          <div ref={infoRef} className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block">
              THE CHALLENGES WE SEE MOST OFTEN
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight uppercase">
              We Understand Hospitality From an Owner&apos;s Point of View
            </h2>
            <p className="text-sm md:text-base text-white/50 leading-relaxed font-sans max-w-md">
              These are the challenges we see most often, and the ones we are built to solve.
            </p>
          </div>

          {/* Right Column: Challenges Challenge Wall */}
          <div ref={listRef} className="lg:col-span-7 flex flex-col">
            {CHALLENGES.map((item) => (
              <div
                key={item.num}
                className="challenge-row group flex flex-col pt-6 pb-2 cursor-pointer"
              >
                <div className="flex items-start space-x-6 md:space-x-8">
                  {/* Item Number */}
                  <span className="text-xs md:text-sm font-sans tracking-widest text-white/40 group-hover:text-primary transition-colors duration-300 mt-1">
                    {item.num}
                  </span>
                  {/* Challenge Text */}
                  <h3 className="text-base md:text-xl font-serif text-white/80 group-hover:text-white md:group-hover:translate-x-2.5 transition-all duration-300 uppercase tracking-wide leading-snug">
                    {item.text}
                  </h3>
                </div>
                {/* Horizontal Divider */}
                <div className="challenge-divider mt-6 h-px bg-white/10 group-hover:bg-primary/45 transition-colors duration-300 w-full origin-left" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
