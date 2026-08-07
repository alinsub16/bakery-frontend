import type { ReactNode } from 'react'
import { useRole } from '@/hooks/useRole'
import type { UserRole } from '@/types/auth'

interface RoleGateProps {
  allowedRoles: UserRole[]
  children: ReactNode
}

/**
 * Client-side visibility only — the API independently enforces the same
 * roles via middleware, so this is a UX improvement (don't show controls
 * that will just 403), not the actual security boundary.
 */
export function RoleGate({ allowedRoles, children }: RoleGateProps) {
  const { hasAnyRole } = useRole()

  if (!hasAnyRole(allowedRoles)) return null

  return <>{children}</>
}