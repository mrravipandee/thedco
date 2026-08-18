"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_POINTS = [
  "Panchavati Group of Hotels, Motels and Restaurants",
  "Hotel and restaurant operations",
  "Hospitality advisory projects",
  "Restaurant launches",
  "Food service branding and marketing",
  "XLAR Media Service",
  "The Brand Klinik",
];

export function QuickCredibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) return;

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      const rows = listRef.current?.querySelectorAll(".exp-row");
      if (rows) {
        rows.forEach((row) => {
          const divider = row.querySelector(".exp-divider");
          const content = row.querySelectorAll(".exp-content");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          tl.fromTo(
            divider,
            { width: "0%" },
            { width: "100%", duration: 1.2, ease: "power3.inOut" }
          ).fromTo(
            content,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.8"
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div ref={headerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              QUICK CREDIBILITY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
              Grounded in Real Hospitality Experience
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              THEDCO is built on direct hospitality operating experience, not general business theory.
            </p>
          </div>
        </div>

        {/* Experience List Block */}
        <div ref={listRef} className="space-y-0">
          {EXPERIENCE_POINTS.map((item, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            return (
              <div
                key={item}
                className="exp-row group relative py-6 flex items-center justify-between transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Horizontal Divider */}
                <div className="exp-divider absolute top-0 left-0 h-px bg-white/10 w-full group-hover:bg-primary transition-colors duration-500" />

                <div className="flex items-center space-x-8 exp-content md:space-x-12">
                  <span className="text-xs font-sans tracking-widest text-white/30 group-hover:text-primary transition-colors duration-500">
                    {formattedIndex}
                  </span>
                  <span className="text-base md:text-xl font-serif text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                    {item}
                  </span>
                </div>

                <div className="exp-content">
                  <span className="w-1.5 h-1.5 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-500 block mr-2" />
                </div>
              </div>
            );
          })}
          <div className="h-px bg-white/10 w-full" />
        </div>
      </div>
    </section>
  );
}
