import { useState } from 'react'
import { isAxiosError } from 'axios'
import { CheckCircle2, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useBreads } from '@/features/breads/hooks'
import { useOpeningStock, useSubmitInventory } from '../hooks'
import { formatCurrency } from '@/lib/format'

export function QuickCloseForm() {
  const [breadId, setBreadId] = useState('')
  const [closingStock, setClosingStock] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [justClosed, setJustClosed] = useState<string | null>(null)

  const { data: breadsData } = useBreads({ is_active: true })
  const selectedBread = breadsData?.data.find((b) => b.id === Number(breadId))

  const { data: openingStockData, isLoading: isLoadingOpening } = useOpeningStock(
    breadId ? Number(breadId) : null
  )
  const submitMutation = useSubmitInventory()

  const openingStock = openingStockData?.opening_stock ?? null
  const closingNum = Number(closingStock)
  const canPreview = openingStock !== null && closingStock !== '' && closingNum >= 0 && closingNum <= openingStock
  const previewSold = canPreview ? openingStock! - closingNum : null
  const previewRevenue = previewSold !== null && selectedBread ? previewSold * selectedBread.selling_price : null

  function handleBreadChange(id: string) {
    setBreadId(id)
    setClosingStock('')
    setError(null)
    setJustClosed(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setJustClosed(null)

    try {
      await submitMutation.mutateAsync({
        bread_id: Number(breadId),
        closing_stock: Number(closingStock),
      })
      setJustClosed(selectedBread?.name ?? 'Bread')
      setBreadId('')
      setClosingStock('')
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setError('Closing inventory for this bread has already been recorded today.')
      } else if (isAxiosError(err) && err.response?.status === 422) {
        setError(err.response.data.message ?? 'Please check the closing stock value.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <Card title="Close today's inventory">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Select
            id="bread_id"
            label="Bread"
            value={breadId}
            onChange={(e) => handleBreadChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a bread…
            </option>
            {breadsData?.data.map((bread) => (
              <option key={bread.id} value={bread.id}>
                {bread.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="w-full sm:w-40">
          <Input
            id="closing_stock"
            label="Closing stock"
            type="number"
            min="0"
            value={closingStock}
            onChange={(e) => setClosingStock(e.target.value)}
            placeholder="0"
            disabled={!breadId}
            required
          />
        </div>

        <Button type="submit" isLoading={submitMutation.isPending} disabled={!breadId}>
          Close inventory
        </Button>
      </form>

      {breadId && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Info size={13} />
          {isLoadingOpening ? (
            'Loading opening stock…'
          ) : (
            <span>
              Opening stock today: <span className="font-semibold text-ink">{openingStock}</span>
            </span>
          )}
        </div>
      )}

      {previewSold !== null && previewRevenue !== null && (
        <div className="mt-2 flex gap-4 rounded-xl bg-cream/30 px-3.5 py-2.5 text-sm">
          <span className="text-muted">
            Will sell: <span className="font-semibold text-ink">{previewSold}</span>
          </span>
          <span className="text-muted">
            Revenue: <span className="font-semibold text-ink">{formatCurrency(previewRevenue)}</span>
          </span>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      {justClosed && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 size={16} />
          Closed {justClosed} for today.
        </p>
      )}
    </Card>
  )
}