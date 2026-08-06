import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCreateCategory, useUpdateCategory } from '../hooks'
import type { Category } from '@/types/category'

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null // present = edit mode
}

export function CategoryFormModal({ isOpen, onClose, category }: CategoryFormModalProps) {
  const isEditMode = Boolean(category)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const isSubmitting = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (isOpen) {
      setName(category?.name ?? '')
      setDescription(category?.description ?? '')
      setErrors({})
    }
  }, [isOpen, category])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    try {
      if (isEditMode && category) {
        await updateMutation.mutateAsync({ id: category.id, values: { name, description } })
      } else {
        await createMutation.mutateAsync({ name, description })
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Category' : 'New Category'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="e.g. Wheat Loaves"
          autoFocus
        />
        <Textarea
          id="description"
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          rows={3}
          placeholder="What kind of breads belong here?"
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {isEditMode ? 'Save changes' : 'Create category'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}