import { defineConfig, devices } from '@playwright/test'

// Test e2e chạy trên bản production: cần `npm run build` trước.
// Playwright tự bật mock API (cổng 4000) và `next start` (cổng 3000); đang chạy sẵn thì dùng lại (trừ CI).
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry', // lỗi thì mở bằng: npx playwright show-trace <tệp trace.zip>
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      name: 'Mock API',
      command: 'npm run api',
      url: 'http://localhost:4000/healthz',
      reuseExistingServer: !process.env.CI,
    },
    {
      name: 'Next.js',
      command: 'npm run start',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
