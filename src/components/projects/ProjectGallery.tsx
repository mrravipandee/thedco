"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";

export interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const preferReduced = useReducedMotion();

  // Escape key handler to close lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="space-y-8">
      <Reveal>
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Project Gallery</h3>
      </Reveal>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Reveal key={image} delay={index * 0.1} className="w-full">
            <div
              onClick={() => setSelectedImage(image)}
              className="relative aspect-[4/3] w-full overflow-hidden border border-white/5 bg-white/[0.02] cursor-pointer group"
            >
              <motion.div
                whileHover={preferReduced ? {} : { scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative w-full h-full"
              >
                <Image
                  src={image}
                  alt={`Project Gallery Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* Close button indicator */}
            <div className="absolute top-6 right-6 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
              Close [Esc]
            </div>

            <motion.div
              initial={{ scale: preferReduced ? 1 : 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: preferReduced ? 1 : 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected Project Gallery Image"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
