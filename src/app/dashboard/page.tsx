import React from "react";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="border border-white/5 bg-[#050505] p-8 md:p-12 rounded-sm max-w-4xl">
        <h2 className="text-2xl font-serif text-white mb-4 tracking-wide">
          Welcome to the THEDCO Workspace
        </h2>
        <p className="text-sm text-white/50 font-sans leading-relaxed max-w-2xl">
          This admin console serves as the core hub for THEDCO&apos;s hospitality advisory systems.
          Use the sidebar navigation to manage business inquiries, clients, projects, services, 
          and content areas.
        </p>
      </div>
    </div>
  );
}
