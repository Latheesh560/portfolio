import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0C10] text-[#C5C6C7] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/5 relative overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-[#ff416c]/5 to-transparent blur-[100px] pointer-events-none"></div>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium relative z-10">
        <div className="flex flex-col gap-1.5">
          <p className="text-white/80">Full Stack Web Development</p>
          <p>React, Node.js, Python</p>
          <p>PostgreSQL, MongoDB</p>
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-center">
          <p className="text-white/80">Open to Opportunities</p>
          <a href="#projects" className="inline-flex items-center gap-1 underline hover:text-[#ff416c] transition-colors mt-1 underline-offset-4 decoration-1 group">
            View Projects
            <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
        
        <div className="flex flex-col gap-1.5 md:items-end">
          <p className="text-white/80">Based in India 🇮🇳</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden relative z-10 pointer-events-none">
        <h2 className="text-[18vw] md:text-[14vw] leading-none font-sans font-black tracking-tighter uppercase select-none w-full text-center hero-gradient-text opacity-20" style={{ filter: 'none' }}>
          Latheesh
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium relative z-10">
        <div className="flex flex-col gap-4">
          <a href="#contact" className="inline-flex items-center gap-2 text-white hover:text-[#ff416c] transition-colors font-bold group">
            <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all"></span>
            Contact
          </a>
          <p className="text-white/40 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Valmeti Latheesh · Built with React + Three.js
          </p>
        </div>
        
        <div className="flex flex-col gap-3 md:items-center">
          <a href="mailto:latheeshvalmeti226@gmail.com" className="hover:text-[#ff416c] transition-colors lowercase">latheeshvalmeti226@gmail.com</a>
          <div className="flex gap-4 mt-1">
            <a href="https://linkedin.com/in/valmeti-latheesh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff416c] transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://github.com/Latheesh560" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff416c] transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <a href="#home" className="hover:text-[#ff416c] transition-colors group inline-flex items-center gap-2 font-bold">
            Back to Top
            <svg className="w-3 h-3 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
