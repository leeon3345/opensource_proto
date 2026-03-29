import React from 'react';
import { motion } from 'framer-motion';

const policies = [
  { id: 1, title: '접근 통제 (Access Control)', desc: '비인가자의 인프라 및 애플리케이션 접근을 원천 차단하고 권한을 최소화합니다.', color: 'from-orange-500/20 to-red-500/5', shadow: 'rgba(251,146,60,0.2)' },
  { id: 2, title: '데이터 암호화 (Encryption)', desc: 'KMS를 연동하여 중요 데이터를 저장 및 전송 구간에서 강력하게 암호화합니다.', color: 'from-red-500/20 to-rose-500/5', shadow: 'rgba(239,68,68,0.2)' },
  { id: 3, title: '로그 관리 (Audit Logging)', desc: 'CloudTrail 및 주요 서비스 로그를 안전한 S3 웜(WORM) 저장소에 영구 보관합니다.', color: 'from-rose-500/20 to-pink-500/5', shadow: 'rgba(244,63,94,0.2)' },
  { id: 4, title: '네트워크 보안 (Network Sec)', desc: 'VPC 분리, Security Group 보안, WAF/Shield를 이용해 불법 트래픽을 차단합니다.', color: 'from-pink-500/20 to-purple-500/5', shadow: 'rgba(236,72,153,0.2)' },
  { id: 5, title: '계정 통제 (IAM Control)', desc: 'MFA 필수 적용 및 사용자 암호 복잡도, 주기적 변경 정책을 강제 점검합니다.', color: 'from-purple-500/20 to-indigo-500/5', shadow: 'rgba(168,85,247,0.2)' },
];

const duplicatedPolicies = [...policies, ...policies];

export default function PolicyList() {
  return (
    <div className="flex flex-col gap-6 overflow-hidden pt-4 pb-0">
      <div className="flex items-center justify-between pointer-events-none px-2 border-b border-red-900/20 pb-4">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-300 drop-shadow-[0_0_4px_rgba(248,113,113,0.4)]">
          CSAP 필수 점검 레이더
        </h2>
        <span className="text-[10px] uppercase font-bold text-emerald-400/70 tracking-[0.2em] border border-emerald-900/40 px-3 py-1.5 rounded-full bg-emerald-900/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          Auto Monitoring
        </span>
      </div>
      
      <div className="relative overflow-hidden w-full py-4 -mx-2">
        {/* 양쪽 끝에 스르륵 사라지는 고급 그라데이션 가림막 배치 */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070303] to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: [0, -1720] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
          className="flex space-x-6 w-max pl-2"
        >
          {duplicatedPolicies.map((policy, index) => (
            <motion.div 
              key={`${policy.id}-${index}`} 
              whileHover={{ scale: 1.02, y: -5 }} 
              style={{ boxShadow: `0 0 15px ${policy.shadow}` }} 
              className={`w-[320px] h-[160px] p-6 rounded-2xl bg-gradient-to-br bg-[#110303]/60 ${policy.color} backdrop-blur-md relative border border-white/5 flex flex-col justify-between transition-all cursor-pointer`}
            >
              <h3 className="text-lg font-bold text-red-100 relative z-10 drop-shadow-md">{policy.title}</h3>
              <p className="text-[13px] text-red-100/60 leading-relaxed font-medium relative z-10">
                {policy.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
