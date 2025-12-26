import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      // 1. 将 mediapipe 相关库标记为“外部依赖”，不打包
      external: ['@mediapipe/hands', '@mediapipe/camera_utils'],
      output: {
        manualChunks: {
          // 2. 只对普通的三方库进行分包，移除 mediapipe
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // 可以保留其他你认为体积大的库
          // 'utils-vendor': ['lodash', 'axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  // 3. 重要：定义全局变量，以便代码在浏览器中能找到这些外部库
  define: {
    global: 'globalThis'
  }
})