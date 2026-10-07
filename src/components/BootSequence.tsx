import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Environment from './Environment/Environment';

interface BootSequenceProps {
  status: 'booting' | 'ready' | 'deployed';
  onDeploy: () => void;
  onRecruiterMode: () => void;
}

const renderProgressBar = (val: number) => {
  const total = 20;
  const filled = Math.min(total, Math.floor((val / 100) * total));
  const empty = total - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
};

const sysLines = [
  "SYSTEM CORE ........ ONLINE",
  "AI SYSTEMS ......... ONLINE",
  "BACKEND ............ ONLINE",
  "DATABASE ........... ONLINE",
  "PROJECT DATABASE ... ONLINE",
  "COMMS .............. ONLINE"
];

const BootSequence: React.FC<BootSequenceProps> = ({ onDeploy, onRecruiterMode }) => {
  const [phase, setPhase] = useState<'init' | 'ready' | 'deploying'>('init');
  const [progress, setProgress] = useState(0);
  const [linesStep, setLinesStep] = useState(0);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let pInterval: ReturnType<typeof setInterval>;
    let lInterval: ReturnType<typeof setInterval>;
    let tReady: ReturnType<typeof setTimeout>;

    if (phase === 'init') {
      pInterval = setInterval(() => {
        setProgress(p => (p >= 100 ? 100 : p + Math.floor(Math.random() * 15 + 5)));
      }, 150);

      lInterval = setInterval(() => {
        setLinesStep(s => s + 1);
      }, 300);

      tReady = setTimeout(() => {
        setPhase('ready');
      }, 2500);
    }

    return () => {
      clearInterval(pInterval);
      clearInterval(lInterval);
      clearTimeout(tReady);
    };
  }, [phase]);

  useEffect(() => {
    const handleAction = (e?: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
      }

      if (phase === 'init') {
        setPhase('ready');
      } else if (phase === 'ready') {
        setPhase('deploying');
        setTimeout(() => {
          onDeploy();
        }, isReducedMotion ? 400 : 800);
      }
    };

    const keyHandler = (e: KeyboardEvent) => handleAction(e);
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [phase, onDeploy, isReducedMotion]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase === 'init') setPhase('ready');
  };

  const handleDeployClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase === 'ready') {
      setPhase('deploying');
      setTimeout(() => {
        onDeploy();
      }, isReducedMotion ? 400 : 800);
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#03050A] text-gray-300 font-mono p-8 flex flex-col justify-center items-center overflow-hidden cursor-crosshair">
      <Environment />
      <div className="scanlines"></div>
      <div className="grain"></div>

      <AnimatePresence mode="wait">
        {phase === 'init' && (
          <motion.div
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center max-w-lg w-full text-center z-10"
          >
            {/* Holographic orbital diagram behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-400/5 rounded-full pointer-events-none mix-blend-screen opacity-20 hidden md:block">
              <div className="absolute inset-0 border border-white/5 rounded-full scale-75 border-dashed animate-[spin_60s_linear_infinite]"></div>
            </div>

            <h1 className="text-xl md:text-3xl font-bold tracking-widest text-white mb-2">SIDDHARTH VERMA</h1>
            <p className="text-sm tracking-[0.2em] mb-1 font-bold text-gray-400">SOFTWARE ENGINEER</p>
            <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.3em] mb-12">AI / SOFTWARE / DISTRIBUTED SYSTEMS</p>

            <p className="text-xs text-green-500 tracking-widest mb-4">SECURE SYSTEM INITIALIZATION</p>
            <p className="text-xs tracking-widest text-green-500 mb-8">{renderProgressBar(progress)}</p>

            <div className="flex flex-col items-start w-full max-w-[280px] mx-auto text-[10px] tracking-widest text-gray-500 space-y-2 h-40">
              {sysLines.map((line, idx) => (
                <div key={idx} className={`w-full flex justify-between ${idx < linesStep ? 'opacity-100' : 'opacity-0'}`}>
                  <span>{line.split('ONLINE')[0]}</span>
                  <span className="text-green-500">ONLINE</span>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSkip}
              className="mt-8 text-[10px] border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors bg-black/40 backdrop-blur-sm relative z-20"
            >
              [ SKIP INITIALIZATION ]
            </button>
          </motion.div>
        )}

        {phase === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center z-10"
          >
            <p className="text-green-500 text-sm tracking-[0.3em] font-bold mb-12 blink">SYSTEM READY</p>

            <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white mb-4">SIDDHARTH VERMA</h1>
            <p className="text-xs md:text-sm text-gray-400 tracking-[0.2em] mb-16">OPERATOR // SOFTWARE ENGINEER</p>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={handleDeployClick}
                className="text-white border border-green-500/50 bg-green-500/10 px-8 py-3 tracking-widest hover:bg-green-500 hover:text-black transition-colors font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-sm relative z-20"
              >
                [ PRESS ENTER TO DEPLOY ]<span className="typing-cursor"></span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); onRecruiterMode(); }}
                className="text-[10px] text-gray-500 hover:text-white tracking-widest underline underline-offset-4 transition-colors relative z-20 bg-black/30 px-2 py-1"
              >
                [ SKIP TO RECRUITER MODE ]
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'deploying' && (
          <motion.div
            key="deploying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#03050A]"
          >
            <p className="text-xs text-green-500 tracking-widest blink">&gt;&gt; DEPLOYING USER INTERFACE...</p>
            
            {!isReducedMotion && (
              <motion.div
                initial={{ top: '50%', height: '2px', opacity: 1 }}
                animate={{ top: ['50%', '0%'], height: ['2px', '100vh'], opacity: [1, 0] }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="absolute left-0 w-full bg-green-500/20 shadow-[0_0_20px_#22c55e]"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BootSequence;
