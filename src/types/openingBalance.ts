export interface OpeningBalance {
  bread_id: number
  quantity: number
  note: string
  set_by: { id: number; name: string }
  created_at: string
}

export interface SetOpeningBalanceValues {
  quantity: number
  note: string
}