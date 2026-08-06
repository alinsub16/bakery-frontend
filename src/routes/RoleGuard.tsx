import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const role = useAuthStore((state) => state.user?.role)

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}