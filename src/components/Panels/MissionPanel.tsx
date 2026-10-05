import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { missionsData } from '../../data/profile';

const HelmArchitecture = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: 'user', label: 'USER' },
    { id: 'prompt', label: 'NATURAL LANGUAGE PROMPT' },
    { id: 'langgraph', label: 'LANGGRAPH', interactive: true, info: 'Multi-agent orchestration handling intent parsing, tool selection, and fallback logic.' },
    { id: 'query', label: 'QUERY GENERATION' },
    { id: 'postgres', label: 'POSTGRESQL', interactive: true, info: 'Executes generated parameterized queries against structured financial metrics.' },
    { id: 'data', label: 'FINANCIAL DATA' },
    { id: 'dashboard', label: 'LIVE DASHBOARD' }
  ];

  return (
    <div className="bg-black/50 border border-white/10 p-4 font-mono text-xs">
      <div className="flex flex-col items-center justify-center space-y-2 relative">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div 
              onClick={() => node.interactive && setActiveNode(activeNode === node.id ? null : node.id)}
              className={`px-4 py-2 text-center transition-colors ${
                node.interactive 
                  ? 'border border-red-500/50 bg-red-500/10 cursor-pointer hover:bg-red-500/20 text-red-100 font-bold' 
                  : 'border border-white/20 bg-white/5 text-gray-300'
              }`}
            >
              {node.label}
            </div>
            {i < nodes.length - 1 && <div className="text-gray-500 text-lg">↓</div>}
          </React.Fragment>
        ))}

        {/* Redis Sidecar */}
        <div className="absolute top-1/2 right-2 md:left-[calc(50%+120px)] md:right-auto -translate-y-1/2 border border-teal-500/50 bg-teal-500/10 px-2 md:px-4 py-2 text-[10px] md:text-xs text-teal-100 text-center flex items-center gap-1 md:gap-2">
          <span className="hidden md:inline">←</span> REDIS
        </div>
      </div>

      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 border border-white/30 bg-white/10 p-3"
          >
            <p className="text-red-400 font-bold mb-1">NODE: {activeNode.toUpperCase()}</p>
            <p className="text-gray-300">{nodes.find(n => n.id === activeNode)?.info}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PharmAssistArchitecture = () => {
  const flow = [
    'INCOMING COMPLAINT',
    'DOCUMENT INGESTION',
    'OCR',
    'DUPLICATE DETECTION',
    '10-NODE WORKFLOW',
    'TRIAGE + RISK SCORING',
    'VALIDATED JSON'
  ];

  return (
    <div className="bg-black/50 border border-white/10 p-4 font-mono text-xs flex flex-col items-center space-y-2">
      {flow.map((step, i) => (
        <React.Fragment key={i}>
          <div className={`px-4 py-2 border ${step === '10-NODE WORKFLOW' ? 'border-red-500 text-red-400 font-bold bg-red-500/10' : 'border-white/20 text-gray-300 bg-white/5'}`}>
            {step}
          </div>
          {i < flow.length - 1 && <div className="text-gray-500 text-lg">↓</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const ShowRushSimulation = () => {
  const [seats, setSeats] = useState([...Array(24)].map((_, i) => ({ 
    id: i, 
    status: (i === 3 || i === 7 || i === 12 || i === 18) ? 'BOOKED' : 'AVAILABLE' 
  })));
  const [activeSeat, setActiveSeat] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSeatClick = (id: number) => {
    if (seats[id].status !== 'AVAILABLE' || activeSeat !== null) return;
    
    const newSeats = [...seats];
    newSeats[id].status = 'HELD';
    setSeats(newSeats);
    setActiveSeat(id);
    setLogs(['TEMPORARY HOLD ACTIVE (10:00 TTL)']);
  };

  const simulateConcurrent = () => {
    if (activeSeat === null) return;
    
    setLogs(prev => [
      ...prev,
      '',
      '> CONCURRENT REQUEST DETECTED',
      '> INITIATING POSTGRESQL ROW-LEVEL LOCK',
      '> SELECT ... FOR UPDATE',
      '> TRANSACTION B DENIED: SEAT ALREADY RESERVED'
    ]);
  };

  return (
    <div className="bg-black/50 border border-white/10 p-4 font-mono">
      <div className="grid grid-cols-6 gap-2 mb-6">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={seat.status !== 'AVAILABLE' || (activeSeat !== null && activeSeat !== seat.id)}
            className={`h-8 border flex items-center justify-center text-[10px] transition-colors ${
              seat.status === 'AVAILABLE' ? 'border-white/30 bg-white/5 text-gray-400 hover:bg-white/20 hover:text-white' :
              seat.status === 'HELD' ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500 blink' :
              'border-red-500/50 bg-red-500/10 text-red-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {seat.status === 'AVAILABLE' ? seat.id + 1 : 'X'}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          {activeSeat !== null && (
            <button 
              onClick={simulateConcurrent}
              className="w-full border border-red-500 text-red-500 px-3 py-2 text-xs tracking-widest hover:bg-red-500 hover:text-white transition-colors"
            >
              [ SIMULATE CONCURRENT USER ]
            </button>
          )}
          <p className="text-[10px] text-gray-500 italic mt-2">
            "Transactional row-level locking prevents conflicting checkout operations from acquiring the same seat."
          </p>
        </div>
        
        <div className="flex-1 bg-black border border-white/20 p-2 text-[10px] h-32 overflow-y-auto font-mono text-green-500 flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className={log.includes('DENIED') ? 'text-red-500 font-bold' : ''}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MissionPanelProps {
  setActivePanel: (panel: string | null) => void;
}

const MissionPanel: React.FC<MissionPanelProps> = ({ setActivePanel }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingStep(1), 500);
    const t2 = setTimeout(() => setLoadingStep(2), 1000);
    const t3 = setTimeout(() => setLoadingStep(3), 1500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (loadingStep < 3) {
    return (
      <div className="h-full flex flex-col justify-center items-start text-white font-mono p-8 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 tracking-widest text-sm">
          &gt;&gt; TARGET LOCKED
        </motion.div>
        {loadingStep >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 tracking-widest text-sm">
            &gt;&gt; MISSION DATABASE ACCESSED
          </motion.div>
        )}
        {loadingStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 tracking-widest text-sm blink">
            &gt;&gt; 3 PROJECTS FOUND
            <br/><br/>
            &gt;&gt; SELECT MISSION
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white font-mono h-full flex flex-col space-y-6 relative"
    >
      <div className="flex justify-between items-end border-b border-white/20 pb-4 shrink-0">
        <div>
          <h2 className="text-3xl font-bold tracking-widest text-white">MISSION CONTROL</h2>
          <p className="text-sm text-gray-500 tracking-widest mt-1">TACTICAL DOSSIER ARCHIVE</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {['m01', 'm02', 'm03'].map((mId, i) => (
            <button 
              key={mId}
              onClick={() => setSelectedMission(mId)}
              className={`px-3 py-1 text-xs border transition-colors ${
                selectedMission === mId ? 'border-red-500 bg-red-500/20 text-red-500' : 'border-white/30 hover:bg-white/10 text-gray-400'
              }`}
            >
              [ MISSION 0{i+1} ]
            </button>
          ))}
          <button 
            onClick={() => setActivePanel(null)}
            className="px-3 py-1 text-xs border border-white/30 hover:bg-white hover:text-black transition-colors"
          >
            [ CLOSE MISSION CONTROL ]
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
        {!selectedMission ? (
          <div className="grid grid-cols-1 gap-6">
            {missionsData.map((mission, i) => (
              <motion.button 
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedMission(mission.id)}
                className="w-full text-left bg-white/5 border border-white/10 p-6 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
              >
                <p className="text-red-500 text-sm tracking-widest mb-1">MISSION 0{i + 1}</p>
                <h3 className="text-2xl font-bold tracking-widest mb-2 group-hover:text-white text-gray-200">{mission.title}</h3>
                <p className="text-xs text-gray-400 tracking-widest">{mission.subtitle}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {missionsData.filter(m => m.id === selectedMission).map(mission => (
              <motion.div 
                key={mission.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-4xl font-bold tracking-widest text-white">{mission.title}</h3>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 tracking-widest">MISSION STATUS</p>
                      <p className="text-sm text-green-500 tracking-widest font-bold blink">COMPLETED</p>
                    </div>
                  </div>
                  <p className="text-lg text-red-500 tracking-widest">{mission.subtitle}</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 tracking-widest mb-2 border-b border-white/10 pb-1">TECH STACK</p>
                    <div className="flex flex-wrap gap-2">
                      {mission.tech.map((t, i) => (
                        <span key={i} className="text-xs bg-black border border-white/20 px-2 py-1 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 tracking-widest mb-2 border-b border-white/10 pb-1">PROBLEM / SOLUTION</p>
                    <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-red-500 pl-3">
                      {mission.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 tracking-widest mb-2 border-b border-white/10 pb-1">KEY ENGINEERING</p>
                    <div className="grid grid-cols-2 gap-2">
                      {mission.highlights.map((h, i) => (
                        <div key={i} className="text-xs text-white bg-white/5 border border-white/5 p-2 flex items-center">
                          <span className="text-red-500 mr-2">›</span> {h.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 tracking-widest mb-3 border-b border-white/10 pb-1">ARCHITECTURE / SIMULATION</p>
                    {mission.id === 'm01' && <HelmArchitecture />}
                    {mission.id === 'm02' && <PharmAssistArchitecture />}
                    {mission.id === 'm03' && <ShowRushSimulation />}
                  </div>
                </div>

                <a 
                  href={mission.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full border border-white/30 bg-white/5 py-4 text-center text-sm tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  [ ACCESS GITHUB REPOSITORY ]
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default MissionPanel;
