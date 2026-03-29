import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import Scanner from './Scanner';
import AiAssistant from './AiAssistant';

const slides = [
  { id: 'dashboard', component: <Dashboard /> },
  { id: 'scanner', component: <div className="max-w-4xl mx-auto w-full"><Scanner /></div> },
  { id: 'ai', component: <div className="max-w-4xl mx-auto w-full"><AiAssistant /></div> }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    let delay = 8000;
    if (index === 0) delay = 4000; // 0: Dashboard (faster transition)
    if (index === 1) delay = 6500; // 1: Scanner (slower text, waits ~6.5s)
    if (index === 2) delay = 8000; // 2: AiAssistant
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [index]);

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

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-3 mt-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === idx ? 'bg-red-500 w-8 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-white/20 hover:bg-white/40'
              }`}
          />
        ))}
      </div>

    </div>
  );
}
