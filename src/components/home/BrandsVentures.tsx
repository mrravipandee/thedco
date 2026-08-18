"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  "Panchavati Group of Hotels, Motels and Restaurants",
  "XLAR Media",
  "The Brand Klinik",
];

export function BrandsVentures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const el = marqueeRef.current;
    if (!el) return;

    // To prevent immediate scrollWidth calculation issues, wait 100ms
    const timer = setTimeout(() => {
      const width = el.scrollWidth / 2;

      const animation = gsap.to(el, {
        x: -width,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // Simple mouse listener helpers
      const handleMouseEnter = () => animation.pause();
      const handleMouseLeave = () => animation.play();

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        animation.kill();
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-primary block mb-4">
          SECTION 7 — BRANDS AND VENTURES
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight max-w-xl">
          Brands and Ventures We&apos;ve Worked With
        </h2>
      </div>

      {/* TYPOGRAPHY MARQUEE */}
      <div className="relative w-screen overflow-hidden py-10 bg-white/[0.02] border-y border-white/5">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap space-x-16 md:space-x-32"
          style={{ width: "max-content" }}
        >
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <span
              key={idx}
              className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-widest text-white/30 hover:text-primary transition-all duration-500 cursor-pointer inline-block"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
