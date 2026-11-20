import { expect, test } from '@playwright/test'

test('khách xem danh sách sự kiện, tìm kiếm và mở trang chi tiết', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('EduHub Web')

  await page.getByRole('link', { name: 'Xem lịch sự kiện' }).click()
  await expect(page).toHaveURL(/\/events$/)
  await expect(page.getByRole('status').filter({ hasText: 'Tìm thấy' })).toBeVisible()

  // Hiện cả sự kiện đã qua để kết quả không phụ thuộc ngày chạy test
  await page.getByLabel('Hiện cả sự kiện đã diễn ra').check()
  await expect(page).toHaveURL(/past=1/)
  await page.getByLabel('Tìm theo tên').fill('hien mau')
  await page.getByRole('button', { name: 'Tìm' }).click()
  await expect(page).toHaveURL(/q=hien\+mau/)
  await expect(page.getByText('Tìm thấy 1 sự kiện')).toBeVisible()

  await page.getByRole('link', { name: /Hiến máu nhân đạo/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hiến máu nhân đạo')
  // SEO: <title> riêng cho từng sự kiện, render từ server
  await expect(page).toHaveTitle(/Hiến máu nhân đạo .* · EduHub Web/)
})
