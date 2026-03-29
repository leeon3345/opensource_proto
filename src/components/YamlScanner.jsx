// 리액트 모듈 임포트
import React, { useState } from 'react';
import { YamlUploadIcon, PolicyScanIcon, CriticalViolationIcon } from '../icons/Icons';

// 스캐너 컴포넌트 정의
export default function YamlScanner() {
  // 상태 변수 할당
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // 스캔 실행 이벤트 조치
  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  // UI 요소 반환
  return (
    <div className="bg-[#140b0b] border border-red-900/40 rounded-2xl p-6 shadow-2xl flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <YamlUploadIcon className="w-8 h-8 text-red-400" />
        <h2 className="text-2xl font-semibold">YAML 매니페스트 스캐너</h2>
      </div>

      <div className="flex-grow bg-[#1a0c0c] rounded-xl p-4 font-mono text-sm text-gray-300 border border-red-900/50 mb-6 overflow-y-auto relative z-10">
        <pre className="whitespace-pre-wrap text-red-100/70">
          {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-gateway
spec:
  template:
    spec:
      containers:
      - name: app
        image: custom-repo/payment:latest
        securityContext:
          privileged: true`}
        </pre>
      </div>

      <button
        onClick={handleScan}
        disabled={isScanning}
        className="relative z-10 w-full py-4 bg-red-600 hover:bg-red-500 transition-colors rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <PolicyScanIcon className={`w-6 h-6 ${isScanning ? 'animate-spin' : ''}`} />
        {isScanning ? 'CSAP 정책 분석 진행...' : 'CSAP 컴플라이언스 진단 시작'}
      </button>

      {scanComplete && (
        <div className="relative z-10 mt-4 p-4 bg-red-950/50 border border-red-600/50 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CriticalViolationIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <h4 className="text-red-400 font-bold mb-1">위반 항목 탐지 (2건)</h4>
            <ul className="text-sm text-red-200/80 list-disc list-inside">
              <li>컨테이너 Privileged 권한 할당 (CSAP 가상화 보안 위반)</li>
              <li>':latest' 태그 사용 (CSAP 공급망 보안 위반)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}