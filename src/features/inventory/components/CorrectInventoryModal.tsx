import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCorrectInventory } from '../hooks'
import type { InventoryEntry } from '@/types/inventory'

interface CorrectInventoryModalProps {
  isOpen: boolean
  onClose: () => void
  entry: InventoryEntry | null
}

export function CorrectInventoryModal({ isOpen, onClose, entry }: CorrectInventoryModalProps) {
  const [closingStock, setClosingStock] = useState('')
  const [error, setError] = useState<string | null>(null)

  const correctMutation = useCorrectInventory()

  useEffect(() => {
    if (isOpen && entry) {
      setClosingStock(String(entry.closing_stock))
      setError(null)
    }
  }, [isOpen, entry])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!entry) return
    setError(null)

    try {
      await correctMutation.mutateAsync({
        id: entry.id,
        values: { closing_stock: Number(closingStock) },
      })
      onClose()
    } catch (err) {
      if (isAxiosError(err) && (err.response?.status === 403 || err.response?.status === 422)) {
        setError(err.response.data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  if (!entry) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Correct closing stock — ${entry.bread.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm text-muted">
          <p>
            Opening stock: <span className="font-medium text-ink">{entry.opening_stock}</span>
          </p>
          <p>
            Originally closed: <span className="font-medium text-ink">{entry.closing_stock}</span>
          </p>
        </div>

        <Input
          id="closing_stock"
          label="Corrected closing stock"
          type="number"
          min="0"
          max={entry.opening_stock}
          value={closingStock}
          onChange={(e) => setClosingStock(e.target.value)}
          autoFocus
        />

        {error && (
          <div className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{error}</div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={correctMutation.isPending}>
            Save correction
          </Button>
        </div>
      </form>
    </Modal>
  )
}