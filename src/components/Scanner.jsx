import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REPORTS = [
  {
    id: 'V-001',
    category: '2.6 접근 통제',
    tool: 'Kyverno',
    severity: 'Critical',
    title: '컨테이너 Root 권한 실행 허용',
    status: 'Fail',
    description: '[ISMS-P 2.6.2] 비인가된 시스템 접근을 통제하기 위해 컨테이너는 루트 권한으로 실행되어서는 안 됩니다.',
    resource: 'Deployment / web-frontend-prod (Namespace: default)',
    aiGuide: 'securityContext 내에 `runAsNonRoot: true` 설정을 적용하여 파드가 루트 사용자로 실행되는 것을 강제 차단하세요.'
  },
  {
    id: 'V-002',
    category: '2.11 네트워크 보안',
    tool: 'Kyverno',
    severity: 'High',
    title: 'SSH(22) 포트 0.0.0.0/0 전면 개방 감지',
    status: 'Fail',
    description: '[ISMS-P 2.11.1] 외부망과의 접점에 위치한 네트워크 장비 또는 서비스는 불필요한 포트를 차단해야 합니다.',
    resource: 'NetworkPolicy / allow-all-ssh (Namespace: public-facing)',
    aiGuide: '인바운드 규칙에서 0.0.0.0/0에 대한 22번 포트 허용 정책을 삭제하고, 특정 Admin VPC IP 대역만 허용하세요.'
  },
  {
    id: 'V-003',
    category: '2.10 시스템 보안',
    tool: 'Falco',
    severity: 'Medium',
    title: '민감한 디렉토리 Write 시도 탐지 (Runtime)',
    status: 'Fail',
    description: '[ISMS-P 2.10.4] 중요 시스템 영역(/etc, /bin)에 대한 무단 변경 시도를 모니터링하고 통제해야 합니다.',
    resource: 'Pod / redis-cache-master-0 (Namespace: database)',
    aiGuide: '컨테이너의 root filesystem을 Read-only로 마운트(readOnlyRootFilesystem: true)하도록 배포 매니페스트를 수정해야 합니다.'
  },
  {
    id: 'V-004',
    category: '2.10 시스템 보안',
    tool: 'Trivy',
    severity: 'High',
    title: 'Log4j (CVE-2021-44228) 원격 코드 실행 취약점',
    status: 'Fail',
    description: '[ISMS-P 2.10.2] 알려진 취약점에 대한 패치 관리가 이루어져야 합니다.',
    resource: 'Container Image / java-app:1.0.3 (Namespace: core-api)',
    aiGuide: '베이스 이미지의 jndi-lookup 클래스를 제거하거나, log4j 버전을 2.17.1 이상으로 업데이트하는 패치가 시급합니다.'
  },
  {
    id: 'V-005',
    category: '2.6 접근 통제',
    tool: 'Kyverno',
    severity: 'Low',
    title: '권한이 최소화된 IAM Role 정상 부여',
    status: 'Pass',
    description: '[ISMS-P 2.6.4] 사용자 및 서비스 계정은 직무에 따라 최소한의 권한만을 부여받아야 합니다.',
    resource: 'ServiceAccount / s3-log-writer (Namespace: monitoring)',
    aiGuide: '현재 할당된 로깅 전용 권한은 최소 권한 원칙에 부합합니다. 추가 조치 불필요.'
  }
];

