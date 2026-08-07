import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { CategoriesPage } from '@/features/categories/CategoriesPage'
import { BreadsPage } from '@/features/breads/BreadsPage'
import { ProductionPage } from '@/features/production/ProductionPage'
import { InventoryPage } from '@/features/inventory/InventoryPage'
import { SalesPage } from '@/features/sales/SalesPage'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/breads" element={<BreadsPage />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/sales" element={<SalesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}