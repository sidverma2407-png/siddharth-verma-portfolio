import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { motion } from 'framer-motion';

const CommsPanel: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  return (
    <div className="text-white font-mono space-y-8">
      <div className="border-l-2 border-teal-500 pl-4 py-2">
        <h2 className="text-3xl font-bold tracking-widest">COMMS</h2>
        <p className="text-sm text-teal-500 tracking-widest mt-1">ESTABLISH COMMUNICATION</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-5">
            <h3 className="text-sm text-gray-500 tracking-widest mb-5 border-b border-white/10 pb-2">DIRECT CHANNELS</h3>
            
            <div className="space-y-4 text-base">
              <a href={`mailto:${profileData.contact.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-teal-500 group-hover:text-teal-500 transition-colors">
                  @
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors break-all">{profileData.contact.email}</span>
              </a>
              
              <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-teal-500 group-hover:text-teal-500 transition-colors">
                  in
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
              </a>

              <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-teal-500 group-hover:text-teal-500 transition-colors">
                  gh
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="text-xs text-gray-400 border border-teal-500/30 bg-teal-500/10 p-4 space-y-1">
            <p className="text-teal-500 mb-2 font-bold tracking-widest">SYSTEM STATUS</p>
            <p>OPERATOR: SIDDHARTH VERMA</p>
            <p>AVAILABLE FOR OPPORTUNITIES: TRUE</p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 border border-white/10 p-5">
            <h3 className="text-sm text-gray-500 tracking-widest mb-3 border-b border-white/10 pb-2">CONNECTION REQUEST</h3>
            
            {status === 'sent' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-56 flex items-center justify-center text-teal-500 border border-teal-500/50 bg-teal-500/10"
              >
                <div className="text-center">
                  <p className="tracking-widest text-sm font-bold">TRANSMISSION SUCCESSFUL</p>
                  <p className="text-xs mt-2 text-teal-600">OPERATOR NOTIFIED.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 tracking-widest">DESTINATION (EMAIL)</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-black border border-white/20 p-3 text-base text-white focus:outline-none focus:border-teal-500 transition-colors font-mono"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 tracking-widest">MESSAGE</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-black border border-white/20 p-3 text-base text-white focus:outline-none focus:border-teal-500 transition-colors font-mono resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full border border-teal-500/50 bg-teal-500/10 text-teal-500 py-3 text-sm tracking-widest hover:bg-teal-500 hover:text-black transition-colors disabled:opacity-50 mt-2"
                >
                  {status === 'sending' ? 'TRANSMITTING...' : '[ TRANSMIT ]'}
                </button>
                <p className="text-[10px] text-gray-600 mt-3 text-center">
                  * Demo UI. Needs backend configuration.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommsPanel;
