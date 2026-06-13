import { Facebook, Twitter, ArrowUp, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0D0D0D] text-white pt-16 pb-0 border-t border-[#1F1F1F] relative overflow-hidden" id="footer">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12" id="footer-grid">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleScrollTo("#home"); }}
              className="inline-flex items-center gap-3 group"
              id="footer-brand"
            >
              <div className="bg-[#F5A623] px-2 py-0.5 rounded font-display font-black text-black text-lg tracking-tighter transition-all duration-300 hover:bg-[#D4860A]">
                ZZ
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-xs tracking-wider leading-none">
                  TRANSPORT
                </span>
                <span className="font-sans text-[8px] text-[#F5A623] font-medium tracking-widest leading-none mt-0.5">
                  PTY LTD
                </span>
              </div>
            </a>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs">
              Your trusted logistics partner across Australia. Providing end-to-end global transport expertise with local handling intelligence in Western Australia and Victoria.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/ZZ-Transport-710069642377823/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#F5A623] hover:text-black text-white transition-all flex items-center justify-center border border-white/5 active:scale-95"
                aria-label="Visit us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/ZZ-Transport-710069642377823/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#F5A623] hover:text-black text-white transition-all flex items-center justify-center border border-white/5 active:scale-95"
                aria-label="Visit us on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#F5A623] uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Home", href: "#home" },
                { name: "Our Services", href: "#services" },
                { name: "Why Us", href: "#why-us" },
                { name: "Locations", href: "#locations" },
                { name: "Request Quote", href: "#contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
                    className="text-gray-400 hover:text-[#F5A623] transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#F5A623] uppercase tracking-widest mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { name: "Ocean Freight Transportation", href: "#services" },
                { name: "Air Freight Transportation", href: "#services" },
                { name: "Unpack & Store Services", href: "#services" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleScrollTo(link.href); }}
                    className="text-gray-400 hover:text-[#F5A623] transition-colors block py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-[#F5A623] uppercase tracking-widest mb-3">
              Contact Us
            </h4>
            
            <div className="space-y-3.5 text-xs sm:text-sm">
              {/* Perth */}
              <div>
                <p className="font-bold text-white text-xs uppercase font-mono tracking-widest text-[#F5A623]">Perth Terminal</p>
                <p className="text-gray-400 mt-1 flex items-start gap-1.5 leading-tight">
                  <MapPin className="h-3.5 w-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                  26 Macedonia St Naval Base 6165
                </p>
                <p className="text-gray-400 mt-1 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#F5A623] shrink-0" />
                  Ph: <a href="tel:0861910723" className="hover:text-[#F5A623] transition-colors">(08) 6191 0723</a>
                </p>
              </div>

              {/* Melbourne */}
              <div>
                <p className="font-bold text-white text-xs uppercase font-mono tracking-widest text-[#F5A623]">Melbourne Terminal</p>
                <p className="text-gray-400 mt-1 flex items-start gap-1.5 leading-tight">
                  <MapPin className="h-3.5 w-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                  54/56 Agosta Drive Laverton North 3026
                </p>
                <p className="text-gray-400 mt-0.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#F5A623] shrink-0" />
                  Ph: <a href="tel:0393691240" className="hover:text-[#F5A623] transition-colors">(03) 936 91240</a>
                </p>
              </div>

              {/* Email */}
              <div className="pt-1">
                <p className="font-bold text-white text-xs uppercase font-mono tracking-widest text-[#F5A623]">General Enquiries</p>
                <p className="text-gray-400 mt-1 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#F5A623] shrink-0" />
                  <a href="mailto:transport@zztransport.com.au" className="hover:text-[#F5A623] transition-colors break-all">
                    transport@zztransport.com.au
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#080808] border-t border-white/5 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-gray-400">
          <div>
            Copyright © 2024 ZZ Transport Pty Ltd. All rights reserved.
          </div>
          
          {/* Back to top selector */}
          <div>
            <button
              onClick={() => handleScrollTo("#home")}
              className="flex items-center gap-1 hover:text-[#F5A623] group uppercase tracking-widest font-bold text-[10px]"
              aria-label="Scroll back to top of page"
              id="back-to-top-footer-btn"
            >
              Back to Top
              <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
