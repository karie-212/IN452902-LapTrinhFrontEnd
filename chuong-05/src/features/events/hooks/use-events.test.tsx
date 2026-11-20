import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ApiError } from '../../../shared/api/api-error'
import { renderQueryHook } from '../../../test/render'
import { eventKeys, useEvent, useEvents } from './use-events'

describe('useEvents / useEvent', () => {
  it('useEvents trả về model đã qua mapper, sắp theo thời gian, có phân trang', async () => {
    const { result } = renderQueryHook(() => useEvents({ page: 1, pageSize: 2 }))
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const page = result.current.data!
    expect(page.totalCount).toBe(3)
    expect(page.items.map((e) => e.title)).toEqual(['Workshop React cơ bản', 'Hiến máu nhân đạo đợt 1'])
    expect(page.items[0].startAt).toBeInstanceOf(Date)
  })

  it('useEvent với id không tồn tại → error là ApiError not_found', async () => {
    const { result } = renderQueryHook(() => useEvent('22222222-2222-4222-8222-999999999999'))
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeInstanceOf(ApiError)
    expect((result.current.error as ApiError).code).toBe('not_found')
  })

  it('query key factory: key con nằm dưới key cha để invalidate theo nhóm', () => {
    expect(eventKeys.list({ page: 1, pageSize: 9 })).toEqual(['events', 'list', { page: 1, pageSize: 9 }])
    expect(eventKeys.detail('abc').slice(0, 1)).toEqual(eventKeys.all)
  })
})
