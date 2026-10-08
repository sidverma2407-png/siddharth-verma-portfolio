import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Configuration variable for resume PDF
const RESUME_URL = "/resume.pdf";

interface CommsPanelProps {
  setActivePanel: (panel: string | null) => void;
}

const CommsPanel: React.FC<CommsPanelProps> = ({ setActivePanel }) => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'prepared'>('idle');

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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '', message: '' };
    let hasError = false;

    if (!form.name.trim()) {
      newErrors.name = 'CALLSIGN REQUIRED';
      hasError = true;
    }
    if (!form.email.trim() || !validateEmail(form.email)) {
      newErrors.email = 'VALID EMAIL REQUIRED';
      hasError = true;
    }
    if (!form.message.trim()) {
      newErrors.message = 'MESSAGE REQUIRED';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setFormStatus('submitting');
      setTimeout(() => {
        setFormStatus('prepared');
      }, 1500);
    }
  };

  if (loadingStep < 3) {
    return (
      <div className="h-full flex flex-col justify-center items-start text-white font-mono p-8 space-y-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 tracking-widest text-sm">
          &gt;&gt; TARGET LOCKED
        </motion.div>
        {loadingStep >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-400 tracking-widest text-sm">
            &gt;&gt; ESTABLISHING SECURE CHANNEL...
          </motion.div>
        )}
        {loadingStep >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 tracking-widest text-sm blink">
            &gt;&gt; COMMUNICATION CHANNEL READY
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
      {/* SECURE CHANNEL HEADER */}
      <div className="border-l-2 border-red-500 pl-4 py-2 shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-white">COMMS TERMINAL // 06</h2>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="text-gray-500 tracking-widest">CHANNEL: SECURE</span>
            <span className="text-green-500 blink tracking-widest">STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10 space-y-8">
        
        {/* IDENTITY */}
        <div className="bg-white/5 border border-white/10 p-6 scanlines-subtle relative overflow-hidden">
          {/* TACTICAL CONNECTION VISUALIZATION (Background) */}
          <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <path d="M 0 50 Q 50 50 100 0" stroke={activeChannel === 'email' ? '#ef4444' : '#fff'} fill="none" strokeDasharray="4 4" className="transition-colors duration-500" />
              <path d="M 0 50 Q 50 50 100 33" stroke={activeChannel === 'github' ? '#ef4444' : '#fff'} fill="none" strokeDasharray="4 4" className="transition-colors duration-500" />
              <path d="M 0 50 Q 50 50 100 66" stroke={activeChannel === 'linkedin' ? '#ef4444' : '#fff'} fill="none" strokeDasharray="4 4" className="transition-colors duration-500" />
              <path d="M 0 50 Q 50 50 100 100" stroke={activeChannel === 'resume' ? '#ef4444' : '#fff'} fill="none" strokeDasharray="4 4" className="transition-colors duration-500" />
              
              <circle cx="20" cy="50" r="4" fill="#ef4444" />
              <circle cx="150" cy="10" r="3" fill={activeChannel === 'email' ? '#ef4444' : '#fff'} className="transition-colors duration-500" />
              <circle cx="150" cy="40" r="3" fill={activeChannel === 'github' ? '#ef4444' : '#fff'} className="transition-colors duration-500" />
              <circle cx="150" cy="70" r="3" fill={activeChannel === 'linkedin' ? '#ef4444' : '#fff'} className="transition-colors duration-500" />
              <circle cx="150" cy="100" r="3" fill={activeChannel === 'resume' ? '#ef4444' : '#fff'} className="transition-colors duration-500" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-widest mb-1">SIDDHARTH VERMA</h3>
            <p className="text-red-400 tracking-widest mb-2 font-bold">SOFTWARE ENGINEER</p>
            <p className="text-xs text-gray-400 tracking-widest mb-6">AI / SOFTWARE / DISTRIBUTED SYSTEMS</p>
            
            <div className="border-l border-white/20 pl-4 py-1">
              <p className="text-[10px] text-gray-500 tracking-widest mb-2">OPEN TO:</p>
              <div className="flex flex-wrap gap-2 text-[10px] text-gray-300">
                <span className="bg-black border border-white/20 px-2 py-1">SOFTWARE ENGINEERING</span>
                <span className="bg-black border border-white/20 px-2 py-1">AI/ML</span>
                <span className="bg-black border border-white/20 px-2 py-1">BACKEND</span>
                <span className="bg-black border border-white/20 px-2 py-1">SYSTEMS</span>
                <span className="bg-black border border-white/20 px-2 py-1 border-red-500/30 text-red-400">INTERESTING TECHNICAL COLLABORATIONS</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT CHANNELS */}
        <div>
          <h4 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // SECURE CHANNELS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 01 // EMAIL */}
            <div 
              className="bg-black border border-white/10 p-4 hover:border-red-500/50 transition-colors group flex flex-col justify-between h-32"
              onMouseEnter={() => setActiveChannel('email')}
              onMouseLeave={() => setActiveChannel(null)}
            >
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">01 // EMAIL</p>
                <p className="text-[10px] md:text-xs text-white truncate">sid.verma2407@gmail.com</p>
              </div>
              <a 
                href="mailto:sid.verma2407@gmail.com"
                className="block text-center text-[10px] border border-white/20 py-2 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-black transition-colors font-bold mt-4"
              >
                [ SEND EMAIL ]
              </a>
            </div>

            {/* 02 // GITHUB */}
            <div 
              className="bg-black border border-white/10 p-4 hover:border-red-500/50 transition-colors group flex flex-col justify-between h-32"
              onMouseEnter={() => setActiveChannel('github')}
              onMouseLeave={() => setActiveChannel(null)}
            >
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">02 // GITHUB</p>
                <p className="text-[10px] md:text-xs text-white truncate">github.com/sidverma2407-png</p>
              </div>
              <a 
                href="https://github.com/sidverma2407-png"
                target="_blank"
                rel="noreferrer"
                className="block text-center text-[10px] border border-white/20 py-2 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-black transition-colors font-bold mt-4"
              >
                [ OPEN GITHUB ]
              </a>
            </div>

            {/* 03 // LINKEDIN */}
            <div 
              className="bg-black border border-white/10 p-4 hover:border-red-500/50 transition-colors group flex flex-col justify-between h-32"
              onMouseEnter={() => setActiveChannel('linkedin')}
              onMouseLeave={() => setActiveChannel(null)}
            >
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">03 // LINKEDIN</p>
                <p className="text-[10px] md:text-xs text-white truncate">linkedin.com/in/siddharth-verma...</p>
              </div>
              <a 
                href="https://www.linkedin.com/in/siddharth-verma-a03b58304"
                target="_blank"
                rel="noreferrer"
                className="block text-center text-[10px] border border-white/20 py-2 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-black transition-colors font-bold mt-4"
              >
                [ OPEN LINKEDIN ]
              </a>
            </div>

          </div>

          <div 
            className="mt-4"
            onMouseEnter={() => setActiveChannel('resume')}
            onMouseLeave={() => setActiveChannel(null)}
          >
            <a 
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center text-xs md:text-sm tracking-widest border border-white/30 bg-white/5 py-4 hover:bg-white hover:text-black transition-colors font-bold"
            >
              [ DOWNLOAD RESUME ]
            </a>
          </div>
        </div>

        {/* CONTACT TERMINAL */}
        <div>
          <h4 className="text-xs text-gray-500 tracking-widest border-b border-white/10 pb-2 mb-4">
            // ESTABLISH COMMUNICATION
          </h4>
          <div className="bg-white/5 border border-white/10 p-6">
            
            {formStatus === 'idle' && (
              <form onSubmit={handleTransmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-gray-500 tracking-widest mb-1">CALLSIGN / NAME</label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-red-500'} px-3 py-2 text-sm text-white font-mono outline-none transition-colors`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1 blink">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 tracking-widest mb-1">EMAIL</label>
                  <input 
                    type="text" 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-red-500'} px-3 py-2 text-sm text-white font-mono outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1 blink">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 tracking-widest mb-1">MESSAGE</label>
                  <textarea 
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full bg-black border ${errors.message ? 'border-red-500' : 'border-white/20 focus:border-red-500'} px-3 py-2 text-sm text-white font-mono outline-none transition-colors resize-none`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-1 blink">{errors.message}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full border border-red-500/50 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black py-3 text-xs tracking-widest font-bold transition-colors"
                >
                  [ TRANSMIT MESSAGE ]
                </button>
              </form>
            )}

            {formStatus === 'submitting' && (
              <div className="h-48 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border border-t-red-500 border-r-red-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="text-xs tracking-widest text-red-500 blink">ENCRYPTING PAYLOAD...</p>
              </div>
            )}

            {formStatus === 'prepared' && (
              <div className="h-48 flex flex-col items-center justify-center text-center space-y-4 border border-yellow-500/30 bg-yellow-500/10 p-6">
                <p className="text-xs text-yellow-500 tracking-widest">&gt;&gt; MESSAGE PREPARED</p>
                <p className="text-[10px] text-gray-400 tracking-widest">&gt;&gt; NO TRANSMISSION SERVICE CONFIGURED</p>
                <a 
                  href={`mailto:sid.verma2407@gmail.com?subject=Transmission from ${form.name}&body=${encodeURIComponent(form.message)}`}
                  className="mt-4 border border-yellow-500 px-6 py-2 text-xs tracking-widest text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors font-bold"
                >
                  [ OPEN EMAIL CLIENT ]
                </a>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-[9px] text-gray-500 hover:text-white underline mt-2"
                >
                  RESET TERMINAL
                </button>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-8 pb-4 text-center space-y-6">
          <p className="text-xs md:text-sm text-gray-400 tracking-widest">
            "GOOD SOFTWARE STARTS WITH A GOOD PROBLEM."
          </p>
          <button 
            onClick={() => setActivePanel(null)}
            className="px-6 py-2 text-xs border border-white/30 hover:bg-white hover:text-black transition-colors tracking-widest font-bold"
          >
            [ CLOSE COMMS ]
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default CommsPanel;
