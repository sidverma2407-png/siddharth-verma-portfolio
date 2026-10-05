import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BootSequence from './components/BootSequence';
import TacticalHUD from './components/HUD/TacticalHUD';
import RecruiterMode from './components/RecruiterMode/RecruiterMode';
import AudioController from './components/AudioController';
import TacticalCrosshair from './components/Crosshair/TacticalCrosshair';
import Environment from './components/Environment/Environment';
import MissionControl from './components/Target/MissionControl';

function App() {
  const [bootStatus, setBootStatus] = useState<'booting' | 'ready' | 'deployed'>('booting');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootStatus('ready');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleShake = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setShake(Math.random() > 0.5 ? 4 : -4);
      setTimeout(() => setShake(0), 50);
    };
    window.addEventListener('screen_shake', handleShake);
    return () => window.removeEventListener('screen_shake', handleShake);
  }, []);

  const handleDeploy = () => {
    setBootStatus('deployed');
  };

  if (recruiterMode) {
    return <RecruiterMode onExit={() => setRecruiterMode(false)} />;
  }

  if (bootStatus === 'booting' || bootStatus === 'ready') {
    return <BootSequence status={bootStatus} onDeploy={handleDeploy} onRecruiterMode={() => setRecruiterMode(true)} />;
  }

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="relative w-full max-w-[100vw] h-screen bg-black overflow-hidden noselect cursor-none text-white font-mono">
      <Environment />
      
      {/* Container that handles entry animation and shakes */}
      <motion.div 
        className="w-full h-full absolute inset-0"
        initial={{ opacity: 0, scale: isReducedMotion ? 1 : 1.02 }}
        animate={{ opacity: 1, scale: 1, x: shake, y: shake }}
        transition={{ 
          opacity: { duration: 0.8 }, 
          scale: { duration: 0.8, ease: "easeOut" },
          x: { type: "spring", stiffness: 3000, damping: 10 },
          y: { type: "spring", stiffness: 3000, damping: 10 }
        }}
      >
        {/* HUD Layer */}
        <TacticalHUD 
          audioEnabled={audioEnabled} 
          setAudioEnabled={setAudioEnabled} 
          onRecruiterMode={() => setRecruiterMode(true)}
        />

        {/* Interactive Environment Layer */}
        <MissionControl 
          activePanel={activePanel} 
          setActivePanel={setActivePanel} 
          audioEnabled={audioEnabled}
        />
      </motion.div>

      {/* Crosshair stays on top and does not shake with screen */}
      <TacticalCrosshair />

      {/* Audio System */}
      <AudioController enabled={audioEnabled} />

      {/* Overlay Effects */}
      <div className="scanlines"></div>
      <div className="grain"></div>
    </div>
  );
}

export default App;
