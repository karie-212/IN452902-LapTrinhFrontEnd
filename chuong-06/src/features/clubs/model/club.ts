import type { ClubDto } from '../dto/club.dto'

export type Club = {
  id: string
  name: string
  description: string
  createdAt: Date
}

export function toClub(dto: ClubDto): Club {
  return { id: dto.id, name: dto.name, description: dto.description, createdAt: new Date(dto.createdAt) }
}
