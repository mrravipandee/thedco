"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ClosingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(
          [headlineRef.current?.querySelectorAll("span"), descRef.current, buttonRef.current],
          { opacity: 1, y: 0 }
        );
        gsap.set([dividerRef.current, accentLineRef.current], { width: "80px" });
        return;
      }

      // Initial state
      gsap.set(dividerRef.current, { width: "0px" });
      gsap.set(accentLineRef.current, { width: "0px" });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });

      const lines = headlineRef.current?.querySelectorAll("span");
      if (lines) {
        gsap.set(lines, { opacity: 0, y: 40 });
      }

      // Timeline for CTA entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.to(dividerRef.current, { width: "80px", duration: 1, ease: "power3.inOut" })
        .to(
          lines || [],
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" },
          "-=0.6"
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(accentLineRef.current, { width: "120px", duration: 1, ease: "power3.inOut" }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section
      ref={containerRef}
      className="bg-black text-white py-48 relative overflow-hidden flex flex-col justify-center items-center text-center border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
          LET&apos;S WORK
        </span>

        {/* Gold Divider */}
        <div ref={dividerRef} className="h-px bg-primary/60 w-20 mx-auto" />

        {/* Cinematic Stacked H2 */}
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-[1.05] uppercase max-w-4xl mx-auto flex flex-col space-y-2"
        >
          <span>Let&apos;s Build a</span>
          <span className="text-primary">More Profitable</span>
          <span>Hospitality Business</span>
          <span>Together</span>
        </h2>

        {/* Subtext */}
        <p
          ref={descRef}
          className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto"
        >
          THEDCO partners with hotel and restaurant owners, and the investors backing them, to build businesses that perform, financially and operationally.
        </p>

        {/* Consultation CTA button */}
        <div ref={buttonRef} className="pt-6 flex flex-col items-center space-y-6">
          <Link
            href="/contact"
            className="inline-block text-xs uppercase tracking-[0.25em] bg-transparent text-white border border-white hover:border-primary hover:bg-primary hover:text-black px-12 py-5 transition-all duration-300 font-semibold"
          >
            Book a Consultation
          </Link>
          
          {/* Subtle gold accent line underneath CTA button */}
          <div ref={accentLineRef} className="h-px bg-primary/45 w-32" />
        </div>
      </div>
    </section>
  );
}
