import { apiClient } from '@/lib/apiClient'
import type { ActiveUser, CreateUserValues, PendingUser, Role } from '@/types/user'
import type { PaginatedResponse } from '@/types/pagination'

export async function fetchRoles() {
  const { data } = await apiClient.get<Role[]>('/roles')
  return data
}

export async function fetchUsers() {
  const { data } = await apiClient.get<PaginatedResponse<ActiveUser>>('/users')
  return data
}

export async function fetchPendingUsers() {
  const { data } = await apiClient.get<PaginatedResponse<PendingUser>>('/users/pending')
  return data
}

export async function createUser(values: CreateUserValues) {
  const { data } = await apiClient.post<ActiveUser>('/users', values)
  return data
}

export async function updateUserRole(id: number, role: string) {
  const { data } = await apiClient.put<ActiveUser>(`/users/${id}/role`, { role })
  return data
}

export async function approveUser(id: number, role: string) {
  const { data } = await apiClient.patch(`/users/${id}/approve`, { role })
  return data
}

export async function rejectUser(id: number) {
  const { data } = await apiClient.patch(`/users/${id}/reject`)
  return data
}

export async function deactivateUser(id: number) {
  const { data } = await apiClient.patch(`/users/${id}/deactivate`)
  return data
}

export async function activateUser(id: number) {
  const { data } = await apiClient.patch(`/users/${id}/activate`)
  return data
}