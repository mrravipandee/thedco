"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

const BRANDS = [
  "Panchavati Group of Hotels, Motels and Restaurants",
  "XLAR Media",
  "The Brand Klinik",
];

export function BrandsVentures() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-black text-white py-32 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-primary block mb-4">
            SECTION 7 — BRANDS AND VENTURES
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight max-w-xl">
            Brands and Ventures We&apos;ve Worked With
          </h2>
        </Reveal>
      </div>

      {/* TYPOGRAPHY MARQUEE */}
      <div className="relative w-screen overflow-hidden py-10 bg-white/[0.02] border-y border-white/5">
        <div
          className="flex whitespace-nowrap space-x-16 md:space-x-32 animate-[marquee_35s_linear_infinite]"
          style={{ 
            width: "max-content",
            animationPlayState: isPaused ? "paused" : "running"
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate items to ensure seamless infinite looping */}
          {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
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
