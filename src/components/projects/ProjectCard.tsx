"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const preferReduced = useReducedMotion();

  return (
    <Link href={`/projects/${project.slug}`} className="group block space-y-4">
      {/* Cover Image Wrapper */}
      <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/5 bg-white/[0.02]">
        <motion.div
          whileHover={preferReduced ? {} : { scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-full h-full"
        >
          <Image
            src={project.coverImage || "/images/hero/hotel-lobby.jpg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
        </motion.div>
        
        {/* Year Tag absolute placement */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white/70">
          {project.year}
        </div>
      </div>

      {/* Meta Content */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-[0.2em] text-primary font-semibold">
            {project.category}
          </span>
          <span className="text-white/40 tracking-wider">
            {project.location}
          </span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-primary transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        
        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-sans font-light">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
