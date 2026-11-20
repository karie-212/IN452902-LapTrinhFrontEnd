export type Theme = 'light' | 'dark'

// TODO(ch4-T6): tạo ThemeContext bằng createContext<{ theme: Theme; toggleTheme: () => void } | null>(null)
//  và hook useTheme() đọc context bằng use(ThemeContext); dùng ngoài Provider (giá trị null)
//  thì throw new Error('useTheme phải dùng bên trong <ThemeProvider>').
