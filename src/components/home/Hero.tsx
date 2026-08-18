"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const preferReduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (preferReduced) {
        gsap.set([brandRef.current, eyebrowRef.current, h1Ref.current, descRef.current, ctasRef.current, locationRef.current, scrollIndicatorRef.current], { opacity: 1 });
        gsap.set(dividerRef.current, { width: "100%" });
        gsap.set(imageRef.current, { scale: 1 });
        return;
      }

      gsap.set([brandRef.current, eyebrowRef.current, descRef.current, ctasRef.current, locationRef.current, scrollIndicatorRef.current], { opacity: 0 });
      gsap.set(dividerRef.current, { width: "0%" });
      gsap.set(imageRef.current, { scale: 1.08 });

      const h1 = h1Ref.current;
      if (h1) {
        const text = h1.innerText;
        h1.innerHTML = text
          .split(". ")
          .map((line) => `<span class="line-wrap" style="display: block; overflow: hidden;"><span class="line-content" style="display: block; transform: translateY(100%); opacity: 0;">${line}${line.endsWith(".") ? "" : "."}</span></span>`)
          .join("");
      }

      const tl = gsap.timeline();

      tl.to(brandRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" })
        .to(dividerRef.current, { width: "100%", duration: 1.5, ease: "power4.inOut" }, "-=0.6")
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(".line-content", { y: "0%", opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=0.6")
        .to(descRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(ctasRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .to(imageRef.current, { scale: 1, duration: 2.5, ease: "power3.out" }, "0")
        .to(locationRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.6")
        .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-between bg-black text-white pt-32 pb-12 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src="/images/hero/hotel-lobby.jpg"
            alt="THE DCO Luxury Hotel Lobby"
            fill
            sizes="100vw"
            className="object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center">
        <div className="max-w-4xl space-y-8">
          {/* Brand/Eyebrow Section */}
          <div className="space-y-4">
            <div ref={brandRef} className="text-sm font-serif tracking-widest text-primary">
              THE DCO
            </div>
            <div ref={dividerRef} className="h-px bg-primary/45 w-0" />
            <div ref={eyebrowRef} className="text-xs uppercase tracking-[0.3em] text-white/60">
              HOSPITALITY ADVISORY
            </div>
          </div>

          {/* Heading */}
          <h1 ref={h1Ref} className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.15] text-white tracking-tight">
            Building Better Hotels. Creating Profitable Restaurants.
          </h1>

          {/* Supporting Text */}
          <p ref={descRef} className="text-base md:text-lg text-white/70 max-w-2xl font-sans leading-relaxed">
            THEDCO is a hospitality advisory firm serving hotels, restaurants, cafés, resorts, banquets and food service businesses. We support the full business cycle from concept development and launch to operations, marketing and profitable growth.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="text-xs uppercase tracking-[0.25em] bg-primary text-black font-semibold hover:bg-white hover:text-black px-8 py-4 transition-all duration-300 text-center"
            >
              Book a Consultation
            </Link>
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.25em] border border-white/20 text-white hover:border-primary hover:text-primary px-8 py-4 transition-all duration-300 text-center"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info / Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-white/50 text-xs">
        <div ref={locationRef} className="uppercase tracking-[0.2em] leading-relaxed">
          Based in Maharashtra.
          <br />
          Advising hospitality businesses across India.
        </div>
        <div ref={scrollIndicatorRef} className="flex items-center space-x-3 uppercase tracking-[0.25em] text-[10px]">
          <span>Scroll Down</span>
          <span className="block w-1.5 h-1.5 bg-primary animate-ping rounded-full" />
        </div>
      </div>
    </section>
  );
}
