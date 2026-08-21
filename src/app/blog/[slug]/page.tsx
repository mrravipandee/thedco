import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/services/blogs";
import { constructMetadata } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import Link from "next/link";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600; // Revalidate hourly

// Generate static params for static site generation at build time
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.warn("Failed to generate static params for blogs:", error);
    return [];
  }
}

// Generate dynamic metadata
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    if (!blog) {
      return constructMetadata({
        title: "Article Not Found",
        description: "The requested article details could not be found.",
      });
    }

    return constructMetadata({
      title: `${blog.title} | THEDCO Insights`,
      description: blog.excerpt,
      image: blog.coverImage.url,
    });
  } catch (error) {
    console.error("Failed to generate blog metadata:", error);
    return constructMetadata({
      title: "Insights Article | THEDCO",
      description: "Read premium hospitality advisory articles.",
    });
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  let blog = null;

  try {
    blog = await getBlogBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch blog details:", error);
  }

  if (!blog) {
    notFound();
  }

  // Custom lightweight markdown renderer to prevent hydration/formatting bugs
  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-3xl md:text-5xl font-serif text-white mt-12 mb-6 font-bold leading-tight uppercase">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-serif text-white mt-8 mb-4 font-semibold leading-tight uppercase tracking-wider">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="list-disc list-inside text-sm md:text-base text-white/60 leading-relaxed font-sans ml-4 my-2">
            {trimmed.replace("* ", "")}
          </li>
        );
      }
      return (
        <p key={idx} className="text-sm md:text-base text-white/60 leading-relaxed font-sans my-4">
          {line}
        </p>
      );
    });
  };

  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        
        {/* Cover Image banner */}
        <section className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden opacity-85 border-b border-white/5">
          <ImageReveal
            src={blog.coverImage.url}
            alt={blog.coverImage.alt}
            priority={true}
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 z-10" />
        </section>

        {/* Content details */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            
            {/* Header Block */}
            <div className="space-y-6 pb-8 relative">
              <LineReveal className="absolute bottom-0 left-0 bg-white/10 w-full" />
              
              <Reveal>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="uppercase tracking-[0.2em] text-primary font-semibold">
                    {blog.category}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40">{blog.readTime} min read</span>
                </div>
              </Reveal>

              <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                <TextReveal text={blog.title} delay={0.2} />
              </h1>

              <Reveal delay={0.4}>
                <div className="text-xs text-white/50 font-sans tracking-wide">
                  Published by <span className="text-primary font-semibold">{blog.author.name}</span>
                </div>
              </Reveal>
            </div>

            {/* Rendered Body Content */}
            <div className="pt-4">
              <Reveal delay={0.2}>
                <div className="space-y-2">{renderMarkdown(blog.content)}</div>
              </Reveal>
            </div>

            {/* Back to Blog links */}
            <div className="pt-12 relative">
              <LineReveal className="absolute top-0 left-0 bg-white/10 w-full" />
              
              <Reveal delay={0.1} className="flex justify-between items-center pt-8">
                <Link
                  href="/blog"
                  className="text-xs uppercase tracking-[0.2em] text-white/55 hover:text-primary transition-colors cursor-pointer"
                >
                  ← All Articles
                </Link>
                <Link
                  href="/contact"
                  className="text-xs uppercase tracking-[0.2em] text-primary hover:text-white transition-colors cursor-pointer"
                >
                  Request Advisory Consultation →
                </Link>
              </Reveal>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  );
}
