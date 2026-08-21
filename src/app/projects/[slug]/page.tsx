import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/services/projects";
import { constructMetadata } from "@/config/seo";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

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
      title: `${project.title} | THEDCO`,
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
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        
        {/* Banner Cover Image */}
        <section className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden opacity-80 border-b border-white/5">
          <ImageReveal
            src={project.coverImage || "/images/hero/hotel-lobby.jpg"}
            alt={project.title}
            priority={true}
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 z-10" />
        </section>

        {/* Project Content */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            
            {/* Editorial Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 relative">
              <LineReveal className="absolute bottom-0 left-0 bg-white/10 w-full" />
              
              <div className="lg:col-span-8 space-y-4">
                <Reveal>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">{project.category}</span>
                </Reveal>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
                  <TextReveal text={project.title} delay={0.2} />
                </h1>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end space-y-2 text-sm text-white/50 pt-4 lg:pt-0">
                <Reveal delay={0.3} className="flex justify-between md:justify-start md:space-x-4 border-b lg:border-none border-white/5 pb-2 lg:pb-0">
                  <span className="uppercase tracking-wider font-semibold text-white/70">Location:</span> 
                  <span>{project.location}</span>
                </Reveal>
                <Reveal delay={0.4} className="flex justify-between md:justify-start md:space-x-4 pb-2 lg:pb-0">
                  <span className="uppercase tracking-wider font-semibold text-white/70">Year:</span> 
                  <span>{project.year}</span>
                </Reveal>
              </div>
            </div>

            {/* Description & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
              <div className="lg:col-span-8">
                <Reveal delay={0.2}>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </Reveal>
              </div>
              
              <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-white/5 lg:pl-10">
                <Reveal delay={0.3}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Services Delivered</h3>
                </Reveal>
                
                <ul className="space-y-3 text-sm text-white/60 font-sans">
                  {project.services.map((srv, index) => (
                    <Reveal key={srv} delay={0.4 + index * 0.05} className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      <span>{srv}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="pt-12 border-t border-white/5">
                <ProjectGallery images={project.gallery} />
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  );
}
