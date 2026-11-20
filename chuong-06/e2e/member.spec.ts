import { expect, test } from '@playwright/test'
import { createMemberAccount, createUpcomingEvent, login } from './helpers'

test('thành viên đăng nhập, đăng ký sự kiện và thấy ở "Sự kiện của tôi"', async ({ page }) => {
  const member = await createMemberAccount()
  const title = `Workshop e2e ${Date.now()}`
  const event = await createUpcomingEvent(title)

  // Chưa đăng nhập: trang bảo vệ chuyển về /login?redirect=…
  await page.goto('/my-events')
  await expect(page).toHaveURL(/\/login\?redirect=%2Fmy-events/)

  await page.goto(`/events/${event.id}`)
  await page.getByRole('link', { name: 'Đăng nhập để đăng ký' }).click()
  await login(page, member.email, member.password)
  await expect(page).toHaveURL(new RegExp(`/events/${event.id}$`))

  await page.getByRole('button', { name: 'Đăng ký tham gia' }).click()
  await expect(page.getByText(/Bạn đã đăng ký/)).toBeVisible()
  await expect(page.getByText('Còn 99 chỗ', { exact: false })).toBeVisible() // server render lại số chỗ

  await page.getByRole('link', { name: 'Sự kiện của tôi' }).click()
  await expect(page.getByRole('heading', { level: 3, name: title })).toBeVisible()
})
