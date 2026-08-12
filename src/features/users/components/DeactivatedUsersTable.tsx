import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useActivateUser } from '../hooks'
import type { DeactivatedUser } from '@/types/user'

interface DeactivatedUsersTableProps {
  users: DeactivatedUser[]
}

export function DeactivatedUsersTable({ users }: DeactivatedUsersTableProps) {
  const activate = useActivateUser()

  if (users.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No deactivated users.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Last role</th>
            <th className="pb-3 font-medium">Deactivated</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-3 font-medium text-ink">{user.name}</td>
              <td className="py-3 text-muted">{user.email}</td>
              <td className="py-3 capitalize text-muted">{user.role?.replace('_', ' ') ?? '—'}</td>
              <td className="py-3 text-muted">
                {new Date(user.deactivated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="py-3">
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<RotateCcw size={14} />}
                    isLoading={activate.isPending && activate.variables === user.id}
                    onClick={() => activate.mutate(user.id)}
                    className="hover:text-success"
                  >
                    Reactivate
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}