import React, { useRef, useEffect, useState, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero video/WhatsApp Video 2026-06-08 at 12.15.37 PM - Copy.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  }, []);

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted={isMuted}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Simple gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/40 to-transparent z-10 pointer-events-none"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">
        
        {/* Left: Text with 3D parallax */}
        <div 
          className="flex flex-col items-start text-left max-w-2xl w-full"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
            transition: 'transform 0.3s ease-out',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Eyebrow tag */}
          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff416c]/30 bg-[#ff416c]/10 backdrop-blur-md mb-6"
            style={{ transform: 'translateZ(40px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff416c] animate-pulse shadow-[0_0_10px_#ff416c]"></span>
            <span className="text-xs font-bold text-[#ff416c] tracking-widest uppercase">Available for Work</span>
          </div>

          {/* Main Heading with shimmer */}
          <h1 
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white text-4xl md:text-6xl lg:text-7xl font-outfit font-black mb-6 tracking-tighter leading-[1.05]"
            style={{ transform: 'translateZ(30px)' }}
          >
            Hi, I'm Valmeti<br />Latheesh,
            <br />a{' '}
            <span className="hero-gradient-text">
              Full Stack
              <br className="md:hidden" /> Developer
            </span>
          </h1>

          {/* Subheading */}
          <p 
            data-aos="fade-up"
            data-aos-delay="250"
            className="text-gray-300 text-sm md:text-lg font-medium mb-10 max-w-md leading-relaxed"
            style={{ transform: 'translateZ(20px)' }}
          >
            I build fast, scalable and modern web applications using{' '}
            <span className="text-white font-semibold">React</span>,{' '}
            <span className="text-white font-semibold">Node.js</span>,{' '}
            <span className="text-white font-semibold">Python</span>,{' '}
            <span className="text-white font-semibold">PostgreSQL</span> and{' '}
            <span className="text-white font-semibold">MongoDB</span>.
          </p>

          {/* Buttons */}
          <div 
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-4 w-full"
            style={{ transform: 'translateZ(15px)' }}
          >
            <button 
              onClick={() => scrollTo('projects')}
              className="group relative px-7 py-3 md:px-9 md:py-3.5 text-sm md:text-base rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden shadow-[0_0_30px_rgba(255,65,108,0.4)] hover:shadow-[0_0_50px_rgba(255,65,108,0.7)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
              {/* Button shine sweep */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[25deg] group-hover:left-[200%] transition-all duration-700"></div>
            </button>
            
            <button 
              onClick={() => scrollTo('contact')}
              className="group px-7 py-3 md:px-9 md:py-3.5 text-sm md:text-base rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Contact Me
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </button>
            
            <a 
              href="/resume.pdf" 
              download
              className="group px-7 py-3 md:px-9 md:py-3.5 text-sm md:text-base rounded-full bg-transparent border border-[#ff416c] text-[#ff416c] font-semibold hover:bg-[#ff416c] hover:text-white hover:shadow-[0_0_30px_rgba(255,65,108,0.3)] transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              Resume
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </div>

          <div 
            data-aos="fade-up"
            data-aos-delay="550"
            className="flex items-center gap-8 mt-10"
            style={{ transform: 'translateZ(10px)' }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">2+</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">Projects</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">5+</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">Technologies</div>
            </div>
          </div>
        </div>

        {/* Right: Play Video */}
        <div 
          data-aos="zoom-in"
          data-aos-delay="600"
          className="mt-8 md:mt-0 flex flex-row md:flex-col items-center gap-2 md:gap-3 cursor-pointer group self-start md:self-auto relative"
          onClick={toggleVideo}
        >
          <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-xl flex justify-center items-center group-hover:scale-110 group-hover:bg-[#ff416c] group-hover:border-[#ff416c] transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_50px_rgba(255,65,108,0.6)] z-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#ff416c]/50 animate-[ping_2s_ease-in-out_infinite] opacity-30"></div>
            {!isPlaying || isMuted ? (
              <svg className="w-5 h-5 md:w-7 md:h-7 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            )}
          </div>
          <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {!isPlaying || isMuted ? "Play Reel" : "Pause"}
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none flex-col items-center gap-2">
        <span className="text-[10px] text-white/40 font-medium tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
