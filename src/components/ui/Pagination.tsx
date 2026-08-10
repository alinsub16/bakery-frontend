import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

interface PaginationProps {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null

  return (
    <div className="flex items-center justify-between border-t border-border pt-4">
      <p className="text-xs text-muted">Page {currentPage} of {lastPage}</p>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          icon={<ChevronLeft size={14} />}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  )
}