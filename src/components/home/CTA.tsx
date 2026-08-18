"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const ctx = gsap.context(() => {
      const h2 = headlineRef.current;
      if (h2) {
        const text = h2.innerText;
        // Split by lines or words cleanly
        h2.innerHTML = text
          .split(" ")
          .map((word) => `<span class="word-wrap inline-block overflow-hidden mr-3"><span class="word-content inline-block translate-y-[100%] opacity-0">${word}</span></span>`)
          .join(" ");
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.to(".word-content", { y: "0%", opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" })
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(lineRef.current, { width: "0%" }, { width: "100px", duration: 1, ease: "power3.inOut" }, "-=0.8")
        .fromTo(buttonRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-36 relative overflow-hidden flex flex-col justify-center items-center text-center">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <span className="text-xs uppercase tracking-[0.3em] text-primary block">
          SECTION 8 — CLOSING CTA
        </span>

        {/* Cinematic Headline Climax */}
        <h2 ref={headlineRef} className="text-4xl sm:text-6xl md:text-8xl font-serif tracking-tight leading-tight uppercase max-w-4xl mx-auto">
          Let&apos;s Build a More Profitable Hospitality Business Together
        </h2>

        {/* Divider */}
        <div ref={lineRef} className="h-px bg-primary/60 w-24 mx-auto" />

        {/* Description */}
        <p ref={descRef} className="text-sm md:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
          THEDCO partners with hotel and restaurant owners, and the investors backing them, to build businesses that perform, financially and operationally.
        </p>

        {/* Consultation CTA button */}
        <div ref={buttonRef} className="pt-6">
          <Link
            href="/contact"
            className="inline-block text-xs uppercase tracking-[0.25em] bg-white text-black font-semibold hover:bg-primary hover:text-black px-12 py-5 transition-all duration-300 border border-transparent shadow-lg hover:shadow-primary/25"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
