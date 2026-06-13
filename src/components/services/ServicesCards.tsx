import React, { useState } from "react";
import { Ship, Plane, Warehouse, ArrowRight, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  id: string;
  title: string;
  icon: typeof Ship;
  description: string;
  detailedPoints: string[];
  specs: string[];
}

export default function ServicesCards() {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const servicesData: ServiceItem[] = [
    {
      id: "ocean-freight",
      title: "Ocean Freight Transportation",
      icon: Ship,
      description: "Here at ZZ Transport we offer a wide range of container delivery methods, side loader, semi trailer, low loader, low profile side loader, Tautliner (single or double deck) or let our friendly staff know if you require a specialist truck delivery and we will do our best to source this equipment for you. We can also handle a variety of different container types such as Out of Gauge, Hazardous, Open Top and many more. We love project work and will work with you to ensure your project needs are always taken care of to the highest level.",
      detailedPoints: [
        "Side loader, semi trailer, low loader & low profile side loader options",
        "Tautliner (single or double deck) custom transport",
        "Out of Gauge, Hazardous, and Open Top container handling",
        "Specialist truck sourcing through friendly expert staff",
        "Dedicated project work coordination to the highest standard"
      ],
      specs: ["Fremantle & Melb Wharfs", "All Container Formats", "Project Specialties"]
    },
    {
      id: "air-freight",
      title: "Air Freight Transportation",
      icon: Plane,
      description: "Here at ZZ Transport our team understands the nature of air freight requirements and that your customer is paying for an express service and we aim to help you make your delivery deadlines. We will have our trucks ready for your freighter plane arrival or be at your air freight depot to collect your unpacked goods, as soon as they are available. Whether it is containerised, palletised or loose cargo, we will be there to collect and deliver as soon as possible.",
      detailedPoints: [
        "Freighter plane arrival truck preparation",
        "Air freight depot immediate unpack collections",
        "Express service focus to assist with critical milestones",
        "Containerised, palletised, or loose cargo handling",
        "Expedited first & last mile transport solutions"
      ],
      specs: ["Express Time-Critical", "Melbourne & Perth Depots", "Flight Schedule Sync"]
    },
    {
      id: "unpack-store",
      title: "Unpack, Store & Transportation",
      icon: Warehouse,
      description: "Our team at ZZ Transport know that sometimes you might need a little help with your deliveries, whether it's stuffing or de-stuffing containers to your specific requirements and delivering as soon as possible or storing your goods until required, our team is here to help you with this and ensure the highest standards of care are taken at all times. With a large warehouse capacity and licenced to hold dangerous goods, there is nothing that we can't handle.",
      detailedPoints: [
        "Stuffing and de-stuffing containers to your exact specifications",
        "Short & long-term storage of freight goods until required",
        "Large secure warehouse capacity in major transport hubs",
        "Fully licensed dangerous and hazardous goods storage facility",
        "Excellent handling care and precision at all times"
      ],
      specs: ["Dangerous Goods Licensed", "Stuffing & De-stuffing", "Flexible Premium Warehousing"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Welcome / Intro Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "40px", paddingBottom: "0" }}>
        
        {/* Centered Welcome Intro text */}
        <div className="text-center max-w-3xl mx-auto" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-4">
            Welcome to ZZ Transport
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed font-sans">
            Welcome to ZZ Transport, Australia's most reliable truck transport service provider. We focus on hiring only the best drivers and treat them with dignity and respect so they deliver great service EVERY time.
          </p>
        </div>

        {/* Promise Box section */}
        <div 
          className="max-w-4xl mx-auto bg-[#111111] rounded-xl border-l-[5px] border-[#F5A623] border-y border-r border-[#1F1F1F] shadow-2xl relative overflow-hidden group"
          style={{ padding: "32px", margin: "32px auto 48px auto" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/[0.01] rounded-bl-full pointer-events-none group-hover:bg-[#F5A623]/[0.03] transition-colors duration-300" />
          
          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#F5A623]" id="promise-label">
              Our Promise:
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              "Excellent, Reliable Truck Movements",
              "Honest Delivery Dates",
              "Fair and Competitive Pricing",
              "Respectful and Friendly Drivers",
              "Accountable and Helpful Dispatch Team"
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#F5A623] shrink-0 mt-0.5" />
                <span className="text-white text-sm sm:text-base font-bold font-sans">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* separator line */}
        <div className="w-24 h-px bg-[#1F1F1F] mx-auto opacity-50" />
      </div>

      {/* Grid of Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="services-cards-grid"
        >
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:border-[#F5A623] hover:shadow-[0_12px_40px_rgba(245,166,35,0.08)]"
                id={`service-card-${service.id}`}
              >
                <div>
                  {/* Top segment */}
                  <div className="relative h-28 bg-[#161616] flex items-center justify-center overflow-hidden border-b border-[#1F1F1F]">
                    <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)`,
                        backgroundSize: "15px 15px"
                      }}
                    />
                    <div className="absolute -bottom-12 w-28 h-28 bg-[#F5A623]/10 rounded-full blur-xl group-hover:bg-[#F5A623]/25 transition-all duration-300" />
                    
                    <div className="z-10 w-16 h-16 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#1f1f1f] group-hover:border-[#F5A623]/50 transition-colors duration-300 shadow-md">
                      <IconComponent className="h-8 w-8 text-[#F5A623]" />
                    </div>
                  </div>

                  {/* Text Description Segment */}
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-4 group-hover:text-[#F5A623] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed line-clamp-5 group-hover:text-white/90 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link controls */}
                <div className="p-6 sm:p-8 pt-0 mt-auto">
                  <button
                    onClick={() => setActiveService(service)}
                    className="inline-flex items-center gap-2 text-[#F5A623] hover:text-[#D4860A] font-extrabold text-xs uppercase tracking-widest transition-colors group/btn cursor-pointer py-1"
                    id={`learn-more-${service.id}`}
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              className="bg-[#111111] border border-[#1F1F1F] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative text-white"
              id="details-modal"
            >
              <div className="bg-[#161616] p-6 flex justify-between items-center border-b border-[#1F1F1F] text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#1F1F1F] rounded-lg border border-[#F5A623]/30">
                    <activeService.icon className="h-5 w-5 text-[#F5A623]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-extrabold tracking-tight text-white">
                    {activeService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveService(null)}
                  className="p-1.5 hover:bg-[#1F1F1F] rounded-lg text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Close details modal"
                  id="close-modal-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <p className="text-sm font-sans text-[#9CA3AF] leading-relaxed">
                  {activeService.description}
                </p>

                {/* Capabilities list */}
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#F5A623] uppercase mb-3.5">
                    Capabilities & Features:
                  </h4>
                  <ul className="space-y-3">
                    {activeService.detailedPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-gray-200">
                        <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specs */}
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#F5A623] uppercase mb-3.5">
                    Technical Specifications:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeService.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="bg-[#161616] text-[#F5A623] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider py-2.5 px-2 rounded-lg border border-[#1F1F1F] text-center"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer controller */}
              <div className="bg-[#161616] p-4 border-t border-[#1F1F1F] flex justify-end items-center gap-3">
                <button
                  onClick={() => setActiveService(null)}
                  className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer"
                  id="close-modal-text-btn"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveService(null);
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors cursor-pointer"
                  id="book-service-btn"
                >
                  Book Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
