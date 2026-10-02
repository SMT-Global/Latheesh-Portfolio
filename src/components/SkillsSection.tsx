"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function SkillsSection() {
  const { skills } = portfolioData;

  const technical = skills.filter((s) => s.category === "technical");
  const competency = skills.filter((s) => s.category === "competency");
  const certs = skills.filter((s) => s.category === "certification");

  const renderSkillGroup = (title: string, list: typeof skills, delayOffset: number) => (
    <div className="flex flex-col gap-6">
      <h3 className="font-mono text-sm text-[#0044cc] tracking-widest uppercase border-b border-gray-200 pb-4 font-bold">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {list.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delayOffset + i * 0.05 }}
            className="px-4 py-2 bg-white border border-gray-200 font-body text-sm text-gray-700 hover:border-[#ff5a00] hover:text-black transition-colors shadow-sm"
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20">
          <div className="font-mono text-gray-500 text-sm tracking-widest mb-6 uppercase">04 // Capabilities</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none text-black">
            TECHNICAL TOOLKIT.
          </h2>
          <div className="w-12 h-1 bg-[#ff5a00] mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {renderSkillGroup("Software & Tools", technical, 0)}
          {renderSkillGroup("Core Competencies", competency, 0.2)}
          {renderSkillGroup("Certifications", certs, 0.4)}
        </div>
      </div>
    </section>
  );
}
