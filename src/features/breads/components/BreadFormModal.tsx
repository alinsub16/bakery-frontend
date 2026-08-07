import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useCategories } from '@/features/categories/hooks'
import { useCreateBread, useUpdateBread } from '../hooks'
import type { Bread } from '@/types/bread'

interface BreadFormModalProps {
  isOpen: boolean
  onClose: () => void
  bread?: Bread | null
}

const emptyForm = {
  category_id: '',
  name: '',
  sku: '',
  unit: 'pcs',
  selling_price: '',
  cost_price: '',
}

export function BreadFormModal({ isOpen, onClose, bread }: BreadFormModalProps) {
  const isEditMode = Boolean(bread)

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: categoriesData } = useCategories({ is_active: true })
  const createMutation = useCreateBread()
  const updateMutation = useUpdateBread()
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (isOpen) {
      setForm(
        bread
          ? {
              category_id: String(bread.category.id),
              name: bread.name,
              sku: bread.sku,
              unit: bread.unit,
              selling_price: String(bread.selling_price),
              cost_price: bread.cost_price !== null ? String(bread.cost_price) : '',
            }
          : emptyForm
      )
      setErrors({})
    }
  }, [isOpen, bread])

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const values = {
      category_id: Number(form.category_id),
      name: form.name,
      sku: form.sku,
      unit: form.unit || 'pcs',
      selling_price: Number(form.selling_price),
      cost_price: form.cost_price === '' ? null : Number(form.cost_price),
    }

    try {
      if (isEditMode && bread) {
        await updateMutation.mutateAsync({ id: bread.id, values })
      } else {
        await createMutation.mutateAsync(values)
      }
      onClose()
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const apiErrors = err.response.data.errors as Record<string, string[]>
        setErrors(Object.fromEntries(Object.entries(apiErrors).map(([k, v]) => [k, v[0]])))
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Bread' : 'New Bread'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          id="category_id"
          label="Category"
          value={form.category_id}
          onChange={(e) => update('category_id', e.target.value)}
          error={errors.category_id}
        >
          <option value="" disabled>
            Select a category…
          </option>
          {categoriesData?.data.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>

        <Input
          id="name"
          label="Name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
          placeholder="e.g. White Sandwich Loaf"
          autoFocus
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="sku"
            label="SKU"
            value={form.sku}
            onChange={(e) => update('sku', e.target.value)}
            error={errors.sku}
            placeholder="BRD-001"
          />
          <Input
            id="unit"
            label="Unit"
            value={form.unit}
            onChange={(e) => update('unit', e.target.value)}
            error={errors.unit}
            placeholder="pcs"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="selling_price"
            label="Selling price"
            type="number"
            step="0.01"
            min="0"
            value={form.selling_price}
            onChange={(e) => update('selling_price', e.target.value)}
            error={errors.selling_price}
            placeholder="45.00"
          />
          <Input
            id="cost_price"
            label="Cost price (optional)"
            type="number"
            step="0.01"
            min="0"
            value={form.cost_price}
            onChange={(e) => update('cost_price', e.target.value)}
            error={errors.cost_price}
            placeholder="20.00"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? 'Save changes' : 'Create bread'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}