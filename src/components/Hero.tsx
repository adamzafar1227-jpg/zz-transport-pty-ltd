import { motion } from "framer-motion";
import { ArrowRight, Twitter, Facebook, Instagram } from "lucide-react";
import { useTransitionRouter } from "./PageTransition";
import Gallery3D from "./Gallery3D";

export default function Hero() {
  const { navigate } = useTransitionRouter();

  const specs = [
    { label: "Years Experience", value: "20+" },
    { label: "Cities Covered", value: "2" },
    { label: "Happy Clients", value: "500+" },
    { label: "On-Time Rate", value: "99%" }
  ];

  return (
    <section
      id="home"
      className="relative bg-[#07080A] text-white overflow-hidden w-full pt-20 sm:pt-24 pb-0"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Heavy textured/diagonal break background styling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle gold glow behind the truck placement */}
      <div className="absolute right-[10%] top-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F5A623]/[0.08] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Grid Content */}
      <div
        className="w-full flex items-center relative z-10 py-6 lg:py-0"
        style={{ 
          maxWidth: '100%', 
          paddingLeft: 60, 
          paddingRight: 60, 
          paddingTop: '20px',
          flex: 1,
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Left Column (Content & Technical Stats Grid) */}
          <div className="relative flex flex-col items-start text-left z-10 w-full lg:w-[42%] lg:pl-[60px] px-0">
            
            {/* Headline - "ZZ TRANSPORT" with italic massive impact font */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <h1 className="font-display font-[900] text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] tracking-tighter uppercase italic leading-[0.85] text-white">
                ZZ TRANSPORT
              </h1>
              
              {/* Secondary text - Brand Tagline */}
              <p className="font-display font-extrabold text-base sm:text-xl text-[#F5A623] tracking-wide uppercase italic mt-3 ml-1">
                With ZZ Your Transport is Easy!!
              </p>
            </motion.div>

            {/* ZZ Transport Branded Support Copywrite */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-sans text-xs sm:text-sm text-gray-400 mt-6 leading-relaxed w-full"
            >
              From ocean freight to air cargo, ZZ Transport Pty Ltd delivers your goods safely across Perth, Melbourne and beyond. Reliable, fast and fully insured.
            </motion.p>

            {/* Technical Spec Info (2x2 Grid Layout matching the reference image) */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-10 w-full">
              {specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="flex flex-col text-left"
                >
                  <span className="font-sans text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                    {spec.label}
                  </span>
                  <span className="font-display font-bold text-2xl sm:text-3xl text-[#F5A623] tracking-tight mt-1">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Gallery 3D Integrated into Hero Left Column */}
            <div className="w-full overflow-visible" style={{ marginTop: '16px', height: '260px', paddingBottom: '20px' }}>
              <Gallery3D />
            </div>

          </div>

          {/* Right Column (Massive yellow Volvo Freight Truck) */}
          <div className="relative flex justify-center lg:justify-end items-center w-full lg:w-[55%]">
            
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: '100%',
                marginLeft: '-60px',
              }}
            >
              {/* "SAFE | FAST | RELIABLE" callout label absolutely positioned OVER the truck image, top-right area */}
              <div className="absolute top-[2%] right-[2%] hidden sm:flex flex-col items-end z-25 pointer-events-none">
                <div className="flex items-center gap-1">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none font-sans font-bold">ZZ Transport</p>
                    <p className="text-xl font-bold font-display text-[#F5A623] leading-tight select-none mt-1">SAFE | FAST | RELIABLE</p>
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
                src="/images/zz-truck.png"
                alt="ZZ Transport Truck"
                style={{
                  width: '100%',
                  maxWidth: 'none',
                  height: 'auto',
                  objectFit: 'contain',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  boxShadow: 'none',
                  filter: 'drop-shadow(0 40px 80px rgba(245,166,35,0.3))',
                }}
              />

            </motion.div>

          </div>

        </div>
      </div>

      {/* Styled Bottom bar matching reference image */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
        }} 
        className="z-10 flex-col md:flex-row gap-6"
      >
        {/* Left section: Small inline paragraph with gold separator */}
        <div className="flex items-center text-center md:text-left">
          <p className="font-sans text-xs text-gray-400 max-w-sm">
            All shipments are fully insured with real-time tracking and guaranteed on-time delivery across Australia.
          </p>
          <div className="hidden md:block h-6 border-r border-[#F5A623] ml-6 opacity-80 shrink-0" />
        </div>

        {/* Center section: Outlined gold pill button */}
        <div>
          <button
            onClick={() => navigate("#services")}
            className="inline-flex items-center gap-2 border border-[#F5A623]/60 hover:border-[#F5A623] text-xs font-mono font-bold uppercase tracking-widest text-white hover:text-[#F5A623] px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Explore Now <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Right section: Gold/white social media icons */}
        <div className="flex items-center gap-6">
          <a href="#facebook" className="text-gray-400 hover:text-[#F5A623] transition-colors duration-200">
            <Facebook className="h-4 w-4" />
          </a>
          <a href="#twitter" className="text-gray-400 hover:text-[#F5A623] transition-colors duration-200">
            <Twitter className="h-4 w-4" />
          </a>
          <a href="#instagram" className="text-gray-400 hover:text-[#F5A623] transition-colors duration-200">
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
