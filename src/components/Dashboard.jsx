import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, ShieldWarning } from '../icons/Icons';

const metrics = [
  { id: 'critical', label: 'CRITICAL', count: 2, textColor: 'text-red-500', glow: 'rgba(239,68,68,0.25)', icon: <ShieldAlert className="w-8 h-8 text-red-500" /> },
  { id: 'warning', label: 'WARNING', count: 8, textColor: 'text-orange-400', glow: 'rgba(251,146,60,0.15)', icon: <ShieldWarning className="w-8 h-8 text-orange-400" /> },
  { id: 'passed', label: 'PASSED', count: 184, textColor: 'text-emerald-500', glow: 'rgba(16,185,129,0.15)', icon: <ShieldCheck className="w-8 h-8 text-emerald-500" /> }
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, scale: 0.95, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } } };

export default function Dashboard() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <motion.div
          key={metric.id}
          variants={itemVariants}
          style={{ boxShadow: `0 0 30px ${metric.glow}` }}
          className="flex items-center p-6 rounded-2xl bg-[#0e0303]/60 backdrop-blur-xl hover:bg-[#1f0505]/80 transition-all border border-white/5"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 mr-5 shadow-inner">
            {metric.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 text-[11px] font-bold mb-1 tracking-widest">{metric.label}</span>
            <span className={`text-5xl font-extrabold ${metric.textColor} drop-shadow-md`}>{metric.count}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
