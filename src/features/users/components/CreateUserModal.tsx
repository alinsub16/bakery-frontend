import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useCreateUser, useRoles } from '../hooks'

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
}

const emptyForm = { name: '', email: '', password: '', role: '' }

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: roles } = useRoles()
  const createMutation = useCreateUser()

  useEffect(() => {
    if (isOpen) {
      setForm(emptyForm)
      setErrors({})
    }
  }, [isOpen])

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    try {
      await createMutation.mutateAsync(form)
      onClose()
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const apiErrors = err.response.data.errors as Record<string, string[]>
        setErrors(Object.fromEntries(Object.entries(apiErrors).map(([k, v]) => [k, v[0]])))
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New user">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
          autoFocus
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
        />
        <Input
          id="password"
          label="Temporary password"
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          error={errors.password}
          placeholder="Min. 8 characters"
        />
        <Select
          id="role"
          label="Role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          error={errors.role}
        >
          <option value="" disabled>Select a role…</option>
          {roles?.map((role) => (
            <option key={role.id} value={role.name} className="capitalize">
              {role.name.replace('_', ' ')}
            </option>
          ))}
        </Select>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={createMutation.isPending}>Create user</Button>
        </div>
      </form>
    </Modal>
  )
}