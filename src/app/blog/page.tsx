import React from "react";
import type { Metadata } from "next";
import { getBlogs, BlogItem } from "@/lib/services/blogs";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { constructMetadata } from "@/config/seo";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600; // Revalidate hourly

export const metadata: Metadata = constructMetadata({
  title: "Hospitality Advisory Insights & Blog | THEDCO",
  description:
    "Read hospitality strategy insights, restaurant menu engineering cost guides, hotel pre-opening setup plans, and operational audit guides from THEDCO.",
});

export default async function BlogIndexPage() {
  const blogs: BlogItem[] = await getBlogs();

  // Highlight first article as featured if available
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        
        {/* Blog Hero Section */}
        <section className="relative pt-48 pb-16 border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 space-y-6">
                <Reveal>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">
                    INSIGHTS & STRATEGY
                  </span>
                </Reveal>

                <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight flex flex-col">
                  <TextReveal text="Hospitality Advisory Blog" delay={0.2} />
                </h1>

                <LineReveal className="bg-primary max-w-[200px]" delay={0.4} />
              </div>

              <div className="lg:col-span-4 lg:pt-12">
                <Reveal delay={0.5}>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    Practical reports and operational advice covering food costing, resort launching, staff structure planning, and service recovery standards.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Section */}
        {featuredBlog && (
          <section className="py-16 md:py-24 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.2em] text-primary/60 font-semibold mb-6">
                  FEATURED ARTICLE
                </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Featured Image */}
                <div className="lg:col-span-7">
                  <Reveal>
                    <Link href={`/blog/${featuredBlog.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-white/[0.02]">
                      <Image
                        src={featuredBlog.coverImage.url}
                        alt={featuredBlog.coverImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover hover:scale-102 transition-transform duration-700"
                        priority
                      />
                    </Link>
                  </Reveal>
                </div>

                {/* Featured Content */}
                <div className="lg:col-span-5 space-y-6">
                  <Reveal delay={0.2}>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="uppercase tracking-[0.2em] text-primary font-semibold">
                        {featuredBlog.category}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/40">{featuredBlog.readTime} min read</span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.3}>
                    <h2 className="text-2xl md:text-4xl font-serif text-white hover:text-primary transition-colors duration-300 leading-tight">
                      <Link href={`/blog/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
                    </h2>
                  </Reveal>

                  <Reveal delay={0.4}>
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
                      {featuredBlog.excerpt}
                    </p>
                  </Reveal>

                  <Reveal delay={0.5}>
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-block text-xs uppercase tracking-[0.2em] text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300"
                    >
                      Read Complete Article
                    </Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Grid */}
        {remainingBlogs.length > 0 && (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" staggerDelay={0.1}>
                {remainingBlogs.map((blog) => (
                  <Reveal key={blog.slug} className="w-full">
                    <Link href={`/blog/${blog.slug}`} className="group block space-y-4">
                      {/* Card Cover Image */}
                      <div className="relative aspect-[3/2] w-full overflow-hidden border border-white/5 bg-white/[0.02]">
                        <Image
                          src={blog.coverImage.url}
                          alt={blog.coverImage.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-700"
                        />
                      </div>

                      {/* Meta */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="uppercase tracking-[0.2em] text-primary font-semibold">
                            {blog.category}
                          </span>
                          <span className="text-white/40">
                            {blog.readTime} min read
                          </span>
                        </div>

                        <h3 className="text-lg md:text-xl font-serif text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-sans">
                          {blog.excerpt}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </Stagger>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </SmoothScroll>
  );
}
