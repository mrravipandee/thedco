"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

export function ImageReveal({ src, alt, className, delay = 0 }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      container,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        delay,
        ease: "power4.inOut",
      }
    ).fromTo(
      image,
      { scale: 1.15 },
      {
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, [delay, preferReduced]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
      style={{ clipPath: preferReduced ? "none" : "inset(100% 0% 0% 0%)" }}
    >
      <div ref={imageRef} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
