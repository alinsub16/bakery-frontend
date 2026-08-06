import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { CategoriesPage } from '@/features/categories/CategoriesPage'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}