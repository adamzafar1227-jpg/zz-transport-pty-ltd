"use client";

import React from "react";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCards from "@/components/services/ServicesCards";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesCards />
      <ServicesCTA />
    </main>
  );
}
