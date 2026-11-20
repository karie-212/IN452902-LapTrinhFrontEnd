import { act, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderQueryHook } from '../../../test/render'
import { useAuthStore } from '../store'
import { useLogin } from './use-auth'

describe('useLogin', () => {
  it('đăng nhập đúng → lưu token + thông tin thành viên vào store', async () => {
    const { result } = renderQueryHook(() => useLogin())
    await act(() => result.current.mutateAsync({ email: 'sv1@dthu.edu.vn', password: 'Member@123' }))

    const state = useAuthStore.getState()
    expect(state.accessToken).toBe('test-access-token')
    expect(state.member?.name).toBe('Nguyễn Văn An')
    expect(state.member?.joinedAt).toBeInstanceOf(Date)
  })

  it('sai mật khẩu → mutation lỗi 401, store vẫn trống', async () => {
    const { result } = renderQueryHook(() => useLogin())
    act(() => result.current.mutate({ email: 'sv1@dthu.edu.vn', password: 'sai-mat-khau' }))
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toBe('Email hoặc mật khẩu không đúng.')
    expect(useAuthStore.getState().member).toBeNull()
  })
})
