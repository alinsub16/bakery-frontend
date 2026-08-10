export interface ActivityLogEntry {
  id: number
  action: string
  subject_type: string
  subject_id: number
  properties: Record<string, unknown>
  user: { id: number; name: string }
  created_at: string
}