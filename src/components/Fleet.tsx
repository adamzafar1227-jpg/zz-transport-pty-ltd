import { useTransitionRouter } from "./PageTransition";
import { motion } from "framer-motion";
import { Truck, Layers, Maximize2, Box, ShieldAlert, FolderOpen, ArrowRight, ChevronRight } from "lucide-react";

export default function Fleet() {
  const { navigate } = useTransitionRouter();

  const fleetCategories = [
    {
      id: "side-loader",
      title: "Side Loader",
      icon: Truck,
      description: "Perfect for standard container movements. Our side loaders handle 20ft and 40ft containers with precision and efficiency to and from Fremantle wharf."
    },
    {
      id: "semi-trailer",
      title: "Semi Trailer",
      icon: Layers,
      description: "Heavy duty semi trailers for large freight movements across Perth Metro area and interstate routes between Perth and Melbourne."
    },
    {
      id: "low-loader",
      title: "Low Loader / Low Profile",
      icon: Maximize2,
      description: "Specialist equipment for out of gauge cargo, oversized machinery and project freight that requires extra care and specialist handling."
    },
    {
      id: "tautliner",
      title: "Tautliner",
      icon: Box,
      description: "Single and double deck tautliners for flexible freight solutions. Ideal for palletised goods, loose cargo and air freight collections."
    }
  ];

  const specialistCapabilities = [
    {
      id: "out-of-gauge",
      title: "Out of Gauge Cargo",
      icon: Maximize2,
      description: "Handling oversized loads, construction machinery, and non-standard profiles with extreme security."
    },
    {
      id: "hazardous-materials",
      title: "Hazardous Materials Licensed",
      icon: ShieldAlert,
      description: "Fully certified operators and specialized tankers/trailers to transport licensed class-dangerous compounds."
    },
    {
      id: "open-top-containers",
      title: "Open Top Containers",
      icon: FolderOpen,
      description: "Top-loading capacity for bulk raw materials or heavy industrial assets requiring overhead crane placement."
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
    <section id="fleet" className="bg-[#0A0A0A] relative text-white overflow-hidden">
      
      {/* 1. Page Hero Banner */}
      <section 
        className="bg-[#0A0A0A] flex flex-col items-center justify-center border-b border-[#1F1F1F]"
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          minHeight: '220px',
          paddingTop: '80px',
          paddingBottom: '40px',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Subtle diagonal highway grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #F5A623 0px, #F5A623 1px, transparent 0px, transparent 50%), repeating-linear-gradient(-45deg, #F5A623 0px, #F5A623 1px, transparent 0px, transparent 50%)`,
            backgroundSize: "45px 45px"
          }}
        />
        
        {/* Large faded underlying background text "FLEET" */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: 'clamp(60px, 18vw, 200px)',
            fontWeight: 900,
            color: 'white',
            opacity: 0.04,
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            FLEET
          </span>
        </div>

        {/* Content of Hero Banner */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase" id="fleet-page-title">
            Our Fleet
          </h1>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="text-[#9CA3AF] mt-3 text-xs sm:text-sm font-sans tracking-wide">
            Modern, well-maintained vehicles ready to handle any freight challenge across Australia
          </p>
        </div>
      </section>

      {/* 2. Fleet categories - 4 Vehicles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-4">
            Professional Road Legacies
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed font-sans">
            Every vehicle in the ZZ Transport line is strictly maintained to original manufacturer benchmarks, fully compliant with national heavy vehicle industry standards (NHVR).
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          id="fleet-cards-grid"
        >
          {fleetCategories.map((vehicle) => {
            const IconComponent = vehicle.icon;
            return (
              <motion.div
                key={vehicle.id}
                variants={cardVariants}
                className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:border-[#F5A623] hover:shadow-[0_12px_40px_rgba(245,166,35,0.08)] p-6 sm:p-8"
                id={`fleet-card-${vehicle.id}`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    {/* Rounded badge for the gold icon */}
                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#1f1f1f] group-hover:border-[#F5A623]/50 transition-colors duration-300 shadow-md">
                      <IconComponent className="h-6 w-6 text-[#F5A623]" />
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-[#F5A623] transition-colors duration-300">
                      {vehicle.title}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                    {vehicle.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1F1F1F] flex items-center justify-between">
                  <span className="text-[#F5A623] text-xs font-mono font-bold tracking-wider uppercase">
                    NHVR Compliant
                  </span>
                  <button
                    onClick={() => navigate("#contact")}
                    className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#F5A623] transition-colors font-bold uppercase tracking-wider group/btn"
                  >
                    Select vehicle
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 3. Specialist Capabilities Section */}
      <div className="bg-[#111111] border-y border-[#1F1F1F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mb-3">
              Specialist Capabilities
            </h2>
            <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full mb-4" />
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans">
              We love project work and can source specialized trucks to handle non-standard requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left" id="specialist-capabilities-grid">
            {specialistCapabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div key={cap.id} className="bg-[#161616] p-6 rounded-xl border border-[#1F1F1F] flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-gold/15 text-[#F5A623] mb-4">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom CTA Section */}
      <div className="bg-[#0D0D0D] border-t border-[#F5A623]/20 relative overflow-hidden" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        {/* Subtle glowing anchor graphic */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-[1px] bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Ready to Ship With Us?
          </h2>
          <p className="text-[#9CA3AF] mt-3 mb-8 max-w-md mx-auto text-sm sm:text-base font-sans">
            Contact our team today for a free, fast quote.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("#contact")}
              className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center shadow-lg shadow-[#F5A623]/10 hover:shadow-[#F5A623]/25 active:scale-95 cursor-pointer"
              id="cta-fleet-quote-btn"
            >
              Request a Quote
            </button>
            
            <button
              onClick={() => navigate("#contact")}
              className="w-full sm:w-auto border border-[#F5A623] hover:bg-[#F5A623]/10 text-[#F5A623] font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center active:scale-95 cursor-pointer"
              id="cta-fleet-contact-btn"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
