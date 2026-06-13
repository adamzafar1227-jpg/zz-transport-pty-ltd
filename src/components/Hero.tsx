import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "./PageTransition";
import Gallery3D, { images } from "./Gallery3D";

export default function Hero() {
  const { navigate } = useTransitionRouter();

  const specs = [
    { label: "Years Experience", value: "20+" },
    { label: "Cities Covered", value: "2" },
    { label: "Happy Clients", value: "500+" },
    { label: "On-Time Rate", value: "99%" }
  ];

  // Preload all gallery images for instantaneous rendering
  useEffect(() => {
    images.forEach(img => {
      const image = new Image();
      image.src = img.url;
    });
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative bg-[#07080A] text-white w-full pt-24 md:pt-24 pb-0 flex flex-col min-h-screen overflow-visible"
      >
      {/* Heavy textured/diagonal break background styling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle gold glow behind the truck placement */}
      <div className="absolute right-[10%] top-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F5A623]/[0.08] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Grid Content */}
      <div
        className="w-full flex items-center relative z-10 py-2 md:py-0 px-4 md:px-[60px] pt-4 md:pt-5 flex-1 max-w-full"
      >
        <div className="w-full flex flex-col md:flex-row md:flex-wrap items-center md:items-start gap-y-4 md:gap-y-0">
          
          {/* Left Column (Content & Technical Stats Grid) */}
          <div className="relative flex flex-col items-start text-left z-10 w-full md:w-[45%] order-1 px-0 md:pl-[60px]">
            
            {/* Headline - "ZZ TRANSPORT" with italic massive impact font */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="font-display font-[900] text-[52px] md:text-8xl tracking-tighter uppercase italic leading-[0.85] text-white">
                ZZ TRANSPORT
              </h1>
              
              {/* Secondary text - Brand Tagline */}
              <p className="font-display font-extrabold text-base md:text-2xl text-[#F5A623] tracking-wide uppercase italic mt-2 md:mt-3 ml-1">
                Your Trusted Logistics Partner
              </p>
            </motion.div>

            {/* ZZ Transport Branded Support Copywrite */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-sans text-[13px] md:text-base text-gray-400 mt-4 md:mt-6 leading-relaxed w-full"
            >
              From ocean freight to air cargo, ZZ Transport Pty Ltd delivers your goods safely across Perth, Melbourne and beyond. Reliable, fast and fully insured.
            </motion.p>
          </div>

          {/* Right Column (Massive yellow Volvo Freight Truck) */}
          <div className="relative flex justify-center md:justify-end items-center w-full md:w-[55%] order-2 md:order-2 mt-2 md:mt-0">
            
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="flex items-end justify-center relative w-full md:ml-[-60px] pb-0"
            >
              {/* "SAFE | FAST | RELIABLE" callout label absolutely positioned OVER the truck image, top-right area */}
              <div className="absolute top-[2%] right-[2%] hidden md:flex flex-col items-end z-25 pointer-events-none">
                <div className="flex items-center gap-1">
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest leading-none font-sans font-bold">ZZ Transport</p>
                    <p className="text-2xl font-black font-display text-[#F5A623] leading-tight select-none mt-1">SAFE | FAST | RELIABLE</p>
                  </div>
                  {/* Diagonal line indicator pointing to white container cargo */}
                  <svg width="110" height="60" className="pointer-events-none opacity-85" viewBox="0 0 110 60">
                    <line x1="0" y1="10" x2="60" y2="10" stroke="#F5A623" strokeWidth="1.5" />
                    <line x1="60" y1="10" x2="110" y2="60" stroke="#F5A623" strokeWidth="1.5" />
                    <circle cx="110" cy="60" r="3" fill="#F5A623" />
                  </svg>
                </div>
              </div>

              <img
                src="/images/zz-truck.webp"
                alt="ZZ Transport Truck"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-[220px] md:h-auto object-contain bg-transparent border-none rounded-none shadow-none filter drop-shadow-[0_40px_80px_rgba(245,166,35,0.3)] will-change-transform"
              />

            </motion.div>

          </div>

          {/* Gallery — shows below truck on mobile, below stats on desktop */}
          <div className="w-full md:w-[45%] order-3 md:order-3 mt-4 md:mt-10 md:pl-[60px] overflow-visible pt-1 mb-4 md:mb-0">
            <div className="w-full max-w-[600px] mx-auto md:mx-0 h-[160px] md:h-auto overflow-visible">
              <Gallery3D 
                compact={true} 
              />
            </div>
          </div>

          {/* Stats Grid - Moves below gallery on mobile */}
          <div className="w-full md:w-[45%] order-4 md:order-3 md:pl-[60px] grid grid-cols-2 gap-4 mt-4 md:mt-10">
            {specs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                className="flex flex-col text-left"
              >
                <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  {spec.label}
                </span>
                <span className="font-display font-black text-[28px] md:text-4xl text-[#F5A623] tracking-tighter mt-1 leading-none">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </div>

          </div>
        </div>
      </section>

      <div className="w-full bg-[#0A0A0A] border-t border-white/[0.08] px-6 md:px-[60px] py-8 md:py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        <p className="text-[#9CA3AF] text-xs md:text-[13px] max-w-full md:max-w-[400px] text-center md:text-left leading-relaxed">
          All shipments are fully insured with real-time tracking and guaranteed on-time delivery across Australia.
        </p>
        <div className="hidden md:block w-px h-10 bg-white/20"></div>
        <button 
          onClick={() => navigate("#services")}
          className="w-full md:w-auto bg-transparent border border-[#F5A623] rounded-full px-8 py-3 md:py-2.5 text-white text-xs md:text-[13px] tracking-[2px] font-bold cursor-pointer hover:bg-[#F5A623] hover:text-black transition-all duration-300"
        >
          EXPLORE NOW →
        </button>
        <div className="hidden md:flex gap-4">
          <a href="https://www.facebook.com/ZZ-Transport-710069642377823/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#F5A623] transition-colors">
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-[#F5A623] transition-colors">
            Twitter
          </a>
          <a href="#" className="text-gray-400 hover:text-[#F5A623] transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}
