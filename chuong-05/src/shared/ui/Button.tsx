import type { ComponentProps } from 'react'
import { Link } from 'react-router'

const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'border-2 border-primary text-primary hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:opacity-90',
  ghost: 'text-primary underline underline-offset-4 hover:bg-surface-muted',
}

export type ButtonVariant = keyof typeof variants

function buttonClass(variant: ButtonVariant, className = '') {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`
}

type ButtonProps = ComponentProps<'button'> & { variant?: ButtonVariant }

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant }

// Link trông như nút (điều hướng thì dùng <a>, hành động thì dùng <button>)
export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />
}
