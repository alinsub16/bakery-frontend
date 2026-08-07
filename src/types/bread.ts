export interface Bread {
  id: number
  name: string
  sku: string
  unit: string
  selling_price: number
  cost_price: number | null
  is_active: boolean
  category: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export interface BreadFormValues {
  category_id: number
  name: string
  sku: string
  unit: string
  selling_price: number
  cost_price: number | null
}