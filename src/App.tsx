import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootStatus('ready');
    }, 3000);
    return () => clearTimeout(timer);
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

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden noselect cursor-none text-white font-mono">
      <Environment />
      
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

      {/* Crosshair stays on top */}
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
