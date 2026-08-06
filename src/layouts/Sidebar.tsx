import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wheat, Croissant, Factory , ClipboardList, LineChart, BarChart3, Users, ScrollText, LogOut, } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types/auth'
import { Button } from '@/components/ui/Button'


interface NavItem {
  label: string
  to: string
  icon: React.ElementType
  roles?: UserRole[] // omit = visible to all authenticated roles
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Categories', to: '/categories', icon: Wheat },
  { label: 'Breads', to: '/breads', icon: Croissant },
  { label: 'Production', to: '/production', icon: Factory },
  { label: 'Inventory', to: '/inventory', icon: ClipboardList },
  { label: 'Sales', to: '/sales', icon: LineChart },
  { label: 'Variance Report', to: '/reports/variance', icon: BarChart3 },
  { label: 'Users', to: '/users', icon: Users, roles: ['admin'] },
  { label: 'Activity Logs', to: '/activity-logs', icon: ScrollText, roles: ['admin', 'manager'] },
]

export function Sidebar() {
  const { user, logout } = useAuthStore()

  const visibleItems = navItems.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user.role))
  )

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-cream/40">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta text-white">
          <Wheat size={18} />
        </div>
        <span className="font-display text-lg font-semibold text-ink">Breadline</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {visibleItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-ink/70 hover:bg-white/70 hover:text-ink'
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <div className="mb-3 rounded-xl bg-white/70 px-3 py-2.5">
          <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
          <p className="text-xs capitalize text-muted">{user?.role?.replace('_', ' ')}</p>
        </div>
        <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={logout}
            className="w-full justify-start hover:text-danger"
            >
            Log out
        </Button>
      </div>
    </aside>
  )
}