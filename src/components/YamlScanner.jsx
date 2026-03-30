import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const beforeLines = [
  { text: "apiVersion: apps/v1", type: "normal" },
  { text: "kind: Deployment", type: "normal" },
  { text: "metadata:", type: "normal" },
  { text: "  name: payment-gateway", type: "normal" },
  { text: "spec:", type: "normal" },
  { text: "  template:", type: "normal" },
  { text: "    spec:", type: "normal" },
  { text: "      containers:", type: "normal" },
  { text: "      - name: app", type: "normal" },
  { text: "        image: custom-repo/payment:latest", type: "delete" },
  { text: "        securityContext:", type: "normal" },
  { text: "          privileged: true", type: "delete" }
];

const afterLines = [
  { text: "apiVersion: apps/v1", type: "normal" },
  { text: "kind: Deployment", type: "normal" },
  { text: "metadata:", type: "normal" },
  { text: "  name: payment-gateway", type: "normal" },
  { text: "spec:", type: "normal" },
  { text: "  template:", type: "normal" },
  { text: "    spec:", type: "normal" },
  { text: "      containers:", type: "normal" },
  { text: "      - name: app", type: "normal" },
  { text: "        image: custom-repo/payment:v1.2.4", type: "add", msg: "공급망 보안: 명시적인 이미지 버전 태그가 권장됩니다." },
  { text: "        securityContext:", type: "normal" },
  { text: "          privileged: false", type: "add" },
  { text: "          runAsNonRoot: true", type: "add", msg: "[ISMS-P 2.6.2] 컨테이너 Root 권한 실행 방지를 위해 runAsNonRoot 설정이 추가되었습니다." },
  { text: "          readOnlyRootFilesystem: true", type: "add", msg: "[ISMS-P 2.10.4] 중요 디렉토리 변조 방지를 위해 읽기 전용으로 설정되었습니다." }
];

