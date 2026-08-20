"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        // Immediate static layout for reduced motion
        gsap.set(eyebrowRef.current, { opacity: 1 });
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set(".line-span", { y: "0%", opacity: 1 });
        gsap.set(descRef.current, { opacity: 1, y: 0 });
        gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(".line-span", { y: "100%", opacity: 0 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      // Elegant entrance timeline
      const tl = gsap.timeline();

      tl.to(eyebrowRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "-=0.5"
        )
        .to(
          ".line-span",
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .to(
          descRef.current,
          {
            opacity: 0.6, // matching text-white/60
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  const scrollToForm = () => {
    const formEl = document.getElementById("contact-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center bg-black text-white pt-32 pb-20 overflow-hidden"
    >
      {/* Decorative ambient background highlight */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold"
          >
            CONTACT THEDCO
          </span>

          {/* H1 - Cinematic title revealed line-by-line */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight uppercase leading-[1.05]"
          >
            <span className="block overflow-hidden py-1">
              <span className="line-span block">Let&apos;s Talk</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="line-span block text-primary">Hospitality.</span>
            </span>
          </h1>

          {/* Small Gold Divider */}
          <div
            ref={lineRef}
            className="h-px bg-primary w-24 origin-left"
            style={{ transformOrigin: "left center" }}
          />

          {/* Description & CTA */}
          <div className="space-y-8 max-w-xl">
            <p
              ref={descRef}
              className="text-base md:text-lg text-white/60 leading-relaxed font-sans"
            >
              Whether you&apos;re planning a new hospitality project, improving an existing business,
              or looking for support with operations, profitability, branding or growth, we&apos;d like
              to understand what you&apos;re building.
            </p>

            <div ref={ctaRef}>
              <button
                onClick={scrollToForm}
                className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-10 py-4.5 transition-all duration-300 font-semibold cursor-pointer"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
