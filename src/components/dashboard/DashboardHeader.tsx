"use client";

import React from "react";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="space-y-6 select-none">
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">
            THEDCO / OVERVIEW
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
            Dashboard
          </h2>
          <p className="text-xs text-white/50 font-sans tracking-wide">
            A concise overview of your hospitality advisory business.
          </p>
        </div>

        {/* Right visual action button */}
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans bg-transparent border border-white/10 text-white hover:border-primary hover:text-primary transition-all duration-350 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-xs"
          >
            <Plus size={12} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Greeting card / banner section */}
      <div className="space-y-2 pt-2">
        <h3 className="text-[10px] uppercase tracking-[0.25em] text-white/80 font-sans font-medium">
          GOOD EVENING, ADMIN
        </h3>
        <p className="text-xs text-white/40 font-sans tracking-wide">
          Here&apos;s what&apos;s happening across THEDCO.
        </p>
        {/* Subtle gold line detail */}
        <div className="w-6 h-[1.5px] bg-primary mt-3" />
      </div>
    </div>
  );
}
