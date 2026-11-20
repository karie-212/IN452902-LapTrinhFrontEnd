# EduHub Web — Ch05 (starter)

Bài thực hành chương 5 môn **IN4529 — Lập trình Front End**: nối EduHub Web với **API thật** (mock API EduHub) qua một tầng API "sạch" — axios, TanStack Query, Zod, React Hook Form, Zustand — và kiểm thử bằng Vitest + MSW.

Khung đã có sẵn: mọi trang và giao diện, tầng `shared/` (trừ phần TODO), feature **clubs** và **registrations** hoàn chỉnh để em làm mẫu, store đăng nhập (Zustand), form tạo tài khoản, 25 test. Em làm theo các dòng `// TODO(ch5-Tk)`. Tìm nhanh: VS Code → Ctrl+Shift+F → `TODO(ch5-`.

## Yêu cầu

- Node.js ≥ 22 (khuyên dùng 24 LTS), npm ≥ 10.
- Tiện ích trình duyệt React Developer Tools; tab **Network** của DevTools để xem request.

## Chạy

Cần **hai cửa sổ terminal**:

```bash
npm install
npm run api          # cửa sổ 1: mock API ở http://localhost:4000
npm run dev          # cửa sổ 2: giao diện ở http://localhost:5173
```

Tài khoản có sẵn: `sv1@dthu.edu.vn / Member@123` (thành viên), `admin@dthu.edu.vn / Admin@123` (quản trị). Tài liệu API: `mock-api/README.md`.

| Lệnh | Việc |
|---|---|
| `npm run dev` | Máy chủ phát triển |
| `npm run api` | Mock API (`npm run api -- --delay=800` để thấy trạng thái loading) |
| `npm run build` | Kiểm tra kiểu rồi đóng gói vào `dist/` |
| `npm run lint` | ESLint — báo lỗi nếu `import axios` ngoài `src/shared/api/` |
| `npm run typecheck` | TypeScript kiểm tra kiểu |
| `npm test` | Chạy test (không cần chạy mock API — MSW giả lập) |
| `npm run test:watch` | Chạy test liên tục, sửa code là chạy lại |

Lúc đầu `npm test` **đỏ 24/25 test** — bình thường: test kiểm tra đúng phần TODO. Các lớp phụ thuộc nhau, nên làm **đúng thứ tự** T1 → T6; mỗi nhiệm vụ xong thì số test xanh tăng dần cho tới 25/25.

Trước khi làm T3, các trang sự kiện hiện thông báo lỗi `TODO(ch5-T3)…` — đó là gợi ý chỗ cần viết, không phải hỏng máy.

## Kiến trúc phải giữ

```
components / pages  →  hooks (TanStack Query)  →  api (Zod + mapper)  →  shared/api (axios)
```

- Component **không** import `axios`; hook **không** biết URL.
- JSON server là **DTO** → kiểm tra bằng Zod → **mapper** → **model** (`Date` thay chuỗi ISO, `title` thay `name`).
- Mọi lỗi HTTP thành `ApiError` (một hàm `toApiError` dùng chung).
- Dữ liệu từ API ở TanStack Query; đăng nhập/toast ở Zustand. Không chép dữ liệu API vào `useState`.

## Thứ tự làm gợi ý

1. `ch5-T1` — `shared/api/http-client.ts`, `toApiError` trong `shared/api/api-error.ts`.
2. `ch5-T2` — `setupInterceptors` trong `shared/api/interceptors.ts`.
3. `ch5-T3` — `eventDtoSchema`, mapper `toEvent`/`toCreateEventDto`, `eventsApi.list`/`getById`.
4. `ch5-T4` — `useEvents`/`useEvent`; trang Sự kiện đồng bộ bộ lọc với URL + phân trang.
5. `ch5-T5` — đăng nhập: `authApi.login`/`me`, `useLogin`, `LoginForm`, `ProtectedRoute`.
6. `ch5-T6` — quản trị: `eventsApi.create`/`update`/`remove`, invalidate cache, `EventForm` (Zod + lỗi server).
7. (Challenge) `ch5-T7` — ★ refresh token + hàng đợi request trong `interceptors.ts`.

Mẫu để nhìn theo: `features/clubs/*` (một feature đầy đủ: dto → model → api → hook → component), `features/registrations/*` (mutation + invalidate), `features/auth/components/RegisterForm.tsx` (React Hook Form + Zod + lỗi server).

## Cấu trúc

```
starter/
├── mock-api/                    # Mock API EduHub — không sửa
├── src/
│   ├── app/                     # router, RootLayout, AppProviders, query-client, http-setup
│   ├── shared/api/              # http-client (T1), api-error (T1), interceptors (T2, T7), pagination, parse
│   ├── shared/{config,lib,ui}/  # env, format, form-errors, Button, FormField, Spinner, Pagination, Toaster…
│   ├── features/auth/           # api (T5), hooks (T5), components/LoginForm + ProtectedRoute (T5), store
│   ├── features/clubs/          # mẫu hoàn chỉnh
│   ├── features/events/         # dto (T3), model/event.mapper (T3), api (T3, T6), hooks (T4, T6), components/EventForm (T6)
│   ├── features/registrations/  # mẫu hoàn chỉnh
│   ├── pages/                   # EventsPage (T4); các trang còn lại đã xong
│   └── test/                    # MSW: fixtures, handlers, server; render.tsx
└── README.md
```

## Nộp bài

Chép thư mục `starter/` thành repo mới **`EduHubWeb-Ch05-<MSSV>`** (public), commit ≥ 5 lần với message rõ nghĩa (gợi ý: một commit cho mỗi nhiệm vụ). Trước khi nộp chạy:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Không đưa `node_modules/`, `dist/`, `.env.local` lên GitHub (đã có trong `.gitignore`).
