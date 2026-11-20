import { useForm } from 'react-hook-form'
import { Button } from '../../../shared/ui/Button'
import { FormField, inputClass } from '../../../shared/ui/FormField'
import type { Club } from '../../clubs/model/club'
import type { EventFormInput, EventFormValues } from '../model/event-form.schema'

type EventFormProps = {
  clubs: Club[]
  defaultValues?: EventFormInput
  submitLabel: string
  lockClub?: boolean // PUT không đổi được CLB → khoá ô CLB khi sửa
  onSubmit: (values: EventFormValues) => Promise<unknown>
}

const emptyValues: EventFormInput = {
  title: '',
  description: '',
  clubId: '',
  location: '',
  startAt: '',
  capacity: Number.NaN,
}

export function EventForm({ clubs, defaultValues = emptyValues, submitLabel, lockClub = false, onSubmit }: EventFormProps) {
  // 3 generic: kiểu nhập (input), context, kiểu sau khi Zod kiểm tra (output)
  // TODO(ch5-T6): thêm resolver: zodResolver(eventFormSchema) (import từ '@hookform/resolvers/zod')
  //   để Zod kiểm tra form và đổi startAt (chuỗi) → Date trước khi gọi onSubmit.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormInput, unknown, EventFormValues>({
    defaultValues,
  })

  const submit = handleSubmit(async (values) => {
    // TODO(ch5-T6): bọc try/catch. Lỗi server → applyServerErrors(error, setError, eventFormFieldFromDto)
    //   (400 → lỗi hiện dưới đúng ô, vd. "name" của server là ô "title"; 409 → toast; lỗi khác → errors.root.server)
    // Test: EventForm.test.tsx
    await onSubmit(values)
  })

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-lg border border-line bg-surface p-6 shadow-md sm:p-8">
      {errors.root?.server && (
        <p role="alert" className="rounded-sm bg-warning-soft px-4 py-3 font-semibold text-danger">
          {errors.root.server.message}
        </p>
      )}
      <FormField id="title" label="Tên sự kiện" error={errors.title?.message}>
        <input id="title" {...register('title')} aria-invalid={Boolean(errors.title)} aria-describedby="title-msg" className={inputClass} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="clubId" label="Câu lạc bộ" error={errors.clubId?.message}>
          <select
            id="clubId"
            {...register('clubId')}
            disabled={lockClub}
            aria-invalid={Boolean(errors.clubId)}
            aria-describedby="clubId-msg"
            className={inputClass}
          >
            <option value="">— Chọn CLB —</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField id="location" label="Địa điểm" error={errors.location?.message}>
          <input id="location" {...register('location')} aria-invalid={Boolean(errors.location)} aria-describedby="location-msg" className={inputClass} />
        </FormField>
        <FormField id="startAt" label="Thời gian bắt đầu" error={errors.startAt?.message}>
          <input
            id="startAt"
            type="datetime-local"
            {...register('startAt')}
            aria-invalid={Boolean(errors.startAt)}
            aria-describedby="startAt-msg"
            className={inputClass}
          />
        </FormField>
        <FormField id="capacity" label="Sức chứa" error={errors.capacity?.message}>
          <input
            id="capacity"
            type="number"
            min={1}
            {...register('capacity', { valueAsNumber: true })}
            aria-invalid={Boolean(errors.capacity)}
            aria-describedby="capacity-msg"
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField id="description" label="Mô tả" required={false} error={errors.description?.message}>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          aria-invalid={Boolean(errors.description)}
          aria-describedby="description-msg"
          className={inputClass}
        />
      </FormField>
      <Button type="submit" disabled={isSubmitting} className="justify-self-start">
        {isSubmitting ? 'Đang lưu…' : submitLabel}
      </Button>
    </form>
  )
}
