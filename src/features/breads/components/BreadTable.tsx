import { Pencil, Power } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RoleGate } from '@/components/ui/RoleGate'
import { formatCurrency } from '@/lib/format'
import { useToggleBreadStatus } from '../hooks'
import type { Bread } from '@/types/bread'

interface BreadTableProps {
  breads: Bread[]
  onEdit: (bread: Bread) => void
}

export function BreadTable({ breads, onEdit }: BreadTableProps) {
  const toggleStatus = useToggleBreadStatus()

  if (breads.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No breads found.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">SKU</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Price</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {breads.map((bread) => (
            <tr key={bread.id}>
              <td className="py-3 font-medium text-ink">{bread.name}</td>
              <td className="py-3 text-muted">{bread.sku}</td>
              <td className="py-3 text-muted">{bread.category.name}</td>
              <td className="py-3 text-ink">{formatCurrency(bread.selling_price)}</td>
              <td className="py-3">
                <Badge variant={bread.is_active ? 'success' : 'muted'}>
                  {bread.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="py-3">
                <RoleGate allowedRoles={['admin', 'manager']}>
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost" icon={<Pencil size={14} />} onClick={() => onEdit(bread)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Power size={14} />}
                      isLoading={toggleStatus.isPending && toggleStatus.variables?.id === bread.id}
                      onClick={() => toggleStatus.mutate({ id: bread.id, activate: !bread.is_active })}
                      className={bread.is_active ? 'hover:text-danger' : 'hover:text-success'}
                    >
                      {bread.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </RoleGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}