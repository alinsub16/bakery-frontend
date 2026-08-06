import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta text-white hover:bg-terracotta-dark focus-visible:ring-terracotta/30',
  secondary:
    'border border-border bg-white text-ink hover:bg-cream/40 focus-visible:ring-terracotta/20',
  danger:
    'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/30',
  ghost:
    'text-muted hover:bg-cream/50 hover:text-ink focus-visible:ring-terracotta/20',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      disabled,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center rounded-xl font-semibold transition
          focus-visible:outline-none focus-visible:ring-2
          disabled:cursor-not-allowed disabled:opacity-60
          ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          icon
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'