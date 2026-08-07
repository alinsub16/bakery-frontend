export interface InventoryEntry {
  id: number
  bread: {
    id: number
    name: string
    sku: string
  }
  inventory_date: string
  opening_stock: number
  closing_stock: number
  sold_quantity: number
  revenue: number
  recorded_by: {
    id: number
    name: string
  }
  created_at: string
}

export interface OpeningStockResponse {
  bread_id: number
  opening_stock: number
  production_date: string
}

export interface SubmitInventoryValues {
  bread_id: number
  closing_stock: number
}

export interface CorrectInventoryValues {
  closing_stock: number
}