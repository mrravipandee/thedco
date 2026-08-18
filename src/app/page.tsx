import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { QuickCredibility } from "@/components/home/QuickCredibility";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { HowWeHelp } from "@/components/home/HowWeHelp";
import { Philosophy } from "@/components/home/Philosophy";
import { BrandsVentures } from "@/components/home/BrandsVentures";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />
      
      <main className="bg-black text-white relative min-h-screen">
        <Hero />
        <Intro />
        <QuickCredibility />
        <ServicesPreview />
        <HowWeHelp />
        <Philosophy />
        <BrandsVentures />
        <CTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
