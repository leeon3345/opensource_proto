// Vite 설정 함수 및 리액트 플러그인 임포트
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 설정 객체 외부 반환 (export default 필수)
export default defineConfig({
  base: '/opensource_proto/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  }
});