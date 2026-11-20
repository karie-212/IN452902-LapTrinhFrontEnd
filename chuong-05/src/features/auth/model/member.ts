import type { MemberDto } from '../dto/auth.dto'

// Model = kiểu dùng trong giao diện (Date thay cho chuỗi ISO)
export type Role = 'Member' | 'Admin'

export type Member = {
  id: string
  studentId: string
  name: string
  email: string
  role: Role
  joinedAt: Date
}

export function toMember(dto: MemberDto): Member {
  return { ...dto, joinedAt: new Date(dto.joinedAt) }
}
