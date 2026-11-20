// MSW 3: setupServer ở 'msw/node', còn http/HttpResponse ở 'msw/http'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
