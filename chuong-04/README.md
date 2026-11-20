# EduHub Web — Ch04 (starter)

Bài thực hành chương 4 môn **IN4529 — Lập trình Front End**: viết lại EduHub Web thành **SPA React** (ứng dụng một trang: chuyển trang không tải lại), giao diện giống Ch02.

Khung đã cài đặt sẵn: Vite 8 · React 19.3 (bật React Compiler) · TypeScript 6 · React Router 8 · Tailwind CSS 4.3 (design token Ch02 đã nằm trong `@theme` của `src/index.css`) · Vitest 5 + Testing Library · ESLint 10. Dữ liệu CLB và sự kiện là JSON tĩnh trong `src/data/` — Ch04 **chưa gọi API**.

Em làm theo các dòng `// TODO(ch4-Tk)`. Tìm nhanh: VS Code → Ctrl+Shift+F → `TODO(ch4-`.

## Yêu cầu

- Node.js ≥ 22 (khuyên dùng 24 LTS), npm ≥ 10.
- Tiện ích trình duyệt **React Developer Tools** (để xem component, props, state).

## Chạy

```bash
npm install
npm run dev          # mở http://localhost:5173
```

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy máy chủ phát triển (tự tải lại khi lưu) |
| `npm run build` | Kiểm tra kiểu rồi đóng gói vào `dist/` |
| `npm run preview` | Xem thử bản đã build |
| `npm run lint` | ESLint (gồm luật React Hooks và React Compiler) |
| `npm run typecheck` | TypeScript kiểm tra kiểu |
| `npm test` | Chạy test một lần |
| `npm run test:watch` | Chạy test liên tục, sửa code là test chạy lại |

Lúc đầu `npm test` **đỏ 11/14 test** — đó là bình thường: test kiểm tra đúng phần TODO. Làm xong ch4-T1…T4 thì xanh 14/14.

## Thứ tự làm gợi ý

1. `ch4-T1` — `EventCard` (xem `EventCard.test.tsx`).
2. `ch4-T2` — `EventList` và 3 sự kiện sắp tới ở trang chủ.
3. `ch4-T3` — router: `NavLink`, trang chi tiết `events/:eventId`, trang 404.
4. `ch4-T4` — `filterEvents`, `SearchBar`, `ClubFilter`, trang Sự kiện lọc bằng dữ liệu suy ra.
5. `ch4-T5` — form đăng ký thành viên bằng `useActionState` + `useFormStatus`.
6. `ch4-T6` — dark mode qua Context (`ThemeProvider`, `useTheme`, `ThemeToggle`).
7. (Challenge) `ch4-T7` — đồng bộ bộ lọc với URL bằng `useSearchParams`.

Đã có sẵn để tham khảo: `ClubsPage` + `ClubCard` (một trang hoàn chỉnh), `PageContainer`, `RootLayout`, hàm `formatEventTime`, `seatsLeft`, `isAlmostFull`, `isPast`.

## Class Tailwind theo token Ch02

| Token Ch02 | Class |
|---|---|
| `--color-primary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-surface-muted` | `bg-primary`, `text-accent`, `bg-bg`, `bg-surface`, `bg-surface-muted`… |
| `--color-text`, `--color-text-muted` | `text-ink`, `text-ink-muted` |
| `--color-border` | `border-line` |
| `--color-warning`, `--color-warning-bg`, `--color-danger`, `--color-success` | `text-warning`, `bg-warning-soft`, `text-danger`, `text-success` |
| `--container-max`, `--container-narrow` | `max-w-page`, `max-w-narrow` |
| Breakpoint 40rem / 64rem | `sm:` / `lg:` |

Không viết mã màu trực tiếp (`#003f87`) trong component; không tạo `tailwind.config.js` (Tailwind v4 cấu hình bằng CSS).

## Cấu trúc

```
starter/
├── index.html
├── vite.config.ts           # React + React Compiler + Tailwind; cấu hình Vitest
├── src/
│   ├── main.tsx             # ThemeProvider + RouterProvider
│   ├── index.css            # Tailwind + @theme (token Ch02) + dark mode
│   ├── types.ts             # Club, EventItem, EventFilter
│   ├── app/                 # router.tsx (T3), RootLayout.tsx (T3), theme-context.ts + ThemeProvider.tsx (T6)
│   ├── pages/               # HomePage (T2), EventsPage (T4), EventDetailPage (T3), RegisterPage (T5), ClubsPage, NotFoundPage
│   ├── components/          # EventCard (T1), EventList (T2), ThemeToggle (T6), ClubCard, PageContainer
│   ├── lib/                 # events.ts (T4), format.ts, register-member.ts (T5)
│   ├── data/                # clubs.json, events.json — không cần sửa
│   └── test/setup.ts
└── README.md
```

## Nộp bài

Chép thư mục `starter/` thành repo mới **`EduHubWeb-Ch04-<MSSV>`** (public), commit ≥ 3 lần với message rõ nghĩa. Trước khi nộp chạy:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Không đưa `node_modules/` và `dist/` lên GitHub (đã có trong `.gitignore`).
