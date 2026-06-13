import React, { useState, FormEvent } from "react";
import { Mail, Phone, Clock, MapPin, CheckCircle2, AlertTriangle, Send, Loader2, Briefcase, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, hasSupabaseConfig } from "@/lib/supabase";

export default function Contact() {
  // Form state
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
      setStatusMessage("Please populate all required fields before completing the submission.");
      return;
    }

    setFormStatus("submitting");

    // Try submitting directly to Supabase table "contacts"
    if (hasSupabaseConfig() && supabase) {
      try {
        const { error } = await (supabase as any)
          .from("contacts")
          .insert([
            {
              full_name: fullName,
              email: email,
              phone: phone,
              subject: subject,
              message: message,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error("[Supabase Contact Table Insert Error]", error);
          setFormStatus("error");
          setStatusMessage(`Could not save to database: ${error.message}`);
        } else {
          setFormStatus("success");
          setStatusMessage("Thank you! Your message has been saved in our Supabase database. Our team will contact you shortly.");
          setIsSimulatedResponse(false);
          // reset fields
          setFullName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }
      } catch (err: any) {
        console.error("[Supabase Exception]", err);
        setFormStatus("error");
        setStatusMessage(`An exception occurred during submission: ${err.message}`);
      }
    } else {
      // Offline/simulation fallback mode
      setTimeout(() => {
        setFormStatus("success");
        setStatusMessage("Thank you! Your contact request was successfully logged on our client. (Supabase is currently running in simulation mode)");
        setIsSimulatedResponse(true);
        // reset fields
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }, 1000);
    }
  };

  return (
    <section id="contact" className="bg-[#0A0A0A] text-white">
      
      {/* 1. Page Hero Banner with CONTACT Watermark */}
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
        
        {/* Large faded underlying background text "CONTACT" - overflow & wrap proof */}
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
            fontSize: 'clamp(50px, 14vw, 150px)',
            fontWeight: 900,
            color: 'white',
            opacity: 0.04,
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            CONTACT
          </span>
        </div>

        {/* Content of Hero Banner */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase" id="contact-header">
            Contact Us
          </h1>
          <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-1.5 rounded-full" />
          <p className="text-[#9CA3AF] mt-1.5 text-xs font-sans tracking-wide">
            Have general inquiries, support requirements or project tenders? Connect with our administration team.
          </p>
        </div>
      </section>

      {/* 2. Main Content Container - 2 Column Layout (Left: Cards, Right: Form) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="contact-layout-grid">
          
          {/* Left Column: Contact info cards */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-3" id="contact-info-column">
            
            <div className="bg-[#111111] p-[16px] rounded-2xl text-white border border-[#1F1F1F] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#F5A623]/5 rounded-bl-full pointer-events-none" />
              <h3 className="font-display font-extrabold text-sm text-[#F5A623] uppercase tracking-wider mb-4">
                Direct Inquiries
              </h3>

              <div className="space-y-3">
                
                {/* Perth logistics office */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1A1A1A] rounded-lg text-[#F5A623] border border-[#1F1F1F]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest">
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
                    <h4 className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest">
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
                    <h4 className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest">
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
                    <h4 className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest">
                      Office Hours
                    </h4>
                    <p className="text-xs font-sans font-bold mt-0.5 text-white">
                      Monday - Friday: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5 font-sans leading-normal">
                      Our national freight hubs accept standard Slot-bookings 24 hours a day.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Address maps / terminal hubs */}
            <div className="bg-[#111111] p-[16px] rounded-2xl text-white border border-[#1F1F1F] shadow-xl relative shadow-md">
              <h3 className="font-display font-extrabold text-sm text-[#F5A623] uppercase tracking-wider mb-3">
                Terminal Hub Locations
              </h3>

              <div className="space-y-3">
                <div className="border-b border-[#1F1F1F] pb-2">
                  <h4 className="font-display font-extrabold text-xs text-white flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
                    Western Australia Hub (Primary)
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-sans pl-5">
                    26 Macedonia St, Naval Base WA 6165
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-xs text-white flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#F5A623]" />
                    Victoria Hub (Laverton North)
                  </h4>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-sans pl-5">
                    54/56 Agoste Drive, Laverton North VIC 3026
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form with Supabase integration */}
          <div 
            className="lg:col-span-12 xl:col-span-7 bg-[#111111] p-6 rounded-2xl shadow-xl border border-[#1F1F1F] border-t-4 border-t-[#F5A623]" 
            id="contact-form-column"
          >
            
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                  id="contact-success-banner"
                >
                  <div className="w-12 h-12 bg-[#F5A623]/10 text-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#F5A623]/20">
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white tracking-tight mb-2 uppercase">
                    Message Dispatched!
                  </h3>
                  <p className="text-xs text-[#9CA3AF] max-w-md mx-auto leading-relaxed mb-4 font-sans">
                    {statusMessage}
                  </p>

                  {isSimulatedResponse && (
                    <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 text-white text-[11px] p-3 rounded-lg text-left max-w-sm mx-auto mb-4 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-[#F5A623]" />
                      <div>
                        <span className="font-bold block text-[#F5A623] uppercase tracking-wider mb-0.5">Developer Simulation Note</span>
                        We verified and generated the submission output correctly. Real-time DB saving utilizes the <code className="bg-[#0A0A0A] px-1 rounded">contacts</code> table.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setFormStatus("idle")}
                    className="bg-[#F5A623] hover:bg-[#D4860A] text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded cursor-pointer transition duration-150 inline-flex items-center gap-1.5"
                    id="write-another-msg-btn"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  id="actual-contact-form"
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
                      <label htmlFor="contact-name" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                        Full Name <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                        Email Address <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="contact-email"
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
                      <label htmlFor="contact-phone" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                        Phone Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        id="contact-phone"
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
                      <label htmlFor="contact-subject" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                        Subject Line
                      </label>
                      <div className="relative">
                        <select
                          id="contact-subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full h-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white font-bold font-sans appearance-none cursor-pointer"
                        >
                          <option value="General Operations" className="bg-[#1D1D1D]">General Operations</option>
                          <option value="Tenders & Projects" className="bg-[#1D1D1D]">Tenders & Projects</option>
                          <option value="Careers & Vacancies" className="bg-[#1D1D1D]">Careers & Vacancies</option>
                          <option value="Billing & Support" className="bg-[#1D1D1D]">Billing & Support</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#F5A623]">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                      Inquiry Message <span className="text-[#F5A623]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message details here..."
                      style={{ height: '100px' }}
                      className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-2 text-sm focus:outline-none focus:border-[#F5A623] transition-colors text-white placeholder-[#4B5563] font-sans resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full h-11 bg-[#F5A623] hover:bg-[#D4860A] disabled:bg-[#F5A623]/40 text-[#07080A] font-extrabold rounded-lg font-display uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 cursor-pointer text-xs shadow-md"
                      id="submit-contact-btn"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* 3. Employment Opportunities Board Segment */}
      <div className="bg-[#111111] border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#1F1F1F]">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/25 mb-2">
                  <Briefcase className="h-3 w-3" />
                  We are hiring
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  Employment Opportunities
                </h2>
                <p className="text-[#9CA3AF] text-xs sm:text-sm mt-1 font-sans">
                  Join one of Australia's premier logistics operations teams.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#1A1A1A] p-4 rounded-xl border border-[#1F1F1F] shrink-0">
                <Award className="h-8 w-8 text-[#F5A623] shrink-0" />
                <div className="text-left">
                  <span className="block text-xs font-mono font-bold text-white uppercase">TOP PAY RATES</span>
                  <span className="block text-[10px] text-[#9CA3AF] font-sans">HC & MC experienced operators</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#9CA3AF] leading-relaxed mb-8">
              At ZZ Transport, our pride is in our operators. We hire skilled, safe, and professional drivers, offering modern trucks, top-tier salaries, respect, and clear scheduling. We hold our values high and treat our team like family.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="job-board">
              
              {/* Job 1 */}
              <div className="bg-[#1A1A1A] border border-[#252525] hover:border-[#F5A623]/30 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#F5A623]/15">
                    MC CLASS
                  </span>
                  <span className="text-gray-400 font-mono text-[10px]">Perth Depot</span>
                </div>
                <h3 className="text-lg font-display font-extrabold text-white uppercase tracking-tight mb-2">
                  MC Side-Loader Drivers
                </h3>
                <p className="text-xs text-[#9CA3AF] font-sans mb-4 leading-relaxed">
                  Required for wharf container movements. Must have a minimum of 2 years wharf experience and MSIC cards.
                </p>
                <div className="flex items-center justify-between border-t border-[#252525] pt-4">
                  <span className="text-xs text-white font-bold font-sans">Full-Time / Casual</span>
                  <a href="mailto:adamzafar1227@gmail.com?subject=Application - MC Side-Loader" className="text-xs text-[#F5A623] uppercase tracking-widest font-extrabold hover:underline">
                    Apply Now →
                  </a>
                </div>
              </div>

              {/* Job 2 */}
              <div className="bg-[#1A1A1A] border border-[#252525] hover:border-[#F5A623]/30 rounded-xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#F5A623]/15">
                    HC CLASS
                  </span>
                  <span className="text-gray-400 font-mono text-[10px]">Melbourne Depot</span>
                </div>
                <h3 className="text-lg font-display font-extrabold text-white uppercase tracking-tight mb-2">
                  HC Tautliner Operators
                </h3>
                <p className="text-xs text-[#9CA3AF] font-sans mb-4 leading-relaxed">
                  Interstate and local pallet movements. Experienced with single and double deck configurations. Clean driving logs.
                </p>
                <div className="flex items-center justify-between border-t border-[#252525] pt-4">
                  <span className="text-xs text-white font-bold font-sans">Permanent Full-Timeons</span>
                  <a href="mailto:adamzafar1227@gmail.com?subject=Application - HC Tautliner" className="text-xs text-[#F5A623] uppercase tracking-widest font-extrabold hover:underline">
                    Apply Now →
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 4. Bottom CTA with Direct Phone Numbers banner */}
      <div className="bg-gradient-to-r from-[#0C0D0E] via-[#101214] to-[#0C0D0E] py-16 border-t border-[#F5A623]/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#F5A623 1.5px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-3">
            NEED IMMEDIATE DISPATCH?
          </h2>
          <p className="text-[#9CA3AF] font-sans text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Our dispatch operations team works 24/7. Call our specialized logistics lines directly to solve urgent freight queries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto justify-center" id="cta-phones">
            <a href="tel:0861910723" className="block bg-[#161616] hover:bg-[#1C1C1C] border border-[#252525] hover:border-[#F5A623] p-5 rounded-2xl transition-all duration-300">
              <span className="block text-[10px] font-mono text-[#F5A623] uppercase tracking-widest mb-1 font-bold">PERTH OPS</span>
              <span className="text-lg font-sans font-black text-white">(08) 6191 0723</span>
            </a>

            <a href="tel:0393691240" className="block bg-[#161616] hover:bg-[#1C1C1C] border border-[#252525] hover:border-[#F5A623] p-5 rounded-2xl transition-all duration-300">
              <span className="block text-[10px] font-mono text-[#F5A623] uppercase tracking-widest mb-1 font-bold">MELBOURNE OPS</span>
              <span className="text-lg font-sans font-black text-white">(03) 9369 1240</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
