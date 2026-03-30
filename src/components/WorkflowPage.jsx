import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── DATA ─── */
const steps = [
  {
    num: 1, title: 'Policy Definition', subtitle: 'Policy-as-Code', color: 'blue',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    items: ['Rego / Kyverno YAML 정책 작성', 'Git 기반 버전 관리 (PR 리뷰)', 'GitOps 클러스터 자동 배포'],
    tooltip: { techs: ['Rego', 'Kyverno', 'ArgoCD', 'Git'], detail: 'OPA/Gatekeeper의 Rego와 Kyverno의 선언적 YAML로 보안 정책을 코드화하고, GitOps 파이프라인으로 클러스터에 자동 반영합니다.' },
  },
  {
    num: 2, title: 'Admission Control', subtitle: '배포 시점 검증', color: 'indigo',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    items: ['kubectl / CI 배포 요청 인터셉트', 'Kyverno Mutation (자동 보안 주입)', 'Gatekeeper Validation (위반 시 거부)', 'Trivy 이미지 CVE 스캔'],
    tooltip: { techs: ['Webhook', 'Mutate', 'Validate', 'Trivy'], detail: 'Admission Webhook으로 모든 리소스 요청을 가로채 자동 교정(Mutation) 또는 위반 거부(Validation)를 수행합니다.' },
  },
  {
    num: 3, title: 'Runtime Detection', subtitle: '런타임 보안 감시', color: 'rose',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    items: ['Falco eBPF 커널 시스콜 감시', '쉘 접속·파일 변조 이상 행위 탐지', 'NetworkPolicy 자동 Pod 격리'],
    tooltip: { techs: ['eBPF', 'Falco', 'Syscall', 'NetworkPolicy'], detail: 'Falco eBPF 센서가 컨테이너 시스템 콜을 실시간 모니터링하여 비인가 접속 시 즉각 경고 및 격리합니다.' },
  },
  {
    num: 4, title: 'Compliance Reporting', subtitle: '컴플라이언스 리포트', color: 'emerald',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    items: ['PolicyReport CRD 데이터 집계', 'Prometheus + Grafana 시각화', 'ISMS-P 항목별 준수율 산출', '감사 리포트 PDF/JSON 내보내기'],
    tooltip: { techs: ['CRD', 'Prometheus', 'Grafana', 'ISMS-P'], detail: 'PolicyReport CRD와 Prometheus 메트릭으로 ISMS-P 인증 항목별 준수율을 산출하고 대시보드로 시각화합니다.' },
  },
];

