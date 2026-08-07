import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { RoleGate } from '@/components/ui/RoleGate'
import { useBreads } from './hooks'
import { useCategories } from '@/features/categories/hooks'
import { BreadTable } from './components/BreadTable'
import { BreadFormModal } from './components/BreadFormModal'
import type { Bread } from '@/types/bread'

type StatusFilter = 'all' | 'active' | 'inactive'

export function BreadsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBread, setEditingBread] = useState<Bread | null>(null)

  const { data: categoriesData } = useCategories({ is_active: true })
  const { data, isLoading, isError } = useBreads({
    search: search || undefined,
    category_id: categoryFilter ? Number(categoryFilter) : undefined,
    is_active: statusFilter === 'all' ? undefined : statusFilter === 'active',
  })

  function openCreateModal() {
    setEditingBread(null)
    setIsModalOpen(true)
  }

  function openEditModal(bread: Bread) {
    setEditingBread(bread)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Breads</h1>
          <p className="mt-1 text-sm text-muted">Manage your product catalog and pricing.</p>
        </div>
        <RoleGate allowedRoles={['admin', 'manager']}>
          <Button icon={<Plus size={16} />} onClick={openCreateModal}>
            New bread
          </Button>
        </RoleGate>
      </div>

      <Card padding="md">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-56">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search breads…"
                className="w-full rounded-xl border border-border py-2 pl-9 pr-3 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            >
              <option value="">All categories</option>
              {categoriesData?.data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-1 rounded-xl bg-cream/40 p-1">
            {(['all', 'active', 'inactive'] as const).map((option) => (
              <button
                key={option}
                onClick={() => setStatusFilter(option)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                  statusFilter === option ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <p className="py-12 text-center text-sm text-danger">Couldn't load breads. Try refreshing.</p>
        ) : (
          <BreadTable breads={data?.data ?? []} onEdit={openEditModal} />
        )}
      </Card>

      <BreadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bread={editingBread} />
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