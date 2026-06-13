import React from "react";
import ServicesHero from "./services/ServicesHero";
import ServicesCards from "./services/ServicesCards";
import ServicesCTA from "./services/ServicesCTA";

export default function Services() {
  return (
    <section id="services" className="bg-[#0A0A0A] relative text-white overflow-hidden">
      <ServicesHero />
      <ServicesCards />
      <ServicesCTA />
    </section>
  );
}
