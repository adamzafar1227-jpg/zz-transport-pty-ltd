import { MapPin, Phone, Clock, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Coverage() {
  const locations = [
    {
      id: "perth",
      city: "Perth, Western Australia",
      address: "26 Macedonia St Naval Base 6165",
      phone: "(08) 6191 0723",
      services: ["Ocean Freight", "Air Freight", "Storage", "Fremantle Port Clearance", "Sideloaders Fleet"],
      hours: "Mon - Fri: 8:00am - 6:00pm",
      code: "WAR",// West Coast Router
      latitude: "-32.2212",
      longitude: "115.7871"
    },
    {
      id: "melbourne",
      city: "Melbourne, Victoria",
      address: "54/56 Agosta Drive Laverton North 3026",
      phone: "(03) 936 91240",
      services: ["Air Freight", "Storage", "Distribution", "Port of Melbourne Cartage", "Cross-Docking"],
      hours: "Mon - Fri: 8:00am - 6:00pm",
      code: "VIC",// East Coast Hub
      latitude: "-37.8136",
      longitude: "144.9631"
    }
  ];

  return (
    <section id="locations" className="py-24 bg-lightGray relative overflow-hidden text-navy">
      <div className="absolute top-1/2 left-10 w-48 h-48 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold font-mono text-xs font-bold uppercase tracking-widest block mb-1">
            - Logistics Centers
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight uppercase" id="coverage-title">
            Our Coverage Areas
          </h2>
          <div className="w-20 h-1.5 bg-gold mx-auto mt-4 rounded-full" />
          <p className="max-w-xl mx-auto text-textGray mt-4 text-sm">
            Strategically positioned hubs on the East and West coasts of Australia to manage container storage, unpacks, and dispatch routes seamlessly.
          </p>
        </div>

        {/* 2 Cards side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="coverage-grid">
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-navy/5 relative overflow-hidden flex flex-col justify-between group hover:border-gold/30 transition-all duration-300"
              id={`coverage-card-${loc.id}`}
            >
              {/* Outer decorative airport tag */}
              <div className="absolute top-4 right-4 bg-navy/5 px-3 py-1 rounded font-mono text-xs font-bold text-navy/40 uppercase tracking-widest group-hover:bg-gold/15 group-hover:text-gold transition-colors">
                ZZ - {loc.code}
              </div>

              <div>
                {/* Header info */}
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-lg bg-navyMid flex items-center justify-center border border-gold/25 text-gold">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-navy">
                      {loc.city}
                    </h3>
                    <p className="font-mono text-[11px] text-textGray tracking-wide">
                      Lat: {loc.latitude} | Lon: {loc.longitude}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono font-bold text-textGray uppercase tracking-widest">Office Address</p>
                      <p className="text-sm font-sans font-medium text-navy/95 mt-0.5">{loc.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono font-bold text-textGray uppercase tracking-widest">Direct Phone Line</p>
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="text-sm font-sans font-semibold text-navy hover:text-gold transition-colors mt-0.5 block">{loc.phone}</a>
                    </div>
                  </div>

                  {/* Operational Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-mono font-bold text-textGray uppercase tracking-widest">Business Hours</p>
                      <p className="text-sm font-sans text-navy/85 mt-0.5">{loc.hours}</p>
                    </div>
                  </div>
                </div>

                {/* Services Block */}
                <div className="border-t border-navy/5 pt-6">
                  <p className="text-xs font-mono font-bold text-textGray uppercase tracking-widest mb-3">Service Focus & Assets</p>
                  <div className="flex flex-wrap gap-2">
                    {loc.services.map((serv, idx) => (
                      <span
                        key={idx}
                        className="bg-navyMid/5 text-navyMid font-sans text-xs font-semibold px-2.5 py-1 rounded-md border border-navyMid/10 flex items-center gap-1.5"
                      >
                        <ShieldCheck className="h-3 w-3 text-gold" />
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom direct route request link */}
              <div className="mt-8 pt-4 border-t border-navy/5 flex justify-between items-center bg-navy/[0.02] p-4 rounded-xl">
                <span className="text-xs font-medium text-textGray flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
                  Standard Dispatch Enabled
                </span>
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      // Prepopulate field if reference exists (standard react form hook handles this via state)
                      const originInput = document.getElementById("quote-origin") as HTMLInputElement;
                      if (originInput) {
                        originInput.value = loc.id === "perth" ? "Perth WA Office" : "Melbourne VIC Office";
                        originInput.dispatchEvent(new Event("change", { bubbles: true }));
                      }
                    }
                  }}
                  className="font-display font-bold text-xs uppercase tracking-wider text-navy hover:text-gold flex items-center gap-1"
                  id={`coverage-btn-${loc.id}`}
                >
                  Book Route
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic National Freight Corridor Graphic in between */}
        <div className="mt-12 bg-navy rounded-2xl p-8 relative overflow-hidden border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between text-white md:gap-8">
          <div className="absolute inset-0 bg-radial-at-cl opacity-4 pointer-events-none" />
          <div className="relative z-10 max-w-xl mb-6 md:mb-0">
            <h3 className="font-display text-lg sm:text-xl font-bold text-gold tracking-tight mb-2">
              National Trans-Continental Lanes
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              We connect Western Australia (Fremantle Wharf/Naval Base) and Victoria (Laverton North) through 
              regular interstate transit corridors. Secure cross-docking operations maintain high frequency.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gold hover:bg-goldDark text-navy font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-lg flex items-center gap-2"
              id="corridor-route-btn"
            >
              Order Interstate Cargo
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
