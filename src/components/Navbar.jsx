import React, { useState, useEffect, useRef, useCallback } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll to make navbar more solid
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'projects', 'contact'];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isOpen 
          ? 'bg-[#0B0C10]/95 backdrop-blur-2xl border-b border-white/10 py-4'
          : isScrolled 
            ? 'bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' 
            : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Logo/Name */}
        <div className="flex items-center">
          <a href="#home" className="text-white text-2xl font-black tracking-tight font-mono">
            Latheesh<span className="text-[#00ffcc] animate-pulse">_</span>
          </a>
        </div>

        {/* Center: Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a 
                key={link} 
                href={`#${id}`}
                className={`font-medium relative group transition-colors duration-300 ${
                  isActive 
                    ? 'text-[#00ffcc]' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link}
                {/* Active / hover underline */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,204,0.5)] ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            );
          })}
        </div>

        {/* Right Side: CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 backdrop-blur-md"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] py-4 opacity-100 bg-[#0B0C10]/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b border-white/10' : 'max-h-0 opacity-0 bg-transparent'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a 
                key={link} 
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className={`font-bold text-lg border-b border-white/10 pb-2 transition-colors ${
                  isActive ? 'text-[#00ffcc]' : 'text-white hover:text-[#00ffcc]'
                }`}
              >
                {link}
              </a>
            );
          })}
          <div className="pt-4 pb-2">
             <a 
               href="#contact" 
               onClick={() => setIsOpen(false)} 
               className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] text-black font-black hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all duration-300 w-full text-center"
             >
               Hire Me
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
