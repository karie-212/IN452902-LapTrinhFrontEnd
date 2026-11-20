import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Cache Components: dữ liệu mặc định lấy lúc request; muốn lưu cache thì ghi rõ 'use cache'
  cacheComponents: true,
  partialPrefetching: true,
  // React Compiler: tự memo component (giống Ch04–05)
  reactCompiler: true,
  // Tailwind CSS v4 chạy như loader của Turbopack (cấu hình do create-next-app sinh ra)
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
