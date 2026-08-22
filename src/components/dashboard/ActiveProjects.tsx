"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mockProjects, ProjectItem } from "@/data/dashboard";

export function ActiveProjects() {
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

  const renderStatusColor = (status: ProjectItem["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "text-primary/90";
      case "IN PROGRESS":
        return "text-white/70";
      case "PLANNING":
        return "text-white/40";
      default:
        return "text-white/55";
    }
  };

  return (
    <div className="bg-[#050505] border border-white/5 p-6 rounded-xs space-y-6 select-none">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-serif font-medium tracking-wider text-white">
          Active Projects
        </h3>
        <Link
          href="/dashboard/projects"
          className="text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-primary transition-colors flex items-center gap-1"
        >
          <span>View all</span>
          <ArrowRight size={10} />
        </Link>
      </div>

      {/* Row list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="divide-y divide-white/5"
      >
        {mockProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="flex items-center gap-4 py-3.5 group cursor-pointer px-2 -mx-2 hover:bg-white/2 rounded-xs transition-colors duration-300"
          >
            {/* Number Index */}
            <span className="text-[11px] font-serif text-white/30 tracking-wider w-5">
              {project.index}
            </span>

            {/* Middle Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-sans font-medium text-white tracking-wide truncate">
                {project.name}
              </h4>
              <span className="text-[10px] text-white/40 font-sans tracking-wide">
                {project.category}
              </span>
            </div>

            {/* Status and Action */}
            <div className="flex items-center gap-4">
              <span
                className={`text-[9px] uppercase tracking-[0.15em] font-sans font-semibold ${renderStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
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
