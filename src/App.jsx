import React from 'react';
import UnicornScene from 'unicornstudio-react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import AiAssistant from './components/AiAssistant';
import PolicyList from './components/PolicyList';
import Carousel from './components/Carousel';
import { GithubIcon, LogIcon } from './icons/Icons';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070303] text-white selection:bg-red-500/30 font-sans mx-auto overflow-x-hidden">

      {/* 푸른 네온 및 유니콘 배경 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,rgba(3,4,7,1)_100%)] mix-blend-screen opacity-90 z-10" />
        <UnicornScene
          projectId="jbZLy922iuJZ0hKo9Amq"
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
        />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex flex-col min-h-screen">
        
        {/* 상단 중앙 집중형 타이틀 */}
        <section className="max-w-7xl w-full mx-auto px-6 pt-24 pb-8 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-blue-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] pb-2 flex-shrink-0 min-w-[max-content]">
              ISMS-P Kubernetes SOC Center
            </h1>
            <p className="text-lg text-indigo-200/60 max-w-2xl font-medium">
              ISMS-P 컴플라이언스 기준 실시간 쿠버네티스 통합 관제 및 자동 대응
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center space-x-4 mt-8"
          >
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] backdrop-blur-md transition-all border border-indigo-500/20">
              <LogIcon className="w-4 h-4" />
              <span>감사 로그 관리</span>
            </button>
            <button className="flex items-center space-x-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-gray-200 transition-all">
              <GithubIcon className="w-5 h-5" />
              <span>GitOps 정책 동기화</span>
            </button>
          </motion.div>
        </section>

        {/* 캐러셀 섹션 - 슬라이드 전환 네비게이션 */}
        <section className="w-full max-w-6xl mx-auto px-6 relative z-20 flex-1 flex flex-col justify-center mb-8">
          <Carousel />
        </section>

      </main>

      {/* 바닥 슬라이더 영역 - 유니콘 스튜디오 뱃지 커버업 */}
      <div className="relative z-50 w-full mt-16 bg-[#030407]/95 backdrop-blur-xl pt-10 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.8)] border-t border-indigo-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <PolicyList />
        </div>
      </div>
    </div>
  );
}
