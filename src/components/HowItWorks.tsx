import { motion } from "framer-motion";
import { FileText, ClipboardList, Truck, ChevronRight } from "lucide-react";

interface StepItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: typeof FileText;
}

export default function HowItWorks() {
  const stepsData: StepItem[] = [
    {
      id: "step-1",
      number: "01",
      title: "Request a Quote",
      description: "Fill out our quick online quote form with your cargo specs, origin, and destination. Our operators will quote back within hours.",
      icon: FileText
    },
    {
      id: "step-2",
      number: "02",
      title: "We Plan Your Shipment",
      description: "We orchestrate the optimal fleet allocation, secure port schedules, and arrange unloading parameters suited to your cargo.",
      icon: ClipboardList
    },
    {
      id: "step-3",
      number: "03",
      title: "On Time Delivery",
      description: "Our professional drivers safely transport your freight to its final destination. Secure real-time confirmation is provided on completion.",
      icon: Truck
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#111111] text-white relative overflow-hidden border-b border-[#1F1F1F]">
      {/* Decorative background visualizers */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title with Gold Underline */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase" id="how-title">
            Our Process
          </h2>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="max-w-2xl mx-auto text-gray-400 mt-4 text-xs sm:text-sm">
            From critical port collections to nationwide warehouse distribution, our process is designed for absolute simplicity.
          </p>
        </div>

        {/* Steps Horizontal/Grid Wrapper */}
        <div className="relative">
          
          {/* Horizontal Golden connecting line (Visible on lg screens only) */}
          <div className="absolute top-[3.5rem] left-[15%] right-[15%] h-0.5 bg-[#F5A623]/30 hidden lg:block pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative"
            id="how-steps-container"
          >
            {stepsData.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUpVariants}
                  className="flex flex-col items-center text-center relative group"
                  id={`how-step-item-${step.id}`}
                >
                  {/* Circle number & Icon background */}
                  <div className="relative mb-6">
                    {/* Floating Gold Step Number Badge */}
                    <div className="absolute -top-3 -right-3 bg-[#F5A623] text-black font-display font-black text-xs px-2.5 py-1 rounded-full border-2 border-[#111111] shadow-md z-10">
                      {step.number}
                    </div>

                    <div className="w-20 h-20 rounded-full bg-[#1A1A1A] hover:bg-[#222222] border-2 border-[#F5A623]/30 flex items-center justify-center text-white transition-all duration-300 transform group-hover:scale-105 group-hover:border-[#F5A623] shadow-lg">
                      <IconComponent className="h-8 w-8 text-[#F5A623]" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-[#F5A623] transition-colors duration-200">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>

                  {/* Connecting chevron helper (Desktop only, omitted on final step) */}
                  {idx < 2 && (
                    <div className="absolute top-8 right-[-10%] text-[#F5A623]/40 hidden lg:block">
                      <ChevronRight className="h-5 w-5 animate-pulse" />
                    </div>
                  )}

                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
