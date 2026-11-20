import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { toApiError } from '../../../shared/api/api-error'
import { clubs } from '../../../test/msw/fixtures'
import { toClub } from '../../clubs/model/club'
import { EventForm } from './EventForm'

async function fillValidForm() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/Tên sự kiện/), 'Đêm nhạc acoustic')
  await user.selectOptions(screen.getByLabelText(/Câu lạc bộ/), 'CLB Tin học')
  await user.type(screen.getByLabelText(/Địa điểm/), 'Sân khấu ngoài trời')
  await user.type(screen.getByLabelText(/Thời gian bắt đầu/), '2026-12-24T19:00')
  await user.type(screen.getByLabelText(/Sức chứa/), '150')
  return user
}

describe('EventForm', () => {
  it('bỏ trống → Zod báo lỗi dưới từng ô, không gọi onSubmit', async () => {
    const onSubmit = vi.fn()
    render(<EventForm clubs={clubs.map(toClub)} submitLabel="Tạo sự kiện" onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Tạo sự kiện' }))

    expect(await screen.findByText('Nhập tên sự kiện.')).toBeInTheDocument()
    expect(screen.getByText('Chọn câu lạc bộ tổ chức.')).toBeInTheDocument()
    expect(screen.getByLabelText(/Tên sự kiện/)).toHaveAttribute('aria-invalid', 'true')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('server trả 400 → lỗi field "name" hiện dưới ô "Tên sự kiện" (setError)', async () => {
    const onSubmit = vi.fn().mockRejectedValue(
      toApiError(400, { status: 400, detail: 'Có trường không hợp lệ.', errors: { name: ['Tên sự kiện đã tồn tại.'] } }),
    )
    render(<EventForm clubs={clubs.map(toClub)} submitLabel="Tạo sự kiện" onSubmit={onSubmit} />)
    const user = await fillValidForm()
    await user.click(screen.getByRole('button', { name: 'Tạo sự kiện' }))

    expect(await screen.findByText('Tên sự kiện đã tồn tại.')).toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Đêm nhạc acoustic', capacity: 150, startAt: expect.any(Date) }),
    )
  })
})
