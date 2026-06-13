import React from "react";

export default function ServicesHero() {
  return (
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
      
      {/* Large faded underlying background text "SERVICES" */}
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
          SERVICES
        </span>
      </div>

      {/* Content of Hero Banner */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase" id="services-page-title">
          Our Services
        </h1>
        <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
        <p className="text-[#9CA3AF] mt-3 text-xs sm:text-sm font-sans tracking-wide">
          Australia's most reliable transport and logistics solutions
        </p>
      </div>
    </section>
  );
}
