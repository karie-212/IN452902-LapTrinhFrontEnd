import type { Club } from '../model/club'

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className="h-full rounded-md border border-t-4 border-line border-t-accent bg-surface p-6">
      <h3 className="mb-2 text-lg font-bold text-primary">{club.name}</h3>
      <p className="text-ink-muted">{club.description}</p>
    </article>
  )
}
