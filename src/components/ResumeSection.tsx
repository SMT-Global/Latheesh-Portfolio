"use client";

import { motion } from "framer-motion";

export default function ResumeSection({ resumeUrl }: { resumeUrl: string }) {
  return (
    <section id="resume" className="relative py-24 px-[7%]">
      <div className="max-w-[1400px] mx-auto border-t border-[#dedbd3] pt-24">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column - Text */}
          <div className="flex flex-col sticky top-32">
            <div className="font-mono text-[#9b7a4f] text-[0.8rem] tracking-[0.12em] mb-4 uppercase font-bold">05 // Résumé</div>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none tracking-[-0.06em] mb-6 text-[#151515] font-medium">
              The Blueprint.
            </h2>
            <p className="text-[#6f6f6f] text-[1.1rem] mb-8 leading-relaxed max-w-md">
              A comprehensive overview of my professional experience, education, and technical competencies in construction management and digital integration.
            </p>
            
            <div className="h-[1px] w-full max-w-xs bg-gradient-to-r from-[#dedbd3] to-transparent mb-10"></div>
            
            {resumeUrl && (
              <div>
                <a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-6 px-6 py-4 bg-[#151515] text-white border border-[#151515] hover:bg-transparent hover:text-[#151515] transition-all duration-300 w-full max-w-[280px]"
                >
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.15em] font-semibold">Download PDF</span>
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/30 group-hover:border-[#151515]/30 transition-colors">
                    <svg className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Right Column - PDF Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative group"
          >
            {/* Architectural Layered Frame */}
            <div className="absolute -inset-2 md:-inset-4 bg-transparent border border-[#dedbd3] rounded-2xl -z-10 transition-transform duration-500 group-hover:-rotate-1"></div>
            <div className="absolute -inset-2 md:-inset-4 bg-[#f7f5f0] opacity-50 rounded-2xl -z-20"></div>

            <div className="w-full bg-white border border-[#dedbd3] rounded-xl overflow-hidden h-[75vh] min-h-[500px] max-h-[850px] flex items-center justify-center p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-10">
              {resumeUrl ? (
                <iframe
                  src={resumeUrl.includes("drive.google.com/file/d/") ? `${resumeUrl.replace(/\/view.*$/, "/preview")}` : resumeUrl}
                  className="w-full h-full bg-white rounded-lg border border-[#dedbd3]/50"
                  title="Latheesh Reddy Resume"
                />
              ) : (
                <div className="text-[#6f6f6f] font-mono text-sm tracking-widest uppercase">
                  Resume not uploaded yet
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
