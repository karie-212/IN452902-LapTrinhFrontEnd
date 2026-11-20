import type { ReactNode } from 'react'

// TODO(ch4-T6): ThemeProvider giữ state theme ('light' | 'dark'):
//  - giá trị đầu: localStorage['eduhub-theme'] nếu có, không thì theo
//    window.matchMedia('(prefers-color-scheme: dark)')
//  - useEffect đồng bộ ra ngoài React: document.documentElement.dataset.theme = theme
//    và lưu localStorage (index.css đã đổi màu theo [data-theme="dark"])
//  - bọc children bằng <ThemeContext value={{ theme, toggleTheme }}>
export function ThemeProvider({ children }: { children: ReactNode }) {
  return children
}
