import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TacticalCrosshair: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isFiring, setIsFiring] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device has touch capability or small screen
    if (window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsFiring(true);
    const handleMouseUp = () => setIsFiring(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isMobile) return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-60 mix-blend-difference"
      animate={{ 
        x: mousePos.x - 20, 
        y: mousePos.y - 20,
        scale: isFiring ? 0.8 : 1
      }}
      transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
    >
      <div className="relative w-10 h-10">
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Lines */}
        <div className="absolute top-0 left-1/2 w-[1px] h-3 bg-white/70 -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[1px] h-3 bg-white/70 -translate-x-1/2"></div>
        <div className="absolute left-0 top-1/2 w-3 h-[1px] bg-white/70 -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-3 h-[1px] bg-white/70 -translate-y-1/2"></div>

        {/* Brackets */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/50"></div>
      </div>
    </motion.div>
  );
};

export default TacticalCrosshair;
