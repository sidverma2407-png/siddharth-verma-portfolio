import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';

const ProfilePanel: React.FC = () => {
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadingStep(1), 600);
    const t2 = setTimeout(() => setLoadingStep(2), 1200);
    const t3 = setTimeout(() => setLoadingStep(3), 1800);
    
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
            &gt;&gt; ACCESSING PERSONNEL FILE...
          </motion.div>
        )}
        {loadingStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 tracking-widest text-sm blink">
            &gt;&gt; IDENTITY VERIFIED
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
      className="text-white font-mono h-full flex flex-col relative"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20"></div>

      <div className="p-6 md:p-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-8">
          <h2 className="text-sm tracking-widest text-gray-500">PERSONNEL FILE // 01</h2>
          <span className="text-[10px] text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-0.5 blink">CLASSIFIED</span>
        </div>

        <div className="space-y-8">
          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-widest mb-2"
            >
              SIDDHARTH VERMA
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="text-lg text-green-500 tracking-widest"
            >
              COMPUTER SCIENCE ENGINEER
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 p-5 relative scanlines-subtle"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 tracking-widest mb-1">INSTITUTION</p>
                <p className="text-sm font-bold tracking-wide">VELLORE INSTITUTE OF TECHNOLOGY</p>
                <p className="text-xs text-gray-300 mt-1">B.TECH â€” COMPUTER SCIENCE & ENGINEERING</p>
                <p className="text-xs text-gray-500 mt-1">2023 â€” 2027</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 tracking-widest mb-1">PERFORMANCE RATING</p>
                <p className="text-2xl font-bold text-white">CGPA <span className="text-green-500">8.28</span></p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-gray-500 tracking-widest mb-2">SPECIALIZATION</p>
            <div className="border-l-2 border-red-500 pl-4 py-1">
              <p className="text-xl tracking-widest">AI / SOFTWARE / SYSTEMS</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="border-t border-white/10 pt-6"
          >
            <p className="text-base text-gray-300 leading-relaxed italic border-l-4 border-white/20 pl-4 bg-white/5 py-3">
              "I build software systems that combine AI, backend engineering and real-world problem solving."
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.7 }}
        className="p-6 md:p-8 pt-0 mt-auto"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-white/50 bg-white/10 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors font-bold">
            [ VIEW RESUME ]
          </a>
          <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="flex-1 text-center border border-white/30 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors">
            [ GITHUB ]
          </a>
          <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer" className="flex-1 text-center border border-white/30 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-colors">
            [ LINKEDIN ]
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePanel;
