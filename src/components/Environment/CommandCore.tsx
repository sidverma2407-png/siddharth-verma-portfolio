import React from 'react';

const CommandCore: React.FC = () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60">
      <div className="relative w-full max-w-[1000px] aspect-square">
        
        <svg viewBox="0 0 1000 1000" className="w-full h-full absolute inset-0 mix-blend-screen">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(52, 152, 219, 0.15)" />
              <stop offset="40%" stopColor="rgba(52, 152, 219, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <linearGradient id="orbitArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>

          {/* Central Glow Background */}
          <circle cx="500" cy="500" r="300" fill="url(#coreGlow)" />

          {/* Orbital Arcs (Outer) */}
          <g transform="translate(500,500)">
            <circle cx="0" cy="0" r="350" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <path d="M 0 -350 A 350 350 0 0 1 350 0" fill="none" stroke="url(#orbitArc)" strokeWidth="1.5" opacity="0.15">
              {!isReducedMotion && <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite" />}
            </path>
            
            <circle cx="0" cy="0" r="280" fill="none" stroke="rgba(52,152,219,0.05)" strokeWidth="0.5" />
            <path d="M -280 0 A 280 280 0 0 1 0 280" fill="none" stroke="rgba(52,152,219,0.3)" strokeWidth="1.5" opacity="0.25">
              {!isReducedMotion && <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="25s" repeatCount="indefinite" />}
            </path>
            
            <circle cx="0" cy="0" r="180" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 8">
              {!isReducedMotion && <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />}
            </circle>
          </g>

          {/* Central Holographic Core */}
          <g transform="translate(500,500)">
            <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="0" cy="0" r="70" fill="none" stroke="rgba(46,204,113,0.2)" strokeWidth="1" strokeDasharray="15 5">
              {!isReducedMotion && <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="15s" repeatCount="indefinite" />}
            </circle>
            <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(52,152,219,0.15)" strokeWidth="0.5" strokeDasharray="2 12">
              {!isReducedMotion && <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="10s" repeatCount="indefinite" />}
            </circle>
            
            <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#neonGlow)" />
            <text x="0" y="-18" fill="rgba(255,255,255,0.8)" fontSize="16" fontFamily="monospace" textAnchor="middle" letterSpacing="3">SV</text>
            <text x="0" y="5" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">CORE</text>
            <text x="0" y="24" fill="#2ecc71" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="3" filter="url(#neonGlow)" className="blink">ONLINE</text>
          </g>

          {/* Connection Lines */}
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none">
            <path id="core-to-ai" d="M 500 420 L 500 250" />
            <path id="core-to-app" d="M 420 500 L 250 500" />
            <path id="core-to-sys" d="M 580 500 L 750 500" />
            <path id="core-to-data" d="M 500 580 L 500 750" />
            
            <path d="M 500 250 L 750 500" strokeDasharray="2 4" stroke="rgba(52,152,219,0.1)" />
            <path d="M 750 500 L 500 750" strokeDasharray="2 4" stroke="rgba(52,152,219,0.1)" />
            <path d="M 500 750 L 250 500" strokeDasharray="2 4" stroke="rgba(52,152,219,0.1)" />
            <path d="M 250 500 L 500 250" strokeDasharray="2 4" stroke="rgba(52,152,219,0.1)" />
          </g>

          {/* Data Pulses */}
          {!isReducedMotion && (
            <g fill="#fff" opacity="0.5" filter="url(#neonGlow)">
              <circle r="2"><animateMotion dur="2s" repeatCount="indefinite" path="M 500 420 L 500 250" /></circle>
              <circle r="2"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 420 500 L 250 500" /></circle>
              <circle r="2"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 580 500 L 750 500" /></circle>
              <circle r="2"><animateMotion dur="2.8s" repeatCount="indefinite" path="M 500 580 L 500 750" /></circle>
              
              <circle r="1" fill="#3498db"><animateMotion dur="4s" repeatCount="indefinite" path="M 500 250 L 750 500" /></circle>
              <circle r="1" fill="#3498db"><animateMotion dur="4s" repeatCount="indefinite" path="M 750 500 L 500 750" /></circle>
              <circle r="1" fill="#3498db"><animateMotion dur="4s" repeatCount="indefinite" path="M 500 750 L 250 500" /></circle>
              <circle r="1" fill="#3498db"><animateMotion dur="4s" repeatCount="indefinite" path="M 250 500 L 500 250" /></circle>
            </g>
          )}

          {/* Node Labels */}
          <g fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="12" letterSpacing="3">
            <g transform="translate(500,220)">
              <rect x="-40" y="-12" width="80" height="24" fill="rgba(3,5,10,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle">AI CORE</text>
            </g>
            <g transform="translate(200,500)">
              <rect x="-60" y="-12" width="120" height="24" fill="rgba(3,5,10,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle">APP LAYER</text>
            </g>
            <g transform="translate(800,500)">
              <rect x="-60" y="-12" width="120" height="24" fill="rgba(3,5,10,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle">SYSTEM LAYER</text>
            </g>
            <g transform="translate(500,780)">
              <rect x="-50" y="-12" width="100" height="24" fill="rgba(3,5,10,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle">DATA LAYER</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CommandCore;
