import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'
import { getClubs } from '../../../../../features/clubs/api/clubs.server'
import { EventForm } from '../../../../../features/events/components/EventForm'
import { PageContainer } from '../../../../../shared/ui/PageContainer'
import { Spinner } from '../../../../../shared/ui/Spinner'

export const metadata: Metadata = { title: 'Tạo sự kiện' }

export default function NewEventPage() {
  return (
    <PageContainer narrow>
      <h1 className="mb-6">Tạo sự kiện</h1>
      <Suspense fallback={<Spinner />}>
        <FormWithClubs />
      </Suspense>
    </PageContainer>
  )
}

async function FormWithClubs() {
  await connection()
  return <EventForm clubs={await getClubs()} />
}
