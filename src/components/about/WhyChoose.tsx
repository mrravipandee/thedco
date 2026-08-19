"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 });
        gsap.set(".why-item", { opacity: 0.7, y: 0 });
        return;
      }

      // Heading Reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Staggered reveal of list items
      const items = listRef.current?.querySelectorAll(".why-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 0.7, // Target inactive resting state opacity
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
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
          
          {/* Left Column: Heading */}
          <div ref={headingRef} className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              CREDIBILITY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-tight">
              Why Choose THEDCO
            </h2>
          </div>

          {/* Right Column: Numbered List */}
          <div ref={listRef} className="lg:col-span-7 flex flex-col">
            {POINTS.map((item) => (
              <div
                key={item.num}
                className="why-item group flex items-start space-x-6 md:space-x-8 py-8 border-b border-white/5 cursor-pointer transition-all duration-300 hover:!opacity-100 hover:translate-x-2.5"
                style={{ opacity: preferReduced ? 1 : undefined }}
              >
                {/* Large Number indicator */}
                <span className="text-lg md:text-xl font-serif text-white/40 group-hover:text-primary transition-colors duration-300 mt-1">
                  {item.num}
                </span>

                {/* Content block */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-lg md:text-xl font-serif uppercase tracking-wider text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300 leading-relaxed font-sans max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
