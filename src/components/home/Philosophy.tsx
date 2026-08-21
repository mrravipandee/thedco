"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function Philosophy() {
  const preferReduced = useReducedMotion();

  return (
    <div className="bg-black text-white space-y-0">
      
      {/* SECTION 5: FOUNDER'S NOTE */}
      <section className="py-32 border-b border-white/5 relative overflow-hidden">
        {/* Subtle large background branding */}
        <div className="absolute right-[-2%] bottom-[-5%] select-none pointer-events-none font-serif text-[15vw] leading-none text-white/[0.01] z-0 font-bold">
          THEDCO
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          {/* Eyebrow and heading */}
          <div className="lg:col-span-4">
            <Reveal className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                SECTION 5 — FOUNDER&apos;S NOTE
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
                A Note from the Founder
              </h2>
            </Reveal>
          </div>

          {/* Quote & details */}
          <div className="lg:col-span-8 space-y-12">
            <Reveal className="relative" delay={0.1}>
              <span className="absolute -top-10 -left-6 text-8xl font-serif text-primary/10 select-none">
                &ldquo;
              </span>
              <p className="text-2xl md:text-4xl font-serif text-white/95 leading-relaxed relative z-10 italic">
                Exceptional hospitality is created through operational excellence, financial discipline, continuous innovation, and a consistent commitment to the guest experience.
              </p>
            </Reveal>

            {/* Split layout block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 relative">
              <LineReveal className="absolute top-0 left-0 bg-white/10 w-full" delay={0.2} />
              
              <div className="md:col-span-7 pt-4">
                <Reveal delay={0.3} className="space-y-4 text-sm text-white/60 leading-relaxed font-sans">
                  <p>
                    Manav Chandak is a third generation hospitality entrepreneur, associated with the Panchavati Group of Hotels, Motels and Restaurants, a family business established in 1983.
                  </p>
                  <p>
                    He holds a Master&apos;s degree in Global Family Managed Business from SP Jain School of Global Management, with specialisation in business strategy, entrepreneurship and succession planning. He has over a decade of experience in hotel and restaurant operations, branding and digital marketing.
                  </p>
                </Reveal>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between space-y-6 pt-4">
                <Reveal delay={0.4} className="space-y-2">
                  <span className="block text-base font-serif text-primary">
                    Manav Chandak
                  </span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-white/40">
                    Founder, THEDCO
                  </span>
                </Reveal>
                
                <Reveal delay={0.5}>
                  <motion.div whileHover={preferReduced ? {} : { x: 4 }}>
                    <Link
                      href="/about"
                      className="inline-block text-xs uppercase tracking-[0.25em] text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300 w-fit cursor-pointer"
                    >
                      Read Founder&apos;s Full Profile
                    </Link>
                  </motion.div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-32 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Reveal className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                SECTION 6 — TESTIMONIALS
              </span>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight leading-tight">
                What Our Clients Say
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-center space-y-8 relative">
            <Reveal delay={0.1}>
              <span className="absolute -top-12 -left-6 text-9xl font-serif text-primary/10 select-none">
                &ldquo;
              </span>
              <p className="text-2xl md:text-3xl font-serif text-white/80 leading-relaxed italic relative z-10 max-w-3xl">
                THEDCO helped us structure our restaurant operations, recruit the team and prepare the systems required for opening. Their practical involvement made the launch process much more organised.
              </p>
            </Reveal>
            <LineReveal className="bg-primary/45 w-12" delay={0.3} />
          </div>
        </div>
      </section>

    </div>
  );
}
