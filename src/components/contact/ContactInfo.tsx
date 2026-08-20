"use client";

import React from "react";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/animations/Reveal";

export function ContactInfo() {
  // Verified client information
  const email = "advisory@thedco.com";
  const location = "Based in Maharashtra. Advising hospitality businesses across India.";
  const hours = "By Appointment Only";

  // Optional fields: only rendered if verified info is provided (non-placeholder)
  const phone: string = ""; // Add verified client phone here when available
  const whatsapp: string = ""; // Add verified client WhatsApp here when available

  return (
    <section className="bg-black text-white py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.35em] text-primary block font-semibold mb-12">
            GET IN TOUCH
          </span>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Email Block */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                EMAIL
              </span>
              <Divider className="w-12 bg-primary/40" />
              <a
                href={`mailto:${email}`}
                className="text-lg md:text-2xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
              >
                {email}
              </a>
            </div>
          </Reveal>

          {/* Location Block */}
          <Reveal delay={0.2}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                LOCATION
              </span>
              <Divider className="w-12 bg-primary/40" />
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-medium">
                {location}
              </p>
            </div>
          </Reveal>

          {/* Hours Block */}
          <Reveal delay={0.3}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                BUSINESS HOURS
              </span>
              <Divider className="w-12 bg-primary/40" />
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-medium">
                {hours}
              </p>
            </div>
          </Reveal>

          {/* Conditionally Render Phone Block if verified info exists */}
          {phone && (
            <Reveal delay={0.4}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                  PHONE
                </span>
                <Divider className="w-12 bg-primary/40" />
                <a
                  href={`tel:${phone}`}
                  className="text-lg md:text-2xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
                >
                  {phone}
                </a>
              </div>
            </Reveal>
          )}

          {/* Conditionally Render WhatsApp Block if verified info exists */}
          {whatsapp && (
            <Reveal delay={0.5}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block">
                  WHATSAPP
                </span>
                <Divider className="w-12 bg-primary/40" />
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-2xl font-serif text-white hover:text-primary transition-colors duration-300 block py-1"
                >
                  {whatsapp}
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
