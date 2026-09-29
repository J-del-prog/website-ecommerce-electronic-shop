import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { LayoutDashboard, Package, ShoppingCart, Tags, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAdminAuthenticated } = useStore();

  const handleLogout = () => {
    setAdminAuthenticated(false);
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Produk', path: '/admin/produk', icon: <Package size={20} /> },
    { name: 'Pesanan', path: '/admin/pesanan', icon: <ShoppingCart size={20} /> },
    { name: 'Kategori', path: '/admin/kategori', icon: <Tags size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7f9' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: '#fff',
        borderRight: '1px solid #eaeaea',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #eaeaea' }}>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>JP Admin</h2>
        </div>
        <nav style={{ flex: 1, padding: '20px 0' }}>
          {navItems.map((item) => {
            // Check active exactly or by prefix
            const isActive = item.path === '/admin' 
              ? location.pathname === '/admin' || location.pathname === '/admin/'
              : location.pathname.startsWith(item.path);

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 24px',
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#fff' : '#444',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
              >
                {item.icon}
                {item.name}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid #eaeaea' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px',
              background: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Admin Topbar */}
        <header style={{
          background: '#fff',
          height: '70px',
          borderBottom: '1px solid #eaeaea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Admin User</p>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>Administrator</p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              A
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
