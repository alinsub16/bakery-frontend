import type { ReactNode } from 'react'
import { Factory, ClipboardCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { PendingBread, ClosingPendingBread } from '@/types/dashboard'

interface PendingListsProps {
  needsProduction: PendingBread[]
  needsClosing: ClosingPendingBread[]
}

export function PendingLists({ needsProduction, needsClosing }: PendingListsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Needs production today">
        {needsProduction.length === 0 ? (
          <EmptyState icon={<Factory size={20} />} text="All active breads have been produced today." />
        ) : (
          <ul className="space-y-2">
            {needsProduction.map((bread) => (
              <li key={bread.id} className="flex items-center justify-between rounded-xl bg-cream/30 px-3 py-2 text-sm">
                <span className="font-medium text-ink">{bread.name}</span>
                <span className="text-xs text-muted">{bread.sku}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Needs closing today">
        {needsClosing.length === 0 ? (
          <EmptyState icon={<ClipboardCheck size={20} />} text="No pending closings — all caught up." />
        ) : (
          <ul className="space-y-2">
            {needsClosing.map((bread) => (
              <li key={bread.id} className="flex items-center justify-between rounded-xl bg-cream/30 px-3 py-2 text-sm">
                <span className="font-medium text-ink">{bread.name}</span>
                <span className="text-xs text-muted">{bread.quantity_produced} produced</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}

function EmptyState({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-8 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
        {icon}
      </div>
      <p className="text-sm text-muted">{text}</p>
    </div>
  )
}