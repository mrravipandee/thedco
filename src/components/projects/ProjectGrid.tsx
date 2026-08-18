import React from "react";
import { Project } from "@/types/project";

export interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return <div>ProjectGrid: {projects.length} projects</div>;
}
