import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Edit3, Trash2, X, Save } from 'lucide-react';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct, formatRupiah } = useStore();

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
    setFormProduct({ ...prod });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(formProduct);
    } else {
      addProduct(formProduct);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#111827' }}>
          Manajemen Produk
        </h1>
        <button 
          onClick={handleOpenAddModal} 
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '500'
          }}
        >
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>PRODUK</th>
              <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>KATEGORI</th>
              <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>HARGA</th>
              <th style={{ padding: '16px', fontWeight: '600', color: '#475569' }}>STOK</th>
              <th style={{ padding: '16px', fontWeight: '600', color: '#475569', textAlign: 'right' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={prod.image} alt={prod.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{prod.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{prod.brand}</div>
                  </div>
                </td>
                <td style={{ padding: '16px', color: '#475569', textTransform: 'capitalize' }}>{prod.category}</td>
                <td style={{ padding: '16px', fontWeight: 600, color: '#0f172a' }}>{formatRupiah(prod.price)}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    background: prod.stock > 0 ? (prod.stock < 10 ? '#fef3c7' : '#dcfce7') : '#fee2e2',
                    color: prod.stock > 0 ? (prod.stock < 10 ? '#d97706' : '#166534') : '#991b1b'
                  }}>
                    {prod.stock} unit
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      style={{ background: '#f1f5f9', color: '#334155', border: 'none', padding: '6px', cursor: 'pointer', borderRadius: '4px' }}
                      title="Edit Produk"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Yakin ingin menghapus ${prod.name}?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px', cursor: 'pointer', borderRadius: '4px' }}
                      title="Hapus Produk"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '12px',
            padding: '24px',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', color: '#111827' }}>
              {editingProduct ? 'Edit Data Produk' : 'Tambah Produk Baru'}
            </h2>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formProduct.name}
                  onChange={e => setFormProduct({ ...formProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Kategori</label>
                  <select
                    value={formProduct.category}
                    onChange={e => setFormProduct({ ...formProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  >
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="audio">Audio</option>
                    <option value="accessories">Aksesoris</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Merk</label>
                  <input
                    type="text"
                    required
                    value={formProduct.brand}
                    onChange={e => setFormProduct({ ...formProduct, brand: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formProduct.price}
                    onChange={e => setFormProduct({ ...formProduct, price: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Harga Asli (Rp)</label>
                  <input
                    type="number"
                    value={formProduct.originalPrice}
                    onChange={e => setFormProduct({ ...formProduct, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Stok</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formProduct.stock}
                    onChange={e => setFormProduct({ ...formProduct, stock: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>URL Gambar Utama</label>
                <input
                  type="url"
                  required
                  value={formProduct.image}
                  onChange={e => setFormProduct({ ...formProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Deskripsi Produk</label>
                <textarea
                  required
                  rows="3"
                  value={formProduct.description}
                  onChange={e => setFormProduct({ ...formProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formProduct.isFlashSale}
                    onChange={e => setFormProduct({ ...formProduct, isFlashSale: e.target.checked })}
                  />
                  Masuk Flash Sale
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formProduct.isFeatured}
                    onChange={e => setFormProduct({ ...formProduct, isFeatured: e.target.checked })}
                  />
                  Produk Pilihan (Featured)
                </label>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: 'var(--color-primary)', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Save size={18} /> {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
