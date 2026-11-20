import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Vitest cho phần logic và Client Component. Server Component async thì kiểm bằng Playwright (e2e/).
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true, // hiểu alias @/* trong tsconfig.json
    alias: {
      // 'server-only' chặn import từ trình duyệt; trong test thì thay bằng module rỗng
      'server-only': fileURLToPath(new URL('./src/test/server-only.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    // Trang giả lập chạy ở origin của Next → axios gọi /api/... là cùng origin, không vướng CORS
    environmentOptions: { jsdom: { url: 'http://localhost:3000' } },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
