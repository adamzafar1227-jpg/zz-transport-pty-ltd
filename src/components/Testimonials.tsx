import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "There a good bunch your transport. Thanks a lot ZZ Transport this has run a lot smoother than we expected.",
      author: "Satisfied Customer",
      role: "Fremantle WA",
      company: "National Freight Forwarder",
      initials: "SC"
    },
    {
      id: 2,
      quote: "ZZ Transport is consistently supplying prompt and professional service to our company. Very Reliable.",
      author: "WA Car Removals",
      role: "Western Australia",
      company: "Export Client",
      initials: "WC"
    },
    {
      id: 3,
      quote: "Fantastic service!",
      author: "Customer from Malaga",
      role: "Malaga, WA",
      company: "Delivery Point",
      initials: "CM"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0A] text-white relative border-b border-[#1F1F1F]">
      {/* Decorative backdrop graphics */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase" id="testimonials-title">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="max-w-xl mx-auto text-gray-400 mt-4 text-xs sm:text-sm">
            Read real-time performance feedback from commercial manufacturers and client partners across our national freight lanes.
          </p>
        </div>

        {/* Reviews Cards Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 shadow-2xl relative flex flex-col justify-between group hover:border-[#F5A623]/25 transition-all duration-300"
              id={`testimonial-card-${review.id}`}
            >
              {/* Gold Quote Mark top-left */}
              <div className="text-[#F5A623]/20 absolute top-6 left-6 group-hover:text-[#F5A623]/30 transition-colors pointer-events-none z-0">
                <Quote className="h-10 w-10 shrink-0" />
              </div>

              <div className="relative z-10 pt-8">
                {/* 5 Golden Stars rating */}
                <div className="flex items-center gap-1.5 mb-6" id={`stars-rating-${review.id}`}>
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-[#F5A623] text-[#F5A623] shrink-0" />
                  ))}
                </div>

                <p className="font-sans text-sm text-white/80 leading-relaxed italic mb-8">
                  "{review.quote}"
                </p>
              </div>

              {/* Author signature footer block */}
              <div className="flex items-center gap-4 border-t border-[#1F1F1F] pt-6 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center font-display font-bold text-xs text-[#F5A623] border border-[#F5A623]/15 group-hover:border-[#F5A623]/35 transition-colors shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-display font-medium text-sm text-white leading-none">
                    {review.author}
                  </h4>
                  <p className="font-sans text-xs text-gray-400 mt-1">
                    {review.role} — <span className="text-[#F5A623]">{review.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
