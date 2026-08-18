import React from "react";
import { getProjects } from "@/lib/services/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Project as ProjectType } from "@/types/project";

export const revalidate = 3600; // Revalidate every hour

export default async function ProjectsPage() {
  let projects: ProjectType[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects at render-time:", error);
  }

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">Our Projects</h1>
        </div>
        
        {projects.length === 0 ? (
          <p className="text-sm text-white/50 tracking-wide font-sans">No projects published yet.</p>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </main>
  );
}
