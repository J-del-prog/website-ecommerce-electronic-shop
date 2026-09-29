import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartCheckoutPage from './pages/CartCheckoutPage';
import TrackingPage from './pages/TrackingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';

function PublicStoreFront() {
  const { activePage } = useStore();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'detail':
        return <ProductDetailPage />;
      case 'cart':
      case 'checkout':
        return <CartCheckoutPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>
      <Footer />
      <CartDrawer />
      <BackToTop />
    </div>
  );
}

function ProtectedAdminRoute({ children }) {
  const { isAdminAuthenticated } = useStore();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="produk" element={<AdminProducts />} />
          {/* Tambahkan rute admin lainnya di sini nanti, sekarang arahkan ke dashboard */}
          <Route path="*" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<PublicStoreFront />} />
      </Routes>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </BrowserRouter>
  );
}
