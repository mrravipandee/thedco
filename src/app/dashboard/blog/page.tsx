import React from "react";

export default function BlogDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border border-white/5 bg-[#050505] p-8 md:p-12 rounded-sm max-w-4xl">
        <h2 className="text-2xl font-serif text-white mb-4 tracking-wide">
          Blog Articles
        </h2>
        <p className="text-sm text-white/50 font-sans leading-relaxed max-w-2xl">
          This section will host publishing controls, draft editing logs, and advisory article distributions.
        </p>
      </div>
    </div>
  );
}
