// TODO(ch4-T6): lấy { theme, toggleTheme } từ useTheme(); bấm nút thì đổi theme;
//  aria-label "Chuyển sang giao diện tối/sáng", aria-pressed, biểu tượng ☾ / ☀.
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Chuyển sang giao diện tối"
      className="inline-flex size-11 items-center justify-center rounded-full text-lg text-white transition-colors hover:bg-white/12"
    >
      <span aria-hidden="true">☾</span>
    </button>
  )
}
