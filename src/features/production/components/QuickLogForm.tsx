import { useState } from 'react'
import { isAxiosError } from 'axios'
import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useBreads } from '@/features/breads/hooks'
import { useSubmitProduction } from '../hooks'

export function QuickLogForm() {
  const [breadId, setBreadId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [justLogged, setJustLogged] = useState<string | null>(null)

  const { data: breadsData } = useBreads({ is_active: true })
  const submitMutation = useSubmitProduction()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setJustLogged(null)

    try {
      const bread = breadsData?.data.find((b) => b.id === Number(breadId))
      await submitMutation.mutateAsync({
        bread_id: Number(breadId),
        quantity_produced: Number(quantity),
      })
      setJustLogged(bread?.name ?? 'Bread')
      setBreadId('')
      setQuantity('')
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 409) {
        setError('Production for this bread has already been recorded today.')
      } else if (isAxiosError(err) && err.response?.status === 422) {
        const firstError = Object.values(err.response.data.errors ?? {})[0] as string[] | undefined
        setError(firstError?.[0] ?? 'Please check your input.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <Card title="Log today's production">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Select
            id="bread_id"
            label="Bread"
            value={breadId}
            onChange={(e) => setBreadId(e.target.value)}
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
            id="quantity"
            label="Quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="50"
            required
          />
        </div>

        <Button type="submit" isLoading={submitMutation.isPending} className="sm:mb-0">
          Log production
        </Button>
      </form>

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      {justLogged && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 size={16} />
          Logged {justLogged} for today.
        </p>
      )}
    </Card>
  )
}