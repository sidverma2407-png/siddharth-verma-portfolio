import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntelPanelProps {
  setActivePanel: (panel: string | null) => void;
}

const IntelPanel: React.FC<IntelPanelProps> = ({ setActivePanel }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeRecord, setActiveRecord] = useState<string | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingStep(1), 500);
    const t2 = setTimeout(() => setLoadingStep(2), 1000);
    const t3 = setTimeout(() => setLoadingStep(3), 1500);
    const t4 = setTimeout(() => setLoadingStep(4), 2000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (loadingStep < 4) {
    return (
      <div className="h-full flex flex-col justify-center items-start text-white font-mono p-8 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-500 tracking-widest text-sm">
          &gt;&gt; TARGET LOCKED
        </motion.div>
        {loadingStep >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 tracking-widest text-sm">
            &gt;&gt; ACCESSING PERSONNEL INTELLIGENCE...
          </motion.div>
        )}
        {loadingStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 tracking-widest text-sm">
            &gt;&gt; ACADEMIC RECORD FOUND
          </motion.div>
        )}
        {loadingStep >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 tracking-widest text-sm blink">
            &gt;&gt; CLEARANCE DATA AVAILABLE
          </motion.div>
        )}
      </div>
    );
  }

  const handleRecordClick = (id: string) => {
    setActiveRecord(id === activeRecord ? null : id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className="text-white font-mono h-full flex flex-col space-y-6 relative"
    >
      {/* HEADER */}
      <div className="border-l-2 border-purple-500 pl-4 py-2 shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-white">INTELLIGENCE DOSSIER // 05</h2>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="text-green-500 blink tracking-widest">STATUS: VERIFIED</span>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] text-gray-500 tracking-widest">RECORDS</p>
          <p className="text-xs text-purple-400 tracking-widest mt-1">ACADEMIC</p>
          <p className="text-xs text-purple-400 tracking-widest">LEADERSHIP</p>
          <p className="text-xs text-purple-400 tracking-widest">CERTIFICATIONS</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 space-y-8">
        
        {/* INTERACTIVE READOUT PANEL */}
        <AnimatePresence mode="wait">
          {activeRecord && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-purple-500/10 border border-purple-500/30 p-4 overflow-hidden"
            >
              <div className="text-purple-400 text-sm tracking-widest font-bold mb-2">
                &gt; DECRYPTING RECORD PAYLOAD...
              </div>
              <div className="text-white text-xs tracking-widest space-y-1">
                {activeRecord === 'VIT' && (
                  <>
                    <p>ACADEMIC RECORD</p>
                    <p>B.TECH CSE</p>
                    <p>2023—2027</p>
                    <p className="text-green-500">CGPA 8.28</p>
                  </>
                )}
                {activeRecord === 'KRM' && (
                  <>
                    <p>ACADEMIC RECORD</p>
                    <p>SECONDARY EDUCATION VERIFIED</p>
                  </>
                )}
                {activeRecord === 'IEEE' && (
                  <>
                    <p>LEADERSHIP RECORD</p>
                    <p className="text-yellow-500">500+ PARTICIPANTS</p>
                    <p>MANAGEMENT & EVENTS</p>
                  </>
                )}
                {activeRecord === 'MOZ' && (
                  <>
                    <p>OPERATIONS + DESIGN</p>
                    <p>OPEN-SOURCE EVENTS</p>
                    <p>SPEAKER SESSIONS</p>
                    <p>CODING BOOTCAMPS</p>
                  </>
                )}
                {activeRecord.startsWith('CERT') && (
                  <p className="text-green-500 blink">CERTIFICATION VERIFIED</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 01: EDUCATION */}
        <div>
          <h3 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // SECTION 01 — EDUCATION
          </h3>
          <button 
            onClick={() => handleRecordClick('VIT')}
            className={`w-full text-left bg-white/5 border p-5 transition-all relative scanlines-subtle group ${
              activeRecord === 'VIT' ? 'border-purple-500' : 'border-white/10 hover:border-purple-500/50'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="text-xl font-bold text-white tracking-widest">VELLORE INSTITUTE OF TECHNOLOGY</h4>
                <p className="text-sm text-purple-400 tracking-widest mt-1">B.TECH</p>
                <p className="text-xs text-gray-300 tracking-widest mt-1">COMPUTER SCIENCE AND ENGINEERING</p>
                <div className="flex gap-4 mt-3">
                  <p className="text-xs text-gray-500 tracking-widest">2023 — 2027</p>
                  <p className="text-xs text-gray-500 tracking-widest">LOCATION: VELLORE, TAMIL NADU</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 tracking-widest">CGPA</p>
                <p className="text-4xl font-bold text-green-500 blink">8.28</p>
              </div>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-purple-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-purple-500"></div>
          </button>
        </div>

        {/* SECTION 02: SCHOOL RECORD */}
        <div>
          <h3 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // SECTION 02 — SCHOOL RECORD
          </h3>
          <button 
            onClick={() => handleRecordClick('KRM')}
            className={`w-full text-left bg-black/50 border p-4 transition-all group ${
              activeRecord === 'KRM' ? 'border-purple-500' : 'border-white/5 hover:border-purple-500/50'
            }`}
          >
            <div className="flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
              <div>
                <h4 className="text-sm font-bold text-gray-300 tracking-widest">KR MANGALAM WORLD SCHOOL</h4>
                <p className="text-[10px] text-gray-500 tracking-widest mt-1">2021 — 2023</p>
              </div>
              <div className="flex gap-4 text-xs font-bold text-gray-400">
                <p>CLASS XII: <span className="text-green-500/70">88%</span></p>
                <p>CLASS X: <span className="text-green-500/70">96%</span></p>
              </div>
            </div>
          </button>
        </div>

        {/* SECTION 03: LEADERSHIP */}
        <div>
          <h3 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // SECTION 03 — LEADERSHIP & OPERATIONS
          </h3>
          <div className="grid grid-cols-1 gap-4">
            
            <button 
              onClick={() => handleRecordClick('IEEE')}
              className={`text-left bg-white/5 border p-5 transition-all relative group ${
                activeRecord === 'IEEE' ? 'border-purple-500' : 'border-white/10 hover:border-purple-500/50'
              }`}
            >
              <h4 className="text-lg font-bold text-white tracking-widest mb-1">IEEE COMPUTER SOCIETY CHAPTER — VIT</h4>
              <p className="text-xs text-purple-400 tracking-widest mb-1">CORE COMMITTEE MEMBER | MANAGEMENT & EVENTS</p>
              <p className="text-[10px] text-gray-500 tracking-widest mb-4">MAR 2025 — JAN 2026</p>
              
              <div className="bg-purple-500/10 border border-purple-500/30 p-2 mb-4 inline-block">
                <p className="text-xs font-bold text-yellow-500 blink">HIGHLIGHT: 500+ PARTICIPANTS</p>
              </div>
              
              <p className="text-xs text-gray-300 leading-relaxed mb-4 border-l-2 border-purple-500 pl-3">
                Spearheaded end-to-end logistics, schedule orchestration, and operational workflows for flagship technical fests and multi-track hackathons engaging 500+ participants.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {['EVENT OPERATIONS', 'LOGISTICS', 'SCHEDULE ORCHESTRATION', 'HACKATHONS'].map((tag, i) => (
                  <span key={i} className="text-[9px] border border-white/20 px-2 py-1 text-gray-400 bg-black">{tag}</span>
                ))}
              </div>
            </button>

            <button 
              onClick={() => handleRecordClick('MOZ')}
              className={`text-left bg-white/5 border p-5 transition-all relative group ${
                activeRecord === 'MOZ' ? 'border-purple-500' : 'border-white/10 hover:border-purple-500/50'
              }`}
            >
              <h4 className="text-lg font-bold text-white tracking-widest mb-1">MOZILLA FIREFOX CLUB — VIT</h4>
              <p className="text-xs text-purple-400 tracking-widest mb-1">CORE COMMITTEE MEMBER | OPERATIONS & DESIGN</p>
              <p className="text-[10px] text-gray-500 tracking-widest mb-4">MAR 2025 — APR 2026</p>
              
              <p className="text-xs text-gray-300 leading-relaxed mb-4 border-l-2 border-purple-500 pl-3">
                Coordinated cross-functional teams for open-source meetups, speaker sessions, and coding bootcamps.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {['OPERATIONS', 'OPEN SOURCE', 'EVENTS', 'DESIGN'].map((tag, i) => (
                  <span key={i} className="text-[9px] border border-white/20 px-2 py-1 text-gray-400 bg-black">{tag}</span>
                ))}
              </div>
            </button>

          </div>
        </div>

        {/* SECTION 04: CERTIFICATIONS */}
        <div>
          <h3 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // SECTION 04 — CERTIFICATION CLEARANCE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'CERT_1', title: 'MERN STACK DEVELOPER', issuer: 'ETHNUS' },
              { id: 'CERT_2', title: 'C++ PROGRAMMING BASICS', issuer: 'N/A' },
              { id: 'CERT_3', title: 'CYBER SECURITY TRAINING', issuer: 'HACKERSHALA' },
              { id: 'CERT_4', title: 'PYTHON (100 DAYS OF CODE)', issuer: 'UDEMY' }
            ].map((cert) => (
              <button 
                key={cert.id}
                onClick={() => handleRecordClick(cert.id)}
                className={`flex justify-between items-center text-left bg-black border p-4 transition-all group ${
                  activeRecord === cert.id ? 'border-green-500' : 'border-white/10 hover:border-green-500/50'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-gray-200 tracking-widest">{cert.title}</h4>
                  {cert.issuer !== 'N/A' && (
                    <p className="text-[10px] text-gray-500 tracking-widest mt-1">{cert.issuer}</p>
                  )}
                </div>
                {activeRecord === cert.id ? (
                  <span className="text-[10px] text-green-500 border border-green-500 px-1 blink">VERIFIED</span>
                ) : (
                  <span className="text-[10px] text-gray-600 border border-gray-600 px-1 group-hover:text-green-500/50 group-hover:border-green-500/50">LOCKED</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* CLOSE BUTTON */}
        <div className="pt-8 border-t border-white/10 mt-8 text-right">
          <button 
            onClick={() => setActivePanel(null)}
            className="px-4 py-2 text-xs border border-white/30 hover:bg-white hover:text-black transition-colors"
          >
            [ CLOSE INTELLIGENCE ]
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default IntelPanel;
