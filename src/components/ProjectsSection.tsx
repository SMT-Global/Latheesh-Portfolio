"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="mb-20">
        <div className="font-mono text-gray-500 text-sm tracking-widest mb-6 uppercase">03 // Selected Work</div>
        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none text-black">
          DIGITAL TWINS & INFRASTRUCTURE.
        </h2>
        <div className="w-12 h-1 bg-[#0044cc] mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
            className="group block bg-gray-50 border border-gray-100 hover:border-[#0044cc] transition-colors duration-300"
          >
            {/* Visual placeholder - Architectural aesthetic */}
            <div className="w-full h-48 md:h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div className="font-mono text-6xl text-gray-200 font-bold opacity-50 select-none">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="absolute inset-0 bg-[#0044cc] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10"></div>
            </div>

            <div className="p-8">
              <div className="font-mono text-xs text-[#ff5a00] tracking-widest uppercase mb-4">
                {project.category}
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-4 text-black group-hover:text-[#0044cc] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 font-body text-base leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
                {project.tools.map(tool => (
                  <span key={tool} className="font-mono text-[10px] text-gray-500 uppercase tracking-widest bg-white border border-gray-200 px-2 py-1">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
