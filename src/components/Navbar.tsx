import { useState, useEffect } from "react";
import { Menu, X, Search, Bookmark, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./TransitionLink";
import { useTransitionRouter } from "./PageTransition";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentPath, navigate } = useTransitionRouter();
  const isHome = currentPath === "#home" || currentPath === "" || currentPath === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Fleet", href: "#fleet" },
    { name: "About Us", href: "#about-us" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-[#0A0A0A]/95 backdrop-blur-md py-2 border-b border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left section: logo container & text links */}
          <div className="flex items-center gap-1 sm:gap-6">
            
            {/* Logo Link containing the gold square & brand title */}
            <TransitionLink
              href="#home"
              className="flex items-center gap-3 group select-none mr-2 sm:mr-4"
              id="navbar-logo-link"
            >
              <div className="bg-[#F5A623] hover:bg-[#D4860A] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-display font-black text-white text-xl sm:text-2xl uppercase transition-all duration-300 transform group-hover:scale-105">
                ZZ
              </div>
              <div className="flex flex-col text-left leading-none">
                <span 
                  className="font-display text-white tracking-wider leading-none"
                  style={{ fontSize: '15px', fontWeight: 800 }}
                >
                  TRANSPORT
                </span>
                <span 
                  className="font-sans text-white/90 font-medium tracking-widest leading-none mt-1"
                  style={{ fontSize: '11px' }}
                >
                  PTY LTD
                </span>
              </div>
            </TransitionLink>

            {/* Flat links row for desktop */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {links.map((link) => (
                <TransitionLink
                  key={link.name}
                  href={link.href}
                  className="font-sans text-[11px] sm:text-xs font-bold text-gray-300 hover:text-white transition-colors duration-200 uppercase tracking-widest relative py-2"
                  id={`nav-link-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Right section: utility search & REQUEST A QUOTE gold button */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-sans text-gray-300">
            
            {/* Search utility */}
            <div className="relative flex items-center gap-1.5 cursor-pointer hover:text-[#F5A623] transition-colors group select-none">
              <Search className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#F5A623]" />
              <span className="uppercase tracking-widest font-bold text-[11px]">Search</span>
            </div>

            {/* REQUEST A QUOTE button */}
            <button
              onClick={() => navigate("#contact")}
              className="bg-[#F5A623] hover:bg-[#D4860A] text-[#07080A] font-sans font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              Request a Quote &rarr;
            </button>

          </div>

          {/* Mobile hamburger trigger for responsive views */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/90 hover:text-[#F5A623] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-hamburger"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#07080A]/95 backdrop-blur-md border-t border-white/[0.05] overflow-hidden"
            id="mobile-nav-drawer-container"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {links.map((link) => (
                <TransitionLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-sans text-xs font-bold text-gray-300 hover:text-[#F5A623] hover:bg-white/[0.03] px-3 py-3 rounded transition-all uppercase tracking-widest"
                  id={`nav-link-mobile-${link.name.toLowerCase().replace(" ", "-")}`}
                >
                  {link.name}
                </TransitionLink>
              ))}
              
              {/* Mobile utilities list & action button */}
              <div className="pt-4 border-t border-white/[0.05] space-y-4">
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-400">
                  <Search className="h-3.5 w-3.5" />
                  <span>SEARCH GOODS</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("#contact");
                  }}
                  className="w-full bg-[#F5A623] hover:bg-[#D4860A] text-[#07080A] font-sans font-bold text-xs uppercase tracking-wider py-3 rounded text-center active:scale-95 transition-all duration-300 block"
                >
                  Request a Quote &rarr;
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
