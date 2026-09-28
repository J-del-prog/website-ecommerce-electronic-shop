import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  Grid, 
  List, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  Flame, 
  Check, 
  X,
  Heart
} from 'lucide-react';

export default function ShopPage() {
  const { products, pageParams, formatRupiah, wishlist } = useStore();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(pageParams.category || 'all');
  const [selectedBrand, setSelectedBrand] = useState(pageParams.brand || 'all');
  const [searchQuery, setSearchQuery] = useState(pageParams.search || '');
  const [sortBy, setSortBy] = useState('popular'); // popular, price-asc, price-desc, rating, name
  const [maxPrice, setMaxPrice] = useState(35000000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [flashSaleOnly, setFlashSaleOnly] = useState(Boolean(pageParams.flashSaleOnly));
  const [wishlistOnly, setWishlistOnly] = useState(Boolean(pageParams.wishlistOnly));
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync params if passed externally
  useEffect(() => {
    if (pageParams.category) setSelectedCategory(pageParams.category);
    if (pageParams.brand) setSelectedBrand(pageParams.brand);
    if (pageParams.search) setSearchQuery(pageParams.search);
    if (pageParams.flashSaleOnly) setFlashSaleOnly(true);
    if (pageParams.wishlistOnly) setWishlistOnly(true);
  }, [pageParams]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setMaxPrice(35000000);
    setInStockOnly(false);
    setFlashSaleOnly(false);
    setWishlistOnly(false);
    setSortBy('popular');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Flash sale filter
      if (flashSaleOnly && !product.isFlashSale) {
        return false;
      }
      // Wishlist only filter
      if (wishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: popular (reviewsCount)
      return b.reviewsCount - a.reviewsCount;
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, maxPrice, inStockOnly, flashSaleOnly, wishlistOnly, sortBy, wishlist]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '48px' }}>
      {/* Shop Page Banner */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '2px solid var(--color-border-dark)',
        paddingTop: '28px',
        paddingBottom: '24px'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="swiss-tag">[ KATALOG LENGKAP ]</div>
              <h1 style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
                marginTop: '4px'
              }}>
                {wishlistOnly ? 'Daftar Keinginan (Wishlist)' : 'Perangkat Elektronik & Gadget'}
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Semua unit bergaransi resmi distributor nasional dengan jaminan segel orisinil dan nota pembelian resmi.
              </p>
            </div>

            {/* Category Quick Pills */}
            <div style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              maxWidth: '100%',
              paddingBottom: '4px'
            }}>
              {CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    backgroundColor: selectedCategory === c.id ? 'var(--color-text-primary)' : 'var(--color-bg)',
                    color: selectedCategory === c.id ? '#FFFFFF' : 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px' }}>
        {/* Main Grid: Sidebar Filters (Left) + Products List (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* LEFT: Swiss Filter Sidebar */}
          <aside style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem' }}>
                <SlidersHorizontal size={16} />
                <span>FILTER PRODUK</span>
              </div>
              <button
                onClick={resetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Reset Filter"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Special Badges Toggle */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                marginBottom: '8px'
              }}>
                <input 
                  type="checkbox" 
                  checked={flashSaleOnly} 
                  onChange={e => setFlashSaleOnly(e.target.checked)} 
                />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <Flame size={14} color="#D9480F" /> Hanya Promo Flash Sale
                </span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                marginBottom: '8px'
              }}>
                <input 
                  type="checkbox" 
                  checked={inStockOnly} 
                  onChange={e => setInStockOnly(e.target.checked)} 
                />
                <span>Hanya Stok Tersedia</span>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}>
                <input 
                  type="checkbox" 
                  checked={wishlistOnly} 
                  onChange={e => setWishlistOnly(e.target.checked)} 
                />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Heart size={14} color="#E03131" /> Hanya Wishlist Saya ({wishlist.length})
                </span>
              </label>
            </div>

            {/* Category Filter */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                marginBottom: '10px'
              }}>
                KATEGORI PRODUK
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: selectedCategory === cat.id ? 'var(--color-surface-subtle)' : 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '6px 8px',
                      fontSize: '0.82rem',
                      fontWeight: selectedCategory === cat.id ? 700 : 500,
                      color: selectedCategory === cat.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderRadius: '2px'
                    }}
                  >
                    <span>{cat.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                      {cat.id === 'all' 
                        ? products.length 
                        : products.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                marginBottom: '10px'
              }}>
                MERK / BRAND RESMI
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  onClick={() => setSelectedBrand('all')}
                  style={{
                    background: selectedBrand === 'all' ? 'var(--color-surface-subtle)' : 'none',
                    border: 'none',
                    textAlign: 'left',
                    padding: '5px 8px',
                    fontSize: '0.8rem',
                    fontWeight: selectedBrand === 'all' ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  Semua Merk
                </button>
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    style={{
                      background: selectedBrand.toLowerCase() === brand.toLowerCase() ? 'var(--color-surface-subtle)' : 'none',
                      border: 'none',
                      textAlign: 'left',
                      padding: '5px 8px',
                      fontSize: '0.8rem',
                      fontWeight: selectedBrand.toLowerCase() === brand.toLowerCase() ? 700 : 500,
                      color: selectedBrand.toLowerCase() === brand.toLowerCase() ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{brand}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                      {products.filter(p => p.brand.toLowerCase() === brand.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                marginBottom: '8px'
              }}>
                <span>MAKSIMAL HARGA:</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>
                {formatRupiah(maxPrice)}
              </div>
              <input 
                type="range"
                min="1000000"
                max="35000000"
                step="500000"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-text-primary)' }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                marginTop: '4px',
                fontFamily: 'var(--font-mono)'
              }}>
                <span>Rp 1 Juta</span>
                <span>Rp 35 Juta</span>
              </div>
            </div>
          </aside>

          {/* RIGHT: Products Toolbar & Grid */}
          <div>
            {/* Toolbar */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {/* Product Counter */}
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                Menampilkan <strong>{filteredProducts.length}</strong> produk elektronik
              </div>

              {/* Sort & View Modes */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <label htmlFor="shop-sort" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Urutkan:</label>
                  <select 
                    id="shop-sort"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    style={{
                      padding: '6px 10px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      outline: 'none',
                      borderRadius: '2px'
                    }}
                  >
                    <option value="popular">Paling Populer</option>
                    <option value="price-asc">Harga: Termurah</option>
                    <option value="price-desc">Harga: Termahal</option>
                    <option value="rating">Rating Tertinggi</option>
                    <option value="name">Nama Produk A-Z</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div style={{ display: 'flex', border: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Tampilan Grid"
                    style={{
                      background: viewMode === 'grid' ? 'var(--color-text-primary)' : 'var(--color-surface)',
                      color: viewMode === 'grid' ? '#fff' : 'var(--color-text-muted)',
                      border: 'none',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="Tampilan List"
                    style={{
                      background: viewMode === 'list' ? 'var(--color-text-primary)' : 'var(--color-surface)',
                      color: viewMode === 'list' ? '#fff' : 'var(--color-text-muted)',
                      border: 'none',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery || flashSaleOnly || wishlistOnly) && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  FILTER AKTIF:
                </span>
                {selectedCategory !== 'all' && (
                  <span style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Merk: {selectedBrand}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedBrand('all')} />
                  </span>
                )}
                {searchQuery && (
                  <span style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Cari: "{searchQuery}"
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                  </span>
                )}
                {flashSaleOnly && (
                  <span style={{
                    backgroundColor: 'var(--color-badge-sale)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Flash Sale
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setFlashSaleOnly(false)} />
                  </span>
                )}
                {wishlistOnly && (
                  <span style={{
                    backgroundColor: '#E03131',
                    color: '#fff',
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    Hanya Wishlist
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setWishlistOnly(false)} />
                  </span>
                )}
              </div>
            )}

            {/* Products Grid / Empty state */}
            {filteredProducts.length === 0 ? (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <Search size={40} style={{ color: 'var(--color-text-muted)', marginBottom: '12px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Tidak Ada Produk yang Cocok</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
                  Coba ubah kriteria pencarian, reset filter kategori atau perbesar rentang harga yang dipilih.
                </p>
                <button onClick={resetFilters} className="btn btn-primary btn-sm">
                  Reset Semua Filter
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px'
              }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
