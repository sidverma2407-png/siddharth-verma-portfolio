import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CommandCore: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate some static ambient dust particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
  }, []);

  if (isMobile) {
    // Simplified version for mobile to avoid overlap
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 border border-white/20 rounded-full" 
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 border border-dashed border-white/20 rounded-full" 
        />
        <div className="absolute text-[8px] tracking-widest text-white/50 text-center">
          <p>SV // CORE</p>
          <p className="text-green-500/50 mt-1">ONLINE</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Ambient Particles */}
      <div className="absolute inset-0 opacity-30">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[1000px] aspect-square opacity-40">
        
        {/* SVG Visualization */}
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            {/* Filter for glow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sweep Gradient */}
            <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* 6. RADAR (Faint Background) */}
          <g opacity="0.15">
            <circle cx="500" cy="500" r="400" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="500" cy="500" r="300" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="500" cy="500" r="200" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="2 4" />
            
            {/* Crosshairs */}
            <line x1="500" y1="50" x2="500" y2="950" stroke="#fff" strokeWidth="0.5" />
            <line x1="50" y1="500" x2="950" y2="500" stroke="#fff" strokeWidth="0.5" />
            <line x1="181" y1="181" x2="819" y2="819" stroke="#fff" strokeWidth="0.5" strokeDasharray="5 15" />
            <line x1="181" y1="819" x2="819" y2="181" stroke="#fff" strokeWidth="0.5" strokeDasharray="5 15" />

            {/* Tiny targets */}
            <circle cx="300" cy="700" r="3" fill="#fff" />
            <circle cx="750" cy="250" r="2" fill="#fff" />
            <circle cx="600" cy="800" r="4" fill="none" stroke="#fff" />
            
            {/* Radar Sweep */}
            <g>
              <path d="M 500 500 L 500 100 A 400 400 0 0 1 900 500 Z" fill="url(#radarSweep)" opacity="0.3" />
              <animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="8s" repeatCount="indefinite" />
            </g>
          </g>

          {/* 3. CENTRAL CORE */}
          <g transform="translate(500,500)">
            <circle cx="0" cy="0" r="40" fill="none" stroke="#fff" strokeWidth="1" />
            <circle cx="0" cy="0" r="45" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="10 5">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="55" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 10">
              <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="2" fill="#fff" />
            <text x="0" y="-10" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">SV</text>
            <text x="0" y="5" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="1">CORE</text>
            <text x="0" y="20" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2">ONLINE</text>
          </g>

          {/* 2. CENTRAL SYSTEM GRAPH (Lines) */}
          <g stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.5">
            {/* AI -> LANGGRAPH */}
            <path id="path-ai-lg" d="M 500 200 L 500 280" />
            {/* LANGGRAPH -> HELM */}
            <path id="path-lg-helm" d="M 480 320 Q 300 320 300 450" />
            {/* LANGGRAPH -> PHARMASSIST */}
            <path id="path-lg-pharm" d="M 520 320 Q 750 320 750 400" />
            {/* BACKEND -> POSTGRESQL */}
            <path id="path-be-pg" d="M 500 850 L 500 750" />
            {/* POSTGRESQL -> HELM */}
            <path id="path-pg-helm" d="M 480 700 Q 300 700 300 550" />
            {/* POSTGRESQL -> SHOWRUSH */}
            <path id="path-pg-sr" d="M 520 700 Q 750 700 750 600" />
            {/* AI -> DISTRIBUTED */}
            <path id="path-ai-dist" d="M 550 180 Q 850 180 850 450" strokeDasharray="2 2" />
          </g>

          {/* 5. DATA PULSES */}
          <g fill="#fff" opacity="0.8" filter="url(#glow)">
            <circle r="2">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 500 200 L 500 280" />
            </circle>
            <circle r="2">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 480 320 Q 300 320 300 450" />
            </circle>
            <circle r="2">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M 520 320 Q 750 320 750 400" />
            </circle>
            <circle r="2">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 500 850 L 500 750" />
            </circle>
            <circle r="2">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 520 700 Q 750 700 750 600" />
            </circle>
            <circle r="2">
              <animateMotion dur="5s" repeatCount="indefinite" path="M 480 700 Q 300 700 300 550" />
            </circle>
          </g>

          {/* Nodes */}
          <g fill="#fff" fontFamily="monospace" fontSize="10" letterSpacing="2" opacity="0.7">
            
            {/* AI */}
            <g transform="translate(500,180)">
              <rect x="-40" y="-15" width="80" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">AI</text>
            </g>

            {/* LANGGRAPH */}
            <g transform="translate(500,300)">
              <rect x="-60" y="-15" width="120" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">LANGGRAPH</text>
            </g>

            {/* HELM */}
            <g transform="translate(300,500)">
              <rect x="-50" y="-15" width="100" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">HELM</text>
            </g>

            {/* PHARMASSIST */}
            <g transform="translate(750,420)">
              <rect x="-60" y="-15" width="120" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">PHARMASSIST</text>
            </g>

            {/* SHOWRUSH */}
            <g transform="translate(750,580)">
              <rect x="-50" y="-15" width="100" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">SHOWRUSH</text>
            </g>

            {/* POSTGRESQL */}
            <g transform="translate(500,720)">
              <rect x="-60" y="-15" width="120" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">POSTGRESQL</text>
            </g>

            {/* BACKEND */}
            <g transform="translate(500,870)">
              <rect x="-50" y="-15" width="100" height="30" fill="none" stroke="#fff" strokeWidth="0.5" />
              <text x="0" y="4" textAnchor="middle">BACKEND</text>
            </g>
            
            {/* DISTRIBUTED SYSTEMS */}
            <g transform="translate(850,500)">
              <rect x="-80" y="-15" width="160" height="30" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="4 2" />
              <text x="0" y="4" textAnchor="middle">DISTRIBUTED</text>
            </g>

          </g>
        </svg>

        {/* 4. SYSTEM TELEMETRY */}
        <div className="absolute top-10 left-10 text-[9px] font-mono tracking-widest text-gray-400 space-y-1">
          <p className="text-white mb-2">SYSTEM CORE // SV-01</p>
          <div className="flex justify-between w-40"><span>AI SYSTEMS</span><span className="text-green-500 blink">ONLINE</span></div>
          <div className="flex justify-between w-40"><span>BACKEND</span><span className="text-green-500 blink">ONLINE</span></div>
          <div className="flex justify-between w-40"><span>DATABASE</span><span className="text-green-500 blink">ONLINE</span></div>
          <div className="flex justify-between w-40"><span>DISTRIBUTED</span><span className="text-green-500 blink">ONLINE</span></div>
          <div className="w-40 h-[1px] bg-white/20 my-2"></div>
          <div className="flex justify-between w-40"><span>PROJECTS</span><span className="text-white">03</span></div>
          <div className="flex justify-between w-40"><span>MISSIONS</span><span className="text-white">06</span></div>
        </div>

        {/* 8. TECHNICAL LABELS */}
        <div className="absolute top-20 right-20 text-[8px] font-mono tracking-widest text-gray-500 border-r border-white/20 pr-2 text-right">
          <p>AI CORE</p>
          <p>INTELLIGENCE ROUTING</p>
        </div>
        <div className="absolute bottom-40 right-20 text-[8px] font-mono tracking-widest text-gray-500 border-r border-white/20 pr-2 text-right">
          <p>SYSTEM LAYER</p>
          <p>ASYNCHRONOUS POOLS</p>
        </div>
        <div className="absolute bottom-32 left-20 text-[8px] font-mono tracking-widest text-gray-500 border-l border-white/20 pl-2">
          <p>DATA LAYER</p>
          <p>ACID TRANSACTIONS</p>
        </div>
        <div className="absolute top-[40%] left-20 text-[8px] font-mono tracking-widest text-gray-500 border-l border-white/20 pl-2">
          <p>APPLICATION LAYER</p>
          <p>FRONTEND INTERFACES</p>
        </div>

      </div>
    </div>
  );
};

export default CommandCore;
