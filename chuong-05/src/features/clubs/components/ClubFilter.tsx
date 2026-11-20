import type { Club } from '../model/club'

type ClubFilterProps = {
  clubs: Club[]
  value: string // '' = tất cả CLB
  onChange: (clubId: string) => void
}

export function ClubFilter({ clubs, value, onChange }: ClubFilterProps) {
  return (
    <div className="grid gap-1">
      <label htmlFor="club-filter" className="font-semibold">
        Câu lạc bộ
      </label>
      <select
        id="club-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-sm border border-line bg-surface px-3 py-2 focus-visible:border-accent-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-accent/35"
      >
        <option value="">Tất cả CLB</option>
        {clubs.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
    </div>
  )
}
