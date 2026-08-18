import React from "react";
import { Container } from "@/components/ui/Container";

export function Intro() {
  return (
    <section className="bg-black py-32 flex items-center justify-center border-b border-white/5">
      <Container className="max-w-4xl px-6 md:px-12 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-serif text-white/90 leading-snug">
          Bespoke strategy designed for high-performing hospitality brands.
        </h2>
        <div className="w-12 h-px bg-primary/60 mx-auto mt-8" />
      </Container>
    </section>
  );
}
