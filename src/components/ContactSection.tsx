"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { portfolioData } from "@/data/portfolio";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { personal } = portfolioData;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      if (res.ok) {
        setFormState("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0a192f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="font-mono text-[#00e5ff] text-sm tracking-widest mb-6 uppercase">06 // Contact</div>
          <h2 className="font-display text-[4rem] md:text-[5rem] font-black uppercase leading-[0.9] tracking-tighter mb-8">
            LET&apos;S<br/>BUILD.
          </h2>
          <p className="font-body text-lg max-w-md mb-12 text-gray-400">
            Open to discussing new projects, internship opportunities, or partnerships in construction management and digital twins.
          </p>

          <div className="flex flex-col gap-6 font-mono text-sm tracking-widest uppercase">
            <a href={`mailto:${personal.email}`} className="flex items-center gap-4 hover:text-[#00e5ff] transition-colors">
              <span className="w-8 h-[1px] bg-current"></span>
              {personal.email}
            </a>
            <a href={`tel:+1${personal.phone}`} className="flex items-center gap-4 hover:text-[#00e5ff] transition-colors">
              <span className="w-8 h-[1px] bg-current"></span>
              {personal.phone}
            </a>
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#00e5ff] transition-colors">
                <span className="w-8 h-[1px] bg-current"></span>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white text-black p-8 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Name</label>
              <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-200 py-3 px-4 font-body text-base focus:outline-none focus:border-[#0044cc] focus:bg-white transition-colors" placeholder="Jane Doe" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Email</label>
              <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-200 py-3 px-4 font-body text-base focus:outline-none focus:border-[#0044cc] focus:bg-white transition-colors" placeholder="jane@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Message</label>
              <textarea name="message" required rows={4} className="w-full bg-gray-50 border border-gray-200 py-3 px-4 font-body text-base focus:outline-none focus:border-[#0044cc] focus:bg-white transition-colors resize-none" placeholder="Tell me about your project..." />
            </div>

            <button type="submit" disabled={formState === "sending"} className="self-start mt-2 px-8 py-4 bg-[#0044cc] text-white font-mono text-sm font-bold uppercase tracking-widest hover:bg-[#003399] transition-colors">
              {formState === "idle" && "Send Message"}
              {formState === "sending" && "Sending..."}
              {formState === "sent" && "Received."}
              {formState === "error" && "Error. Retry."}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
