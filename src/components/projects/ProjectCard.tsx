import React from "react";
import { Project } from "@/types/project";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return <div>ProjectCard: {project.title}</div>;
}
