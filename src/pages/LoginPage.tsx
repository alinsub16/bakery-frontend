import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wheat } from 'lucide-react'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'
import type { LoginResponse } from '@/types/auth'
import { isAxiosError } from 'axios'

import { Button } from '@/components/ui/Button'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const { data } = await apiClient.post<LoginResponse>('/login', { email, password })
      setAuth(data.token, data.user)
      navigate('/', { replace: true })
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        setError(err.response.data.errors?.email?.[0] ?? 'Invalid credentials.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-terracotta px-12 py-12 text-white lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Wheat size={18} />
          </div>
          <span className="font-display text-lg font-semibold">Breadline</span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight">
            Every loaf,
            <br />
            accounted for.
          </h1>
          <p className="mt-4 max-w-sm text-white/80">
            Track production, closing stock, and sales in one place — from
            opening balance to the last crumb sold.
          </p>
        </div>

        <p className="text-sm text-white/60">Bakery Management System</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center bg-[#FDFBF3] px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta text-white">
                <Wheat size={18} />
              </div>
              <span className="font-display text-lg font-semibold text-ink">Breadline</span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-semibold text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-muted">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">Email</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="you@bakery.test"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
                {error}
              </div>
            )}

            <Button type="submit" isLoading={isSubmitting} className="w-full">
             Sign in
            </Button>
          </form>   
        </div>
      </div>
    </div>
  )
}