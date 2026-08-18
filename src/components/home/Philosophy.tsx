"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <div ref={containerRef} className="bg-black text-white space-y-0">
      
      {/* SECTION 5: FOUNDER'S NOTE */}
      <section className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Eyebrow and heading */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              SECTION 5 — FOUNDER&apos;S NOTE
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
              A Note from the Founder
            </h2>
          </div>

          {/* Quote & details */}
          <div ref={quoteRef} className="lg:col-span-8 space-y-12">
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-8xl font-serif text-primary/10 select-none">
                &ldquo;
              </span>
              <p className="text-2xl md:text-4xl font-serif text-white/95 leading-relaxed relative z-10 italic animate-reveal-up">
                Exceptional hospitality is created through operational excellence, financial discipline, continuous innovation, and a consistent commitment to the guest experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/10">
              <div className="md:col-span-7 space-y-4 text-sm text-white/60 leading-relaxed font-sans">
                <p>
                  Manav Chandak is a third generation hospitality entrepreneur, associated with the Panchavati Group of Hotels, Motels and Restaurants, a family business established in 1983.
                </p>
                <p>
                  He holds a Master&apos;s degree in Global Family Managed Business from SP Jain School of Global Management, with specialisation in business strategy, entrepreneurship and succession planning. He has over a decade of experience in hotel and restaurant operations, branding and digital marketing.
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span className="block text-base font-serif text-primary">
                    Manav Chandak
                  </span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-white/40 mt-1">
                    Founder, THEDCO
                  </span>
                </div>
                <Link
                  href="/about"
                  className="inline-block text-xs uppercase tracking-[0.25em] text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300 w-fit"
                >
                  Read Founder&apos;s Full Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section ref={testimonialRef} className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              SECTION 6 — TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-center space-y-8 relative">
            <span className="absolute -top-12 -left-6 text-9xl font-serif text-primary/10 select-none">
              &ldquo;
            </span>
            <p className="text-2xl md:text-3xl font-serif text-white/80 leading-relaxed italic relative z-10 max-w-3xl">
              THEDCO helped us structure our restaurant operations, recruit the team and prepare the systems required for opening. Their practical involvement made the launch process much more organised.
            </p>
            <div className="w-12 h-px bg-primary/45" />
          </div>
        </div>
      </section>

    </div>
  );
}
