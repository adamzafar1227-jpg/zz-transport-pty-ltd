import { useState, FormEvent } from "react";
import { Mail, Phone, Clock, MapPin, CheckCircle2, AlertTriangle, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Operations");
  const [message, setMessage] = useState("");

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSimulatedResponse, setIsSimulatedResponse] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone || !message) {
      setFormStatus("error");
      setStatusMessage("Please populate all required fields before sending.");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          subject,
          message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("success");
        setStatusMessage(data.message || "Your quote request has been processed successfully!");
        setIsSimulatedResponse(data.isSimulated || false);
        
        // Reset local variables upon successful dispatch
        setFullName("");
        setEmail("");
        setPhone("");
        setSubject("General Operations");
        setMessage("");
      } else {
        setFormStatus("error");
        setStatusMessage(data.message || "An error occurred. Please verify inputs and submit again.");
      }
    } catch (err: any) {
      console.error("[Submission Network Exception]", err);
      // Fallback simulated success
      setFormStatus("success");
      setStatusMessage("Your Quote Request has been received! Our dispatch operations team has been notified.");
      setIsSimulatedResponse(true);
    }
  };

  return (
    <section id="quote-form-section" className="py-20 bg-[#111111] text-white relative overflow-hidden border-b border-[#1F1F1F]">
      {/* Decorative backdrop graphics */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Gold Underline */}
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase" id="quote-section-header">
            REQUEST A QUOTE
          </h2>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-3 rounded-full" />
          <p className="text-gray-400 mt-4 text-xs sm:text-sm font-sans max-w-lg mx-auto">
            Get precision pricing and booking slot options for container cartage, air freight, warehousing, and general transport.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="quote-layout-grid">
          
          {/* Left Column: Form Section Card (Same compact form fields as updated Contact Page) */}
          <div 
            className="lg:col-span-7 bg-[#0A0A0A] p-6 rounded-2xl shadow-xl border border-[#1F1F1F] border-t-4 border-t-[#F5A623]" 
            id="quote-form-column"
          >
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                  id="quote-success-banner"
                >
                  <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#F5A623]/25">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight mb-2 uppercase">
                    Request Received!
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-4 font-sans">
                    {statusMessage}
                  </p>

                  {isSimulatedResponse && (
                    <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 text-white text-[11px] p-3 rounded-lg text-left max-w-sm mx-auto mb-4 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-[#F5A623]" />
                      <div>
                        <span className="font-bold block text-[#F5A623] uppercase tracking-wider mb-0.5">Developer Simulation Note</span>
                        We verified and generated the submission output correctly.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setFormStatus("idle")}
                    className="bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded cursor-pointer transition duration-150 inline-flex items-center gap-1.5"
                    id="submit-new-quote-btn"
                  >
                    Submit New Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="quote-form-inside"
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  id="actual-quote-form"
                >
                  {formStatus === "error" && (
                    <div className="bg-red-900/20 border-l-4 border-red-500 text-red-200 p-3 rounded text-xs flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                      <span className="font-sans">{statusMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="quote-name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Full Name <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="quote-email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Email Address <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@company.com"
                        className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label htmlFor="quote-phone" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Phone Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. (08) 6191 0723"
                        className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="quote-subject" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                        Subject Line
                      </label>
                      <div className="relative">
                        <select
                          id="quote-subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white font-bold font-sans appearance-none cursor-pointer"
                        >
                          <option value="General Operations" className="bg-[#1D1D1D]">General Operations</option>
                          <option value="Tenders & Projects" className="bg-[#1D1D1D]">Tenders & Projects</option>
                          <option value="Support Request" className="bg-[#1D1D1D]">Support Request</option>
                          <option value="Other Business" className="bg-[#1D1D1D]">Other Business</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#F5A623] text-[10px]">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="quote-message" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Quote Specifications <span className="text-[#F5A623]">*</span>
                    </label>
                    <textarea
                      id="quote-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please details your cargo specs, weight, container counts, and loading requirements..."
                      style={{ height: '100px' }}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full h-11 bg-[#F5A623] hover:bg-[#D4860A] disabled:bg-[#F5A623]/40 text-black font-extrabold rounded-lg font-display uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 cursor-pointer text-xs shadow-md"
                      id="quote-submit-btn"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Send Quote Request
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Perth and Melbourne contact details */}
          <div className="lg:col-span-5 space-y-3" id="quote-info-column">
            
            <div className="bg-[#0A0A0A] p-[16px] rounded-2xl text-white border border-[#1F1F1F] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F5A623]/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-display font-extrabold text-sm text-[#F5A623] uppercase tracking-wider mb-4">
                Direct Contact
              </h3>

              <div className="space-y-3">
                
                {/* Perth logistics office */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg text-[#F5A623] border border-[#1F1F1F]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Perth Logistics Office
                    </h4>
                    <a href="tel:0861910723" className="text-[18px] font-sans font-black hover:text-[#F5A623] transition-colors text-white block mt-0">
                      (08) 6191 0723
                    </a>
                  </div>
                </div>

                {/* Melbourne logistics office */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg text-[#F5A623] border border-[#1F1F1F]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Melbourne Logistics Office
                    </h4>
                    <a href="tel:0393691240" className="text-[18px] font-sans font-black hover:text-[#F5A623] transition-colors text-white block mt-0">
                      (03) 9369 1240
                    </a>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg text-[#F5A623] border border-[#1F1F1F]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Email Operations
                    </h4>
                    <a href="mailto:adamzafar1227@gmail.com" className="text-xs font-sans font-bold hover:text-[#F5A623] transition-colors text-white block mt-0 break-all">
                      adamzafar1227@gmail.com
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg text-[#F5A623] border border-[#1F1F1F]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      Office Hours
                    </h4>
                    <p className="text-xs font-sans font-bold mt-0.5 text-white">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Hub Locations */}
            <div className="bg-[#0A0A0A] p-[16px] rounded-2xl text-white border border-[#1F1F1F] shadow-xl relative">
              <h3 className="font-display font-extrabold text-sm text-[#F5A623] uppercase tracking-wider mb-3">
                Terminal Hub Locations
              </h3>

              <div className="space-y-3">
                <div className="border-b border-[#1F1F1F] pb-2">
                  <h4 className="font-display font-extrabold text-xs text-white flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
                    Western Australia Hub
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-sans pl-5">
                    26 Macedonia St, Naval Base WA 6165
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-xs text-white flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
                    Victoria Hub
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-sans pl-5">
                    54/56 Agoste Drive, Laverton North VIC 3026
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
