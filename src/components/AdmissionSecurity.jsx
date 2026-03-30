import React from 'react';
import { motion } from 'framer-motion';

const blockedEvents = [
  { id: 1, time: '14:23:41', resource: 'Deployment/payment-api', rule: 'require-ro-rootfs', action: 'BLOCKED', color: 'text-rose-400' },
  { id: 2, time: '14:15:22', resource: 'Pod/redis-cache', rule: 'disallow-privilege-escalation', action: 'MUTATED', color: 'text-indigo-400' },
  { id: 3, time: '13:58:10', resource: 'DaemonSet/fluentd', rule: 'restrict-host-namespaces', action: 'BLOCKED', color: 'text-rose-400' },
  { id: 4, time: '13:42:05', resource: 'StatefulSet/mysql', rule: 'require-resource-requests', action: 'MUTATED', color: 'text-emerald-400' },
];

export default function AdmissionSecurity() {
  return (
    <div className="flex flex-col h-[460px] bg-[#0c1222]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(30,58,138,0.3)] border border-indigo-500/30">
      
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-indigo-500/20 bg-gradient-to-r from-indigo-900/40 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/30">
            <svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-indigo-100 tracking-wide drop-shadow-md">Admission Security</h2>
            <p className="text-[10px] text-indigo-300/70 font-mono tracking-wider">Kyverno & Gatekeeper Runtime Webhook</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
          </span>
          <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Active</span>
        </div>
      </div>

      <div className="flex-1 p-6 flex gap-6 min-h-0">
        
        {/* Left Column: Metrics */}
        <div className="w-1/3 flex flex-col gap-4 min-h-0">
          <div className="bg-[#0b0f19]/80 rounded-xl p-5 border border-rose-900/40 shadow-[0_0_20px_rgba(225,29,72,0.1)_inset] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-all duration-500"></div>
            <h3 className="text-xs font-bold text-rose-200/60 uppercase tracking-widest mb-1">위험 배포 차단 횟수</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-red-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                142
              </span>
              <span className="text-xs font-bold text-rose-400">건</span>
            </div>
            <div className="mt-3 text-[10px] font-mono text-rose-300/60 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +12% from yesterday
            </div>
          </div>

          <div className="bg-[#0b0f19]/80 rounded-xl p-5 border border-indigo-900/40 shadow-[0_0_20px_rgba(79,70,229,0.1)_inset] relative overflow-hidden group flex-1">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>
             <h3 className="text-xs font-bold text-indigo-200/60 uppercase tracking-widest mb-1">자동 교정 성공률</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
                98.5
              </span>
              <span className="text-xs font-bold text-indigo-400">%</span>
            </div>
            <div className="w-full bg-indigo-950/50 h-1.5 rounded-full mt-4 overflow-hidden border border-indigo-900/30">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '98.5%' }} 
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.8)]" 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Event Log */}
        <div className="w-2/3 flex flex-col bg-[#0b0f19]/80 rounded-xl border border-indigo-900/30 shadow-[0_0_15px_rgba(0,0,0,0.5)_inset] overflow-hidden min-h-0">
          <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/30 flex justify-between items-center">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">실시간 웹훅 감사 로그 (Real-time Webhook)</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Total 1,024 Events</span>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {blockedEvents.map((evt, idx) => (
              <motion.div 
                key={evt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/20 hover:bg-indigo-900/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-mono text-indigo-400/60">{evt.time}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-indigo-100">{evt.resource}</span>
                    <span className="text-[10px] text-indigo-300/50 font-mono">Violated: {evt.rule}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest border shadow-[0_0_8px_rgba(0,0,0,0.5)] ${evt.action === 'BLOCKED' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'}`}>
                  {evt.action}
                </div>
              </motion.div>
            ))}
            {/* Fake pulsing typing indicator */}
            <div className="p-3 text-xs font-mono text-indigo-400/40 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="ml-2">Waiting for new events...</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
