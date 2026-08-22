"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Image as ImageIcon, Eye, Save, Globe, Plus, Trash2 } from "lucide-react";
import { CaseStudy, CaseStudyStatus, CaseStudyMetric } from "@/data/case-studies";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CaseStudyPreview } from "./CaseStudyPreview";

interface CaseStudyEditorProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (caseStudy: CaseStudy) => void;
}

export function CaseStudyEditor({ caseStudy, isOpen, onClose, onSave }: CaseStudyEditorProps) {
  const prefersReduced = useReducedMotion();
  const editorRef = useRef<HTMLDivElement>(null);

  // Form local state fields
  const [title, setTitle] = useState(caseStudy?.title || "");
  const [slug, setSlug] = useState(caseStudy?.slug || "");
  const [shortDescription, setShortDescription] = useState(caseStudy?.shortDescription || "");
  const [sector, setSector] = useState(caseStudy?.sector || "Hotel");
  const [location, setLocation] = useState(caseStudy?.location || "");
  const [client, setClient] = useState(caseStudy?.client || "");
  const [challenge, setChallenge] = useState(caseStudy?.challenge || "");
  const [approach, setApproach] = useState(caseStudy?.approach || "");
  const [implementation, setImplementation] = useState(caseStudy?.implementation || "");
  const [outcome, setOutcome] = useState(caseStudy?.outcome || "");
  const [metrics, setMetrics] = useState<CaseStudyMetric[]>(caseStudy?.metrics || []);
  const [status] = useState<CaseStudyStatus>(caseStudy?.status || "draft");

  // Nested preview overlay state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Keyboard Escape listener and page scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Metrics collection list adjustments
  const handleAddMetric = () => {
    if (metrics.length >= 4) return;
    setMetrics([...metrics, { label: "", value: "", description: "" }]);
  };

  const handleUpdateMetric = (index: number, field: keyof CaseStudyMetric, value: string) => {
    const updated = [...metrics];
    updated[index] = { ...updated[index], [field]: value };
    setMetrics(updated);
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, idx) => idx !== index));
  };

  const handleSave = (finalStatus: CaseStudyStatus) => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const updatedCaseStudy: CaseStudy = {
      id: caseStudy?.id || `cs-${Date.now()}`,
      title,
      slug,
      shortDescription,
      sector,
      location,
      client,
      status: finalStatus,
      challenge,
      approach,
      implementation,
      outcome,
      metrics: metrics.filter(m => m.label.trim() !== "" || m.value.trim() !== ""),
      publishedAt: finalStatus === "published" ? (caseStudy?.publishedAt || today) : null,
      updatedAt: today,
    };

    onSave(updatedCaseStudy);
  };

  // Generate preview data object matching current states
  const previewCaseStudy: CaseStudy = {
    id: caseStudy?.id || "temp-cs-id",
    title: title || "Untitled Case Study",
    slug,
    shortDescription,
    sector,
    location: location || "India",
    client: client || "Client Name",
    status,
    challenge,
    approach,
    implementation,
    outcome,
    metrics: metrics.filter(m => m.label.trim() !== "" || m.value.trim() !== ""),
    publishedAt: status === "published" ? (caseStudy?.publishedAt || "22 Aug 2026") : null,
    updatedAt: "22 Aug 2026",
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
              aria-label={caseStudy ? "Edit Case Study" : "New Case Study"}
              className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-[#050505] border border-white/5 md:border-white/10 shadow-2xl flex flex-col focus:outline-none overflow-hidden"
            >
              {/* Header block */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-sans block">
                    CASE STUDY MANAGER
                  </span>
                  <h3 className="text-sm font-serif font-medium tracking-wider text-white">
                    {caseStudy ? "Edit Strategic Case Study" : "Create New Case Study"}
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

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Row Grid: Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Project Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Panchavati Hospitality Operations..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Slug</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="panchavati-operations"
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white/50 placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Short Description</label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Provide a concise one-sentence description summarizing the case study project..."
                    className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 resize-none transition-all"
                  />
                </div>

                {/* Grid Row: Sector, Location, Client Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Sector</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white/80 outline-none cursor-pointer focus:border-primary/30 transition-all"
                    >
                      <option value="Hotel">Hotel</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Resort">Resort</option>
                      <option value="Café / QSR">Café / QSR</option>
                      <option value="Hospitality Investment">Hospitality Investment</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Client / Business Name</label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="Panchavati Group"
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Structured Textareas: Challenge, Approach, Implementation, Outcome */}
                <div className="space-y-6 border-t border-white/5 pt-6">
                  
                  {/* 1. Challenge */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">The Challenge</label>
                    <textarea
                      rows={3}
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="Describe the operational, financial, branding or strategic challenge..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all font-sans leading-relaxed"
                    />
                  </div>

                  {/* 2. Approach */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">The THEDCO Approach</label>
                    <textarea
                      rows={3}
                      value={approach}
                      onChange={(e) => setApproach(e.target.value)}
                      placeholder="Describe the advisory strategy and intervention..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all font-sans leading-relaxed"
                    />
                  </div>

                  {/* 3. Implementation */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Implementation</label>
                    <textarea
                      rows={3}
                      value={implementation}
                      onChange={(e) => setImplementation(e.target.value)}
                      placeholder="Describe how the strategy was implemented with the client's team..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all font-sans leading-relaxed"
                    />
                  </div>

                  {/* 4. Outcome */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">The Outcome</label>
                    <textarea
                      rows={3}
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      placeholder="Describe the resulting business, operational or financial improvements..."
                      className="w-full px-3 py-2 text-xs font-sans bg-black border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/30 transition-all font-sans leading-relaxed"
                    />
                  </div>

                </div>

                {/* Inline Metrics Editor Builder */}
                <div className="space-y-3 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Key Results Metrics</label>
                    {metrics.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddMetric}
                        className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-primary hover:text-white transition-colors cursor-pointer outline-none"
                      >
                        <Plus size={10} />
                        <span>Add Metric</span>
                      </button>
                    )}
                  </div>

                  {metrics.length === 0 ? (
                    <div className="py-4 text-center border border-dashed border-white/5 rounded-xs text-[10px] text-white/20 font-sans">
                      No metrics added yet. Click &apos;Add Metric&apos; (max 4).
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-black border border-white/5 p-3 rounded-xs relative group/item">
                          
                          {/* Trash button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveMetric(idx)}
                            aria-label={`Remove metric ${idx + 1}`}
                            className="absolute top-2 right-2 sm:static p-1 rounded-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-all outline-none cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          {/* Label input */}
                          <div className="flex-1 space-y-1">
                            <span className="text-[8px] uppercase tracking-wider text-white/30 block font-sans">Label</span>
                            <input
                              type="text"
                              value={metric.label}
                              onChange={(e) => handleUpdateMetric(idx, "label", e.target.value)}
                              placeholder="Operational Cost"
                              className="w-full px-2 py-1.5 text-xs font-sans bg-[#050505] border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/20"
                            />
                          </div>

                          {/* Value input */}
                          <div className="w-full sm:w-28 space-y-1">
                            <span className="text-[8px] uppercase tracking-wider text-white/30 block font-sans">Value</span>
                            <input
                              type="text"
                              value={metric.value}
                              onChange={(e) => handleUpdateMetric(idx, "value", e.target.value)}
                              placeholder="-18%"
                              className="w-full px-2 py-1.5 text-xs font-sans bg-[#050505] border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/20"
                            />
                          </div>

                          {/* Description input */}
                          <div className="flex-[2] space-y-1">
                            <span className="text-[8px] uppercase tracking-wider text-white/30 block font-sans">Description</span>
                            <input
                              type="text"
                              value={metric.description || ""}
                              onChange={(e) => handleUpdateMetric(idx, "description", e.target.value)}
                              placeholder="Improvement after restructuring"
                              className="w-full px-2 py-1.5 text-xs font-sans bg-[#050505] border border-white/5 rounded-xs text-white placeholder-white/20 outline-none focus:border-primary/20"
                            />
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured image uploader mockup */}
                <div className="space-y-1.5 border-t border-white/5 pt-6">
                  <label className="text-[9px] uppercase tracking-wider text-white/40 font-sans font-semibold">Featured Image</label>
                  <div className="flex flex-col items-center justify-center p-8 bg-black border border-dashed border-white/5 rounded-xs hover:border-white/10 transition-colors select-none text-center">
                    <ImageIcon size={24} className="text-white/20 mb-2" />
                    <span className="text-[10px] text-white/50 font-sans tracking-wide">
                      Drag featured image here or click to browse
                    </span>
                    <span className="text-[9px] text-white/20 font-sans mt-0.5">
                      Recommended size: 1600 x 900 pixels
                    </span>
                  </div>
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
      <CaseStudyPreview
        caseStudy={previewCaseStudy}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
}
