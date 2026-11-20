import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw/http'
import { describe, expect, it } from 'vitest'
import { API, events, member, problem } from '../../../test/msw/fixtures'
import { server } from '../../../test/msw/server'
import { renderRoute } from '../../../test/render'
import { toMember } from '../../auth/model/member'
import { useAuthStore } from '../../auth/store'

describe('Nút "Đăng ký tham gia" ở trang chi tiết', () => {
  it('chưa đăng nhập → hiện link "Đăng nhập để đăng ký"', async () => {
    renderRoute(`/events/${events[1].id}`)
    expect(await screen.findByRole('link', { name: 'Đăng nhập để đăng ký' })).toHaveAttribute(
      'href',
      `/login?redirect=${encodeURIComponent(`/events/${events[1].id}`)}`,
    )
  })

  it('server trả 409 → hiện toast với thông báo của server', async () => {
    useAuthStore.getState().setSession('test-access-token', toMember(member))
    server.use(
      http.post(`${API}/api/registrations`, () =>
        HttpResponse.json(problem(409, 'Bạn đã đăng ký sự kiện này.'), { status: 409 }),
      ),
    )
    renderRoute(`/events/${events[1].id}`)
    await userEvent.click(await screen.findByRole('button', { name: 'Đăng ký tham gia' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Bạn đã đăng ký sự kiện này.')
  })
})
