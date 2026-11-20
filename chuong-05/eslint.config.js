// @ts-check
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Luật của hook + luật của React Compiler (purity, set-state-in-effect…)
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Kiến trúc Ch5: chỉ tầng shared/api được dùng axios trực tiếp.
      // Component/hook/feature phải gọi qua features/*/api → httpClient.
      'no-restricted-imports': [
        'error',
        {
          paths: [{ name: 'axios', message: 'Không import axios ở đây — gọi API qua features/*/api (dùng httpClient).' }],
        },
      ],
    },
  },
  {
    // Ngoại lệ: tầng HTTP dùng chung (và test của nó)
    files: ['src/shared/api/**'],
    rules: { 'no-restricted-imports': 'off' },
  },
])
