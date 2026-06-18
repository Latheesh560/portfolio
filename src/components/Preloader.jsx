import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment between 1 and 15
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#050505] z-[100000] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          <div className="relative z-10 w-full max-w-md px-8">
            {/* Top terminal bar */}
            <div className="flex items-center gap-2 mb-10 opacity-60">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-4 text-xs text-gray-500 tracking-widest uppercase">System Initialization</span>
            </div>

            {/* Main Logo Text */}
            <motion.div 
              className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-10 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-gray-700 mr-4 font-mono font-light text-3xl md:text-5xl">&lt;</span>
              Latheesh
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="text-[#00ffcc] ml-1 font-mono"
              >_</motion.span>
              <span className="text-gray-700 ml-4 font-mono font-light text-3xl md:text-5xl">/&gt;</span>
            </motion.div>

            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono text-gray-400">
                <span>Loading Assets...</span>
                <span className="text-[#00ffcc]">{Math.min(progress, 100)}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-[2px] w-full bg-gray-800 rounded-full overflow-hidden relative">
                {/* Animated Progress Bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Technical logs */}
              <div className="h-16 overflow-hidden mt-6 text-xs text-gray-600 font-mono leading-relaxed">
                <motion.div
                  animate={{ y: [0, -24, -48, -72] }}
                  transition={{ duration: 2.2, times: [0, 0.3, 0.6, 1], ease: "steps(4)" }}
                  className="space-y-2"
                >
                  <p>&gt; Initializing core modules...</p>
                  <p>&gt; Compiling UI components...</p>
                  <p>&gt; Establishing secure connection...</p>
                  <p>&gt; Resolving dependencies...</p>
                  <p className="text-[#00ffcc]">&gt; System ready.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
