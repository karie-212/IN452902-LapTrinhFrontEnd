import { toMember, type Member } from '../../auth/model/member'
import type { EventItem } from '../../events/model/event'
import { toEvent } from '../../events/model/event.mapper'
import type { RegistrationDto } from '../dto/registration.dto'

export type RegistrationStatus = RegistrationDto['status']

export type Registration = {
  id: string
  memberId: string
  eventId: string
  registeredAt: Date
  status: RegistrationStatus
  checkedInAt: Date | null
  event?: EventItem
  member?: Member
}

export function toRegistration(dto: RegistrationDto): Registration {
  return {
    id: dto.id,
    memberId: dto.memberId,
    eventId: dto.eventId,
    registeredAt: new Date(dto.registeredAt),
    status: dto.status,
    checkedInAt: dto.checkedInAt ? new Date(dto.checkedInAt) : null,
    event: dto.event ? toEvent(dto.event) : undefined,
    member: dto.member ? toMember(dto.member) : undefined,
  }
}

export const statusLabels: Record<RegistrationStatus, string> = {
  Pending: 'Chờ xác nhận',
  Confirmed: 'Đã xác nhận',
  Cancelled: 'Đã huỷ',
}
