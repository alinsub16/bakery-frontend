import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'

export function useRole() {
  const role = useAuthStore((state) => state.user?.role)

  function hasAnyRole(allowed: UserRole[]): boolean {
    return Boolean(role && allowed.includes(role))
  }

  return { role, hasAnyRole }
}