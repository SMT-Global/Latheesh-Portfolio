"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const { experience } = portfolioData;

  return (
    <section id="experience" ref={containerRef} className="relative py-32 bg-gray-100 overflow-hidden">
      {/* Concrete Background Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-[0.03]"
      >
        <div 
          className="w-full h-[150%] bg-cover bg-center grayscale"
          style={{ backgroundImage: "url('/concrete.jpg')" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Sticky Left Column */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <div className="font-mono text-gray-500 text-sm tracking-widest mb-6 uppercase">02 // Experience</div>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-none text-black mb-8">
              FIELD<br/>REALITY.
            </h2>
            <div className="w-12 h-1 bg-[#ff5a00] mb-8"></div>
            <p className="text-gray-600 font-body text-lg">
              Bridging design and execution. From site inspections across New York State to developing digital twins for NYC pumping stations.
            </p>
          </div>
        </div>

        {/* Scrolling Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-8 pt-12 lg:pt-0">
          {experience.map((exp, idx) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 relative overflow-hidden"
              >
                {/* Structural line accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-[#0044cc] transition-colors duration-300"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-black">{exp.role}</h3>
                    <div className="font-body font-semibold text-[#0044cc] mt-1">{exp.company} - {exp.location}</div>
                  </div>
                  <div className="font-mono text-xs text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1 border border-gray-200">
                    {exp.period}
                  </div>
                </div>

                <ul className="flex flex-col gap-3">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 font-body leading-relaxed">
                      <span className="text-[#ff5a00] mt-1 text-xs">■</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
