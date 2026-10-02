"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Résumé", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-4 glass-panel border-b border-black/5" : "py-8 bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#hero" className="font-display font-bold text-xl tracking-tighter uppercase flex items-center gap-2 text-black">
            <span className="w-6 h-6 bg-[#0044cc] text-white flex items-center justify-center text-xs font-mono">
              LR
            </span>
            LATHEESH
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors relative group ${
                  scrolled ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-full h-[1px] scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left ${scrolled ? "bg-[#0044cc]" : "bg-white"}`}></span>
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden font-mono text-xs uppercase tracking-widest ${scrolled ? "text-[#0044cc]" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="font-display text-4xl font-black uppercase tracking-tighter text-black hover:text-[#0044cc] transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
