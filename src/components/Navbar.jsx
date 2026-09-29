import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Settings, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const { 
    activePage, 
    navigate, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen, 
    products, 
    formatRupiah 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate('shop', { search: searchQuery.trim() });
    }
  };

  const selectSearchResult = (product) => {
    setShowSearchResults(false);
    setSearchQuery('');
    navigate('detail', { productId: product.id });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--color-bg)',
      borderBottom: '2px solid var(--color-border-dark)',
      boxShadow: '0 2px 0 rgba(30, 32, 34, 0.04)'
    }}>
      {/* Top Banner Bar - Swiss Tagline & Reassurance */}
      <div style={{
        backgroundColor: 'var(--color-text-primary)',
        color: '#FFFFFF',
        fontSize: '0.75rem',
        padding: '6px 0',
        fontFamily: 'var(--font-mono)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={13} style={{ color: '#40C057' }} /> 100% GARANSI RESMI DISTRIBUTOR
            </span>
            <span style={{ display: 'none', md: 'inline', opacity: 0.5 }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} /> TOKO FISIK: GLODOK PLAZA & MANGGA DUA
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => navigate('tracking')} 
              style={{
                background: 'none',
                border: 'none',
                color: '#E0E7ED',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Truck size={12} /> Lacak Resi
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        paddingTop: '12px',
        paddingBottom: '12px',
        gap: '20px'
      }}>
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => navigate('home')}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              backgroundColor: 'var(--color-text-primary)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-1px'
            }}>
              JP
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                display: 'block',
                textTransform: 'uppercase'
              }}>
                Jaya Putra
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
                display: 'block',
                textTransform: 'uppercase',
                marginTop: '1px'
              }}>
                Toko Online Elektronik
              </span>
            </div>
          </div>
        </div>

        {/* Live Search Input with Dropdown (Desktop & Tablet) */}
        <div ref={searchRef} style={{ position: 'relative', maxWidth: '520px', width: '100%', margin: '0 auto' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius-sm)',
              overflow: 'hidden'
            }}>
              <Search size={16} style={{ marginLeft: '12px', color: 'var(--color-text-muted)' }} />
              <input 
                type="text"
                placeholder="Cari laptop, smartphone, TV, audio Sony, Apple..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  backgroundColor: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    color: 'var(--color-text-muted)'
                  }}
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--color-text-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Cari
              </button>
            </div>
          </form>

          {/* Quick Search Preview Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-surface)',
              border: '2px solid var(--color-border-dark)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 200,
              maxHeight: '380px',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '6px 12px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
                backgroundColor: 'var(--color-surface-subtle)',
                borderBottom: '1px solid var(--color-border)',
                textTransform: 'uppercase'
              }}>
                Hasil Pencarian Langsung ({searchResults.length})
              </div>
              {searchResults.map(prod => (
                <div 
                  key={prod.id}
                  onClick={() => selectSearchResult(prod)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderBottom: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    style={{ width: '42px', height: '42px', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {prod.name}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                        {formatRupiah(prod.price)}
                      </span>
                      <span style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)',
                        backgroundColor: 'var(--color-bg)',
                        padding: '1px 5px',
                        border: '1px solid var(--color-border)'
                      }}>
                        {prod.brand}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--color-text-muted)" />
                </div>
              ))}
              <div 
                onClick={handleSearchSubmit}
                style={{
                  padding: '8px 12px',
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-surface-subtle)',
                  cursor: 'pointer'
                }}
              >
                Lihat semua hasil di katalog →
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Wishlist, Cart Drawer, Mobile Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Wishlist Button */}
          <button
            onClick={() => navigate('shop', { wishlistOnly: true })}
            title="Daftar Keinginan"
            style={{
              position: 'relative',
              background: 'none',
              border: '1px solid var(--color-border)',
              padding: '8px 10px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Heart size={18} fill={wishlist.length > 0 ? '#E03131' : 'none'} color={wishlist.length > 0 ? '#E03131' : 'currentColor'} />
            {wishlist.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                backgroundColor: 'var(--color-text-primary)',
                color: '#FFFFFF',
                borderRadius: '50%',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-text-primary)',
              color: '#FFFFFF',
              border: '1px solid var(--color-text-primary)',
              padding: '8px 14px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <div style={{ position: 'relative', display: 'flex' }}>
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: '#D9480F',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontSize: '0.65rem',
                  padding: '1px 5px',
                  fontWeight: 800
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <span style={{ display: 'none', sm: 'inline' }}>
              Keranjang {cartCount > 0 ? `(${cartCount})` : ''}
            </span>
          </button>

          {/* Hamburger Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              padding: '8px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-text-primary)'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar - Swiss Grid Links */}
      <nav style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        display: 'none',
        md: 'block'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <div style={{ display: 'flex' }}>
            {[
              { id: 'home', label: 'Beranda', tag: '01' },
              { id: 'shop', label: 'Katalog Produk', tag: '02' },
              { id: 'tracking', label: 'Lacak Pesanan', tag: '03' },
              { id: 'about', label: 'Tentang Jaya Putra', tag: '04' },
              { id: 'contact', label: 'Bantuan & FAQ', tag: '05' },
              { id: 'admin', label: 'Admin Store', tag: 'ADM' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderRight: '1px solid var(--color-border)',
                  padding: '10px 18px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: activePage === item.id ? 800 : 500,
                  color: activePage === item.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  backgroundColor: activePage === item.id ? 'var(--color-surface-subtle)' : 'transparent',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: activePage === item.id ? 'var(--color-text-primary)' : '#868E96'
                }}>
                  [{item.tag}]
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingRight: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--color-text-muted)'
          }}>
            <Sparkles size={12} color="#D9480F" />
            <span>KODE KUPON: <strong>JAYAPUTRA10</strong> (Diskon 10%)</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '2px solid var(--color-border-dark)',
          padding: '16px 0',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'home', label: 'Beranda' },
              { id: 'shop', label: 'Katalog Produk & Promo' },
              { id: 'tracking', label: 'Lacak Status Resi' },
              { id: 'about', label: 'Tentang Kami & Toko Fisik' },
              { id: 'contact', label: 'Bantuan & Pertanyaan (FAQ)' },
              { id: 'admin', label: 'Panel Pengelola Toko (Admin)' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: activePage === item.id ? 'var(--color-surface-subtle)' : 'none',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-sm)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--color-text-primary)'
                }}
              >
                <span>{item.label}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
