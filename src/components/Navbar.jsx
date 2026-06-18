import React, { useState, useEffect, useRef, useCallback } from 'react';
import profilePic from '../assets/about/ProfilePic.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

        {/* Right Side: CTA Button & Profile Dropdown */}
        <div className="hidden md:flex items-center gap-5">
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 backdrop-blur-md"
          >
            Hire Me
          </a>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full border-2 border-[#00ffcc]/30 overflow-hidden focus:outline-none focus:border-[#00ffcc] hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-300 cursor-pointer"
            >
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute right-0 mt-3 w-56 bg-[#12131a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-top-right ${isDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <div className="p-5 border-b border-white/10 flex flex-col items-center bg-gradient-to-b from-[#00ffcc]/10 to-transparent">
                <div className="w-14 h-14 rounded-full border-2 border-[#00ffcc]/50 overflow-hidden mb-3 shadow-[0_0_15px_rgba(0,255,204,0.3)]">
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <p className="text-white font-black text-base font-outfit tracking-tight">Valmeti Latheesh</p>
                <p className="text-[#00ffcc] text-xs font-mono mt-0.5">@Latheesh560</p>
              </div>
              <div className="py-2">
                <a href="https://github.com/Latheesh560" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-[#00ffcc] hover:bg-white/5 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="https://linkedin.com/in/valmeti-latheesh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-[#00ffcc] hover:bg-white/5 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
                <a href="/VALMETI_LATHEESH_RESUME.pdf" download className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-[#00ffcc] hover:bg-white/5 transition-colors border-t border-white/5 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
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
