import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const YAML_LOGS = [
  "[SYSTEM] CSAP 진단 스캐너 구동 준비...",
  "[INFO] 클라우드 계정 정보 동기화 완료 (arn:aws:iam::123456789)",
  "[INFO] infrastructure.yaml 파일 분석 시작...",
  "[WARN] Security Group (sg-0abc123) 검증 중...",
  "[WARN] >> SSH(22) 포트 0.0.0.0/0 개방 감지",
  "[CRITICAL] IAM 정책 및 역할 분석 진행 중...",
  "[CRITICAL] >> AdministratorAccess 권한 직접 할당 발견 (User: db-admin)",
  "[INFO] 데이터베이스 스토리지 계층 점검 중...",
  "[WARN] >> S3 버킷 (csap-assets-prod) 퍼블릭 접근 허용됨",
  "[INFO] 암호화 키 관리 구성 확인 중...",
  "[INFO] >> KMS 순환 정책 정상 적용됨",
  "[SYSTEM] 분석 완료. 조치 권고안을 생성합니다."
];

export default function Scanner() {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const processNextLog = () => {
      if (currentIndex < YAML_LOGS.length) {
        setLogs(prev => [...prev, YAML_LOGS[currentIndex]]);
        setProgress(Math.floor(((currentIndex + 1) / YAML_LOGS.length) * 100));
        currentIndex++;
        timeoutId = setTimeout(processNextLog, Math.floor(Math.random() * 300) + 250);
      }
    };

    timeoutId = setTimeout(processNextLog, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const getLogStyle = (text) => {
    if (!text) return 'text-white/50';
    if (text.includes('[CRITICAL]')) return 'text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]';
    if (text.includes('[WARN]')) return 'text-orange-300 drop-shadow-[0_0_5px_rgba(253,186,116,0.3)]';
    if (text.includes('[INFO]')) return 'text-emerald-300 drop-shadow-[0_0_5px_rgba(110,231,183,0.3)]';
    if (text.includes('[SYSTEM]')) return 'text-blue-300 font-semibold';
    return 'text-white/60';
  };

  return (
    <div
      className="flex flex-col h-[420px] bg-[#0c0202]/70 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-red-900/20"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-red-900/30 bg-white/5">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
          <div className="w-3 h-3 rounded-full bg-orange-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-3 text-xs font-mono text-white/40 tracking-wider">yaml-inspector.sh</span>
        </div>
        <div className="text-xs font-mono text-red-400 font-bold">{progress}%</div>
      </div>

      <div className="h-[2px] bg-red-900/20 w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_10px_rgba(225,29,72,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed space-y-2 scroll-smooth">
        {logs.map((log, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className={`tracking-tight ${getLogStyle(log)}`}>
            {log}
          </motion.div>
        ))}
        {progress < 100 && (
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-red-500/80 inline-block align-middle ml-2" />
        )}
      </div>
    </div>
  );
}
