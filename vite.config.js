// Vite 설정 함수 및 리액트 플러그인 임포트
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 설정 객체 외부 반환 (export default 필수)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 기본 포트 설정
    open: true, // 서버 시작 시 브라우저 자동 실행
  }
});