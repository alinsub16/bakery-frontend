import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCorrectProduction } from '../hooks'
import type { ProductionEntry } from '@/types/production'

interface CorrectProductionModalProps {
  isOpen: boolean
  onClose: () => void
  entry: ProductionEntry | null
}

export function CorrectProductionModal({ isOpen, onClose, entry }: CorrectProductionModalProps) {
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState<string | null>(null)

  const correctMutation = useCorrectProduction()

  useEffect(() => {
    if (isOpen && entry) {
      setQuantity(String(entry.quantity_produced))
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
        values: { quantity_produced: Number(quantity) },
      })
      onClose()
    } catch (err) {
      if (isAxiosError(err) && (err.response?.status === 403 || err.response?.status === 409)) {
        setError(err.response.data.message)
      } else if (isAxiosError(err) && err.response?.status === 422) {
        setError('Please enter a valid quantity.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  if (!entry) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Correct production — ${entry.bread.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-muted">
          Originally logged: <span className="font-medium text-ink">{entry.quantity_produced}</span> by{' '}
          {entry.produced_by.name}
        </p>

        <Input
          id="quantity_produced"
          label="Corrected quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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