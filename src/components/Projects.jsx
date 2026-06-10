import React, { useRef, useCallback, useState } from 'react';
import sheshieldImage from '../assets/projects/sheshield.png';
import studentImage from '../assets/projects/student.png';

const ProjectCard = ({ title, stack, features, githubLink, liveLink, image, aosDelay, index }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg)');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [borderGlow, setBorderGlow] = useState({});

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -15;
    const tiltY = (x - 0.5) * 15;
    
    setTransform(`perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlareStyle({
      opacity: 0.2,
      background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,65,108,0.3), transparent 50%)`,
    });
    setBorderGlow({
      boxShadow: `${(x - 0.5) * 30}px ${(y - 0.5) * 30}px 60px rgba(255, 65, 108, 0.15), 0 0 20px rgba(255, 65, 108, 0.1)`
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
    setBorderGlow({});
  }, []);

  return (
    <div
      ref={cardRef}
      data-aos="fade-up" 
      data-aos-delay={aosDelay}
      className="transition-all duration-500 ease-out will-change-transform"
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="glow-card bg-[#12131a]/80 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] hover:border-[#ff416c]/30 transition-all duration-500 relative group overflow-hidden flex flex-col h-full"
        style={borderGlow}
      >
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-500"
          style={glareStyle}
        ></div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ff416c]/10 to-transparent pointer-events-none rounded-tr-3xl z-0"></div>

        <div className="absolute top-6 right-6 text-[80px] font-black text-white/[0.03] leading-none pointer-events-none z-0 select-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
          0{index + 1}
        </div>

        {image && (
          <div className="relative w-full h-48 md:h-56 mb-6 rounded-2xl overflow-hidden z-10 border border-white/5" style={{ transform: 'translateZ(30px)' }}>
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12131a] via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        )}

        <div className="relative z-10 flex justify-between items-start mb-5" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl md:text-2xl font-outfit font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ff416c] group-hover:to-[#ff4b2b] transition-all duration-500 tracking-tight leading-tight pr-4">{title}</h3>
          <div className="flex gap-2">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all duration-300 p-2.5 bg-white/5 rounded-xl hover:bg-[#ff416c] hover:shadow-[0_0_20px_rgba(255,65,108,0.4)] shrink-0" title="Source Code">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all duration-300 p-2.5 bg-white/5 rounded-xl hover:bg-[#ff416c] hover:shadow-[0_0_20px_rgba(255,65,108,0.4)] shrink-0" title="Live Demo">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            )}
          </div>
        </div>
        
        <div className="relative z-10 flex flex-wrap gap-2 mb-6" style={{ transform: 'translateZ(15px)' }}>
          {stack.map((tech, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/[0.04] text-gray-300 border border-white/[0.08] text-[11px] font-bold rounded-lg hover:bg-[#ff416c]/15 hover:text-[#ff6b9d] hover:border-[#ff416c]/30 transition-all duration-300 cursor-default">
              {tech}
            </span>
          ))}
        </div>
        
        <ul className="relative z-10 space-y-3 text-gray-400 font-medium list-none flex-1" style={{ transform: 'translateZ(10px)' }}>
          {features.map((feature, idx) => (
            <li key={idx} className="leading-relaxed text-[13px] md:text-sm flex items-start gap-3 group/item">
              <svg className="w-4 h-4 text-[#ff416c] shrink-0 mt-0.5 opacity-60 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="group-hover/item:text-gray-300 transition-colors">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0B0C10] py-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-white/5">
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#ff416c]/8 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#c850c0]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-1.5 text-sm text-gray-300 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-md">
            <svg className="w-4 h-4 text-[#ff416c]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-outfit font-black text-white tracking-tight mb-4">
            Featured <span className="hero-gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto font-medium">
            Real-world applications built with modern technologies and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <ProjectCard 
            aosDelay="100"
            index={0}
            title="SheShield — Women Safety Platform"
            image={sheshieldImage}
            stack={['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Leaflet', 'REST APIs']}
            githubLink="https://github.com/Latheesh560"
            liveLink="https://women-safety-kappa.vercel.app/"
            features={[
              "Full-stack platform with SOS alerts, emergency contact notifications, fake calls, and incident reporting.",
              "OpenStreetMap-based navigation and safe-route recommendations using Leaflet and location-based APIs.",
              "Real-time community interactions and alerts using Socket.IO for instant communication.",
              "Secure user authentication, profile management, and community story sharing features.",
              "RESTful APIs with MongoDB, Express.js, and Node.js for scalable data management."
            ]}
          />
          <ProjectCard 
            aosDelay="250"
            index={1}
            title="Student Management System"
            image={studentImage}
            stack={['HTML', 'Bootstrap', 'JavaScript', 'PostgreSQL', 'SQL']}
            githubLink="https://github.com/Latheesh560"
            features={[
              "System to manage student records, course information, and academic performance tracking.",
              "CRUD operations, student search/filter functionality, and marks management using PostgreSQL.",
              "Responsive UI with Bootstrap and normalized relational database schema with constraints.",
              "Dashboard with student statistics, academic summaries, and performance metrics."
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
