import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { useActivityLogs } from './hooks'
import { LogFilters } from './components/LogFilters'
import { LogTable } from './components/LogTable'
import { formatISODate, subtractDays } from '@/lib/format'

export function ActivityLogsPage() {
  const [subjectType, setSubjectType] = useState('')
  const [from, setFrom] = useState(formatISODate(subtractDays(new Date(), 29)))
  const [to, setTo] = useState(formatISODate(new Date()))
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useActivityLogs({
    subject_type: subjectType || undefined,
    from,
    to,
    page,
  })

  function handleFilterChange(setter: (value: string) => void) {
    return (value: string) => {
      setter(value)
      setPage(1) // reset to page 1 whenever a filter changes
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Activity Logs</h1>
        <p className="mt-1 text-sm text-muted">Every production and inventory correction, permanently recorded.</p>
      </div>

      <LogFilters
        subjectType={subjectType}
        onSubjectTypeChange={handleFilterChange(setSubjectType)}
        from={from}
        to={to}
        onFromChange={handleFilterChange(setFrom)}
        onToChange={handleFilterChange(setTo)}
      />

      <Card padding="md">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <p className="py-12 text-center text-sm text-danger">Couldn't load activity logs.</p>
        ) : (
          <>
            <LogTable entries={data?.data ?? []} />
            {data && (
              <div className="mt-4">
                <Pagination
                  currentPage={data.current_page}
                  lastPage={data.last_page}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-cream/40" />
      ))}
    </div>
  )
}