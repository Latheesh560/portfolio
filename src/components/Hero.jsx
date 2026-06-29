import React, { useRef, useEffect, useState, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero video/welcome.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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
      if (isMuted) {
        // Unmute and restart the reel with sound
        setIsMuted(false);
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        // Toggle play/pause normally if already unmuted
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
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

      {/* Gradients for readability of navbar and bottom controls while keeping video center bright */}
      <div className="absolute top-0 left-0 w-full h-[25%] bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Content arranged at the bottom */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-6 md:pb-8 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-6">
        
        {/* Left Spacer to balance the Play Reel button on the right (hidden on mobile) */}
        <div className="hidden md:block w-24"></div>

        {/* Center: Clean Controls */}
        <div className="flex flex-col items-center text-center max-w-2xl w-full">
          {/* Buttons */}
          <div 
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-4"
          >
            <button 
              onClick={() => scrollTo('projects')}
              className="group relative px-8 py-3 text-sm rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] text-black font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden shadow-[0_0_30px_rgba(0,255,204,0.4)] hover:shadow-[0_0_50px_rgba(0,255,204,0.7)] w-full sm:w-auto flex justify-center"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] group-hover:left-[200%] transition-all duration-700"></div>
            </button>
            
            <button 
              onClick={() => scrollTo('contact')}
              className="group px-8 py-3 text-sm rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer w-full sm:w-auto flex justify-center"
            >
              Contact Me
            </button>
            
            <a 
              href="/VALMETI_LATHEESH_RESUME.pdf" 
              download="VALMETI_LATHEESH_RESUME.pdf"
              className="group px-8 py-3 text-sm rounded-full bg-transparent border border-[#00ffcc] text-[#00ffcc] font-semibold hover:bg-[#00ffcc] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Resume
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </div>

          {/* Stats */}
          <div 
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex items-center justify-center gap-6 font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-[#00ffcc]">2+</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            <div className="text-center flex items-center gap-2">
              <span className="text-lg font-black text-[#00ffcc]">5+</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Technologies</span>
            </div>
          </div>
        </div>

        {/* Right: Play Video */}
        <div 
          data-aos="zoom-in"
          data-aos-delay="500"
          className="flex flex-row md:flex-col items-center gap-2 md:gap-3 cursor-pointer group self-center md:self-end relative w-24 justify-end"
          onClick={toggleVideo}
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 bg-black/30 backdrop-blur-xl flex justify-center items-center group-hover:scale-110 group-hover:bg-[#00ffcc] group-hover:border-[#00ffcc] group-hover:text-black transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_50px_rgba(0,255,204,0.6)] z-10 text-white">
            <div className="absolute inset-0 rounded-full border-2 border-[#00ffcc]/50 animate-[ping_2s_ease-in-out_infinite] opacity-30"></div>
            {!isPlaying || isMuted ? (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            )}
          </div>
          <span className="text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {!isPlaying || isMuted ? "Play Reel" : "Pause"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
