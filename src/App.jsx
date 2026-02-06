import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import AddressPage from './pages/auth/AddressPage';
import HomePage from './pages/home/HomePage';
import UserDashboardPage from './pages/dashboard/UserDashboardPage';
import CategoryPage from './pages/products/CategoryPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import Dashboard from './pages/admin/Dashboard';
import StockManagement from './pages/admin/StockManagement';
import ProductsPage from './pages/admin/ProductsPage';
import AdminDealsPage from './pages/admin/DealsPage';
import PublicDealsPage from './pages/deals/DealsPage';
import WarpPreloader from './components/ui/WarpPreloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      <AdminAuthProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <WarpPreloader key="preloader" onComplete={() => setLoading(false)} />
          ) : (
            <BrowserRouter>
              <Routes>
                {/* Customer Routes */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/address" element={<AddressPage />} />
                <Route path="/home" element={<HomePage />} />

                {/* Product Routes */}
                <Route path="/products" element={<CategoryPage />} />
                <Route path="/products/:categoryId" element={<CategoryPage />} />
                <Route path="/categories" element={<CategoryPage />} />


                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin-sales" element={<Navigate to="/admin/dashboard" replace />} />

                {/* Public Deals Page */}
                <Route path="/deals" element={<PublicDealsPage />} />

                <Route path="/admin" element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="deals" element={<AdminDealsPage />} />
                  <Route path="stock" element={<StockManagement />} />
                  {/* Placeholders for other admin pages */}
                  <Route path="orders" element={<div className="text-white">Orders Page</div>} />
                  <Route path="customers" element={<div className="text-white">Customers Page</div>} />
                  <Route path="payments" element={<div className="text-white">Payments Page</div>} />
                  <Route path="settings" element={<div className="text-white">Settings Page</div>} />
                </Route>

              </Routes>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;

