import { forwardRef } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2
            ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border focus:border-terracotta focus:ring-terracotta/20'}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2
            ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border focus:border-terracotta focus:ring-terracotta/20'}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'