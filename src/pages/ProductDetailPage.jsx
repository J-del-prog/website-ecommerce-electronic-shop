import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus, 
  ArrowLeft,
  Share2,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function ProductDetailPage() {
  const { 
    products, 
    pageParams, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatRupiah,
    showToast 
  } = useStore();

  const productId = pageParams.productId;
  const product = products.find(p => p.id === productId) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc' | 'reviews' | 'warranty'

  const wishlisted = isInWishlist(product.id);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan produk disalin ke clipboard!', 'info');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '12px 0',
        fontSize: '0.8rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
          <button 
            onClick={() => navigate('home')} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
          >
            Beranda
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('shop')} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
          >
            Katalog
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate('shop', { category: product.category })} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
          >
            {product.category.toUpperCase()}
          </button>
          <span>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
            {product.name}
          </span>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('shop')}
          style={{
            background: 'none',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '16px',
            color: 'var(--color-text-muted)'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Katalog</span>
        </button>

        {/* Main Product Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-border-dark)',
          padding: 'clamp(20px, 4vw, 36px)'
        }}>
          {/* Left Column: Image Gallery & Thumbnails */}
          <div>
            {/* Main Featured Image */}
            <div style={{
              width: '100%',
              paddingTop: '85%',
              position: 'relative',
              backgroundColor: '#FAFCFD',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <img 
                src={images[selectedImage] || product.image} 
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {discountPercent > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'var(--color-badge-sale)',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 8px'
                }}>
                  HEMAT {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '68px',
                      height: '68px',
                      border: selectedImage === idx ? '2px solid var(--color-border-dark)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Form */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header Tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="swiss-tag">[ {product.brand.toUpperCase()} ]</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                backgroundColor: 'var(--color-bg)',
                padding: '2px 8px',
                border: '1px solid var(--color-border)'
              }}>
                KATEGORI: {product.category.toUpperCase()}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                backgroundColor: 'var(--color-surface-subtle)',
                padding: '2px 8px',
                border: '1px solid var(--color-border)'
              }}>
                SKU: {product.id.toUpperCase()}
              </span>
            </div>

            {/* Product Title */}
            <h1 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '10px'
            }}>
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: '16px',
              fontSize: '0.84rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59F00' }}>
                <Star size={16} fill="#F59F00" stroke="#F59F00" />
                <strong style={{ color: 'var(--color-text-primary)' }}>{product.rating}</strong>
              </div>
              <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount} Ulasan Terverifikasi)</span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: product.stock > 0 ? '#2B8A3E' : '#C92A2A'
              }}>
                {product.stock > 0 ? `STOK TERSEDIA: ${product.stock} UNIT` : 'STOK HABIS'}
              </span>
            </div>

            {/* Price Box */}
            <div style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                HARGA RESMI DISTRIBUTOR
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{
                  fontSize: 'clamp(1.7rem, 3vw, 2.3rem)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.03em'
                }}>
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{
                    fontSize: '1rem',
                    textDecoration: 'line-through',
                    color: 'var(--color-text-muted)'
                  }}>
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#2B8A3E', marginTop: '4px', fontWeight: 600 }}>
                ✓ Sudah termasuk PPN 11% & Faktur Pajak Resmi
              </div>
            </div>

            {/* Official Warranty Banner */}
            <div style={{
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={20} color="#2B8A3E" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.82rem' }}>
                <strong>Jaminan Distributor Resmi:</strong> {product.warranty}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  JUMLAH PESANAN:
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-border-dark)',
                  backgroundColor: 'var(--color-surface)'
                }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                      opacity: quantity > 1 ? 1 : 0.4
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{
                    padding: '0 14px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '8px 12px',
                      cursor: quantity < product.stock ? 'pointer' : 'not-allowed',
                      opacity: quantity < product.stock ? 1 : 0.4
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-border)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem'
                  }}
                >
                  <Heart size={16} fill={wishlisted ? '#E03131' : 'none'} color={wishlisted ? '#E03131' : 'currentColor'} />
                  <span>{wishlisted ? 'Tersimpan di Wishlist' : 'Simpan Wishlist'}</span>
                </button>

                <button
                  onClick={handleShare}
                  style={{
                    background: 'none',
                    border: '1px solid var(--color-border)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem'
                  }}
                  title="Bagikan Tautan Produk"
                >
                  <Share2 size={16} />
                  <span>Bagikan</span>
                </button>
              </div>

              {/* Purchase Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                  className="btn btn-outline btn-lg"
                  style={{ width: '100%' }}
                >
                  <ShoppingBag size={18} />
                  <span>+ Tambah ke Keranjang</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <span>Beli Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs, Description & Reviews */}
        <div style={{
          marginTop: '32px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-subtle)',
            overflowX: 'auto'
          }}>
            {[
              { id: 'specs', label: 'Spesifikasi Lengkap' },
              { id: 'desc', label: 'Deskripsi Produk' },
              { id: 'reviews', label: `Ulasan Pembeli (${product.reviewsCount})` },
              { id: 'warranty', label: 'Kebijakan Garansi & Retur' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--color-surface)' : 'transparent',
                  border: 'none',
                  borderRight: '1px solid var(--color-border)',
                  borderTop: activeTab === tab.id ? '2px solid var(--color-border-dark)' : '2px solid transparent',
                  padding: '14px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div style={{ padding: '28px' }}>
            {/* TAB 1: Specs Table */}
            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
                  Tabel Spesifikasi Teknis
                </h3>
                {product.specs ? (
                  <div style={{
                    border: '1px solid var(--color-border)',
                    borderBottom: 'none',
                    display: 'grid',
                    gridTemplateColumns: '1fr'
                  }}>
                    {Object.entries(product.specs).map(([specKey, specVal], idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '220px 1fr',
                          borderBottom: '1px solid var(--color-border)',
                          backgroundColor: idx % 2 === 0 ? 'var(--color-bg)' : 'var(--color-surface)',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div style={{
                          padding: '10px 14px',
                          fontWeight: 700,
                          borderRight: '1px solid var(--color-border)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem'
                        }}>
                          {specKey}
                        </div>
                        <div style={{ padding: '10px 14px', color: 'var(--color-text-primary)' }}>
                          {specVal}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-text-muted)' }}>Spesifikasi standar pabrikan.</p>
                )}
              </div>
            )}

            {/* TAB 2: Description */}
            {activeTab === 'desc' && (
              <div style={{ maxWidth: '800px', lineHeight: 1.7, fontSize: '0.92rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Tentang Produk</h3>
                <p style={{ marginBottom: '16px' }}>{product.description}</p>
                <div style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  padding: '16px',
                  border: '1px solid var(--color-border)'
                }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Kelengkapan Dalam Box:</h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <li>1x Unit Utama {product.name}</li>
                    <li>1x Kabel Charger / Adaptor Orisinil</li>
                    <li>1x Buku Manual Pengguna Bahasa Indonesia</li>
                    <li>1x Kartu Garansi Resmi Distributor Berstempel Jaya Putra</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: Reviews */}
            {activeTab === 'reviews' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginBottom: '24px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--color-border)',
                  flexWrap: 'wrap'
                }}>
                  <div>
                    <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                      {product.rating}
                    </div>
                    <div style={{ display: 'flex', gap: '2px', color: '#F59F00', margin: '4px 0' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#F59F00" stroke="#F59F00" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Berdasarkan {product.reviewsCount} pembeli
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      { star: 5, pct: 88 },
                      { star: 4, pct: 10 },
                      { star: 3, pct: 2 },
                      { star: 2, pct: 0 },
                      { star: 1, pct: 0 }
                    ].map(r => (
                      <div key={r.star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                        <span style={{ width: '40px' }}>★ {r.star}</span>
                        <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}>
                          <div style={{ width: `${r.pct}%`, height: '100%', backgroundColor: 'var(--color-text-primary)' }} />
                        </div>
                        <span style={{ width: '35px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample verified review item */}
                <div style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  padding: '16px',
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Rian Pratama — Pembelian Terverifikasi</div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                      2 minggu yang lalu
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', color: '#F59F00', marginBottom: '8px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="#F59F00" stroke="#F59F00" />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                    "Unit original, imei dan nomor seri terdaftar resmi di database pusat. Pengiriman cepat dan aman, kardus tidak ada penyok sama sekali. Sangat puas belanja di Jaya Putra Elektronik!"
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Warranty Policy */}
            {activeTab === 'warranty' && (
              <div style={{ maxWidth: '800px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Ketentuan Klaim Garansi & Retur</h3>
                <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Garansi Tukar Baru 7 Hari:</strong> Jika terjadi kerusakan bawaan pabrik dalam kurun waktu 7 hari sejak barang diterima, kami akan mengganti unit dengan yang baru (wajib sertakan video unboxing).</li>
                  <li><strong>Garansi Servis Resmi Distributor:</strong> Setelah 7 hari, klaim garansi berlaku di seluruh Service Center Resmi distributor di seluruh Indonesia selama masa garansi tertera.</li>
                  <li><strong>Nota Resmi & Stempel Toko:</strong> Selalu simpan invoice pembelian resmi dari Toko Online Jaya Putra untuk keperluan validasi servis.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <div className="section-header">
              <div>
                <div className="swiss-tag">[ REKOMENDASI TERKAIT ]</div>
                <h2 className="section-title">Produk Serupa yang Mungkin Kamu Suka</h2>
              </div>
              <button onClick={() => navigate('shop', { category: product.category })} className="btn btn-steel btn-sm">
                Lihat Kategori Ini
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
