"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUiStore } from "@/store/ui.store";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMenuOpen, toggleMenu } = useUiStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-serif tracking-widest text-white group">
          THE DCO
          <span className="block h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-primary transition-colors duration-300 relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.25em] bg-transparent border border-primary/40 text-primary hover:bg-primary hover:text-black px-6 py-2.5 transition-all duration-300"
          >
            Consultation
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="md:hidden text-white/80 hover:text-primary transition-colors z-50 relative"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
