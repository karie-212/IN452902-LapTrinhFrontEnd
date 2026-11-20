import { setupServer } from 'msw/node'

// Không có handler mặc định: mỗi test tự khai báo đúng request nó cần
export const server = setupServer()
