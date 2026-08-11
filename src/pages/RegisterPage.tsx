import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { Wheat, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { registerUser } from '@/features/auth/api'

export function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      setIsSubmitted(true)
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const apiErrors = err.response.data.errors as Record<string, string[]>
        setErrors(Object.fromEntries(Object.entries(apiErrors).map(([k, v]) => [k, v[0]])))
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' })
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
          <span className="font-display text-lg font-semibold">Little Panaderos</span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-semibold leading-tight">
            Join the
            <br />
            team.
          </h1>
          <p className="mt-4 max-w-sm text-white/80">
            Request access to your bakery's inventory system. An admin will
            review and activate your account.
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

          {isSubmitted ? (
            <ConfirmationState email={email} />
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold text-ink">Create an account</h2>
              <p className="mt-1 text-sm text-muted">
                Your account will need admin approval before you can sign in.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <Input
                  id="name"
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  autoFocus
                  required
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="you@bakery.test"
                  required
                />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Min. 8 characters"
                  required
                />
                <Input
                  id="password_confirmation"
                  label="Confirm password"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />

                {errors.form && (
                  <div className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
                    {errors.form}
                  </div>
                )}

                <Button type="submit" isLoading={isSubmitting} className="w-full">
                  Create account
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-terracotta hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ConfirmationState({ email }: { email: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 size={24} />
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold text-ink">Request submitted</h2>
      <p className="mt-2 text-sm text-muted">
        We've received your registration for <span className="font-medium text-ink">{email}</span>.
        An admin will review it before you can sign in.
      </p>
      <Link to="/login">
        <Button variant="secondary" className="mt-6">
          Back to sign in
        </Button>
      </Link>
    </div>
  )
}