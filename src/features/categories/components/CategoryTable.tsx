import { Pencil, Power } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useToggleCategoryStatus } from '../hooks'
import type { Category } from '@/types/category'

interface CategoryTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
}

export function CategoryTable({ categories, onEdit }: CategoryTableProps) {
  const toggleStatus = useToggleCategoryStatus()

  if (categories.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No categories found.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Description</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="py-3 font-medium text-ink">{category.name}</td>
              <td className="max-w-xs truncate py-3 text-muted">{category.description || '—'}</td>
              <td className="py-3">
                <Badge variant={category.is_active ? 'success' : 'muted'}>
                  {category.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="py-3">
                <div className="flex justify-end gap-1">
                  <Button size="sm" variant="ghost" icon={<Pencil size={14} />} onClick={() => onEdit(category)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<Power size={14} />}
                    isLoading={toggleStatus.isPending && toggleStatus.variables?.id === category.id}
                    onClick={() =>
                      toggleStatus.mutate({ id: category.id, activate: !category.is_active })
                    }
                    className={category.is_active ? 'hover:text-danger' : 'hover:text-success'}
                  >
                    {category.is_active ? 'Deactivate' : 'Activate'}
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