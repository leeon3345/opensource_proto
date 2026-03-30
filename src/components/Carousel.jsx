import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdmissionSecurity from './AdmissionSecurity';
import RuntimeProtection from './RuntimeProtection';
import ComplianceOverview from './ComplianceOverview';
import AiAssistant from './AiAssistant';
import Scanner from './Scanner';
import YamlScanner from './YamlScanner';

const slides = [
  { id: 'admission', component: <div className="max-w-5xl mx-auto w-full"><AdmissionSecurity /></div> },
  { id: 'runtime', component: <div className="max-w-5xl mx-auto w-full"><RuntimeProtection /></div> },
  { id: 'compliance', component: <div className="max-w-5xl mx-auto w-full"><ComplianceOverview /></div> },
  { id: 'ai', component: <div className="max-w-5xl mx-auto w-full"><AiAssistant /></div> },
  { id: 'scanner', component: <div className="max-w-5xl mx-auto w-full"><Scanner /></div> },
  { id: 'yaml', component: <div className="max-w-5xl mx-auto w-full"><YamlScanner /></div> }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Auto-play interval has been removed for manual demo control

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative w-full py-8 mt-4 group">

      {/* Slides Container */}
      <div className="relative h-[480px] overflow-hidden flex items-center justify-center rounded-2xl">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, position: 'absolute' }}
            animate={{ opacity: 1, scale: 1, zIndex: 10 }}
            exit={{ opacity: 0, scale: 0.95, zIndex: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full px-4"
          >
            {slides[index].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-[-2rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all text-white/40 hover:text-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-[-2rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all text-white/40 hover:text-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Pagination Navigation Bar */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0a0e1a]/90 backdrop-blur-xl border border-indigo-500/20 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
          {['Admission', 'Runtime', 'Compliance', 'AI Policy', 'Report', 'YAML Diff'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
                index === idx
                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                  : 'text-white/30 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
