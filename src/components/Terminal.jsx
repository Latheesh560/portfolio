import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Latheesh OS v1.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const commands = {
    help: 'Available commands: help, about, skills, contact, clear, whoami',
    about: 'I am Valmeti Latheesh, a Full Stack Developer building scalable web apps.',
    skills: 'React.js, Node.js, Python, PostgreSQL, MongoDB, Express.',
    contact: 'Email: latheeshvalmeti226@gmail.com | Phone: +91-9110788265',
    whoami: 'guest_user_1337',
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `C:\\Users\\Guest> ${cmd}` }];

    if (cmd === 'clear') {
      setHistory([]);
    } else if (commands[cmd]) {
      newHistory.push({ type: 'output', text: commands[cmd] });
      setHistory(newHistory);
    } else {
      newHistory.push({ type: 'error', text: `'${cmd}' is not recognized as an internal or external command.` });
      setHistory(newHistory);
    }

    setInput('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 left-6 w-12 h-12 bg-[#0B0C10] border border-[#00ffcc]/30 rounded-full flex items-center justify-center text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.2)] hover:shadow-[0_0_25px_rgba(0,255,204,0.5)] z-[9990] transition-shadow duration-300 backdrop-blur-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Open Terminal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 left-6 w-[350px] sm:w-[450px] h-[300px] bg-[#050505]/95 backdrop-blur-xl border border-[#00ffcc]/30 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[9990] flex flex-col overflow-hidden font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="bg-[#1a1b26] border-b border-[#00ffcc]/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00ffcc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M4 17h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300 font-bold text-xs tracking-wider">Terminal</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                title="Close"
              />
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#00ffcc]/30 scrollbar-track-transparent"
            >
              <div className="space-y-2 mb-2">
                {history.map((item, index) => (
                  <div key={index} className={`
                    ${item.type === 'system' ? 'text-gray-400' : ''}
                    ${item.type === 'user' ? 'text-white font-bold' : ''}
                    ${item.type === 'output' ? 'text-[#00ffcc]' : ''}
                    ${item.type === 'error' ? 'text-red-400' : ''}
                    break-words
                  `}>
                    {item.text}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="flex items-center text-[#00ffcc] mt-2">
                <span className="mr-2 shrink-0">C:\Users\Guest&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#00ffcc] w-full font-mono shadow-none focus:ring-0 p-0 m-0"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
