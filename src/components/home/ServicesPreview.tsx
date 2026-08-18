"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Hotel Advisory",
    description: "Concept planning, positioning, pricing and revenue strategy, front office systems and guest service standards.",
    image: "/images/hero/hotel-lobby.jpg",
  },
  {
    title: "Restaurant Advisory",
    description: "Menu engineering, kitchen planning, food cost control and restaurant profitability.",
    image: "/images/services/fine-dining.jpg",
  },
  {
    title: "Pre-Opening and Launch Advisory",
    description: "Staffing, vendor sourcing, SOP development and opening day execution.",
    image: "/images/general/detail-architecture.jpg",
  },
  {
    title: "Operations Advisory",
    description: "Operational audits, cost control, reporting systems and performance review.",
    image: "/images/hero/hotel-lobby.jpg",
  },
  {
    title: "Staff Recruitment and Training",
    description: "Organisational structure, hiring, departmental training and performance standards.",
    image: "/images/services/fine-dining.jpg",
  },
  {
    title: "SOP and Documentation",
    description: "Checklists, logs, reporting formats and operational documentation.",
    image: "/images/general/detail-architecture.jpg",
  },
  {
    title: "Branding and Marketing",
    description: "Brand positioning, digital presence, campaigns and reputation management.",
    image: "/images/hero/hotel-lobby.jpg",
  },
  {
    title: "Revenue and Profitability Advisory",
    description: "Pricing strategy, margin analysis, revenue growth and ROI planning.",
    image: "/images/services/fine-dining.jpg",
  },
  {
    title: "Banquet, Event and Expansion Advisory",
    description: "Event operations, banquet packages, franchise readiness and expansion planning.",
    image: "/images/general/detail-architecture.jpg",
  },
];

export function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".service-item");
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
    }, containerRef);

    return () => ctx.revert();
  }, [preferReduced]);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Sticky Block (Desktop only) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-[70vh] flex flex-col justify-between space-y-12">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              SECTION 3 — WHAT WE OFFER
            </span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
              What We Offer
            </h2>
            <p className="text-sm text-white/50 leading-relaxed font-sans max-w-md">
              Nine advisory practices delivered under one team, so a client works with a single point of contact across the engagement.
            </p>
          </div>

          {/* Active Image Showcase Slot */}
          <div className="hidden lg:block relative w-full h-[35vh] overflow-hidden border border-white/10">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  activeIndex === idx ? "opacity-60 scale-100" : "opacity-0 scale-105"
                )}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </div>

        {/* Right: Vertical List of Services */}
        <div className="lg:col-span-7 space-y-0">
          {SERVICES.map((service, idx) => {
            const formattedIndex = String(idx + 1).padStart(2, "0");
            const isActive = activeIndex === idx;

            return (
              <div
                key={service.title}
                className={cn(
                  "service-item border-t border-white/10 py-12 transition-all duration-500 flex flex-col space-y-4",
                  isActive ? "text-white opacity-100" : "text-white/40 opacity-40"
                )}
              >
                <div className="flex items-center space-x-6">
                  <span
                    className={cn(
                      "text-xs font-sans tracking-widest transition-colors duration-500",
                      isActive ? "text-primary" : "text-white/30"
                    )}
                  >
                    {formattedIndex}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif uppercase tracking-wide">
                    {service.title}
                  </h3>
                </div>

                <div
                  className={cn(
                    "pl-10 grid transition-all duration-500",
                    isActive ? "grid-rows-[1fr] opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0 overflow-hidden"
                  )}
                >
                  <p className="text-sm text-white/70 leading-relaxed font-sans max-w-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-white/10 pt-12">
            <Link
              href="/services"
              className="inline-block text-xs uppercase tracking-[0.25em] text-primary border border-primary/30 hover:border-primary px-8 py-4 transition-all duration-300"
            >
              View Full Service List
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
