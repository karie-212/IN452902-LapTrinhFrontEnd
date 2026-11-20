// Định dạng thời gian theo giờ Việt Nam, vd. "07:30, Thứ Bảy 17/10/2026"
const parts = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function formatEventTime(iso: string): string {
  const p = Object.fromEntries(parts.formatToParts(new Date(iso)).map((x) => [x.type, x.value]))
  return `${p.hour}:${p.minute}, ${p.weekday} ${p.day}/${p.month}/${p.year}`
}
