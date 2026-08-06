import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useCategories } from '@/features/categories/hooks'
import { CategoryTable } from '@/features/categories/components/CategoryTable'
import { CategoryFormModal } from '@/features/categories/components/CategoryFormModal'
import type { Category } from '@/types/category'

type StatusFilter = 'all' | 'active' | 'inactive'

export function CategoriesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const { data, isLoading, isError } = useCategories({
    search: search || undefined,
    is_active: statusFilter === 'all' ? undefined : statusFilter === 'active',
  })

  function openCreateModal() {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  function openEditModal(category: Category) {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Categories</h1>
          <p className="mt-1 text-sm text-muted">Group your breads for easier organization and reporting.</p>
        </div>
        <Button icon={<Plus size={16} />} onClick={openCreateModal}>
          New category
        </Button>
      </div>

      <Card padding="md">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories…"
              className="w-full rounded-xl border border-border py-2 pl-9 pr-3 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
            />
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
          <p className="py-12 text-center text-sm text-danger">Couldn't load categories. Try refreshing.</p>
        ) : (
          <CategoryTable categories={data?.data ?? []} onEdit={openEditModal} />
        )}
      </Card>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />
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