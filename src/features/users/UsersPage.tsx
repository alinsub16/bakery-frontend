import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { useUsers, usePendingUsers } from './hooks'
import { ActiveUsersTable } from './components/ActiveUsersTable'
import { PendingUsersTable } from './components/PendingUsersTable'
import { CreateUserModal } from './components/CreateUserModal'

type UserTab = 'active' | 'pending'

export function UsersPage() {
  const [tab, setTab] = useState<UserTab>('active')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: activeData, isLoading: isLoadingActive, isError: isErrorActive } = useUsers()
  const { data: pendingData, isLoading: isLoadingPending, isError: isErrorPending } = usePendingUsers()

  const pendingCount = pendingData?.data.length ?? 0

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Users</h1>
          <p className="mt-1 text-sm text-muted">Manage staff accounts and review new registrations.</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          New user
        </Button>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { value: 'active', label: 'Active users' },
          { value: 'pending', label: `Pending approvals${pendingCount > 0 ? ` (${pendingCount})` : ''}` },
        ]}
      />

      <Card padding="md">
        {tab === 'active' ? (
          isLoadingActive ? (
            <TableSkeleton />
          ) : isErrorActive ? (
            <p className="py-12 text-center text-sm text-danger">Couldn't load users.</p>
          ) : (
            <ActiveUsersTable users={activeData?.data ?? []} />
          )
        ) : isLoadingPending ? (
          <TableSkeleton />
        ) : isErrorPending ? (
          <p className="py-12 text-center text-sm text-danger">Couldn't load pending registrations.</p>
        ) : (
          <PendingUsersTable users={pendingData?.data ?? []} />
        )}
      </Card>

      <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-cream/40" />
      ))}
    </div>
  )
}