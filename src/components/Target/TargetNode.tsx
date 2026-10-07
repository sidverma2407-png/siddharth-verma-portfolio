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
        className="relative flex items-center justify-center w-20 h-20 cursor-crosshair group z-10 mt-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleInteract}
        animate={isActive ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        {/* TARGET ACQUIRED (Appears above the beacon) */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-max z-20">
          <AnimatePresence>
            {isHovered && targetState === 'IDLE' && !isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="bg-green-500/10 border border-green-500/30 px-2 py-1 backdrop-blur-sm text-center shadow-[0_0_10px_rgba(46,204,113,0.3)]"
              >
                <p className="text-[10px] tracking-widest font-mono text-green-500 blink font-bold uppercase">
                  TARGET ACQUIRED
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Outer Orbital Ring */}
        <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${isHovered || targetState !== 'IDLE' ? 'border-red-500/40 rotate-180 scale-110' : 'border-white/10 scale-100'} ${targetState === 'UNLOCKED' ? 'border-blue-400/30' : ''}`} style={{ borderStyle: 'dashed', borderWidth: '1px' }}></div>

        {/* Main Beacon Body */}
        <div className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 bg-white/5 backdrop-blur-md rounded-sm border ${isHovered || targetState !== 'IDLE' ? 'border-red-500/80 shadow-[0_0_15px_rgba(204,41,41,0.4)]' : 'border-white/20'} ${targetState === 'UNLOCKED' ? 'border-blue-400/80 shadow-[0_0_15px_rgba(52,152,219,0.3)] bg-blue-400/10' : ''}`}>
          
          {/* Corner Markings */}
          <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${isHovered || targetState !== 'IDLE' ? 'border-red-500' : 'border-white/40'} ${targetState === 'UNLOCKED' ? 'border-blue-400' : ''}`}></div>
          <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors ${isHovered || targetState !== 'IDLE' ? 'border-red-500' : 'border-white/40'} ${targetState === 'UNLOCKED' ? 'border-blue-400' : ''}`}></div>
          <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors ${isHovered || targetState !== 'IDLE' ? 'border-red-500' : 'border-white/40'} ${targetState === 'UNLOCKED' ? 'border-blue-400' : ''}`}></div>
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${isHovered || targetState !== 'IDLE' ? 'border-red-500' : 'border-white/40'} ${targetState === 'UNLOCKED' ? 'border-blue-400' : ''}`}></div>

          {/* Inner Dot / Status */}
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered || targetState !== 'IDLE' ? 'bg-red-500 animate-pulse' : 'bg-white/40'} ${targetState === 'UNLOCKED' ? 'bg-blue-400' : ''}`}></div>
          
          {/* Target ID Number */}
          <div className="absolute top-1 left-1 text-[7px] font-mono text-white/30">
            {label.split('//')[0].trim().replace('TARGET ', 'T')}
          </div>
        </div>

        {/* Hover Brackets (Outer layer) */}
        <motion.div 
          className={`absolute inset-[-4px] opacity-0 ${(isHovered || targetState !== 'IDLE') && targetState !== 'UNLOCKED' ? 'opacity-100' : ''}`}
          animate={{ rotate: isHovered || targetState !== 'IDLE' ? 90 : 0 }}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
        </motion.div>
      </motion.div>

      {!isActive && (
        <motion.div 
          className="mt-2 text-center pointer-events-none flex flex-col items-center gap-1 md:gap-2 max-w-[200px] md:max-w-none"
          animate={{ opacity: isHovered || targetState !== 'IDLE' ? 1 : 0.6 }}
        >
          {/* Target Title */}
          <p className="text-[9px] md:text-[11px] tracking-widest font-mono text-white bg-black/50 px-3 py-1 border border-white/10 backdrop-blur-md shadow-lg whitespace-nowrap">
            [{label}]
          </p>

          {/* Unlocking Sequence */}
          {targetState === 'UNLOCKING' && (
            <div className="flex flex-col mt-1 bg-black/80 px-3 py-2 border border-red-500/50 backdrop-blur-md shadow-[0_0_20px_rgba(204,41,41,0.2)] w-max">
              {unlockStep >= 1 && <p className="text-[10px] text-red-500 font-mono tracking-widest">&gt;&gt; TARGET LOCKED</p>}
              {unlockStep >= 2 && <p className="text-[10px] text-gray-400 font-mono tracking-widest">&gt;&gt; ACCESSING INTEL...</p>}
              {unlockStep >= 3 && <p className="text-[10px] text-green-500 font-mono tracking-widest blink">&gt;&gt; INTEL UNLOCKED</p>}
            </div>
          )}
          
          {/* Description Lines always visible when not unlocking */}
          {targetState !== 'UNLOCKING' && (
            <div className="flex flex-col mt-1 bg-[#03050a]/80 px-2 md:px-4 py-2 border border-white/5 backdrop-blur-md shadow-lg w-max max-w-[85vw] md:max-w-[320px]">
              {lines.map((line, idx) => (
                <p key={idx} className={`${idx === 0 ? 'text-[9px] font-mono tracking-widest text-blue-400 mb-1 uppercase font-bold' : 'text-xs font-sans tracking-wide text-gray-400 leading-relaxed'} text-center whitespace-normal md:whitespace-nowrap`}>
                  {line}
                </p>
              ))}
              {targetState === 'UNLOCKED' && (
                <p className="text-[9px] text-blue-400 mt-2 font-bold tracking-widest uppercase text-center border-t border-white/10 pt-2 font-mono">INTEL DECRYPTED</p>
              )}
            </div>
          )}

          {isMobile && !isHovered && targetState === 'IDLE' && (
             <p className="text-[9px] text-green-500 mt-1 blink font-mono tracking-widest">TAP TO ENGAGE</p>
          )}
        </motion.div>
      )}

      {/* Tracer Effect (Fired state) */}
      <AnimatePresence>
        {targetState === 'FIRED' && (
          <motion.div 
            initial={{ opacity: 1, scale: 5, y: 100 }}
            animate={{ opacity: 0, scale: 0, y: 0 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 w-1 h-20 bg-yellow-400 blur-[1px] -translate-x-1/2 -translate-y-full origin-bottom pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

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
