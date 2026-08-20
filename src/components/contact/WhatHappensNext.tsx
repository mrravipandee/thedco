"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  title: string;
  description: string;
}

export function WhatHappensNext() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineHorizRef = useRef<HTMLDivElement>(null);
  const lineVertRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  const steps: Step[] = [
    {
      number: "01",
      title: "SHARE YOUR REQUIREMENTS",
      description: "Tell us about your hospitality business, project or current challenge.",
    },
    {
      number: "02",
      title: "INITIAL DISCUSSION",
      description: "We understand your goals, requirements and current situation.",
    },
    {
      number: "03",
      title: "NEXT STEPS",
      description: "We identify the appropriate area of support and discuss how THEDCO can help.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set([lineHorizRef.current, lineVertRef.current], { scaleX: 1, scaleY: 1 });
        gsap.set(".step-card", { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(lineHorizRef.current, { scaleX: 0 });
      gsap.set(lineVertRef.current, { scaleY: 0 });
      gsap.set(".step-card", { opacity: 0, y: 30 });

      // Create scroll triggered timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Animate line draw first, then stagger steps reveal
      tl.to(lineHorizRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
      })
        .to(
          lineVertRef.current,
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "<" // Start at the same time as horizontal line
        )
        .to(
          ".step-card",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.25,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24">
          <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold mb-6">
            THE PROCESS
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight uppercase">
            What Happens Next
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div
            ref={lineHorizRef}
            className="hidden md:block absolute top-[44px] left-[5%] right-[5%] h-[1px] bg-primary/30 origin-left"
            style={{ transformOrigin: "left center" }}
          />

          {/* Connecting Line - Mobile */}
          <div
            ref={lineVertRef}
            className="block md:hidden absolute left-[27px] top-[44px] bottom-[44px] w-[1px] bg-primary/30 origin-top"
            style={{ transformOrigin: "center top" }}
          />

          {/* Steps Grid */}
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="step-card flex flex-row md:flex-col items-start space-x-6 md:space-x-0 md:space-y-8"
              >
                {/* Large Editorial Number Indicator */}
                <div className="relative flex-shrink-0">
                  <span className="inline-block text-3xl font-serif tracking-widest text-primary bg-black px-4 py-2 border border-primary/20 md:border-none md:p-0 md:bg-transparent">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 pt-2 md:pt-0">
                  <h3 className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed font-sans max-w-sm">
                    {step.description}
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
