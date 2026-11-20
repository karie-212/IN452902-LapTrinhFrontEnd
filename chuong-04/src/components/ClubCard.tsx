import type { Club } from '../types'

type ClubCardProps = {
  club: Club
  eventCount: number
}

export function ClubCard({ club, eventCount }: ClubCardProps) {
  return (
    <article className="h-full rounded-md border border-t-4 border-line border-t-accent bg-surface p-6">
      <h3 className="mb-2 text-lg font-bold text-primary">{club.name}</h3>
      <p className="text-ink-muted">{club.description}</p>
      <p className="mt-3 text-sm font-semibold">{eventCount} sự kiện trong học kỳ</p>
    </article>
  )
}
