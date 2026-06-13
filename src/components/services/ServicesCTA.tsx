import React from "react";

export default function ServicesCTA() {
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback for non-homepage scenarios using router Hash location changing
      window.location.hash = "#contact";
    }
  };

  return (
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
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center shadow-lg shadow-[#F5A623]/10 hover:shadow-[#F5A623]/25 active:scale-95"
            id="cta-request-quote-btn"
          >
            Request a Quote
          </a>
          
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="w-full sm:w-auto border border-[#F5A623] hover:bg-[#F5A623]/10 text-[#F5A623] font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 text-center active:scale-95"
            id="cta-contact-us-btn"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
