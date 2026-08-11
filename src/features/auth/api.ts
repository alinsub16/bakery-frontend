import { apiClient } from '@/lib/apiClient'

export interface RegisterValues {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export async function registerUser(values: RegisterValues) {
  const { data } = await apiClient.post<{ message: string }>('/register', values)
  return data
}