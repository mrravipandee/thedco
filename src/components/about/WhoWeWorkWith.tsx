"use client";

import React from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

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
  return (
    <section className="bg-black text-white py-20 md:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start space-y-4">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
                PARTNERSHIP
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-tight">
                Who We Work With
              </h2>
            </Reveal>
          </div>

          {/* Right Column: 2-Column grid of items */}
          <Stagger className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4" staggerDelay={0.05}>
            {AUDIENCES.map((item, idx) => (
              <Reveal key={idx} className="w-full">
                <div
                  className="group relative py-4 border-b border-white/5 cursor-pointer overflow-hidden transition-all duration-300"
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
              </Reveal>
            ))}
          </Stagger>

        </div>
      </div>
    </section>
  );
}
