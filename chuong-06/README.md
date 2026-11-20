# EduHub Web — Ch06 (starter)

Bài thực hành chương 6 môn **IN4529 — Lập trình Front End**: chuyển EduHub Web sang **Next.js 16 App Router** — trang công khai render trên server (SEO), Cache Components, Server Action, đăng nhập bằng cookie httpOnly, BFF, `proxy.ts`, test e2e Playwright, CI GitHub Actions và deploy Vercel.

Khung đã có sẵn: dự án `create-next-app` (TypeScript, Tailwind 4, ESLint, App Router, `src/`, React Compiler, Cache Components); phần **dto / model / mapper / schema Zod chép nguyên từ Ch05**; layout, mọi trang và component giao diện; "Sự kiện của tôi" và nút đăng ký (TanStack Query qua BFF); `getClubs` và `deleteEventAction` làm mẫu; 3 test e2e, CI, mock API, 24 test Vitest. Em làm theo các dòng `// TODO(ch6-Tk)` (VS Code → Ctrl+Shift+F → `TODO(ch6-`).

## Yêu cầu

- Node.js ≥ 22 (khuyên dùng 24 LTS), npm ≥ 10.
- Tài khoản GitHub và Vercel (đăng nhập Vercel bằng GitHub) cho phần deploy.

## Chạy

```bash
npm install
npm run api          # cửa sổ 1: mock API ở http://localhost:4000
npm run dev          # cửa sổ 2: http://localhost:3000
```

Tài khoản: `sv1@dthu.edu.vn / Member@123`, `admin@dthu.edu.vn / Admin@123`. Tài liệu API: `mock-api/README.md`.

| Lệnh | Việc |
|---|---|
| `npm run dev` | Máy chủ phát triển (Turbopack) |
| `npm run build` | Build production (không cần mock API đang chạy) |
| `npm start` | Chạy bản đã build ở cổng 3000 |
| `npm run api` | Mock API |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |
| `npm test` | Vitest (không cần mock API) |
| `npm run e2e` | Playwright — chạy `npm run build` trước; lần đầu thêm `npx playwright install chromium` |

Lúc đầu `npm test` **đỏ 12/24** và e2e đỏ — bình thường, test kiểm tra đúng phần TODO. Trang Sự kiện hiện chữ `TODO(ch6-T2)…`, trang chi tiết báo lỗi `TODO(ch6-T3)…` cho tới khi em làm xong.

## Thứ tự làm gợi ý

1. `ch6-T1` — `serverFetch` (`src/shared/api/server-fetch.ts`).
2. `ch6-T2` — `getEvents` với `'use cache'`; trang `/events` (`src/app/(public)/events/page.tsx`). Mẫu: `getClubs` trong `features/clubs/api/clubs.server.ts`.
3. `ch6-T3` — `getEvent`, `notFound()`, `generateMetadata` ở `src/app/(public)/events/[id]/page.tsx`.
4. `ch6-T4` — `loginAction`, `logoutAction` (`features/auth/actions.ts`) và `src/proxy.ts`.
5. `ch6-T5` — BFF `src/app/api/[...path]/route.ts`.
6. `ch6-T6` — `createEventAction` (`features/events/actions.ts`), CI xanh, deploy Vercel. Mẫu: `deleteEventAction` ngay bên dưới.
7. (Challenge) `ch6-T7` — Docker standalone, hoặc Lighthouse ≥ 90, hoặc profile `cacheLife` riêng.

## Quy tắc của chương

- Trang công khai là **Server Component** (không `'use client'`). Chỉ phần tương tác mới là Client Component.
- Dữ liệu theo request (`searchParams`, `cookies()`, `new Date()`) đọc **bên trong** `<Suspense>` hoặc sau `await connection()` — nếu không, `next build` báo lỗi "blocking route".
- Token chỉ nằm trong cookie **httpOnly**. Trình duyệt chỉ gọi `/api/...` của chính Next (BFF), không gọi thẳng cổng 4000.
- Dùng `proxy.ts` (Next 16), **không** dùng `middleware.ts`.

## Cấu trúc

```
starter/
├── .github/workflows/ci.yml     # lint → typecheck → vitest → build → playwright
├── e2e/                         # events.spec (T2, T3), member.spec (T4, T5), admin.spec (T6)
├── mock-api/                    # không sửa
├── next.config.ts · playwright.config.ts · vitest.config.ts
└── src/
    ├── proxy.ts                 # T4
    ├── app/
    │   ├── (public)/events/page.tsx        # T2
    │   ├── (public)/events/[id]/page.tsx   # T3
    │   ├── api/[...path]/route.ts          # T5 (BFF)
    │   └── …                               # các trang còn lại đã xong
    ├── features/
    │   ├── auth/actions.ts      # T4
    │   ├── events/api/events.server.ts     # T2, T3
    │   ├── events/actions.ts    # T6
    │   └── …                    # dto, model từ Ch05; clubs, registrations hoàn chỉnh
    └── shared/api/server-fetch.ts          # T1
```

## Deploy lên Vercel

1. Đẩy repo lên GitHub, đợi CI xanh.
2. Vercel → *Add New Project* → chọn repo (Next.js tự nhận).
3. *Environment Variables*: `API_URL` = URL mock API công khai giảng viên cung cấp.
4. Deploy, rồi ghi link vào mục "Link deploy" ở cuối README này.

## Nộp bài

Chép thư mục `starter/` thành repo mới **`EduHubWeb-Ch06-<MSSV>`** (public; `.github/` nằm ở gốc repo để CI chạy), commit ≥ 5 lần với message rõ nghĩa. Trước khi nộp chạy:

```bash
npm run lint && npm run typecheck && npm test && npm run build && npx playwright test
```

Không đưa `node_modules/`, `.next/`, `test-results/`, `playwright-report/`, `.env.local` lên GitHub (đã có trong `.gitignore`).

## Link deploy

- Vercel: _(điền link)_
