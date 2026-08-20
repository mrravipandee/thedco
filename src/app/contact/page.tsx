import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";

// Section Components
import { ContactHero } from "@/components/contact/ContactHero";
import { ConsultationIntro } from "@/components/contact/ConsultationIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { ContactClosingCTA } from "@/components/contact/ContactClosingCTA";

export const metadata: Metadata = constructMetadata({
  title: "Contact THEDCO | Hospitality Advisory",
  description:
    "Get in touch with THE DCO for premium hospitality advisory engagements. Let's talk about hotel, resort, and restaurant investments, branding, and operations improvement.",
});

export default function ContactPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        <ContactHero />
        <ConsultationIntro />
        <ContactForm />
        <ContactInfo />
        <WhatHappensNext />
        <ContactClosingCTA />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

