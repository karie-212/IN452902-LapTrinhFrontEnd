import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { clubs, events } from '../../../test/msw/fixtures'
import { toClub } from '../../clubs/model/club'
import { toEvent } from '../model/event.mapper'
import { EventCard } from './EventCard'

const club = toClub(clubs[0])

describe('EventCard', () => {
  it('hiện tên, CLB, giờ Việt Nam, số chỗ, link chi tiết và nhãn "Sắp hết chỗ"', () => {
    render(
      <MemoryRouter>
        <EventCard event={toEvent(events[0])} club={club} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Hackathon EduHub 24 giờ' })).toHaveAttribute('href', `/events/${events[0].id}`)
    expect(screen.getByText('CLB Tin học')).toBeInTheDocument()
    expect(screen.getByText('08:00, Thứ Bảy 19/12/2026')).toBeInTheDocument()
    expect(screen.getByText('Còn 10/100 chỗ')).toBeInTheDocument()
    expect(screen.getByText('Sắp hết chỗ')).toBeInTheDocument()
  })

  it('đủ chỗ thì có nhãn "Hết chỗ"', () => {
    render(
      <MemoryRouter>
        <EventCard event={toEvent(events[2])} club={club} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Hết chỗ')).toBeInTheDocument()
    expect(screen.getByText('Còn 0/40 chỗ')).toBeInTheDocument()
  })
})
