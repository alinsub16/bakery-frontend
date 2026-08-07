export interface ProductionEntry {
  id: number
  bread: {
    id: number
    name: string
    sku: string
  }
  production_date: string
  quantity_produced: number
  produced_by: {
    id: number
    name: string
  }
  created_at: string
}

export interface SubmitProductionValues {
  bread_id: number
  quantity_produced: number
}

export interface CorrectProductionValues {
  quantity_produced: number
}