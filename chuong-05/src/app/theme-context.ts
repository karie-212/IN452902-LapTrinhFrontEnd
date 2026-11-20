import { createContext, use } from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

// Context = "kênh" truyền dữ liệu xuống mọi component con mà không phải
// chuyền props qua từng tầng (tránh "prop drilling").
export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const value = use(ThemeContext)
  if (!value) throw new Error('useTheme phải dùng bên trong <ThemeProvider>')
  return value
}