const colorMap = {
  blue: { bg: 'from-blue-500/15 to-blue-600/5', border: 'border-blue-500/25', glow: 'rgba(59,130,246,0.35)', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30', iconBg: 'bg-blue-500/15', line: 'from-blue-500/30 to-blue-500/5' },
  indigo: { bg: 'from-indigo-500/15 to-indigo-600/5', border: 'border-indigo-500/25', glow: 'rgba(99,102,241,0.35)', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', iconBg: 'bg-indigo-500/15', line: 'from-indigo-500/30 to-indigo-500/5' },
  rose: { bg: 'from-rose-500/15 to-rose-600/5', border: 'border-rose-500/25', glow: 'rgba(244,63,94,0.35)', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30', iconBg: 'bg-rose-500/15', line: 'from-rose-500/30 to-rose-500/5' },
  emerald: { bg: 'from-emerald-500/15 to-emerald-600/5', border: 'border-emerald-500/25', glow: 'rgba(16,185,129,0.35)', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', iconBg: 'bg-emerald-500/15', line: 'from-emerald-500/30 to-emerald-500/5' },
};

const beforeItems = [
  { label: 'Manual Audit', desc: '수동 점검 및 인력 의존적 감사 수행' },
  { label: 'Spreadsheet Tracking', desc: '스프레드시트 기반 컴플라이언스 추적' },
  { label: 'Point-in-Time Validation', desc: '특정 시점에서만 일회성 검증' },
  { label: 'Delayed Detection', desc: '위협 탐지까지 수일~수주 소요' },
];
const afterItems = [
  { label: 'Automated Enforcement', desc: 'Policy-as-Code 기반 자동 정책 적용' },
  { label: 'Real-time Monitoring', desc: 'eBPF 기반 실시간 런타임 모니터링' },
  { label: 'Continuous Compliance', desc: '지속적이고 자동화된 준수율 산출' },
  { label: 'Instant Response', desc: '이상 행위 탐지 즉시 자동 격리 대응' },
];

const archLayers = [
  {
    name: 'Admission Layer', color: 'indigo', nodes: [
      { id: 'dev', label: 'Developer', sub: 'kubectl / CI' },
      { id: 'api', label: 'API Server', sub: 'Admission Webhook' },
      { id: 'kyv', label: 'Kyverno', sub: 'Mutate (Auto-fix)' },
      { id: 'gk', label: 'Gatekeeper', sub: 'Validate (Deny)' },
      { id: 'trivy', label: 'Trivy', sub: 'Image Scan' },
    ]
  },
  {
    name: 'Runtime Layer', color: 'rose', nodes: [
      { id: 'cluster', label: 'K8s Cluster', sub: 'Running Pods' },
      { id: 'falco', label: 'Falco', sub: 'eBPF Syscall Monitor' },
      { id: 'webhook', label: 'Webhook', sub: 'Alert Trigger' },
      { id: 'netpol', label: 'NetworkPolicy', sub: 'Auto Isolation' },
    ]
  },
  {
    name: 'Observability Layer', color: 'emerald', nodes: [
      { id: 'prom', label: 'Prometheus', sub: 'Metrics Collection' },
      { id: 'grafana', label: 'Grafana', sub: 'Dashboard' },
      { id: 'report', label: 'PolicyReport', sub: 'CRD Aggregation' },
      { id: 'export', label: 'Export', sub: 'PDF / JSON Audit' },
    ]
  },
];

const timelineEvents = [
  { time: '14:23:01', label: 'Deployment 요청', desc: 'payment-api Deployment가 kubectl로 요청됨', type: 'info' },
  { time: '14:23:01', label: 'Kyverno Mutation 적용', desc: 'securityContext.runAsNonRoot: true 자동 주입', type: 'success' },
  { time: '14:23:02', label: 'Gatekeeper 위반 차단', desc: 'privileged: true 설정으로 인해 배포 거부됨', type: 'danger' },
  { time: '14:25:10', label: '수정 후 Pod 시작', desc: '보안 정책 준수 후 payment-api Pod 정상 기동', type: 'success' },
  { time: '14:31:44', label: 'Falco 이상 행위 탐지', desc: 'Pod 내부에서 /bin/sh 쉘 접속 시도 감지', type: 'danger' },
  { time: '14:31:45', label: 'NetworkPolicy 격리 적용', desc: '해당 Pod의 외부 네트워크 통신 즉시 차단', type: 'warning' },
  { time: '14:32:00', label: '리포트 업데이트', desc: 'PolicyReport CRD에 위반 기록 자동 반영 완료', type: 'info' },
];

const statusMetrics = [
  { label: 'Compliance Score', value: '94%', color: 'text-blue-400', glow: 'rgba(59,130,246,0.3)' },
  { label: 'Blocked Deploys', value: '3', color: 'text-rose-400', glow: 'rgba(244,63,94,0.3)' },
  { label: 'Runtime Alerts', value: '1', color: 'text-amber-400', glow: 'rgba(245,158,11,0.3)' },
  { label: 'Critical CVEs', value: '2', color: 'text-red-500', glow: 'rgba(239,68,68,0.3)' },
];

const typeStyles = {
  info: { dot: 'bg-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/5' },
  success: { dot: 'bg-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/5' },
  danger: { dot: 'bg-red-500 animate-pulse', border: 'border-red-500/30', bg: 'bg-red-500/5' },
  warning: { dot: 'bg-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/5' },
};

const layerColors = {
  indigo: { border: 'border-indigo-500/20', text: 'text-indigo-400', nodeBg: 'bg-indigo-500/10', nodeBorder: 'border-indigo-500/25' },
  rose: { border: 'border-rose-500/20', text: 'text-rose-400', nodeBg: 'bg-rose-500/10', nodeBorder: 'border-rose-500/25' },
  emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', nodeBg: 'bg-emerald-500/10', nodeBorder: 'border-emerald-500/25' },
};

/* ─── SECTION TITLE ─── */
function SectionTitle({ children, sub }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">{children}</h2>
      {sub && <p className="mt-3 text-sm text-blue-200/35 font-medium">{sub}</p>}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function WorkflowPage({ onBack }) {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <div className="bg-[#0B0F1A] text-white font-noto relative">
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* ──────────── SECTION 1: Hero + Vertical Cards (viewport height) ──────────── */}
      <section className="h-screen flex flex-col relative z-10">
        {/* Back */}
        <div className="px-8 pt-5 flex-shrink-0">
          <button onClick={onBack} className="flex items-center space-x-2 text-xs text-white/35 hover:text-white/70 transition-colors group">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            <span className="font-medium">Dashboard</span>
          </button>
        </div>

        {/* Main: Left cards + Right detail */}
        <div className="flex-1 flex px-8 pt-4 pb-6 gap-8 min-h-0">
          {/* Left */}
          <div className="w-[480px] flex-shrink-0 flex flex-col min-h-0">
            <div className="mb-5 flex-shrink-0">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-blue-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">Workflow</h1>
              <p className="mt-1.5 text-sm text-blue-200/40 font-medium">End-to-end Kubernetes 컴플라이언스 자동화</p>
              <div className="flex mt-2 space-x-1.5">
                {['Policy', 'Prevention', 'Detection', 'Reporting'].map((s, i) => (
                  <React.Fragment key={s}>
                    <span className="text-[11px] font-bold text-indigo-300/45 uppercase tracking-widest">{s}</span>
                    {i < 3 && <span className="text-indigo-500/25 text-[9px]">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between min-h-0 space-y-3">
              {steps.map((step, idx) => {
                const c = colorMap[step.color];
                const isActive = activeIdx === idx;
                return (
                  <div key={step.num} className="flex flex-col">
                    <motion.div
                      onMouseEnter={() => setActiveIdx(idx)}
                      onMouseLeave={() => setActiveIdx(null)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`relative flex items-center space-x-4 rounded-xl bg-gradient-to-r ${c.bg} bg-[#0b0f19]/70 backdrop-blur-xl border ${c.border} px-5 py-4 cursor-pointer transition-shadow duration-300`}
                      style={{ boxShadow: isActive ? `0 0 25px ${c.glow}, 0 4px 20px rgba(0,0,0,0.3)` : '0 2px 10px rgba(0,0,0,0.2)' }}
                    >
                      <div className={`w-9 h-9 rounded-lg ${c.iconBg} border ${c.border} flex items-center justify-center ${c.text} flex-shrink-0 text-sm font-black`}>{step.num}</div>
                      <div className={`${c.text} flex-shrink-0`}>{step.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold text-white/85 truncate">{step.title}</h3>
                        <p className={`text-[11px] uppercase font-bold ${c.text} tracking-widest`}>{step.subtitle}</p>
                      </div>
                      <svg className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? `${c.text} translate-x-0.5` : 'text-white/15'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </motion.div>
                    {idx < steps.length - 1 && (
                      <div className="flex justify-start pl-7 py-0.5"><div className={`w-[1.5px] h-2 bg-gradient-to-b ${c.line}`} /></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <AnimatePresence mode="wait">
              {activeIdx !== null ? (
                <motion.div key={activeIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="w-full max-w-xl">
                  {(() => {
                    const step = steps[activeIdx]; const c = colorMap[step.color]; return (
                      <div className={`rounded-2xl bg-[#0b0f19]/80 backdrop-blur-xl border ${c.border} p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-14 h-14 rounded-xl ${c.iconBg} border ${c.border} flex items-center justify-center ${c.text}`}>{step.icon}</div>
                          <div><h2 className="text-2xl font-bold text-white/90">{step.title}</h2><p className={`text-xs uppercase font-bold ${c.text} tracking-widest`}>{step.subtitle}</p></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-5">{step.tooltip.techs.map(t => <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${c.badge}`}>{t}</span>)}</div>
                        <p className="text-sm text-white/50 leading-relaxed mb-6">{step.tooltip.detail}</p>
                        <div className={`rounded-xl bg-[#060a15]/60 border ${c.border} p-5`}>
                          <span className={`text-[10px] uppercase font-bold ${c.text} tracking-widest`}>주요 기능</span>
                          <ul className="mt-3 space-y-2.5">{step.items.map((item, i) => <li key={i} className="flex items-start space-x-2"><span className={`mt-[6px] w-1.5 h-1.5 rounded-full ${c.text} bg-current flex-shrink-0`} /><span className="text-sm text-white/55 leading-relaxed">{item}</span></li>)}</ul>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-indigo-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                  </div>
                  <p className="text-base text-white/20 font-medium">왼쪽 단계를 호버하면<br />상세 정보가 표시됩니다</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex-shrink-0 flex flex-col items-center pb-4">
          <span className="text-[10px] text-indigo-300/30 mb-1">Scroll ↓</span>
          <div style={{ animation: 'gentle-bounce 2s ease-in-out infinite' }}>
            <svg className="w-4 h-4 text-indigo-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 2: Before vs After ──────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        <SectionTitle sub="기존 수동 감사 체계를 자동화된 플랫폼으로 전환">Before vs After</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-2xl bg-rose-500/5 border border-rose-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-base font-bold text-rose-400 uppercase tracking-widest mb-1">Traditional Approach</h3>
            <p className="text-xs text-rose-300/40 mb-5">기존 방식의 한계</p>
            <div className="space-y-3">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-rose-950/30 border border-rose-900/20">
                  <div className="mt-0.5 w-5 h-5 rounded bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-rose-200/80">{item.label}</span>
                    <p className="text-xs text-rose-300/40 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
            <h3 className="text-base font-bold text-blue-400 uppercase tracking-widest mb-1">ComplianceOps</h3>
            <p className="text-xs text-blue-300/40 mb-5">자동화된 접근 방식</p>
            <div className="space-y-3">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-blue-950/30 border border-blue-900/20">
                  <div className="mt-0.5 w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-blue-200/80">{item.label}</span>
                    <p className="text-xs text-blue-300/40 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 3: Architecture Diagram ──────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-24">
        <SectionTitle sub="Admission → Runtime → Observability 계층 구조">System Architecture</SectionTitle>

        <div className="space-y-6">
          {archLayers.map((layer, li) => {
            const lc = layerColors[layer.color];
            return (
              <div key={layer.name} className={`rounded-2xl border ${lc.border} bg-[#0b0f19]/50 p-5`}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${lc.text} bg-current`} />
                  <h4 className={`text-sm font-bold uppercase tracking-widest ${lc.text}`}>{layer.name}</h4>
                </div>
                <div className="flex items-center justify-between gap-3">
                  {layer.nodes.map((node, ni) => (
                    <React.Fragment key={node.id}>
                      <motion.div whileHover={{ scale: 1.05, y: -2 }} className={`flex-1 rounded-xl ${lc.nodeBg} border ${lc.nodeBorder} p-4 text-center cursor-pointer transition-shadow hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]`}>
                        <span className="text-base font-bold text-white/80 block">{node.label}</span>
                        <span className={`text-xs ${lc.text} font-medium`}>{node.sub}</span>
                      </motion.div>
                      {ni < layer.nodes.length - 1 && (
                        <svg className="w-4 h-4 text-white/15 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {li < archLayers.length - 1 && (
                  <div className="flex justify-center mt-4">
                    <svg className="w-5 h-5 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────── SECTION 4: Event Timeline ──────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-24">
        <SectionTitle sub="배포 요청부터 자동 대응까지의 실시간 이벤트 흐름">Real-time Event Timeline</SectionTitle>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/30 via-rose-500/20 to-emerald-500/20" />

          <div className="space-y-4">
            {timelineEvents.map((evt, i) => {
              const ts = typeStyles[evt.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start space-x-4 relative"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 w-[38px] flex justify-center pt-3 relative z-10">
                    <div className={`w-3 h-3 rounded-full ${ts.dot} ring-4 ring-[#0B0F1A]`} />
                  </div>
                  {/* Content */}
                  <div className={`flex-1 rounded-xl ${ts.bg} border ${ts.border} p-4`}>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-xs font-mono text-white/25">{evt.time}</span>
                      <span className="text-sm font-bold text-white/80">{evt.label}</span>
                    </div>
                    <p className="text-xs text-white/40">{evt.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────── SECTION 5: Live Status ──────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 pt-12 pb-24">
        <SectionTitle sub="현재 클러스터 보안 상태 요약">Live Status</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusMetrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center py-5 rounded-2xl bg-[#0e1225]/70 backdrop-blur-xl border border-indigo-500/10"
              style={{ boxShadow: `0 0 25px ${m.glow}` }}>
              <span className={`text-3xl font-black ${m.color} drop-shadow-md`}>{m.value}</span>
              <span className="text-[9px] text-white/25 font-bold uppercase tracking-widest mt-2">{m.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
