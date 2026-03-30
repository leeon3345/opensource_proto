import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ComplianceOverview() {
  const [progress, setProgress] = useState(0);
  const target = 87;

  // Animate the number counter
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setProgress(current);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col h-[460px] bg-[#050a14]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-blue-500/30 relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-blue-500/20 bg-gradient-to-r from-blue-900/40 to-transparent relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-400/30">
            <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-100 tracking-wide drop-shadow-md">Compliance Status</h2>
            <p className="text-[10px] text-blue-300/70 font-mono tracking-wider">KISA ISMS-P Assessment Score</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            Score: Good
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        
        {/* Left Side: Detail Stats */}
        <div className="w-1/3 flex flex-col space-y-4">
          <div className="bg-[#0b0f19]/60 rounded-xl p-4 border border-blue-900/40 shadow-[0_0_15px_rgba(59,130,246,0.1)_inset]">
            <span className="text-[10px] font-bold text-blue-400/70 uppercase">Total Controls</span>
            <div className="text-2xl font-black text-blue-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">102</div>
          </div>
          <div className="bg-[#0b0f19]/60 rounded-xl p-4 border border-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.1)_inset]">
            <span className="text-[10px] font-bold text-emerald-400/70 uppercase">Passed</span>
            <div className="text-2xl font-black text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">89</div>
          </div>
          <div className="bg-[#0b0f19]/60 rounded-xl p-4 border border-rose-900/40 shadow-[0_0_15px_rgba(225,29,72,0.1)_inset]">
            <span className="text-[10px] font-bold text-rose-400/70 uppercase">Failed / Pending</span>
            <div className="text-2xl font-black text-rose-400 drop-shadow-[0_0_5px_rgba(225,29,72,0.5)]">13</div>
          </div>
        </div>

        {/* Center/Right Side: Radial Progress Bar */}
        <div className="w-2/3 flex flex-col justify-center items-center relative">
          <div className="relative flex justify-center items-center w-[240px] h-[240px]">
            {/* Background Circle */}
            <svg className="absolute w-[240px] h-[240px] transform -rotate-90">
              <circle
                cx="120"
                cy="120"
                r={radius}
                className="stroke-blue-900/30"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <motion.circle
                cx="120"
                cy="120"
                r={radius}
                className="stroke-blue-400"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                style={{ strokeDashoffset, filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.8))' }}
              />
            </svg>
            
            {/* Inner Content */}
            <div className="flex flex-col items-center justify-center relative z-20">
              <span className="text-[10px] text-blue-300/60 uppercase tracking-widest font-bold mb-1">Compliance</span>
              <div className="flex items-baseline">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]">
                  {progress}
                </span>
                <span className="text-2xl font-bold text-blue-500 ml-1">%</span>
              </div>
              <span className="text-[9px] text-blue-400/40 uppercase mt-2 border border-blue-900/50 px-2 py-0.5 rounded-full">Target &gt; 80%</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-blue-300/40 mt-2">102개 보안 제어 항목 기준 · 89 Pass / 13 Fail</div>
        </div>

      </div>
    </div>
  );
}
