const variants = {
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  secondary: 'border-2 border-primary text-primary hover:bg-surface-muted',
  ghost: 'text-primary underline underline-offset-4 hover:bg-surface-muted',
}

export type ButtonVariant = keyof typeof variants

// Dùng chung cho <button> và <Link> trông như nút
export function buttonClass(variant: ButtonVariant = 'primary', className = '') {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`
}