export default function YamlScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [hoveredMsg, setHoveredMsg] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000); // Simulate scanning delay
  };

  const showTooltip = (e, msg) => {
    if (!msg) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({ x: rect.left, y: rect.top - 40 });
    setHoveredMsg(msg);
  };

  const renderTooltip = () => {
    if (!hoveredMsg) return null;
    return (
      <div 
        className="fixed z-50 px-3 py-2 text-xs font-bold text-emerald-100 bg-[#06180E]/95 border border-emerald-500/40 rounded shadow-[0_0_15px_rgba(16,185,129,0.5)] pointer-events-none transform -translate-x-1/2 -translate-y-full whitespace-nowrap"
        style={{ left: hoverPosition.x + 10, top: hoverPosition.y + 30 }}
      >
        <div className="flex items-center space-x-1">
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{hoveredMsg}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-[320px] sm:min-h-[420px] md:h-[460px] bg-[#0A0E17]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.2)] border border-emerald-500/30 font-sans relative">
      
      {/* Header */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/40 to-transparent flex flex-col sm:flex-row sm:items-center justify-between z-10 gap-2 sm:gap-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-emerald-400/30">
            <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-emerald-100 tracking-wide drop-shadow-md">YAML Auto-Remediation</h2>
            <p className="text-[10px] text-emerald-300/70 font-mono tracking-wider">Kyverno Mutate Engine Integration</p>
          </div>
        </div>
        {!scanComplete ? (
          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 transition-colors rounded text-xs font-bold text-white shadow-[0_0_10px_rgba(16,185,129,0.5)] flex items-center space-x-2 ${isScanning ? 'opacity-70 cursor-wait' : ''}`}
          >
            <svg className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>{isScanning ? '교정본 생성 중...' : '자동 교정 (Mutate) 시작'}</span>
          </button>
        ) : (
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-[10px] uppercase font-black tracking-widest rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            Mutation Completed
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!scanComplete ? (
            /* Upload State */
            <motion.div 
              key="upload" 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-center w-full h-full p-6"
            >
              <div className="w-full max-w-lg border-2 border-dashed border-emerald-500/30 rounded-xl bg-emerald-950/20 flex flex-col items-center justify-center p-10 hover:bg-emerald-900/20 transition-colors cursor-pointer group">
                <div className="p-4 bg-emerald-900/40 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-emerald-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-emerald-100 font-bold mb-2">YAML 매니페스트 업로드</h3>
                <p className="text-xs text-emerald-300/50 text-center">infrastructure.yaml 파일을 드래그커나 클릭하여 업로드 하세요.<br/>업로드 후 Kyverno 교정을 시작할 수 있습니다.</p>
              </div>
            </motion.div>
          ) : (
            /* Diff Viewer State */
            <motion.div 
              key="diff" 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col pt-2 bg-gradient-to-t from-emerald-950/20 to-black/20"
            >
              {/* Diff Split Board */}
              <div className="flex-1 flex flex-col sm:flex-row px-2 sm:px-4 gap-2 sm:gap-4 overflow-hidden mb-[70px]">
                
                {/* Left: Original */}
                <div className="w-full sm:w-1/2 flex flex-col bg-rose-950/10 border border-rose-900/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.05)_inset] max-h-[150px] sm:max-h-none">
                  <div className="py-2 px-4 bg-rose-950/40 text-[10px] font-bold text-rose-300/80 uppercase tracking-widest border-b border-rose-900/40 flex justify-between items-center">
                    <span>Before (Original)</span>
                    <span className="text-[9px] bg-rose-900/50 px-1.5 rounded opacity-60">2 Violations</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 sm:p-3 font-mono text-[10px] sm:text-xs leading-loose pt-2">
                    {beforeLines.map((line, idx) => (
                      <div key={idx} className={`px-2 flex ${line.type === 'delete' ? 'bg-rose-500/20 text-rose-200 border-l-[3px] border-rose-500' : 'text-slate-300/70 border-l-[3px] border-transparent'}`}>
                        <span className="select-none text-rose-800 w-6 opacity-60 text-[10px] leading-5 pt-0.5">{idx + 1}</span>
                        <span className="whitespace-pre">{line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Mutated */}
                <div className="w-full sm:w-1/2 flex flex-col bg-emerald-950/10 border border-emerald-900/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.05)_inset] max-h-[150px] sm:max-h-none">
                  <div className="py-2 px-4 bg-emerald-950/40 text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest border-b border-emerald-900/40 flex justify-between items-center">
                    <span>After (Secure Mutated)</span>
                    <span className="text-[9px] bg-emerald-500/20 px-1.5 rounded text-emerald-200">Kyverno Patched</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 sm:p-3 font-mono text-[10px] sm:text-xs leading-loose pt-2">
                    {afterLines.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={`px-2 flex group relative ${line.type === 'add' ? 'bg-emerald-500/10 text-emerald-200 border-l-[3px] border-emerald-400' : 'text-slate-300/80 border-l-[3px] border-transparent'}`}
                      >
                        <span className={`select-none w-6 opacity-60 text-[10px] leading-5 pt-0.5 ${line.type === 'add' ? 'text-emerald-500' : 'text-emerald-800'}`}>{idx + 1}</span>
                        <span className="whitespace-pre flex-1">{line.text}</span>
                        {/* Tooltip Icon Trigger for Added Rules */}
                        {line.msg && (
                          <div 
                            className="cursor-help opacity-0 group-hover:opacity-100 py-1 transition-opacity pr-2"
                            onMouseEnter={(e) => showTooltip(e, line.msg)}
                            onMouseLeave={() => setHoveredMsg(null)}
                          >
                            <svg className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar Floating Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-end space-x-2 sm:space-x-3 pointer-events-none">
                <div className="pointer-events-auto flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 justify-end">
                  <button className="px-4 py-2 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-200 text-xs font-bold rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all flex items-center space-x-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>수정본 다운로드</span>
                  </button>
                  <button className="px-4 py-2 border border-blue-500/30 bg-blue-900/30 hover:bg-blue-800/50 text-blue-200 text-xs font-bold rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all flex items-center space-x-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    <span>GitOps 저장소 커밋</span>
                  </button>
                  <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 border border-emerald-400 text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded transition-all flex items-center space-x-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>클러스터 즉시 배포</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {renderTooltip()}
    </div>
  );
}