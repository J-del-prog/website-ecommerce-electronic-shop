import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { products, orders, formatRupiah } = useStore();

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const statCards = [
    { title: 'Total Pendapatan', value: formatRupiah(totalRevenue), icon: <DollarSign size={24} />, color: '#10b981' },
    { title: 'Total Pesanan', value: totalOrders, icon: <ShoppingCart size={24} />, color: '#3b82f6' },
    { title: 'Total Produk', value: totalProducts, icon: <Package size={24} />, color: '#8b5cf6' },
    { title: 'Kunjungan Harian', value: '1,234', icon: <TrendingUp size={24} />, color: '#f59e0b' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '24px', color: '#111827' }}>
        Dashboard Overview
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{ 
            background: '#fff', 
            padding: '24px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: `${stat.color}15`,
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '4px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#111827' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
