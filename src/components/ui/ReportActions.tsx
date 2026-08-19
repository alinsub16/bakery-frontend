import { Download, Printer } from 'lucide-react'
import { Button } from './Button'

interface ReportActionsProps {
  onExportCsv: () => void
  csvDisabled?: boolean
}

export function ReportActions({ onExportCsv, csvDisabled }: ReportActionsProps) {
  function handlePrint() {
    window.print()
  }

  return (
    <div className="no-print flex gap-2">
      <Button size="sm" variant="secondary" icon={<Download size={14} />} onClick={onExportCsv} disabled={csvDisabled}>
        Export CSV
      </Button>
      <Button size="sm" variant="secondary" icon={<Printer size={14} />} onClick={handlePrint}>
        Print / Save PDF
      </Button>
    </div>
  )
}