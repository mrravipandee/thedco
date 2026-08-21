import React from "react";
import type { Metadata } from "next";
import { getProjects } from "@/lib/services/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Project as ProjectType } from "@/types/project";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { constructMetadata } from "@/config/seo";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = constructMetadata({
  title: "Case Studies & Portfolio | THEDCO",
  description:
    "Explore our premium hospitality advisory projects, hotel launch case studies, restaurant operations turnaround, and branding transformations across India.",
});

export default async function ProjectsPage() {
  let projects: ProjectType[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects at render-time:", error);
  }

  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        
        {/* Projects Hero Section */}
        <section className="relative pt-48 pb-16 border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 space-y-6">
                <Reveal>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">
                    PORTFOLIO
                  </span>
                </Reveal>

                <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight flex flex-col">
                  <TextReveal text="Our Case Studies" delay={0.2} />
                </h1>

                <LineReveal className="bg-primary max-w-[200px]" delay={0.4} />
              </div>

              <div className="lg:col-span-4 lg:pt-12">
                <Reveal delay={0.5}>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    A selection of hotel launches, restaurant turnaround plans, branding developments, and operating systems we have delivered for advisory clients.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Listing Grid */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {projects.length === 0 ? (
              <Reveal>
                <div className="border border-white/10 rounded-lg p-12 text-center bg-white/[0.02]">
                  <p className="text-sm text-white/40 tracking-wide font-sans leading-relaxed">
                    No case studies published yet. Check back soon for hotel and restaurant project reviews.
                  </p>
                </div>
              </Reveal>
            ) : (
              <ProjectGrid projects={projects} />
            )}
          </div>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  );
}
