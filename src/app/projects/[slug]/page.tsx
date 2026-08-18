import React from "react";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  return (
    <main className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <h1 className="text-4xl md:text-6xl font-serif text-gold">Project: {slug}</h1>
    </main>
  );
}
