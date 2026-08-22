"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";


interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();

  // Helper to resolve page title and breadcrumb based on route
  const getRouteDetails = () => {
    switch (pathname) {
      case "/dashboard":
        return { title: "Overview", breadcrumb: "THEDCO / Dashboard" };
      case "/dashboard/projects":
        return { title: "Projects", breadcrumb: "Dashboard / Projects" };
      case "/dashboard/clients":
        return { title: "Clients", breadcrumb: "Dashboard / Clients" };
      case "/dashboard/inquiries":
        return { title: "Inquiries", breadcrumb: "Dashboard / Inquiries" };
      case "/dashboard/services":
        return { title: "Services", breadcrumb: "Dashboard / Services" };
      case "/dashboard/blog":
        return { title: "Blog", breadcrumb: "Dashboard / Blog" };
      case "/dashboard/settings":
        return { title: "Settings", breadcrumb: "Dashboard / Settings" };
      default:
        return { title: "Dashboard", breadcrumb: "THEDCO / Dashboard" };
    }
  };

  const { title, breadcrumb } = getRouteDetails();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full h-[72px] bg-black border-b border-white/5 px-4 md:px-8 select-none">
      
      {/* ==========================================
          DESKTOP LAYOUT (visible on md screens up)
         ========================================== */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Left: Title & Breadcrumbs */}
        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-sans mb-0.5">
            {breadcrumb}
          </span>
          <h1 className="text-lg font-serif font-medium tracking-wide text-white">
            {title}
          </h1>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-6">
          {/* Visual Search Shell */}
          <div className="relative group">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40 group-hover:text-white/60 transition-colors">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search..."
              disabled
              className="w-48 xl:w-64 pl-9 pr-4 py-1.5 text-xs font-sans bg-transparent border border-white/5 rounded-sm text-white placeholder-white/30 cursor-not-allowed outline-none select-none transition-all duration-300 focus:border-primary/30"
            />
          </div>

          {/* Notification Button */}
          <button
            type="button"
            aria-label="View notifications"
            className="relative p-1 text-white/50 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-sm"
          >
            <Bell size={16} />
            {/* Subtle Gold Notification Badge */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3 border-l border-white/5 pl-6 py-1.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-white/5 text-[10px] font-sans font-medium text-white select-none">
              AD
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-sans text-white/60 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/50 py-0.5 rounded-sm"
            >
              <span>Admin</span>
              <ChevronDown size={12} className="text-white/40" />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          MOBILE LAYOUT (visible below md screens)
         ========================================== */}
      <div className="flex md:hidden items-center justify-between w-full">
        {/* Left: Mobile Drawer Trigger Toggle */}
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="p-2 -ml-2 text-white/80 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary/50 rounded-sm"
        >
          <Menu size={20} />
        </button>

        {/* Center: Brand Logo */}
        <div className="font-serif tracking-widest text-white text-base select-none">
          THE DCO
        </div>

        {/* Right: Small Avatar Initials */}
        <div className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-white/5 text-[10px] font-sans font-medium text-white select-none">
          AD
        </div>
      </div>

    </header>
  );
}
