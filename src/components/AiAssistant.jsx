import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPrompt = "모든 파드의 root 권한 실행을 원천 차단하는 인프라 보안 정책 코드를 생성해 줘.";

const loadingStates = [
  "요구사항 분석 중...",
  "ISMS-P 인증 가이드라인 2.10.1 (접근 통제) 조항 검색 중...",
  "Kubernetes OPA/Kyverno 보안 문법 검토 중...",
  "정책 코드 최적화 및 생성 중..."
];

const generatedCode = [
  'apiVersion: kyverno.io/v1',
  'kind: ClusterPolicy',
  'metadata:',
  '  name: disallow-root-user',
  '  annotations:',
  '    policies.kyverno.io/title: Disallow Root User',
  '    policies.kyverno.io/category: Pod Security Standards (Restricted)',
  '    policies.kyverno.io/severity: high',
  'spec:',
  '  validationFailureAction: enforce',
  '  background: true',
  '  rules:',
  '  - name: check-runasnonroot',
  '    match:',
  '      resources:',
  '        kinds:',
  '        - Pod',
  '    validate:',
  '      message: "Running as root is not allowed. Set runAsNonRoot to true."',
  '      pattern:',
  '        spec:',
  '          securityContext:',
  '            runAsNonRoot: true',
  '          containers:',
  '          - name: "*"',
  '            securityContext:',
  '              runAsNonRoot: true'
];

