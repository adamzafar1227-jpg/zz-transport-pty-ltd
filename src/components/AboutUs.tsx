import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  Star, 
  Users, 
  Lock, 
  Compass, 
  ChevronRight
} from "lucide-react";
import { useTransitionRouter } from "./PageTransition";

export default function AboutUs() {
  const { navigate } = useTransitionRouter();

  const stats = [
    { value: "2008", label: "Founded", desc: "Zia's standalone dream realized" },
    { value: "2", label: "Hub Cities", desc: "Perth & Melbourne facilities" },
    { value: "20+ Yrs", label: "Sector Lead", desc: "Generations of local experience" },
    { value: "500+", label: "Happy Clients", desc: "Durable nationwide trusts" }
  ];

  const valueCards = [
    {
      id: "val-reliability",
      title: "Reliability",
      icon: ShieldCheck,
      text: "We focus on hiring only the best drivers who deliver great service EVERY time"
    },
    {
      id: "val-capacity",
      title: "Capacity",
      icon: Truck,
      text: "Great team of drivers and contractors to meet your requirements at all times"
    },
    {
      id: "val-easy",
      title: "Easy Service",
      icon: Star,
      text: "Our mission: With ZZ Your Transport is Easy!! We love our customers"
    }
  ];

  const timelineData = [
    {
      year: "2008",
      title: "The Genesis",
      desc: "ZZ Transport founded by Zia Wakili in Perth, Western Australia, materializing a premium client-first vision."
    },
    {
      year: "2010",
      title: "Fleet Modernization",
      desc: "Expanded fleet with high-end specialized side loaders, low loaders, and high-capacity semi trailers."
    },
    {
      year: "2015",
      title: "East Coast Gateway",
      desc: "Opened corporate Melbourne operations at 54/56 Agosta Drive, Laverton North to provide complete interstate connections."
    },
    {
      year: "2020",
      title: "A Decade Plus",
      desc: "Celebrating 12 years of reliable Australian transport solutions with custom cross-docking capabilities."
    },
    {
      year: "2024",
      title: "Continual Rise",
      desc: "Continuing to grow with 500+ happy corporate and private clients spanning the entirety of Australia."
    }
  ];

  const trustCards = [
    {
      id: "trust-licensed",
      title: "Licensed & Insured",
      icon: Lock,
      desc: "Fully licensed to handle dangerous goods with substantial warehouse capacities in secure terminals."
    },
    {
      id: "trust-expert",
      title: "Expert Team",
      icon: Users,
      desc: "All desk and road staff have extensive industry knowledge to handle and solve complex logistics challenges."
    },
    {
      id: "trust-specialists",
      title: "Project Specialists",
      icon: Compass,
      desc: "We excel in meeting heavy logistics demands throughout Australia for specialist over-dimensional freight."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 14 } }
  };

  return (
    <section id="about-us" className="bg-[#0A0A0A] relative text-white overflow-hidden scroll-mt-20">
      
      {/* SECTION 1 — HERO BANNER */}
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
        {/* Subtle diagonal background highway mesh */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #F5A623 0px, #F5A623 1px, transparent 0px, transparent 50%), repeating-linear-gradient(-45deg, #F5A623 0px, #F5A623 1px, transparent 0px, transparent 50%)`,
            backgroundSize: "45px 45px"
          }}
        />

        {/* Massive faded watermark underlying heading to establish editorial scale */}
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
            ABOUT
          </span>
        </div>

        {/* Content Header Container */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase" id="about-page-title">
            About ZZ Transport
          </h1>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="text-[#9CA3AF] mt-3 text-xs sm:text-sm font-sans tracking-wide">
            With ZZ Your Transport is Easy!!
          </p>
        </div>
      </section>

      {/* SECTION 2 — COMPANY INTRODUCTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Typography Intro block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#F5A623]">
                WHO WE ARE
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight uppercase">
                Australia's Most Reliable Transport Partner
              </h2>
              <div className="w-20 h-0.5 bg-[#F5A623] rounded-full" />
            </div>
            
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed font-sans font-medium">
              We pride ourselves with Excellent Customer Service and making Transport solutions easier for you. ZZ Transport was started by Zia Wakili. With generations of experience in the transport business, Zia started working as an Independent Contractor with a dream of building his own company — a company that serviced customers better than the rest. 
            </p>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed font-sans">
              In 2008 he made that dream a reality and in a short time doubled in size with operations in Perth and Melbourne. Our team operates with traditional family ethics, bringing expert logistics frameworks directly to your heavy freight movements.
            </p>
          </div>

          {/* Right Side: 2x2 Stat grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-[#111111] p-5 sm:p-6 rounded-xl border border-[#1F1F1F] text-center hover:border-[#F5A623]/20 transition-colors duration-300 group"
              >
                <div className="text-2xl sm:text-3.5xl font-mono font-black text-[#F5A623] group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-display font-bold text-white mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[10px] text-gray-400 mt-1 font-sans leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* SECTION 3 — OUR VISION */}
      <div className="bg-[#111111] border-y border-[#1F1F1F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl border-l-4 border-[#F5A623] pl-6 sm:pl-8 space-y-4 mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#F5A623] uppercase">
              OUR VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-tight">
              Built on Family Values
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed font-sans">
              Our vision is to achieve success and fulfill our responsibility to our customers, employees, and the general public, through traditional family values. We will earn customer confidence by being helpful, providing easy transport solutions, being proactive and providing professional excellence in service. We will maintain a work friendly environment by recognizing the contributions and accomplishments of each team member. We will strive to protect the interest of the general public as we employ trained, experienced, safety conscious team members.
            </p>
          </div>

          {/* 3 Values cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={card.id} 
                  className="bg-[#1A1A1A] p-6 rounded-xl border border-[#1F1F1F] hover:border-[#F5A623]/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-[#111111] rounded-lg border border-[#F5A623]/10 flex items-center justify-center text-[#F5A623] mb-4 shadow-inner">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#111111] flex items-center text-[10px] uppercase font-mono font-bold text-[#F5A623] tracking-widest">
                    ZZ Standard Checked
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* SECTION 4 — COMPANY PROFILE TIMELINE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
            Our Journey
          </h2>
          <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans mt-3">
            Tracing our growth from a sole contractor dream in Western Australia to standard-setting national logistical scale.
          </p>
        </div>

        {/* Timeline body code */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#1F1F1F] -translate-x-1/2" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline circular pulse */}
                  <div className="absolute left-6 md:left-1/2 top-2 w-4.5 h-4.5 bg-[#0A0A0A] border-2 border-[#F5A623] rounded-full -translate-x-1/2 z-10 hidden sm:flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping absolute" />
                    <span className="w-1 h-1 rounded-full bg-[#F5A623] absolute" />
                  </div>

                  {/* Left spacing for layout consistency */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                  {/* Bubble card content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="bg-[#111111] border border-[#1F1F1F] p-5 sm:p-6 rounded-xl hover:border-[#F5A623]/25 transition-all duration-300 relative group">
                      
                      {/* Stylized calendar label overlay */}
                      <div className="absolute -top-3.5 left-4 md:left-auto md:right-4 bg-[#F5A623] text-black font-mono font-bold text-[10px] sm:text-xs py-1 px-3 rounded shadow-lg uppercase tracking-wider">
                        {item.year}
                      </div>

                      <div className="mt-1">
                        <h3 className="font-display font-[800] text-sm sm:text-base text-white tracking-wide uppercase mb-2 group-hover:text-[#F5A623] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* SECTION 5 — WHY TRUST OUR JOURNEY */}
      <div className="bg-[#111111] border-y border-[#1F1F1F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight uppercase">
              Why Trust Our Journey
            </h2>
            <div className="w-12 h-0.5 bg-[#F5A623] mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {trustCards.map((trust) => {
              const IconComponent = trust.icon;
              return (
                <div 
                  key={trust.id} 
                  className="bg-[#161616] p-6 rounded-xl border border-[#1F1F1F] hover:shadow-xl transition-all duration-300 group flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-10 h-10 bg-[#111111] rounded-lg border border-[#F5A623]/10 flex items-center justify-center text-[#F5A623] mb-4 group-hover:border-[#F5A623]/40 transition-colors duration-300">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-sans font-bold text-base text-white mb-2">
                    {trust.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {trust.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* SECTION 6 — BOTTOM CTA */}
      <div className="bg-[#0D0D0D] border-t border-[#F5A623]/20 py-16 relative overflow-hidden">
        {/* Subtle glowing golden line */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-[1px] bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
            Ready to Work With Us?
          </h2>
          <p className="text-[#9CA3AF] mt-3 mb-8 max-w-md mx-auto text-sm sm:text-base font-sans">
            Get in touch with our friendly team today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("#contact")}
              className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center shadow-lg shadow-[#F5A623]/10 hover:shadow-[#F5A623]/25 active:scale-95 cursor-pointer"
              id="cta-about-quote-btn"
            >
              Request a Quote
            </button>
            <button
              onClick={() => navigate("#contact")}
              className="w-full sm:w-auto border border-[#F5A623] hover:bg-[#F5A623]/10 text-[#F5A623] font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center active:scale-95 cursor-pointer"
              id="cta-about-contact-btn"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
