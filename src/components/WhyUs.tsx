import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Calendar, Users, MapPin, ShieldAlert, Award, ShieldCheck, HeartHandshake, Zap } from "lucide-react";

interface StatItem {
  id: number;
  target: number;
  suffix: string;
  subtext: string;
  description: string;
  icon: typeof Calendar;
}

interface StatCounterProps {
  target: number;
  suffix: string;
  subtext: string;
  description: string;
  icon: typeof Calendar;
  key?: any;
}

function StatCounter({ target, suffix, subtext, description, icon: IconComponent }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1500; // milliseconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * target));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#111111] p-8 rounded-xl border border-[#1F1F1F] shadow-2xl relative overflow-hidden flex flex-col items-center text-center group hover:border-[#F5A623]/30 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#F5A623]/5 rounded-bl-full pointer-events-none group-hover:bg-[#F5A623]/10 transition-colors" />
      
      {/* Icon circle */}
      <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center mb-4 text-gold border border-gold/10 group-hover:scale-110 transition-transform">
        <IconComponent className="h-6 w-6" />
      </div>

      <div className="font-display font-black text-4xl sm:text-5xl text-gold pb-1 tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-sm font-sans font-medium text-white/90 uppercase tracking-wider mb-2">
        {subtext}
      </div>
      <p className="text-xs text-white/50 leading-relaxed font-sans max-w-[200px]">
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyUs() {
  const stats: StatItem[] = [
    {
      id: 1,
      target: 20,
      suffix: "+",
      subtext: "Years Experience",
      description: "More than two decades of transport excellence across industrial supply chains.",
      icon: Award
    },
    {
      id: 2,
      target: 500,
      suffix: "+",
      subtext: "Happy Clients",
      description: "Trusted by major manufacturers, parts distributors, and commercial firms.",
      icon: Users
    },
    {
      id: 3,
      target: 2,
      suffix: "",
      subtext: "Cities Covered",
      description: "Operating direct major freight routes between Perth and Melbourne.",
      icon: MapPin
    },
    {
      id: 4,
      target: 99,
      suffix: "%",
      subtext: "On-Time Rate",
      description: "Precision transport dispatch ensuring your shipments arrive on schedule.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#0A0A0A] text-white relative">
      {/* Decorative side block */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-32 bg-gold rounded-r-full hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-gold font-mono text-xs font-bold uppercase tracking-widest block mb-3">
              - Why Client Partners Choose Us
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-white tracking-tight uppercase" id="why-us-title">
              Why Choose ZZ Transport
            </h2>
            <div className="w-20 h-1.5 bg-gold mt-4 rounded-full" />
          </div>
          <div>
            <p className="text-white/70 font-sans text-sm sm:text-base leading-relaxed">
              We connect Australia's critical commercial pathways with dedicated fleets, extensive storage, 
              and real-time responsive dispatch logic. Whether moving high-value ocean containers from the Fremantle 
              wharf or rush air freight in Victoria, we treat every mile with priority.
            </p>
          </div>
        </div>

        {/* Dynamic Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="why-us-grid">
          {stats.map((stat) => (
            <StatCounter
              key={stat.id}
              target={stat.target}
              suffix={stat.suffix}
              subtext={stat.subtext}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Additional trust certifications at the bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center items-center gap-8 text-white/40">
          <div className="flex items-center gap-2 text-sm font-sans">
            <ShieldCheck className="h-5 w-5 text-gold/65" />
            <span>NHVR Approved Fleet</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-sans">
            <Zap className="h-5 w-5 text-gold/65" />
            <span>Customs Compliant Facilities</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-sans">
            <Users className="h-5 w-5 text-gold/65" />
            <span>100% Australian Owned & Operated</span>
          </div>
        </div>

      </div>
    </section>
  );
}
