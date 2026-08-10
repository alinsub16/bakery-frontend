import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  activateUser,
  approveUser,
  createUser,
  deactivateUser,
  fetchPendingUsers,
  fetchRoles,
  fetchUsers,
  rejectUser,
  updateUserRole,
} from './api'
import type { CreateUserValues } from '@/types/user'

const USERS_KEY = ['users']
const PENDING_KEY = ['users', 'pending']
const ROLES_KEY = ['roles']

export function useRoles() {
  return useQuery({ queryKey: ROLES_KEY, queryFn: fetchRoles })
}

export function useUsers() {
  return useQuery({ queryKey: USERS_KEY, queryFn: fetchUsers })
}

export function usePendingUsers() {
  return useQuery({ queryKey: PENDING_KEY, queryFn: fetchPendingUsers })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: CreateUserValues) => createUser(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) => updateUserRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export function useApproveUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) => approveUser(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PENDING_KEY })
      queryClient.invalidateQueries({ queryKey: USERS_KEY })
    },
  })
}

export function useRejectUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => rejectUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PENDING_KEY }),
  })
}

export function useDeactivateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deactivateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export function useActivateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => activateUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_KEY }),
  })
}