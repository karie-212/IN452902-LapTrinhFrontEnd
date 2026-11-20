import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderRoute } from '../test/render'

describe('Trang (render cả ứng dụng với MSW)', () => {
  it('/events?past=1: tải danh sách từ API, lọc CLB thì URL đổi theo', async () => {
    const { router } = renderRoute('/events?past=1')
    expect(await screen.findByText('Tìm thấy 3 sự kiện')).toBeInTheDocument()

    await userEvent.selectOptions(await screen.findByLabelText('Câu lạc bộ'), 'CLB Tình nguyện')
    expect(await screen.findByText('Tìm thấy 1 sự kiện')).toBeInTheDocument()
    expect(router.state.location.search).toContain('clubId=11111111-1111-4111-8111-000000000002')
  })

  it('chưa đăng nhập mở /my-events → chuyển sang /login?redirect=/my-events', async () => {
    const { router } = renderRoute('/my-events')
    expect(await screen.findByRole('heading', { level: 1, name: 'Đăng nhập' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
    expect(router.state.location.search).toBe(`?redirect=${encodeURIComponent('/my-events')}`)
  })

  it('đăng nhập sai → hiện lỗi của server; đúng → quay về trang trước', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/login?redirect=/my-events')
    await user.type(await screen.findByLabelText(/Email/), 'sv1@dthu.edu.vn')
    await user.type(screen.getByLabelText(/Mật khẩu/), 'sai-mat-khau')
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }))
    expect(await screen.findByText('Email hoặc mật khẩu không đúng.')).toBeInTheDocument()

    await user.clear(screen.getByLabelText(/Mật khẩu/))
    await user.type(screen.getByLabelText(/Mật khẩu/), 'Member@123')
    await user.click(screen.getByRole('button', { name: 'Đăng nhập' }))
    await waitFor(() => expect(router.state.location.pathname).toBe('/my-events'))
    expect(await screen.findByRole('heading', { level: 1, name: 'Sự kiện của tôi' })).toBeInTheDocument()
  })
})
