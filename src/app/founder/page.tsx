import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

// Section Components
import { FounderHero } from "@/components/founder/FounderHero";
import { FounderBackground } from "@/components/founder/FounderBackground";
import { ExperienceSummary } from "@/components/founder/ExperienceSummary";
import { AdvisoryApproach } from "@/components/founder/AdvisoryApproach";
import { AssociatedVentures } from "@/components/founder/AssociatedVentures";
import { FounderCTA } from "@/components/founder/FounderCTA";

export const metadata: Metadata = constructMetadata({
  title: "Meet Manav Chandak | Founder of THEDCO",
  description: "Hospitality entrepreneur and advisor, Founder of THEDCO. Discover Manav Chandak's experience across hospitality operations, family enterprise, business strategy and digital brand growth.",
});

export default function FounderPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        <FounderHero />
        <FounderBackground />
        <ExperienceSummary />
        <AdvisoryApproach />
        <AssociatedVentures />
        <FounderCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
