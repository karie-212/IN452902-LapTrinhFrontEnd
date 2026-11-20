type SearchBarProps = {
  defaultValue: string
  onSearch: (query: string) => void
}

// Tìm theo tên phía server (?q=): gửi khi bấm Enter/nút "Tìm" thay vì mỗi lần gõ phím,
// để không bắn hàng chục request. Ô nhập là uncontrolled (defaultValue).
export function SearchBar({ defaultValue, onSearch }: SearchBarProps) {
  return (
    <form
      role="search"
      className="grid gap-1"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(String(new FormData(e.currentTarget).get('q') ?? '').trim())
      }}
    >
      <label htmlFor="search" className="font-semibold">
        Tìm theo tên
      </label>
      <div className="flex gap-2">
        <input
          id="search"
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Ví dụ: hiến máu, hackathon…"
          className="min-h-11 w-full rounded-sm border border-line bg-surface px-3 py-2 focus-visible:border-accent-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/35"
        />
        <button
          type="submit"
          className="min-h-11 rounded-sm bg-primary px-4 font-semibold text-on-primary hover:bg-primary-hover"
        >
          Tìm
        </button>
      </div>
    </form>
  )
}
