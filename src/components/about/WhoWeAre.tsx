"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const realDataRef = useRef<HTMLDivElement>(null);
  const realDataItemsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set(
          [
            headingRef.current,
            p1Ref.current,
            p2Ref.current,
            p3Ref.current,
            realDataRef.current,
            realDataItemsRef.current,
            finalRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial state
      gsap.set([headingRef.current, p1Ref.current, p2Ref.current, p3Ref.current, finalRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(realDataRef.current, { opacity: 0 });
      gsap.set(".data-item", { opacity: 0, y: 15 });
      gsap.set(".data-divider", { scaleX: 0 });

      // Heading and Paragraphs Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(p1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(p2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(p3Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

      // Real data section ScrollTrigger
      const tlData = gsap.timeline({
        scrollTrigger: {
          trigger: realDataRef.current,
          start: "top 80%",
        },
      });

      tlData
        .to(realDataRef.current, { opacity: 1, duration: 0.6 })
        .to(".data-divider", { scaleX: 1, duration: 1, ease: "power3.inOut" })
        .to(".data-item", { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.6")
        .to(finalRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <h2
              ref={headingRef}
              className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase"
            >
              Who We Are
            </h2>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="lg:col-span-8 space-y-8 text-white/70 text-sm md:text-base leading-relaxed font-sans max-w-3xl">
            <p ref={p1Ref}>
              THEDCO is a hospitality advisory practice for restaurants and hotels that want more than advice.
            </p>
            <p ref={p2Ref}>
              We support first time investors building a business from the ground up.
            </p>
            <p ref={p3Ref}>
              We also support existing owners who need to audit and turn around their operations, rebuild cost structures, improve their menus and grow revenue.
            </p>
          </div>
        </div>

        {/* Real Data Block */}
        <div ref={realDataRef} className="max-w-4xl mx-auto pt-12">
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary block font-semibold">
              REAL DATA
            </span>
            <div className="data-divider h-px bg-primary/45 w-full max-w-md mx-auto origin-center" />
          </div>

          <div ref={realDataItemsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-8 text-center max-w-3xl mx-auto">
            <div className="data-item space-y-2">
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">01</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Sales Reports</h4>
            </div>
            <div className="data-item space-y-2">
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">02</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Expense Tracking</h4>
            </div>
            <div className="data-item space-y-2">
              <span className="block text-white/50 text-[10px] uppercase tracking-widest font-sans">03</span>
              <h4 className="text-lg md:text-xl font-serif text-white">Direct Observation on Site</h4>
            </div>
          </div>
        </div>

        {/* Final Sentence Block */}
        <div ref={finalRef} className="max-w-4xl mx-auto text-center pt-8">
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Every recommendation we make is based on real data, sales reports, expense tracking and direct observation on site, not on templates.
          </p>
          <div className="w-12 h-px bg-primary/45 mx-auto my-8" />
          <h3 className="text-2xl md:text-4xl font-serif text-primary tracking-wide uppercase max-w-3xl mx-auto leading-snug">
            The result is a plan the client&apos;s own team can actually follow.
          </h3>
        </div>

      </div>
    </section>
  );
}
