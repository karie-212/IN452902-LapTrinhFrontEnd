// Dữ liệu nhỏ cho test — đúng hình dạng DTO của mock API (JSON thô, chưa qua mapper)
import type { ClubDto } from '../../features/clubs/dto/club.dto'
import type { EventDto } from '../../features/events/dto/event.dto'
import type { MemberDto } from '../../features/auth/dto/auth.dto'

export const API = 'http://localhost:4000'

export const clubs: ClubDto[] = [
  {
    id: '11111111-1111-4111-8111-000000000001',
    name: 'CLB Tin học',
    description: 'Lập trình, thiết kế web và thi Olympic Tin học.',
    presidentId: null,
    createdAt: '2026-08-01T01:00:00.000Z',
  },
  {
    id: '11111111-1111-4111-8111-000000000002',
    name: 'CLB Tình nguyện',
    description: 'Hiến máu, mùa hè xanh, tiếp sức mùa thi.',
    presidentId: null,
    createdAt: '2026-08-01T01:00:00.000Z',
  },
]

export const events: EventDto[] = [
  {
    id: '22222222-2222-4222-8222-000000000001',
    name: 'Hackathon EduHub 24 giờ',
    description: 'Thi làm sản phẩm theo nhóm trong 24 giờ.',
    clubId: clubs[0].id,
    location: 'Hội trường lớn',
    startTime: '2026-12-19T01:00:00.000Z',
    capacity: 100,
    createdAt: '2026-08-15T03:00:00.000Z',
    registeredCount: 90,
  },
  {
    id: '22222222-2222-4222-8222-000000000002',
    name: 'Hiến máu nhân đạo đợt 1',
    description: 'Mỗi giọt máu cho đi, một cuộc đời ở lại.',
    clubId: clubs[1].id,
    location: 'Nhà thi đấu đa năng',
    startTime: '2026-11-07T00:30:00.000Z',
    capacity: 200,
    createdAt: '2026-08-20T03:00:00.000Z',
    registeredCount: 12,
  },
  {
    id: '22222222-2222-4222-8222-000000000003',
    name: 'Workshop React cơ bản',
    description: 'Component, props, state trong 3 giờ.',
    clubId: clubs[0].id,
    location: 'Phòng máy A3.201',
    startTime: '2026-10-24T01:00:00.000Z',
    capacity: 40,
    createdAt: '2026-08-20T03:00:00.000Z',
    registeredCount: 40,
  },
]

export const member: MemberDto = {
  id: '33333333-3333-4333-8333-000000000002',
  studentId: '0023410001',
  name: 'Nguyễn Văn An',
  email: 'sv1@dthu.edu.vn',
  role: 'Member',
  joinedAt: '2026-08-20T01:00:00.000Z',
}

export const admin: MemberDto = {
  id: '33333333-3333-4333-8333-000000000001',
  studentId: 'CB0001',
  name: 'Quản trị EduHub',
  email: 'admin@dthu.edu.vn',
  role: 'Admin',
  joinedAt: '2026-08-01T01:00:00.000Z',
}

// ProblemDetails giống mock API / ASP.NET Core
export function problem(status: number, detail: string, errors?: Record<string, string[]>) {
  return { type: 'about:blank', title: 'Lỗi', status, detail, ...(errors ? { errors } : {}) }
}
