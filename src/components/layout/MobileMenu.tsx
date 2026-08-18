"use client";

import React from "react";
import Link from "next/link";
import { useUiStore } from "@/store/ui.store";
import { navItems } from "@/data/navigation";
import { AnimatePresence, motion } from "motion/react";

export function MobileMenu() {
  const { isMenuOpen, closeMenu } = useUiStore();

  const menuVariants = {
    initial: {
      clipPath: "inset(0% 0% 100% 0%)",
    },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const navLinksVariants = {
    initial: { opacity: 0, y: 30 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 bg-black z-45 flex flex-col justify-center px-8 md:px-16"
        >
          <div className="flex flex-col space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-primary/50">
              Hospitality Advisory
            </span>
            <nav className="flex flex-col space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  custom={idx}
                  variants={navLinksVariants}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="text-4xl md:text-6xl font-serif text-white hover:text-primary transition-colors duration-300 block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-12 left-8 right-8 flex flex-col md:flex-row justify-between text-xs text-white/40 uppercase tracking-[0.2em] space-y-4 md:space-y-0">
            <span>Based in Maharashtra, India</span>
            <span>advisory@thedco.com</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
