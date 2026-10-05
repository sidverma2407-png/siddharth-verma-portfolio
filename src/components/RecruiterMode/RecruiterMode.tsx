import React from 'react';
import { profileData, skillsData, missionsData, experienceData, intelData } from '../../data/profile';

interface RecruiterModeProps {
  onExit: () => void;
}

const RecruiterMode: React.FC<RecruiterModeProps> = ({ onExit }) => {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans p-6 md:p-12 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Navigation */}
        <nav className="flex justify-between items-center border-b border-gray-800 pb-4 sticky top-0 bg-black/90 backdrop-blur z-50">
          <div className="font-bold text-white tracking-widest">{profileData.name.toUpperCase()}</div>
          <button 
            onClick={onExit}
            className="text-xs font-mono border border-gray-700 px-3 py-1 hover:bg-white hover:text-black transition-colors"
          >
            [ EXIT RECRUITER MODE ]
          </button>
        </nav>

        {/* Profile */}
        <section className="space-y-4 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{profileData.name}</h1>
          <p className="text-xl text-gray-400">{profileData.role}</p>
          <p className="max-w-2xl text-gray-300 leading-relaxed">
            {profileData.intro}
          </p>
          <div className="flex gap-4 pt-4 font-mono text-sm">
            <a href={profileData.contact.github} className="text-blue-400 hover:underline">GitHub</a>
            <a href={profileData.contact.linkedin} className="text-blue-400 hover:underline">LinkedIn</a>
            <a href={`mailto:${profileData.contact.email}`} className="text-blue-400 hover:underline">Email</a>
            <a href="#" className="border border-white text-white px-3 py-1 hover:bg-white hover:text-black transition-colors ml-4">
              Download Resume
            </a>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Languages</h3>
              <p>{skillsData.languages.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">AI / ML</h3>
              <p>{skillsData.ai_ml.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Backend</h3>
              <p>{skillsData.backend.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Databases</h3>
              <p>{skillsData.databases.join(", ")}</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">Experience</h2>
          {experienceData.map((exp, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-300 ml-2">
                {exp.achievements.map((ach, j) => (
                  <li key={j}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">Projects</h2>
          <div className="space-y-8">
            {missionsData.map((project, i) => (
              <div key={i} className="space-y-2 border-l-2 border-gray-800 pl-4">
                <h3 className="text-xl font-bold text-white">{project.title} <span className="text-sm text-gray-500 font-normal"> - {project.subtitle}</span></h3>
                <p className="text-gray-300">{project.description}</p>
                <div className="text-sm font-mono text-gray-400 mt-2">
                  <span className="text-gray-500">Tech: </span>{project.tech.join(", ")}
                </div>
                <div className="flex gap-3 pt-2 font-mono text-sm">
                  <a href={project.links.project} className="text-blue-400 hover:underline">View Project</a>
                  <a href={project.links.github} className="text-blue-400 hover:underline">GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Leadership */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">Education & Leadership</h2>
          
          <div className="space-y-4">
            {intelData.education.map((edu, i) => (
              <div key={`edu-${i}`} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                  <p className="text-gray-400">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 font-mono block">{edu.duration}</span>
                  <span className="text-sm text-gray-300 font-mono">{edu.score}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-4">
            <h3 className="text-lg font-bold text-gray-400">Leadership</h3>
            {intelData.leadership.map((ldr, i) => (
              <div key={`ldr-${i}`} className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white">{ldr.organization}</h4>
                  <p className="text-gray-400 text-sm">{ldr.role}</p>
                </div>
                <span className="text-sm text-gray-500 font-mono">{ldr.duration}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-4 pb-20">
          <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">Certifications</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
            {intelData.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default RecruiterMode;
