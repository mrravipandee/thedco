"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AboutIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(
          [eyebrowRef.current, h2Ref.current, subtextRef.current, bodyRef.current],
          { opacity: 1, y: 0 }
        );
        gsap.set(dividerRef.current, { width: "100%" });
        return;
      }

      // Set initial values
      gsap.set([eyebrowRef.current, subtextRef.current, bodyRef.current], {
        opacity: 0,
        y: 25,
      });
      gsap.set(dividerRef.current, { width: "0%" });

      // Split H2 text into words/lines cleanly
      const h2 = h2Ref.current;
      if (h2) {
        const text = h2.innerText;
        h2.innerHTML = text
          .split(" ")
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden mr-3"><span class="inline-block translate-y-[100%] opacity-0 anim-h2-word">${word}</span></span>`
          )
          .join(" ");
      }

      // Create load animation timeline
      const tl = gsap.timeline();

      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(
          dividerRef.current,
          { width: "100%", duration: 1.2, ease: "power3.inOut" },
          "-=0.4"
        )
        .to(
          ".anim-h2-word",
          { y: "0%", opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" },
          "-=0.8"
        )
        .to(
          subtextRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          bodyRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );

      // Scroll trigger animations (parallax)
      gsap.to(h2Ref.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Expand line or scale height slightly on scroll
      gsap.to(dividerRef.current, {
        opacity: 0.4,
        scaleY: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white pt-48 pb-32 border-b border-white/5 overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow, H2, Subtext, Divider */}
          <div className="lg:col-span-7 space-y-8">
            <div
              ref={eyebrowRef}
              className="text-xs uppercase tracking-[0.3em] text-primary"
            >
              ABOUT THEDCO
            </div>

            <h2
              ref={h2Ref}
              className="text-4xl md:text-6xl font-serif leading-[1.15] text-white tracking-tight"
            >
              About THEDCO
            </h2>

            {/* Accent Divider */}
            <div
              ref={dividerRef}
              className="h-[1px] bg-primary w-0 origin-left"
            />

            <p
              ref={subtextRef}
              className="text-lg md:text-xl font-serif italic text-white/80 max-w-xl leading-relaxed"
            >
              A hospitality advisory firm built on real operating experience.
            </p>
          </div>

          {/* Right Column: Body paragraphs */}
          <div ref={bodyRef} className="lg:col-span-5 space-y-6 lg:pt-16">
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
              THEDCO exists to help hotel and restaurant owners turn ideas into organised, sustainable and profitable businesses.
            </p>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
              We combine hands on hospitality experience with business strategy, operations, branding, staffing and financial planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
