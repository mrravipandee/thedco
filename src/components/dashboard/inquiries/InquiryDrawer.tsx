"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Mail, Phone, CheckSquare } from "lucide-react";
import { Inquiry, InquiryStatus } from "@/data/inquiries";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface InquiryDrawerProps {
  inquiry: Inquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: InquiryStatus) => void;
}

export function InquiryDrawer({
  inquiry,
  isOpen,
  onClose,
  onStatusUpdate,
}: InquiryDrawerProps) {
  const prefersReduced = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Esc key closure and body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Motion transitions
  const backdropVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.05 : 0.35,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReduced ? 0.05 : 0.3,
        ease: "easeIn" as const,
      },
    },
  };

  const drawerVariants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: {
        duration: prefersReduced ? 0.05 : 0.4,
        ease: [0.16, 1, 0.3, 1] as const, // Custom cubic-bezier matching easeOut
      },
    },
    exit: {
      x: "100%",
      transition: {
        duration: prefersReduced ? 0.05 : 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const renderStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-semibold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            New
          </span>
        );
      case "in-review":
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-semibold text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            In Review
          </span>
        );
      case "contacted":
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-semibold text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            Contacted
          </span>
        );
      case "closed":
        return (
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-semibold text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            Closed
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && inquiry && (
        <div className="fixed inset-0 z-50 flex justify-end" role="none">
          {/* Backdrop dimming */}
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.div
            ref={drawerRef}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Inquiry Details Panel"
            className="fixed top-0 bottom-0 right-0 w-full sm:max-w-md md:w-[460px] bg-[#050505] border-l border-white/5 shadow-2xl flex flex-col focus:outline-none z-55 select-none"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-sans block">
                  INQUIRY DETAILS
                </span>
                <h3 className="text-sm font-serif font-medium tracking-wider text-white">
                  Consultation Request
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close details panel"
                className="p-1.5 rounded-sm border border-white/5 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content areas */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-white/5">
              
              {/* Profile Card and Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-[12px] font-sans font-medium text-white">
                    {inquiry.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  {renderStatusBadge(inquiry.status)}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-sans font-medium text-white tracking-wide">
                    {inquiry.name}
                  </h4>
                  <span className="text-xs text-white/40 font-sans block">
                    {inquiry.email}
                  </span>
                  <span className="text-xs text-white/40 font-sans block">
                    {inquiry.phone}
                  </span>
                </div>
              </div>

              {/* Company / Business */}
              <div className="space-y-2 pt-5">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-sans block font-semibold">
                  BUSINESS / COMPANY
                </span>
                <p className="text-xs font-sans text-white/80 leading-normal">
                  {inquiry.company}
                </p>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2 pt-5">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-sans block font-semibold">
                  INQUIRY TYPE
                </span>
                <p className="text-xs font-sans text-white/80 leading-normal">
                  {inquiry.type}
                </p>
              </div>

              {/* Inquiry message */}
              <div className="space-y-2 pt-5">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-sans block font-semibold">
                  MESSAGE
                </span>
                <p className="text-xs font-sans text-white/60 leading-relaxed max-w-sm whitespace-pre-line">
                  {inquiry.message}
                </p>
              </div>

              {/* Date submitted */}
              <div className="space-y-2 pt-5">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/40 font-sans block font-semibold">
                  SUBMITTED
                </span>
                <p className="text-xs font-sans text-white/50 leading-normal">
                  {inquiry.date} at {inquiry.time}
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-4 bg-[#0A0A0A] border-t border-white/5 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${inquiry.email}?subject=THEDCO Hospitality Consultation`}
                  className="flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-wider font-sans bg-transparent border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
                >
                  <Mail size={12} className="text-white/40" />
                  <span>Email</span>
                </a>
                <a
                  href={`tel:${inquiry.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-wider font-sans bg-transparent border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
                >
                  <Phone size={12} className="text-white/40" />
                  <span>Call</span>
                </a>
              </div>
              
              {inquiry.status !== "contacted" && inquiry.status !== "closed" && (
                <button
                  type="button"
                  onClick={() => onStatusUpdate(inquiry.id, "contacted")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-[10px] uppercase tracking-widest font-sans font-semibold bg-primary text-black hover:bg-white hover:text-black transition-colors rounded-xs outline-none focus-visible:ring-1 focus-visible:ring-primary/50 cursor-pointer"
                >
                  <CheckSquare size={12} />
                  <span>Mark as Contacted</span>
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
