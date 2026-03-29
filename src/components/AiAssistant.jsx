import React from 'react';
import { motion } from 'framer-motion';

const violationCode = [
  'resource "aws_iam_user_policy_attachment" "admin" {',
  '  user       = aws_iam_user.db_admin.name',
  '  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"',
  '}'
];

const remedyCode = [
  'resource "aws_iam_user_policy_attachment" "admin" {',
  '  user       = aws_iam_user.db_admin.name',
  '  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSFullAccess"',
  '}'
];

export default function AiAssistant() {
  return (
    <motion.div
      className="flex flex-col h-[420px] bg-[#0c0202]/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-red-900/20"
    >
      <div className="px-5 py-4 border-b border-red-900/30 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-red-900/40 rounded-lg shadow-[0_0_10px_rgba(220,38,38,0.5)]">
            <svg className="w-4 h-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-red-100 tracking-wide drop-shadow-md">AI 보안 전문 비서</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-1 bg-red-900/60 text-white rounded border border-red-500/50 shadow-[0_0_8px_rgba(220,38,38,0.6)]">
          [CRITICAL] IAM 권한 조치안
        </span>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-black/50 p-4 gap-4">

        {/* Violation */}
        <div className="flex-1 flex flex-col bg-[#140505]/80 rounded-xl border border-red-900/30 overflow-hidden relative shadow-[0_0_15px_rgba(220,38,38,0.1)_inset]">
          <div className="absolute top-0 right-0 px-2 py-1 bg-red-900/40 text-red-300 text-[9px] font-bold rounded-bl-lg">기존 코드</div>
          <div className="flex-1 overflow-x-auto p-3 flex">
            <div className="text-right pr-3 select-none text-red-900/50 font-mono text-xs border-r border-red-900/30 leading-relaxed">
              {violationCode.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="pl-3 font-mono text-xs text-red-200/50 leading-relaxed whitespace-pre">
              {violationCode.map((line, i) => (
                <div key={i}>{line.includes('AdministratorAccess') ? <span className="bg-red-500/30 text-rose-300 px-1 rounded block w-fit">{line}</span> : line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Remedy */}
        <div className="flex-1 flex flex-col bg-[#05140b]/80 rounded-xl border border-emerald-900/30 overflow-hidden relative shadow-[0_0_15px_rgba(16,185,129,0.1)_inset]">
          <div className="absolute top-0 right-0 px-2 py-1 bg-emerald-900/40 text-emerald-300 text-[9px] font-bold rounded-bl-lg">수정 코드</div>
          <div className="flex-1 overflow-x-auto p-3 flex">
            <div className="text-right pr-3 select-none text-emerald-900/50 font-mono text-xs border-r border-emerald-900/30 leading-relaxed">
              {remedyCode.map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="pl-3 font-mono text-xs text-emerald-200/70 leading-relaxed whitespace-pre">
              {remedyCode.map((line, i) => (
                <div key={i}>{line.includes('AmazonRDSFullAccess') ? <span className="bg-emerald-500/30 text-emerald-300 px-1 rounded block w-fit shadow-[0_0_5px_rgba(16,185,129,0.5)]">{line}</span> : line}</div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="px-5 py-3 border-t border-red-900/30 bg-black/40 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-500 text-white text-sm font-bold rounded-lg shadow-[0_0_8px_rgba(225,29,72,0.3)] hover:shadow-[0_0_12px_rgba(225,29,72,0.4)] transition-all flex items-center space-x-2"
        >
          <span>원클릭 자동 조치</span>
          <svg className="w-4 h-4 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}