import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useApproveUser, useRejectUser, useRoles } from '../hooks'
import type { PendingUser } from '@/types/user'

interface PendingUsersTableProps {
  users: PendingUser[]
}

export function PendingUsersTable({ users }: PendingUsersTableProps) {
  const { data: roles } = useRoles()
  const [selectedRoles, setSelectedRoles] = useState<Record<number, string>>({})
  const approve = useApproveUser()
  const reject = useRejectUser()

  if (users.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No pending registrations — all caught up.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Email</th>
            <th className="pb-3 font-medium">Registered</th>
            <th className="pb-3 font-medium">Assign role</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => {
            const selectedRole = selectedRoles[user.id] ?? ''

            return (
              <tr key={user.id}>
                <td className="py-3 font-medium text-ink">{user.name}</td>
                <td className="py-3 text-muted">{user.email}</td>
                <td className="py-3 text-muted">
                  {new Date(user.registered_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td className="py-3">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRoles((prev) => ({ ...prev, [user.id]: e.target.value }))}
                    className="rounded-lg border border-border px-2.5 py-1.5 text-xs capitalize outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  >
                    <option value="" disabled>Select…</option>
                    {roles?.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Check size={14} />}
                      disabled={!selectedRole}
                      isLoading={approve.isPending && approve.variables?.id === user.id}
                      onClick={() => approve.mutate({ id: user.id, role: selectedRole })}
                      className="hover:text-success"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<X size={14} />}
                      isLoading={reject.isPending && reject.variables === user.id}
                      onClick={() => reject.mutate(user.id)}
                      className="hover:text-danger"
                    >
                      Reject
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