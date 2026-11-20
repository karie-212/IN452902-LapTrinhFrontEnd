import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import type { EventItem } from '../types'
import { EventCard } from './EventCard'

const event: EventItem = {
  id: 'abc',
  name: 'Hackathon EduHub 24 giờ',
  description: 'Thi làm sản phẩm theo nhóm.',
  clubId: '11111111-1111-4111-8111-000000000001', // CLB Tin học trong data/clubs.json
  location: 'Hội trường lớn',
  startTime: '2026-12-19T01:00:00.000Z',
  capacity: 100,
  createdAt: '2026-08-15T03:00:00.000Z',
  registeredCount: 90,
}

// <Link> cần một router bao ngoài → dùng MemoryRouter trong test
function renderCard(props: Partial<{ event: EventItem; past: boolean }> = {}) {
  return render(
    <MemoryRouter>
      <EventCard event={event} {...props} />
    </MemoryRouter>,
  )
}

describe('EventCard', () => {
  it('hiện tên, CLB, giờ Việt Nam, số chỗ và link tới trang chi tiết', () => {
    renderCard()
    expect(screen.getByRole('link', { name: 'Hackathon EduHub 24 giờ' })).toHaveAttribute('href', '/events/abc')
    expect(screen.getByText('CLB Tin học')).toBeInTheDocument()
    expect(screen.getByText('08:00, Thứ Bảy 19/12/2026')).toBeInTheDocument()
    expect(screen.getByText('Còn 10/100 chỗ')).toBeInTheDocument()
  })

  it('còn dưới 20% chỗ thì có nhãn "Sắp hết chỗ"', () => {
    renderCard()
    expect(screen.getByText('Sắp hết chỗ')).toBeInTheDocument()
  })

  it('sự kiện đã qua: có nhãn "Đã diễn ra", không hiện số chỗ', () => {
    renderCard({ past: true })
    expect(screen.getByText('Đã diễn ra')).toBeInTheDocument()
    expect(screen.queryByText(/Còn \d+\/\d+ chỗ/)).not.toBeInTheDocument()
  })
})
