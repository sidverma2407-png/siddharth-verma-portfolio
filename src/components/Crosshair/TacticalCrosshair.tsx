import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TacticalCrosshair: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [state, setState] = useState<'IDLE' | 'ACQUIRED' | 'FIRED' | 'HIT' | 'UNLOCKED'>('IDLE');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setState(customEvent.detail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('crosshair_state', handleState);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('crosshair_state', handleState);
    };
  }, []);

  if (isMobile) return null;

  const isAcquired = state === 'ACQUIRED';
  const isFired = state === 'FIRED';
  const isHit = state === 'HIT';
  const isUnlocked = state === 'UNLOCKED';

  let readout = 'IDLE';
  if (isAcquired) readout = 'TARGET ACQUIRED';
  if (isFired) readout = 'FIRING...';
  if (isHit) readout = 'HIT CONFIRMED';
  if (isUnlocked) readout = 'INTEL UNLOCKED';

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      animate={{ 
        x: mousePos.x, 
        y: mousePos.y,
      }}
      transition={{ type: "spring", stiffness: 2000, damping: 100, mass: 0.05 }}
    >
      <motion.div 
        className="relative w-12 h-12 -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          scale: isFired ? 1.5 : isAcquired ? 0.9 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Center Dot */}
        <div className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors ${isAcquired || isHit ? 'bg-red-500' : 'bg-white'}`}></div>
        
        {/* Lines */}
        <div className={`absolute top-0 left-1/2 w-[1px] h-3 -translate-x-1/2 transition-colors ${isAcquired ? 'bg-red-500' : 'bg-white/70'}`}></div>
        <div className={`absolute bottom-0 left-1/2 w-[1px] h-3 -translate-x-1/2 transition-colors ${isAcquired ? 'bg-red-500' : 'bg-white/70'}`}></div>
        <div className={`absolute left-0 top-1/2 w-3 h-[1px] -translate-y-1/2 transition-colors ${isAcquired ? 'bg-red-500' : 'bg-white/70'}`}></div>
        <div className={`absolute right-0 top-1/2 w-3 h-[1px] -translate-y-1/2 transition-colors ${isAcquired ? 'bg-red-500' : 'bg-white/70'}`}></div>

        {/* Brackets moving inward when acquired */}
        <motion.div className="absolute inset-0" animate={{ padding: isAcquired ? '2px' : '0px' }}>
          <div className={`absolute top-1 left-1 w-2 h-2 border-t border-l transition-colors ${isAcquired ? 'border-red-500' : 'border-white/50'}`}></div>
          <div className={`absolute top-1 right-1 w-2 h-2 border-t border-r transition-colors ${isAcquired ? 'border-red-500' : 'border-white/50'}`}></div>
          <div className={`absolute bottom-1 left-1 w-2 h-2 border-b border-l transition-colors ${isAcquired ? 'border-red-500' : 'border-white/50'}`}></div>
          <div className={`absolute bottom-1 right-1 w-2 h-2 border-b border-r transition-colors ${isAcquired ? 'border-red-500' : 'border-white/50'}`}></div>
        </motion.div>

        {/* Muzzle Flash */}
        {isFired && (
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-200 blur-sm rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        )}

        {/* Hit Marker X */}
        {isHit && (
          <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-red-500 rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-red-500 -rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </motion.div>

      {/* Readout Status (position safely below and right) */}
      <div className="absolute top-8 left-8 w-max">
        <p className={`text-[9px] tracking-widest font-mono font-bold ${isHit || isAcquired ? 'text-red-500' : 'text-gray-400'}`}>
          {readout}
        </p>
      </div>

    </motion.div>
  );
};

export default TacticalCrosshair;
