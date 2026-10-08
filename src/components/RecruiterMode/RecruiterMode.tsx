import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Environment from '../Environment/Environment';
import { profileData, skillsData, missionsData, experienceData, intelData } from '../../data/profile';

interface RecruiterModeProps {
  onExit: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'leadership', label: 'LEADERSHIP' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'contact', label: 'CONTACT' },
];

const RecruiterMode: React.FC<RecruiterModeProps> = ({ onExit }) => {
  const [phase, setPhase] = useState<'entering' | 'ready' | 'exiting'>('entering');

  useEffect(() => {
    if (phase === 'entering') {
      const t = setTimeout(() => {
        setPhase('ready');
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleExit = () => {
    setPhase('exiting');
    setTimeout(() => {
      onExit();
    }, 1200);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-gray-300 font-mono overflow-x-hidden selection:bg-green-500/30 selection:text-green-500 scroll-smooth">`n      <div className="fixed inset-0 z-[-2] pointer-events-none"><Environment /></div>`n      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#03050A]/90 backdrop-blur-sm"></div>
      <AnimatePresence mode="wait">
        {phase === 'entering' && (
          <motion.div
            key="entering"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black"
          >
            <div className="flex flex-col gap-2">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xs text-gray-500 tracking-widest">&gt;&gt; SWITCHING INTERFACE</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xs text-white tracking-widest">&gt;&gt; RECRUITER MODE</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-xs text-green-500 tracking-widest blink">&gt;&gt; READY</motion.p>
            </div>
          </motion.div>
        )}

        {phase === 'exiting' && (
          <motion.div
            key="exiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black"
          >
            <p className="text-xs text-green-500 tracking-widest blink">&gt;&gt; RESTORING TACTICAL INTERFACE...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${phase === 'ready' ? 'opacity-100' : 'opacity-0'} relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 p-6 md:p-12 lg:py-24`}>
        
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0 relative">
          <div className="sticky top-0 lg:top-24 bg-[#0a0a0a]/90 backdrop-blur z-40 py-4 lg:py-0 flex flex-col gap-4 lg:gap-8 border-b border-white/10 lg:border-none mb-8 lg:mb-0">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-widest mb-1">SIDDHARTH VERMA</h1>
              <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] mb-2 lg:mb-4 uppercase">Computer Science & Engineering</p>
              <p className="text-[8px] md:text-[10px] text-green-500 tracking-[0.3em] uppercase">AI / Software / Distributed Systems</p>
            </div>

            <nav className="flex overflow-x-auto lg:flex-col gap-4 lg:gap-3 pb-2 lg:pb-0 scrollbar-hide">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="whitespace-nowrap text-left text-[10px] md:text-xs tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button 
              onClick={handleExit}
              className="hidden lg:block mt-8 border border-green-500/50 text-green-500 bg-green-500/10 px-4 py-2 text-xs tracking-widest hover:bg-green-500 hover:text-black transition-colors w-max"
            >
              [ OPERATOR MODE ]
            </button>
          </div>
        </aside>

        {/* Mobile Operator Mode Button (sticky bottom) */}
        <button 
          onClick={handleExit}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 border border-green-500/50 text-green-500 bg-black/90 backdrop-blur px-6 py-3 text-[10px] tracking-widest hover:bg-green-500 hover:text-black transition-colors shadow-[0_0_20px_rgba(0,0,0,0.8)] z-50 whitespace-nowrap"
        >
          [ RESTORE OPERATOR MODE ]
        </button>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col gap-24">
          
          <section id="about" className="scroll-mt-24 space-y-8">
            <div className="flex flex-wrap gap-4 text-xs font-bold tracking-widest">
              <a href="https://drive.google.com/file/d/1CZK7uw4SqRT6-zBGuYeirH8rggePRc0L/view?usp=drive_link" target="_blank" rel="noreferrer" className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ DOWNLOAD RESUME ]</a>
              <a href={profileData.contact.github} target="_blank" rel="noreferrer" className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ GITHUB ]</a>
              <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer" className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ LINKEDIN ]</a>
              <button onClick={() => scrollTo('contact')} className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ CONTACT ]</button>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed text-gray-400 max-w-2xl border-l-2 border-white/20 pl-4 py-1 font-sans">
              Computer Science & Engineering student at Vellore Institute of Technology focused on AI/ML, backend engineering and distributed systems.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-white/10 p-4 md:p-6 bg-white/5">
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">CGPA</p>
                <p className="text-xl md:text-2xl font-bold text-white">{profileData.cgpa}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">EXPERIENCE</p>
                <p className="text-xs md:text-sm font-bold text-white mt-2">AI/ML & Software Intern</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">PROJECTS</p>
                <p className="text-xl md:text-2xl font-bold text-white">0{missionsData.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 tracking-widest mb-1">LEADERSHIP</p>
                <p className="text-xl md:text-2xl font-bold text-white">0{intelData.leadership.length}</p>
              </div>
            </div>
          </section>

          <section id="experience" className="scroll-mt-24 space-y-8">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">EXPERIENCE</h2>
            {experienceData.map((exp, i) => (
              <div key={i} className="space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wider">{exp.company}</h3>
                    <p className="text-xs text-green-500 tracking-widest mt-1">{exp.role}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 tracking-widest">{exp.duration.toUpperCase()}</p>
                </div>
                <ul className="list-none space-y-4 text-xs md:text-sm text-gray-400 pl-4 border-l border-white/10 mt-4 font-sans leading-relaxed">
                  <li><strong className="text-white font-mono">38% Ã¢â€ â€™ 100%</strong> Keyword Coverage</li>
                  <li><strong className="text-white font-mono">70%</strong> Reduction in manual research turnaround</li>
                  <li><strong className="text-white font-mono">5-agent</strong> LangGraph workflow</li>
                  <li><strong className="text-white font-mono">15</strong> Evaluation parameters</li>
                </ul>
              </div>
            ))}
          </section>

          <section id="projects" className="scroll-mt-24 space-y-12">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">PROJECTS</h2>
            {missionsData.map((mission, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-lg font-bold text-white tracking-wider">{mission.title}</h3>
                <p className="text-[12px] md:text-sm text-gray-400 font-sans leading-relaxed">{mission.subtitle}</p>
                <p className="text-xs text-gray-400 font-sans tracking-widest text-blue-400">{mission.tech.join(' â€¢ ')}</p>
                <div className="flex gap-4 pt-2 text-[10px] tracking-widest">
                  <a href={mission.links.project || '#'} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors">[ VIEW PROJECT ]</a>
                  <a href={mission.links.github || '#'} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-white transition-colors">[ GITHUB ]</a>
                </div>
              </div>
            ))}
          </section>

          <section id="skills" className="scroll-mt-24 space-y-8">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">SKILLS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[10px] text-gray-500 tracking-widest mb-4 font-mono">LANGUAGES</h3>
                <p className="text-sm text-gray-300 leading-loose font-sans">{skillsData.languages.join('\n').split('\n').map((l, idx) => <React.Fragment key={idx}>{l}<br/></React.Fragment>)}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-gray-500 tracking-widest mb-4 font-mono">AI / ML</h3>
                <p className="text-sm text-gray-300 leading-loose font-sans">{skillsData.ai_ml.join('\n').split('\n').map((l, idx) => <React.Fragment key={idx}>{l}<br/></React.Fragment>)}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-gray-500 tracking-widest mb-4 font-mono">BACKEND / DISTRIBUTED</h3>
                <p className="text-sm text-gray-300 leading-loose font-sans">{skillsData.backend.join('\n').split('\n').map((l, idx) => <React.Fragment key={idx}>{l}<br/></React.Fragment>)}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-gray-500 tracking-widest mb-4 font-mono">DATABASES / CACHING</h3>
                <p className="text-sm text-gray-300 leading-loose font-sans">{skillsData.databases.join('\n').split('\n').map((l, idx) => <React.Fragment key={idx}>{l}<br/></React.Fragment>)}</p>
              </div>
              <div>
                <h3 className="text-[10px] text-gray-500 tracking-widest mb-4 font-mono">CLOUD / DEVOPS</h3>
                <p className="text-sm text-gray-300 leading-loose font-sans">{skillsData.cloud_devops.join('\n').split('\n').map((l, idx) => <React.Fragment key={idx}>{l}<br/></React.Fragment>)}</p>
              </div>
            </div>
          </section>

          <section id="education" className="scroll-mt-24 space-y-8">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">EDUCATION</h2>
            <div className="space-y-8">
              {intelData.education.map((edu, i) => (
                <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-300 tracking-wider">{edu.institution}</h3>
                    <p className="text-xs text-gray-400 mt-1">{edu.degree}</p>
                    <p className="text-xs text-white font-bold mt-2">{edu.score}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 tracking-widest">{edu.duration}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="leadership" className="scroll-mt-24 space-y-8">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">LEADERSHIP</h2>
            <div className="space-y-6">
              {intelData.leadership.map((ldr, i) => (
                <div key={i}>
                  <h3 className="text-base font-bold text-white tracking-wider">{ldr.organization.toUpperCase()}</h3>
                  <p className="text-xs text-gray-400 mt-1">{ldr.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="certifications" className="scroll-mt-24 space-y-8">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">CERTIFICATIONS</h2>
            <ul className="list-none space-y-3 text-xs text-gray-300">
              {intelData.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </section>

          <section id="contact" className="scroll-mt-24 space-y-8 pb-32">
            <h2 className="text-sm tracking-widest text-white border-b border-white/20 pb-2">CONTACT</h2>
            <p className="text-xs text-gray-400">Open to Software Engineering, AI/ML, Backend, and Systems opportunities.</p>
            <div className="flex gap-4 font-bold tracking-widest text-[10px]">
              <a href={`mailto:${profileData.contact.email}`} className="border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors">[ EMAIL ]</a>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default RecruiterMode;
