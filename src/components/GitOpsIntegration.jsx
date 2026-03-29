// 모듈 임포트
import React from 'react';
import { GithubIcon } from '../icons/Icons';

// 버튼 컴포넌트 반환
export default function GitOpsIntegration() {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1f0f0f] hover:bg-[#2a1313] border border-red-900/50 rounded-lg text-sm font-semibold text-red-100 transition-all shadow-sm">
      <GithubIcon className="w-5 h-5 text-red-400" />
      <span>GitOps 보안 정책 동기화</span>
    </button>
  );
}