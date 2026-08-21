"use client";

import React from "react";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/motion/Reveal";

export function ContactInfo() {
  // Verified client information
  const email = "hello@thedco.in";
  const location = "Based in Maharashtra. Advising hospitality businesses across India.";
  const hours = "By Appointment Only";

  // Optional fields: only rendered if verified info is provided
  const phone: string = ""; 
  const whatsapp: string = ""; 

  const categories = [
    "New Hospitality Projects",
    "Existing Businesses Requiring Improvement",
    "Hotel Projects",
    "Restaurant Projects",
    "Resorts",
    "Hospitality Investments",
    "Operations Improvement",
    "Profitability Improvement",
    "Branding & Marketing Support",
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
            GET IN TOUCH
          </span>
        </Reveal>

        <div className="space-y-8">
          {/* Email Block */}
          <Reveal delay={0.1}>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block font-sans">
                EMAIL
              </span>
              <Divider className="w-12 bg-primary/40" />
              <a
                href={`mailto:${email}`}
                className="text-lg md:text-xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
              >
                {email}
              </a>
            </div>
          </Reveal>

          {/* Location Block */}
          <Reveal delay={0.2}>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block font-sans">
                LOCATION
              </span>
              <Divider className="w-12 bg-primary/40" />
              <p className="text-sm text-white/80 leading-relaxed font-sans font-medium">
                {location}
              </p>
            </div>
          </Reveal>

          {/* Hours Block */}
          <Reveal delay={0.3}>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block font-sans">
                BUSINESS HOURS
              </span>
              <Divider className="w-12 bg-primary/40" />
              <p className="text-sm text-white/80 leading-relaxed font-sans font-medium">
                {hours}
              </p>
            </div>
          </Reveal>

          {/* Conditionally Render Phone Block */}
          {phone && (
            <Reveal delay={0.4}>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block font-sans">
                  PHONE
                </span>
                <Divider className="w-12 bg-primary/40" />
                <a
                  href={`tel:${phone}`}
                  className="text-lg md:text-xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
                >
                  {phone}
                </a>
              </div>
            </Reveal>
          )}

          {/* Conditionally Render WhatsApp Block */}
          {whatsapp && (
            <Reveal delay={0.5}>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block font-sans">
                  WHATSAPP
                </span>
                <Divider className="w-12 bg-primary/40" />
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
                >
                  {whatsapp}
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <Divider gold={true} className="opacity-45" />

      {/* Areas of Engagement Cloud */}
      <div className="space-y-6">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold">
            AREAS OF ENGAGEMENT
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.15em] bg-white/[0.02] border border-white/5 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-white/80 font-sans">{category}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
