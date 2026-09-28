import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS } from '../data/products';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  CheckCircle, 
  X, 
  Truck,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function AdminPage() {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    resetToDefaultData, 
    formatRupiah,
    navigate,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'overview' | 'products' | 'orders'

  // Product Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formProduct, setFormProduct] = useState({
    name: '',
    category: 'smartphone',
    brand: 'Samsung',
    price: 3500000,
    originalPrice: 4000000,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    description: 'Deskripsi produk elektronik lengkap dengan garansi distributor resmi.',
    warranty: 'Garansi Resmi 1 Tahun Distributor Indonesia',
    tag: 'BARU',
    isFlashSale: false,
    isFeatured: true
  });

  // Calculate Dashboard Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const lowStockProducts = products.filter(p => p.stock < 10);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormProduct({
      name: '',
      category: 'smartphone',
      brand: 'Samsung',
      price: 3500000,
      originalPrice: 4000000,
      stock: 10,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      description: 'Deskripsi produk elektronik lengkap dengan garansi distributor resmi.',
      warranty: 'Garansi Resmi 1 Tahun Distributor Indonesia',
      tag: 'BARU',
      isFlashSale: false,
      isFeatured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setFormProduct({
      name: prod.name,
      category: prod.category,
      brand: prod.brand,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      stock: prod.stock,
      image: prod.image,
      description: prod.description || '',
      warranty: prod.warranty || 'Garansi Resmi 1 Tahun',
      tag: prod.tag || '',
      isFlashSale: Boolean(prod.isFlashSale),
      isFeatured: Boolean(prod.isFeatured)
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formProduct.name) {
      showToast('Nama produk wajib diisi', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formProduct,
        price: Number(formProduct.price),
        originalPrice: Number(formProduct.originalPrice),
        stock: Number(formProduct.stock)
      });
    } else {
      addProduct({
        ...formProduct,
        price: Number(formProduct.price),
        originalPrice: Number(formProduct.originalPrice),
        stock: Number(formProduct.stock)
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '85vh', paddingBottom: '48px' }}>
      {/* Admin Header Bar */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        paddingTop: '24px',
        paddingBottom: '20px'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div className="swiss-tag">[ PANEL ADMINISTRATOR TOKO ]</div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px' }}>
                Pengelola Toko Elektronik Jaya Putra
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={resetToDefaultData}
                className="btn btn-steel btn-sm"
                title="Pulihkan data katalog dan pesanan awal"
              >
                <RotateCcw size={14} />
                <span>Reset Demo Toko</span>
              </button>
              <button
                onClick={() => navigate('shop')}
                className="btn btn-outline btn-sm"
              >
                <ExternalLink size={14} />
                <span>Buka Etalase Toko</span>
              </button>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
            {[
              { id: 'products', label: `Manajemen Produk (${products.length})` },
              { id: 'orders', label: `Manajemen Pesanan (${orders.length})` },
              { id: 'overview', label: 'Ringkasan Omset & Stok' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  backgroundColor: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-bg)',
                  color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  borderRadius: '2px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
                <span className="swiss-tag">[ TOTAL PENJUALAN ]</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--color-text-primary)' }}>
                  {formatRupiah(totalRevenue)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Dari total {orders.length} transaksi pesanan
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
                <span className="swiss-tag">[ TOTAL KATALOG ]</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>
                  {products.length} Unit
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Produk aktif siap dijual online
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
                <span className="swiss-tag">[ STOK MENIPIS (&lt;10) ]</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: '#D9480F' }}>
                  {lowStockProducts.length} Produk
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Perlu restock segera ke distributor
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
                <span className="swiss-tag">[ MITRA LOGISTIK ]</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px' }}>
                  5 Kurir
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  JNE, SiCepat, GoSend, Grab, Pickup
                </div>
              </div>
            </div>

            {/* Low Stock List */}
            {lowStockProducts.length > 0 && (
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#D9480F' }}>
                  <AlertTriangle size={18} />
                  <span>Daftar Produk dengan Stok Menipis:</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lowStockProducts.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                      <span>{p.name} ({p.brand})</span>
                      <strong style={{ color: '#D9480F' }}>Sisa: {p.stock} Unit</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Daftar Inventaris Produk Toko
              </h2>
              <button onClick={handleOpenAddModal} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Products Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-surface-subtle)', borderBottom: '2px solid var(--color-border-dark)', fontFamily: 'var(--font-mono)' }}>
                    <th style={{ padding: '10px 12px' }}>PRODUK</th>
                    <th style={{ padding: '10px 12px' }}>KATEGORI</th>
                    <th style={{ padding: '10px 12px' }}>MERK</th>
                    <th style={{ padding: '10px 12px' }}>HARGA</th>
                    <th style={{ padding: '10px 12px' }}>STOK</th>
                    <th style={{ padding: '10px 12px' }}>PROMO</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={prod.image} alt={prod.name} style={{ width: '40px', height: '40px', objectFit: 'cover', border: '1px solid var(--color-border)' }} />
                        <div>
                          <div style={{ fontWeight: 600, maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {prod.name}
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                            ID: {prod.id}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px' }}>{prod.category}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{prod.brand}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 700 }}>{formatRupiah(prod.price)}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: prod.stock > 0 ? (prod.stock < 10 ? '#D9480F' : '#2B8A3E') : '#C92A2A'
                        }}>
                          {prod.stock} unit
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {prod.isFlashSale && (
                          <span style={{ backgroundColor: '#FFF4E6', color: '#D9480F', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 700 }}>
                            Flash Sale
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            style={{ background: 'none', border: '1px solid var(--color-border)', padding: '5px 8px', cursor: 'pointer', borderRadius: '2px' }}
                            title="Edit Data Produk"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Yakin ingin menghapus ${prod.name}?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            style={{ background: 'none', border: '1px solid var(--color-border)', padding: '5px 8px', cursor: 'pointer', borderRadius: '2px', color: '#C92A2A' }}
                            title="Hapus Produk"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '20px' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              Daftar Seluruh Pesanan Masuk ({orders.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map(order => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid var(--color-border)',
                    padding: '16px',
                    backgroundColor: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.9rem' }}>
                        ORDER #{order.id}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginLeft: '10px' }}>
                        {order.date}
                      </span>
                    </div>

                    {/* Change Status Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Status:</span>
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          border: '1px solid var(--color-border-dark)',
                          backgroundColor: 'var(--color-surface)',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          outline: 'none',
                          borderRadius: '2px'
                        }}
                      >
                        <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer details & Total */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
                    <div>
                      <strong>Penerima:</strong> {order.customerName} ({order.phone})
                      <div style={{ color: 'var(--color-text-muted)' }}>{order.address}</div>
                    </div>
                    <div>
                      <strong>Metode Bayar:</strong> {order.paymentMethod}
                      <div style={{ color: 'var(--color-text-muted)' }}>Kurir: {order.courier} (Resi: {order.trackingNumber})</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Total Pembayaran:</span>
                      <strong style={{ fontSize: '1.05rem' }}>{formatRupiah(order.totalAmount)}</strong>
                    </div>
                  </div>

                  {/* Order items brief */}
                  <div style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '8px',
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>
                      Item: {order.items.map(i => `${i.name} (${i.quantity}x)`).join(', ')}
                    </span>
                    <button
                      onClick={() => navigate('tracking', { orderId: order.id })}
                      className="btn btn-steel btn-sm"
                    >
                      <Truck size={13} />
                      <span>Cek di Halaman Pelacak</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(30, 32, 34, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '2px solid var(--color-border-dark)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Nama Produk *</label>
                <input 
                  type="text" 
                  required
                  value={formProduct.name}
                  onChange={e => setFormProduct({ ...formProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Kategori</label>
                  <select 
                    value={formProduct.category}
                    onChange={e => setFormProduct({ ...formProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Merk / Brand</label>
                  <select 
                    value={formProduct.brand}
                    onChange={e => setFormProduct({ ...formProduct, brand: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                  >
                    {BRANDS.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Harga Jual (Rp) *</label>
                  <input 
                    type="number" 
                    required
                    value={formProduct.price}
                    onChange={e => setFormProduct({ ...formProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Harga Coret (Rp)</label>
                  <input 
                    type="number" 
                    value={formProduct.originalPrice}
                    onChange={e => setFormProduct({ ...formProduct, originalPrice: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Stok Unit *</label>
                  <input 
                    type="number" 
                    required
                    value={formProduct.stock}
                    onChange={e => setFormProduct({ ...formProduct, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>URL Gambar Produk (Unsplash / CDN)</label>
                <input 
                  type="url" 
                  value={formProduct.image}
                  onChange={e => setFormProduct({ ...formProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Informasi Garansi Resmi</label>
                <input 
                  type="text" 
                  value={formProduct.warranty}
                  onChange={e => setFormProduct({ ...formProduct, warranty: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700 }}>Deskripsi Singkat</label>
                <textarea 
                  rows={2}
                  value={formProduct.description}
                  onChange={e => setFormProduct({ ...formProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formProduct.isFlashSale}
                    onChange={e => setFormProduct({ ...formProduct, isFlashSale: e.target.checked })}
                  />
                  <span>Tampilkan di Promo Flash Sale</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={formProduct.isFeatured}
                    onChange={e => setFormProduct({ ...formProduct, isFeatured: e.target.checked })}
                  />
                  <span>Produk Rekomendasi (Featured)</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-steel btn-sm">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
