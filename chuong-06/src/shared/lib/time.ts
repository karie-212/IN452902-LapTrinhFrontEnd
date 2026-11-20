// "Bây giờ" làm tròn xuống đầu giờ: dùng làm tham số from= cho API.
// Tròn giờ → khoá cache của 'use cache' giữ nguyên trong 1 giờ thay vì đổi từng mili-giây.
export function startOfCurrentHour(now = new Date()): Date {
  const d = new Date(now)
  d.setMinutes(0, 0, 0)
  return d
}
