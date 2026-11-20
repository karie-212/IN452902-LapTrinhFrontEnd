import { describe, expect, it } from 'vitest'
import { events } from '../../../test/msw/fixtures'
import { eventDtoSchema } from '../dto/event.dto'
import { toCreateEventDto, toEvent } from './event.mapper'

describe('event mapper', () => {
  it('toEvent: DTO → model (name → title, chuỗi ISO → Date)', () => {
    const event = toEvent(events[0])
    expect(event).toMatchObject({
      id: events[0].id,
      title: 'Hackathon EduHub 24 giờ',
      clubId: events[0].clubId,
      capacity: 100,
      registeredCount: 90,
    })
    expect(event.startAt).toBeInstanceOf(Date)
    expect(event.startAt.toISOString()).toBe('2026-12-19T01:00:00.000Z')
  })

  it('toCreateEventDto: giá trị form → body gửi server (title → name, Date → ISO)', () => {
    const dto = toCreateEventDto({
      title: '  Đêm nhạc acoustic  ',
      description: 'Hát cùng CLB Âm nhạc.',
      clubId: '11111111-1111-4111-8111-000000000004',
      location: 'Sân khấu ngoài trời',
      startAt: new Date('2026-12-24T12:00:00.000Z'),
      capacity: 150,
    })
    expect(dto).toEqual({
      name: 'Đêm nhạc acoustic',
      description: 'Hát cùng CLB Âm nhạc.',
      clubId: '11111111-1111-4111-8111-000000000004',
      location: 'Sân khấu ngoài trời',
      startTime: '2026-12-24T12:00:00.000Z',
      capacity: 150,
    })
  })

  it('eventDtoSchema chặn JSON sai contract (thiếu field, sai kiểu, sai định dạng ngày)', () => {
    expect(eventDtoSchema.safeParse(events[1]).success).toBe(true)
    expect(eventDtoSchema.safeParse({ ...events[1], name: undefined }).success).toBe(false)
    expect(eventDtoSchema.safeParse({ ...events[1], capacity: '200' }).success).toBe(false)
    expect(eventDtoSchema.safeParse({ ...events[1], startTime: '07/11/2026' }).success).toBe(false)
  })
})
