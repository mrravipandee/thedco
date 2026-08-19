"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: "01",
    title: "End to End Delivery",
    desc: "From concept to execution.",
  },
  {
    num: "02",
    title: "Hospitality Only Focus",
    desc: "We work only with restaurants, hotels and resorts.",
  },
  {
    num: "03",
    title: "Hands On Implementation",
    desc: "We work alongside your team, not from a distance.",
  },
  {
    num: "04",
    title: "Data Driven Approach",
    desc: "Every decision is backed by real numbers.",
  },
];

export function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Sticky track behavior on desktop
      mm.add("(min-width: 1024px)", () => {
        // Track the overall scroll progress of the right column to grow the gold line
        ScrollTrigger.create({
          trigger: rightColumnRef.current,
          start: "top 32%",
          end: "bottom 68%",
          scrub: 0.1,
          onUpdate: (self) => {
            if (lineRef.current) {
              gsap.to(lineRef.current, {
                height: `${self.progress * 100}%`,
                duration: 0.1,
                ease: "none",
              });
            }
          },
        });

        // Set active index for each item as it scrolls past the center of the viewport
        const items = rightColumnRef.current?.querySelectorAll(".work-item");
        if (items) {
          items.forEach((item, idx) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 45%",
              end: "bottom 45%",
              onEnter: () => setActiveIndex(idx),
              onEnterBack: () => setActiveIndex(idx),
            });
          });
        }
      });

      // Mobile fade/reveal sequence
      mm.add("(max-width: 1023px)", () => {
        const rows = containerRef.current?.querySelectorAll(".mobile-row");
        if (rows) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            }
          );
        }
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  // Reduced motion alternative layout
  if (preferReduced) {
    return (
      <section className="bg-black text-white border-b border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase">
              How We Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            {PRINCIPLES.map((item) => (
              <div
                key={item.num}
                className="border-b border-white/5 pb-6 flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-serif text-primary">{item.num}</span>
                  <h3 className="text-lg md:text-xl font-serif uppercase tracking-wider text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-white/60 font-sans pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="bg-black text-white relative border-b border-white/5 py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Tracker (Sticky on Desktop) */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 self-start h-fit space-y-8 pb-12 lg:pb-0">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-tight">
              How We Work
            </h2>
            
            {/* Vertical Progress indicator (Desktop only) */}
            <div className="hidden lg:flex items-center space-x-6 pt-4">
              <span className="text-xs font-sans tracking-widest text-white/30">01</span>
              <div className="h-32 w-[1px] bg-white/10 relative">
                <div
                  ref={lineRef}
                  className="absolute top-0 left-0 w-[2px] bg-primary transition-all duration-100"
                  style={{ height: "0%" }}
                />
              </div>
              <span className="text-xs font-sans tracking-widest text-white/30">04</span>
            </div>
          </div>

          {/* Right Column: Scrolling items */}
          <div ref={rightColumnRef} className="col-span-12 lg:col-span-7 space-y-16 lg:space-y-32">
            {PRINCIPLES.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.num}
                  className={`work-item mobile-row border-b border-white/5 pb-12 transition-all duration-500 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "lg:opacity-25 lg:scale-[0.98]"
                  }`}
                >
                  <div className="flex items-start space-x-6">
                    {/* Principle number */}
                    <span
                      className={`text-xl md:text-2xl font-serif transition-colors duration-500 ${
                        isActive ? "text-primary" : "text-white/40"
                      }`}
                    >
                      {item.num}
                    </span>
                    {/* Content details */}
                    <div className="space-y-3 flex-grow">
                      <h3
                        className={`text-lg md:text-2xl font-serif uppercase tracking-wider transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/50"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/60 font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
