export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a192f] text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <a href="#hero" className="font-display font-bold text-xl tracking-tighter uppercase flex items-center gap-2">
          <span className="w-6 h-6 bg-[#00e5ff] text-black flex items-center justify-center text-xs font-mono">
            LR
          </span>
          LATHEESH REDDY
        </a>

        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
          © {year} · Architectural Design & Digital Twins
        </div>

        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
          <a href="#projects" className="hover:text-[#00e5ff] transition-colors">Work</a>
          <a href="/admin" className="hover:text-[#00e5ff] transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  );
}
