import React from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";

export interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16" staggerDelay={0.1}>
      {projects.map((project) => (
        <Reveal key={project._id || project.slug} className="w-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </Stagger>
  );
}
