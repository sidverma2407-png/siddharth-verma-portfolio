import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  status: 'booting' | 'ready' | 'deployed';
  onDeploy: () => void;
  onRecruiterMode: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ status, onDeploy, onRecruiterMode }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status === 'ready' && e.key === 'Enter') {
        onDeploy();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, onDeploy]);

  return (
    <div className="relative w-full h-screen bg-black text-green-500 font-mono p-8 flex flex-col justify-center items-center overflow-hidden">
      <div className="scanlines"></div>
      <div className="grain"></div>
      
      <div className="absolute top-8 left-8 text-xs opacity-70">
        <p>INITIALIZING SECURE CONNECTION...</p>
        <p>LOADING OPERATOR PROFILE...</p>
        <p>ESTABLISHING NEURAL LINK...</p>
        <p>SYSTEM {status === 'booting' ? 'BOOTING...' : 'READY.'}</p>
      </div>

      <div className="flex flex-col items-center text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold tracking-widest text-white mb-2"
        >
          SIDDHARTH VERMA
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-base text-gray-400 tracking-[0.2em] mb-1"
        >
          COMPUTER SCIENCE ENGINEER
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xs md:text-sm text-green-500 tracking-[0.3em] mb-12"
        >
          AI / SOFTWARE / SYSTEMS
        </motion.p>

        {status === 'ready' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <button 
              onClick={onDeploy}
              className="text-white border border-white/30 px-8 py-3 tracking-widest hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              [ PRESS ENTER TO DEPLOY ]<span className="typing-cursor"></span>
            </button>

            <button 
              onClick={onRecruiterMode}
              className="text-xs text-gray-500 hover:text-gray-300 tracking-wider underline underline-offset-4"
            >
              [ SKIP TO RECRUITER MODE ]
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
