import React from "react";

export interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return <div>ProjectGallery: {images.length} images</div>;
}
