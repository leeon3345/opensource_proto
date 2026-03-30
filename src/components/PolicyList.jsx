import React from 'react';
import { motion } from 'framer-motion';

const policies = [
  { id: 1, title: 'Admission Control', desc: 'Kyverno Mutate로 securityContext 자동 주입 및 Gatekeeper를 통한 루트 권한 배포 차단', color: 'from-indigo-500/20 to-violet-600/20', shadow: 'rgba(99,102,241,0.2)' },
  { id: 2, title: 'Image Security', desc: 'Trivy Operator 기반 실시간 이미지 스캔 및 Critical 취약점 발견 시 배포 승인 거부', color: 'from-violet-500/20 to-purple-600/20', shadow: 'rgba(139,92,246,0.2)' },
  { id: 3, title: 'Runtime Protection', desc: 'Falco eBPF 센서로 커널 시스콜 감시 및 쉘 접속 등 이상 행위 탐지 시 Pod 즉시 격리', color: 'from-purple-500/20 to-fuchsia-600/20', shadow: 'rgba(168,85,247,0.2)' },
  { id: 4, title: 'Policy GitOps', desc: '보안 정책의 코드화(PaC)를 통한 버전 관리 및 변경 이력에 대한 투명한 감사 추적', color: 'from-fuchsia-500/20 to-pink-600/20', shadow: 'rgba(217,70,239,0.2)' },
  { id: 5, title: 'Compliance Report', desc: 'PolicyReport CRD 데이터를 집계하여 KISA ISMS-P 인증 항목별 준수율 실시간 산출', color: 'from-blue-500/20 to-indigo-600/20', shadow: 'rgba(59,130,246,0.2)' },
];

const duplicatedPolicies = [...policies, ...policies];

export default function PolicyList() {
  return (
    <div className="flex flex-col gap-6 overflow-hidden pt-4 pb-0">
      <div className="flex items-center justify-between pointer-events-none px-2 border-b border-indigo-900/30 pb-3 sm:pb-4">
        <h2 className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-300 drop-shadow-[0_0_4px_rgba(99,102,241,0.6)]">
          ISMS-P 런타임 보안 정책 모니터링
        </h2>
        <span className="text-[10px] uppercase font-bold text-emerald-400/70 tracking-[0.2em] border border-emerald-900/40 px-3 py-1.5 rounded-full bg-emerald-900/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          Auto Monitoring
        </span>
      </div>
      
      <div className="relative overflow-hidden w-full py-3 sm:py-4 -mx-2">
        {/* 양쪽 끝에 스르륵 사라지는 고급 그라데이션 가림막 배치 */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070303] to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: [0, -1720] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
          className="flex space-x-4 sm:space-x-6 w-max pl-2"
        >
          {duplicatedPolicies.map((policy, index) => (
            <motion.div 
              key={`${policy.id}-${index}`} 
              whileHover={{ scale: 1.02, y: -5 }} 
              style={{ boxShadow: `0 0 15px ${policy.shadow}` }} 
              className={`w-[240px] sm:w-[320px] h-[130px] sm:h-[160px] p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br bg-[#060410]/60 ${policy.color} backdrop-blur-md relative border border-indigo-400/20 flex flex-col justify-between transition-all cursor-pointer`}
            >
              <h3 className="text-base sm:text-lg font-bold text-indigo-100 relative z-10 drop-shadow-md">{policy.title}</h3>
              <p className="text-[11px] sm:text-[13px] text-indigo-200/70 leading-relaxed font-medium relative z-10 line-clamp-2">
                {policy.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
