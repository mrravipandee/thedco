import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/services/projects";
import { constructMetadata } from "@/config/seo";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for build-time static site optimization
export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.warn("Failed to generate static params at build-time:", error);
    return [];
  }
}

// Generate page-specific metadata dynamically
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);

    if (!project) {
      return constructMetadata({
        title: "Project Not Found",
        description: "The requested project details could not be found.",
      });
    }

    return constructMetadata({
      title: project.title,
      description: project.description,
      image: project.coverImage,
    });
  } catch (error) {
    console.error("Failed to fetch metadata for project:", error);
    return constructMetadata({
      title: "Project details",
      description: "Explore our premium hospitality advisory projects.",
    });
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  let project = null;

  try {
    project = await getProjectBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch project details at render-time:", error);
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">{project.category}</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end space-y-2 text-sm text-white/50">
            <div>
              <span className="uppercase tracking-wider font-semibold text-white/70">Location:</span> {project.location}
            </div>
            <div>
              <span className="uppercase tracking-wider font-semibold text-white/70">Year:</span> {project.year}
            </div>
          </div>
        </div>

        {/* Description & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Services Delivered</h3>
            <ul className="space-y-2 text-sm text-white/60">
              {project.services.map((srv) => (
                <li key={srv} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="pt-8">
            <ProjectGallery images={project.gallery} />
          </div>
        )}
      </div>
    </main>
  );
}
