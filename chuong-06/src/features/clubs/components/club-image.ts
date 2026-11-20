// Ảnh minh hoạ theo CLB (SVG tự vẽ trong public/images/clubs) — API không có trường ảnh
const clubImages: Record<string, string> = {
  '11111111-1111-4111-8111-000000000001': 'club-tin-hoc.svg',
  '11111111-1111-4111-8111-000000000002': 'club-tinh-nguyen.svg',
  '11111111-1111-4111-8111-000000000003': 'club-tieng-anh.svg',
  '11111111-1111-4111-8111-000000000004': 'club-am-nhac.svg',
  '11111111-1111-4111-8111-000000000005': 'club-bong-da.svg',
  '11111111-1111-4111-8111-000000000006': 'club-ky-nang-mem.svg',
}

export function getClubImage(clubId: string): string {
  return `/images/clubs/${clubImages[clubId] ?? 'club-tin-hoc.svg'}`
}
