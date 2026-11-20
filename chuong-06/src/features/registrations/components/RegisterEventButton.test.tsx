import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw/http'
import { describe, expect, it, vi } from 'vitest'
import { server } from '../../../test/msw/server'
import { Toaster } from '../../../shared/ui/Toaster'
import { RegisterEventButton } from './RegisterEventButton'

const refresh = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ refresh }) }))

const EVENT_ID = '22222222-2222-4222-8222-000000000020'

function renderButton(isLoggedIn: boolean) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={queryClient}>
      <RegisterEventButton eventId={EVENT_ID} isLoggedIn={isLoggedIn} />
      <Toaster />
    </QueryClientProvider>,
  )
}

describe('RegisterEventButton (Client Component gọi BFF)', () => {
  it('chưa đăng nhập → link "Đăng nhập để đăng ký" kèm redirect', () => {
    renderButton(false)
    expect(screen.getByRole('link', { name: 'Đăng nhập để đăng ký' })).toHaveAttribute(
      'href',
      `/login?redirect=${encodeURIComponent(`/events/${EVENT_ID}`)}`,
    )
  })

  it('đăng ký bị 409 → toast thông báo của server; không refresh trang', async () => {
    server.use(
      http.get('http://localhost:3000/api/registrations/me', () => HttpResponse.json([])),
      http.post('http://localhost:3000/api/registrations', () =>
        HttpResponse.json({ status: 409, detail: 'Sự kiện đã hết chỗ.' }, { status: 409 }),
      ),
    )
    renderButton(true)
    const button = await screen.findByRole('button', { name: 'Đăng ký tham gia' })
    await vi.waitFor(() => expect(button).toBeEnabled())
    await userEvent.click(button)
    expect(await screen.findByRole('alert')).toHaveTextContent('Sự kiện đã hết chỗ.')
    expect(refresh).not.toHaveBeenCalled()
  })
})
