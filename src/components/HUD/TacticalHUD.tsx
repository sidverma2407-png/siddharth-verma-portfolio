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
  const [latency, setLatency] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setLatency(Math.floor(Math.random() * 4) + 6); // Fluctuate between 6 and 9ms
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
      {/* Ambient Corner Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(52,152,219,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,_rgba(204,41,41,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

      {/* Top Bar */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-gray-500 tracking-[0.3em] mb-1">SV // COMMAND NETWORK</p>
          <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white">SIDDHARTH VERMA</h2>
          <p className="text-[11px] md:text-sm text-green-500 tracking-[0.2em]">OPERATOR // SOFTWARE ENGINEER</p>
          <div className="mt-2 w-32 h-[1px] bg-gradient-to-r from-green-500/80 to-transparent"></div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="pointer-events-auto mb-3 relative group flex flex-col items-end">
            <button 
              onClick={onRecruiterMode}
              className="border border-green-500/30 bg-green-500/5 text-green-500 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest hover:bg-green-500 hover:text-black transition-colors"
            >
              [ RECRUITER MODE ]
            </button>
            <div className="absolute top-full right-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <span className="text-[9px] md:text-[10px] text-gray-500 tracking-widest">SKIP INTERACTIVE MODE</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 tracking-[0.3em] mb-1">SYSTEM STATUS</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(46,204,113,0.8)]"></div>
            <p className="text-[11px] md:text-sm tracking-widest text-white">ONLINE</p>
          </div>
          <p 
            className="text-[10px] text-gray-500 font-mono tracking-widest pointer-events-auto cursor-pointer hover:text-white mt-1"
            onClick={handleClockClick}
          >
            SYS.T: {time}
          </p>
        </div>
      </div>

      {/* Decorative center brackets */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-5xl max-h-[900px] border border-white/5 rounded-[40px] opacity-20 flex justify-between">
        <div className="w-8 h-full border-l-[1px] border-y-[1px] border-blue-400/20 rounded-l-[40px] bg-gradient-to-r from-blue-400/5 to-transparent"></div>
        <div className="w-8 h-full border-r-[1px] border-y-[1px] border-blue-400/20 rounded-r-[40px] bg-gradient-to-l from-blue-400/5 to-transparent"></div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end w-full relative z-10">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-gray-500 tracking-[0.3em]">ORBITAL NODE // 07</p>
          <p className="text-[10px] text-gray-500 tracking-[0.3em] mb-2">LATENCY // 0{latency}ms</p>
          <p className="text-[11px] md:text-base tracking-widest text-white/90">AI / SOFTWARE / DISTRIBUTED SYSTEMS</p>
          <div className="flex gap-4 mt-2 pointer-events-auto">
            <button 
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="text-[11px] flex items-center gap-2 text-gray-500 hover:text-white transition-colors tracking-widest"
            >
              {audioEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
              AUDIO: {audioEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] text-gray-500 tracking-[0.3em]">SECURE CHANNEL</p>
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-blue-400 tracking-[0.3em]">ENCRYPTION // ACTIVE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticalHUD;
