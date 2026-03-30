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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Touch swipe handlers for mobile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <div
      className="relative w-full py-4 sm:py-8 mt-2 sm:mt-4 group"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      {/* Slides Container */}
      <div className="relative min-h-[320px] sm:min-h-[420px] md:h-[480px] overflow-hidden flex items-center justify-center rounded-xl sm:rounded-2xl">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, position: 'absolute' }}
            animate={{ opacity: 1, scale: 1, zIndex: 10 }}
            exit={{ opacity: 0, scale: 0.95, zIndex: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full px-1 sm:px-4"
          >
            {slides[index].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - hidden on mobile, visible on hover for desktop */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-[-2rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all text-white/40 hover:text-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-[-2rem] top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all text-white/40 hover:text-white opacity-0 group-hover:opacity-100 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Pagination Navigation Bar - scrollable on mobile */}
      <div className="flex justify-center mt-4 sm:mt-6 px-2">
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#0a0e1a]/90 backdrop-blur-xl border border-indigo-500/20 shadow-[0_0_30px_rgba(0,0,0,0.6)] overflow-x-auto max-w-full">
          {['Admission', 'Runtime', 'Compliance', 'AI Policy', 'Report', 'YAML Diff'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
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

      {/* Mobile swipe hint */}
      <div className="sm:hidden flex justify-center mt-3">
        <span className="text-[10px] text-indigo-300/30 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
          스와이프하여 전환
        </span>
      </div>

    </div>
  );
}
