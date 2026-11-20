import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { getClubs } from '../../../features/clubs/api/clubs.server'
import { ClubCard } from '../../../features/clubs/components/ClubCard'
import { PageContainer } from '../../../shared/ui/PageContainer'
import { Spinner } from '../../../shared/ui/Spinner'

export const metadata: Metadata = {
  title: 'Câu lạc bộ',
  description: 'Các câu lạc bộ sinh viên đang hoạt động tại Trường Đại học Đồng Tháp.',
}

export default function ClubsPage() {
  return (
    <PageContainer>
      <h1>Câu lạc bộ</h1>
      <Suspense fallback={<Spinner />}>
        <ClubGrid />
      </Suspense>
    </PageContainer>
  )
}

async function ClubGrid() {
  await connection()
  const clubs = await getClubs()
  return (
    <>
      <p className="mt-3 mb-8 max-w-[60ch] text-lg text-ink-muted">
        {clubs.length} câu lạc bộ đang hoạt động tại Trường Đại học Đồng Tháp.
      </p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))] gap-6">
        {clubs.map((club) => (
          <li key={club.id}>
            <ClubCard club={club} />
          </li>
        ))}
      </ul>
    </>
  )
}
