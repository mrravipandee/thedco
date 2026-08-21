import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function Intro() {
  return (
    <section className="bg-black py-20 md:py-24 flex items-center justify-center border-b border-white/5">
      <Container className="max-w-4xl px-6 md:px-12 text-center space-y-6">
        <Reveal duration={1.0}>
          <h2 className="text-3xl md:text-5xl font-serif text-white/90 leading-snug">
            Bespoke strategy designed for high-performing hospitality brands.
          </h2>
        </Reveal>
        <LineReveal className="w-12 mx-auto mt-8 bg-primary/60" delay={0.3} />
      </Container>
    </section>
  );
}
