import React, { useState, useEffect } from 'react';
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

type TargetState = 'IDLE' | 'FIRED' | 'UNLOCKING' | 'UNLOCKED';

const TargetNode: React.FC<TargetNodeProps> = ({ id: _id, label, x, y, lines, onHit, isActive, isAnyActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [targetState, setTargetState] = useState<TargetState>('IDLE');
  const [unlockStep, setUnlockStep] = useState(0);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, a: number}[]>([]);

  // Mobile tap
  const isMobile = window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window;

  const dispatchCrosshair = (state: string) => {
    if (isMobile) return;
    window.dispatchEvent(new CustomEvent('crosshair_state', { detail: state }));
  };

  const dispatchAudio = (sound: string) => {
    window.dispatchEvent(new CustomEvent('play_audio', { detail: sound }));
  };

  const handleMouseEnter = () => {
    if (targetState === 'IDLE' && !isActive) {
      setIsHovered(true);
      dispatchCrosshair('ACQUIRED');
      dispatchAudio('acquire');
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (targetState === 'IDLE') {
      dispatchCrosshair('IDLE');
    }
  };

  useEffect(() => {
    if (isActive) {
      setTargetState('UNLOCKED');
      dispatchCrosshair('IDLE');
    }
  }, [isActive]);

  const handleInteract = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isAnyActive && !isActive) return;
    if (targetState !== 'IDLE' && targetState !== 'UNLOCKED') return;
    
    if (targetState === 'UNLOCKED') {
      onHit();
      return;
    }

    // FIRE SEQUENCE
    setTargetState('FIRED');
    dispatchCrosshair('FIRED');
    dispatchAudio('fire');

    // Create impact particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * (50 + Math.random() * 50),
        y: Math.sin(angle) * (50 + Math.random() * 50),
        a: angle
      };
    });
    setParticles(newParticles);
    
    setTimeout(() => {
      dispatchCrosshair('HIT');
      dispatchAudio('hit');
      window.dispatchEvent(new CustomEvent('screen_shake'));
    }, 100);

    setTimeout(() => {
      setParticles([]);
      setTargetState('UNLOCKING');
      setUnlockStep(1);
    }, 300);

    setTimeout(() => {
      setUnlockStep(2);
    }, 600);

    setTimeout(() => {
      setUnlockStep(3);
    }, 900);

    setTimeout(() => {
      dispatchCrosshair('IDLE');
      setTargetState('UNLOCKED');
      dispatchAudio('unlock');
      onHit();
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleInteract(e);
    }
  };

  const handleFocus = () => {
    if (targetState === 'IDLE' && !isActive) {
      setIsHovered(true);
      dispatchCrosshair('ACQUIRED');
      dispatchAudio('acquire');
    }
  };

  const handleBlur = () => {
    setIsHovered(false);
    if (targetState === 'IDLE') {
      dispatchCrosshair('IDLE');
    }
  };

  if (isAnyActive && !isActive) return null;

  return (
    <div 
      className="absolute pointer-events-auto flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 outline-none focus:ring-2 focus:ring-red-500/50 rounded-full"
      style={{ left: x, top: y }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <motion.div 
        className="relative flex items-center justify-center w-16 h-16 cursor-crosshair group z-10 mt-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteract}
        animate={isActive ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        {/* TARGET ACQUIRED (Appears above the diamond) */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-max">
          <AnimatePresence>
            {isHovered && targetState === 'IDLE' && !isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="bg-green-500/10 border border-green-500/30 px-2 py-1 backdrop-blur-sm text-center"
              >
                <p className="text-[10px] tracking-widest font-mono text-green-500 blink font-bold uppercase">
                  TARGET ACQUIRED
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Diamond shape target */}
        <div className={`w-8 h-8 border transform rotate-45 transition-colors duration-300 ${isHovered || targetState !== 'IDLE' ? 'border-red-500 bg-red-500/20 scale-110' : 'border-white/50'} ${targetState === 'UNLOCKED' ? 'border-gray-500 bg-gray-500/10' : ''}`}></div>
        
        {/* Inner dot */}
        <div className={`absolute w-1 h-1 rounded-full transition-colors ${isHovered || targetState !== 'IDLE' ? 'bg-red-500' : 'bg-white/50'} ${targetState === 'UNLOCKED' ? 'bg-gray-500' : ''}`}></div>

        {/* Hover brackets */}
        <motion.div 
          className={`absolute inset-0 opacity-0 ${(isHovered || targetState !== 'IDLE') && targetState !== 'UNLOCKED' ? 'opacity-100' : ''}`}
          animate={{ rotate: isHovered || targetState !== 'IDLE' ? 90 : 0 }}
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
          animate={{ opacity: isHovered || targetState !== 'IDLE' ? 1 : 0.7 }}
        >
          {/* Target Title */}
          <p className="text-[10px] md:text-xs tracking-wider text-white bg-black/70 px-2 py-1 border border-white/20 backdrop-blur-sm shadow-lg whitespace-nowrap">
            [{label}]
          </p>

          {/* Unlocking Sequence */}
          {targetState === 'UNLOCKING' && (
            <div className="flex flex-col mt-1 bg-black/80 px-3 py-2 border border-red-500/50 backdrop-blur-sm w-max">
              {unlockStep >= 1 && <p className="text-[10px] text-red-500 font-mono tracking-widest">&gt;&gt; TARGET LOCKED</p>}
              {unlockStep >= 2 && <p className="text-[10px] text-gray-400 font-mono tracking-widest">&gt;&gt; ACCESSING INTEL...</p>}
              {unlockStep >= 3 && <p className="text-[10px] text-green-500 font-mono tracking-widest blink">&gt;&gt; INTEL UNLOCKED</p>}
            </div>
          )}
          
          {/* Description Lines always visible when not unlocking */}
          {targetState !== 'UNLOCKING' && (
            <div className="flex flex-col mt-1 bg-black/60 px-2 md:px-3 py-1.5 md:py-2 border border-white/5 backdrop-blur-sm w-max max-w-[85vw] md:max-w-[300px]">
              {lines.map((line, idx) => (
                <p key={idx} className={`text-[8px] md:text-[10px] tracking-widest font-mono text-center ${idx === 0 ? 'text-gray-300 font-bold uppercase mb-1' : 'text-gray-500 leading-tight'} whitespace-normal md:whitespace-nowrap`}>
                  {line}
                </p>
              ))}
              {targetState === 'UNLOCKED' && (
                <p className="text-[9px] text-green-500 mt-2 font-bold tracking-widest uppercase text-center border-t border-white/10 pt-1">UNLOCKED</p>
              )}
            </div>
          )}

          {isMobile && !isHovered && targetState === 'IDLE' && (
             <p className="text-[9px] text-green-500 mt-1 blink">TAP TO ENGAGE</p>
          )}
        </motion.div>
      )}

      {/* Hit Particles */}
      <div className="absolute top-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 2 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute w-1 h-1 bg-red-500"
          />
        ))}
      </div>
    </div>
  );
};

export default TargetNode;
