'use client'

import { useTransition } from 'react'
import { errorMessage } from '../../../shared/api/api-error'
import { buttonClass } from '../../../shared/ui/button-styles'
import { toast } from '../../../shared/ui/toast'
import { deleteEventAction } from '../actions'

export function DeleteEventButton({ eventId, title }: { eventId: string; title: string }) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      type="button"
      disabled={isPending}
      className={buttonClass('ghost')}
      onClick={() => {
        if (!window.confirm(`Xoá sự kiện "${title}"? Mọi đăng ký của sự kiện cũng bị xoá.`)) return
        startTransition(async () => {
          try {
            await deleteEventAction(eventId) // gọi Server Action như một hàm async
            toast('Đã xoá sự kiện.', 'success')
          } catch (error) {
            toast(errorMessage(error), 'error')
          }
        })
      }}
    >
      {isPending ? 'Đang xoá…' : 'Xoá'}
    </button>
  )
}
