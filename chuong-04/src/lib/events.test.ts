import { describe, expect, it } from 'vitest'
import type { EventItem } from '../types'
import { filterEvents, isAlmostFull } from './events'

// Dữ liệu nhỏ tự tạo cho test — không phụ thuộc events.json
function makeEvent(overrides: Partial<EventItem>): EventItem {
  return {
    id: 'e1',
    name: 'Sự kiện mẫu',
    description: '',
    clubId: 'club-a',
    location: 'Hội trường',
    startTime: '2026-10-01T00:00:00.000Z',
    capacity: 100,
    createdAt: '2026-09-01T00:00:00.000Z',
    registeredCount: 0,
    ...overrides,
  }
}

const now = new Date('2026-10-15T00:00:00.000Z')
const all = { query: '', clubId: '', includePast: true }

const sample = [
  makeEvent({ id: 'e1', name: 'Hiến máu nhân đạo', clubId: 'club-a', startTime: '2026-11-01T00:00:00.000Z' }),
  makeEvent({ id: 'e2', name: 'Workshop Git', clubId: 'club-b', startTime: '2026-10-01T00:00:00.000Z' }),
  makeEvent({ id: 'e3', name: 'Đêm nhạc Giáng sinh', clubId: 'club-b', startTime: '2026-12-24T00:00:00.000Z' }),
]

describe('filterEvents', () => {
  it('không lọc gì thì trả về tất cả, sắp xếp theo thời gian', () => {
    const result = filterEvents(sample, all, now)
    expect(result.map((e) => e.id)).toEqual(['e2', 'e1', 'e3'])
  })

  it('mặc định ẩn sự kiện đã diễn ra (trước "now")', () => {
    const result = filterEvents(sample, { ...all, includePast: false }, now)
    expect(result.map((e) => e.id)).toEqual(['e1', 'e3'])
  })

  it('lọc theo CLB', () => {
    const result = filterEvents(sample, { ...all, clubId: 'club-b' }, now)
    expect(result.map((e) => e.id)).toEqual(['e2', 'e3'])
  })

  it('tìm theo tên không phân biệt hoa thường và dấu', () => {
    expect(filterEvents(sample, { ...all, query: 'HIEN MAU' }, now).map((e) => e.id)).toEqual(['e1'])
    expect(filterEvents(sample, { ...all, query: 'dem nhac' }, now).map((e) => e.id)).toEqual(['e3'])
  })

  it('kết hợp tên và CLB; không khớp thì trả mảng rỗng', () => {
    expect(filterEvents(sample, { ...all, query: 'git', clubId: 'club-a' }, now)).toEqual([])
  })

  it('không làm thay đổi mảng gốc', () => {
    const before = sample.map((e) => e.id)
    filterEvents(sample, all, now)
    expect(sample.map((e) => e.id)).toEqual(before)
  })
})

describe('isAlmostFull', () => {
  it('còn dưới 20% chỗ là sắp hết; hết hẳn thì không tính', () => {
    expect(isAlmostFull(makeEvent({ capacity: 100, registeredCount: 85 }))).toBe(true)
    expect(isAlmostFull(makeEvent({ capacity: 100, registeredCount: 50 }))).toBe(false)
    expect(isAlmostFull(makeEvent({ capacity: 5, registeredCount: 5 }))).toBe(false)
  })
})
