import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../app/router'
import { ThemeProvider } from '../app/ThemeProvider'

// Render cả ứng dụng ở một URL cho trước, không cần trình duyệt thật
function renderApp(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
}

// Mỗi card sự kiện có một tiêu đề cấp 3
function cardTitles() {
  return screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
}

describe('Trang Sự kiện', () => {
  // Cố định "hôm nay" là 05/10/2026 để kết quả không đổi theo ngày chạy test
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-10-05T00:00:00.000Z'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('lúc đầu chỉ hiện 18 sự kiện sắp tới; menu "Sự kiện" đang active', () => {
    renderApp('/events')
    expect(screen.getByRole('heading', { level: 1, name: 'Lịch sự kiện' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Tìm thấy 18 sự kiện')
    expect(screen.getByRole('link', { name: 'Sự kiện' })).toHaveAttribute('aria-current', 'page')
  })

  it('gõ tìm kiếm và chọn CLB thì danh sách lọc ngay', async () => {
    const user = userEvent.setup()
    renderApp('/events')

    await user.type(screen.getByLabelText('Tìm theo tên'), 'hien mau')
    expect(screen.getByRole('status')).toHaveTextContent('Tìm thấy 1 sự kiện')
    expect(cardTitles()).toEqual(['Hiến máu nhân đạo đợt 1 năm học 2026–2027'])

    await user.clear(screen.getByLabelText('Tìm theo tên'))
    await user.selectOptions(screen.getByLabelText('Câu lạc bộ'), 'CLB Bóng đá')
    expect(screen.getByRole('status')).toHaveTextContent('Tìm thấy 3 sự kiện')

    await user.click(screen.getByLabelText('Hiện cả sự kiện đã diễn ra'))
    expect(screen.getByRole('status')).toHaveTextContent('Tìm thấy 4 sự kiện')
  })

  it('không có kết quả thì hiện thông báo trống', async () => {
    const user = userEvent.setup()
    renderApp('/events')
    await user.type(screen.getByLabelText('Tìm theo tên'), 'không tồn tại xyz')
    expect(screen.getByText(/Không có sự kiện nào phù hợp/)).toBeInTheDocument()
  })

  it('URL lạ thì hiện trang 404', () => {
    renderApp('/khong-co-trang-nay')
    expect(screen.getByRole('heading', { name: 'Không tìm thấy trang' })).toBeInTheDocument()
  })
})
