import React, { useState } from 'react';
import { skillsData } from '../../data/profile';
import { arsenalModules, type ModuleData } from '../../data/arsenalData';
import { motion, AnimatePresence } from 'framer-motion';

interface ArsenalPanelProps {
  setActivePanel: (panel: string | null) => void;
}

const ArsenalPanel: React.FC<ArsenalPanelProps> = ({ setActivePanel }) => {
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);

  const categories = [
    { title: "LANGUAGES", items: skillsData.languages },
    { title: "AI / ML", items: skillsData.ai_ml },
    { title: "BACKEND / DISTRIBUTED", items: skillsData.backend },
    { title: "DATABASES / CACHING", items: skillsData.databases },
    { title: "CLOUD / DEVOPS", items: skillsData.cloud_devops }
  ];

  const totalModules = categories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="text-white font-mono flex flex-col h-full space-y-6">
      
      {/* Dynamic Header */}
      <div className="border-l-2 border-red-500 pl-4 py-2 shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-widest">OPERATOR LOADOUT</h2>
          <p className="text-sm text-red-500 tracking-widest mt-1">SYSTEMS DEPLOYED: AI / BACKEND / DATA / DEVOPS</p>
        </div>
        
        <div className="text-right hidden sm:block">
          {selectedModule ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-xs text-gray-500 tracking-widest">ACTIVE MODULE</p>
              <p className="text-lg font-bold text-white tracking-widest">{selectedModule.name.toUpperCase()}</p>
              <p className="text-xs text-green-500 tracking-widest mt-1 blink">STATUS: ONLINE</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-xs text-gray-500 tracking-widest">MODULES ONLINE</p>
              <p className="text-2xl font-bold text-white tracking-widest">{totalModules}</p>
            </motion.div>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 tracking-widest animate-pulse shrink-0">SELECT MODULE TO VIEW DEPLOYMENT DATA</p>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 relative">
        
        {/* Module Grid (Left side) */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-20">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm text-gray-500 tracking-widest mb-3 border-b border-white/10 pb-2">
                // {cat.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((skill, j) => {
                  const isSelected = selectedModule?.name === skill;
                  return (
                    <button
                      key={j} 
                      onClick={() => setSelectedModule(arsenalModules[skill] || { id: "UNK-01", name: skill, category: "UNKNOWN", usedIn: [] })}
                      className={`relative group px-4 py-1.5 text-sm transition-all duration-300 border focus:outline-none ${
                        isSelected 
                          ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:border-red-500/50 hover:text-white'
                      }`}
                    >
                      {/* Scanline effect on selection */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>
                      )}
                      
                      <span className="relative z-10">{skill}</span>
                      
                      {/* Hover subtle readout */}
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-red-400 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black border border-white/10 px-1 pointer-events-none z-20">
                        MODULE AVAILABLE
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tactical Info Panel (Right side or bottom sheet on mobile) */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed bottom-0 left-0 w-full md:relative md:bottom-auto md:left-auto md:w-72 shrink-0 bg-black/95 md:bg-black/80 border-t md:border-t-0 md:border md:border-red-500/30 border-red-500/50 p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] md:shadow-none z-50 md:z-auto max-h-[60vh] md:max-h-none overflow-y-auto"
            >
              <div className="absolute top-0 right-0 p-2 text-[9px] text-red-500 border-b border-l border-red-500/30 hidden md:block">
                MODULE // {selectedModule.id}
              </div>

              {/* Mobile Close Button & Handle */}
              <div className="md:hidden flex justify-between items-center mb-4 pb-2 border-b border-white/10">
                <span className="text-[10px] text-red-500">MODULE // {selectedModule.id}</span>
                <button onClick={() => setSelectedModule(null)} className="text-xs text-gray-500 hover:text-white">[ CLOSE ]</button>
              </div>
              
              <h3 className="text-xl font-bold tracking-widest text-white md:mt-4">{selectedModule.name.toUpperCase()}</h3>
              
              <div className="space-y-5 mt-4 md:mt-6">
                <div>
                  <p className="text-[10px] text-gray-500 tracking-widest mb-1">CATEGORY</p>
                  <p className="text-sm text-gray-300 border-l-2 border-red-500 pl-2">{selectedModule.category}</p>
                </div>

                {(selectedModule.role || selectedModule.coreConcepts) && (
                  <div>
                    <p className="text-[10px] text-gray-500 tracking-widest mb-1">
                      {selectedModule.role ? 'ROLE' : 'CORE CONCEPTS'}
                    </p>
                    <div className="text-sm text-gray-300 border-l-2 border-red-500 pl-2 space-y-1">
                      {selectedModule.role ? (
                        <p>{selectedModule.role}</p>
                      ) : (
                        selectedModule.coreConcepts?.map((c, idx) => <p key={idx}>{c}</p>)
                      )}
                    </div>
                  </div>
                )}

                {selectedModule.usedIn.length > 0 && (
                  <div>
                    <p className="text-[10px] text-gray-500 tracking-widest mb-3">DEPLOYMENT MAP</p>
                    <div className="text-sm text-gray-300 font-mono ml-2 relative">
                      <div className="text-red-400 font-bold mb-1">{selectedModule.name.toUpperCase()}</div>
                      <div className="border-l border-white/20 ml-1.5 pl-4 py-1 space-y-2 relative">
                        {/* Animated pulse on connection line */}
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 1 }}
                          className="absolute left-[-1px] top-0 w-[1px] bg-red-500/50"
                        />
                        {selectedModule.usedIn.map((mission, idx) => {
                          const isLast = idx === selectedModule.usedIn.length - 1;
                          return (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (idx * 0.2) }}
                              className="relative flex items-center"
                            >
                              <span className="absolute -left-4 text-white/20">{isLast ? '└──' : '├──'}</span>
                              <span className="ml-3 text-white tracking-wider text-xs bg-white/10 px-1">{mission}</span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedModule.usedIn.length > 0 && (
                <button 
                  onClick={() => setActivePanel('missions')}
                  className="w-full mt-8 border border-white/30 px-3 py-2 text-xs tracking-widest text-center hover:bg-white hover:text-black transition-colors"
                >
                  [ VIEW RELATED {selectedModule.usedIn.length > 1 ? 'MISSIONS' : 'MISSION'} ]
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArsenalPanel;
