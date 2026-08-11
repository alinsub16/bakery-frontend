import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useOpeningBalance, useSetOpeningBalance } from '../hooks'
import type { Bread } from '@/types/bread'

interface OpeningBalanceModalProps {
  isOpen: boolean
  onClose: () => void
  bread: Bread | null
}

export function OpeningBalanceModal({ isOpen, onClose, bread }: OpeningBalanceModalProps) {
  const [quantity, setQuantity] = useState('')
  const [note, setNote] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const { data: balance, isLoading, isError, error } = useOpeningBalance(isOpen ? bread?.id ?? null : null)
  const setMutation = useSetOpeningBalance()

  // A 404 here just means "no balance set yet" — that's the normal case
  // for most breads, not a failure state.
  const notFound = isAxiosError(error) && error.response?.status === 404
  const hasBalance = Boolean(balance) && !notFound

  useEffect(() => {
    if (isOpen) {
      setQuantity('')
      setNote('')
      setFormError(null)
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!bread) return
    setFormError(null)

    try {
      await setMutation.mutateAsync({
        breadId: bread.id,
        values: { quantity: Number(quantity), note },
      })
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setFormError(err.response.data.message)
      } else if (isAxiosError(err) && err.response?.status === 422) {
        const apiErrors = err.response.data.errors as Record<string, string[]> | undefined
        setFormError(apiErrors?.note?.[0] ?? apiErrors?.quantity?.[0] ?? 'Please check your input.')
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    }
  }

  if (!bread) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Opening balance — ${bread.name}`}>
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-2/3 rounded bg-cream/50" />
          <div className="h-4 w-1/2 rounded bg-cream/50" />
        </div>
      ) : hasBalance && balance ? (
        <ExistingBalanceView balance={balance} />
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">
            No opening balance recorded for this bread yet. This is a{' '}
            <span className="font-medium text-ink">one-time</span> entry — use it only if this bread
            already had physical stock before being tracked in this system.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="quantity"
              label="Starting quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 15"
              autoFocus
              required
            />
            <Textarea
              id="note"
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why is this being set? e.g. Physical count during system migration, Aug 4 2026"
              rows={3}
              required
            />

            {formError && (
              <div className="rounded-xl bg-danger/10 px-3.5 py-2.5 text-sm text-danger">{formError}</div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={setMutation.isPending}>
                Set opening balance
              </Button>
            </div>
          </form>
        </>
      )}
    </Modal>
  )
}

function ExistingBalanceView({ balance }: { balance: NonNullable<ReturnType<typeof useOpeningBalance>['data']> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3.5 py-2.5 text-sm text-success">
        <CheckCircle2 size={16} />
        Opening balance already recorded — this can't be changed.
      </div>

      <div className="space-y-3 rounded-xl border border-border p-4 text-sm">
        <Row label="Quantity" value={balance.quantity.toString()} />
        <Row label="Note" value={balance.note} />
        <Row label="Set by" value={balance.set_by.name} />
        <Row
          label="Date"
          value={new Date(balance.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        />
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  )
}