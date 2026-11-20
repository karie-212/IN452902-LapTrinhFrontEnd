import { z } from 'zod'

// Schema của FORM (khác DTO): kiểm tra phía trình duyệt trước khi gửi
export const loginSchema = z.object({
  email: z.email({ error: 'Email chưa đúng định dạng.' }),
  password: z.string().min(1, { error: 'Nhập mật khẩu.' }),
})

export const registerSchema = z
  .object({
    studentId: z.string().regex(/^\d{10}$/, { error: 'MSSV gồm đúng 10 chữ số.' }),
    name: z.string().trim().min(2, { error: 'Họ tên cần ít nhất 2 ký tự.' }),
    email: z.email({ error: 'Email chưa đúng định dạng.' }),
    password: z.string().min(8, { error: 'Mật khẩu tối thiểu 8 ký tự.' }),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    error: 'Mật khẩu nhập lại không khớp.',
    path: ['confirmPassword'],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
