'use client'

import { useActionState } from 'react'
import { FormField, inputClass } from '../../../shared/ui/FormField'
import { buttonClass } from '../../../shared/ui/button-styles'
import type { Club } from '../../clubs/model/club'
import { createEventAction, type EventFormState } from '../actions'

const initialState: EventFormState = {}

// Form gửi thẳng vào Server Action. Không cần axios, không cần API route riêng:
// useActionState giữ kết quả trả về (lỗi theo ô) và trạng thái đang gửi.
export function EventForm({ clubs }: { clubs: Club[] }) {
  const [state, formAction, isPending] = useActionState(createEventAction, initialState)
  const errors = state.fieldErrors ?? {}
  const values = state.values ?? {}

  const field = (name: keyof typeof errors) => ({
    id: name,
    name,
    defaultValue: values[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': `${name}-msg`,
    className: inputClass,
  })

  return (
    <form action={formAction} noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
      {state.message && (
        <p role="alert" className="rounded-sm bg-warning-soft px-4 py-3 font-semibold text-danger">
          {state.message}
        </p>
      )}
      <FormField id="title" label="Tên sự kiện" error={errors.title}>
        <input {...field('title')} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="clubId" label="Câu lạc bộ" error={errors.clubId}>
          <select {...field('clubId')} defaultValue={values.clubId ?? ''}>
            <option value="">— Chọn CLB —</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="location" label="Địa điểm" error={errors.location}>
          <input {...field('location')} />
        </FormField>
        <FormField id="startAt" label="Thời gian bắt đầu" hint="Giờ Việt Nam" error={errors.startAt}>
          <input type="datetime-local" {...field('startAt')} />
        </FormField>
        <FormField id="capacity" label="Sức chứa" error={errors.capacity}>
          <input type="number" min={1} {...field('capacity')} />
        </FormField>
      </div>
      <FormField id="description" label="Mô tả" required={false} error={errors.description}>
        <textarea rows={4} {...field('description')} />
      </FormField>
      <button type="submit" disabled={isPending} className={buttonClass('primary', 'justify-self-start')}>
        {isPending ? 'Đang lưu…' : 'Tạo sự kiện'}
      </button>
    </form>
  )
}
