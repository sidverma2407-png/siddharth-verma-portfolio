import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TargetNodeProps {
  id: string;
  label: string;
  x: string;
  y: string;
  lines: string[];
  onHit: () => void;
  isActive: boolean;
  isAnyActive: boolean;
}

const TargetNode: React.FC<TargetNodeProps> = ({ id: _id, label, x, y, lines, onHit, isActive, isAnyActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number}[]>([]);

  const handleInteract = () => {
    if (isAnyActive && !isActive) return;
    
    // Create hit particles
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100
    }));
    setParticles(newParticles);
    
    setTimeout(() => setParticles([]), 500);
    onHit();
  };

  // Mobile tap
  const isMobile = window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window;

  if (isAnyActive && !isActive) return null;

  return (
    <div 
      className="absolute pointer-events-auto flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <motion.div 
        className="relative flex items-center justify-center w-16 h-16 cursor-crosshair group z-10 mt-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleInteract}
        animate={isActive ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        {/* TARGET ACQUIRED (Appears above the diamond) */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-max">
          <AnimatePresence>
            {isHovered && !isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="bg-green-500/10 border border-green-500/30 px-2 py-1 backdrop-blur-sm text-center"
              >
                <p className="text-[10px] tracking-widest font-mono text-green-500 blink font-bold uppercase">
                  TARGET ACQUIRED
                </p>
                <p className="text-[9px] tracking-widest text-green-400 mt-0.5 uppercase">
                  [ CLICK TO UNLOCK ]
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Diamond shape target */}
        <div className={`w-8 h-8 border transform rotate-45 transition-colors duration-300 ${isHovered ? 'border-red-500 bg-red-500/20 scale-110' : 'border-white/50'}`}></div>
        
        {/* Inner dot */}
        <div className={`absolute w-1 h-1 rounded-full transition-colors ${isHovered ? 'bg-red-500' : 'bg-white/50'}`}></div>

        {/* Hover brackets */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          animate={{ rotate: isHovered ? 90 : 0 }}
        >
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500"></div>
        </motion.div>
      </motion.div>

      {!isActive && (
        <motion.div 
          className="mt-4 text-center pointer-events-none flex flex-col items-center gap-1 md:gap-2 max-w-[200px] md:max-w-none"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {/* Target Title */}
          <p className="text-[10px] md:text-xs tracking-wider text-white bg-black/70 px-2 py-1 border border-white/20 backdrop-blur-sm shadow-lg whitespace-nowrap">
            [{label}]
          </p>
          
          {/* Description Lines always visible */}
          <div className="flex flex-col mt-1 bg-black/60 px-2 md:px-3 py-1.5 md:py-2 border border-white/5 backdrop-blur-sm w-max max-w-[90vw] md:max-w-none">
            {lines.map((line, idx) => (
              <p key={idx} className={`text-[8px] md:text-[10px] tracking-widest font-mono text-center ${idx === 0 ? 'text-gray-300 font-bold uppercase mb-1' : 'text-gray-500 leading-tight'} whitespace-normal md:whitespace-nowrap`}>
                {line}
              </p>
            ))}
          </div>

          {isMobile && !isHovered && (
             <p className="text-[9px] text-green-500 mt-1 blink">TAP TO UNLOCK</p>
          )}
        </motion.div>
      )}

      {/* Hit Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute w-1 h-1 bg-red-500"
        />
      ))}
    </div>
  );
};

export default TargetNode;
