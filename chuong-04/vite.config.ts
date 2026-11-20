/// <reference types="vitest/config" />
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // React Compiler: tự memo component → hầu như không cần useMemo/useCallback
    babel({ presets: [reactCompilerPreset()] }),
    // Tailwind CSS v4: cấu hình nằm trong src/index.css (@theme), không có tailwind.config.js
    tailwindcss(),
  ],
  // Vitest đọc chung cấu hình này (cùng plugin, cùng alias)
  test: {
    environment: 'jsdom',
    globals: true, // để Testing Library tự dọn DOM sau mỗi test
    setupFiles: ['./src/test/setup.ts'],
  },
})
