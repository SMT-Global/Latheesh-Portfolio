"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Resume", href: "#resume" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center py-[18px] px-[7%] bg-[#f7f5f0]/90 backdrop-blur-md border-b border-[#dedbd3]">
        <a href="#home" className="flex items-center gap-[12px] text-[1.35rem] font-bold tracking-[-0.04em] z-50">
          <span className="w-8 h-8 bg-[#151515] text-white flex items-center justify-center text-xs font-mono tracking-widest">LR</span>
          <span>Latheesh</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-[28px] text-[0.9rem] text-[#6f6f6f]">
          {links.map(link => (
            <a key={link.name} href={link.href} className="hover:text-[#151515] transition-colors">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden z-50 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-[2px] bg-[#151515] transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-[9px]' : 'w-6'}`}></span>
            <span className={`h-[2px] bg-[#151515] transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`h-[2px] bg-[#151515] transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-[9px]' : 'w-5'}`}></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#f7f5f0] flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col gap-8 text-center">
              {links.map(link => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[2rem] font-display font-medium text-[#151515] hover:text-[#9b7a4f] transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
