"use client";

import React from "react";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/animations/Reveal";

export function ConsultationIntro() {
  const categories = [
    "New Hospitality Projects",
    "Existing Businesses Requiring Improvement",
    "Hotel Projects",
    "Restaurant Projects",
    "Resorts",
    "Hospitality Investments",
    "Operations Improvement",
    "Profitability Improvement",
    "Branding & Marketing Support",
  ];

  return (
    <section className="bg-black text-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold mb-6">
            START A CONVERSATION
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          {/* Left: Headline */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-serif tracking-tight uppercase leading-tight">
                Tell Us What <br />
                You&apos;re Building.
              </h2>
            </Reveal>
          </div>

          {/* Right: Explanatory copy & categories tag cloud/list */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0.1}>
              <p className="text-base text-white/75 leading-relaxed font-sans max-w-2xl">
                We partner with select owners, operators, and developers to bring operational excellence, 
                creative vision, and financial discipline to luxury hospitality businesses. 
                Our expertise spans a wide range of engagements:
              </p>
            </Reveal>

            {/* Premium Editorial Tag List */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-x-6 gap-y-4 max-w-2xl pt-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em]">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-white/80">{category}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Divider above the form */}
        <Reveal delay={0.3}>
          <Divider gold={true} className="mt-8 opacity-45" />
        </Reveal>
      </div>
    </section>
  );
}
