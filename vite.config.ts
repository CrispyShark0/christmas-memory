import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { // 添加 build 配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大的三方库拆分成单独的chunk
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'mediapipe-vendor': ['@mediapipe/hands', '@mediapipe/camera_utils']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // 提高警告阈值，暂时忽略
  }
})