import { expect, test } from '@playwright/test'
import { login } from './helpers'

test('admin tạo sự kiện mới bằng Server Action', async ({ page }) => {
  const title = `Giải cờ vua sinh viên ${Date.now()}`

  await page.goto('/admin/events')
  await expect(page).toHaveURL(/\/login/)
  await login(page, 'admin@dthu.edu.vn', 'Admin@123')
  await expect(page.getByRole('heading', { name: 'Quản lý sự kiện' })).toBeVisible()

  await page.getByRole('link', { name: '+ Tạo sự kiện' }).click()
  // Gửi form rỗng → lỗi Zod trả về từ Server Action
  await page.getByRole('button', { name: 'Tạo sự kiện' }).click()
  await expect(page.getByText('Nhập tên sự kiện.')).toBeVisible()

  await page.getByLabel('Tên sự kiện').fill(title)
  await page.getByLabel('Câu lạc bộ').selectOption({ label: 'CLB Kỹ năng mềm' })
  await page.getByLabel('Địa điểm').fill('Phòng B1.101')
  await page.getByLabel('Thời gian bắt đầu').fill('2027-01-09T08:00')
  await page.getByLabel('Sức chứa').fill('32')
  await page.getByRole('button', { name: 'Tạo sự kiện' }).click()

  await expect(page).toHaveURL(/\/admin\/events$/)
  // updateTag('events') → bảng đọc dữ liệu mới ngay. Sự kiện mới ở trang có ngày 09/01/2027.
  await page.goto(`/events?q=${encodeURIComponent('co vua')}&past=1`)
  const card = page.getByRole('article').filter({ hasText: title })
  await expect(card.getByRole('link', { name: title })).toBeVisible()
  await expect(card.getByText('08:00, Thứ Bảy 09/01/2027')).toBeVisible() // giờ Việt Nam, không lệch múi giờ
})
