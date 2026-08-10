import { Power } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/authStore'
import { useActivateUser, useDeactivateUser, useRoles, useUpdateUserRole } from '../hooks'
import type { ActiveUser } from '@/types/user'

interface ActiveUsersTableProps {
  users: ActiveUser[]
}

export function ActiveUsersTable({ users }: ActiveUsersTableProps) {
  const currentUserId = useAuthStore((state) => state.user?.id)
  const { data: roles } = useRoles()
  const updateRole = useUpdateUserRole()
  const deactivate = useDeactivateUser()
  const activate = useActivateUser()

  if (users.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No active users.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => {
            const isSelf = user.id === currentUserId

            return (
              <tr key={user.id}>
                <td className="py-3 font-medium text-ink">{user.name}</td>
                <td className="py-3 text-muted">{user.email}</td>
                <td className="py-3">
                  <select
                    value={user.role ?? ''}
                    disabled={isSelf || updateRole.isPending}
                    onChange={(e) => updateRole.mutate({ id: user.id, role: e.target.value })}
                    className="rounded-lg border border-border px-2.5 py-1.5 text-xs capitalize outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {roles?.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3">
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Power size={14} />}
                      disabled={isSelf}
                      isLoading={
                        (deactivate.isPending && deactivate.variables === user.id) ||
                        (activate.isPending && activate.variables === user.id)
                      }
                      onClick={() => deactivate.mutate(user.id)}
                      className="hover:text-danger"
                      title={isSelf ? "You can't deactivate your own account" : undefined}
                    >
                      Deactivate
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}