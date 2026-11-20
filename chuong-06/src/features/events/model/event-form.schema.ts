import { z } from 'zod'

// Schema của form tạo/sửa sự kiện (phía trình duyệt)
export const eventFormSchema = z.object({
  title: z.string().trim().min(1, { error: 'Nhập tên sự kiện.' }).max(200, { error: 'Tối đa 200 ký tự.' }),
  description: z.string().trim().max(2000, { error: 'Tối đa 2000 ký tự.' }),
  clubId: z.string().min(1, { error: 'Chọn câu lạc bộ tổ chức.' }),
  location: z.string().trim().min(1, { error: 'Nhập địa điểm.' }),
  // <input type="datetime-local"> trả chuỗi "2026-12-24T19:00" (giờ máy) → đổi thành Date
  startAt: z
    .string()
    .min(1, { error: 'Chọn thời gian bắt đầu.' })
    .transform((value) => new Date(value)),
  // register('capacity', { valueAsNumber: true }) → ô trống cho NaN, z.int() báo lỗi
  capacity: z.int({ error: 'Nhập sức chứa là số nguyên.' }).positive({ error: 'Sức chứa phải lớn hơn 0.' }),
})

export type EventFormInput = z.input<typeof eventFormSchema> // giá trị trong form
export type EventFormValues = z.output<typeof eventFormSchema> // giá trị sau khi Zod kiểm tra
