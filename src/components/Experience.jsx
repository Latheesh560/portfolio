import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

const TagCard = ({ number, title, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-80 md:w-[450px] rounded-[2rem] p-[1px] relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 z-10 ${className} ${
        isActive ? 'bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] shadow-[0_0_40px_rgba(255,65,108,0.4)]' : 'bg-white/10 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,65,108,0.2)]'
      }`}
    >
      <div className={`w-full h-full rounded-[2rem] p-8 flex flex-col min-h-[220px] transition-colors duration-700 ${
        isActive ? 'bg-[#15161c]' : 'bg-[#0B0C10] backdrop-blur-xl'
      }`}>
        <span className={`text-sm font-bold mb-2 font-serif italic transition-colors duration-700 ${
          isActive ? 'text-[#ff416c]' : 'text-gray-400'
        }`}>{number}</span>
        
        <h3 className={`text-2xl font-outfit font-black mb-4 tracking-tight transition-colors duration-700 ${
          isActive ? 'text-white' : 'text-gray-200'
        }`}>{title}</h3>
        
        <div className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
          isActive ? 'text-gray-300' : 'text-gray-500'
        }`}>
          {text}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="bg-[#0B0C10] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px] border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto relative md:h-[900px]">
        
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-white/10 rounded-full px-5 py-1.5 text-sm text-gray-300 font-bold mb-8 shadow-sm bg-white/5 backdrop-blur-md">
            Experience
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black text-white leading-[1.1] mb-6 tracking-tight relative">
            My Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff416c] to-[#ff4b2b]">Journey</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-sm font-medium leading-relaxed">
            Hands-on experience in full-stack development and data science, working with modern web technologies.
          </p>
        </div>

        <svg 
          className="hidden md:block absolute top-0 left-0 w-full h-[900px] pointer-events-none z-0" 
          viewBox="0 0 1000 900" 
          preserveAspectRatio="none"
        >
          <path 
            id="timeline-path"
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950" 
            fill="none" 
            stroke="#ffffff10" 
            strokeWidth="3" 
          />
          <mask id="path-mask">
            <motion.path 
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950" 
              fill="none" 
              stroke="white" 
              strokeWidth="20" 
              style={{ pathLength }}
            />
          </mask>
          <path 
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950" 
            fill="none" 
            stroke="#ff416c" 
            strokeWidth="4" 
            mask="url(#path-mask)"
            style={{ filter: "drop-shadow(0px 0px 15px rgba(255, 65, 108, 0.8))" }}
          />
        </svg>

        <svg 
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          <path d="M 2,0 L 2,100" fill="none" stroke="#ffffff10" strokeWidth="4" vectorEffect="non-scaling-stroke" />
          <mask id="path-mask-mobile">
            <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
          </mask>
          <path d="M 2,0 L 2,100" fill="none" stroke="#ff416c" strokeWidth="4" mask="url(#path-mask-mobile)" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0px 0px 10px rgba(255, 65, 108, 0.8))" }} />
        </svg>

        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          
          <TagCard 
            number="March 2026 - Present"
            title="Programmer Intern @ Business Data AI"
            text={
              <ul className="list-none space-y-3">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Developed and integrated spreadsheet functionalities in a React-based SaaS application using Excel Add-Ins, enhancing sheet-level features for end users.</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Connected PostgreSQL databases with the application, enabling data retrieval, complex table joins, and hierarchical data representation within spreadsheets.</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Performed application testing and validation — gained hands-on experience in UI functionality, software workflows, and quality assurance.</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Collaborated with cross-functional teams through daily stand-ups and weekly meetings following Agile practices.</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Maintained codebase using Git and GitHub for version control and team collaboration throughout the development lifecycle.</li>
              </ul>
            }
            className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-2 md:rotate-6"
            aosType="fade-left"
            aosDelay="100"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TagCard 
            number="Jul 2025 - Sep 2025"
            title="Data Science Intern @ Nyeras"
            text={
              <ul className="list-none space-y-3">
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Performed data analysis and exploratory data analysis (EDA) on real datasets using Python (Pandas, NumPy).</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Visualised findings and insights using Matplotlib and Seaborn for clear data-driven storytelling.</li>
                <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#ff416c] before:rounded-full before:shadow-[0_0_8px_#ff416c]">Earned a completion certificate for outstanding performance at Nyeras Edu-Tech And Innovations Pvt. Ltd.</li>
              </ul>
            }
            className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] -rotate-2 md:-rotate-6"
            aosType="fade-right"
            aosDelay="200"
            pathLength={pathLength}
            containerRef={containerRef}
          />

        </div>

      </div>
    </section>
  );
};

export default Experience;
