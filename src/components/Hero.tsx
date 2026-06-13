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
        className="relative bg-[#07080A] text-white w-full pt-20 sm:pt-24 pb-0"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'visible',
        }}
      >
      {/* Heavy textured/diagonal break background styling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Subtle gold glow behind the truck placement */}
      <div className="absolute right-[10%] top-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F5A623]/[0.08] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Main Grid Content */}
      <div
        className="w-full flex items-center relative z-10 py-6 lg:py-0 hero-inner"
        style={{ 
          maxWidth: '100%', 
          paddingLeft: 60, 
          paddingRight: 60, 
          paddingTop: '20px',
          flex: 1,
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8 hero-main-grid px-4 lg:px-[60px]">
          
          {/* Left Column (Content & Technical Stats Grid) */}
          <div className="relative flex flex-col items-start text-left z-20 w-full lg:w-[42%] lg:pl-[60px] px-0 order-1 hero-left-col">
            
            {/* Headline - "ZZ TRANSPORT" with italic massive impact font */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <h1 className="font-display font-[900] text-5xl sm:text-7xl lg:text-[6rem] xl:text-[7rem] tracking-tighter uppercase italic leading-[0.85] text-white hero-heading">
                ZZ TRANSPORT
              </h1>
              
              {/* Secondary text - Brand Tagline */}
              <p className="font-display font-extrabold text-base sm:text-xl text-[#F5A623] tracking-wide uppercase italic mt-3 ml-1 hero-tagline">
                Your Trusted Logistics Partner
              </p>
            </motion.div>

            {/* ZZ Transport Branded Support Copywrite */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-sans text-sm sm:text-base md:text-lg text-gray-300 mt-4 sm:mt-6 leading-snug sm:leading-6 w-full hero-description"
              style={{ maxWidth: '640px', marginBottom: 0 }}
            >
              <span className="block mb-0">From ocean freight to air cargo,</span>
              <span className="block mb-0">ZZ Transport Pty Ltd delivers your goods safely across Perth, Melbourne and beyond.</span>
              <span className="block">Reliable, fast and fully insured.</span>
            </motion.p>

            {/* Technical Spec Info (2x2 Grid Layout matching the reference image) */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 mt-10 w-full order-4 lg:order-none hero-stats-grid">
              {specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="flex flex-col text-left"
                >
                  <span className="font-sans text-[11px] uppercase tracking-wider text-gray-500 font-medium hero-stat-label">
                    {spec.label}
                  </span>
                  <span className="font-display font-bold text-2xl sm:text-3xl text-[#F5A623] tracking-tight mt-1 hero-stat-value">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Integrated Gallery3D inside Hero */}
            <div className="order-3 lg:order-none hero-gallery-wrapper" style={{
              marginTop: '16px',
              width: '100%',
              maxWidth: '600px',
              overflow: 'visible',
              paddingTop: '10px',
            }}>
              <Gallery3D compact={true} />
            </div>

          </div>

          {/* Right Column (Massive yellow Volvo Freight Truck) */}
          <div className="relative flex justify-center lg:justify-end items-center w-full lg:w-[55%] order-2 hero-right-col">
            
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="hero-truck-wrapper"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative',
                width: '100%',
                marginLeft: '-60px',
                paddingBottom: '0',
              }}
            >
              {/* "SAFE | FAST | RELIABLE" callout label absolutely positioned OVER the truck image, top-right area */}
              <div className="absolute top-[2%] right-[2%] hidden sm:flex flex-col items-end z-25 pointer-events-none">
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
                className="hero-truck-img"
                src="/images/zz-truck.webp"
                alt="ZZ Transport Truck"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '0',
                  boxShadow: 'none',
                  filter: 'drop-shadow(0 40px 80px rgba(245,166,35,0.3))',
                  willChange: 'transform',
                }}
              />

            </motion.div>

          </div>

          </div>
        </div>
      </section>

      <div className="hero-bottom-bar" style={{
        width: '100%',
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <p className="hero-bottom-text" style={{ color: '#9CA3AF', fontSize: '13px', maxWidth: '400px' }}>
          All shipments are fully insured with real-time tracking and guaranteed on-time delivery across Australia.
        </p>
        <div className="hero-bottom-divider" style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
        <button 
          onClick={() => navigate("#services")}
          className="hero-bottom-button"
          style={{ background: 'transparent', border: '1px solid #F5A623', borderRadius: '999px', padding: '10px 28px', color: '#FFFFFF', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer' }}
        >
          EXPLORE NOW →
        </button>
        <div className="hero-social-icons" style={{ display: 'flex', gap: '16px' }}>
          <a href="https://www.facebook.com/ZZ-Transport-710069642377823/" style={{ color: '#9CA3AF' }}>f</a>
          <a href="#" style={{ color: '#9CA3AF' }}>t</a>
          <a href="#" style={{ color: '#9CA3AF' }}>in</a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1023px) {
          .hero-heading {
            font-size: 16vw !important;
            line-height: 0.88 !important;
            overflow: hidden !important;
            width: 100% !important;
          }

          .hero-tagline {
            font-size: 5.5vw !important;
            margin-top: 8px !important;
            white-space: nowrap !important;
          }

          .hero-description {
            margin-top: 10px !important;
            margin-bottom: 0 !important;
            font-size: 15px !important;
            line-height: 1.35 !important;
            max-width: 100% !important;
            width: 100% !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .hero-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 12px !important;
          }

          .hero-left-col {
            display: contents !important;
          }

          .hero-left-col > * {
            order: 1 !important;
          }

          .hero-right-col {
            order: 2 !important;
            overflow: visible !important;
            margin-top: -20px !important;
            padding: 0 !important;
          }

          .hero-truck-wrapper {
            margin-left: 0 !important;
          }

          .hero-gallery-wrapper {
            order: 3 !important;
            margin-top: -10px !important;
          }

          .hero-stats-grid {
            order: 4 !important;
            margin-top: 0 !important;
          }

          .hero-truck-img {
            width: auto !important;
            max-width: 100% !important;
            height: 220px !important;
            object-fit: contain !important;
            transform: scale(1.05) !important;
            transform-origin: center center !important;
          }

          .hero-stat-label {
            font-size: 9px !important;
            white-space: nowrap !important;
            letter-spacing: 0.5px !important;
          }

          .hero-stat-value {
            font-size: 26px !important;
          }

          .hero-bottom-bar {
            flex-direction: column !important;
            padding: 12px 16px !important;
            gap: 10px !important;
          }

          .hero-bottom-text {
            font-size: 11px !important;
            line-height: 1.5 !important;
          }

          .hero-bottom-divider {
            display: none !important;
          }

          .hero-social-icons {
            display: none !important;
          }

          .hero-bottom-button {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}} />
    </>
  );
}
