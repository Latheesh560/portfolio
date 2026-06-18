import React, { useRef, useState, useCallback } from 'react';
import stackImage from '../assets/about/image.png';
import reactImage from '../assets/about/react.png';
import nodeImage from '../assets/about/node.png';
import pythonImage from '../assets/about/Python.png';
import sqlImage from '../assets/about/sql.png';
import mongoImage from '../assets/about/mongodb.png';

const TiltCard = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateX(${y * -intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`);
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const About = () => {
  const skillIcons = [
    { src: reactImage, alt: 'React' },
    { src: nodeImage, alt: 'Node.js' },
    { src: pythonImage, alt: 'Python' },
    { src: sqlImage, alt: 'SQL' },
    { src: mongoImage, alt: 'MongoDB' },
  ];

  const skillTags = [
    'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Express.js',
    'Git', 'GitHub', 'VS Code', 'Excel Add-Ins (VSTO)'
  ];

  const certifications = [
    { title: 'AI Foundations Associate', org: 'Oracle' },
    { title: 'Excel Data Analysis', org: 'IBM (via edX)' },
    { title: 'Certificate of Excellence, Student Ambassador', org: 'Alcheringa, IIT Guwahati' },
  ];

  return (
    <section id="about" className="bg-[#0B0C10] pt-20 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans border-b border-white/5">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#00ffcc]/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start relative z-10">
        
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0 relative">
          
          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] rounded-[100px] blur-[80px] opacity-40 z-0 animate-pulse"></div>
            
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-[#1a1b26] transform -translate-x-1/2 shadow-inner z-0"></div>
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-400 rounded border border-gray-500 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]"></div>
            
            <TiltCard intensity={12} className="w-full max-w-[280px]">
              <div className="bg-[#1f2029]/80 backdrop-blur-xl border border-white/10 w-full rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative z-20 transform -rotate-3 hover:rotate-0 transition-all duration-500 overflow-hidden group/badge">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] group-hover/badge:left-[200%] transition-all duration-1000 z-30 pointer-events-none"></div>
                <div className="absolute -top-3 left-1/2 w-16 h-6 bg-[#0B0C10] rounded-t-xl transform -translate-x-1/2 flex justify-center items-center border border-white/5 border-b-0">
                  <div className="w-8 h-2 bg-black/60 rounded-full shadow-inner"></div>
                </div>
                <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 border border-white/10 relative group">
                  <img 
                    src={stackImage}
                    alt="About me"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TiltCard>
          </div>

        </div>

        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          
          <h2 className="text-4xl md:text-5xl font-outfit font-black text-white mb-6 tracking-tight">Hello!</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl mb-8 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-all duration-300">
            <p className="text-lg font-medium mb-6 leading-relaxed max-w-3xl text-gray-300">
              Hi, my name is <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] text-2xl font-black mx-1 tracking-wide uppercase">Latheesh</span>. I am a B.Tech graduate in Electrical and Electronics Engineering from Sri Venkateswara University (2026), currently working as a <span className="text-white font-semibold">Programmer Intern at Business Data AI</span>.
            </p>
            <p className="text-lg font-medium leading-relaxed max-w-3xl text-gray-400">
              Skilled in <span className="text-white">React.js</span>, <span className="text-white">JavaScript (ES6+)</span>, <span className="text-white">Python</span>, <span className="text-white">SQL</span>, and <span className="text-white">PostgreSQL</span>. I develop full-stack projects and am passionate about building scalable, user-friendly web applications.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl mb-8 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-all duration-300 group">
            <h3 className="text-2xl font-outfit font-black text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1.5 bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] rounded-full group-hover:w-12 transition-all duration-300"></span>
              Education
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-[#00ffcc] pl-5 relative">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#00ffcc] rounded-full shadow-[0_0_10px_#00ffcc]"></div>
                <h4 className="text-xl font-bold text-white tracking-tight">B.Tech - Electrical & Electronics Engineering</h4>
                <p className="text-sm font-medium text-gray-400 mt-1">Sri Venkateswara University, Tirupati | GPA: 6.5/10 <span className="text-[#00b8ff] font-bold ml-2">(2022 - 2026)</span></p>
              </div>
              <div className="border-l-2 border-white/20 pl-5 relative">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-white/30 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-200 tracking-tight">Intermediate (MPC)</h4>
                <p className="text-sm font-medium text-gray-400 mt-1">Rayalaseema Junior College, Sri Kalahasti | GPA: 7.29/10 <span className="text-gray-500 ml-2">(2020 - 2022)</span></p>
              </div>
              <div className="border-l-2 border-white/20 pl-5 relative">
                <div className="absolute -left-[5px] top-2 w-2 h-2 bg-white/30 rounded-full"></div>
                <h4 className="text-lg font-bold text-gray-200 tracking-tight">SSC - Class X</h4>
                <p className="text-sm font-medium text-gray-400 mt-1">Z.P. High School, Anjuru | GPA: 9.8/10 <span className="text-gray-500 ml-2">(2016 - 2020)</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl mb-8 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-all duration-300 group">
            <h3 className="text-2xl font-outfit font-black text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1.5 bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] rounded-full group-hover:w-12 transition-all duration-300"></span>
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 text-[#00ffcc] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                  <div>
                    <span className="text-white font-semibold">{cert.title}</span>
                    <span className="text-gray-400"> — {cert.org}</span>
                    {cert.year && <span className="text-[#00b8ff] font-bold ml-2">({cert.year})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-xl mb-8 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,204,0.1)] transition-all duration-300 group">
            <h3 className="text-2xl font-outfit font-black text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1.5 bg-gradient-to-r from-[#00ffcc] to-[#00b8ff] rounded-full group-hover:w-12 transition-all duration-300"></span>
              Technical Skills
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript (ES6+)', 'Python', 'SQL'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-white/[0.04] text-gray-200 border border-white/[0.08] text-sm font-bold rounded-xl hover:bg-[#00ffcc]/15 hover:text-[#00b8ff] hover:border-[#00ffcc]/30 transition-all duration-300 cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'HTML5', 'CSS3', 'Bootstrap'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-white/[0.04] text-gray-200 border border-white/[0.08] text-sm font-bold rounded-xl hover:bg-[#00ffcc]/15 hover:text-[#00b8ff] hover:border-[#00ffcc]/30 transition-all duration-300 cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Backend & Databases</p>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-white/[0.04] text-gray-200 border border-white/[0.08] text-sm font-bold rounded-xl hover:bg-[#00ffcc]/15 hover:text-[#00b8ff] hover:border-[#00ffcc]/30 transition-all duration-300 cursor-default">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tools & Other</p>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'VS Code', 'Visual Studio', 'Excel Add-Ins (VSTO)'].map((s) => (
                    <span key={s} className="px-4 py-2 bg-white/[0.04] text-gray-200 border border-white/[0.08] text-sm font-bold rounded-xl hover:bg-[#00ffcc]/15 hover:text-[#00b8ff] hover:border-[#00ffcc]/30 transition-all duration-300 cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-4 flex-wrap">
            {skillIcons.map((skill, i) => (
              <div 
                key={skill.alt}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md animate-float skill-icon-3d"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <img 
                  data-aos="zoom-in"
                  src={skill.src} 
                  alt={skill.alt} 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl" 
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="absolute top-10 right-10 md:right-20 text-[#00ffcc] opacity-20 animate-pulse">
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
      <div className="absolute bottom-20 left-4 md:left-20 text-[#00b8ff] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;
