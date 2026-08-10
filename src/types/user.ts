export interface ActiveUser {
  id: number
  name: string
  email: string
  role: string | null
}

export interface PendingUser {
  id: number
  name: string
  email: string
  registered_at: string
}

export interface Role {
  id: number
  name: string
}

export interface CreateUserValues {
  name: string
  email: string
  password: string
  role: string
}