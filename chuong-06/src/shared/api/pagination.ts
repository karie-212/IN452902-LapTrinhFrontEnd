import { z } from 'zod'

// Dạng phân trang chung của EduHub API: Paged<T> = { items, totalCount, page, pageSize }
export type Paged<T> = {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
}

// Schema "nhà máy": truyền schema của phần tử, nhận về schema của cả trang
export function pagedSchema<T extends z.ZodType>(item: T) {
  return z.object({
    items: z.array(item),
    totalCount: z.int().nonnegative(),
    page: z.int().positive(),
    pageSize: z.int().positive(),
  })
}

export function totalPages(paged: Pick<Paged<unknown>, 'totalCount' | 'pageSize'>): number {
  return Math.max(1, Math.ceil(paged.totalCount / paged.pageSize))
}
