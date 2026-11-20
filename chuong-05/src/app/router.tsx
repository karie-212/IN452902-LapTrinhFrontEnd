import { createBrowserRouter, type RouteObject } from 'react-router'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute'
import { AdminEventCreatePage } from '../pages/admin/AdminEventCreatePage'
import { AdminEventEditPage } from '../pages/admin/AdminEventEditPage'
import { AdminEventsPage } from '../pages/admin/AdminEventsPage'
import { AdminRegistrationsPage } from '../pages/admin/AdminRegistrationsPage'
import { ClubsPage } from '../pages/ClubsPage'
import { EventDetailPage } from '../pages/EventDetailPage'
import { EventsPage } from '../pages/EventsPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { MyEventsPage } from '../pages/MyEventsPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RegisterPage } from '../pages/RegisterPage'
import { RootLayout } from './RootLayout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:eventId', element: <EventDetailPage /> },
      { path: 'clubs', element: <ClubsPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        // Route "không có path": chỉ bọc ProtectedRoute quanh các route con
        element: <ProtectedRoute />,
        children: [{ path: 'my-events', element: <MyEventsPage /> }],
      },
      {
        element: <ProtectedRoute role="Admin" />,
        children: [
          { path: 'admin/events', element: <AdminEventsPage /> },
          { path: 'admin/events/new', element: <AdminEventCreatePage /> },
          { path: 'admin/events/:eventId/edit', element: <AdminEventEditPage /> },
          { path: 'admin/events/:eventId/registrations', element: <AdminRegistrationsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export function createRouter() {
  return createBrowserRouter(routes)
}
