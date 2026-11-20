// Dữ liệu tĩnh chép từ mock-api/db.json (Ch04 chưa gọi API).
import clubImgAmNhac from '../assets/club-am-nhac.svg'
import clubImgBongDa from '../assets/club-bong-da.svg'
import clubImgKyNangMem from '../assets/club-ky-nang-mem.svg'
import clubImgTiengAnh from '../assets/club-tieng-anh.svg'
import clubImgTinHoc from '../assets/club-tin-hoc.svg'
import clubImgTinhNguyen from '../assets/club-tinh-nguyen.svg'
import type { Club, EventItem } from '../types'
import clubsJson from './clubs.json'
import eventsJson from './events.json'

export const clubs: Club[] = clubsJson
export const events: EventItem[] = eventsJson

// Ảnh minh hoạ theo CLB — API không có trường ảnh nên ghép ở phía giao diện
const clubImages: Record<string, string> = {
  '11111111-1111-4111-8111-000000000001': clubImgTinHoc,
  '11111111-1111-4111-8111-000000000002': clubImgTinhNguyen,
  '11111111-1111-4111-8111-000000000003': clubImgTiengAnh,
  '11111111-1111-4111-8111-000000000004': clubImgAmNhac,
  '11111111-1111-4111-8111-000000000005': clubImgBongDa,
  '11111111-1111-4111-8111-000000000006': clubImgKyNangMem,
}

export function getClubImage(clubId: string): string {
  return clubImages[clubId] ?? clubImgTinHoc
}

export function findClub(clubId: string): Club | undefined {
  return clubs.find((club) => club.id === clubId)
}

export function findEvent(eventId: string): EventItem | undefined {
  return events.find((event) => event.id === eventId)
}
