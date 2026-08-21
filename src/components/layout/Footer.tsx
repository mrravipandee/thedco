import React from "react";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif tracking-widest">THE DCO</h3>
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Hospitality Advisory
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary">Location</h4>
            <p className="text-xs uppercase tracking-[0.15em] text-white/60 leading-relaxed">
              Based in Maharashtra.
              <br />
              Advising hospitality businesses across India.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-primary">
              Inquiries
            </h4>

            <p className="text-xs tracking-[0.15em] text-white/60 mb-2">
              hello@thedco.in
            </p>

            <p className="text-xs tracking-[0.15em] text-white/60 mb-2">
              +91 86004 11200
            </p>

            <Link
              href="/contact"
              className="inline-block text-xs uppercase tracking-[0.25em] text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300 w-fit"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <Divider className="mb-8" gold={true} />

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40 space-y-4 md:space-y-0">
          <span>&copy; {new Date().getFullYear()} THE DCO. All rights reserved.</span>
          <span>Designed & Engineered for Luxury</span>
        </div>
      </div>
    </footer>
  );
}
