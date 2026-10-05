import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TargetNode from './TargetNode';
import MissionPanel from '../Panels/MissionPanel';
import ProfilePanel from '../Panels/ProfilePanel';
import ArsenalPanel from '../Panels/ArsenalPanel';
import ExperiencePanel from '../Panels/ExperiencePanel';
import IntelPanel from '../Panels/IntelPanel';
import CommsPanel from '../Panels/CommsPanel';
import CommandCore from '../Environment/CommandCore';

interface MissionControlProps {
  activePanel: string | null;
  setActivePanel: (panel: string | null) => void;
  audioEnabled: boolean;
}

const targets = [
  { id: 'profile', label: 'TARGET 01 // PROFILE', x: 'clamp(160px, 20%, calc(100% - 160px))', y: 'clamp(120px, 25%, calc(100% - 120px))', lines: ['WHO I AM', 'CSE @ VIT • AI / SOFTWARE / SYSTEMS', 'BUILDING PRODUCTS, NOT JUST PROJECTS'] },
  { id: 'arsenal', label: 'TARGET 02 // ARSENAL', x: 'clamp(160px, 80%, calc(100% - 160px))', y: 'clamp(120px, 25%, calc(100% - 120px))', lines: ['TECH STACK', 'PYTHON • C++ • JAVA • TYPESCRIPT', 'AI/ML • BACKEND • DISTRIBUTED SYSTEMS'] },
  { id: 'missions', label: 'TARGET 03 // MISSIONS', x: 'clamp(160px, 25%, calc(100% - 160px))', y: 'clamp(120px, 55%, calc(100% - 160px))', lines: ['WHAT I BUILD', 'HELM • PHARMASSIST • SHOWRUSH', 'AI + BACKEND + REAL-WORLD SYSTEMS'] },
  { id: 'experience', label: 'TARGET 04 // EXPERIENCE', x: 'clamp(160px, 75%, calc(100% - 160px))', y: 'clamp(120px, 55%, calc(100% - 160px))', lines: ['FIELD EXPERIENCE', 'AI/ML & SOFTWARE INTERN', '5-AGENT AI WORKFLOW • 70% FASTER RESEARCH'] },
  { id: 'intel', label: 'TARGET 05 // INTEL', x: 'clamp(160px, 35%, calc(100% - 160px))', y: 'clamp(120px, 85%, calc(100% - 160px))', lines: ['EDUCATION + ACHIEVEMENTS', 'VIT • CGPA 8.28', 'LEADERSHIP • CERTIFICATIONS • PROJECTS'] },
  { id: 'comms', label: 'TARGET 06 // COMMS', x: 'clamp(160px, 65%, calc(100% - 160px))', y: 'clamp(120px, 85%, calc(100% - 160px))', lines: ["LET'S BUILD", 'GITHUB • LINKEDIN • EMAIL', 'OPEN TO OPPORTUNITIES & COLLABORATION'] },
];

const MissionControl: React.FC<MissionControlProps> = ({ activePanel, setActivePanel, audioEnabled }) => {
  
  const playSound = (_type: 'shoot' | 'hit' | 'close') => {
    if (!audioEnabled) return;
    // In a real app we would play HTML5 audio here. 
    // We'll leave the hooks for when actual audio files are available.
  };

  const handleHit = (id: string) => {
    playSound('hit');
    setActivePanel(id);
  };

  const closePanel = () => {
    playSound('close');
    setActivePanel(null);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel]);

  return (
    <div className="absolute inset-0 z-50">
      
      {/* Central Command Core (Behind targets) */}
      <AnimatePresence>
        {!activePanel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <CommandCore />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Targets */}
      <div className="absolute inset-0 pointer-events-none">
        {targets.map(t => (
          <TargetNode 
            key={t.id} 
            id={t.id} 
            label={t.label} 
            x={t.x} 
            y={t.y} 
            lines={t.lines}
            onHit={() => handleHit(t.id)} 
            isActive={activePanel === t.id}
            isAnyActive={activePanel !== null}
          />
        ))}
      </div>

      {/* Central Instruction */}
      <AnimatePresence>
        {!activePanel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center text-center"
          >
            <p className="text-xs text-gray-400 tracking-widest mt-1 uppercase">SHOOT A TARGET TO ACCESS INTEL</p>
            <p className="text-[10px] text-gray-500 tracking-widest mt-1 bg-white/5 px-2 py-0.5 border border-white/10 uppercase">[ 6 TARGETS AVAILABLE ]</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to catch outside clicks */}
      {activePanel && (
        <div 
          className="absolute inset-0 z-0 pointer-events-auto" 
          onClick={closePanel} 
        />
      )}

      {/* Render Active Panel */}
      <AnimatePresence>
        {activePanel && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-black/90 backdrop-blur-md border-l border-white/20 p-6 md:p-10 flex flex-col pointer-events-auto z-10"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/20 pb-4 shrink-0">
              <p className="text-xs tracking-widest text-green-500">INTEL UNLOCKED</p>
              <button 
                onClick={closePanel}
                className="text-xs border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition-colors"
              >
                [ ESC ] CLOSE FILE
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
              {activePanel === 'profile' && <ProfilePanel />}
              {activePanel === 'arsenal' && <ArsenalPanel setActivePanel={setActivePanel} />}
              {activePanel === 'missions' && <MissionPanel setActivePanel={setActivePanel} />}
              {activePanel === 'experience' && <ExperiencePanel setActivePanel={setActivePanel} />}
              {activePanel === 'intel' && <IntelPanel setActivePanel={setActivePanel} />}
              {activePanel === 'comms' && <CommsPanel setActivePanel={setActivePanel} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MissionControl;
