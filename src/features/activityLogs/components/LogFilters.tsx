interface LogFiltersProps {
  subjectType: string
  onSubjectTypeChange: (value: string) => void
  from: string
  to: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
}

const SUBJECT_TYPES = [
  { value: '', label: 'All types' },
  { value: 'DailyProduction', label: 'Production' },
  { value: 'DailyInventory', label: 'Inventory' },
]

export function LogFilters({ subjectType, onSubjectTypeChange, from, to, onFromChange, onToChange }: LogFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-xs font-medium text-muted">Type</label>
        <select
          value={subjectType}
          onChange={(e) => onSubjectTypeChange(e.target.value)}
          className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        >
          {SUBJECT_TYPES.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted">From</label>
        <input
          type="date"
          value={from}
          max={to}
          onChange={(e) => onFromChange(e.target.value)}
          className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className="mt-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
        />
      </div>
    </div>
  )
}