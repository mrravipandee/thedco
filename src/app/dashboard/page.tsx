"use client";

import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentInquiries } from "@/components/dashboard/RecentInquiries";
import { ActiveProjects } from "@/components/dashboard/ActiveProjects";
import { BusinessOverview } from "@/components/dashboard/BusinessOverview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { mockStats } from "@/data/dashboard";

export default function DashboardOverviewPage() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0.05 : 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="space-y-8 pb-12"
    >
      {/* 1. Header Section */}
      <DashboardHeader />

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {mockStats.map((stat, idx) => (
          <StatCard
            key={stat.id}
            index={idx}
            label={stat.label}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>

      {/* 3. Middle Section: Recent Inquiries & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentInquiries />
        <ActiveProjects />
      </div>

      {/* 4. Lower Section: Business Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BusinessOverview />
        <RecentActivity />
      </div>
    </motion.div>
  );
}

