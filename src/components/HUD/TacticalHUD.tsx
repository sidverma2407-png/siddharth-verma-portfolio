import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TacticalHUDProps {
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  onRecruiterMode: () => void;
}

const TacticalHUD: React.FC<TacticalHUDProps> = ({ audioEnabled, setAudioEnabled, onRecruiterMode }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockClick = () => {
    setClicks(c => c + 1);
    if (clicks + 1 >= 5) {
      alert("You found the debug console. (Developer Override Detected)");
      setClicks(0);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between p-6 md:p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-widest">SIDDHARTH VERMA</h2>
          <p className="text-xs text-green-500 tracking-[0.2em]">OPERATOR // SOFTWARE ENGINEER</p>
          <div className="mt-2 w-32 h-[2px] bg-green-500/50"></div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="pointer-events-auto mb-2 relative group flex flex-col items-end">
            <button 
              onClick={onRecruiterMode}
              className="border border-green-500/50 bg-green-500/10 text-green-500 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest hover:bg-green-500 hover:text-black transition-colors"
            >
              [ RECRUITER MODE ]
            </button>
            <div className="absolute top-full right-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-[8px] md:text-[9px] text-gray-500 tracking-widest">SKIP INTERACTIVE MODE</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm tracking-wider">STATUS: ONLINE</p>
          </div>
          <p 
            className="text-xs text-gray-400 font-mono tracking-wider pointer-events-auto cursor-pointer hover:text-white"
            onClick={handleClockClick}
          >
            SYS.T: {time}
          </p>
        </div>
      </div>

      {/* Decorative center brackets */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 max-w-4xl max-h-[800px] border border-white/5 rounded-3xl opacity-30 flex justify-between">
        <div className="w-4 h-full border-l-2 border-y-2 border-white/20 rounded-l-3xl"></div>
        <div className="w-4 h-full border-r-2 border-y-2 border-white/20 rounded-r-3xl"></div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 tracking-[0.2em]">SYSTEM:</p>
          <p className="text-[10px] md:text-sm tracking-widest">AI / SOFTWARE / DISTRIBUTED SYSTEMS</p>
          <div className="flex gap-4 mt-2 pointer-events-auto">
            <button 
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="text-xs flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              AUDIO: {audioEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalHUD;
