import React from 'react';
import { motion } from 'framer-motion';

const falcoEvents = [
  { id: 101, time: '14:28:10', rule: 'Terminal shell in container', pod: 'nginx-ingress-controller', namespace: 'kube-system', severity: 'CRITICAL', action: 'ISOLATED' },
  { id: 102, time: '14:22:05', rule: 'Read sensitive file untrusted', pod: 'web-frontend-77f', namespace: 'prod', severity: 'HIGH', action: 'BLOCKED' },
  { id: 103, time: '14:15:44', rule: 'Write below etc', pod: 'redis-master-0', namespace: 'database', severity: 'HIGH', action: 'BLOCKED' },
  { id: 104, time: '13:50:12', rule: 'Unexpected network connection', pod: 'payment-service-x', namespace: 'prod', severity: 'WARNING', action: 'LOGGED' },
];

export default function RuntimeProtection() {
  return (
    <div className="flex flex-col h-[460px] bg-[#120505]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(225,29,72,0.3)] border border-rose-500/30">
      
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-rose-500/20 bg-gradient-to-r from-rose-900/40 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-500/20 rounded-lg shadow-[0_0_15px_rgba(225,29,72,0.5)] border border-rose-400/30">
            <svg className="w-5 h-5 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-100 tracking-wide drop-shadow-md">Runtime Protection Engine</h2>
            <p className="text-[10px] text-rose-300/70 font-mono tracking-wider">Falco Powered Threat Detection</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)]"></span>
          </span>
          <span className="text-xs font-bold text-rose-400 tracking-widest uppercase">Detecting</span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
        
        {/* Threat Stats Summary */}
        <div className="flex gap-4 mb-2">
          <div className="flex-1 bg-black/40 border border-rose-900/40 rounded-lg p-3 flex justify-between items-center shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]">
            <span className="text-xs font-bold text-rose-400/70 uppercase">Critical Threats</span>
            <span className="text-xl font-black text-rose-500 drop-shadow-[0_0_5px_rgba(225,29,72,0.8)]">12</span>
          </div>
          <div className="flex-1 bg-black/40 border border-orange-900/40 rounded-lg p-3 flex justify-between items-center shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]">
            <span className="text-xs font-bold text-orange-400/70 uppercase">High Risks</span>
            <span className="text-xl font-black text-orange-400 drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">34</span>
          </div>
          <div className="flex-1 bg-black/40 border border-emerald-900/40 rounded-lg p-3 flex justify-between items-center shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]">
            <span className="text-xs font-bold text-emerald-400/70 uppercase">Mitigated</span>
            <span className="text-xl font-black text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]">100%</span>
          </div>
        </div>

        {/* Real-time Threat Events */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-smooth">
          {falcoEvents.map((evt, idx) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15 }}
              className="relative p-4 rounded-xl border border-rose-900/40 bg-gradient-to-r from-rose-950/30 to-black/40 hover:from-rose-900/40 hover:to-black/60 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.3)] backdrop-blur-sm group"
            >
              {/* Left highlight strip */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl opacity-80 ${evt.severity === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,1)]' : evt.severity === 'HIGH' ? 'bg-orange-500 shadow-[0_0_10px_rgba(251,146,60,1)]' : 'bg-yellow-500'}`} />
              
              <div className="flex justify-between items-start ml-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${evt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50' : evt.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'}`}>
                      {evt.severity}
                    </span>
                    <span className="text-xs font-mono text-rose-200/50">{evt.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-rose-100 group-hover:text-white drop-shadow-md transition-colors">{evt.rule}</h3>
                  <p className="text-[11px] text-rose-200/60 font-mono">
                    Target: <span className="text-rose-300">{evt.pod}</span> (NS: {evt.namespace})
                  </p>
                </div>
                
                {/* Action Tag */}
                <div className="flex flex-col items-end space-y-1">
                  <div className={`px-2.5 py-1 rounded text-[10px] uppercase font-black tracking-widest border shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center space-x-1
                    ${evt.action === 'ISOLATED' ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' : 
                      evt.action === 'BLOCKED' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 
                      'bg-slate-500/20 text-slate-300 border-slate-500/50'}`}
                  >
                    <span>{evt.action}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
