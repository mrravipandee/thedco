"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const AUDIENCES = [
  "Hotels",
  "Bars and Lounges",
  "Resorts",
  "Bakeries and Confectionery",
  "Motels",
  "Banquet Halls",
  "Boutique Hotels",
  "Caterers",
  "Business Hotels",
  "Highway Hospitality Businesses",
  "Restaurants",
  "Pilgrimage Location Hotels and Restaurants",
  "Thali Restaurants",
  "New Hospitality Entrepreneurs",
  "Cafés and QSRs",
  "Existing Businesses Requiring Improvement",
  "Cloud Kitchens",
  "Investors Planning Hospitality Projects",
];

export function WhoWeWorkWith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 });
        gsap.set(".audience-item", { opacity: 1, y: 0 });
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
      const items = gridRef.current?.querySelectorAll(".audience-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
          <div ref={headingRef} className="lg:col-span-4 lg:sticky lg:top-32 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              PARTNERSHIP
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-tight">
              Who We Work With
            </h2>
          </div>

          {/* Right Column: 2-Column grid of items */}
          <div ref={gridRef} className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {AUDIENCES.map((item, idx) => (
              <div
                key={idx}
                className="audience-item group relative py-4 border-b border-white/5 cursor-pointer overflow-hidden transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  {/* Category Name */}
                  <span className="text-base md:text-lg font-serif text-white/80 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1.5 leading-snug">
                    {item}
                  </span>
                  
                  {/* Subtle brand tag */}
                  <span className="text-[9px] text-white/20 group-hover:text-primary transition-colors duration-300 font-sans tracking-widest uppercase">
                    / DCO
                  </span>
                </div>
                
                {/* Underline expand animation */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