export default function Scanner() {
  const [activeTab, setActiveTab] = useState('전체');
  const [activeTools, setActiveTools] = useState(['Kyverno', 'Trivy', 'Falco']);
  const [expandedId, setExpandedId] = useState(null);

  const tabs = ['전체', '2.6 접근 통제', '2.10 시스템 보안', '2.11 네트워크 보안'];
  const tools = ['Kyverno', 'Trivy', 'Falco'];

  const toggleTool = (tool) => {
    setActiveTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const filteredReports = MOCK_REPORTS.filter(r => {
    const matchCategory = activeTab === '전체' || r.category === activeTab;
    const matchTool = activeTools.includes(r.tool);
    return matchCategory && matchTool;
  });

  const getSeverityStyle = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-violet-900/40 border-violet-500/50 text-violet-200 shadow-[0_0_8px_rgba(139,92,246,0.3)]'; // Deep Purple
      case 'High': return 'bg-fuchsia-900/40 border-fuchsia-500/50 text-fuchsia-200 shadow-[0_0_8px_rgba(217,70,239,0.3)]'; // Fuchsia
      case 'Medium': return 'bg-indigo-900/40 border-indigo-500/50 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.3)]'; // Indigo
      case 'Low': return 'bg-blue-900/40 border-blue-500/50 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]'; // Blue
      default: return 'bg-slate-800 border-slate-600 text-slate-300';
    }
  };

  return (
    <div className="flex flex-col min-h-[320px] sm:min-h-[420px] md:h-[460px] bg-[#070510]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.2)] border border-violet-500/30 font-sans">
      
      {/* Top Header Controls */}
      <div className="flex flex-col border-b border-violet-500/20 bg-gradient-to-b from-violet-900/20 to-transparent">
        <div className="px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-violet-500/20 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.4)] border border-violet-400/30">
              <svg className="w-5 h-5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-violet-100 tracking-wide drop-shadow-md">Compliance Report</h2>
              <p className="text-[10px] text-violet-300/70 font-mono tracking-wider">ISMS-P Assessment Detail</p>
            </div>
          </div>
          
          {/* Tool Filters */}
          <div className="flex space-x-1.5 sm:space-x-2 overflow-x-auto">
            {tools.map(tool => (
              <button
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-all border whitespace-nowrap
                  ${activeTools.includes(tool) 
                    ? 'bg-violet-600/30 border-violet-400/50 text-violet-200 shadow-[0_0_10px_rgba(139,92,246,0.4)]' 
                    : 'bg-black/30 border-violet-900/50 text-violet-400/40 hover:border-violet-700/50 hover:text-violet-400/80'}`
                }
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex px-3 sm:px-6 space-x-0.5 sm:space-x-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold transition-all border-b-2 whitespace-nowrap
                ${activeTab === tab 
                  ? 'border-violet-400 text-violet-200 bg-violet-500/10' 
                  : 'border-transparent text-violet-400/40 hover:bg-violet-900/20 hover:text-violet-300'}`
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Report List - Expandable Accordion */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 relative scroll-smooth pr-2">
        {filteredReports.map((report) => {
          const isExpanded = expandedId === report.id;
          return (
            <motion.div 
              key={report.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col rounded-xl border bg-black/40 backdrop-blur-sm overflow-hidden transition-all
                ${isExpanded ? 'border-violet-400/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : 'border-violet-900/30 hover:bg-violet-950/20'}
              `}
            >
              {/* Header (Clickable snippet) */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : report.id)}
              >
                <div className="flex items-center space-x-4">
                  {/* Pass/Fail Icon */}
                  <div className="flex-shrink-0">
                    {report.status === 'Fail' ? (
                      <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(225,29,72,0.4)]">
                        <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Title & Metadata */}
                  <div className="flex flex-col space-y-1">
                    <h3 className={`text-xs sm:text-sm font-bold ${isExpanded ? 'text-violet-100' : 'text-violet-200/80'} drop-shadow-md`}>{report.title}</h3>
                    <div className="flex items-center space-x-2 text-[8px] sm:text-[9px] font-mono text-violet-400/50">
                      <span>[{report.id}] {report.category}</span>
                      <span className="opacity-50">•</span>
                      <span>Detected by {report.tool}</span>
                    </div>
                  </div>
                </div>

                {/* Right Badges */}
                <div className="flex items-center space-x-3 text-right">
                  <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded border ${getSeverityStyle(report.severity)}`}>
                    {report.severity}
                  </span>
                  <motion.svg 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4 text-violet-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </div>

              {/* Accordion Content Region */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-violet-900/30 flex flex-col space-y-4">
                      {/* Section: Rule */}
                      <div className="flex flex-col space-y-1">
                        <span className="text-[10px] font-bold text-fuchsia-400/70 uppercase">위반 규정 (ISMS-P)</span>
                        <div className="text-xs text-violet-200/80 leading-relaxed font-medium bg-fuchsia-950/20 p-2.5 rounded-md border border-fuchsia-900/30">
                          {report.description}
                        </div>
                      </div>
                      
                      {/* Section: Resource */}
                      <div className="flex flex-col space-y-1">
                        <span className="text-[10px] font-bold text-blue-400/70 uppercase">위반 리소스 정보 (Target Resource)</span>
                        <div className="text-xs text-blue-200/80 font-mono bg-blue-950/20 p-2.5 rounded-md border border-blue-900/30">
                          {report.resource}
                        </div>
                      </div>

                      {/* Section: AI Guide */}
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-1">
                          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          <span className="text-[10px] font-bold text-emerald-400/80 uppercase">AI 해결 가이드 (Remediation)</span>
                        </div>
                        <div className="text-xs text-emerald-200 border border-emerald-900/40 bg-[#061811] p-3 rounded-md shadow-[0_0_15px_rgba(16,185,129,0.1)_inset]">
                          {report.aiGuide}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-violet-400/40">
            <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="text-sm font-bold">해당 조건에 부합하는 리포트가 없습니다.</p>
          </div>
        )}
      </div>

    </div>
  );
}
