import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@/config/seo";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineReveal } from "@/components/motion/LineReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  title: "Advisory Services | THEDCO",
  description:
    "Explore the hospitality advisory practices delivered by THE DCO. Strategic services for hotel launch, pre-opening, food and beverage operations, brand positioning, and profit growth.",
});

const SERVICES_DETAILED = [
  {
    num: "01",
    title: "Hotel Advisory",
    description: "Concept planning, positioning, pricing and revenue strategy, front office systems and guest service standards.",
    points: ["Concept planning & positioning", "Pricing & revenue strategy", "Front office systems", "Guest service standards"]
  },
  {
    num: "02",
    title: "Restaurant Advisory",
    description: "Menu engineering, kitchen planning, food cost control and restaurant profitability.",
    points: ["Menu engineering", "Kitchen layout planning", "Food & beverage costing", "Margin analysis & profitability"]
  },
  {
    num: "03",
    title: "Pre-Opening and Launch Advisory",
    description: "Staffing, vendor sourcing, SOP development and opening day execution.",
    points: ["Staff structure planning", "Vendor onboarding & sourcing", "SOP development", "Opening day countdown & execution"]
  },
  {
    num: "04",
    title: "Operations Advisory",
    description: "Operational audits, cost control, reporting systems and performance review.",
    points: ["Complete operational audit", "Departmental cost controls", "Integrated reporting formats", "Weekly performance reviews"]
  },
  {
    num: "05",
    title: "Staff Recruitment and Training",
    description: "Organisational structure, hiring, departmental training and performance standards.",
    points: ["Organisational hierarchy", "Talent sourcing & hiring support", "Departmental training logs", "Performance indicators (KPIs)"]
  },
  {
    num: "06",
    title: "SOP and Documentation",
    description: "Checklists, logs, reporting formats and operational documentation.",
    points: ["Standard operating procedures (SOPs)", "Daily opening & closing checklists", "Audit logs & checklists", "Vendor contract templates"]
  },
  {
    num: "07",
    title: "Branding and Marketing",
    description: "Brand positioning, digital presence, campaigns and reputation management.",
    points: ["Brand identity development", "Local SEO & digital strategy", "Launch campaign management", "Review tracking & reputation metrics"]
  },
  {
    num: "08",
    title: "Revenue and Profitability Advisory",
    description: "Pricing strategy, margin analysis, revenue growth and ROI planning.",
    points: ["Dynamic pricing models", "Wastage tracking systems", "Revenue growth roadmap", "Direct operational ROI models"]
  },
  {
    num: "09",
    title: "Banquet, Event and Expansion Advisory",
    description: "Event operations, banquet packages, franchise readiness and expansion planning.",
    points: ["Banquet package pricing", "Event operations workflow", "Franchise SOP manuals", "Expansion location feasibility"]
  }
];

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <MobileMenu />

      <main className="bg-black text-white relative min-h-screen">
        
        {/* Services Hero Section */}
        <section className="relative pt-40 pb-16 border-b border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-8 space-y-8">
                <Reveal>
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">
                    THEDCO ADVISORY
                  </span>
                </Reveal>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.15] text-white tracking-tight flex flex-col">
                  <TextReveal text="Our Advisory Practices" delay={0.2} />
                </h1>

                <LineReveal className="bg-primary max-w-[200px]" delay={0.4} />

                <Reveal delay={0.5}>
                  <p className="text-lg md:text-xl font-serif italic text-white/80 max-w-xl leading-relaxed">
                    Nine practical practices designed to build and grow profitable hospitality brands.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-4 lg:pt-16">
                <Reveal delay={0.6}>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    We deliver hands-on, operations-first advisory services. We work directly alongside owners, from launch strategies and recruitment to menu engineering and cost control audits.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Services List */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="space-y-0">
              {SERVICES_DETAILED.map((service, index) => (
                <div
                  key={service.num}
                  className="group relative py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start cursor-pointer"
                >
                  {/* Top line separator */}
                  <LineReveal className="absolute top-0 left-0 bg-white/10 w-full" delay={index * 0.05} />

                  {/* Service Number & Title */}
                  <div className="lg:col-span-5 flex items-start space-x-6 md:space-x-8">
                    <span className="text-sm font-sans tracking-widest text-primary font-semibold mt-1">
                      {service.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary transition-colors duration-500 leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Service Description & Points */}
                  <div className="lg:col-span-7 space-y-6">
                    <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
                      {service.description}
                    </p>
                    
                    <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2" staggerDelay={0.05}>
                      {service.points.map((pt, pIdx) => (
                        <Reveal key={pIdx} className="flex items-center space-x-3">
                          <span className="w-1.5 h-1.5 bg-primary/45 rounded-full flex-shrink-0" />
                          <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors duration-500 font-sans uppercase tracking-wider">
                            {pt}
                          </span>
                        </Reveal>
                      ))}
                    </Stagger>
                  </div>
                </div>
              ))}
              <div className="h-px bg-white/10 w-full relative">
                <LineReveal className="absolute top-0 left-0 bg-white/10 w-full" delay={0.4} />
              </div>
            </div>
          </div>
        </section>

        {/* Services Closing CTA */}
        <section className="bg-black py-20 md:py-24 text-center border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight uppercase leading-snug">
                Need Advisory Support for Your Project?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-white/50 leading-relaxed font-sans max-w-xl mx-auto">
                Schedule a consultation call to discuss your property layout, cost sheet, recruitment timeline, or brand concept with the THEDCO advisory team.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="pt-4">
              <Link
                href="/contact"
                className="inline-block text-xs uppercase tracking-[0.25em] bg-primary text-black font-semibold hover:bg-white hover:text-black px-10 py-5 transition-all duration-300 cursor-pointer"
              >
                Book a Consultation
              </Link>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </SmoothScroll>
  );
}
