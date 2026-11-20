import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AppProviders } from './app/AppProviders'
import { setupHttp } from './app/http-setup'
import { createQueryClient } from './app/query-client'
import { createRouter } from './app/router'
import './index.css'

setupHttp()
const queryClient = createQueryClient()
const router = createRouter()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
