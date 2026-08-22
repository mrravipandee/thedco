"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Image as ImageIcon, Eye, Save, Globe } from "lucide-react";
import { BlogPost, BlogStatus } from "@/data/blog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BlogPreview } from "./BlogPreview";

interface BlogEditorProps {
  article: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: BlogPost) => void;
}

export function BlogEditor({ article, isOpen, onClose, onSave }: BlogEditorProps) {
  const prefersReduced = useReducedMotion();
  const editorRef = useRef<HTMLDivElement>(null);

  // Form local state fields
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [category, setCategory] = useState(article?.category || "Hospitality");
  const [author, setAuthor] = useState(article?.author || "Admin");
  const [content, setContent] = useState(article?.content || "");
  const [status] = useState<BlogStatus>(article?.status || "draft");
  
  // Nested preview state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Keyboard Escape listener and page scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only close editor if nested preview is NOT open
      if (e.key === "Escape" && !isPreviewOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, isPreviewOpen, onClose]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);
  };

  const handleSave = (finalStatus: BlogStatus) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const updatedArticle: BlogPost = {
      id: article?.id || `blog-${Date.now()}`,
      title,
      slug,
      excerpt,
      category,
      author,
      status: finalStatus,
      publishedAt: finalStatus === "published" ? (article?.publishedAt || today) : null,
      updatedAt: today,
      content,
    };

    onSave(updatedArticle);
  };

  // Build a preview object matching current state values
  const previewBlogPost: BlogPost = {
    id: article?.id || "temp-id",
    title: title || "Untitled Insight",
    slug,
    excerpt,
    category,
    author,
    status,
    publishedAt: status === "published" ? (article?.publishedAt || "22 Aug 2026") : null,
    updatedAt: "22 Aug 2026",
    content: content || "Start writing your article content here...",
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: prefersReduced ? 0.05 : 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: prefersReduced ? 0.05 : 0.25 }
    }
  };

  const modalVariants = {
    closed: { opacity: 0, y: prefersReduced ? 0 : 20, scale: prefersReduced ? 1 : 0.98 },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReduced ? 0.05 : 0.45,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : 15,
      scale: prefersReduced ? 1 : 0.98,
      transition: {
        duration: prefersReduced ? 0.05 : 0.35,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 select-none" role="none">
            {/* Backdrop overlay */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="exit"
              onClick={onClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal CMS Panel */}
            <motion.div
              ref={editorRef}
              variants={modalVariants}
              initial="closed"
              animate="open"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label={article ? "Edit Article" : "New Article"}
              className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl bg-[#050505] border border-white/5 md:border-white/10 shadow-2xl flex flex-col focus:outline-none overflow-hidden"
            >
              {/* Header section */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-sans block">
                    EDITORIAL MANAGER
                  </span>
                  <h3 className="text-sm font-serif font-medium tracking-wider text-white">
                    {article ? "Edit Hospitality Article" : "Write New Insight"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close editor"
                  className="p-1.5 rounded-sm border border-white/5 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form Areas Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Row Grid: Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Hospitality Trends..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Slug</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="hospitality-trends"
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white/50 placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Excerpt panel */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Excerpt</label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Provide a short description summarize of the thought leadership piece..."
                    className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 resize-none transition-all"
                  />
                </div>

                {/* Grid Row: Category & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white/80 outline-none cursor-pointer focus:border-primary/30 transition-all"
                    >
                      <option value="Hospitality">Hospitality</option>
                      <option value="Operations">Operations</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Resort">Resort</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Author</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Manav Chandak"
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Featured image drag/drop simulator */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Featured Image</label>
                  <div className="flex flex-col items-center justify-center p-8 bg-black border border-dashed border-white/5 rounded-xs hover:border-white/10 transition-colors select-none text-center">
                    <ImageIcon size={24} className="text-white/20 mb-2" />
                    <span className="text-[10px] text-white/50 font-sans tracking-wide">
                      Drag image here or click to browse
                    </span>
                    <span className="text-[9px] text-white/20 font-sans mt-0.5">
                      Recommended size: 1200 x 630 pixels
                    </span>
                  </div>
                </div>

                {/* Large Content Field */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Content Body</label>
                  <textarea
                    rows={8}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the full body content for the article..."
                    className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all font-sans leading-relaxed"
                  />
                </div>
              </div>

              {/* Action triggers bottom bar */}
              <div className="p-4 bg-[#0A0A0A] border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 select-none">
                {/* Left: Preview trigger */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-[9px] uppercase tracking-widest font-sans font-semibold border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                  >
                    <Eye size={12} className="text-white/40" />
                    <span>Preview</span>
                  </button>
                </div>

                {/* Right: Cancel, Draft, Publish */}
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-[9px] uppercase tracking-widest font-sans font-semibold border border-transparent text-white/40 hover:text-white transition-colors rounded-xs outline-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave("draft")}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-[9px] uppercase tracking-widest font-sans font-semibold border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                  >
                    <Save size={12} className="text-white/40" />
                    <span>Save Draft</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave("published")}
                    className="flex items-center justify-center gap-1.5 px-5 py-2.5 text-[9px] uppercase tracking-widest font-sans font-semibold bg-primary text-black hover:bg-white hover:text-black transition-colors rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                  >
                    <Globe size={12} />
                    <span>Publish</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Nested Editorial Preview Modal */}
      <BlogPreview
        article={previewBlogPost}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
}
