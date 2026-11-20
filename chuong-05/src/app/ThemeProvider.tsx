import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from './theme-context'

const STORAGE_KEY = 'eduhub-theme'

// Lần đầu: lấy lựa chọn đã lưu, không có thì theo cài đặt hệ điều hành
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage có thể bị chặn (chế độ riêng tư) → bỏ qua
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Đồng bộ state React ra "thế giới bên ngoài" (thẻ <html>, localStorage):
  // đây đúng là việc của useEffect.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // bỏ qua
    }
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  // React 19: dùng thẳng <ThemeContext> làm provider (không cần .Provider)
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
