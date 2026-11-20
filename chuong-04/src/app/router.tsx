import { createBrowserRouter } from 'react-router'
import { ClubsPage } from '../pages/ClubsPage'
import { EventsPage } from '../pages/EventsPage'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '../pages/RegisterPage'
import { RootLayout } from './RootLayout'

// Bảng route dạng dữ liệu (data mode). Tách riêng để test dùng lại với createMemoryRouter.
export const routes = [
  {
    path: '/',
    element: <RootLayout />, // layout chung: header + <Outlet /> + footer
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'clubs', element: <ClubsPage /> },
      { path: 'register', element: <RegisterPage /> },
      // TODO(ch4-T3): thêm route "events/:eventId" → <EventDetailPage />
      //               và route "*" → <NotFoundPage /> (trang 404)
    ],
  },
]

export const router = createBrowserRouter(routes)
