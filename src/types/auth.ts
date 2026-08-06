export type UserRole = 'admin' | 'manager' | 'baker' | 'inventory_clerk'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole | null
}

export interface LoginResponse {
  token: string
  user: AuthUser
}