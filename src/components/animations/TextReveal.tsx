"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const preferReduced = useReducedMotion();

  useEffect(() => {
    if (preferReduced) return;

    const el = containerRef.current;
    if (!el) return;

    const anim = gsap.fromTo(
      el,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, [delay, preferReduced]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        ref={containerRef}
        className={`inline-block ${className || ""}`}
      >
        {text}
      </span>
    </span>
  );
}
