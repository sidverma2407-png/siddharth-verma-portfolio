import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ExperiencePanelProps {
  setActivePanel: (panel: string | null) => void;
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ setActivePanel }) => {
  const [loadingStep, setLoadingStep] = useState(0);

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
            &gt;&gt; ACCESSING FIELD RECORD...
          </motion.div>
        )}
        {loadingStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 tracking-widest text-sm blink">
            &gt;&gt; EXPERIENCE RECORD FOUND
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      className="text-white font-mono h-full flex flex-col space-y-6 relative"
    >
      <div className="border-l-2 border-yellow-500 pl-4 py-2 shrink-0">
        <h2 className="text-sm tracking-widest text-gray-500 mb-2">FIELD RECORD // 04</h2>
        <h3 className="text-3xl font-bold tracking-widest text-yellow-500">EMIAC TECHNOLOGIES</h3>
        <p className="text-xl text-white tracking-widest mt-1">AI/ML & SOFTWARE INTERN</p>
        <p className="text-xs text-gray-500 tracking-widest mt-2">MAY 2026 — JUL 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 space-y-8">
        
        {/* MAIN PERFORMANCE DISPLAY */}
        <div className="bg-white/5 border border-white/10 p-6 relative scanlines-subtle">
          <h4 className="text-xs text-gray-500 tracking-widest mb-6 border-b border-white/10 pb-2">
            // MAIN PERFORMANCE DISPLAY
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Metric 01 */}
            <div>
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">METRIC 01</p>
              <p className="text-xs text-gray-400 tracking-widest mb-3">KEYWORD COVERAGE</p>
              <div className="flex items-center gap-3 text-lg font-bold text-white font-mono">
                <span>38%</span>
                <div className="flex-1 h-[1px] bg-white/20 relative overflow-hidden flex items-center">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute left-0 h-full bg-yellow-500"
                  />
                  <motion.div 
                    initial={{ left: 0, opacity: 0 }}
                    animate={{ left: '100%', opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute -translate-x-full text-yellow-500 text-xs leading-none"
                  >
                    ►
                  </motion.div>
                </div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-yellow-500 blink"
                >
                  100%
                </motion.span>
              </div>
              <p className="text-[9px] text-gray-500 tracking-widest mt-2">PRODUCTION CONTENT BATCHES</p>
            </div>

            {/* Metric 02 */}
            <div>
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">METRIC 02</p>
              <p className="text-xs text-gray-400 tracking-widest mb-2">RESEARCH TURNAROUND</p>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl font-bold text-white"
                >
                  70% <span className="text-2xl text-yellow-500">↓</span>
                </motion.span>
              </div>
              <p className="text-sm text-yellow-500 tracking-widest mt-1">REDUCED BY 70%</p>
              <p className="text-[9px] text-gray-500 tracking-widest mt-1">MANUAL RESEARCH TURNAROUND</p>
            </div>

            {/* Metric 03 */}
            <div>
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">METRIC 03</p>
              <p className="text-xs text-gray-400 tracking-widest mb-2">AGENT WORKFLOW</p>
              <p className="text-3xl font-bold text-white mb-1">5 AGENTS</p>
              <p className="text-xs text-yellow-500 tracking-widest mb-3">5-AGENT LANGGRAPH WORKFLOW</p>
              <div className="border-l border-white/20 ml-2 pl-4 py-1 space-y-2 text-[10px] text-gray-300 relative">
                <div className="relative"><span className="absolute -left-4 text-white/20">├──</span>KEYWORD CLUSTERING</div>
                <div className="relative text-gray-500 pl-4">↓</div>
                <div className="relative"><span className="absolute -left-4 text-white/20">├──</span>SOURCE RETRIEVAL</div>
                <div className="relative text-gray-500 pl-4">↓</div>
                <div className="relative"><span className="absolute -left-4 text-white/20">└──</span>DRAFTING</div>
              </div>
            </div>

            {/* Metric 04 */}
            <div>
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">METRIC 04</p>
              <p className="text-xs text-gray-400 tracking-widest mb-2">VALIDATION</p>
              <p className="text-3xl font-bold text-white mb-1">15 PARAMETERS</p>
              <p className="text-xs text-yellow-500 tracking-widest mb-1">15 EVALUATION PARAMETERS</p>
              <p className="text-[10px] text-gray-500 tracking-widest">STRICT VALIDATION RUBRICS</p>
            </div>

          </div>
        </div>

        {/* EXPERIENCE DESCRIPTION */}
        <div className="space-y-4">
          <h4 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2">
            // EXPERIENCE DESCRIPTION
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">ROLE</p>
              <p className="text-sm font-bold text-white">AI/ML & SOFTWARE INTERN</p>
            </div>
            <div className="md:col-span-3 space-y-3">
              <p className="text-[10px] text-yellow-500 tracking-widest mb-1">CONTRIBUTION</p>
              <ul className="text-sm text-gray-300 space-y-3 list-disc list-inside marker:text-yellow-500">
                <li>Engineered a deterministic evaluation pipeline for client SEO workflows.</li>
                <li>Designed a 5-agent LangGraph workflow covering keyword clustering, source retrieval, and drafting.</li>
                <li>Formulated strict validation rubrics across 15 evaluation parameters alongside content strategists.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* VISUAL TIMELINE & OPERATIONAL IMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* VISUAL TIMELINE */}
          <div>
            <h4 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
              // VISUAL TIMELINE
            </h4>
            <div className="text-sm font-mono text-gray-300 ml-2 relative">
              <div className="text-yellow-500 font-bold mb-2">MAY 2026</div>
              <div className="border-l border-white/20 ml-[3px] pl-4 py-2 space-y-4 relative">
                <div className="relative"><span className="absolute -left-4 text-white/20">├──</span>Evaluation Pipeline</div>
                <div className="relative"><span className="absolute -left-4 text-white/20">├──</span>5-Agent LangGraph Workflow</div>
                <div className="relative"><span className="absolute -left-4 text-white/20">├──</span>Validation Rubrics</div>
                <div className="relative text-yellow-500 font-bold mt-4"><span className="absolute -left-4 text-white/20">└──</span>JUL 2026</div>
              </div>
            </div>
          </div>

          {/* OPERATIONAL IMPACT */}
          <div>
            <h4 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
              // OPERATIONAL IMPACT
            </h4>
            <div className="bg-black/50 border border-white/10 p-4 space-y-6">
              
              <div className="flex justify-between items-center text-center">
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 tracking-widest mb-1">KEYWORD COVERAGE</p>
                  <p className="text-lg font-bold text-white">38%</p>
                  <p className="text-[9px] text-gray-500">BEFORE</p>
                </div>
                <div className="text-yellow-500 px-4">→</div>
                <div className="flex-1">
                  <p className="text-[10px] text-transparent tracking-widest mb-1">.</p>
                  <p className="text-lg font-bold text-yellow-500">100%</p>
                  <p className="text-[9px] text-gray-500">AFTER</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center text-center">
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 tracking-widest mb-1">RESEARCH TURNAROUND</p>
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-[9px] text-gray-500">BASELINE</p>
                </div>
                <div className="text-yellow-500 px-4">→</div>
                <div className="flex-1">
                  <p className="text-[10px] text-transparent tracking-widest mb-1">.</p>
                  <p className="text-lg font-bold text-yellow-500">-70%</p>
                  <p className="text-[9px] text-gray-500">REDUCTION</p>
                </div>
              </div>

            </div>
          </div>

        </div>
        
        <div className="pt-4 border-t border-white/10 mt-8 text-right">
          <button 
            onClick={() => setActivePanel(null)}
            className="px-4 py-2 text-xs border border-white/30 hover:bg-white hover:text-black transition-colors"
          >
            [ CLOSE FIELD RECORD ]
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default ExperiencePanel;
