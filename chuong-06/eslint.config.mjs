import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Kiến trúc Ch5 giữ nguyên: chỉ tầng shared/api được dùng axios trực tiếp
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [{ name: 'axios', message: 'Không import axios ở đây — gọi API qua features/*/api.' }] },
      ],
    },
  },
  { files: ['src/shared/api/**'], rules: { 'no-restricted-imports': 'off' } },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'mock-api/**', 'playwright-report/**', 'test-results/**']),
])

export default eslintConfig
