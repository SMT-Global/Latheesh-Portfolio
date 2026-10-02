"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function AboutSection() {
  const { education } = portfolioData;

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Col */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              className="h-[4px] bg-[#ff5a00] mb-8"
            />
            <div className="font-mono text-gray-500 text-sm tracking-widest mb-6 uppercase">01 // About</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight mb-8 text-black">
              BRIDGING THE GAP BETWEEN DESIGN & REALITY.
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-gray-600 font-body text-lg leading-relaxed"
            >
              With a foundation in Architecture from India and advanced studies in Construction Management at NYU, I integrate Building Information Modeling (BIM) with real-world infrastructure management. I specialize in developing Digital Twins that breathe life into static blueprints, enabling data-driven decisions that shape the future of urban infrastructure.
            </motion.p>
          </div>
        </div>

        {/* Right Col - Education */}
        <div className="lg:col-span-7 flex flex-col gap-12 pt-12 lg:pt-0">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative pl-8 border-l-2 border-gray-200 hover:border-[#0044cc] transition-colors duration-500"
            >
              <div className="absolute left-[-7px] top-0 w-3 h-3 bg-gray-200 rounded-none group-hover:bg-[#0044cc] group-hover:scale-125 transition-all duration-500"></div>
              
              <div className="font-mono text-xs text-gray-500 tracking-widest mb-2">{edu.period}</div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 uppercase text-black">{edu.degree}</h3>
              <div className="text-[#0044cc] font-body text-lg mb-4 font-semibold">{edu.institution}</div>
              
              <div className="text-gray-600 font-mono text-sm mt-4 bg-gray-50 inline-block px-3 py-1 border border-gray-100">
                GPA: {edu.gpa}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
