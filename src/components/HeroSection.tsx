"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";

export default function HeroSection() {
  const { personal } = portfolioData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-20 px-6 md:px-12 bg-black">
      
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Overlay for text readability */}
        <div 
          className="w-full h-[120%] bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto flex flex-col gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-4 text-white font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4">
            <span className="w-12 h-[1px] bg-white"></span>
            Digital Twin & BIM Specialist
          </div>
          <h1 className="font-display text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-white uppercase m-0 p-0">
            {personal.firstName} <br /> {personal.lastName}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 md:mt-10 max-w-2xl border-l-2 border-[#0044cc] pl-6 py-2 glass-panel-dark"
        >
          <p className="font-body text-base md:text-xl text-white/90 leading-relaxed font-light">
            {personal.tagline}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-6 items-start"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-[#0044cc] text-white font-mono text-sm uppercase tracking-[0.15em] font-bold overflow-hidden">
            <span className="relative z-10 transition-colors duration-300">Explore Work</span>
            <div className="absolute inset-0 bg-black translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"></div>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-4 z-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 w-full h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
