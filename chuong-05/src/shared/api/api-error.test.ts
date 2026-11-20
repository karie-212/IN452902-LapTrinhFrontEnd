import { describe, expect, it } from 'vitest'
import { ApiError, toApiError } from './api-error'

describe('toApiError', () => {
  it('400 ProblemDetails → code bad_request, lấy lỗi đầu tiên của từng field', () => {
    const error = toApiError(400, {
      title: 'Dữ liệu không hợp lệ',
      status: 400,
      detail: 'Có trường không hợp lệ.',
      errors: { name: ['Tên sự kiện là bắt buộc.', 'Tối đa 200 ký tự.'], capacity: ['Sức chứa phải là số nguyên dương.'] },
    })
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(400)
    expect(error.code).toBe('bad_request')
    expect(error.fieldErrors).toEqual({
      name: 'Tên sự kiện là bắt buộc.',
      capacity: 'Sức chứa phải là số nguyên dương.',
    })
  })

  it('409 dùng detail của server làm thông báo', () => {
    const error = toApiError(409, { title: 'Xung đột dữ liệu', status: 409, detail: 'Sự kiện đã hết chỗ.' })
    expect(error.code).toBe('conflict')
    expect(error.message).toBe('Sự kiện đã hết chỗ.')
    expect(error.fieldErrors).toEqual({})
  })

  it('không có response (mất mạng, timeout) → code network', () => {
    const error = toApiError(undefined, undefined)
    expect(error.status).toBe(0)
    expect(error.code).toBe('network')
    expect(error.message).toMatch(/Không kết nối được máy chủ/)
  })

  it('5xx: không lộ chi tiết lỗi server, dùng thông báo chung', () => {
    const error = toApiError(500, { status: 500, detail: 'NullReferenceException at line 42' })
    expect(error.code).toBe('server')
    expect(error.message).not.toContain('NullReferenceException')
  })
})
