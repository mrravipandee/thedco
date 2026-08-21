"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Understand",
    description: "We clarify business goals, project stage, target customer and current challenges.",
  },
  {
    num: "02",
    title: "Audit",
    description: "We review the market, operations, finances, service standards, team and customer experience.",
  },
  {
    num: "03",
    title: "Plan",
    description: "We build a practical strategy with clear priorities, budgets and timelines.",
  },
  {
    num: "04",
    title: "Implement",
    description: "We support staffing, systems, SOPs, vendor selection, training and launch execution.",
  },
  {
    num: "05",
    title: "Review",
    description: "We track performance, correct gaps and continue improving results.",
  },
];

export function HowWeHelp() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const ctx = gsap.context(() => {
      const steps = containerRef.current?.querySelectorAll(".step-item");
      if (steps) {
        steps.forEach((step, idx) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
              setActiveStep(idx);
              gsap.to(lineRef.current, {
                height: `${((idx + 1) / STEPS.length) * 100}%`,
                duration: 0.4,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              setActiveStep(idx);
              gsap.to(lineRef.current, {
                height: `${((idx + 1) / STEPS.length) * 100}%`,
                duration: 0.4,
                ease: "power2.out",
              });
            },
          });
        });
      }

      gsap.fromTo(
        closingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: closingRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-20 md:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-16 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            THE PROCESS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight">
            How We Help
          </h2>
          <p className="text-sm text-white/50 leading-relaxed font-sans">
            Our advisory process, from first conversation to measured results.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative mb-20">
          {/* Vertical progress line container (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1 relative justify-self-center">
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />
            <div
              ref={lineRef}
              className="absolute top-0 left-1/2 w-[2px] bg-primary -translate-x-1/2 transition-all duration-300"
              style={{ height: preferReduced ? "100%" : "0%" }}
            />
          </div>

          {/* Steps list */}
          <div className="lg:col-span-11 space-y-16">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  className={cn(
                    "step-item transition-all duration-500 flex flex-col md:flex-row md:space-x-12",
                    isActive ? "opacity-100 scale-100" : "opacity-30 scale-[0.98]"
                  )}
                >
                  {/* Step Number */}
                  <div className="mb-2 md:mb-0">
                    <span
                      className={cn(
                        "text-3xl md:text-4xl font-serif tracking-wide block transition-colors duration-500",
                        isActive ? "text-primary" : "text-white/40"
                      )}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Statement */}
        <div
          ref={closingRef}
          className="max-w-4xl mx-auto border-t border-primary/20 pt-12 mt-12 text-center space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Our Commitment
          </span>
          <blockquote className="text-2xl md:text-4xl font-serif text-white leading-relaxed italic">
            &ldquo;THEDCO is involved directly in implementation. Our role is not limited to advisory reports alone.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