export default function AiAssistant() {
  const [stage, setStage] = useState(0); 
  // 0: Init, 1: Loading, 2: Typing Code, 3: Done
  const [loadingText, setLoadingText] = useState(loadingStates[0]);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    // 1초 뒤 유저 프롬프트 완료 가정 후 로딩 진입
    const t1 = setTimeout(() => {
      setStage(1);
      
      // 로딩 텍스트 회전
      let step = 1;
      const loadInterval = setInterval(() => {
        if (step < loadingStates.length) {
          setLoadingText(loadingStates[step]);
          step++;
        } else {
          clearInterval(loadInterval);
        }
      }, 700); // 총 2.8초 소요

    }, 800);

    // 4초 뒤 로딩 완료 및 타이핑 전환
    const t2 = setTimeout(() => setStage(2), 4000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (stage === 2) {
      const interval = setInterval(() => {
        setVisibleLines(prev => {
          if (prev < generatedCode.length) return prev + 1;
          setStage(3);
          clearInterval(interval);
          return prev;
        });
      }, 70); // 한 줄당 70ms 타이핑 속도
      return () => clearInterval(interval);
    }
  }, [stage]);

  const getLineClass = (line) => {
    if (line.includes('apiVersion:') || line.includes('kind:')) return 'text-violet-400 font-bold';
    if (line.includes('name:') && !line.includes('- name:')) return 'text-fuchsia-300';
    if (line.includes('enforce') || line.includes('high') || line.includes('true')) return 'text-emerald-400 font-bold';
    if (line.includes('message:')) return 'text-amber-300';
    if (line.includes('policy')) return 'text-indigo-300';
    return 'text-indigo-100/70';
  }

  return (
    <div className="flex flex-col sm:flex-row w-full min-h-[320px] sm:min-h-[420px] md:h-[460px] bg-[#0A0710]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-violet-500/30">
      
      {/* Left Panel: Chat Interface */}
      <div className="w-full sm:w-1/2 flex flex-col border-b sm:border-b-0 sm:border-r border-violet-500/20 bg-gradient-to-b from-violet-900/10 to-transparent relative max-h-[250px] sm:max-h-none">
        {/* Header */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-violet-500/20 bg-violet-950/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-violet-500/20 rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.5)] border border-violet-400/30">
              <svg className="w-5 h-5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="font-bold text-xs sm:text-sm text-violet-100 tracking-wide drop-shadow-md">AI 보안 정책 비서</span>
          </div>
          <span className="text-[9px] uppercase font-bold text-violet-300/60 tracking-wider">Natural Language Engine</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4">
          
          {/* User Prompt Bubble */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-1 items-end w-full"
          >
            <span className="text-[10px] text-violet-300/50 mr-1">보안 담당자</span>
            <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-violet-600 border border-violet-400/50 rounded-2xl rounded-tr-sm text-xs sm:text-sm text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] max-w-[90%]">
              {defaultPrompt}
            </div>
          </motion.div>

          {/* AI Response / Loading Bubble */}
          {(stage >= 1) && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col space-y-1 items-start w-full mt-4"
            >
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stage === 1 ? 'bg-fuchsia-400' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${stage === 1 ? 'bg-fuchsia-500' : 'bg-emerald-500'}`}></span>
                </span>
                <span className="text-[10px] uppercase font-black text-violet-300/50">Gemini 1.5 Pro</span>
              </div>
              
              <div className="px-4 py-3 bg-[#110A1A] border border-violet-500/30 rounded-2xl rounded-tl-sm text-sm shadow-md max-w-[95%]">
                {stage === 1 ? (
                  // Loading State
                  <div className="flex items-center space-x-3 text-fuchsia-200">
                    <svg className="animate-spin h-4 w-4 text-fuchsia-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-mono text-[11px] animate-pulse">{loadingText}</span>
                  </div>
                ) : (
                  // Thinking Done
                  <div className="text-emerald-100 flex flex-col space-y-2">
                    <p>분석 완료! 다음 정책 초안을 우측 에디터에 생성했습니다.</p>
                    <ul className="text-[11px] text-emerald-200/60 list-disc ml-4 font-mono space-y-1">
                      <li>Kyverno ClusterPolicy (Disallow-Root)</li>
                      <li>위반 시 액션: <span className="text-rose-400">Enforce (차단)</span></li>
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>

        {/* Fake Input Area */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-violet-500/20 bg-black/20">
          <div className="w-full bg-violet-950/40 border border-violet-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-violet-400/40 text-sm">
            <span>추가 요구사항을 자연어로 입력하세요...</span>
            <svg className="w-4 h-4 cursor-not-allowed" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </div>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="w-full sm:w-1/2 flex flex-col bg-[#050308]/90 relative min-h-[200px] sm:min-h-0">
        
        {/* Editor Header & Actions */}
        <div className="px-3 sm:px-5 py-2 sm:py-3 border-b border-violet-500/20 bg-black/40 flex justify-between items-center z-10">
          <div className="flex space-x-1.5 item-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
            <span className="ml-3 text-[9px] sm:text-[10px] font-mono text-violet-300/50 truncate">/policies/disallow-root-user.yaml</span>
          </div>
          
          <AnimatePresence>
            {(stage >= 2) && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <button className="px-3 py-1.5 flex items-center space-x-1 border border-violet-500/30 rounded text-[10px] font-bold text-violet-300 hover:bg-violet-900/50 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span>COPY CODE</span>
                </button>
                <button className="px-3 py-1.5 flex items-center space-x-1 bg-violet-600 hover:bg-violet-500 border border-violet-400/50 rounded text-[10px] font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  <span>APPLY TO CLUSTER</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Code Output Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed relative flex">
          {stage < 2 ? (
            <div className="absolute inset-0 flex items-center justify-center text-violet-400/20 text-sm font-bold tracking-widest uppercase">
              Waiting for AI input...
            </div>
          ) : (
            <>
              {/* Line Numbers */}
              <div className="text-right pr-3 select-none text-violet-900/50 border-r border-violet-900/30 min-h-full">
                {generatedCode.slice(0, visibleLines).map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              
              {/* Typying Text */}
              <div className="pl-3 whitespace-pre pb-10">
                {generatedCode.slice(0, visibleLines).map((line, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}
                    className={getLineClass(line)}
                  >
                    {line}
                  </motion.div>
                ))}
                {stage === 2 && (
                  <span className="inline-block w-2h h-3 ml-1 bg-violet-400 animate-pulse">_</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mapping Info Footer (ISMS-P Tags) */}
        <AnimatePresence>
          {(stage >= 3) && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-[#0a0614]/90 border-t border-violet-500/30 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black text-violet-300 uppercase tracking-widest pl-1">Mapping Info</span>
                <div className="h-3 w-px bg-violet-500/30 mx-2" />
                <span className="px-2 py-0.5 bg-fuchsia-900/40 border border-fuchsia-500/40 text-fuchsia-200 text-[9px] font-bold rounded shadow-[0_0_8px_rgba(217,70,239,0.3)]">
                  [ISMS-P 2.10.1] 접근 통제
                </span>
                <span className="px-2 py-0.5 bg-violet-900/40 border border-violet-500/40 text-violet-200 text-[9px] font-bold rounded">
                  CIS Benchmark 5.2.1
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}