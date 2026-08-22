"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mockInquiries, InquiryItem } from "@/data/dashboard";

export function RecentInquiries() {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.05 : 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const renderStatus = (status: InquiryItem["status"]) => {
    switch (status) {
      case "NEW":
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[9px] uppercase tracking-wider text-white/50">New</span>
          </div>
        );
      case "REVIEW":
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[9px] uppercase tracking-wider text-white/50">Review</span>
          </div>
        );
      case "CONTACTED":
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-[9px] uppercase tracking-wider text-white/30">Contacted</span>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#050505] border border-white/5 p-6 rounded-xs space-y-6 select-none">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-serif font-medium tracking-wider text-white">
          Recent Inquiries
        </h3>
        <Link
          href="/dashboard/inquiries"
          className="text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-primary transition-colors flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight size={10} />
        </Link>
      </div>

      {/* Inquiry Rows */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="divide-y divide-white/5"
      >
        {mockInquiries.map((inq) => (
          <motion.div
            key={inq.id}
            variants={itemVariants}
            className="flex items-center justify-between py-3.5 group cursor-pointer px-2 -mx-2 hover:bg-white/2 rounded-xs transition-colors duration-300"
          >
            {/* Left: Name and Inquiry Detail */}
            <div className="flex flex-col gap-0.5 max-w-[50%]">
              <span className="text-xs font-sans font-medium text-white tracking-wide">
                {inq.name}
              </span>
              <span className="text-[10px] text-white/40 font-sans tracking-wide truncate">
                {inq.type}
              </span>
            </div>

            {/* Right: metadata (time, status icon, click indicator) */}
            <div className="flex items-center gap-4 sm:gap-10">
              <span className="text-[10px] font-sans text-white/40 tracking-wider">
                {inq.timeAgo}
              </span>
              <div className="w-16 flex justify-start">
                {renderStatus(inq.status)}
              </div>
              <ArrowRight
                size={12}
                className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
